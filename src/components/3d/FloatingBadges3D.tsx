import React from 'react';
import { Zap, MessageCircle, Sparkles, Smartphone } from 'lucide-react';

export const FloatingBadges3D: React.FC = () => {
  return (
    <>
      {/* 3D Floating Badge 1 - Top Left */}
      <div 
        style={{ transform: 'translateZ(60px)' }}
        className="hidden xl:flex absolute -top-8 -left-10 z-30 animate-float-slow items-center gap-2.5 px-4 py-2.5 rounded-2xl glass-card-3d border border-aurora-violet/40 shadow-[0_15px_30px_rgba(124,92,255,0.25)] backdrop-blur-xl"
      >
        <div className="w-8 h-8 rounded-xl bg-aurora-violet/20 text-aurora-violet flex items-center justify-center shadow-inner">
          <Zap className="w-4 h-4 fill-aurora-violet" />
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-aurora-violet">Speed Optimized</p>
          <p className="text-xs font-black text-white">90+ Lighthouse</p>
        </div>
      </div>

      {/* 3D Floating Badge 2 - Top Right */}
      <div 
        style={{ transform: 'translateZ(70px)' }}
        className="hidden xl:flex absolute -top-8 -right-10 z-30 animate-float-reverse items-center gap-2.5 px-4 py-2.5 rounded-2xl glass-card-3d border border-emerald-500/40 shadow-[0_15px_30px_rgba(16,185,129,0.25)] backdrop-blur-xl"
      >
        <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center relative shadow-inner">
          <span className="w-2 h-2 rounded-full bg-emerald-400 absolute top-1.5 right-1.5 animate-ping" />
          <MessageCircle className="w-4 h-4" />
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">Conversion Engine</p>
          <p className="text-xs font-black text-white">WhatsApp Bot Integrated</p>
        </div>
      </div>

      {/* 3D Floating Badge 3 - Bottom Left */}
      <div 
        style={{ transform: 'translateZ(50px)' }}
        className="hidden xl:flex absolute -bottom-6 -left-8 z-30 animate-float-reverse items-center gap-2.5 px-4 py-2.5 rounded-2xl glass-card-3d border border-aurora-magenta/40 shadow-[0_15px_30px_rgba(225,75,255,0.25)] backdrop-blur-xl"
      >
        <div className="w-8 h-8 rounded-xl bg-aurora-magenta/20 text-aurora-magenta flex items-center justify-center shadow-inner">
          <Smartphone className="w-4 h-4" />
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-aurora-magenta">Responsive Tech</p>
          <p className="text-xs font-black text-white">100% Mobile Fluid</p>
        </div>
      </div>

      {/* 3D Floating Badge 4 - Bottom Right */}
      <div 
        style={{ transform: 'translateZ(65px)' }}
        className="hidden xl:flex absolute -bottom-6 -right-8 z-30 animate-float-slow items-center gap-2.5 px-4 py-2.5 rounded-2xl glass-card-3d border border-aurora-amber/40 shadow-[0_15px_30px_rgba(255,181,71,0.25)] backdrop-blur-xl"
      >
        <div className="w-8 h-8 rounded-xl bg-aurora-amber/20 text-aurora-amber flex items-center justify-center shadow-inner">
          <Sparkles className="w-4 h-4 fill-aurora-amber text-aurora-amber" />
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-aurora-amber">Affordable Pricing</p>
          <p className="text-xs font-black text-white">From Only ₹2,999</p>
        </div>
      </div>
    </>
  );
};
