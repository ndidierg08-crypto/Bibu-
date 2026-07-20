import { initializeApp, getApp, getApps } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDocs,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  writeBatch
} from "firebase/firestore";

// Import types and default data to handle seeding
import {
  RelationshipDates,
  BedtimeStory,
  LoveLetter,
  LoveReason,
  Memory,
  SongItem,
  FutureGoal,
  MapMarker,
  TimeCapsuleLetter,
  TriviaQuestion,
  PreferenceQuestion,
  GuessDateQuestion,
  LoveCoupon,
  BoyfriendChatSettings
} from "./types";

import {
  defaultDates,
  defaultStories,
  defaultLetters,
  defaultReasons,
  defaultMemories,
  defaultSongs,
  defaultGoals,
  defaultMarkers,
  defaultTimeCapsules,
  defaultTrivia,
  defaultPreferences,
  defaultGuessDates,
  defaultCoupons,
  defaultChatSettings,
  lovePhrases
} from "./defaultData";

// Define default texts for app customization
export interface AppTextsConfig {
  lockScreenTitle: string;
  lockScreenSubtitle: string;
  lockScreenImage: string;
  lockScreenQuote: string;
  lockScreenButton: string;
  heroTitle: string;
  heroDescription: string;
  phraseCardTitle: string;
  phraseCardButton: string;
  metCounterTitle: string;
  noviosCounterTitle: string;
  navDashboard: string;
  navChat: string;
  navStories: string;
  navLetters: string;
  navReasons: string;
  navMemories: string;
  navMusic: string;
  navGoals: string;
  navGames: string;
  navSurprises: string;
  navCapsule: string;
  navMap: string;
  appThemeColorFrom: string; // e.g., "from-rose-300"
  appThemeColorVia: string;  // e.g., "via-pink-200"
  appThemeColorTo: string;   // e.g., "to-amber-100"
  globalFooterText: string;
  lovePhrases: string[];
}

export const defaultTextsConfig: AppTextsConfig = {
  lockScreenTitle: "Para Mi Persona Favorita",
  lockScreenSubtitle: "Acceso Reservado",
  lockScreenImage: "/src/assets/images/couple_portrait_1784527200924.jpg",
  lockScreenQuote: "te amo del infinito al más allá mi flaca",
  lockScreenButton: "Entrar a Nuestra Historia",
  heroTitle: "Nuestro Lugar Especial",
  heroDescription: "Hola, mi princesa hermosa. Bienvenida a este pequeño espacio que armé pensando en ti, en nosotros y en todo el amor que nos une. Aquí están guardados nuestros recuerdos, sueños y momentos favoritos. ¡Te amo infinito!",
  phraseCardTitle: "Pensamiento de Amor para Hoy",
  phraseCardButton: "Nueva frase",
  metCounterTitle: "Desde que nos Conocimos",
  noviosCounterTitle: "Desde que somos novios (flacas)",
  navDashboard: "Inicio",
  navChat: "Pregúntale a mi Novio",
  navStories: "Cuentos de Amor",
  navLetters: "Cartitas 'Abrir cuando'",
  navReasons: "Cosas que me encantan",
  navMemories: "Recuerdos",
  navMusic: "Playlist Significativa",
  navGoals: "Metas & Sueños",
  navGames: "Minijuegos",
  navSurprises: "Sorpresas",
  navCapsule: "Cápsula del Tiempo",
  navMap: "Mapa de Amor",
  appThemeColorFrom: "from-rose-300",
  appThemeColorVia: "via-pink-200",
  appThemeColorTo: "to-amber-100",
  globalFooterText: "Nuestra Historia de Amor. Diseñado para mi personita favorita de todo el mundo. ❤️",
  lovePhrases: lovePhrases
};

