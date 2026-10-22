import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  Flame, 
  Filter, 
  Sparkles, 
  Award, 
  Users, 
  Github, 
  SlidersHorizontal,
  RefreshCw
} from 'lucide-react';
import { Game, CommunityReview } from './types';
import { INITIAL_GAMES, INITIAL_COMMUNITY_REVIEWS } from './data/games';
import { Navbar } from './components/Navbar';
import { HeroSpotlight } from './components/HeroSpotlight';
import { GameCard } from './components/GameCard';
import { EditorialModal } from './components/EditorialModal';
import { SubmitReviewModal } from './components/SubmitReviewModal';
import { CommunityFeed } from './components/CommunityFeed';
import { GitHubModal } from './components/GitHubModal';
import { GameReviewPage } from './components/GameReviewPage';
import { SeoCrawlModal } from './components/SeoCrawlModal';
import { Toast } from './components/Toast';

const STORAGE_KEY_REVIEWS = 'nexus_vault_community_reviews_v1';
const STORAGE_KEY_LIKES = 'nexus_vault_liked_reviews_v1';

export default function App() {
  const [games] = useState<Game[]>(INITIAL_GAMES);
  
  // Community reviews state with LocalStorage persistence
  const [communityReviews, setCommunityReviews] = useState<CommunityReview[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_REVIEWS);
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return INITIAL_COMMUNITY_REVIEWS;
  });

  // Liked review IDs state
  const [likedReviewIds, setLikedReviewIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_LIKES);
      if (saved) return new Set(JSON.parse(saved));
    } catch {
      // Fallback
    }
    return new Set<string>();
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_REVIEWS, JSON.stringify(communityReviews));
    } catch {
      // Ignore
    }
  }, [communityReviews]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_LIKES, JSON.stringify(Array.from(likedReviewIds)));
    } catch {
      // Ignore
    }
  }, [likedReviewIds]);

  // Filtering & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'critic' | 'community' | 'title'>('critic');

  // Modals & Highlights
  const [featuredGame] = useState<Game>(INITIAL_GAMES[0]);
  const [activeGameReview, setActiveGameReview] = useState<Game | null>(() => {
    // Check initial URL pathname or query param
    const path = window.location.pathname;
    const searchParams = new URLSearchParams(window.location.search);
    const gameParam = searchParams.get('game');
    
    // Check for /review/:slug
    if (path.startsWith('/review/')) {
      const slug = path.replace('/review/', '').trim();
      const found = INITIAL_GAMES.find((g) => g.id === slug || g.seo.canonicalSlug === path);
      if (found) return found;
    }
    if (gameParam) {
      const found = INITIAL_GAMES.find((g) => g.id === gameParam);
      if (found) return found;
    }
    return null;
  });

  const [editorialModalGame, setEditorialModalGame] = useState<Game | null>(null);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [submitPreselectedGameId, setSubmitPreselectedGameId] = useState<string | null>(null);
  const [isGitHubModalOpen, setIsGitHubModalOpen] = useState(false);
  const [isSeoModalOpen, setIsSeoModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      const searchParams = new URLSearchParams(window.location.search);
      const gameParam = searchParams.get('game');

      if (path.startsWith('/review/')) {
        const slug = path.replace('/review/', '').trim();
        const found = games.find((g) => g.id === slug || g.seo.canonicalSlug === path);
        if (found) {
          setActiveGameReview(found);
          return;
        }
      }
      if (gameParam) {
        const found = games.find((g) => g.id === gameParam);
        if (found) {
          setActiveGameReview(found);
          return;
        }
      }
      setActiveGameReview(null);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [games]);

  // Set home page SEO metadata when on home page
  useEffect(() => {
    if (!activeGameReview) {
      document.title = 'Nexus Vault: Next-Gen Game Reviews & Community Hub';
      
      let metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute(
          'content',
          'Explore honest critic game reviews, verified player scores, and gameplay analysis on Nexus Vault. Compare scores and share your opinion today.'
        );
      }

      let canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) {
        canonical.setAttribute('href', window.location.origin + '/');
      }
    }
  }, [activeGameReview]);

  // Dynamic Community Score Calculation helper
  const getCommunityStats = (gameId: string) => {
    const reviews = communityReviews.filter((r) => r.gameId === gameId);
    if (reviews.length === 0) return { average: 'N/A', count: 0 };
    const total = reviews.reduce((acc, r) => acc + r.score, 0);
    return {
      average: (total / reviews.length).toFixed(1),
      count: reviews.length,
    };
  };

  // Filtered and Sorted Games
  const filteredGames = useMemo(() => {
    return games
      .filter((game) => {
        const matchesCategory =
          selectedCategory === 'All' || game.category.toLowerCase() === selectedCategory.toLowerCase();
        
        const matchesPlatform =
          selectedPlatform === 'All' ||
          game.platforms.some((p) => p.toLowerCase().includes(selectedPlatform.toLowerCase()));

        const q = searchQuery.toLowerCase().trim();
        const matchesSearch =
          !q ||
          game.title.toLowerCase().includes(q) ||
          game.category.toLowerCase().includes(q) ||
          game.developer.toLowerCase().includes(q) ||
          game.summary.toLowerCase().includes(q);

        return matchesCategory && matchesPlatform && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'critic') return b.criticScore - a.criticScore;
        if (sortBy === 'community') {
          const scoreA = parseFloat(getCommunityStats(a.id).average) || 0;
          const scoreB = parseFloat(getCommunityStats(b.id).average) || 0;
          return scoreB - scoreA;
        }
        return a.title.localeCompare(b.title);
      });
  }, [games, selectedCategory, selectedPlatform, searchQuery, sortBy, communityReviews]);

  // Navigate to dedicated Game Review page with unique URL
  const handleOpenGamePage = (game: Game) => {
    setActiveGameReview(game);
    window.history.pushState(null, '', game.seo.canonicalSlug);
  };

  // Return to home page
  const handleBackToHome = () => {
    setActiveGameReview(null);
    window.history.pushState(null, '', '/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Review submission handler
  const handleReviewSubmit = (newReviewData: Omit<CommunityReview, 'id' | 'date' | 'likes'>) => {
    const newReview: CommunityReview = {
      ...newReviewData,
      id: `review-${Date.now()}`,
      date: 'Just now',
      likes: 0,
    };

    setCommunityReviews((prev) => [newReview, ...prev]);
    const targetGame = games.find((g) => g.id === newReviewData.gameId);
    setToastMessage(`Review submitted! Community rating for ${targetGame?.title || 'game'} updated.`);
  };

  // Like review handler
  const handleLikeReview = (reviewId: string) => {
    const alreadyLiked = likedReviewIds.has(reviewId);
    
    setCommunityReviews((prev) =>
      prev.map((r) => {
        if (r.id === reviewId) {
          return { ...r, likes: alreadyLiked ? Math.max(0, r.likes - 1) : r.likes + 1 };
        }
        return r;
      })
    );

    setLikedReviewIds((prev) => {
      const next = new Set(prev);
      if (alreadyLiked) {
        next.delete(reviewId);
      } else {
        next.add(reviewId);
      }
      return next;
    });

    if (!alreadyLiked) {
      setToastMessage('Upvoted community review!');
    }
  };

  // Reset to default reviews
  const handleResetData = () => {
    setCommunityReviews(INITIAL_COMMUNITY_REVIEWS);
    setLikedReviewIds(new Set());
    localStorage.removeItem(STORAGE_KEY_REVIEWS);
    localStorage.removeItem(STORAGE_KEY_LIKES);
    setToastMessage('Reset community reviews to default sample data.');
  };

  // Scroll to section
  const handleNavigateSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const heroStats = getCommunityStats(featuredGame.id);

  return (
    <div className="min-h-screen bg-[#080b12] text-slate-100 selection:bg-violet-600 selection:text-white relative">
      
      {/* Ambient background glows */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="fixed bottom-10 right-10 w-[550px] h-[550px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      {/* Top Bar Navigation */}
      <Navbar
        onOpenSubmitModal={(gameId) => {
          setSubmitPreselectedGameId(gameId || null);
          setIsSubmitModalOpen(true);
        }}
        onOpenGitHubModal={() => setIsGitHubModalOpen(true)}
        onOpenSeoModal={() => setIsSeoModalOpen(true)}
        onNavigateSection={(sectionId) => {
          if (activeGameReview) {
            handleBackToHome();
            setTimeout(() => handleNavigateSection(sectionId), 60);
          } else {
            handleNavigateSection(sectionId);
          }
        }}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-14">
        
        {activeGameReview ? (
          /* Dedicated Game Review Page (Search Engine Optimized) */
          <GameReviewPage
            game={activeGameReview}
            communityReviews={communityReviews}
            communityAverage={getCommunityStats(activeGameReview.id).average}
            communityCount={getCommunityStats(activeGameReview.id).count}
            onBack={handleBackToHome}
            onOpenSubmitReview={(gameId) => {
              setSubmitPreselectedGameId(gameId);
              setIsSubmitModalOpen(true);
            }}
            onLikeReview={handleLikeReview}
            likedReviewIds={likedReviewIds}
            onSelectOtherGame={(otherGame) => handleOpenGamePage(otherGame)}
            allGames={games}
          />
        ) : (
          /* Home Page & Review Catalog */
          <>
            {/* Featured Hero Banner */}
            <HeroSpotlight
              game={featuredGame}
              communityAverage={heroStats.average}
              communityCount={heroStats.count}
              onReadReview={(game) => handleOpenGamePage(game)}
              onAddScore={(gameId) => {
                setSubmitPreselectedGameId(gameId);
                setIsSubmitModalOpen(true);
              }}
            />

            {/* Catalog Section: Search, Filters & Game Review Grid */}
            <section id="catalog" className="space-y-6">
              
              {/* Header & Search */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-display font-bold text-white flex items-center gap-2">
                    <Flame className="w-6 h-6 text-cyan-400" />
                    <span>Featured Game Reviews</span>
                  </h2>
                  <p className="text-slate-400 text-sm mt-0.5">
                    Official critic verdicts alongside live real-time gamer consensus
                  </p>
                </div>

                {/* Search Input */}
                <div className="relative w-full md:w-80">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search games, genres, developers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-900/90 border border-slate-700/60 rounded-xl py-2 pl-10 pr-4 text-xs sm:text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/40 transition-all"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              {/* Category Filter Chips & Sort Controls */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-slate-900/60 border border-white/5">
                {/* Category Segmented Buttons */}
                <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 sm:pb-0">
                  {['All', 'Action RPG', 'Souls-like', 'Indie', 'Shooter', 'CRPG'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide uppercase transition-all whitespace-nowrap shrink-0 ${
                        selectedCategory.toLowerCase() === cat.toLowerCase()
                          ? 'bg-violet-600 text-white shadow-md'
                          : 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Platform & Sort Selectors */}
                <div className="flex items-center gap-2 text-xs text-slate-300 shrink-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-400">Platform:</span>
                    <select
                      value={selectedPlatform}
                      onChange={(e) => setSelectedPlatform(e.target.value)}
                      className="bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1 text-slate-200 focus:outline-none focus:border-violet-500"
                    >
                      <option value="All">All Systems</option>
                      <option value="PC">PC</option>
                      <option value="PlayStation">PlayStation 5</option>
                      <option value="Xbox">Xbox Series</option>
                      <option value="Deck">Steam Deck</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-400">Sort:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1 text-slate-200 focus:outline-none focus:border-violet-500"
                    >
                      <option value="critic">Highest Critic</option>
                      <option value="community">Highest Community</option>
                      <option value="title">Title (A-Z)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Games Grid */}
              {filteredGames.length === 0 ? (
                <div className="py-16 text-center bg-slate-900/40 rounded-3xl border border-white/5 space-y-3">
                  <div className="text-slate-500 text-4xl">🎮</div>
                  <p className="text-sm font-bold text-slate-300">
                    No games found matching "{searchQuery}"
                  </p>
                  <p className="text-xs text-slate-400">
                    Try switching category or clearing the search query.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('All');
                      setSelectedPlatform('All');
                    }}
                    className="mt-2 text-xs font-semibold text-cyan-400 hover:underline"
                  >
                    Reset filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredGames.map((game) => {
                    const stats = getCommunityStats(game.id);
                    return (
                      <GameCard
                        key={game.id}
                        game={game}
                        communityAverage={stats.average}
                        communityCount={stats.count}
                        onReadReview={(g) => handleOpenGamePage(g)}
                        onRateGame={(gameId) => {
                          setSubmitPreselectedGameId(gameId);
                          setIsSubmitModalOpen(true);
                        }}
                      />
                    );
                  })}
                </div>
              )}

            </section>

            {/* Live Community Feed Section */}
            <CommunityFeed
              games={games}
              communityReviews={communityReviews}
              onOpenSubmitModal={(gameId) => {
                setSubmitPreselectedGameId(gameId || null);
                setIsSubmitModalOpen(true);
              }}
              onLikeReview={handleLikeReview}
              likedReviewIds={likedReviewIds}
              onSelectGame={(game) => handleOpenGamePage(game)}
            />

            {/* GitHub Integration Ribbon */}
            <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-violet-950/40 via-slate-900 to-indigo-950/40 border border-violet-500/20 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-1.5 max-w-xl">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400">
                  <Github className="w-4 h-4" />
                  <span>GitHub Export Ready</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                  Push Nexus Vault to Your GitHub Repository
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Complete with 1-click terminal commands, ready-to-use repository config, and free deployment instructions for GitHub Pages.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={() => setIsGitHubModalOpen(true)}
                  className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-cyan-500 hover:opacity-95 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-lg shadow-violet-600/30 transition-all active:scale-[0.98]"
                >
                  <Github className="w-4 h-4" />
                  <span>View GitHub Push Commands</span>
                </button>
              </div>
            </section>
          </>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#06080e] mt-16 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-white">NEXUS VAULT</span>
            <span>· Independent game reviews and community consensus.</span>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => setIsSeoModalOpen(true)}
              className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>SEO &amp; AEO Architecture</span>
            </button>

            <a
              href="/robots.txt"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              robots.txt
            </a>

            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              sitemap.xml
            </a>

            <button
              onClick={() => setIsGitHubModalOpen(true)}
              className="text-slate-300 hover:text-white flex items-center gap-1"
            >
              <Github className="w-3.5 h-3.5" />
              <span>Push to GitHub</span>
            </button>

            <button
              onClick={handleResetData}
              className="text-slate-400 hover:text-slate-200 flex items-center gap-1"
              title="Reset sample community reviews"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset Sample Reviews</span>
            </button>
          </div>
        </div>
      </footer>

      {/* SEO & Search Console Audit Modal */}
      <SeoCrawlModal
        isOpen={isSeoModalOpen}
        onClose={() => setIsSeoModalOpen(false)}
        games={games}
        onSelectGame={(g) => handleOpenGamePage(g)}
        onShowToast={(msg) => setToastMessage(msg)}
      />

      {/* Editorial Detail Modal */}
      {editorialModalGame && (
        <EditorialModal
          game={editorialModalGame}
          communityReviews={communityReviews}
          communityAverage={getCommunityStats(editorialModalGame.id).average}
          onClose={() => setEditorialModalGame(null)}
          onOpenSubmitReview={(gameId) => {
            setSubmitPreselectedGameId(gameId);
            setIsSubmitModalOpen(true);
          }}
          onLikeReview={handleLikeReview}
          likedReviewIds={likedReviewIds}
        />
      )}

      {/* Submit Community Review Modal */}
      <SubmitReviewModal
        games={games}
        preselectedGameId={submitPreselectedGameId}
        isOpen={isSubmitModalOpen}
        onClose={() => {
          setIsSubmitModalOpen(false);
          setSubmitPreselectedGameId(null);
        }}
        onSubmit={handleReviewSubmit}
      />

      {/* GitHub Push Guide Modal */}
      <GitHubModal
        isOpen={isGitHubModalOpen}
        onClose={() => setIsGitHubModalOpen(false)}
        onCopyNotice={(msg) => setToastMessage(msg)}
      />

      {/* Floating Toast Notification */}
      <Toast
        message={toastMessage}
        onDismiss={() => setToastMessage(null)}
      />

    </div>
  );
}
