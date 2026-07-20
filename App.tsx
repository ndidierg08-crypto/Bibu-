import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Heart, 
  MessageCircle, 
  BookOpen, 
  Mail, 
  Smile, 
  Camera, 
  Music, 
  Compass, 
  Gamepad2, 
  Gift, 
  Clock, 
  MapPin, 
  Settings, 
  Sparkles, 
  Menu, 
  X,
  Lock
} from "lucide-react";

// Import types
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
  BoyfriendChatSettings,
  AppTextsConfig,
  SecurityConfig
} from "./types";

// Import firebase real-time sync methods
import {
  syncCollection,
  syncDoc,
  saveDocument,
  deleteDocument,
  saveConfigDoc,
  defaultTextsConfig,
  isFirebaseConfigured
} from "./firebase";

// Import default data
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
  defaultChatSettings
} from "./defaultData";
// Import sub-views
import DashboardView from "./components/DashboardView";
import ChatView from "./components/ChatView";
import StoriesView from "./components/StoriesView";
import LettersView from "./components/LettersView";
import ReasonsView from "./components/ReasonsView";
import MemoriesView from "./components/MemoriesView";
import MusicView from "./components/MusicView";
import GoalsView from "./components/GoalsView";
import GamesView from "./components/GamesView";
import SurprisesView from "./components/SurprisesView";
import CapsuleView from "./components/CapsuleView";
import MapView from "./components/MapView";
import SettingsView from "./components/SettingsView";

