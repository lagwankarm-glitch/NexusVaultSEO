import React, { useState, useEffect } from 'react';
import { X, Github, Copy, Check, Terminal, ExternalLink, Globe, FileCode, Rocket } from 'lucide-react';

interface GitHubModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCopyNotice: (msg: string) => void;
}

export const GitHubModal: React.FC<GitHubModalProps> = ({
  isOpen,
  onClose,
  onCopyNotice,
}) => {
  const [githubUsername, setGithubUsername] = useState('your-username');
  const [repoName, setRepoName] = useState('nexus-vault');
  const [activeTab, setActiveTab] = useState<'terminal' | 'pages' | 'readme'>('terminal');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const repoUrl = `https://github.com/${githubUsername || 'your-username'}/${repoName || 'nexus-vault'}.git`;

  const commands = [
    { label: 'Initialize local repository', cmd: 'git init' },
    { label: 'Stage all project files', cmd: 'git add .' },
    { label: 'Commit project files', cmd: 'git commit -m "feat: initial commit of Nexus Vault with official posters & community reviews"' },
    { label: 'Rename branch to main', cmd: 'git branch -M main' },
    { label: 'Connect remote GitHub origin', cmd: `git remote add origin ${repoUrl}` },
    { label: 'Push code to GitHub', cmd: 'git push -u origin main' },
  ];

  const fullCommandBlock = `# 1. Initialize & stage files
git init
git add .
git commit -m "feat: initial commit of Nexus Vault with official posters & community reviews"

# 2. Configure branch and remote
git branch -M main
git remote add origin ${repoUrl}

# 3. Push to GitHub
git push -u origin main`;

  const copyToClipboard = (text: string, index?: number) => {
    navigator.clipboard.writeText(text);
    if (index !== undefined) {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    }
    onCopyNotice('Copied command to clipboard!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="bg-[#0f1424] border border-white/15 w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-slate-900/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-white">
              <Github className="w-5 h-5 text-violet-400" />
            </div>
            <div>
              <h3 className="text-xl font-display font-bold text-white flex items-center gap-2">
                Push Nexus Vault to GitHub
              </h3>
              <p className="text-xs text-slate-400">
                Turn your project into a live repository and host it for free on GitHub Pages
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Dynamic Config Bar */}
        <div className="p-5 bg-slate-950/70 border-b border-white/5 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Configure Your Repository Details
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Your GitHub Username</label>
              <input
                type="text"
                value={githubUsername}
                onChange={(e) => setGithubUsername(e.target.value.trim())}
                placeholder="e.g. lagwankarm"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
              />
            </div>
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Repository Name</label>
              <input
                type="text"
                value={repoName}
                onChange={(e) => setRepoName(e.target.value.trim())}
                placeholder="nexus-vault"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
              />
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 px-6 py-2.5 border-b border-white/5 bg-slate-900/40 text-xs">
          <button
            onClick={() => setActiveTab('terminal')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 ${
              activeTab === 'terminal' ? 'bg-violet-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Terminal Push Commands</span>
          </button>
          <button
            onClick={() => setActiveTab('pages')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 ${
              activeTab === 'pages' ? 'bg-violet-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>GitHub Pages Deployment</span>
          </button>
          <button
            onClick={() => setActiveTab('readme')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 ${
              activeTab === 'readme' ? 'bg-violet-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>Project README</span>
          </button>
        </div>

        {/* Body content */}
        <div className="p-6 overflow-y-auto space-y-5 text-left text-xs sm:text-sm">
          {activeTab === 'terminal' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-300 font-medium text-xs">
                  Run these commands in your project folder root in terminal:
                </span>
                <button
                  onClick={() => copyToClipboard(fullCommandBlock)}
                  className="flex items-center gap-1.5 bg-violet-600/80 hover:bg-violet-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors active:scale-[0.98]"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy All Commands</span>
                </button>
              </div>

              {/* Command blocks */}
              <div className="space-y-2.5">
                {commands.map((step, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-950/80 border border-white/5 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-slate-400 font-medium">
                        Step {idx + 1}: {step.label}
                      </span>
                      <button
                        onClick={() => copyToClipboard(step.cmd, idx)}
                        className="text-slate-400 hover:text-cyan-300 text-xs flex items-center gap-1 transition-colors"
                      >
                        {copiedIndex === idx ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400 text-[11px]">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span className="text-[11px]">Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                    <code className="block text-cyan-300 font-mono text-xs select-all overflow-x-auto py-1">
                      {step.cmd}
                    </code>
                  </div>
                ))}
              </div>

              {/* Tips */}
              <div className="p-4 rounded-xl bg-violet-950/20 border border-violet-500/20 space-y-1 text-slate-300 text-xs">
                <span className="font-bold text-violet-400">Before running the push commands:</span>
                <p>
                  1. Visit <a href="https://github.com/new" target="_blank" rel="noreferrer" className="text-cyan-400 underline inline-flex items-center gap-0.5">github.com/new <ExternalLink className="w-3 h-3" /></a> to create a new repository named <strong>{repoName || 'nexus-vault'}</strong>.
                </p>
                <p>2. Keep it <strong>Public</strong> and do not check "Add a README file" (to avoid commit conflicts).</p>
              </div>
            </div>
          )}

          {activeTab === 'pages' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 space-y-3">
                <h4 className="font-bold text-white text-sm flex items-center gap-2">
                  <Rocket className="w-4 h-4 text-cyan-400" />
                  Deploying with GitHub Pages (Free Hosting)
                </h4>
                <p className="text-slate-300 leading-relaxed text-xs">
                  Once your code is pushed to GitHub, you can publish it live to the web in less than a minute:
                </p>

                <ol className="list-decimal list-inside space-y-2 text-slate-300 text-xs">
                  <li>In your repository on GitHub, go to the <strong>Settings</strong> tab.</li>
                  <li>Click <strong>Pages</strong> in the left sidebar menu (under Code and automation).</li>
                  <li>Under <strong>Build and deployment &gt; Source</strong>, choose <strong>GitHub Actions</strong> or <strong>Deploy from a branch</strong>.</li>
                  <li>Select branch <code>main</code> and folder <code>/ (root)</code> or use the Vite GitHub Pages action.</li>
                  <li>Save! Your live website URL will be: <code className="text-cyan-400 font-mono font-bold">https://{githubUsername || 'USERNAME'}.github.io/{repoName || 'nexus-vault'}/</code></li>
                </ol>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 space-y-2">
                <h5 className="font-bold text-white text-xs">Alternative 1-Click Deploy: Vercel or Netlify</h5>
                <p className="text-xs text-slate-400 leading-relaxed">
                  You can also import this GitHub repo into <strong className="text-slate-200">Vercel</strong> or <strong className="text-slate-200">Netlify</strong> with zero configuration—it automatically detects Vite and React!
                </p>
              </div>
            </div>
          )}

          {activeTab === 'readme' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300">Generated README.md</span>
                <button
                  onClick={() => {
                    const md = `# NEXUS VAULT 🎮\n\nNext-Gen Game Review Blog & Interactive Community Hub.\n\n## Features\n- Official Steam Poster Art & key visuals\n- Detailed Critic Breakdown with sub-scores\n- Real-time Community Review engine with hours tracking\n- Live Upvoting and filterable gamer consensus feed\n\n## Getting Started\n\`\`\`bash\nnpm install\nnpm run dev\n\`\`\`\n\n## Build\n\`\`\`bash\nnpm run build\n\`\`\``;
                    copyToClipboard(md);
                  }}
                  className="flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 font-semibold"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Markdown</span>
                </button>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 border border-white/5 font-mono text-xs text-slate-300 overflow-x-auto whitespace-pre-wrap">
{`# NEXUS VAULT 🎮

Next-Gen Game Review Blog & Interactive Community Hub.

## Features
- **Official Steam Poster Art**: High-resolution key visual assets from verified game headers.
- **Deep Editorial Analysis**: Comprehensive reviews, score radars, and Pros/Cons breakdowns.
- **Interactive Community Engine**: Submit ratings with 0.1 precision, log playtime, and select playstyles.
- **Live Gamer Consensus Feed**: Real-time community averages that update dynamically on submission.
- **Glassmorphic Cyberpunk/Sci-Fi UI**: Responsive, fluid transitions, and WCAG AA contrast.

## Tech Stack
- React 19 + TypeScript
- Tailwind CSS v4
- Lucide Icons & Motion

## Getting Started
\`\`\`bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev
\`\`\`

## Build for Production
\`\`\`bash
npm run build
\`\`\``}
              </pre>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-slate-900/60 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            Nexus Vault is configured for immediate GitHub push.
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold transition-colors"
          >
            Close Guide
          </button>
        </div>

      </div>
    </div>
  );
};
