import React, { useEffect, useState } from 'react';
import { X, ThumbsUp, ThumbsDown, Award, Users, Clock, Monitor, Star, MessageSquarePlus, Heart } from 'lucide-react';
import { Game, CommunityReview } from '../types';

interface EditorialModalProps {
  game: Game | null;
  communityReviews: CommunityReview[];
  communityAverage: string;
  onClose: () => void;
  onOpenSubmitReview: (gameId: string) => void;
  onLikeReview: (reviewId: string) => void;
  likedReviewIds: Set<string>;
}

export const EditorialModal: React.FC<EditorialModalProps> = ({
  game,
  communityReviews,
  communityAverage,
  onClose,
  onOpenSubmitReview,
  onLikeReview,
  likedReviewIds,
}) => {
  const [activeTab, setActiveTab] = useState<'editorial' | 'community'>('editorial');

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!game) return null;

  const gameCommunityReviews = communityReviews.filter(r => r.gameId === game.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="bg-[#0e1320] border border-white/10 w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh] transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Banner with Official Poster Header */}
        <div className="relative h-56 sm:h-72 shrink-0 bg-slate-950 overflow-hidden">
          <img 
            src={game.heroBanner || game.coverImage} 
            alt={game.title}
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e1320] via-[#0e1320]/60 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0e1320]/80 via-transparent to-transparent"></div>

          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-900/80 text-slate-300 hover:text-white flex items-center justify-center border border-white/15 hover:bg-slate-800 transition-colors z-20"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title and Badges */}
          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
                <span>{game.category}</span>
                <span aria-hidden="true" className="text-slate-500">·</span>
                <span className="text-slate-300">{game.developer}</span>
                <span aria-hidden="true" className="text-slate-500">·</span>
                <span className="text-slate-300">{game.releaseYear}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-white">
                {game.title}
              </h2>
            </div>

            {/* Scores summary */}
            <div className="hidden sm:flex items-center gap-3 shrink-0">
              <div className="bg-slate-950/80 border border-violet-500/30 px-3.5 py-2 rounded-xl text-center">
                <div className="flex items-center justify-center gap-1 text-violet-400 font-extrabold text-xl tabular-nums">
                  <Award className="w-4 h-4 text-amber-300" />
                  <span>{game.criticScore.toFixed(1)}</span>
                </div>
                <div className="text-[10px] uppercase font-bold text-slate-400">Critic Verdict</div>
              </div>

              <div className="bg-slate-950/80 border border-emerald-500/30 px-3.5 py-2 rounded-xl text-center">
                <div className="flex items-center justify-center gap-1 text-emerald-400 font-extrabold text-xl tabular-nums">
                  <Users className="w-4 h-4" />
                  <span>{communityAverage}</span>
                </div>
                <div className="text-[10px] uppercase font-bold text-slate-400">Community</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-white/10 bg-slate-900/60">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('editorial')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === 'editorial'
                  ? 'bg-violet-600 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              Editorial Breakdown
            </button>
            <button
              onClick={() => setActiveTab('community')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                activeTab === 'community'
                  ? 'bg-violet-600 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>Community Reviews</span>
              <span className="text-[11px] px-1.5 py-0.2 bg-black/40 rounded-full font-bold">
                {gameCommunityReviews.length}
              </span>
            </button>
          </div>

          <button
            onClick={() => onOpenSubmitReview(game.id)}
            className="flex items-center gap-1.5 text-xs font-semibold text-cyan-300 hover:text-cyan-200 transition-colors"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>Rate This Game</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">

          {activeTab === 'editorial' ? (
            <>
              {/* Quick Spec Ribbon */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-900/50 border border-white/5 text-xs">
                <div>
                  <div className="text-slate-400">Platforms</div>
                  <div className="text-slate-200 font-medium mt-0.5">{game.platforms.join(', ')}</div>
                </div>
                <div>
                  <div className="text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-violet-400" />
                    <span>Playtime</span>
                  </div>
                  <div className="text-slate-200 font-medium mt-0.5">{game.playtimeEstimate}</div>
                </div>
                <div>
                  <div className="text-slate-400 flex items-center gap-1">
                    <Monitor className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Tech Performance</span>
                  </div>
                  <div className="text-slate-200 font-medium mt-0.5 truncate">{game.performanceNotes}</div>
                </div>
                <div>
                  <div className="text-slate-400">Publisher</div>
                  <div className="text-slate-200 font-medium mt-0.5">{game.publisher}</div>
                </div>
              </div>

              {/* Sub-Score Bars */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Score Criteria Breakdown
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {Object.entries(game.scoreBreakdown).map(([key, val]) => (
                    <div key={key} className="p-3 rounded-xl bg-slate-900/40 border border-white/5 text-center">
                      <div className="text-xs uppercase font-medium text-slate-400 capitalize">{key}</div>
                      <div className="text-lg font-bold text-violet-300 mt-1 tabular-nums">{val.toFixed(1)}</div>
                      <div className="w-full bg-slate-800 h-1 rounded-full mt-2 overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-violet-500 to-cyan-400 h-full rounded-full"
                          style={{ width: `${(val / 10) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Editorial Critique Body */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Critical Review & Analysis
                </h4>
                <div className="text-slate-300 text-sm sm:text-base leading-relaxed space-y-4 whitespace-pre-line">
                  {game.fullReview}
                </div>
              </div>

              {/* The Good and The Bad (Pros and Cons) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 space-y-3">
                  <h5 className="text-emerald-400 font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                    <ThumbsUp className="w-4 h-4" /> The Good
                  </h5>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                    {game.pros.map((pro, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold shrink-0">✓</span>
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-500/20 space-y-3">
                  <h5 className="text-rose-400 font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                    <ThumbsDown className="w-4 h-4" /> The Bad
                  </h5>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                    {game.cons.map((con, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-rose-400 font-bold shrink-0">✗</span>
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          ) : (
            /* Community Tab Content */
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                    Community Reviews ({gameCommunityReviews.length})
                  </h4>
                  <p className="text-xs text-slate-400">
                    Average community rating for {game.title}: <strong className="text-emerald-400">{communityAverage} / 10</strong>
                  </p>
                </div>
                <button
                  onClick={() => onOpenSubmitReview(game.id)}
                  className="bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors"
                >
                  Write Your Review
                </button>
              </div>

              {gameCommunityReviews.length === 0 ? (
                <div className="p-8 text-center bg-slate-900/40 rounded-2xl border border-white/5 space-y-2">
                  <Star className="w-8 h-8 text-slate-600 mx-auto" />
                  <p className="text-sm text-slate-300">No community reviews yet for this title.</p>
                  <p className="text-xs text-slate-500">Be the first player to submit a review and set the benchmark!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {gameCommunityReviews.map((rev) => {
                    const isLiked = likedReviewIds.has(rev.id);
                    return (
                      <div 
                        key={rev.id} 
                        className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 space-y-3 hover:border-violet-500/20 transition-all"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2.5">
                            <div className={`w-8 h-8 rounded-full bg-gradient-to-tr ${rev.avatarColor} flex items-center justify-center text-xs font-bold text-white shadow-sm`}>
                              {rev.user.charAt(0)}
                            </div>
                            <div>
                              <div className="text-xs font-bold text-white flex items-center gap-2">
                                <span>{rev.user}</span>
                                <span className="text-[10px] text-slate-400 font-normal">
                                  {rev.platform} · {rev.hours} hrs · {rev.playstyle}
                                </span>
                              </div>
                              <div className="text-[10px] text-slate-500">{rev.date}</div>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                              rev.score >= 9 ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                              rev.score >= 7.5 ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' :
                              'bg-amber-500/20 text-amber-400'
                            }`}>
                              {rev.score.toFixed(1)} / 10
                            </span>

                            <button 
                              onClick={() => onLikeReview(rev.id)}
                              className={`flex items-center gap-1 text-xs transition-colors ${
                                isLiked ? 'text-rose-400' : 'text-slate-400 hover:text-rose-400'
                              }`}
                              title="Upvote review"
                            >
                              <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-rose-400' : ''}`} />
                              <span className="tabular-nums">{rev.likes}</span>
                            </button>
                          </div>
                        </div>

                        {rev.headline && (
                          <h6 className="text-xs font-bold text-slate-200">
                            "{rev.headline}"
                          </h6>
                        )}

                        <p className="text-xs text-slate-300 leading-relaxed">
                          {rev.text}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
