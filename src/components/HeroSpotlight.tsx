import React, { useState } from 'react';
import { BookOpen, MessageSquarePlus, Award, Users } from 'lucide-react';
import { Game } from '../types';

interface HeroSpotlightProps {
  game: Game;
  communityAverage: string;
  communityCount: number;
  onReadReview: (game: Game) => void;
  onAddScore: (gameId: string) => void;
}

export const HeroSpotlight: React.FC<HeroSpotlightProps> = ({
  game,
  communityAverage,
  communityCount,
  onReadReview,
  onAddScore,
}) => {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <section id="hero" className="relative rounded-3xl overflow-hidden border border-white/10 group bg-slate-950">
      {/* Background Poster Banner with Measured Scrim */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
        style={{
          backgroundImage: imageFailed 
            ? 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)' 
            : `url('${game.heroBanner}')`,
        }}
      >
        <img 
          src={game.heroBanner} 
          alt={game.heroBannerAlt || `Cinematic poster showcase for ${game.title} editorial review`} 
          className="hidden" 
          onError={() => setImageFailed(true)} 
        />
      </div>

      {/* Measured Dark Scrims for WCAG AA Contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#080b12] via-[#080b12]/85 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#080b12] via-[#080b12]/70 to-transparent"></div>

      {/* Content Container */}
      <div className="relative z-10 p-6 sm:p-10 md:p-14 lg:p-16 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div className="max-w-2xl space-y-4">
          
          {/* Clean Unboxed Metadata (Zero-Pill Discipline) */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-300">
            <span className="text-violet-400 font-bold uppercase tracking-wider">Editor's Choice</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>{game.category}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>{game.developer}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>{game.releaseYear}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white leading-tight tracking-tight text-balance">
            {game.title}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed line-clamp-3">
            {game.summary}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-3">
            <button 
              onClick={() => onReadReview(game)}
              className="flex items-center gap-2 bg-white hover:bg-slate-200 text-slate-900 font-bold text-sm px-5 sm:px-6 py-3 rounded-xl transition-all duration-200 shadow-md active:scale-[0.98]"
            >
              <BookOpen className="w-4 h-4 text-violet-700" />
              <span>Read Editorial Breakdown</span>
            </button>
            <button 
              onClick={() => onAddScore(game.id)}
              className="flex items-center gap-2 bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white border border-white/15 text-sm font-medium px-5 sm:px-6 py-3 rounded-xl transition-all duration-200 active:scale-[0.98]"
            >
              <MessageSquarePlus className="w-4 h-4 text-cyan-400" />
              <span>Add Community Score</span>
            </button>
          </div>
        </div>

        {/* Dual Score Badges */}
        <div className="flex items-center gap-4 bg-slate-950/80 p-4 rounded-2xl border border-white/10 backdrop-blur-xl shrink-0 self-start lg:self-auto">
          <div className="text-center px-4 border-r border-white/10">
            <div className="flex items-center justify-center gap-1 text-cyan-400">
              <Award className="w-5 h-5" />
              <span className="text-3xl sm:text-4xl font-display font-extrabold tabular-nums">
                {game.criticScore.toFixed(1)}
              </span>
            </div>
            <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 mt-1">
              Critic Score
            </div>
          </div>

          <div className="text-center px-4">
            <div className="flex items-center justify-center gap-1 text-emerald-400">
              <Users className="w-5 h-5" />
              <span className="text-3xl sm:text-4xl font-display font-extrabold tabular-nums">
                {communityAverage}
              </span>
            </div>
            <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 mt-1">
              Community ({communityCount})
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
