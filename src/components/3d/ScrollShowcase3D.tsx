import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  Eye, 
  ExternalLink, 
  Play, 
  Pause, 
  ArrowUp, 
  ArrowRight,
  CheckCircle2,
  UtensilsCrossed,
  Stethoscope,
  Building2,
  GraduationCap,
  Dumbbell,
  ShoppingBag
} from 'lucide-react';
import { DemoId } from '../../types';

interface ScrollShowcase3DProps {
  onOpenDemo: (id: DemoId) => void;
  onOrderThisWebsite: (id: DemoId) => void;
}

interface MarqueeCardItem {
  id: string;
  demoId: DemoId;
  title: string;
  category: string;
  image: string;
  badge: string;
  gradient: string;
}

const ROW_ONE_CARDS: MarqueeCardItem[] = [
  {
    id: 'm1',
    demoId: 'restaurant',
    title: 'Savoria Fine Dining',
    category: 'Restaurant & Bistro',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    badge: 'DEMO CONCEPT • MICHELIN',
    gradient: 'from-aurora-amber/25 to-aurora-magenta/15'
  },
  {
    id: 'm2',
    demoId: 'clinic',
    title: 'PulseCare Medical Center',
    category: 'Hospital & Clinic',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80',
    badge: 'DEMO CONCEPT • HEALTHCARE',
    gradient: 'from-aurora-violet/25 to-aurora-magenta/15'
  },
  {
    id: 'm3',
    demoId: 'hotel',
    title: 'The Grand Oberoi Palace',
    category: 'Luxury Resort & Villas',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    badge: 'DEMO CONCEPT • 5-STAR',
    gradient: 'from-aurora-magenta/25 to-aurora-amber/15'
  },
  {
    id: 'm4',
    demoId: 'gym',
    title: 'IronCore Elite Fitness',
    category: 'Gym & Crossfit Studio',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
    badge: 'DEMO CONCEPT • FITNESS',
    gradient: 'from-aurora-amber/25 to-aurora-violet/15'
  },
  {
    id: 'm5',
    demoId: 'real-estate',
    title: 'Urban Boutique Store',
    category: 'Retail & E-commerce',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
    badge: 'DEMO CONCEPT • COMMERCE',
    gradient: 'from-aurora-violet/25 to-aurora-amber/15'
  }
];

const ROW_TWO_CARDS: MarqueeCardItem[] = [
  {
    id: 'm6',
    demoId: 'coaching',
    title: 'DreamIAS Apex Academy',
    category: 'Educational Institute',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80',
    badge: 'DEMO CONCEPT • ACADEMY',
    gradient: 'from-aurora-violet/25 to-aurora-magenta/15'
  },
  {
    id: 'm7',
    demoId: 'real-estate',
    title: 'Aura Prime Living',
    category: 'Real Estate Developer',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    badge: 'DEMO CONCEPT • REALTY',
    gradient: 'from-aurora-amber/25 to-aurora-magenta/15'
  },
  {
    id: 'm8',
    demoId: 'hotel',
    title: 'Serene Valley Retreat',
    category: 'Eco Resort & Spa',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
    badge: 'DEMO CONCEPT • HOSPITALITY',
    gradient: 'from-aurora-magenta/25 to-aurora-violet/15'
  },
  {
    id: 'm9',
    demoId: 'clinic',
    title: 'AuraSmile Dental Spa',
    category: 'Cosmetic Dentistry',
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80',
    badge: 'DEMO CONCEPT • CLINIC',
    gradient: 'from-aurora-violet/25 to-aurora-amber/15'
  },
  {
    id: 'm10',
    demoId: 'restaurant',
    title: 'Komorebi Japanese Robata',
    category: 'Sushi & Grill Bar',
    image: 'https://images.unsplash.com/photo-1579027989536-b7b1f875659b?auto=format&fit=crop&w=800&q=80',
    badge: 'DEMO CONCEPT • GOURMET',
    gradient: 'from-aurora-amber/25 to-aurora-violet/15'
  }
];

interface InspectorPreset {
  id: DemoId;
  name: string;
  category: string;
  url: string;
  image: string;
  icon: typeof UtensilsCrossed;
  features: string[];
}

