import React, { useEffect, useState } from 'react';
import { 
  ArrowLeft, 
  Award, 
  Users, 
  Clock, 
  Monitor, 
  ThumbsUp, 
  ThumbsDown, 
  Star, 
  Heart, 
  Search, 
  CheckCircle2, 
  Code2, 
  FileCheck, 
  ChevronDown, 
  ChevronUp, 
  Globe, 
  HelpCircle, 
  Sparkles,
  Layers,
  Bot
} from 'lucide-react';
import { Game, CommunityReview } from '../types';

interface GameReviewPageProps {
  game: Game;
  communityReviews: CommunityReview[];
  communityAverage: string;
  communityCount: number;
  onBack: () => void;
  onOpenSubmitReview: (gameId: string) => void;
  onLikeReview: (reviewId: string) => void;
  likedReviewIds: Set<string>;
  onSelectOtherGame: (game: Game) => void;
  allGames: Game[];
}

export const GameReviewPage: React.FC<GameReviewPageProps> = ({
  game,
  communityReviews,
  communityAverage,
  communityCount,
  onBack,
  onOpenSubmitReview,
  onLikeReview,
  likedReviewIds,
  onSelectOtherGame,
  allGames,
}) => {
  const [showSeoAudit, setShowSeoAudit] = useState(true);
  const [copiedSchema, setCopiedSchema] = useState(false);

  // Dynamic Head SEO Tag Injection & Structured Data
  useEffect(() => {
    // 1. Update Title Tag (Max 60 chars)
    document.title = game.seo.metaTitle;

    // 2. Update Meta Description (Max 160 chars)
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', game.seo.metaDescription);

    // 3. Update OpenGraph Tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', game.seo.metaTitle);
    
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', game.seo.metaDescription);

    // 4. Update Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    const canonicalUrl = `${window.location.origin}${game.seo.canonicalSlug}`;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // 5. Inject Schema.org JSON-LD (Combined Review + FAQPage for AEO)
    let scriptTag = document.getElementById('game-seo-schema') as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'game-seo-schema';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    
    const schemaData = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Review',
          'itemReviewed': {
            '@type': 'VideoGame',
            'name': game.title,
            'applicationCategory': 'Game',
            'operatingSystem': game.platforms.join(', '),
            'author': {
              '@type': 'Organization',
              'name': game.developer
            },
            'publisher': {
              '@type': 'Organization',
              'name': game.publisher
            },
            'image': game.coverImage
          },
          'reviewRating': {
            '@type': 'Rating',
            'ratingValue': game.criticScore,
            'bestRating': 10,
            'worstRating': 1
          },
          'author': {
            '@type': 'Organization',
            'name': 'Nexus Vault Editorial Team'
          },
          'reviewBody': game.summary,
          'url': canonicalUrl
        },
        {
          '@type': 'FAQPage',
          'mainEntity': game.seo.aeoQuestions.map((q) => ({
            '@type': 'Question',
            'name': q.question,
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': q.answer
            }
          }))
        }
      ]
    };
    scriptTag.textContent = JSON.stringify(schemaData, null, 2);

    window.scrollTo({ top: 0, behavior: 'smooth' });

    return () => {
      document.title = 'Nexus Vault: Next-Gen Game Reviews & Community Hub';
    };
  }, [game]);

  const gameCommunityReviews = communityReviews.filter((r) => r.gameId === game.id);

  const titleLength = game.seo.metaTitle.length;
  const descLength = game.seo.metaDescription.length;

  const schemaJson = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Review',
        'itemReviewed': {
          '@type': 'VideoGame',
          'name': game.title,
          'image': game.coverImage
        },
        'reviewRating': {
          '@type': 'Rating',
          'ratingValue': game.criticScore
        },
        'author': {
          '@type': 'Organization',
          'name': 'Nexus Vault Editorial Team'
        }
      },
      {
        '@type': 'FAQPage',
        'mainEntity': game.seo.aeoQuestions.map((q) => ({
          '@type': 'Question',
          'name': q.question,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': q.answer
          }
        }))
      }
    ]
  }, null, 2);

  const copySchemaToClipboard = () => {
    navigator.clipboard.writeText(schemaJson);
    setCopiedSchema(true);
    setTimeout(() => setCopiedSchema(false), 2000);
  };

  return (
    <article className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-10">
      
      {/* Breadcrumb Navigation with explicit anchor text */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-400">
        <button 
          onClick={onBack}
          className="hover:text-cyan-400 transition-colors flex items-center gap-1 font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Home</span>
        </button>
        <span aria-hidden="true">/</span>
        <button 
          onClick={onBack}
          className="hover:text-cyan-400 transition-colors font-medium"
        >
          Game Reviews
        </button>
        <span aria-hidden="true">/</span>
        <span className="text-slate-200 font-semibold truncate max-w-xs">{game.title}</span>
      </nav>

      {/* =========================================================================
          CLASS PRESENTATION: SEO & AEO AUDIT INSPECTOR (CLEARLY LABELED FOR CLASS)
          ========================================================================= */}
      <section 
        aria-label="SEO and AEO Academic Audit Inspector" 
        className="rounded-3xl border border-cyan-500/30 bg-gradient-to-b from-[#0c1322] to-[#090d18] shadow-2xl overflow-hidden"
      >
        <div className="p-5 sm:p-6 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-cyan-950/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-400">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-2 py-0.5 rounded">
                  Class Project Presentation
                </span>
                <span className="text-xs text-slate-400">Target Keyword: <strong className="text-white">"{game.seo.targetKeyword}"</strong></span>
              </div>
              <h2 className="text-lg sm:text-xl font-display font-bold text-white mt-0.5">
                SEO & AEO Architecture Inspector
              </h2>
            </div>
          </div>

          <button
            onClick={() => setShowSeoAudit(!showSeoAudit)}
            className="flex items-center gap-1.5 self-start sm:self-auto text-xs font-semibold text-cyan-400 hover:text-cyan-300 bg-cyan-950/60 border border-cyan-500/30 px-3.5 py-1.5 rounded-xl transition-colors"
          >
            <span>{showSeoAudit ? 'Collapse Inspector' : 'Expand Inspector'}</span>
            {showSeoAudit ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {showSeoAudit && (
          <div className="p-6 space-y-6 text-xs sm:text-sm">
            
            {/* SECTION 1: 3 HEADINGS H1, H2, H3 (CLOSELY RELATED TO KEYWORDS) */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-violet-400">
                <Layers className="w-4 h-4" />
                <span>Three-Tier Heading Hierarchy (H1, H2, H3 Keyword-Optimized)</span>
              </div>

              {/* H1 Heading */}
              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-white/5 space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-violet-600/30 text-violet-300 border border-violet-500/40 rounded font-mono font-bold text-xs">
                      &lt;h1&gt; Tag
                    </span>
                    <span className="font-bold text-white text-xs uppercase tracking-wider">
                      Primary Page Title Heading
                    </span>
                  </div>
                  <span className="text-emerald-400 font-medium text-xs flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> 1 Per Page
                  </span>
                </div>
                <p className="font-mono text-cyan-300 bg-black/40 p-2.5 rounded-xl border border-white/5">
                  {game.seo.h1Heading}
                </p>
                <div className="text-[11px] text-slate-400">
                  ✓ Keyword integration: Contains primary keyword <strong>"{game.seo.targetKeyword}"</strong> near start.
                </div>
              </div>

              {/* H2 Heading */}
              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-white/5 space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-cyan-600/30 text-cyan-300 border border-cyan-500/40 rounded font-mono font-bold text-xs">
                      &lt;h2&gt; Tag
                    </span>
                    <span className="font-bold text-white text-xs uppercase tracking-wider">
                      Secondary Section Heading
                    </span>
                  </div>
                  <span className="text-emerald-400 font-medium text-xs flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Keyword-Aligned
                  </span>
                </div>
                <p className="font-mono text-cyan-300 bg-black/40 p-2.5 rounded-xl border border-white/5">
                  {game.seo.h2Heading}
                </p>
                <div className="text-[11px] text-slate-400">
                  ✓ Keyword alignment: Focuses on gameplay evaluation and purchase intent.
                </div>
              </div>

              {/* H3 Heading */}
              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-white/5 space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 rounded font-mono font-bold text-xs">
                      &lt;h3&gt; Tag
                    </span>
                    <span className="font-bold text-white text-xs uppercase tracking-wider">
                      Tertiary Subsection Heading
                    </span>
                  </div>
                  <span className="text-emerald-400 font-medium text-xs flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Subsection Topical Depth
                  </span>
                </div>
                <p className="font-mono text-cyan-300 bg-black/40 p-2.5 rounded-xl border border-white/5">
                  {game.seo.h3Heading}
                </p>
                <div className="text-[11px] text-slate-400">
                  ✓ Topical depth: Focuses on core mechanics, systems, and combat progression.
                </div>
              </div>
            </div>

            {/* SECTION 2: 2 PARAGRAPHS IN QUESTION-ANSWER FORMAT FOR AEO */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
                  <Bot className="w-4 h-4" />
                  <span>Answer Engine Optimization (AEO) Q&A Format (2 Question/Answer Articles)</span>
                </div>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded font-bold">
                  AI Search / Featured Snippet Ready
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {game.seo.aeoQuestions.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-900/90 border border-emerald-500/20 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded">
                        AEO Q&A Article #{idx + 1}
                      </span>
                      <span className="text-[10px] text-slate-400 italic">{item.targetIntent}</span>
                    </div>

                    <div className="font-bold text-white text-xs flex items-start gap-1.5 pt-1">
                      <HelpCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{item.question}</span>
                    </div>

                    <div className="text-slate-300 text-xs bg-black/30 p-3 rounded-xl border border-white/5 leading-relaxed">
                      <strong className="text-emerald-400">Direct Answer:</strong> {item.answer}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 3: META TITLE & DESCRIPTION AUDIT */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Meta Title Tag */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 bg-cyan-600/30 text-cyan-300 border border-cyan-500/40 rounded font-mono font-bold text-xs">
                    &lt;title&gt; Tag
                  </span>
                  <span className={`px-2 py-0.5 rounded font-mono text-xs font-bold ${
                    titleLength <= 60 ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400'
                  }`}>
                    {titleLength} / 60 Chars
                  </span>
                </div>
                <p className="font-mono text-cyan-300 bg-black/40 p-2.5 rounded-xl border border-white/5 text-xs">
                  {game.seo.metaTitle}
                </p>
                <div className="text-[11px] text-slate-400">
                  ✓ Keyword at start + click magnet hook
                </div>
              </div>

              {/* Meta Description */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 rounded font-mono font-bold text-xs">
                    &lt;meta name="description"&gt;
                  </span>
                  <span className={`px-2 py-0.5 rounded font-mono text-xs font-bold ${
                    descLength <= 160 ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400'
                  }`}>
                    {descLength} / 160 Chars
                  </span>
                </div>
                <p className="font-mono text-cyan-300 bg-black/40 p-2.5 rounded-xl border border-white/5 text-xs leading-relaxed">
                  {game.seo.metaDescription}
                </p>
                <div className="text-[11px] text-slate-400">
                  ✓ Honest summary + keyword + ends with reason to click
                </div>
              </div>

            </div>

            {/* Google SERP Simulation */}
            <div className="p-4 rounded-2xl bg-[#202124] border border-[#303134] space-y-2">
              <div className="flex items-center justify-between text-xs text-[#9aa0a6] pb-1 border-b border-[#303134]">
                <span className="flex items-center gap-1.5 font-bold">
                  <Search className="w-3.5 h-3.5 text-[#8ab4f8]" /> Google SERP Snippet Preview
                </span>
                <span>Desktop &amp; Mobile</span>
              </div>
              <div className="space-y-1 pt-1">
                <div className="flex items-center gap-1.5 text-xs text-[#bdc1c6]">
                  <Globe className="w-3.5 h-3.5 text-[#9aa0a6]" />
                  <span>https://nexusvault.app{game.seo.canonicalSlug}</span>
                </div>
                <h3 className="text-base text-[#8ab4f8] hover:underline cursor-pointer font-medium leading-snug">
                  {game.seo.metaTitle}
                </h3>
                <p className="text-xs text-[#bdc1c6] leading-relaxed">
                  {game.seo.metaDescription}
                </p>
              </div>
            </div>

            {/* Schema.org Review & FAQPage Preview */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <Code2 className="w-4 h-4 text-violet-400" />
                  Combined Schema.org Structured Data (Review + FAQPage for AEO)
                </span>
                <button
                  onClick={copySchemaToClipboard}
                  className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold"
                >
                  {copiedSchema ? 'Copied JSON!' : 'Copy JSON-LD'}
                </button>
              </div>
              <pre className="p-3 bg-black/60 rounded-xl font-mono text-[11px] text-slate-300 overflow-x-auto max-h-36">
                {schemaJson}
              </pre>
            </div>

          </div>
        )}
      </section>

      {/* =========================================================================
          ACTUAL ON-PAGE CONTENT WITH H1, H2, H3 AND 2 AEO Q&A ARTICLES
          ========================================================================= */}

      {/* Heading 1: Primary H1 Heading */}
      <header className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
          <span className="px-2 py-0.5 rounded bg-violet-600/30 border border-violet-500/40 text-[10px] font-mono text-violet-300 font-bold">
            H1 Tag
          </span>
          <span>{game.category}</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>{game.developer}</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>Released {game.releaseYear}</span>
        </div>

        {/* Semantic H1 Heading */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white leading-tight tracking-tight text-balance">
          {game.seo.h1Heading}
        </h1>

        <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-3xl">
          {game.summary}
        </p>
      </header>

      {/* Hero Poster Media with Alt text */}
      <div className="relative rounded-3xl overflow-hidden border border-white/10 aspect-[16/9] sm:aspect-[21/9] bg-slate-950">
        <img 
          src={game.heroBanner} 
          alt={game.heroBannerAlt}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080b12] via-transparent to-transparent"></div>

        {/* Scores Overlay */}
        <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-slate-950/85 backdrop-blur-md border border-violet-500/40 px-4 py-2.5 rounded-2xl text-center">
              <div className="flex items-center justify-center gap-1.5 text-violet-300 font-extrabold text-2xl tabular-nums">
                <Award className="w-5 h-5 text-amber-300" />
                <span>{game.criticScore.toFixed(1)}</span>
              </div>
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Official Critic Verdict</div>
            </div>

            <div className="bg-slate-950/85 backdrop-blur-md border border-emerald-500/40 px-4 py-2.5 rounded-2xl text-center">
              <div className="flex items-center justify-center gap-1.5 text-emerald-400 font-extrabold text-2xl tabular-nums">
                <Users className="w-5 h-5" />
                <span>{communityAverage}</span>
              </div>
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Community ({communityCount})</div>
            </div>
          </div>

          <button
            onClick={() => onOpenSubmitReview(game.id)}
            className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:opacity-95 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-lg shadow-violet-600/30 transition-all active:scale-[0.98]"
          >
            <Star className="w-4 h-4 fill-white" />
            <span>Rate {game.title}</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          AEO (ANSWER ENGINE OPTIMIZATION) 2 Q&A ARTICLES ON PAGE
          ========================================================================= */}
      <section 
        aria-label="Frequently Asked Questions & AEO Answers" 
        className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-emerald-500/20 space-y-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-4">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-emerald-600/30 border border-emerald-500/40 text-[10px] font-mono text-emerald-300 font-bold">
                AEO Section
              </span>
              <span className="text-xs uppercase font-bold text-emerald-400 tracking-wider">
                Answer Engine Optimization: Core Player Inquiries
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-display font-bold text-white">
              Key Gameplay Questions &amp; Authoritative Answers
            </h2>
          </div>
          <span className="text-[11px] text-slate-400">Direct Answer Format for AI Search &amp; Featured Snippets</span>
        </div>

        {/* The 2 Q&A Paragraphs */}
        <div className="space-y-5">
          {game.seo.aeoQuestions.map((qa, index) => (
            <div 
              key={index} 
              className="p-5 rounded-2xl bg-black/40 border border-white/5 space-y-2.5 hover:border-emerald-500/30 transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                  AEO Q&amp;A Article #{index + 1}
                </span>
                <span className="text-[10px] text-slate-500">{qa.targetIntent}</span>
              </div>

              <h3 className="text-sm sm:text-base font-bold text-white flex items-start gap-2">
                <HelpCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>{qa.question}</span>
              </h3>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed pl-6 border-l-2 border-emerald-500/40">
                {qa.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Key Specifications Grid */}
      <section aria-label="Game Specifications" className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-white/5 text-xs">
        <div>
          <div className="text-slate-400">Available Platforms</div>
          <div className="text-slate-200 font-medium mt-1">{game.platforms.join(', ')}</div>
        </div>
        <div>
          <div className="text-slate-400 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-violet-400" />
            <span>Average Playtime</span>
          </div>
          <div className="text-slate-200 font-medium mt-1">{game.playtimeEstimate}</div>
        </div>
        <div>
          <div className="text-slate-400 flex items-center gap-1">
            <Monitor className="w-3.5 h-3.5 text-cyan-400" />
            <span>Performance Target</span>
          </div>
          <div className="text-slate-200 font-medium mt-1">{game.performanceNotes}</div>
        </div>
        <div>
          <div className="text-slate-400">Publisher</div>
          <div className="text-slate-200 font-medium mt-1">{game.publisher}</div>
        </div>
      </section>

      {/* Heading 2: Secondary Section Heading */}
      <section aria-label="Editorial Analysis and Gameplay" className="space-y-4 pt-2">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-cyan-600/30 border border-cyan-500/40 text-[10px] font-mono text-cyan-300 font-bold">
            H2 Tag
          </span>
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
            In-Depth Gameplay &amp; Performance Review
          </span>
        </div>

        {/* Semantic H2 Heading */}
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
          {game.seo.h2Heading}
        </h2>

        <div className="text-slate-300 text-sm sm:text-base leading-relaxed space-y-4 whitespace-pre-line bg-slate-900/30 p-6 sm:p-8 rounded-3xl border border-white/5">
          {game.fullReview}
        </div>
      </section>

      {/* Heading 3: Tertiary Subsection Heading */}
      <section aria-label="Core Mechanics and Systems" className="space-y-4 pt-2">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-indigo-600/30 border border-indigo-500/40 text-[10px] font-mono text-indigo-300 font-bold">
            H3 Tag
          </span>
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
            Systemic Mechanics Breakdown
          </span>
        </div>

        {/* Semantic H3 Heading */}
        <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
          {game.seo.h3Heading}
        </h3>

        {/* Score Criteria Breakdown */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
          {Object.entries(game.scoreBreakdown).map(([key, val]) => (
            <div key={key} className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5 text-center">
              <div className="text-xs uppercase font-medium text-slate-400 capitalize">{key}</div>
              <div className="text-xl font-bold text-violet-300 mt-1 tabular-nums">{val.toFixed(1)}</div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-violet-500 to-cyan-400 h-full rounded-full"
                  style={{ width: `${(val / 10) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pros & Cons */}
      <section aria-label="The Good and The Bad" className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 space-y-3">
          <h4 className="text-emerald-400 font-bold text-sm uppercase tracking-wider flex items-center gap-2">
            <ThumbsUp className="w-4 h-4" /> The Good (Pros)
          </h4>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
            {game.pros.map((pro, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold shrink-0">✓</span>
                <span>{pro}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-6 rounded-2xl bg-rose-950/20 border border-rose-500/20 space-y-3">
          <h4 className="text-rose-400 font-bold text-sm uppercase tracking-wider flex items-center gap-2">
            <ThumbsDown className="w-4 h-4" /> The Bad (Cons)
          </h4>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
            {game.cons.map((con, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-rose-400 font-bold shrink-0">✗</span>
                <span>{con}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Community Reviews Section */}
      <section aria-label="Community Reviews" className="space-y-4 pt-4 border-t border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h4 className="text-xl font-display font-bold text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-violet-400" />
              Community Player Reviews for {game.title}
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Aggregate score: <strong className="text-emerald-400">{communityAverage} / 10</strong> from {communityCount} players
            </p>
          </div>

          <button
            onClick={() => onOpenSubmitReview(game.id)}
            className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all active:scale-[0.98]"
          >
            <Star className="w-4 h-4 fill-white" />
            <span>Write a Player Review</span>
          </button>
        </div>

        {gameCommunityReviews.length === 0 ? (
          <div className="p-8 text-center bg-slate-900/40 rounded-2xl border border-white/5 space-y-2">
            <Star className="w-8 h-8 text-slate-600 mx-auto" />
            <p className="text-sm text-slate-300">No community reviews yet for this title.</p>
            <p className="text-xs text-slate-500">Be the first player to submit a review and set the benchmark!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                            {rev.platform} · {rev.hours}h · {rev.playstyle}
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-500">{rev.date}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded tabular-nums ${
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
                    <h5 className="text-xs font-bold text-slate-200">
                      "{rev.headline}"
                    </h5>
                  )}

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {rev.text}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Explore More Game Reviews (Internal Links with clear Anchor Text) */}
      <section aria-label="Related Reviews" className="pt-6 border-t border-white/10 space-y-4">
        <h4 className="text-lg font-display font-bold text-white">
          Explore More Game Reviews on Nexus Vault
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {allGames.filter(g => g.id !== game.id).slice(0, 3).map((otherGame) => (
            <button
              key={otherGame.id}
              onClick={() => onSelectOtherGame(otherGame)}
              className="p-3 rounded-xl bg-slate-900/60 border border-white/5 hover:border-violet-500/40 text-left transition-all group"
            >
              <div className="text-[10px] text-cyan-400 font-semibold">{otherGame.category}</div>
              <div className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1 mt-0.5">
                {otherGame.title} Review
              </div>
              <div className="text-[11px] text-slate-400 mt-1">Critic Score: <strong className="text-violet-400">{otherGame.criticScore.toFixed(1)}</strong></div>
            </button>
          ))}
        </div>
      </section>

      {/* Back button with explicit anchor text */}
      <div className="pt-4 flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 px-5 py-2.5 rounded-xl border border-white/10 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to All Game Reviews</span>
        </button>

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-xs text-cyan-400 hover:underline"
        >
          Back to Top of Page
        </button>
      </div>

    </article>
  );
};
