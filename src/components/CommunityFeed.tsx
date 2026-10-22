import React, { useState } from 'react';
import { Users, Heart, Sparkles, Filter, ChevronRight, MessageSquare } from 'lucide-react';
import { Game, CommunityReview } from '../types';

interface CommunityFeedProps {
  games: Game[];
  communityReviews: CommunityReview[];
  onOpenSubmitModal: (gameId?: string) => void;
  onLikeReview: (reviewId: string) => void;
  likedReviewIds: Set<string>;
  onSelectGame: (game: Game) => void;
}

export const CommunityFeed: React.FC<CommunityFeedProps> = ({
  games,
  communityReviews,
  onOpenSubmitModal,
  onLikeReview,
  likedReviewIds,
  onSelectGame,
}) => {
  const [filterGameId, setFilterGameId] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'helpful' | 'recent' | 'highest'>('helpful');

  const filteredReviews = communityReviews.filter((r) => {
    if (filterGameId === 'all') return true;
    return r.gameId === filterGameId;
  });

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (sortBy === 'helpful') return b.likes - a.likes;
    if (sortBy === 'highest') return b.score - a.score;
    return 0; // Default order is recent first as loaded
  });

  const getGame = (gameId: string) => games.find((g) => g.id === gameId);

  return (
    <section id="community" className="space-y-6 pt-4">
      
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-display font-bold text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-violet-400" />
            Live Gamer Consensus
          </h2>
          <p className="text-slate-400 text-sm mt-0.5">
            Unfiltered community reviews and verified hours from active players
          </p>
        </div>

        <button 
          onClick={() => onOpenSubmitModal()}
          className="self-start sm:self-auto flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm font-semibold transition-colors group"
        >
          <span>Share Your Playthrough Experience</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Filter and Sort Ribbon */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-slate-900/60 border border-white/5 text-xs">
        <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1 sm:pb-0">
          <span className="text-slate-400 font-semibold uppercase tracking-wider shrink-0 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Filter:
          </span>
          <button
            onClick={() => setFilterGameId('all')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap shrink-0 ${
              filterGameId === 'all'
                ? 'bg-violet-600 text-white'
                : 'bg-slate-800/80 text-slate-300 hover:text-white'
            }`}
          >
            All Titles ({communityReviews.length})
          </button>
          {games.map((g) => {
            const count = communityReviews.filter((r) => r.gameId === g.id).length;
            return (
              <button
                key={g.id}
                onClick={() => setFilterGameId(g.id)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap shrink-0 ${
                  filterGameId === g.id
                    ? 'bg-violet-600 text-white'
                    : 'bg-slate-800/80 text-slate-300 hover:text-white'
                }`}
              >
                {g.title.split(':')[0]} ({count})
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-slate-400">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1 text-slate-200 focus:outline-none"
          >
            <option value="helpful">Most Helpful</option>
            <option value="highest">Highest Score</option>
            <option value="recent">Latest Reviews</option>
          </select>
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedReviews.map((rev) => {
          const game = getGame(rev.gameId);
          const isLiked = likedReviewIds.has(rev.id);

          return (
            <div 
              key={rev.id} 
              className="glass-panel p-5 rounded-2xl flex flex-col justify-between space-y-4 hover:border-violet-500/40 transition-all duration-200 border border-white/5"
            >
              <div>
                {/* Game & Score row */}
                <div className="flex items-center justify-between mb-3">
                  {game ? (
                    <button
                      onClick={() => onSelectGame(game)}
                      className="text-xs font-bold text-cyan-400 hover:underline line-clamp-1 text-left"
                    >
                      {game.title}
                    </button>
                  ) : (
                    <span className="text-xs font-bold text-slate-400">Featured Game</span>
                  )}

                  <span className={`text-xs font-extrabold px-2 py-0.5 rounded tabular-nums shrink-0 ${
                    rev.score >= 9 ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                    rev.score >= 7.5 ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' :
                    'bg-amber-500/20 text-amber-400'
                  }`}>
                    {rev.score.toFixed(1)} / 10
                  </span>
                </div>

                {/* Headline */}
                {rev.headline && (
                  <h4 className="text-sm font-bold text-white mb-2 line-clamp-1">
                    "{rev.headline}"
                  </h4>
                )}

                {/* Body Text */}
                <p className="text-xs text-slate-300 leading-relaxed line-clamp-4">
                  {rev.text}
                </p>
              </div>

              {/* Card Footer: Reviewer info & Likes */}
              <div className="border-t border-white/5 pt-3.5 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <div className={`w-6 h-6 rounded-full bg-gradient-to-tr ${rev.avatarColor} flex items-center justify-center text-[10px] font-bold text-white shrink-0 shadow-sm`}>
                    {rev.user.charAt(0)}
                  </div>
                  <div>
                    <span className="text-slate-200 font-semibold">{rev.user}</span>
                    <span className="text-[11px] text-slate-400 ml-1.5 font-normal">
                      · {rev.hours}h ({rev.platform})
                    </span>
                  </div>
                </div>

                <button 
                  onClick={() => onLikeReview(rev.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition-all active:scale-[0.95] ${
                    isLiked 
                      ? 'border-rose-500/40 bg-rose-500/10 text-rose-400' 
                      : 'border-white/5 bg-slate-800/60 text-slate-400 hover:text-rose-400 hover:border-rose-500/30'
                  }`}
                  title="Mark as helpful / upvote"
                >
                  <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-rose-400 text-rose-400' : ''}`} />
                  <span className="tabular-nums font-medium text-[11px]">{rev.likes}</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
};
