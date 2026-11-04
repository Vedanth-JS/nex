import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { 
  X, 
  Monitor, 
  Tablet, 
  Smartphone, 
  Sparkles, 
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  MessageCircle,
  UtensilsCrossed,
  HeartPulse,
  Hotel,
  GraduationCap,
  Dumbbell,
  Building2,
  CheckCircle2,
} from 'lucide-react';
import { DemoId } from '../types';
import { getWhatsAppUrl } from '../utils/whatsapp';
import { DemoStateProvider } from './shared';

// Lazy-load each demo for code-splitting
const RestaurantDemo = lazy(() => import('./RestaurantDemo').then(m => ({ default: m.RestaurantDemo })));
const ClinicDemo = lazy(() => import('./ClinicDemo').then(m => ({ default: m.ClinicDemo })));
const HotelDemo = lazy(() => import('./HotelDemo').then(m => ({ default: m.HotelDemo })));
const CoachingDemo = lazy(() => import('./CoachingDemo').then(m => ({ default: m.CoachingDemo })));
const GymDemo = lazy(() => import('./GymDemo').then(m => ({ default: m.GymDemo })));
const RealEstateDemo = lazy(() => import('./RealEstateDemo').then(m => ({ default: m.RealEstateDemo })));

interface DemoViewerModalProps {
  isOpen: boolean;
  activeDemoId: DemoId;
  onClose: () => void;
  onSelectDemo: (id: DemoId) => void;
  onOrderThisWebsite: (demoId: DemoId) => void;
}

const DEMOS_LIST: {
  id: DemoId;
  name: string;
  tag: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  features: string[];
  turnaround: string;
  waMessage: string;
}[] = [
  {
    id: 'restaurant',
    name: 'Savoria Bistro',
    tag: 'Restaurant',
    category: 'Fine Dining & Food Ordering',
    icon: UtensilsCrossed,
    turnaround: '48–72h',
    features: ['Categorized Menu + Search', 'Dietary & Spice Modifiers', 'Cart Drawer + Promo NEXORA10', 'WhatsApp Payload Export', 'Table Reservation + Floor Plan', 'Live Order Timeline Tracker'],
    waMessage: "[Nexora demo - Savoria Bistro]\n\nHi Nexora! I saw your Restaurant demo (Savoria Bistro) and I'd like a similar website for my restaurant. Please contact me."
  },
  {
    id: 'clinic',
    name: 'PulseCare Clinic',
    tag: 'Healthcare',
    category: 'Doctor & Patient Appointments',
    icon: HeartPulse,
    turnaround: '48–72h',
    features: ['Doctor Directory & OPD Shifts', 'Specialty + Search Filters', 'Which Specialist? Helper', '3-Step Booking Wizard', 'Instant OPD Token Generation', 'Simulated SMS/WhatsApp Dispatch', 'My Appointments + ICS Export'],
    waMessage: "[Nexora demo - PulseCare Clinic]\n\nHi Nexora! I saw your Clinic demo (PulseCare) and I'd like a similar website for my clinic. Please contact me."
  },
  {
    id: 'hotel',
    name: 'Royal Heritage Resort',
    tag: 'Hospitality',
    category: 'Resort & Suite Booking Engine',
    icon: Hotel,
    turnaround: '3–5 Days',
    features: ['Dynamic Night Calculator', 'Seasonal Weekend Pricing', 'Interactive Lightbox Gallery', 'Virtual Amenity Checklists', 'Suite Comparison Matrix', 'Add-on Luxury Packages', 'Instant Booking Reference'],
    waMessage: "[Nexora demo - Royal Heritage Resort]\n\nHi Nexora! I saw your Hotel demo (Royal Heritage Resort) and I'd like a similar website for my hotel. Please contact me."
  },
  {
    id: 'coaching',
    name: 'Excel Academy',
    tag: 'Education',
    category: 'Coaching & Admissions Engine',
    icon: GraduationCap,
    turnaround: '48–72h',
    features: ['Modular Course & Track Finder', 'Interactive Track Fee Calculator', 'Installments & Scholarship Deduction', '10-Q Timed Mock Test Engine', 'Question Palette & Review Mode', 'Free Counselling & Demo Booking'],
    waMessage: "[Nexora demo - Excel Academy]\n\nHi Nexora! I saw your Coaching demo (Excel Academy) and I'd like a similar website for my coaching centre. Please contact me."
  },
  {
    id: 'gym',
    name: 'IronPulse Fitness',
    tag: 'Fitness',
    category: 'Gym Membership & Class Booking',
    icon: Dumbbell,
    turnaround: '48–72h',
    features: ['Membership Duration Comparator', 'Perk Checklist Matrix', '1-Day Free Trial Pass Generator', 'Instant SVG QR & Barcode Pass', 'BMI & Calorie Macro Calculator', 'Weekly Class Spot Booking', 'SVG Weight Progress Tracker'],
    waMessage: "[Nexora demo - IronPulse Fitness]\n\nHi Nexora! I saw your Gym demo (IronPulse Fitness) and I'd like a similar website for my fitness centre. Please contact me."
  },
  {
    id: 'real-estate',
    name: 'Skyline Estates',
    tag: 'Real Estate',
    category: 'Luxury Property Showcase & Site Visits',
    icon: Building2,
    turnaround: '3–5 Days',
    features: ['Multi-Filter (BHK, Budget, Furnishing, Status)', 'Grid/List View & Sorting', 'Property Shortlist + Local Storage', '3-Property Comparison Matrix', 'EMI Calculator with SVG Donut', 'Site Visit Scheduler + Free Cab Pickup', 'Interactive Locality Vector Map'],
    waMessage: "[Nexora demo - Skyline Estates]\n\nHi Nexora! I saw your Real Estate demo (Skyline Estates) and I'd like a similar website for my real estate business. Please contact me."
  },
];

