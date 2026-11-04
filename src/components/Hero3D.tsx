import React, { useState, useEffect } from 'react';
import { ExternalLink, Sparkles, UtensilsCrossed, Stethoscope, Building2, ShoppingBag } from 'lucide-react';
import { DemoId } from '../types';
import { HeroStaticFallback } from './HeroStaticFallback';

interface Hero3DProps {
  onOpenDemo?: (id: DemoId) => void;
}

/**
 * Hero3D: Desktop interactive overlay that floats above the persistent World3D canvas.
 * Disables itself and renders HeroStaticFallback on mobile (<768px) or prefers-reduced-motion.
 */
export const Hero3D: React.FC<Hero3DProps> = ({ onOpenDemo }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState<DemoId>('restaurant');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const check = () => {
        setIsMobile(window.innerWidth < 768 || window.matchMedia('(prefers-reduced-motion: reduce)').matches);
      };
      check();
      window.addEventListener('resize', check);
      return () => window.removeEventListener('resize', check);
    }
  }, []);

  if (isMobile) {
    return <HeroStaticFallback onOpenDemo={(id) => onOpenDemo && onOpenDemo(id as DemoId)} />;
  }

  return (
    <div className="relative w-full h-[460px] lg:h-[500px] flex items-center justify-center select-none pointer-events-auto">
      {/* Interactive Floating Glass Control Deck */}
      <div className="w-full max-w-lg lg:max-w-none rounded-3xl p-6 glass-card-3d border border-aurora-violet/30 shadow-[0_25px_60px_rgba(7,7,13,0.9)] relative z-20 backdrop-blur-2xl transition-all duration-300 hover:border-aurora-amber/50">
        
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/90" />
            <span className="w-3 h-3 rounded-full bg-amber-500/90" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/90" />
            <span className="text-xs font-mono text-aurora-muted ml-2">nexora-3d-suite.v2</span>
          </div>
          <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-aurora-violet/20 text-aurora-amber border border-aurora-violet/40">
            Live WebGL Sync
          </span>
        </div>

        {/* Demo Selector Tabs */}
        <div className="grid grid-cols-4 gap-2 mb-5">
          {[
            { id: 'restaurant' as DemoId, label: 'Dining', icon: UtensilsCrossed },
            { id: 'clinic' as DemoId, label: 'Medical', icon: Stethoscope },
            { id: 'hotel' as DemoId, label: 'Resort', icon: Building2 },
            { id: 'real-estate' as DemoId, label: 'Commerce', icon: ShoppingBag },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  if (onOpenDemo) onOpenDemo(item.id);
                }}
                className={`py-2 px-1.5 rounded-xl text-[11px] font-bold flex flex-col items-center gap-1 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-aurora-amber text-[#07070D] shadow-[0_0_20px_rgba(255,181,71,0.5)] scale-105'
                    : 'bg-white/5 text-aurora-muted hover:text-white hover:bg-white/10 border border-white/5'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Live Preview Screen Card */}
        <div 
          onClick={() => onOpenDemo && onOpenDemo(activeTab)}
          className="relative h-60 rounded-2xl overflow-hidden border border-white/10 bg-[#090D1F] cursor-pointer group shadow-inner"
        >
          <img
            src="/textures/savoria-preview.webp"
            alt="Website concept preview"
            width={1200}
            height={503}
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07070D] via-transparent to-transparent" />

          {/* Badge & Open CTA */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-aurora-amber border border-aurora-amber/30">
            <Sparkles className="w-3 h-3 text-aurora-amber" />
            <span>SAMPLE CONCEPT</span>
          </div>

          <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-4 py-2 rounded-xl btn-amber-cta text-xs uppercase tracking-wider font-bold shadow-lg">
            <span>Launch Live Demo</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Quick Trust Sub-bar */}
        <div className="mt-4 flex items-center justify-between text-[11px] text-aurora-muted pt-3 border-t border-white/5">
          <span>WebGL 60 FPS Camera Track</span>
          <span className="text-aurora-amber font-mono font-bold">90+ Lighthouse Verified</span>
        </div>

      </div>

      {/* Orbiting Glass Satellites */}
      <div 
        onClick={() => onOpenDemo && onOpenDemo('clinic')}
        className="hidden xl:flex absolute -top-5 -right-6 w-52 rounded-2xl p-3 bg-aurora-surface/90 backdrop-blur-xl border border-aurora-violet/40 shadow-2xl z-30 cursor-pointer hover:scale-105 transition-all items-center gap-3 animate-float-slow"
      >
        <div className="w-8 h-8 rounded-xl bg-aurora-violet/20 text-aurora-violet flex items-center justify-center shrink-0 border border-aurora-violet/30">
          <Stethoscope className="w-4 h-4" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-bold text-white truncate">PulseCare Clinic</p>
          <p className="text-[10px] text-aurora-amber font-mono">Sample Concept</p>
        </div>
      </div>

      <div 
        onClick={() => onOpenDemo && onOpenDemo('hotel')}
        className="hidden xl:flex absolute -bottom-5 -left-6 w-52 rounded-2xl p-3 bg-aurora-surface/90 backdrop-blur-xl border border-aurora-magenta/40 shadow-2xl z-30 cursor-pointer hover:scale-105 transition-all items-center gap-3 animate-float-reverse"
      >
        <div className="w-8 h-8 rounded-xl bg-aurora-magenta/20 text-aurora-magenta flex items-center justify-center shrink-0 border border-aurora-magenta/30">
          <Building2 className="w-4 h-4" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-bold text-white truncate">The Grand Oberoi</p>
          <p className="text-[10px] text-aurora-amber font-mono">Sample Concept</p>
        </div>
      </div>
    </div>
  );
};

export default Hero3D;
