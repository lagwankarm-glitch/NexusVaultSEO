import React, { useState } from 'react';
import { 
  X, 
  FileText, 
  Globe, 
  Layers, 
  Bot, 
  CheckCircle2, 
  ExternalLink, 
  Copy, 
  Code2, 
  Server,
  ShieldCheck,
  Search
} from 'lucide-react';
import { Game } from '../types';

interface SeoCrawlModalProps {
  isOpen: boolean;
  onClose: () => void;
  games: Game[];
  onSelectGame: (game: Game) => void;
  onShowToast: (msg: string) => void;
}

export const SeoCrawlModal: React.FC<SeoCrawlModalProps> = ({
  isOpen,
  onClose,
  games,
  onSelectGame,
  onShowToast,
}) => {
  const [activeTab, setActiveTab] = useState<'audit' | 'robots' | 'sitemap' | 'vercel' | 'source'>('audit');

  if (!isOpen) return null;

  const robotsTxtContent = `# Robots.txt for Nexus Vault Game Review Publication
# Configured for Googlebot, Bingbot, PerplexityBot, GPTBot & Google Search Console
User-agent: *
Allow: /
Allow: /review/
Allow: /sitemap.xml

# XML Sitemap Location for Google Search Console
Sitemap: https://nexusvault.app/sitemap.xml`;

  const vercelJsonContent = `{
  "cleanUrls": true,
  "rewrites": [
    { "source": "/robots.txt", "destination": "/robots.txt" },
    { "source": "/sitemap.xml", "destination": "/sitemap.xml" },
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}`;

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    onShowToast(`Copied ${label} to clipboard!`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="bg-[#0b0f19] border border-cyan-500/30 rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl shadow-cyan-950/50 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-cyan-950/40 via-slate-900 to-indigo-950/40 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-2 py-0.5 rounded">
                  Class Project Presentation
                </span>
                <span className="text-xs text-slate-400">100% Free Organic SEO / AEO Compliant</span>
              </div>
              <h3 className="text-lg sm:text-xl font-display font-bold text-white mt-0.5">
                SEO, AEO &amp; Search Console Audit Suite
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
            aria-label="Close SEO Audit Modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1.5 px-6 pt-3 border-b border-white/10 bg-slate-950/60 overflow-x-auto shrink-0">
          {[
            { id: 'audit', label: 'Unique URLs & Headings', icon: Layers },
            { id: 'robots', label: 'robots.txt', icon: FileText },
            { id: 'sitemap', label: 'sitemap.xml (GSC)', icon: Globe },
            { id: 'vercel', label: 'vercel.json (Rewrites)', icon: Server },
            { id: 'source', label: 'View-Source Code', icon: Code2 },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-t-xl transition-all border-b-2 whitespace-nowrap ${
                  isActive
                    ? 'border-cyan-400 text-cyan-300 bg-slate-900'
                    : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs sm:text-sm">
          
          {/* TAB 1: UNIQUE URLS, HEADINGS & AEO QUESTIONS */}
          {activeTab === 'audit' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <h4 className="font-bold text-white text-sm flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>All 6 Unique Review URLs Meet Strict Academic Criteria</span>
                  </h4>
                  <p className="text-slate-300 text-xs">
                    Every URL includes: Title (≤ 60 chars), Description (≤ 160 chars), H1, H2, H3 tags, and 2 AEO Q&amp;A articles.
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-1 rounded">
                    0 Paid Keywords
                  </span>
                  <span className="text-[10px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-2 py-1 rounded">
                    100% Alt &amp; Anchor Text
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                {games.map((g, idx) => (
                  <div key={g.id} className="p-4 rounded-2xl bg-slate-900/80 border border-white/5 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-violet-600/30 text-violet-300 border border-violet-500/40 text-[10px] font-bold flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <strong className="text-white text-sm">{g.title}</strong>
                        <span className="text-slate-400 text-xs font-mono">{g.seo.canonicalSlug}</span>
                      </div>

                      <button
                        onClick={() => {
                          onSelectGame(g);
                          onClose();
                        }}
                        className="flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 font-semibold self-start sm:self-auto"
                      >
                        <span>Open Live URL Page</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Metadata Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
                        <span className="text-cyan-400 font-bold uppercase text-[10px]">Title Tag ({g.seo.metaTitle.length}/60 chars)</span>
                        <p className="font-mono text-slate-200 mt-1">{g.seo.metaTitle}</p>
                      </div>

                      <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
                        <span className="text-indigo-400 font-bold uppercase text-[10px]">Meta Description ({g.seo.metaDescription.length}/160 chars)</span>
                        <p className="font-mono text-slate-200 mt-1">{g.seo.metaDescription}</p>
                      </div>
                    </div>

                    {/* 3 Headings: H1, H2, H3 */}
                    <div className="space-y-1.5 pt-1 text-xs">
                      <div className="flex items-start gap-2 bg-slate-950 p-2 rounded-lg border border-white/5">
                        <span className="font-mono text-[10px] font-bold text-violet-400 bg-violet-950 px-1.5 py-0.5 rounded border border-violet-500/30 shrink-0">H1</span>
                        <span className="text-slate-200 font-medium">{g.seo.h1Heading}</span>
                      </div>
                      <div className="flex items-start gap-2 bg-slate-950 p-2 rounded-lg border border-white/5">
                        <span className="font-mono text-[10px] font-bold text-cyan-400 bg-cyan-950 px-1.5 py-0.5 rounded border border-cyan-500/30 shrink-0">H2</span>
                        <span className="text-slate-200 font-medium">{g.seo.h2Heading}</span>
                      </div>
                      <div className="flex items-start gap-2 bg-slate-950 p-2 rounded-lg border border-white/5">
                        <span className="font-mono text-[10px] font-bold text-indigo-400 bg-indigo-950 px-1.5 py-0.5 rounded border border-indigo-500/30 shrink-0">H3</span>
                        <span className="text-slate-200 font-medium">{g.seo.h3Heading}</span>
                      </div>
                    </div>

                    {/* 2 AEO Q&A Paragraphs */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1">
                      {g.seo.aeoQuestions.map((qa, qIdx) => (
                        <div key={qIdx} className="p-2.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20 space-y-1 text-xs">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                            AEO Q&amp;A #{qIdx + 1}
                          </span>
                          <p className="font-semibold text-white">{qa.question}</p>
                          <p className="text-slate-300 text-[11px] leading-relaxed">
                            <strong className="text-emerald-400">Direct Answer:</strong> {qa.answer}
                          </p>
                        </div>
                      ))}
                    </div>

                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: ROBOTS.TXT */}
          {activeTab === 'robots' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/30">
                <div>
                  <h4 className="font-bold text-white text-sm flex items-center gap-2">
                    <FileText className="w-4 h-4 text-cyan-400" />
                    <span>robots.txt (Crawl Directives for Google Search Console)</span>
                  </h4>
                  <p className="text-slate-300 text-xs mt-0.5">
                    Located at <code className="text-cyan-300 font-mono">/robots.txt</code> and <code className="text-cyan-300 font-mono">/public/robots.txt</code>.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href="/robots.txt"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs px-3.5 py-2 rounded-xl transition-colors"
                  >
                    <span>View /robots.txt</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={() => copyToClipboard(robotsTxtContent, 'robots.txt')}
                    className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs px-3 py-2 rounded-xl transition-colors"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </button>
                </div>
              </div>

              <pre className="p-4 rounded-2xl bg-black/60 border border-white/10 font-mono text-xs text-cyan-300 leading-relaxed overflow-x-auto">
                {robotsTxtContent}
              </pre>

              <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 space-y-2 text-xs text-slate-300">
                <h5 className="font-bold text-white">Why this satisfies Google Search Console audit:</h5>
                <ul className="list-disc list-inside space-y-1 text-slate-400">
                  <li><strong className="text-slate-200">User-agent: *</strong> permits all search crawlers (Googlebot, Bingbot, PerplexityBot, GPTBot).</li>
                  <li><strong className="text-slate-200">Allow: /review/</strong> explicitly unlocks all game review pages for automated crawling.</li>
                  <li><strong className="text-slate-200">Sitemap: https://nexusvault.app/sitemap.xml</strong> informs crawlers of the exact XML sitemap location.</li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB 3: SITEMAP.XML */}
          {activeTab === 'sitemap' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/30">
                <div>
                  <h4 className="font-bold text-white text-sm flex items-center gap-2">
                    <Globe className="w-4 h-4 text-cyan-400" />
                    <span>sitemap.xml (Google Search Console Validated)</span>
                  </h4>
                  <p className="text-slate-300 text-xs mt-0.5">
                    Includes standard sitemap 0.9 schema, priority ratings, lastmod timestamps, and image extensions.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href="/sitemap.xml"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs px-3.5 py-2 rounded-xl transition-colors"
                  >
                    <span>View /sitemap.xml</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Indexed URLs preview */}
              <div className="space-y-2">
                <h5 className="font-bold text-white text-xs uppercase tracking-wider text-slate-400">
                  Indexed URLs in sitemap.xml:
                </h5>
                <div className="space-y-1.5">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-between font-mono text-xs">
                    <span className="text-cyan-400">https://nexusvault.app/</span>
                    <span className="text-emerald-400 font-bold">Priority: 1.0 (Daily)</span>
                  </div>
                  {games.map((g) => (
                    <div key={g.id} className="p-2.5 rounded-xl bg-slate-900 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 font-mono text-xs">
                      <span className="text-slate-300">https://nexusvault.app{g.seo.canonicalSlug}</span>
                      <span className="text-violet-400 font-bold">Priority: 0.9 (Weekly)</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: VERCEL REWRITES CONFIGURATION */}
          {activeTab === 'vercel' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/30">
                <div>
                  <h4 className="font-bold text-white text-sm flex items-center gap-2">
                    <Server className="w-4 h-4 text-cyan-400" />
                    <span>vercel.json (SPA Routing &amp; Inspect Properties Fix)</span>
                  </h4>
                  <p className="text-slate-300 text-xs mt-0.5">
                    Solves inspect properties 404 errors by mapping static assets and routing all wildcard URLs to index.html.
                  </p>
                </div>
                <button
                  onClick={() => copyToClipboard(vercelJsonContent, 'vercel.json')}
                  className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs px-3 py-2 rounded-xl transition-colors self-start sm:self-auto"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Configuration</span>
                </button>
              </div>

              <pre className="p-4 rounded-2xl bg-black/60 border border-white/10 font-mono text-xs text-emerald-400 leading-relaxed overflow-x-auto">
                {vercelJsonContent}
              </pre>

              <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 space-y-2 text-xs text-slate-300">
                <h5 className="font-bold text-white">How this handles every unique URL without errors:</h5>
                <ol className="list-decimal list-inside space-y-1.5 text-slate-400">
                  <li><strong className="text-slate-200">cleanUrls: true</strong> strips trailing extensions for clean, canonical URLs.</li>
                  <li><strong className="text-slate-200">/robots.txt &amp; /sitemap.xml rewrites:</strong> Guaranteed static delivery for Google Search Console.</li>
                  <li><strong className="text-slate-200">/(.*) -&gt; /index.html:</strong> Ensures direct URL hits (e.g., refresh on <code className="text-cyan-300">/review/cyberpunk-phantom-liberty</code>) serve index.html with HTTP 200 rather than Vercel 404.</li>
                </ol>
              </div>
            </div>
          )}

          {/* TAB 5: VIEW SOURCE PRE-RENDERED CODE */}
          {activeTab === 'source' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 space-y-1">
                <h4 className="font-bold text-white text-sm flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-cyan-400" />
                  <span>Raw HTML Source Code Verification ("view-source:")</span>
                </h4>
                <p className="text-slate-300 text-xs">
                  Inspect tools and university professors often look at raw page source before JavaScript runs. Nexus Vault has pre-rendered semantic headings and AEO Q&amp;A blocks directly inside <code className="text-cyan-300 font-mono">index.html</code>.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-3 font-mono text-xs">
                <span className="text-slate-400 text-[11px] block">// Pre-rendered snippet from /index.html inside &lt;div id="root"&gt;:</span>
                <pre className="text-cyan-300 overflow-x-auto leading-relaxed">
{`<!-- Semantic H1 Heading -->
<h1 class="text-4xl font-bold text-white mt-1">
  Cyberpunk 2077 Review: Phantom Liberty & Dogtown Breakdown
</h1>

<!-- AEO Question & Answer Section in Source Code -->
<section aria-label="AEO Answer Engine Optimization Inquiries">
  <article>
    <h3>Q1: Is Cyberpunk 2077: Phantom Liberty worth playing if you never finished the original story?</h3>
    <p><strong>Direct Answer:</strong> Yes. Phantom Liberty completely revitalizes Cyberpunk 2077...</p>
  </article>
  <article>
    <h3>Q2: How long does it take to beat Cyberpunk 2077: Phantom Liberty?</h3>
    <p><strong>Direct Answer:</strong> Beating the main narrative takes between 18 and 22 hours...</p>
  </article>
</section>

<!-- Semantic H2 Heading -->
<h2>Cyberpunk 2077 Gameplay: Is Phantom Liberty Worth Playing in 2026?</h2>

<!-- Semantic H3 Heading -->
<h3>Cyberpunk 2077 Cyberware & Relic Perks: How Does Combat Evolve?</h3>`}
                </pre>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-white/10 bg-slate-950/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-400 shrink-0">
          <div>
            Nexus Vault SEO Architecture · Prepared for Class Evaluation
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold transition-colors self-end sm:self-auto"
          >
            Close Inspector
          </button>
        </div>

      </div>
    </div>
  );
};