// Import lock screen
import LockScreen from "./components/LockScreen";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBoyfriendMode, setIsBoyfriendMode] = useState(false);
  const [isAdminPasswordModalOpen, setIsAdminPasswordModalOpen] = useState(false);
  const [adminPasswordInput, setAdminPasswordInput] = useState("");
  const [adminPasswordError, setAdminPasswordError] = useState("");

  // --- PASSCODE LOCK SCREEN STATE ---
  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    const saved = localStorage.getItem("app_unlocked_010825");
    return saved === "true";
  });

  // --- REAL-TIME FIRESTORE/LOCAL SYNCED STATE ---
  const [dates, setDates] = useState<RelationshipDates>(defaultDates);
  const [memories, setMemories] = useState<Memory[]>([]);
  const [goals, setGoals] = useState<FutureGoal[]>([]);
  const [markers, setMarkers] = useState<MapMarker[]>([]);
  const [chatSettings, setChatSettings] = useState<BoyfriendChatSettings>(defaultChatSettings);
  const [stories, setStories] = useState<BedtimeStory[]>([]);
  const [letters, setLetters] = useState<LoveLetter[]>([]);
  const [reasons, setReasons] = useState<LoveReason[]>([]);
  const [songs, setSongs] = useState<SongItem[]>([]);
  const [trivia, setTrivia] = useState<TriviaQuestion[]>([]);
  const [preferences, setPreferences] = useState<PreferenceQuestion[]>([]);
  const [guessDates, setGuessDates] = useState<GuessDateQuestion[]>([]);
  const [coupons, setCoupons] = useState<LoveCoupon[]>([]);
  const [timeCapsules, setTimeCapsules] = useState<TimeCapsuleLetter[]>([]);

  // Customizable configs from Firestore
  const [texts, setTexts] = useState<AppTextsConfig>(defaultTextsConfig);
  const [security, setSecurity] = useState<SecurityConfig>({ adminPassword: "2201", appPasscode: "010825" });

  // Hidden Trigger Hearts clicks
  const [heartClicks, setHeartClicks] = useState<number>(0);
  const [lastHeartClick, setLastHeartClick] = useState<number>(0);

  const handleHeartClick = () => {
    const now = Date.now();
    if (now - lastHeartClick < 1500) {
      const newCount = heartClicks + 1;
      if (newCount >= 3) {
        setHeartClicks(0);
        setIsAdminPasswordModalOpen(true);
      } else {
        setHeartClicks(newCount);
      }
    } else {
      setHeartClicks(1);
    }
    setLastHeartClick(now);
  };

  // Sync state with real-time listeners on mount
  useEffect(() => {
    const unsubscribes: Array<() => void> = [];

    // Collections
    unsubscribes.push(syncCollection<Memory>("memories", setMemories));
    unsubscribes.push(syncCollection<FutureGoal>("goals", setGoals));
    unsubscribes.push(syncCollection<MapMarker>("markers", setMarkers));
    unsubscribes.push(syncCollection<BedtimeStory>("stories", setStories));
    unsubscribes.push(syncCollection<LoveLetter>("letters", setLetters));
    unsubscribes.push(syncCollection<LoveReason>("reasons", setReasons));
    unsubscribes.push(syncCollection<SongItem>("songs", setSongs));
    unsubscribes.push(syncCollection<TriviaQuestion>("trivia", setTrivia));
    unsubscribes.push(syncCollection<PreferenceQuestion>("preferences", setPreferences));
    unsubscribes.push(syncCollection<GuessDateQuestion>("guess_dates", setGuessDates));
    unsubscribes.push(syncCollection<LoveCoupon>("coupons", setCoupons));
    unsubscribes.push(syncCollection<TimeCapsuleLetter>("time_capsules", setTimeCapsules));

    // Config documents
    unsubscribes.push(syncDoc<RelationshipDates>("app_config/dates", (data) => {
      if (data) setDates(data);
    }));
    unsubscribes.push(syncDoc<BoyfriendChatSettings>("app_config/chat_settings", (data) => {
      if (data) setChatSettings(data);
    }));
    unsubscribes.push(syncDoc<AppTextsConfig>("app_config/texts", (data) => {
      if (data) setTexts(data);
    }));
    unsubscribes.push(syncDoc<SecurityConfig>("app_config/security", (data) => {
      if (data) setSecurity(data);
    }));

    return () => {
      unsubscribes.forEach((un) => un());
    };
  }, []);

  // --- HANDLER FUNCTIONS WRITING BACK TO SYNCHRONIZED STORAGE ---
  const handleUpdateDates = async (newDates: RelationshipDates) => {
    await saveConfigDoc("app_config/dates", newDates);
  };

  const handleUpdateSettings = async (newSettings: BoyfriendChatSettings) => {
    await saveConfigDoc("app_config/chat_settings", newSettings);
  };

  const handleUpdateTexts = async (newTexts: AppTextsConfig) => {
    await saveConfigDoc("app_config/texts", newTexts);
  };

  const handleUpdateSecurity = async (newSecurity: SecurityConfig) => {
    await saveConfigDoc("app_config/security", newSecurity);
  };

  const handleSaveCollection = async (collectionName: string, currentList: any[], newList: any[]) => {
    // Find deleted items
    const deleted = currentList.filter(item => !newList.some(n => n.id === item.id));
    for (const item of deleted) {
      await deleteDocument(collectionName, item.id);
    }

    // Find added or updated items
    const addedOrUpdated = newList.filter(item => {
      const orig = currentList.find(o => o.id === item.id);
      return !orig || JSON.stringify(orig) !== JSON.stringify(item);
    });
    for (const item of addedOrUpdated) {
      await saveDocument(collectionName, item.id, item);
    }
  };

  const handleToggleGoal = async (id: string) => {
    const goal = goals.find((g) => g.id === id);
    if (goal) {
      const updated = { ...goal, isCompleted: !goal.isCompleted };
      await saveDocument("goals", id, updated);
    }
  };

  const handleAddGoal = async (newGoal: Omit<FutureGoal, "id" | "isCompleted">) => {
    const id = "g-" + Date.now();
    await saveDocument("goals", id, { ...newGoal, id, isCompleted: false });
  };

  const handleDeleteGoal = async (id: string) => {
    await deleteDocument("goals", id);
  };

  const handleAddMemory = async (newMemory: Omit<Memory, "id">) => {
    const id = "m-" + Date.now();
    await saveDocument("memories", id, { ...newMemory, id });
  };

  const handleDeleteMemory = async (id: string) => {
    await deleteDocument("memories", id);
  };

  const handleAddMarker = async (newMarker: Omit<MapMarker, "id">) => {
    const id = "map-" + Date.now();
    await saveDocument("markers", id, { ...newMarker, id });
  };

  const handleDeleteMarker = async (id: string) => {
    await deleteDocument("markers", id);
  };

  // Sidebar Tabs Config (names are read from customizable text configuration!)
  const navigationTabs = [
    { id: "dashboard", label: texts.navDashboard || "Inicio", icon: Heart },
    { id: "chat", label: texts.navChat || "Pregúntale a mi Novio", icon: MessageCircle },
    { id: "stories", label: texts.navStories || "Cuentos de Amor", icon: BookOpen },
    { id: "letters", label: texts.navLetters || "Cartitas 'Abrir cuando'", icon: Mail },
    { id: "reasons", label: texts.navReasons || "Cosas que me encantan", icon: Smile },
    { id: "memories", label: texts.navMemories || "Recuerdos", icon: Camera },
    { id: "music", label: texts.navMusic || "Playlist Significativa", icon: Music },
    { id: "goals", label: texts.navGoals || "Metas & Sueños", icon: Compass },
    { id: "games", label: texts.navGames || "Minijuegos", icon: Gamepad2 },
    { id: "surprises", label: texts.navSurprises || "Sorpresas", icon: Gift },
    { id: "capsule", label: texts.navCapsule || "Cápsula del Tiempo", icon: Clock },
    { id: "map", label: texts.navMap || "Mapa de Amor", icon: MapPin },
    { id: "settings", label: "Editor Modo Novio", icon: Settings }
  ];

  // Restrict settings tab visibility to BoyfriendMode only so normal readers can't see it
  const visibleTabs = navigationTabs.filter((tab) => tab.id !== "settings" || isBoyfriendMode);

  const getActiveTabLabel = () => {
    const tab = navigationTabs.find((t) => t.id === activeTab);
    return tab ? tab.label : "Nuestra Historia";
  };

  // Render Lock Screen if the app is locked
  if (!isUnlocked) {
    return (
      <LockScreen 
        onUnlock={() => {
          setIsUnlocked(true);
          localStorage.setItem("app_unlocked_010825", "true");
        }} 
        texts={texts}
        passcode={security.appPasscode || "010825"}
      />
    );
  }


  return (
    <div className={`min-h-screen bg-gradient-to-br ${texts.appThemeColorFrom || "from-rose-300"} ${texts.appThemeColorVia || "via-pink-200"} ${texts.appThemeColorTo || "to-amber-100"} text-rose-950 flex flex-col md:flex-row font-sans selection:bg-rose-100 selection:text-rose-900`}>
      
      {/* ===================== MOBILE HEADER ===================== */}
      <header className="md:hidden bg-white/40 backdrop-blur-md border-b border-white/40 px-4 py-3.5 flex items-center justify-between sticky top-0 z-40 shadow-xs">
        <div className="flex items-center gap-2">
          <div 
            onClick={handleHeartClick}
            className="w-8 h-8 rounded-full bg-rose-500 flex items-center justify-center text-white animate-heartbeat shadow-xs shadow-rose-200 cursor-pointer"
            title="❤️"
          >
            <Heart className="w-4 h-4 fill-current" />
          </div>
          <span className="font-serif font-black text-sm tracking-tight text-rose-950">{texts.appTitle || "Nuestra Historia"}</span>
        </div>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 bg-white/50 backdrop-blur-xs rounded-xl text-rose-600 hover:bg-white/80 transition-colors cursor-pointer border border-white/40"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* ===================== MOBILE DRAWER MENU ===================== */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <div 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="fixed inset-0 bg-stone-950/20 backdrop-blur-xs z-40 md:hidden"
            ></div>

            {/* Slide-out Panel */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed top-0 left-0 h-full w-72 bg-white/80 backdrop-blur-xl border-r border-white/50 p-5 z-50 flex flex-col justify-between shadow-2xl md:hidden overflow-y-auto"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-white/30 pb-4">
                  <div className="flex items-center gap-2">
                    <div onClick={handleHeartClick} className="cursor-pointer" title="❤️">
                      <Heart className="w-5 h-5 text-rose-500 fill-current animate-heartbeat" />
                    </div>
                    <span className="font-serif font-black text-base text-rose-950">{texts.appTitle || "Nuestra Historia"}</span>
                  </div>
                  <button 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-1.5 bg-stone-100 rounded-full text-stone-500 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Mobile Links */}
                <nav className="space-y-1.5">
                  {visibleTabs.map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => {
                          setActiveTab(tab.id);
                          setIsMobileMenuOpen(false);
                        }}
                        className={`w-full p-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-all text-left cursor-pointer ${
                          isActive
                            ? "bg-rose-500 text-white shadow-md border border-rose-400"
                            : "text-rose-900 hover:bg-white/40"
                        }`}
                      >
                        <tab.icon className="w-4 h-4" />
                        {tab.label}
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Mobile Footer */}
              <div className="pt-4 border-t border-white/30 space-y-3">
                <div className="bg-white/50 border border-white/60 p-2.5 rounded-xl text-center backdrop-blur-md">
                  <p className="text-[10px] font-bold text-rose-900">Para: Mi Princesa Hermosa 👑</p>
                  <p className="text-[8px] text-rose-500/80">Hecho con amor eterno</p>
                </div>
                {isBoyfriendMode && (
                  <button
                    onClick={() => {
                      setIsBoyfriendMode(false);
                      setActiveTab("dashboard");
                      alert("Sesión de administrador cerrada 🌸");
                    }}
                    className="w-full p-2 bg-amber-500 border border-amber-500 text-white rounded-xl text-[9px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs"
                  >
                    <Lock className="w-3 h-3" />
                    Cerrar Editor
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ===================== DESKTOP SIDEBAR ===================== */}
      <aside className="hidden md:flex flex-col justify-between w-68 bg-white/40 backdrop-blur-xl border-r border-white/60 p-5 h-screen sticky top-0 shrink-0 shadow-lg">
        <div className="space-y-5 overflow-y-auto max-h-[calc(100vh-140px)] scrollbar-none pr-1">
          {/* Brand header */}
          <div className="flex items-center gap-2.5 pb-4 border-b border-white/30">
            <div 
              onClick={handleHeartClick}
              className="w-9 h-9 rounded-full bg-rose-500 flex items-center justify-center text-white animate-heartbeat shadow-xs shadow-rose-200 cursor-pointer"
              title="❤️"
            >
              <Heart className="w-4.5 h-4.5 fill-current" />
            </div>
            <div className="space-y-0.5">
              <h1 className="font-serif font-black text-sm tracking-tight text-rose-950">{texts.appTitle || "Nuestra Historia"}</h1>
              <span className="text-[9px] uppercase tracking-wider font-bold text-rose-500/80 block font-sans">{texts.appSubtitle || "Amor Real"}</span>
            </div>
          </div>

          {/* Desktop links */}
          <nav className="space-y-1">
            {visibleTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full p-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-all text-left cursor-pointer ${
                    isActive
                      ? "bg-rose-500 text-white shadow-md border border-rose-400 translate-x-1"
                      : "text-rose-900 hover:bg-white/30 hover:text-rose-950"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Desktop Footer */}
        <div className="space-y-3 pt-4 border-t border-white/30">
          <div className="flex justify-between items-center bg-white/50 backdrop-blur-md p-2 rounded-xl border border-white/60 text-[10px] font-sans font-bold">
            <span className="text-rose-900">Mi Princesa 👑</span>
            <span className="text-emerald-600 animate-pulse font-extrabold flex items-center gap-1">● ONLINE</span>
          </div>

          {isBoyfriendMode && (
            <button
              onClick={() => {
                setIsBoyfriendMode(false);
                setActiveTab("dashboard");
                alert("Sesión de administrador cerrada 🌸");
              }}
              className="w-full p-2 bg-amber-500 border border-amber-500 text-white rounded-xl text-[9px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs"
            >
              <Lock className="w-3 h-3" />
              Cerrar Editor
            </button>
          )}
        </div>
      </aside>


      {/* ===================== MAIN CONTENT CONTAINER ===================== */}
      <main className="flex-1 p-4 md:p-8 flex flex-col justify-between overflow-y-auto min-h-[calc(100vh-60px)] md:h-screen">
        <div className="flex-1">
          {/* Breadcrumbs or section heading */}
          <div className="hidden md:flex justify-between items-center mb-6">
            <div className="flex items-center gap-2 text-xs font-sans font-bold text-rose-900/80 bg-white/30 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/40">
              <span>{texts.appTitle || "Nuestra Historia de Amor"}</span>
              <span>/</span>
              <span className="text-rose-950">{getActiveTabLabel()}</span>
            </div>
            
            <div className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider text-rose-600 bg-white/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/50 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
              <span>{texts.globalFooterText || "Para el amor de mi vida"}</span>
            </div>
          </div>

          {/* Active view renderer */}
          <div className="animate-fade-in">
            {activeTab === "dashboard" && (
              <DashboardView dates={dates} onNavigate={(id) => setActiveTab(id)} />
            )}

            {activeTab === "chat" && (
              <ChatView settings={chatSettings} />
            )}

            {activeTab === "stories" && (
              <StoriesView 
                stories={stories} 
                onSaveStories={(newStories) => handleSaveCollection("stories", stories, newStories)} 
                isBoyfriendMode={isBoyfriendMode} 
              />
            )}

            {activeTab === "letters" && (
              <LettersView 
                letters={letters} 
                onSaveLetters={(newLetters) => handleSaveCollection("letters", letters, newLetters)} 
                isBoyfriendMode={isBoyfriendMode} 
              />
            )}

            {activeTab === "reasons" && (
              <ReasonsView 
                reasons={reasons} 
                onSaveReasons={(newReasons) => handleSaveCollection("reasons", reasons, newReasons)} 
                isBoyfriendMode={isBoyfriendMode} 
              />
            )}

            {activeTab === "memories" && (
              <MemoriesView 
                memories={memories} 
                onAddMemory={handleAddMemory} 
                onDeleteMemory={handleDeleteMemory} 
                isBoyfriendMode={isBoyfriendMode}
              />
            )}

            {activeTab === "music" && (
              <MusicView 
                songs={songs} 
                onSaveSongs={(newSongs) => handleSaveCollection("songs", songs, newSongs)} 
                isBoyfriendMode={isBoyfriendMode} 
              />
            )}

            {activeTab === "goals" && (
              <GoalsView 
                goals={goals} 
                onToggleGoal={handleToggleGoal} 
                onAddGoal={handleAddGoal} 
                onDeleteGoal={handleDeleteGoal} 
                isBoyfriendMode={isBoyfriendMode}
              />
            )}

            {activeTab === "games" && (
              <GamesView 
                trivia={trivia} 
                preferences={preferences} 
                guessDates={guessDates} 
                onSaveTrivia={(newTrivia) => handleSaveCollection("trivia", trivia, newTrivia)}
                onSavePreferences={(newPrefs) => handleSaveCollection("preferences", preferences, newPrefs)}
                onSaveGuessDates={(newGuess) => handleSaveCollection("guess_dates", guessDates, newGuess)}
                isBoyfriendMode={isBoyfriendMode}
              />
            )}

            {activeTab === "surprises" && (
              <SurprisesView coupons={coupons} />
            )}

            {activeTab === "capsule" && (
              <CapsuleView 
                letters={timeCapsules} 
                onSaveLetters={(newCaps) => handleSaveCollection("time_capsules", timeCapsules, newCaps)} 
                isBoyfriendMode={isBoyfriendMode} 
              />
            )}

            {activeTab === "map" && (
              <MapView 
                markers={markers} 
                onAddMarker={handleAddMarker} 
                onDeleteMarker={handleDeleteMarker} 
              />
            )}

            {activeTab === "settings" && (
              <SettingsView 
                dates={dates} 
                settings={chatSettings} 
                texts={texts}
                security={security}
                onUpdateDates={handleUpdateDates} 
                onUpdateSettings={handleUpdateSettings} 
                onUpdateTexts={handleUpdateTexts}
                onUpdateSecurity={handleUpdateSecurity}
              />
            )}
          </div>
        </div>

        {/* Global Footer element */}
        <footer className="text-center text-[10px] text-rose-300 font-sans mt-12 pt-4 border-t border-rose-100/30">
          <p>© {new Date().getFullYear()} {texts.appTitle || "Nuestra Historia de Amor"}. {texts.globalFooterText || "Diseñado para mi personita favorita de todo el mundo. ❤️"}</p>
        </footer>
      </main>

      {/* Admin Password Modal */}
      <AnimatePresence>
        {isAdminPasswordModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-rose-950/40 backdrop-blur-md">
            <div className="absolute inset-0" onClick={() => {
              setIsAdminPasswordModalOpen(false);
              setAdminPasswordInput("");
              setAdminPasswordError("");
            }}></div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -15 }}
              className="bg-white rounded-[32px] p-6 max-w-sm w-full text-center space-y-4 shadow-2xl relative z-10 border border-rose-50"
            >
              <div className="w-12 h-12 bg-rose-50 border border-rose-100 rounded-full flex items-center justify-center mx-auto text-rose-500">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-lg text-rose-950">Modo Administrador 🔑</h3>
              <p className="text-xs text-rose-800 leading-relaxed font-sans font-medium">
                Introduce la contraseña de administrador (Novio) para habilitar el modo de edición de contenidos.
              </p>
              
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (adminPasswordInput === (security.adminPassword || "2201")) {
                    setIsBoyfriendMode(true);
                    setIsAdminPasswordModalOpen(false);
                    setAdminPasswordInput("");
                    setAdminPasswordError("");
                    setActiveTab("settings");
                    alert("¡Sesión de administrador iniciada con éxito! Bienvenido de vuelta 💖✍️");
                  } else {
                    setAdminPasswordError("Contraseña incorrecta mi pana. ¡Inténtalo de nuevo! 🧐");
                    setAdminPasswordInput("");
                  }
                }}
                className="space-y-3"
              >
                <input
                  type="password"
                  value={adminPasswordInput}
                  onChange={(e) => {
                    setAdminPasswordError("");
                    setAdminPasswordInput(e.target.value);
                  }}
                  placeholder="Contraseña de Admin"
                  className="w-full text-center text-sm px-4 py-2.5 bg-rose-50/30 border border-rose-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400 font-bold"
                  autoFocus
                  required
                />
                {adminPasswordError && (
                  <p className="text-[10px] font-bold text-rose-700 animate-fade-in">{adminPasswordError}</p>
                )}

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsAdminPasswordModalOpen(false);
                      setAdminPasswordInput("");
                      setAdminPasswordError("");
                    }}
                    className="flex-1 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs py-2.5 rounded-full transition-all cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs py-2.5 rounded-full transition-all cursor-pointer shadow-md"
                  >
                    Verificar
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>


    </div>
  );
}
