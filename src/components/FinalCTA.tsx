import React from 'react';
import { 
  ArrowRight, 
  MessageCircle, 
  Rocket 
} from 'lucide-react';
import { motion } from 'framer-motion';
import { getWhatsAppUrl } from '../utils/whatsapp';

interface FinalCTAProps {
  onStartProject: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onStartProject }) => {
  return (
    <section className="py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-aurora-bg/80 border-t border-white/5">
      {/* Aurora Ambient Lighting & Rotating 3D Globe Sync */}
      <div className="absolute inset-0 bg-gradient-to-r from-aurora-violet/10 via-aurora-magenta/10 to-aurora-amber/10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[450px] bg-gradient-to-tr from-aurora-violet/20 via-aurora-magenta/15 to-aurora-amber/15 rounded-full blur-[160px] pointer-events-none" />

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          animate={{ y: [0, -20, 0], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-1/5 w-2 h-2 rounded-full bg-aurora-violet blur-[1px]" 
        />
        <motion.div 
          animate={{ y: [0, 25, 0], opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute top-1/3 right-1/4 w-3 h-3 rounded-full bg-aurora-amber blur-[1.5px]" 
        />
        <motion.div 
          animate={{ y: [0, -15, 0], opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-1/4 left-1/3 w-2 h-2 rounded-full bg-aurora-magenta blur-[1px]" 
        />
      </div>

      <div className="max-w-5xl mx-auto relative z-10 text-center">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-aurora-surface border border-aurora-violet/40 text-aurora-amber text-xs font-semibold mb-6 shadow-lg">
          <Rocket className="w-3.5 h-3.5 text-aurora-amber" />
          <span>Launch Your Website In Days</span>
        </div>

        {/* Heading */}
        <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-6">
          Let's Build Something <br className="hidden sm:block" />
          <span className="headline-shimmer drop-shadow-[0_0_30px_rgba(124,92,255,0.35)]">
            Extraordinary Together.
          </span>
        </h2>

        {/* Description */}
        <p className="text-aurora-muted text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto mb-10 text-balance">
          Your next customer could be just one click away. Give your business the online presence it deserves.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <button
            onClick={onStartProject}
            className="w-full sm:w-auto px-8 py-4 rounded-xl btn-amber-cta text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>START YOUR PROJECT</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href={getWhatsAppUrl("Hello Nexora Technologies! I want to start my business website.")}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp with Nexora Technologies"
            className="w-full sm:w-auto min-h-[48px] px-8 py-4 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 active:scale-95 text-emerald-300 border border-emerald-500/40 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/20 transition-all cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>CHAT ON WHATSAPP</span>
          </a>
        </div>

        {/* Sub-text disclaimer */}
        <p className="text-aurora-muted/80 text-xs mt-6">
          Free consultation • Itemized quote upfront • No obligations
        </p>

      </div>
    </section>
  );
};

export default FinalCTA;
