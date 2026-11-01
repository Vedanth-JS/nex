import React from 'react';
import { 
  ArrowRight, 
  MessageCircle, 
  Sparkles,
  Rocket
} from 'lucide-react';
import { motion } from 'framer-motion';
import { getWhatsAppUrl, WHATSAPP_CONFIG } from '../utils/whatsapp';

interface FinalCTAProps {
  onStartProject: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onStartProject }) => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-[#050510]">
      {/* Dynamic Purple-Blue Gradient Mesh Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 via-blue-900/25 to-cyan-900/25 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[450px] bg-gradient-to-tr from-purple-600/20 via-blue-600/20 to-cyan-400/15 rounded-full blur-[160px] pointer-events-none" />

      {/* Subtle Floating Particle Dots */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          animate={{ y: [0, -20, 0], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-1/5 w-2 h-2 rounded-full bg-purple-400 blur-[1px]" 
        />
        <motion.div 
          animate={{ y: [0, 25, 0], opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute top-1/3 right-1/4 w-3 h-3 rounded-full bg-cyan-400 blur-[1.5px]" 
        />
        <motion.div 
          animate={{ y: [0, -15, 0], opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-1/4 left-1/3 w-2 h-2 rounded-full bg-blue-400 blur-[1px]" 
        />
      </div>

      <div className="max-w-5xl mx-auto relative z-10 text-center">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/70 border border-purple-500/40 text-purple-300 text-xs font-semibold mb-6 shadow-lg shadow-purple-950/40">
          <Rocket className="w-3.5 h-3.5 text-cyan-400" />
          <span>Launch Your Website In Days</span>
        </div>

        {/* Heading (Exact as requested) */}
        <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-6">
          Let's Build Something <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#3B82F6] to-[#22D3EE] drop-shadow-[0_0_30px_rgba(139,92,246,0.35)]">
            Extraordinary Together.
          </span>
        </h2>

        {/* Description (Exact as requested) */}
        <p className="text-slate-300 text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto mb-10 text-balance">
          Your next customer could be just one click away. Give your business the online presence it deserves.
        </p>

        {/* Buttons (Exact as requested) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <button
            onClick={onStartProject}
            className="w-full sm:w-auto px-8 py-4 rounded-xl gradient-button text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_15px_35px_rgba(139,92,246,0.45)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <span>START YOUR PROJECT</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href={getWhatsAppUrl("Hello Nexora Technologies! I want to start my business website.")}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/20 transition-all cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>CHAT ON WHATSAPP</span>
          </a>
        </div>

        {/* Sub-text disclaimer */}
        <p className="text-slate-400 text-xs mt-6">
          Free consultation • Itemized quote upfront • No obligations
        </p>

      </div>
    </section>
  );
};
