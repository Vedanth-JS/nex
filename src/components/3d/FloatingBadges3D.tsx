import React from 'react';
import { Zap, MessageCircle, ShieldCheck, Sparkles, Smartphone } from 'lucide-react';

export const FloatingBadges3D: React.FC = () => {
  return (
    <>
      {/* 3D Floating Badge 1 - Top Left */}
      <div 
        style={{ transform: 'translateZ(60px)' }}
        className="hidden xl:flex absolute -top-8 -left-10 z-30 animate-float-slow items-center gap-2.5 px-4 py-2.5 rounded-2xl glass-card-3d border border-purple-500/40 shadow-[0_15px_30px_rgba(139,92,246,0.3)] backdrop-blur-xl"
      >
        <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center shadow-inner">
          <Zap className="w-4 h-4 fill-purple-400" />
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-purple-300">Google Lighthouse</p>
          <p className="text-xs font-black text-white">99+ Speed Score</p>
        </div>
      </div>

      {/* 3D Floating Badge 2 - Top Right */}
      <div 
        style={{ transform: 'translateZ(70px)' }}
        className="hidden xl:flex absolute -top-8 -right-10 z-30 animate-float-reverse items-center gap-2.5 px-4 py-2.5 rounded-2xl glass-card-3d border border-emerald-500/40 shadow-[0_15px_30px_rgba(16,185,129,0.3)] backdrop-blur-xl"
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
        className="hidden xl:flex absolute -bottom-6 -left-8 z-30 animate-float-reverse items-center gap-2.5 px-4 py-2.5 rounded-2xl glass-card-3d border border-cyan-500/40 shadow-[0_15px_30px_rgba(34,211,238,0.25)] backdrop-blur-xl"
      >
        <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center shadow-inner">
          <Smartphone className="w-4 h-4" />
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-cyan-300">Responsive Architecture</p>
          <p className="text-xs font-black text-white">100% Mobile Fluid</p>
        </div>
      </div>

      {/* 3D Floating Badge 4 - Bottom Right */}
      <div 
        style={{ transform: 'translateZ(65px)' }}
        className="hidden xl:flex absolute -bottom-6 -right-8 z-30 animate-float-slow items-center gap-2.5 px-4 py-2.5 rounded-2xl glass-card-3d border border-amber-500/40 shadow-[0_15px_30px_rgba(245,158,11,0.25)] backdrop-blur-xl"
      >
        <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shadow-inner">
          <Sparkles className="w-4 h-4 fill-amber-400 text-amber-400" />
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-amber-300">Affordable Pricing</p>
          <p className="text-xs font-black text-white">From Only ₹2,999</p>
        </div>
      </div>
    </>
  );
};