const INSPECTOR_PRESETS: InspectorPreset[] = [
  {
    id: 'restaurant',
    name: 'Savoria Fine Dining',
    category: 'Restaurant & Bistro',
    url: 'savoria.nexora.tech',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    icon: UtensilsCrossed,
    features: ['Chef Specials Grid', 'Table Reservation Engine', 'Downloadable PDF Menu', 'Instant WhatsApp Orders']
  },
  {
    id: 'clinic',
    name: 'PulseCare Medical Center',
    category: 'Hospital & Clinic',
    url: 'pulsecare.nexora.tech',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80',
    icon: Stethoscope,
    features: ['Specialist Doctors Directory', 'Instant OPD Booking', 'Emergency 1-Tap Call', 'Patient Health Reviews']
  },
  {
    id: 'hotel',
    name: 'The Grand Oberoi Palace',
    category: 'Luxury Resort & Villas',
    url: 'oberoipalace.nexora.tech',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    icon: Building2,
    features: ['360° Villa Virtual Tour', 'Live Direct Booking Engine', 'Amenities Showcase', 'No-OTA Fee Guarantee']
  },
  {
    id: 'coaching',
    name: 'DreamIAS Apex Academy',
    category: 'Educational Institute',
    url: 'dreamias.nexora.tech',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80',
    icon: GraduationCap,
    features: ['Course Syllabus Downloader', 'Faculty Credentials', 'Free Demo Class Form', 'Topper Result Hall']
  },
  {
    id: 'gym',
    name: 'IronCore Elite Fitness',
    category: 'Gym & Crossfit Studio',
    url: 'ironcore.nexora.tech',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
    icon: Dumbbell,
    features: ['Trainer Schedule Calendar', 'Membership Tier Calculator', 'Free Trial Pass Generator', 'Transformation Gallery']
  },
  {
    id: 'real-estate',
    name: 'Urban Boutique Store',
    category: 'E-commerce & Retail',
    url: 'urbanboutique.nexora.tech',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
    icon: ShoppingBag,
    features: ['Product Card Micro-interactions', 'Fast Checkout Drawer', 'WhatsApp Order Flow', 'Direct Payment Integration']
  }
];

