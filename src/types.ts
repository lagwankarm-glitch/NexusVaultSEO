export interface CommunityReview {
  id: string;
  gameId: string;
  user: string;
  avatarColor: string;
  score: number;
  hours: number;
  platform: string;
  date: string;
  headline: string;
  text: string;
  recommended: boolean;
  playstyle: string;
  difficulty: 'Accessible' | 'Balanced' | 'Challenging' | 'Punishing';
  likes: number;
}

export interface ScoreBreakdown {
  gameplay: number;
  story: number;
  visuals: number;
  audio: number;
  performance: number;
}

export interface Game {
  id: string;
  title: string;
  tagline: string;
  category: 'Action RPG' | 'Souls-like' | 'Indie' | 'Shooter' | 'CRPG' | 'Horror';
  developer: string;
  publisher: string;
  releaseYear: number;
  platforms: string[];
  criticScore: number;
  scoreBreakdown: ScoreBreakdown;
  coverImage: string;
  heroBanner: string;
  summary: string;
  fullReview: string;
  pros: string[];
  cons: string[];
  performanceNotes: string;
  playtimeEstimate: string;
}
