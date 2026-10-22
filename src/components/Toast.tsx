import React from 'react';
import { CheckCircle2, Sparkles, X } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onDismiss: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onDismiss }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#111726] border border-cyan-500/40 px-5 py-3.5 rounded-2xl shadow-2xl shadow-cyan-500/10 text-xs animate-in slide-in-from-bottom-5 duration-200">
      <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
        <CheckCircle2 className="w-4 h-4" />
      </div>
      <div>
        <div className="font-bold text-white flex items-center gap-1.5">
          <span>Success</span>
          <Sparkles className="w-3 h-3 text-cyan-400" />
        </div>
        <div className="text-slate-300 mt-0.5">{message}</div>
      </div>
      <button 
        onClick={onDismiss}
        className="ml-2 text-slate-400 hover:text-white"
        aria-label="Dismiss toast"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