export const ScrollShowcase3D: React.FC<ScrollShowcase3DProps> = ({ 
  onOpenDemo, 
  onOrderThisWebsite 
}) => {
  const [selectedPreset, setSelectedPreset] = useState<InspectorPreset>(INSPECTOR_PRESETS[0]);
  const [isAutoScrolling, setIsAutoScrolling] = useState<boolean>(true);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scrolling simulation inside the device inspector
  useEffect(() => {
    if (!isAutoScrolling) return;

    const interval = setInterval(() => {
      setScrollProgress((prev) => {
        if (prev >= 65) return 0;
        return prev + 0.35;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isAutoScrolling]);

  const handleScrollToTop = () => {
    setScrollProgress(0);
  };

  return (
    <section className="py-24 relative overflow-hidden bg-aurora-bg/90 border-y border-white/10">
      {/* Aurora perspective grid in background */}
      <div className="absolute inset-0 aurora-grid opacity-30 pointer-events-none" />
      
      {/* Ambient Glows */}
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[400px] bg-aurora-violet/15 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[400px] bg-aurora-amber/15 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-16 text-center">
        
        {/* Section Header Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-aurora-surface border border-aurora-violet/40 text-aurora-amber text-xs font-semibold mb-4 shadow-[0_0_25px_rgba(124,92,255,0.25)]">
          <Sparkles className="w-3.5 h-3.5 text-aurora-amber animate-spin" />
          <span>Interactive 3D Motion Gallery</span>
        </div>

        <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Websites in Motion •{' '}
          <span className="headline-shimmer">
            3D Scrolling Showcase
          </span>
        </h2>

        <p className="text-aurora-muted text-base sm:text-lg mt-4 leading-relaxed max-w-3xl mx-auto">
          Explore our responsive web designs gliding in continuous 3D perspective. Hover over any card to pause, or inspect live scrolling simulations below.
        </p>

      </div>

      {/* 3D Perspective Marquee Ribbons Stage */}
      <div className="perspective-ribbon-container w-full overflow-hidden mb-24 py-4">
        <div className="perspective-ribbon space-y-6">
          
          {/* Row 1: Scrolling Left */}
          <div className="flex animate-marquee-left gap-6 group/row1">
            {[...ROW_ONE_CARDS, ...ROW_ONE_CARDS, ...ROW_ONE_CARDS].map((card, idx) => (
              <div
                key={`${card.id}-${idx}`}
                onClick={() => onOpenDemo(card.demoId)}
                className="w-72 sm:w-84 shrink-0 glass-card-3d rounded-2xl overflow-hidden border border-white/15 hover:border-aurora-amber/60 transition-all duration-300 group cursor-pointer hover:scale-105 shadow-[0_20px_40px_rgba(0,0,0,0.8)] bg-aurora-surface/90"
              >
                {/* Simulated Browser Bar */}
                <div className="bg-aurora-elevated px-3 py-2 border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-[10px] font-mono text-aurora-muted truncate max-w-[130px]">
                    {card.title.toLowerCase().replace(/\s+/g, '')}.com
                  </span>
                  <ExternalLink className="w-3 h-3 text-aurora-amber" />
                </div>

                {/* Screenshot with auto-scroll on hover */}
                <div className="relative h-44 overflow-hidden bg-gradient-to-br from-aurora-violet/20 to-aurora-surface bg-[#0A0C16]">
                  <img 
                    src={card.image} 
                    alt=""
                    aria-label={card.title}
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-[0.75]" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07070D] via-transparent to-transparent pointer-events-none" />
                  
                  <span className="absolute top-2.5 left-2.5 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-black/80 text-aurora-amber border border-aurora-amber/30 backdrop-blur-md">
                    {card.badge}
                  </span>
                </div>

                <div className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-semibold text-aurora-violet uppercase tracking-wider">
                      {card.category}
                    </p>
                    <h4 className="font-display text-sm font-bold text-white group-hover:text-aurora-amber transition-colors">
                      {card.title}
                    </h4>
                  </div>
                  <span className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-aurora-muted group-hover:bg-aurora-amber group-hover:text-[#07070D] transition-all">
                    <Eye className="w-4 h-4 text-aurora-amber group-hover:text-[#07070D]" />
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Row 2: Scrolling Right */}
          <div className="flex animate-marquee-right gap-6 group/row2">
            {[...ROW_TWO_CARDS, ...ROW_TWO_CARDS, ...ROW_TWO_CARDS].map((card, idx) => (
              <div
                key={`${card.id}-${idx}`}
                onClick={() => onOpenDemo(card.demoId)}
                className="w-72 sm:w-84 shrink-0 glass-card-3d rounded-2xl overflow-hidden border border-white/15 hover:border-aurora-magenta/60 transition-all duration-300 group cursor-pointer hover:scale-105 shadow-[0_20px_40px_rgba(0,0,0,0.8)] bg-aurora-surface/90"
              >
                {/* Simulated Browser Bar */}
                <div className="bg-aurora-elevated px-3 py-2 border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-[10px] font-mono text-aurora-muted truncate max-w-[130px]">
                    {card.title.toLowerCase().replace(/\s+/g, '')}.com
                  </span>
                  <ExternalLink className="w-3 h-3 text-aurora-magenta" />
                </div>

                {/* Screenshot with zoom */}
                <div className="relative h-44 overflow-hidden bg-gradient-to-br from-aurora-magenta/20 to-aurora-surface bg-[#0A0C16]">
                  <img 
                    src={card.image} 
                    alt=""
                    aria-label={card.title}
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-[0.75]" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07070D] via-transparent to-transparent pointer-events-none" />
                  
                  <span className="absolute top-2.5 left-2.5 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-black/80 text-aurora-magenta border border-aurora-magenta/30 backdrop-blur-md">
                    {card.badge}
                  </span>
                </div>

                <div className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-semibold text-aurora-magenta uppercase tracking-wider">
                      {card.category}
                    </p>
                    <h4 className="font-display text-sm font-bold text-white group-hover:text-aurora-amber transition-colors">
                      {card.title}
                    </h4>
                  </div>
                  <span className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-aurora-muted group-hover:bg-aurora-magenta group-hover:text-white transition-all">
                    <Eye className="w-4 h-4 text-aurora-magenta group-hover:text-white" />
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Interactive 3D Screen Inspector Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card-3d rounded-3xl border border-white/20 p-6 sm:p-10 bg-aurora-surface/95 shadow-[0_30px_70px_rgba(0,0,0,0.9)]">
          
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-8 border-b border-white/10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-aurora-amber font-mono">
                Real-Time Website Scroll Inspector
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
                Inspect Real Page Flow & Layout
              </h3>
              <p className="text-xs sm:text-sm text-aurora-muted mt-1">
                Select a business niche to watch the website page scroll in motion inside the 3D viewport.
              </p>
            </div>

            {/* Presets Switcher */}
            <div className="flex flex-wrap gap-2">
              {INSPECTOR_PRESETS.map((preset) => {
                const Icon = preset.icon;
                const isSelected = selectedPreset.id === preset.id;
                return (
                  <button
                    key={preset.id}
                    onClick={() => {
                      setSelectedPreset(preset);
                      setScrollProgress(0);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all border cursor-pointer ${
                      isSelected
                        ? 'btn-amber-cta border-transparent'
                        : 'bg-white/5 hover:bg-white/10 text-aurora-muted hover:text-white border-white/10'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{preset.name.split(' ')[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Inspector Main Stage */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8">
            
            {/* Left Details & Controls */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-aurora-violet">
                  {selectedPreset.category}
                </span>
                <h4 className="font-display text-2xl font-bold text-white mt-1">
                  {selectedPreset.name}
                </h4>
                <div className="flex items-center gap-2 mt-2 font-mono text-xs text-aurora-muted bg-black/40 px-3 py-1.5 rounded-lg border border-white/10 w-fit">
                  <span className="text-emerald-400">🔒</span>
                  <span>{selectedPreset.url}</span>
                </div>
              </div>

              {/* Key Features included in this template */}
              <div className="space-y-2.5 pt-2">
                <p className="text-xs font-bold uppercase tracking-wider text-aurora-text">
                  Key Page Components:
                </p>
                {selectedPreset.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-aurora-muted">
                    <CheckCircle2 className="w-4 h-4 text-aurora-amber shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Scroll Controls */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setIsAutoScrolling(!isAutoScrolling)}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors border border-white/15 cursor-pointer"
                >
                  {isAutoScrolling ? <Pause className="w-4 h-4 text-aurora-amber" /> : <Play className="w-4 h-4 text-emerald-400" />}
                  <span>{isAutoScrolling ? 'Pause Motion' : 'Resume Auto-Scroll'}</span>
                </button>

                <button
                  onClick={handleScrollToTop}
                  className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-aurora-muted hover:text-white font-semibold text-xs transition-colors border border-white/10 cursor-pointer"
                  title="Reset to Top"
                >
                  <ArrowUp className="w-4 h-4" />
                  <span>Top</span>
                </button>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => onOpenDemo(selectedPreset.id)}
                  className="py-3 rounded-xl btn-glass-secondary text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-aurora-amber" />
                  <span>Open Full Demo</span>
                </button>

                <button
                  onClick={() => onOrderThisWebsite(selectedPreset.id)}
                  className="py-3 rounded-xl btn-amber-cta text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Build This Site</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right Screen Device Preview with Smooth Vertical Image Pan */}
            <div className="lg:col-span-7">
              <div className="relative mx-auto max-w-lg rounded-2xl sm:rounded-3xl border border-aurora-violet/40 bg-aurora-elevated shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(124,92,255,0.25)] overflow-hidden">
                
                {/* Browser top controls */}
                <div className="bg-aurora-surface px-4 py-2.5 flex items-center justify-between border-b border-white/10">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  </div>
                  <div className="bg-black/50 px-3 py-1 rounded-full text-[11px] font-mono text-aurora-muted flex items-center gap-2 border border-white/10 max-w-[200px] truncate">
                    <span className="text-emerald-400">🔒</span>
                    <span className="truncate">{selectedPreset.url}</span>
                  </div>
                  <span className="text-[10px] text-aurora-amber bg-aurora-amber/15 px-2 py-0.5 rounded font-mono font-bold">
                    {Math.round(scrollProgress)}% Scrolled
                  </span>
                </div>

                {/* Simulated Screen Body with Smooth Vertical Pan */}
                <div 
                  ref={scrollContainerRef}
                  className="relative h-[340px] sm:h-[400px] overflow-hidden bg-gradient-to-br from-aurora-violet/20 to-[#0A0C16] bg-black"
                >
                  <img
                    src={selectedPreset.image}
                    alt=""
                    aria-label={selectedPreset.name}
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                    style={{
                      transform: `translateY(-${scrollProgress}%)`,
                      transition: 'transform 0.1s linear',
                    }}
                    className="w-full object-cover will-change-transform"
                  />

                  {/* Gradient bottom overlay indicator */}
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/80 to-transparent pointer-events-none flex items-end justify-center pb-2">
                    <span className="text-[10px] text-aurora-muted bg-black/60 backdrop-blur-sm px-3 py-0.5 rounded-full border border-white/10">
                      Demo Concept Simulation
                    </span>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default ScrollShowcase3D;
