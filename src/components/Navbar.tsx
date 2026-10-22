import React from 'react';
import { Gamepad2, Sparkles, Github } from 'lucide-react';

interface NavbarProps {
  onOpenSubmitModal: (gameId?: string) => void;
  onOpenGitHubModal: () => void;
  onOpenSeoModal: () => void;
  onNavigateSection: (sectionId: string) => void;
  activeSection?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenSubmitModal,
  onOpenGitHubModal,
  onOpenSeoModal,
  onNavigateSection,
}) => {
  return (
    <header className="sticky top-0 z-40 glass-panel border-b border-white/10 bg-[#080b12]/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single text element wordmark */}
        <button 
          onClick={() => onNavigateSection('hero')} 
          className="flex items-center gap-3 text-left group shrink-0 focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-violet-600/30 group-hover:scale-105 transition-transform duration-200">
            <Gamepad2 className="w-5 h-5 text-white" />
          </div>
          <span className="font-display font-bold text-xl tracking-wider text-white whitespace-nowrap">
            NEXUS<span className="text-violet-400">VAULT</span>
          </span>
        </button>

        {/* Zone 2: 4 concise single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <button 
            onClick={() => onNavigateSection('hero')}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Featured
          </button>
          <button 
            onClick={() => onNavigateSection('catalog')}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 py-1"
          >
            All Reviews
          </button>
          <button 
            onClick={() => onNavigateSection('community')}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Community Hub
          </button>
          <button 
            onClick={onOpenGitHubModal}
            className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors whitespace-nowrap shrink-0 py-1"
          >
            <Github className="w-4 h-4" />
            <span>GitHub Guide</span>
          </button>
          <button 
            onClick={onOpenSeoModal}
            className="flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 transition-colors whitespace-nowrap shrink-0 py-1 font-semibold"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>SEO &amp; AEO Audit</span>
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button 
            onClick={() => onOpenSubmitModal()}
            className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold text-xs sm:text-sm px-4 sm:px-5 py-2.5 rounded-xl shadow-lg shadow-violet-600/25 hover:shadow-violet-600/40 transition-all duration-200 active:scale-[0.98] whitespace-nowrap"
          >
            <Sparkles className="w-4 h-4 text-cyan-300" />
            <span>Write Review</span>
          </button>
        </div>

      </div>
    </header>
  );
};
