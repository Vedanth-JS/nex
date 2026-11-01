import React, { useState, useEffect } from 'react';
import { 
  X, 
  Monitor, 
  Tablet, 
  Smartphone, 
  Maximize2, 
  Minimize2, 
  ExternalLink,
  Sparkles,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { DemoId } from '../types';
import { RestaurantDemo } from './RestaurantDemo';
import { ClinicDemo } from './ClinicDemo';
import { HotelDemo } from './HotelDemo';
import { CoachingDemo } from './CoachingDemo';
import { GymDemo } from './GymDemo';
import { RealEstateDemo } from './RealEstateDemo';

interface DemoViewerModalProps {
  isOpen: boolean;
  activeDemoId: DemoId;
  onClose: () => void;
  onSelectDemo: (id: DemoId) => void;
  onOrderThisWebsite: (demoId: DemoId) => void;
}

const DEMOS_LIST: { id: DemoId; name: string; tag: string }[] = [
  { id: 'restaurant', name: 'Restaurant Demo', tag: 'Savoria Bistro' },
  { id: 'clinic', name: 'Clinic Demo', tag: 'PulseCare Medical' },
  { id: 'hotel', name: 'Hotel Demo', tag: 'Oberoi Palace' },
  { id: 'coaching', name: 'Academy Demo', tag: 'DreamIAS EdTech' },
  { id: 'gym', name: 'Gym Demo', tag: 'IronCore Fitness' },
  { id: 'real-estate', name: 'Real Estate Demo', tag: 'Aura Prime' },
];

export const DemoViewerModal: React.FC<DemoViewerModalProps> = ({
  isOpen,
  activeDemoId,
  onClose,
  onSelectDemo,
  onOrderThisWebsite,
}) => {
  const [deviceView, setDeviceView] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const renderActiveDemo = () => {
    const props = { onOrderThisWebsite: () => onOrderThisWebsite(activeDemoId) };
    switch (activeDemoId) {
      case 'restaurant':
        return <RestaurantDemo {...props} />;
      case 'clinic':
        return <ClinicDemo {...props} />;
      case 'hotel':
        return <HotelDemo {...props} />;
      case 'coaching':
        return <CoachingDemo {...props} />;
      case 'gym':
        return <GymDemo {...props} />;
      case 'real-estate':
        return <RealEstateDemo {...props} />;
      default:
        return <RestaurantDemo {...props} />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black/90 backdrop-blur-xl animate-in fade-in duration-200">
      {/* Top Controller Bar */}
      <div className="bg-[#0b1020] border-b border-white/10 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 shrink-0 text-white z-20">
        
        {/* Left: Nexora Live Demo Badge & Tabs */}
        <div className="flex items-center gap-3 overflow-x-auto py-1 scrollbar-none">
          <div className="flex items-center gap-2 pl-1 pr-3 border-r border-white/10 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-purple-300 flex items-center gap-1.5">
              <span>NEXORA</span>
              <span className="text-[10px] bg-purple-500/30 text-purple-200 px-1.5 py-0.5 rounded font-mono">LIVE DEMO</span>
            </span>
          </div>

          {/* Quick Demo Switcher Pills */}
          <div className="flex items-center gap-1.5 shrink-0">
            {DEMOS_LIST.map((demo) => (
              <button
                key={demo.id}
                onClick={() => onSelectDemo(demo.id)}
                className={`text-xs px-2.5 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                  activeDemoId === demo.id
                    ? 'bg-purple-600 text-white font-bold shadow-md shadow-purple-600/30'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span>{demo.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Center: Device Viewport Controls (Desktop / Tablet / Mobile) */}
        <div className="hidden md:flex items-center bg-black/40 border border-white/10 p-0.5 rounded-xl">
          <button
            onClick={() => setDeviceView('desktop')}
            title="Desktop View (100%)"
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              deviceView === 'desktop'
                ? 'bg-purple-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Desktop</span>
          </button>
          <button
            onClick={() => setDeviceView('tablet')}
            title="Tablet View (768px)"
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              deviceView === 'tablet'
                ? 'bg-purple-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Tablet className="w-3.5 h-3.5" />
            <span>Tablet (768px)</span>
          </button>
          <button
            onClick={() => setDeviceView('mobile')}
            title="Mobile View (390px)"
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              deviceView === 'mobile'
                ? 'bg-purple-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile (390px)</span>
          </button>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onOrderThisWebsite(activeDemoId)}
            className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 text-white text-xs font-bold hover:brightness-110 transition-all flex items-center gap-1.5 shadow-lg shadow-purple-600/30"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Order This Website</span>
            <span className="sm:hidden">Order</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            className="hidden sm:flex p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-all"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          <button
            onClick={onClose}
            title="Close Demo Viewer (Esc)"
            className="p-1.5 rounded-lg bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-500/30 transition-all flex items-center gap-1"
          >
            <X className="w-4 h-4" />
            <span className="text-xs font-semibold pr-1 hidden sm:inline">Back</span>
          </button>
        </div>

      </div>

      {/* Demo Viewport Area */}
      <div className="flex-1 overflow-auto bg-[#050510] flex justify-center items-start p-2 sm:p-4">
        <div
          className={`transition-all duration-300 bg-[#050510] ${
            deviceView === 'desktop'
              ? 'w-full h-full rounded-xl overflow-y-auto border border-white/10 shadow-2xl'
              : deviceView === 'tablet'
              ? 'w-[768px] max-w-full my-4 rounded-3xl overflow-y-auto border-4 border-slate-700 shadow-[0_0_50px_rgba(0,0,0,0.8)] max-h-[92vh]'
              : 'w-[390px] max-w-full my-4 rounded-[40px] overflow-y-auto border-4 border-slate-700 shadow-[0_0_50px_rgba(0,0,0,0.8)] max-h-[92vh]'
          }`}
        >
          {/* Simulated Browser URL bar for tablet/mobile framing */}
          {deviceView !== 'desktop' && (
            <div className="bg-[#1e293b] px-4 py-2 flex items-center justify-between border-b border-slate-700 sticky top-0 z-30">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              </div>
              <div className="bg-[#0f172a] px-4 py-1 rounded-full text-[11px] text-slate-300 font-mono flex items-center gap-2 border border-slate-700/60 max-w-[220px] truncate">
                <span className="text-emerald-400">🔒</span>
                <span>https://{activeDemoId}-demo.nexora.tech</span>
              </div>
              <div className="w-4" />
            </div>
          )}

          {/* Real rendered demo website */}
          <div className="relative">
            {renderActiveDemo()}
          </div>
        </div>
      </div>
    </div>
  );
};
