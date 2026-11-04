import React, { useState, useRef, MouseEvent } from 'react';
import { 
  ExternalLink, 
  UtensilsCrossed, 
  Stethoscope, 
  Building2, 
  ShoppingBag,
  CheckCircle2,
  Eye,
  Layers,
  Sparkles
} from 'lucide-react';
import { FloatingBadges3D } from './3d/FloatingBadges3D';
import { DemoId } from '../types';

interface HeroMockupPreviewProps {
  onOpenDemo: (id: DemoId) => void;
}

const MOCKUP_TABS = [
  {
    id: 'restaurant' as DemoId,
    label: 'Restaurant Website',
    brand: 'Savoria Bistro',
    url: 'https://savoria-bistro.nexora.tech',
    icon: UtensilsCrossed,
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80',
    title: 'Flavors That Stay in Your Memory',
    subtitle: 'Digital food menu • Online table reservations • WhatsApp direct ordering',
    tag: 'Live Working Demo',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30'
  },
  {
    id: 'clinic' as DemoId,
    label: 'Clinic & Hospital',
    brand: 'PulseCare Medical',
    url: 'https://pulsecare-clinic.nexora.tech',
    icon: Stethoscope,
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1000&q=80',
    title: 'Full Service Clinic With Modern Tech',
    subtitle: 'Doctor profiles • OPD appointment scheduler • 24/7 emergency hotline',
    tag: 'Live Working Demo',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
  },
  {
    id: 'hotel' as DemoId,
    label: 'Hotel & Resort',
    brand: 'The Grand Oberoi Palace',
    url: 'https://oberoi-palace.nexora.tech',
    icon: Building2,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80',
    title: 'Where Luxury Is A Way Of Life',
    subtitle: 'Palace pool suites • Zero-commission tariff booking • Virtual tours',
    tag: 'Live Working Demo',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
  },
  {
    id: 'real-estate' as DemoId,
    label: 'Real Estate / Retail',
    brand: 'Aura Prime Living',
    url: 'https://aura-prime.nexora.tech',
    icon: ShoppingBag,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
    title: 'Prime Residential Sanctuary & Villas',
    subtitle: '2BHK/3BHK listings • Free cab site visit scheduler • Floor plan downloads',
    tag: 'Live Working Demo',
    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30'
  }
];

