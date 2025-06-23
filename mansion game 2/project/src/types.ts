export interface User {
  id: string;
  username: string;
  email?: string;
  highScore: number;
  gamesPlayed: number;
  gamesWon: number;
  createdAt: number;
}

export interface Suspect {
  id: string;
  name: string;
  role: string;
  avatar: string;
  background: string;
  lastSeen: string;
  motive: string;
  alibi: string;
  personality: string;
  isKiller: boolean;
  interactionCount: number;
  maxInteractions: number;
  responses: string[];
  clues: string[];
  suspicionLevel: number;
}

export interface GameStory {
  id: string;
  title: string;
  setting: string;
  victim: {
    name: string;
    role: string;
    background: string;
  };
  description: string;
  atmosphere: string;
  keyEvidence: string[];
}

export interface GameState {
  phase: 'login' | 'menu' | 'difficulty' | 'gameMode' | 'investigation' | 'accusation' | 'verdict';
  user: User | null;
  gameMode: 'solo' | 'multiplayer' | null;
  difficulty: 'easy' | 'medium' | 'hard' | null;
  story: GameStory | null;
  suspects: Suspect[];
  currentSuspect: Suspect | null;
  cluesFound: string[];
  playerAccusation: string | null;
  gameScore: number;
  gameStartTime: number;
  currentPlayer: 1 | 2;
  player1Accusation: string | null;
  player2Accusation: string | null;
  totalQuestions: number;
  maxQuestions: number;
}

export interface ClueEntry {
  suspect: string;
  clue: string;
  importance: 'low' | 'medium' | 'high';
  timestamp: number;
}

export type Difficulty = 'easy' | 'medium' | 'hard';
export type GameMode = 'solo' | 'multiplayer';