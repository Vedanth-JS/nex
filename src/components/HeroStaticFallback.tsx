import React from 'react';

// Static Fallback Component shown while 3D is loading, on mobile (<768px), or when reduced motion / no WebGL
export const HeroStaticFallback: React.FC<{ onOpenDemo?: (id: string) => void }> = ({ onOpenDemo }) => {
  return (
    <div className="relative w-full h-[380px] sm:h-[460px] lg:h-[500px] flex items-center justify-center select-none">
      {/* Central Browser Frame */}
      <div className="w-full max-w-lg lg:max-w-none rounded-2xl overflow-hidden border border-white/15 bg-aurora-surface shadow-[0_25px_60px_rgba(0,0,0,0.85)] relative z-10 transition-transform duration-500 hover:scale-[1.01]">
        {/* Chrome Bar */}
        <div className="bg-aurora-elevated px-4 py-2.5 border-b border-white/10 flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <div className="flex-1 max-w-[220px] mx-auto bg-black/50 px-3 py-1 rounded-md border border-white/10 text-center text-[10px] text-aurora-muted font-mono">
            savoria-bistro.nexora.tech
          </div>
          <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-aurora-violet/20 text-aurora-amber border border-aurora-violet/30">
            Demo Concept
          </span>
        </div>

        {/* Static Savoria Image */}
        <div 
          onClick={() => onOpenDemo && onOpenDemo('restaurant')}
          className="relative h-64 sm:h-72 lg:h-80 overflow-hidden bg-aurora-surface cursor-pointer group"
        >
          <img
            src="/textures/savoria-preview.webp"
            alt="Savoria Bistro Restaurant Website Mockup"
            width={1200}
            height={503}
            loading="eager"
            decoding="async"
            className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-500"
          />
        </div>
      </div>

      {/* Orbiting Cards (Visible on screens > 640px) */}
      <div 
        onClick={() => onOpenDemo && onOpenDemo('clinic')}
        className="hidden sm:block absolute -top-4 -right-4 w-52 rounded-xl p-3 bg-aurora-elevated/95 backdrop-blur-xl border border-aurora-amber/40 shadow-xl z-20 cursor-pointer hover:scale-105 transition-transform"
      >
        <span className="text-[9px] uppercase font-bold text-aurora-amber bg-aurora-amber/10 px-1.5 py-0.5 rounded">Demo Concept</span>
        <p className="text-xs font-bold text-white mt-1">PulseCare Clinic</p>
        <p className="text-[10px] text-aurora-muted">Next Slot: Today 4:30 PM</p>
      </div>

      <div 
        onClick={() => onOpenDemo && onOpenDemo('hotel')}
        className="hidden sm:block absolute -bottom-4 -left-4 w-52 rounded-xl p-3 bg-aurora-elevated/95 backdrop-blur-xl border border-aurora-violet/40 shadow-xl z-20 cursor-pointer hover:scale-105 transition-transform"
      >
        <span className="text-[9px] uppercase font-bold text-aurora-violet bg-aurora-violet/10 px-1.5 py-0.5 rounded">Demo Concept</span>
        <p className="text-xs font-bold text-white mt-1">The Grand Oberoi</p>
        <p className="text-[10px] text-aurora-muted">Royal Pool Villa • ₹4,999</p>
      </div>
    </div>
  );
};

export default HeroStaticFallback;