export const HeroMockupPreview: React.FC<HeroMockupPreviewProps> = ({ onOpenDemo }) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [isIsometric, setIsIsometric] = useState<boolean>(false);
  const [mouseRot, setMouseRot] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const current = MOCKUP_TABS[activeTab];

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (isIsometric || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotX = -(y / (rect.height / 2)) * 7;
    const rotY = (x / (rect.width / 2)) * 7;
    setMouseRot({ x: rotX, y: rotY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMouseRot({ x: 0, y: 0 });
  };

  const currentTransform = isIsometric
    ? 'rotateX(18deg) rotateY(-14deg) rotateZ(3deg) scale3d(0.96, 0.96, 0.96)'
    : isHovered
    ? `rotateX(${mouseRot.x.toFixed(2)}deg) rotateY(${mouseRot.y.toFixed(2)}deg) scale3d(1.01, 1.01, 1.01)`
    : 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';

  return (
    <div className="relative w-full max-w-5xl mx-auto mt-14" style={{ perspective: '1600px' }}>
      
      {/* 3D Cyber Grid floor effect */}
      <div className="cyber-grid-3d" />

      {/* Orbiting 3D floating badges */}
      <FloatingBadges3D />

      {/* 3D Perspective Toggle Controls */}
      <div className="flex items-center justify-between mb-4 px-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
            3D Interactive Preview Engine
          </span>
        </div>

        <button
          onClick={() => setIsIsometric(!isIsometric)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
            isIsometric
              ? 'bg-purple-600 text-white border-purple-400 shadow-[0_0_20px_rgba(139,92,246,0.6)]'
              : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/10'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>{isIsometric ? 'Exit 3D Isometric View' : 'Switch to 3D Isometric View'}</span>
        </button>
      </div>

      {/* Glowing 3D Backing Aura */}
      <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-aurora-violet via-aurora-magenta to-aurora-amber opacity-30 blur-3xl -z-10" />

      {/* Main 3D Browser Mockup Container */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: currentTransform,
          transition: isHovered && !isIsometric ? 'transform 0.12s ease-out' : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          transformStyle: 'preserve-3d',
        }}
        className="glass-card-3d rounded-2xl sm:rounded-3xl border border-white/20 overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.9),_0_0_50px_rgba(139,92,246,0.25)] bg-[#090d1c]/95 will-change-transform"
      >
        
        {/* Browser Top Bar with 3D Depth */}
        <div 
          style={{ transform: 'translateZ(25px)' }}
          className="bg-[#0e1428] px-4 py-3 border-b border-white/10 flex flex-wrap items-center justify-between gap-3 relative z-20"
        >
          {/* Traffic Light Dots */}
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]" />
            <div className="w-3 h-3 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
            <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
            <span className="text-[11px] font-mono text-slate-400 ml-2 hidden sm:inline">Nexora 3D Studio</span>
          </div>

          {/* Browser Address Bar */}
          <div className="flex-1 max-w-sm sm:max-w-md mx-auto bg-[#050814] border border-white/10 rounded-lg px-3 py-1 flex items-center justify-between text-xs font-mono text-slate-300 shadow-inner">
            <div className="flex items-center gap-2 truncate">
              <span className="text-emerald-400 text-xs">🔒</span>
              <span className="text-slate-300 truncate">{current.url}</span>
            </div>
            <span className="text-[10px] text-cyan-400 bg-cyan-500/10 px-1.5 rounded shrink-0">SSL 256-bit</span>
          </div>

          {/* Right Action: Click to test working demo */}
          <button
            onClick={() => onOpenDemo(current.id)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-purple-600/30 hover:bg-purple-600 text-purple-200 hover:text-white border border-purple-500/40 text-xs font-semibold transition-all shadow-md shadow-purple-600/20"
          >
            <Eye className="w-3.5 h-3.5 text-cyan-400" />
            <span>Open Interactive Demo</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>

        {/* Tab Switcher Pills with 3D Depth */}
        <div 
          style={{ transform: 'translateZ(15px)' }}
          className="bg-[#070b18] px-4 py-2 border-b border-white/10 flex items-center gap-2 overflow-x-auto scrollbar-none relative z-10"
        >
          {MOCKUP_TABS.map((tab, idx) => {
            const Icon = tab.icon;
            const isActive = activeTab === idx;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(idx)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-purple-600/30 text-white shadow-sm border border-purple-500/40'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                )}
              </button>
            );
          })}
        </div>

        {/* Rendered Mockup Showcase Body with 3D Layers */}
        <div className="relative min-h-[360px] sm:min-h-[440px] overflow-hidden group bg-gradient-to-br from-amber-500/10 to-violet-500/10 bg-[#090d1c]">
          <img 
            src={current.image} 
            alt=""
            aria-label={current.title}
            loading="lazy"
            decoding="async"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
            className="w-full h-full object-cover min-h-[360px] sm:min-h-[440px] transition-transform duration-700 group-hover:scale-105 brightness-[0.7]" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090d1c] via-[#090d1c]/40 to-transparent pointer-events-none" />

          {/* Interactive 3D Overlay Box (Pops out in 3D!) */}
          <div 
            style={{ transform: 'translateZ(45px)' }}
            className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8 bg-[#090d1c]/90 backdrop-blur-2xl border border-white/20 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-20"
          >
            <div className="max-w-xl">
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded border ${current.badgeColor}`}>
                  {current.tag}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Brand: {current.brand}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight">
                {current.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed">
                {current.subtitle}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto shrink-0">
              <button
                onClick={() => onOpenDemo(current.id)}
                className="px-6 py-3.5 rounded-xl gradient-button text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-2xl shadow-purple-600/40 group/btn"
              >
                <span>Launch Interactive Demo</span>
                <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Corner 3D Badge */}
          <div 
            style={{ transform: 'translateZ(40px)' }}
            className="hidden lg:flex absolute top-6 right-6 bg-[#050814]/90 backdrop-blur-md border border-white/15 rounded-xl p-3 items-center gap-3 shadow-xl z-20"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div className="text-left text-xs">
              <p className="font-bold text-white">100% Mobile Ready</p>
              <p className="text-[11px] text-slate-400">Tested on iOS & Android</p>
            </div>
          </div>

        </div>

      </div>

      {/* Sub-label */}
      <div className="flex items-center justify-center gap-2 mt-5 text-xs text-slate-400">
        <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
        <span>Hover cursor across the mockup to inspect in physical 3D perspective or click tabs to preview</span>
      </div>
    </div>
  );
};
