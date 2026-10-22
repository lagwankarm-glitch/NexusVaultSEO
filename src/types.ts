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
  coverAlt: string;
  heroBanner: string;
  heroBannerAlt: string;
  summary: string;
  fullReview: string;
  pros: string[];
  cons: string[];
  performanceNotes: string;
  playtimeEstimate: string;
  // SEO & AEO Specific Properties for Academic Presentation
  seo: {
    metaTitle: string; // Max 60 chars with main keyword near start
    metaDescription: string; // Max 160 chars with summary, keyword, & reason to click
    h1Heading: string; // Primary H1 heading closely related to keyword
    h2Heading: string; // Secondary H2 heading closely related to keyword
    h3Heading: string; // Tertiary H3 heading closely related to keyword
    targetKeyword: string; // Main free target keyword
    canonicalSlug: string; // Unique URL path
    searchSnippetCta: string; // Why people click
    aeoQuestions: Array<{
      question: string;
      answer: string;
      targetIntent: string;
    }>;
  };
}