const DEMO_IDS: DemoId[] = ['restaurant', 'clinic', 'hotel', 'coaching', 'gym', 'real-estate'];

function playStudioClick() {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(659.25, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.08);
    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.1);
  } catch {
    // Ignore audio permission or context restrictions
  }
}

// Skeleton fallback while demo loads
const DemoSkeleton: React.FC = () => (
  <div className="min-h-[600px] p-8 space-y-4 animate-pulse">
    <div className="h-8 w-1/3 rounded-xl bg-white/5" />
    <div className="h-4 w-2/3 rounded-lg bg-white/5" />
    <div className="h-64 rounded-2xl bg-white/5" />
    <div className="grid grid-cols-3 gap-4">
      {[1,2,3].map(i => <div key={i} className="h-32 rounded-xl bg-white/5" />)}
    </div>
  </div>
);

export const DemoViewerModal: React.FC<DemoViewerModalProps> = ({
  isOpen,
  activeDemoId,
  onClose,
  onSelectDemo,
  onOrderThisWebsite,
}) => {
  const [deviceView, setDeviceView] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [showFeatures, setShowFeatures] = useState(false);
  const trapRef = useRef<HTMLDivElement>(null);

  const activeDemo = DEMOS_LIST.find(d => d.id === activeDemoId) || DEMOS_LIST[0];
  const activeIdx = DEMO_IDS.indexOf(activeDemoId);

  const goNext = () => onSelectDemo(DEMO_IDS[(activeIdx + 1) % DEMO_IDS.length]);
  const goPrev = () => onSelectDemo(DEMO_IDS[(activeIdx - 1 + DEMO_IDS.length) % DEMO_IDS.length]);

  // Keyboard shortcuts + focus trap + scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        if (showFeatures) {
          setShowFeatures(false);
          return;
        }
        onClose();
        return;
      }

      if (e.key === 'ArrowRight') { goNext(); return; }
      if (e.key === 'ArrowLeft') { goPrev(); return; }

      // Number keys 1-6 for quick demo switching
      if (['1', '2', '3', '4', '5', '6'].includes(e.key)) {
        const numIdx = parseInt(e.key, 10) - 1;
        if (DEMO_IDS[numIdx]) {
          playStudioClick();
          onSelectDemo(DEMO_IDS[numIdx]);
          return;
        }
      }

      // Quick viewport shortcuts: D, T, M
      if (e.key.toLowerCase() === 'd') { setDeviceView('desktop'); playStudioClick(); }
      if (e.key.toLowerCase() === 't') { setDeviceView('tablet'); playStudioClick(); }
      if (e.key.toLowerCase() === 'm') { setDeviceView('mobile'); playStudioClick(); }

      // Focus trap
      if (e.key === 'Tab' && trapRef.current) {
        const focusable = trapRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      document.body.setAttribute('data-demo-modal-open', 'true');
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      document.body.removeAttribute('data-demo-modal-open');
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, activeIdx, showFeatures]);

  if (!isOpen) return null;

  const demoProps = {
    onBackToMain: onClose,
    onOrderThisWebsite: () => onOrderThisWebsite(activeDemoId),
  };

  const renderActiveDemo = () => {
    switch (activeDemoId) {
      case 'restaurant': return <RestaurantDemo {...demoProps} />;
      case 'clinic':     return <ClinicDemo {...demoProps} />;
      case 'hotel':      return <HotelDemo {...demoProps} />;
      case 'coaching':   return <CoachingDemo {...demoProps} />;
      case 'gym':        return <GymDemo {...demoProps} />;
      case 'real-estate':return <RealEstateDemo {...demoProps} />;
      default:           return <RestaurantDemo {...demoProps} />;
    }
  };

  // Device frame width classes - on mobile (< md), always 100% full-screen edge-to-edge
  const frameClass =
    deviceView === 'desktop'
      ? 'w-full h-full md:rounded-2xl overflow-y-auto md:border md:border-white/10 md:shadow-[0_20px_70px_rgba(0,0,0,0.8)]'
      : deviceView === 'tablet'
      ? 'w-full md:w-[768px] max-w-full md:my-4 md:rounded-3xl overflow-y-auto md:border-[6px] md:border-slate-700/80 md:shadow-[0_0_70px_rgba(0,0,0,0.9)] h-full md:max-h-[88vh]'
      : 'w-full md:w-[390px] max-w-full md:my-4 md:rounded-3xl overflow-y-auto md:shadow-[0_0_70px_rgba(0,0,0,0.9)] h-full md:max-h-[88vh]';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Demo: ${activeDemo.name}`}
      ref={trapRef}
      className="fixed inset-0 z-50 flex flex-col bg-[#07070D]/98 backdrop-blur-3xl h-[100dvh] max-h-[100dvh] w-full overflow-hidden overscroll-contain pt-[env(safe-area-inset-top)] md:pt-0"
    >
      {/* ============================================================ */}
      {/* TOP CONTROL BAR: Slim 52px high, uniform across phone view   */}
      {/* ============================================================ */}
      <header className="relative h-[52px] min-h-[52px] max-h-[52px] bg-[#090A14]/95 backdrop-blur-2xl border-b border-white/[0.08] px-2.5 sm:px-4 flex items-center justify-between gap-1.5 sm:gap-3 shrink-0 text-white z-30 shadow-[0_4px_30px_rgba(0,0,0,0.7)] select-none">
        
        {/* Luminous Top Accent Line */}
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-amber-400/30 via-violet-500/30 to-transparent pointer-events-none" />

        {/* ========================================================== */}
        {/* LEFT / NAVIGATION ZONE: Brand + Demo Switcher (Desktop & Mobile) */}
        {/* ========================================================== */}
        <div className="flex items-center gap-1.5 sm:gap-3 min-w-0">
          
          {/* Studio Brand Mark */}
          <div className="flex items-center gap-1.5 sm:gap-2 pr-1.5 sm:pr-3 border-r border-white/10 shrink-0">
            <div className="w-7 h-7 sm:w-6 sm:h-6 rounded-lg bg-white/5 border border-white/10 p-1 flex items-center justify-center shrink-0 shadow-sm">
              <img src="/logo.png" alt="Nexora Logo" className="w-full h-full object-contain" />
            </div>
            <span className="relative hidden xs:flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
            </span>
            <div className="hidden sm:flex items-baseline gap-1">
              <span className="font-display font-extrabold text-xs tracking-wider text-white">NEXORA</span>
              <span className="text-[9px] font-mono tracking-widest text-amber-400 font-bold uppercase">STUDIO</span>
            </div>
          </div>

          {/* MOBILE VIEW (< 640px): Tactile Demo Stepper Navigator */}
          <div className="flex sm:hidden items-center bg-white/[0.04] border border-white/10 p-0.5 rounded-xl shadow-inner min-w-0">
            <button
              onClick={() => { playStudioClick(); goPrev(); }}
              title="Previous Demo"
              aria-label="Previous demo"
              className="w-8 h-8 rounded-lg text-slate-300 hover:text-white active:scale-95 flex items-center justify-center transition-all shrink-0 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-1 px-1.5 py-0.5 min-w-0">
              <activeDemo.icon className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="text-xs font-bold text-white truncate max-w-[85px]">{activeDemo.name}</span>
              <span className="text-[11px] font-mono tabular-nums text-slate-400 shrink-0">({activeIdx + 1}/6)</span>
            </div>
            <button
              onClick={() => { playStudioClick(); goNext(); }}
              title="Next Demo"
              aria-label="Next demo"
              className="w-8 h-8 rounded-lg text-slate-300 hover:text-white active:scale-95 flex items-center justify-center transition-all shrink-0 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* DESKTOP VIEW (>= 640px): Segmented In-Bar Tabs */}
          <div className="hidden sm:flex items-center bg-white/[0.03] border border-white/[0.08] p-0.5 rounded-xl shadow-inner min-w-0">
            
            {/* Prev Arrow */}
            <button
              onClick={() => { playStudioClick(); goPrev(); }}
              title="Previous Template (←)"
              aria-label="Previous template"
              className="p-1 sm:p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 active:scale-95 transition-all cursor-pointer shrink-0"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>

            {/* Direct In-Bar Tabs */}
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-none px-0.5">
              {DEMOS_LIST.map((demo, idx) => {
                const Icon = demo.icon;
                const isActive = activeDemoId === demo.id;
                return (
                  <button
                    key={demo.id}
                    onClick={() => { playStudioClick(); onSelectDemo(demo.id); }}
                    title={`${demo.name} • ${demo.category} [Press ${idx + 1}]`}
                    aria-pressed={isActive}
                    className={`group relative text-xs px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 ${
                      isActive
                        ? 'bg-gradient-to-b from-amber-400/20 to-amber-500/[0.05] border border-amber-400/60 text-white font-bold shadow-[0_0_14px_rgba(251,191,36,0.22)]'
                        : 'text-slate-400 hover:text-white hover:bg-white/[0.06] border border-transparent'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 transition-colors ${isActive ? 'text-amber-400' : 'text-slate-400 group-hover:text-slate-200'}`} />
                    <span className="tracking-tight">{demo.tag}</span>
                    {isActive ? (
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse shadow-[0_0_6px_rgba(251,191,36,0.9)]" />
                    ) : (
                      <span className="hidden xl:inline text-[9px] font-mono opacity-40 group-hover:opacity-75">
                        {idx + 1}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Next Arrow */}
            <button
              onClick={() => { playStudioClick(); goNext(); }}
              title="Next Template (→)"
              aria-label="Next template"
              className="p-1 sm:p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 active:scale-95 transition-all cursor-pointer shrink-0"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

          </div>

        </div>

        {/* ========================================================== */}
        {/* CENTER ZONE: Device Simulator Control (In-Flow Flexbox)    */}
        {/* ========================================================== */}
        <div className="hidden md:flex items-center bg-white/[0.03] border border-white/[0.08] p-0.5 rounded-xl shadow-inner shrink-0">
          {(['desktop', 'tablet', 'mobile'] as const).map((d) => {
            const Icon = d === 'desktop' ? Monitor : d === 'tablet' ? Tablet : Smartphone;
            const label = d === 'desktop' ? 'Desktop' : d === 'tablet' ? 'Tablet' : 'Mobile';
            const isActive = deviceView === d;
            return (
              <button
                key={d}
                onClick={() => { playStudioClick(); setDeviceView(d); }}
                title={`${label} Viewport [Press ${d[0].toUpperCase()}]`}
                aria-pressed={isActive}
                className={`px-2 sm:px-2.5 py-1 sm:py-1.2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-white/15 text-white border border-white/20 shadow-sm font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.04] border border-transparent'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                <span className="hidden xl:inline">{label}</span>
              </button>
            );
          })}
        </div>

        {/* ========================================================== */}
        {/* RIGHT ZONE: Specifications, WhatsApp & Order CTA           */}
        {/* ========================================================== */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          
          {/* Features / Specifications Pill */}
          <button
            onClick={() => { playStudioClick(); setShowFeatures(f => !f); }}
            title="Inspect Template Features & Deliverables"
            aria-expanded={showFeatures}
            className={`hidden lg:flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
              showFeatures
                ? 'bg-violet-500/25 text-white border-violet-500/70 shadow-[0_0_15px_rgba(139,92,246,0.3)]'
                : 'bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border-white/10'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-violet-400" />
            <span>Features</span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-white/10 text-slate-300">
              {activeDemo.features.length}
            </span>
          </button>

          {/* WhatsApp Direct Chat */}
          <a
            href={getWhatsAppUrl(activeDemo.waMessage)}
            target="_blank"
            rel="noopener noreferrer"
            title="Discuss this template directly on WhatsApp"
            className="hidden sm:flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:border-emerald-400/60 text-xs font-semibold transition-all shadow-[0_0_15px_rgba(16,185,129,0.08)] cursor-pointer"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden xl:inline">Chat</span>
          </a>

          {/* Primary CTA: Order This Website - 40px high, min 44px tap target */}
          <button
            onClick={() => { playStudioClick(); onOrderThisWebsite(activeDemoId); }}
            className="relative overflow-hidden group/order h-10 min-h-[40px] px-3 sm:px-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:brightness-110 text-slate-950 font-extrabold text-xs uppercase tracking-wider flex items-center gap-1 sm:gap-2 shadow-[0_0_20px_rgba(251,191,36,0.35)] active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap shrink-0"
          >
            {/* Shimmer sweep animation */}
            <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-12 -translate-x-full group-hover/order:animate-shimmer-sweep pointer-events-none" />

            <Sparkles className="w-3.5 h-3.5 text-slate-950 shrink-0" />
            <span className="hidden sm:inline">Order This Website</span>
            <span className="sm:hidden">ORDER</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-950 group-hover/order:translate-x-0.5 transition-transform shrink-0" />
          </button>

          {/* Dismiss / Close Studio View - min 44px tap target */}
          <button
            onClick={onClose}
            title="Exit Demo Viewer (Esc)"
            aria-label="Exit demo viewer"
            className="group/close h-10 w-10 sm:w-auto sm:px-2.5 rounded-xl bg-white/[0.04] hover:bg-rose-500/15 text-slate-300 hover:text-rose-200 border border-white/10 hover:border-rose-500/30 transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
          >
            <X className="w-4 h-4 group-hover/close:rotate-90 transition-transform duration-200 text-slate-400 group-hover/close:text-rose-300" />
            <span className="text-xs font-semibold hidden sm:inline">Back</span>
            <kbd className="hidden lg:inline text-[9px] font-mono px-1 py-0.2 rounded bg-black/40 text-slate-500 border border-white/5">
              Esc
            </kbd>
          </button>

        </div>

      </header>

      {/* ============================================================ */}
      {/* FEATURES SPECIFICATIONS DRAWER (In-flow banner, not overlay) */}
      {/* ============================================================ */}
      {showFeatures && (
        <div className="bg-gradient-to-r from-[#0C0D1C] via-[#090A15] to-[#07070D] border-b border-white/10 px-4 sm:px-6 py-3 z-20 animate-in slide-in-from-top-2 duration-200 shadow-xl">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-aurora-amber/15 text-aurora-amber flex items-center justify-center border border-aurora-amber/30 shrink-0">
                <activeDemo.icon className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white tracking-tight">{activeDemo.name}</span>
                  <span className="text-[10px] font-mono px-2 py-0.2 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    SLA: {activeDemo.turnaround}
                  </span>
                </div>
                <p className="text-[10px] text-aurora-muted">{activeDemo.category}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              {activeDemo.features.map(f => (
                <span
                  key={f}
                  className="text-[10.5px] px-2 py-0.5 rounded-lg bg-white/[0.04] text-slate-300 border border-white/10 flex items-center gap-1"
                >
                  <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span>{f}</span>
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3 shrink-0 self-end md:self-auto">
              <a
                href={getWhatsAppUrl(activeDemo.waMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-bold text-aurora-amber hover:text-white flex items-center gap-1 transition-colors"
              >
                <span>Order on WhatsApp</span>
                <ArrowRight className="w-3 h-3" />
              </a>
              <button
                onClick={() => setShowFeatures(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                title="Dismiss"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* DEMO VIEWPORT AREA                                           */}
      {/* ============================================================ */}
      <div className="flex-1 overflow-hidden md:overflow-auto bg-[#07070D] flex justify-center items-start p-0 md:p-4">
        <div className={`w-full h-full md:h-auto overflow-y-auto overflow-x-hidden overscroll-contain transition-all duration-300 bg-[#07070D] ${frameClass}`}>

          {/* Mobile phone frame: notch + bezel - only on simulated desktop preview (>= md) */}
          {deviceView === 'mobile' && (
            <div className="hidden md:block">
              {/* Phone bezel top with notch */}
              <div className="bg-slate-800 rounded-t-[36px] px-4 pt-3 pb-2 flex items-center justify-center border-4 border-b-0 border-slate-700 sticky top-0 z-30">
                <div className="w-24 h-5 bg-slate-950 rounded-full flex items-center justify-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-slate-700" />
                  <span className="w-10 h-2 rounded-full bg-slate-700" />
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                </div>
              </div>
              {/* Simulated address bar */}
              <div className="bg-[#14162B] px-4 py-2 flex items-center justify-between border-b border-white/10 border-x-4 border-x-slate-700 sticky top-12 z-30">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-rose-500" />
                  <div className="w-2 h-2 rounded-full bg-amber-500" />
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                </div>
                <div className="bg-black/60 px-3 py-0.5 rounded-full text-[10px] text-aurora-muted font-mono flex items-center gap-1.5 border border-white/10 max-w-[200px] truncate">
                  <span className="text-emerald-400">🔒</span>
                  <span>{activeDemoId}-demo.nexora.tech</span>
                </div>
                <div className="w-6" />
              </div>
            </div>
          )}

          {/* Tablet simulated URL bar - only on desktop simulator preview */}
          {deviceView === 'tablet' && (
            <div className="hidden md:flex bg-[#14162B] px-4 py-2 items-center justify-between border-b border-white/10 sticky top-0 z-30">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              </div>
              <div className="bg-black/60 px-4 py-1 rounded-full text-[11px] text-aurora-muted font-mono flex items-center gap-2 border border-white/10 max-w-[280px] truncate">
                <span className="text-emerald-400">🔒</span>
                <span>https://{activeDemoId}-demo.nexora.tech</span>
              </div>
              <div className="w-4" />
            </div>
          )}

          {/* Demo active content */}
          <div className="relative w-full overflow-x-hidden">
            <DemoStateProvider key={activeDemoId}>
              <Suspense fallback={<DemoSkeleton />}>
                {renderActiveDemo()}
              </Suspense>
            </DemoStateProvider>
          </div>

          {/* Mobile bottom bezel - only on simulated desktop preview */}
          {deviceView === 'mobile' && (
            <div className="hidden md:flex bg-slate-800 rounded-b-[36px] px-4 pb-3 pt-2 items-center justify-center border-4 border-t-0 border-slate-700">
              <div className="w-28 h-1 bg-slate-600 rounded-full" />
            </div>
          )}
        </div>
      </div>

      {/* Keyboard hint bar - hidden on phones (< md) to avoid duplicate bottom bars */}
      <footer className="hidden md:flex bg-[#090A15]/90 border-t border-white/5 px-4 py-1.5 items-center justify-between text-[10px] text-slate-400 font-mono shrink-0">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <kbd className="bg-white/10 px-1.5 py-0.5 rounded text-[10px] text-slate-300">Esc</kbd> Exit
          </span>
          <span className="flex items-center gap-1">
            <kbd className="bg-white/10 px-1.5 py-0.5 rounded text-[10px] text-slate-300">←</kbd>
            <kbd className="bg-white/10 px-1.5 py-0.5 rounded text-[10px] text-slate-300">→</kbd> Switch Demo
          </span>
          <span className="hidden sm:flex items-center gap-1">
            <kbd className="bg-white/10 px-1.5 py-0.5 rounded text-[10px] text-slate-300">1–6</kbd> Direct Select
          </span>
          <span className="hidden md:flex items-center gap-1">
            <kbd className="bg-white/10 px-1.5 py-0.5 rounded text-[10px] text-slate-300">D</kbd>
            <kbd className="bg-white/10 px-1.5 py-0.5 rounded text-[10px] text-slate-300">T</kbd>
            <kbd className="bg-white/10 px-1.5 py-0.5 rounded text-[10px] text-slate-300">M</kbd> Viewports
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className="text-slate-400">Nexora Technologies Interactive Client Suite</span>
        </div>
      </footer>
    </div>
  );
};

export default DemoViewerModal;
