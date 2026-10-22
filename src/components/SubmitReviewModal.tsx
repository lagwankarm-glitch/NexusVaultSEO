import React, { useState, useEffect } from 'react';
import { X, Sparkles, Star, Gamepad2 } from 'lucide-react';
import { Game, CommunityReview } from '../types';

interface SubmitReviewModalProps {
  games: Game[];
  preselectedGameId?: string | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newReview: Omit<CommunityReview, 'id' | 'date' | 'likes'>) => void;
}

export const SubmitReviewModal: React.FC<SubmitReviewModalProps> = ({
  games,
  preselectedGameId,
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [selectedGameId, setSelectedGameId] = useState<string>(preselectedGameId || games[0]?.id || '');
  const [username, setUsername] = useState('');
  const [score, setScore] = useState<number>(9.0);
  const [hours, setHours] = useState<number>(45);
  const [platform, setPlatform] = useState<string>('PC');
  const [playstyle, setPlaystyle] = useState<string>('Lore Hunter');
  const [difficulty, setDifficulty] = useState<CommunityReview['difficulty']>('Balanced');
  const [headline, setHeadline] = useState('');
  const [text, setText] = useState('');
  const [recommended, setRecommended] = useState<boolean>(true);

  // Sync preselected game
  useEffect(() => {
    if (preselectedGameId) {
      setSelectedGameId(preselectedGameId);
    } else if (games.length > 0 && !selectedGameId) {
      setSelectedGameId(games[0].id);
    }
  }, [preselectedGameId, games, selectedGameId]);

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !text.trim() || !headline.trim()) return;

    const avatarGradients = [
      'from-cyan-500 to-blue-600',
      'from-purple-500 to-indigo-600',
      'from-amber-500 to-red-600',
      'from-emerald-500 to-teal-600',
      'from-rose-500 to-pink-600',
      'from-violet-500 to-fuchsia-600'
    ];
    const randomAvatar = avatarGradients[Math.floor(Math.random() * avatarGradients.length)];

    onSubmit({
      gameId: selectedGameId,
      user: username.trim(),
      avatarColor: randomAvatar,
      score,
      hours: Math.max(1, hours),
      platform,
      headline: headline.trim(),
      text: text.trim(),
      recommended,
      playstyle,
      difficulty,
    });

    // Reset form
    setUsername('');
    setHeadline('');
    setText('');
    setScore(9.0);
    setHours(45);
    onClose();
  };

  const getScoreVerdict = (s: number) => {
    if (s >= 9.5) return { label: 'Legendary Masterpiece', color: 'text-cyan-400' };
    if (s >= 8.5) return { label: 'Essential / Great', color: 'text-emerald-400' };
    if (s >= 7.0) return { label: 'Recommended / Solid', color: 'text-violet-400' };
    if (s >= 5.0) return { label: 'Average / Mixed', color: 'text-amber-400' };
    return { label: 'Skip It', color: 'text-rose-400' };
  };

  const verdict = getScoreVerdict(score);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="bg-[#0f1422] border border-white/15 w-full max-w-xl rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-display font-bold text-white">Publish Community Review</h3>
              <p className="text-xs text-slate-400">Share your gameplay experience with fellow players</p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          
          {/* Game Selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Select Game
            </label>
            <select
              value={selectedGameId}
              onChange={(e) => setSelectedGameId(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50"
            >
              {games.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.title} ({g.category})
                </option>
              ))}
            </select>
          </div>

          {/* Gamertag & Platform */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Your Gamertag / Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. CyberValkyrie"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-violet-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Platform Played On
              </label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-violet-500"
              >
                <option value="PC">PC</option>
                <option value="PlayStation 5">PlayStation 5</option>
                <option value="Xbox Series X/S">Xbox Series X/S</option>
                <option value="Steam Deck">Steam Deck</option>
                <option value="Nintendo Switch">Nintendo Switch</option>
              </select>
            </div>
          </div>

          {/* Rating Slider with Dynamic Grade */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Score Rating (1.0 to 10.0)
              </label>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-semibold ${verdict.color}`}>
                  {verdict.label}
                </span>
                <span className="font-display font-bold text-lg text-cyan-400 tabular-nums">
                  {score.toFixed(1)}
                </span>
              </div>
            </div>

            <input
              type="range"
              min="1.0"
              max="10.0"
              step="0.1"
              value={score}
              onChange={(e) => setScore(parseFloat(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>

          {/* Hours, Playstyle & Difficulty */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Hours Played
              </label>
              <input
                type="number"
                min="1"
                max="999"
                value={hours}
                onChange={(e) => setHours(parseInt(e.target.value) || 1)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-slate-100 focus:outline-none focus:border-violet-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Playstyle
              </label>
              <select
                value={playstyle}
                onChange={(e) => setPlaystyle(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-2.5 py-2 text-xs text-slate-100 focus:outline-none focus:border-violet-500"
              >
                <option value="Lore Hunter">Lore Hunter</option>
                <option value="Completionist">Completionist</option>
                <option value="Hardcore">Hardcore</option>
                <option value="Casual">Casual</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Difficulty Feeling
              </label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as CommunityReview['difficulty'])}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-2.5 py-2 text-xs text-slate-100 focus:outline-none focus:border-violet-500"
              >
                <option value="Accessible">Accessible</option>
                <option value="Balanced">Balanced</option>
                <option value="Challenging">Challenging</option>
                <option value="Punishing">Punishing</option>
              </select>
            </div>
          </div>

          {/* Headline & Body */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Review Headline
            </label>
            <input
              type="text"
              required
              placeholder="e.g. A breathless adventure with phenomenal boss design"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-violet-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Detailed Opinion & Experience
            </label>
            <textarea
              rows={4}
              required
              placeholder="What made this game shine or fail? Detail the combat flow, level design, pacing, and soundtrack..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-violet-500 leading-relaxed"
            />
          </div>

          {/* Recommendation Switch */}
          <div className="flex items-center gap-6 pt-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="recommend"
                checked={recommended === true}
                onChange={() => setRecommended(true)}
                className="accent-emerald-400"
              />
              <span className="text-xs font-semibold text-slate-200">Recommended for Gamers</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="recommend"
                checked={recommended === false}
                onChange={() => setRecommended(false)}
                className="accent-rose-500"
              />
              <span className="text-xs font-semibold text-slate-200">Skip / Needs Work</span>
            </label>
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:opacity-95 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-violet-600/30 transition duration-200 active:scale-[0.99] mt-2 flex items-center justify-center gap-2"
          >
            <Star className="w-4 h-4 fill-white" />
            <span>Publish Community Review</span>
          </button>

        </form>

      </div>
    </div>
  );
};