// Check if we have Firebase config in environment or localStorage
const getFirebaseConfig = () => {
  const localConfigStr = localStorage.getItem("firebase_config_json");
  if (localConfigStr) {
    try {
      return JSON.parse(localConfigStr);
    } catch (e) {
      console.error("Error parsing local firebase config JSON:", e);
    }
  }

  // Fallback to Vite env variables
  const env = (import.meta as any).env || {};
  const envApiKey = env.VITE_FIREBASE_API_KEY;
  if (envApiKey) {
    return {
      apiKey: envApiKey,
      authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: env.VITE_FIREBASE_APP_ID
    };
  }

  return null;
};

const config = getFirebaseConfig();

// Is real Firebase available?
export const isFirebaseConfigured = !!config && !!config.apiKey && config.apiKey !== "YOUR_API_KEY";

let firebaseApp;
let firestoreDb: any = null;

if (isFirebaseConfigured) {
  try {
    firebaseApp = getApps().length === 0 ? initializeApp(config!) : getApp();
    firestoreDb = getFirestore(firebaseApp);
  } catch (err) {
    console.error("Firebase initialization failed:", err);
  }
}

// ===================== MOCK FIRESTORE FOR SECURE OFFLINE/LOCAL DEVELOPMENT =====================
// Implementing a replica of onSnapshot and other Firestore APIs using LocalStorage.
// It will support automatic multi-tab sync using standard LocalStorage events!
const listeners: { [collectionName: string]: Array<(data: any[]) => void> } = {};
const docListeners: { [path: string]: Array<(data: any) => void> } = {};

const triggerCollectionListeners = (collectionName: string) => {
  if (listeners[collectionName]) {
    const data = getMockCollectionData(collectionName);
    listeners[collectionName].forEach((cb) => cb(data));
  }
};

const triggerDocListeners = (path: string, data: any) => {
  if (docListeners[path]) {
    docListeners[path].forEach((cb) => cb(data));
  }
};

// Listen to local storage changes from other tabs to achieve instantaneous cross-tab synchronization!
if (typeof window !== "undefined") {
  window.addEventListener("storage", (e) => {
    if (e.key && e.key.startsWith("mock_fs_")) {
      const parts = e.key.split("_");
      const collectionName = parts.slice(2).join("_");
      triggerCollectionListeners(collectionName);
    } else if (e.key && e.key.startsWith("mock_doc_")) {
      const path = e.key.substring(9);
      const dataStr = localStorage.getItem(e.key);
      const data = dataStr ? JSON.parse(dataStr) : null;
      triggerDocListeners(path, data);
    }
  });
}

const getMockCollectionData = (collectionName: string): any[] => {
  const key = `mock_fs_${collectionName}`;
  const stored = localStorage.getItem(key);
  if (stored) {
    return JSON.parse(stored);
  }
  
  // Seed initial data if mock database is empty
  let initialData: any[] = [];
  if (collectionName === "stories") initialData = defaultStories;
  else if (collectionName === "letters") initialData = defaultLetters;
  else if (collectionName === "reasons") initialData = defaultReasons;
  else if (collectionName === "memories") initialData = defaultMemories;
  else if (collectionName === "songs") initialData = defaultSongs;
  else if (collectionName === "goals") initialData = defaultGoals;
  else if (collectionName === "trivia") initialData = defaultTrivia;
  else if (collectionName === "preferences") initialData = defaultPreferences;
  else if (collectionName === "guess_dates") initialData = defaultGuessDates;
  else if (collectionName === "coupons") initialData = defaultCoupons;
  else if (collectionName === "time_capsules") initialData = defaultTimeCapsules;
  else if (collectionName === "markers") initialData = defaultMarkers;

  localStorage.setItem(key, JSON.stringify(initialData));
  return initialData;
};

const saveMockCollectionData = (collectionName: string, data: any[]) => {
  const key = `mock_fs_${collectionName}`;
  localStorage.setItem(key, JSON.stringify(data));
  triggerCollectionListeners(collectionName);
};

