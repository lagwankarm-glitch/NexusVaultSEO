import React, { useState } from 'react';
import { Award, Users, ChevronRight, Star } from 'lucide-react';
import { Game } from '../types';

interface GameCardProps {
  game: Game;
  communityAverage: string;
  communityCount: number;
  onReadReview: (game: Game) => void;
  onRateGame: (gameId: string) => void;
}

export const GameCard: React.FC<GameCardProps> = ({
  game,
  communityAverage,
  communityCount,
  onReadReview,
  onRateGame,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div className="group glass-panel rounded-2xl overflow-hidden glass-panel-hover flex flex-col justify-between transition-all duration-300 border border-white/10 hover:border-violet-500/40">
      
      {/* Top Media: Official Steam Poster Image */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-slate-800 animate-pulse flex items-center justify-center text-slate-600 text-xs">
            Loading artwork...
          </div>
        )}

        {imageError ? (
          <div className="w-full h-full bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-900 flex flex-col items-center justify-center p-4 text-center">
            <span className="font-display font-bold text-lg text-slate-200">{game.title}</span>
            <span className="text-xs text-slate-400 mt-1">{game.category}</span>
          </div>
        ) : (
          <img 
            src={game.coverImage} 
            alt={game.coverAlt || `Official cover poster art for ${game.title} game review`}
            referrerPolicy="no-referrer"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[#0d121e] via-transparent to-transparent"></div>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold tracking-wide bg-slate-950/80 backdrop-blur-md text-cyan-300 border border-white/10">
            {game.category}
          </span>

          <div className="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold bg-violet-600/90 text-white shadow-md backdrop-blur-md">
            <Award className="w-3.5 h-3.5 text-amber-300" />
            <span className="tabular-nums">{game.criticScore.toFixed(1)}</span>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Clean Unboxed Metadata */}
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1.5 font-medium">
            <span>{game.developer}</span>
            <span aria-hidden="true">·</span>
            <span>{game.platforms.slice(0, 2).join(', ')}{game.platforms.length > 2 ? ' +' : ''}</span>
          </div>

          <h3 className="font-display font-bold text-lg text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
            <button 
              onClick={() => onReadReview(game)}
              className="text-left hover:underline focus:outline-none"
            >
              {game.title}
            </button>
          </h3>

          <p className="text-xs text-slate-300 mt-2 line-clamp-2 leading-relaxed">
            {game.summary}
          </p>
        </div>

        {/* Footer: Dynamic Community Score & Action Buttons */}
        <div className="pt-3.5 border-t border-white/10 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-emerald-400" />
            <div className="text-xs">
              <span className="font-bold text-emerald-400 tabular-nums">{communityAverage}</span>
              <span className="text-[11px] text-slate-400 ml-1">({communityCount})</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => onReadReview(game)}
              className="text-xs font-medium text-slate-200 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 px-3 py-1.5 rounded-lg border border-white/10 transition-colors active:scale-[0.98]"
            >
              Read Review
            </button>
            <button 
              onClick={() => onRateGame(game.id)}
              className="flex items-center gap-1 text-xs font-semibold text-cyan-300 hover:text-white bg-cyan-950/60 hover:bg-cyan-900/60 px-3 py-1.5 rounded-lg border border-cyan-500/30 transition-colors active:scale-[0.98]"
            >
              <Star className="w-3 h-3 text-cyan-400 fill-cyan-400/30" />
              <span>Rate Game</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
