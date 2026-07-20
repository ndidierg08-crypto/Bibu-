export interface RelationshipDates {
  metDate: string; // YYYY-MM-DD
  girlfriendDate: string; // YYYY-MM-DD
}

export interface BedtimeStory {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: "met" | "love" | "bedtime";
  readTime: string;
}

export interface LoveLetter {
  id: string;
  trigger: string; // e.g., "cuando me extrañes"
  emoji: string;
  content: string;
  bgGradient: string;
}

export interface LoveReason {
  id: string;
  text: string;
  category: "personality" | "smile" | "moments" | "future";
  emoji: string;
}

export interface Memory {
  id: string;
  title: string;
  date: string;
  type: "photo" | "video" | "audio";
  url: string;
  comment: string;
}

export interface SongItem {
  id: string;
  title: string;
  artist: string;
  youtubeId: string; // YouTube video ID for real embeds!
  explanation: string;
  albumArt: string;
}

export interface FutureGoal {
  id: string;
  title: string;
  category: "places" | "activities" | "dreams" | "house";
  isCompleted: boolean;
  targetDate?: string;
  image?: string;
}

export interface MapMarker {
  id: string;
  x: number; // 0-100 percentage inside the custom interactive SVG map
  y: number; // 0-100 percentage
  name: string;
  type: "met" | "first_date" | "favorite" | "future";
  description: string;
  date: string;
  image?: string;
}

export interface TimeCapsuleLetter {
  id: string;
  title: string;
  unlockDate: string; // YYYY-MM-DD
  content: string;
  bgType: "anniversary" | "christmas" | "birthday" | "future";
}

export interface TriviaQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface PreferenceQuestion {
  id: string;
  question: string;
  optionA: string;
  optionB: string;
  boyfriendChoice: "A" | "B";
  explanation: string;
}

export interface GuessDateQuestion {
  id: string;
  event: string;
  correctDate: string; // YYYY-MM-DD
  explanation: string;
}

export interface LoveCoupon {
  id: string;
  title: string;
  description: string;
  emoji: string;
  code: string;
}

export interface BoyfriendChatSettings {
  styleGuide: string;
  relationshipFacts: string[];
  customInstructions: string;
}

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
  appThemeColorFrom: string;
  appThemeColorVia: string;
  appThemeColorTo: string;
  globalFooterText: string;
  lovePhrases: string[];
}

export interface SecurityConfig {
  adminPassword: string;
  appPasscode: string;
}