const getMockDocData = (path: string): any => {
  const key = `mock_doc_${path}`;
  const stored = localStorage.getItem(key);
  if (stored) {
    return JSON.parse(stored);
  }

  // Seed default docs for app config
  let initialData: any = null;
  if (path === "app_config/dates") initialData = defaultDates;
  else if (path === "app_config/chat_settings") initialData = defaultChatSettings;
  else if (path === "app_config/texts") initialData = defaultTextsConfig;
  else if (path === "app_config/security") initialData = { adminPassword: "2201", appPasscode: "010825" };

  if (initialData) {
    localStorage.setItem(key, JSON.stringify(initialData));
  }
  return initialData;
};

const saveMockDocData = (path: string, data: any) => {
  const key = `mock_doc_${path}`;
  localStorage.setItem(key, JSON.stringify(data));
  triggerDocListeners(path, data);
};

// ===================== EXPORTED REAL-TIME DATABASE SYNC LAYER =====================

/**
 * Seeds Firestore if empty, ensuring no compiling or publishing is needed to reset content.
 */
export const seedFirestoreIfEmpty = async () => {
  if (!firestoreDb) return;
  try {
    const checkCollection = async (colName: string, defaultList: any[]) => {
      const colRef = collection(firestoreDb, colName);
      const snapshot = await getDocs(colRef);
      if (snapshot.empty) {
        console.log(`Seeding firestore collection: ${colName}`);
        for (const item of defaultList) {
          const docId = item.id || `doc-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
          await setDoc(doc(firestoreDb, colName, docId), item);
        }
      }
    };

    const checkDoc = async (path: string, defaultDataObj: any) => {
      const docRef = doc(firestoreDb, path);
      const snapshot = await getDoc(docRef);
      if (!snapshot.exists()) {
        console.log(`Seeding firestore doc: ${path}`);
        await setDoc(docRef, defaultDataObj);
      }
    };

    // Seed collections
    await checkCollection("stories", defaultStories);
    await checkCollection("letters", defaultLetters);
    await checkCollection("reasons", defaultReasons);
    await checkCollection("memories", defaultMemories);
    await checkCollection("songs", defaultSongs);
    await checkCollection("goals", defaultGoals);
    await checkCollection("trivia", defaultTrivia);
    await checkCollection("preferences", defaultPreferences);
    await checkCollection("guess_dates", defaultGuessDates);
    await checkCollection("coupons", defaultCoupons);
    await checkCollection("time_capsules", defaultTimeCapsules);
    await checkCollection("markers", defaultMarkers);

    // Seed config documents
    await checkDoc("app_config/dates", defaultDates);
    await checkDoc("app_config/chat_settings", defaultChatSettings);
    await checkDoc("app_config/texts", defaultTextsConfig);
    await checkDoc("app_config/security", { adminPassword: "2201", appPasscode: "010825" });

    console.log("Firestore seeding completed check successfully!");
  } catch (error) {
    console.error("Error during Firestore seeding:", error);
  }
};

// Trigger seed checks in background if Firestore is active
if (firestoreDb) {
  seedFirestoreIfEmpty();
}

/**
 * Listens to a collection's changes in real-time. Automatically adapts to Firestore or local sync.
 */
export const syncCollection = <T>(collectionName: string, onUpdate: (data: T[]) => void): (() => void) => {
  if (firestoreDb) {
    try {
      const colRef = collection(firestoreDb, collectionName);
      const unsubscribe = onSnapshot(colRef, (snapshot) => {
        const list: T[] = [];
        snapshot.forEach((doc) => {
          list.push({ ...doc.data(), id: doc.id } as unknown as T);
        });
        onUpdate(list);
      }, (error) => {
        console.error(`Firestore snapshot error for collection "${collectionName}":`, error);
        // Fallback to mock on snapshot failure
        onUpdate(getMockCollectionData(collectionName));
      });
      return unsubscribe;
    } catch (e) {
      console.error(`Error setting up Firestore sync for "${collectionName}":`, e);
    }
  }

  // Mock real-time listener fallback
  if (!listeners[collectionName]) {
    listeners[collectionName] = [];
  }
  listeners[collectionName].push(onUpdate);
  onUpdate(getMockCollectionData(collectionName) as unknown as T[]);

  return () => {
    listeners[collectionName] = listeners[collectionName].filter((cb) => cb !== onUpdate);
  };
};

/**
 * Listens to a single document's changes in real-time.
 */
export const syncDoc = <T>(path: string, onUpdate: (data: T | null) => void): (() => void) => {
  if (firestoreDb) {
    try {
      const docRef = doc(firestoreDb, path);
      const unsubscribe = onSnapshot(docRef, (snapshot) => {
        if (snapshot.exists()) {
          onUpdate(snapshot.data() as T);
        } else {
          onUpdate(null);
        }
      }, (error) => {
        console.error(`Firestore snapshot error for document "${path}":`, error);
        onUpdate(getMockDocData(path));
      });
      return unsubscribe;
    } catch (e) {
      console.error(`Error setting up Firestore doc sync for "${path}":`, e);
    }
  }

  // Mock doc listener fallback
  if (!docListeners[path]) {
    docListeners[path] = [];
  }
  docListeners[path].push(onUpdate);
  onUpdate(getMockDocData(path) as T);

  return () => {
    docListeners[path] = docListeners[path].filter((cb) => cb !== onUpdate);
  };
};

/**
 * Saves a document or updates an existing one inside a collection.
 */
export const saveDocument = async (collectionName: string, id: string, data: any): Promise<void> => {
  if (firestoreDb) {
    try {
      const docRef = doc(firestoreDb, collectionName, id);
      await setDoc(docRef, { ...data, id }, { merge: true });
      return;
    } catch (error) {
      console.error(`Firestore save failed for col "${collectionName}" doc "${id}":`, error);
    }
  }

  // Mock storage save
  const list = getMockCollectionData(collectionName);
  const index = list.findIndex((item) => item.id === id);
  const updatedDoc = { ...data, id };
  if (index >= 0) {
    list[index] = updatedDoc;
  } else {
    list.push(updatedDoc);
  }
  saveMockCollectionData(collectionName, list);
};

/**
 * Deletes a document from a collection.
 */
export const deleteDocument = async (collectionName: string, id: string): Promise<void> => {
  if (firestoreDb) {
    try {
      const docRef = doc(firestoreDb, collectionName, id);
      await deleteDoc(docRef);
      return;
    } catch (error) {
      console.error(`Firestore delete failed for col "${collectionName}" doc "${id}":`, error);
    }
  }

  // Mock storage delete
  const list = getMockCollectionData(collectionName);
  const filtered = list.filter((item) => item.id !== id);
  saveMockCollectionData(collectionName, filtered);
};

/**
 * Saves/updates a single configuration document (e.g., app_config/texts, app_config/dates).
 */
export const saveConfigDoc = async (path: string, data: any): Promise<void> => {
  if (firestoreDb) {
    try {
      const docRef = doc(firestoreDb, path);
      await setDoc(docRef, data, { merge: true });
      return;
    } catch (error) {
      console.error(`Firestore save failed for config "${path}":`, error);
    }
  }

  // Mock storage config save
  const current = getMockDocData(path) || {};
  const merged = { ...current, ...data };
  saveMockDocData(path, merged);
};

/**
 * Helper to update local custom Firebase settings JSON directly in runtime.
 */
export const updateLocalFirebaseConfig = (configJsonStr: string): boolean => {
  try {
    JSON.parse(configJsonStr);
    localStorage.setItem("firebase_config_json", configJsonStr);
    // Restart app or reload context
    setTimeout(() => {
      window.location.reload();
    }, 500);
    return true;
  } catch (e) {
    console.error("Invalid firebase configuration JSON:", e);
    return false;
  }
};

export const clearLocalFirebaseConfig = () => {
  localStorage.removeItem("firebase_config_json");
  setTimeout(() => {
    window.location.reload();
  }, 500);
};
