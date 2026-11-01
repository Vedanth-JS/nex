import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  Eye, 
  ExternalLink, 
  Play, 
  Pause, 
  ArrowUp, 
  ArrowRight,
  Monitor,
  Laptop,
  CheckCircle2,
  UtensilsCrossed,
  Stethoscope,
  Building2,
  GraduationCap,
  Dumbbell,
  Home,
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
    badge: 'Michelin Aesthetic',
    gradient: 'from-amber-500/20 to-orange-500/10'
  },
  {
    id: 'm2',
    demoId: 'clinic',
    title: 'PulseCare Medical Center',
    category: 'Hospital & Clinic',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80',
    badge: 'NABH Trusted',
    gradient: 'from-cyan-500/20 to-blue-500/10'
  },
  {
    id: 'm3',
    demoId: 'hotel',
    title: 'The Grand Oberoi Palace',
    category: 'Luxury Resort & Villas',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    badge: '5-Star Heritage',
    gradient: 'from-emerald-500/20 to-teal-500/10'
  },
  {
    id: 'm4',
    demoId: 'gym',
    title: 'IronCore Elite Fitness',
    category: 'Gym & Crossfit Studio',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
    badge: 'High Energy',
    gradient: 'from-rose-500/20 to-red-500/10'
  },
  {
    id: 'm5',
    demoId: 'real-estate',
    title: 'Urban Boutique Store',
    category: 'Retail & E-commerce',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
    badge: 'Fast Checkout',
    gradient: 'from-purple-500/20 to-indigo-500/10'
  }
];

const ROW_TWO_CARDS: MarqueeCardItem[] = [
  {
    id: 'm6',
    demoId: 'coaching',
    title: 'DreamIAS Apex Academy',
    category: 'Educational Institute',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80',
    badge: 'Topper Rankers',
    gradient: 'from-indigo-500/20 to-purple-500/10'
  },
  {
    id: 'm7',
    demoId: 'real-estate',
    title: 'Aura Prime Living',
    category: 'Real Estate Developer',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    badge: 'RERA Certified',
    gradient: 'from-blue-500/20 to-cyan-500/10'
  },
  {
    id: 'm8',
    demoId: 'restaurant',
    title: 'Noir Japanese & Sushi',
    category: 'Japanese Izakaya',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80',
    badge: 'Digital Menu',
    gradient: 'from-amber-600/20 to-yellow-500/10'
  },
  {
    id: 'm9',
    demoId: 'clinic',
    title: 'Apex Dental Care & Smiles',
    category: 'Dental Specialty Care',
    image: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=800&q=80',
    badge: 'Slot Booking',
    gradient: 'from-cyan-600/20 to-sky-500/10'
  },
  {
    id: 'm10',
    demoId: 'hotel',
    title: 'Whispering Palms Resort',
    category: 'Boutique Homestay',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    badge: 'Zero Commission',
    gradient: 'from-teal-500/20 to-emerald-500/10'
  }
];

interface InspectorPreset {
  id: DemoId;
  name: string;
  category: string;
  url: string;
  image: string;
  features: string[];
  icon: React.ElementType;
}

const INSPECTOR_PRESETS: InspectorPreset[] = [
  {
    id: 'restaurant',
    name: 'Savoria Fine Dining',
    category: 'Restaurant & Cafe',
    url: 'https://savoria-bistro.nexora.tech',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    features: ['Categorized Food Menu with Prices', 'Real Table Reservation Form', 'Instant WhatsApp Ordering', 'Indiranagar Location Map'],
    icon: UtensilsCrossed
  },
  {
    id: 'clinic',
    name: 'PulseCare Multi-Specialty Clinic',
    category: 'Healthcare & Hospital',
    url: 'https://pulsecare-clinic.nexora.tech',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80',
    features: ['Doctor Profiles with Qualifications', 'OPD Timings & Department Filters', 'Online Appointment Booking', 'Emergency 24/7 Hotline'],
    icon: Stethoscope
  },
  {
    id: 'hotel',
    name: 'The Grand Oberoi Palace & Resort',
    category: 'Hotel & Luxury Resort',
    url: 'https://oberoi-palace.nexora.tech',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    features: ['Pool Villa & Royal Suite Showcases', 'Check-In/Out Tariff Calculator', 'Direct Booking Form (0% Commission)', 'Concierge WhatsApp Desk'],
    icon: Building2
  },
  {
    id: 'coaching',
    name: 'DreamIAS Apex Career Academy',
    category: 'Educational Institute & EdTech',
    url: 'https://dreamias.nexora.tech',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80',
    features: ['Course Fee & Batch Schedules', '1-Click Examination Syllabus Download', 'Toppers Hall of Fame Testimonials', 'Free Mentorship Call Booking'],
    icon: GraduationCap
  },
  {
    id: 'gym',
    name: 'IronCore Elite Fitness & Crossfit',
    category: 'Fitness Studio & Gym',
    url: 'https://ironcore-gym.nexora.tech',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
    features: ['Membership Tiers (₹1,999 onwards)', 'Trainer Bios & Specialized Programs', 'Instant 1-Day Free VIP Pass Generator', 'Daily Class Schedule Timetable'],
    icon: Dumbbell
  },
  {
    id: 'real-estate',
    name: 'Aura Prime Living & Estates',
    category: 'Real Estate Developer',
    url: 'https://aura-prime.nexora.tech',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    features: ['2BHK / 3BHK / Villa Listings', 'Carpet Area & RERA Badges', 'Complimentary Cab Site Visit Booking', 'WhatsApp Floor Plan Brochure'],
    icon: Home
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
    <section className="py-24 relative overflow-hidden bg-[#04060e] border-y border-white/10">
      {/* 3D Cyber Grid in background */}
      <div className="cyber-grid-3d opacity-60" />
      
      {/* Ambient Glows */}
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[400px] bg-purple-600/15 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[400px] bg-cyan-500/15 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-16 text-center">
        
        {/* Section Header Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/40 text-purple-300 text-xs font-semibold mb-4 shadow-[0_0_25px_rgba(139,92,246,0.3)]">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin-slow" />
          <span>Interactive 3D Motion Gallery</span>
        </div>

        <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Websites in Motion •{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-300">
            3D Scrolling Showcase
          </span>
        </h2>

        <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-3xl mx-auto">
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
                className="w-72 sm:w-84 shrink-0 glass-card-3d rounded-2xl overflow-hidden border border-white/15 hover:border-purple-500/60 transition-all duration-300 group cursor-pointer hover:scale-105 shadow-[0_20px_40px_rgba(0,0,0,0.8)] bg-[#090d1e]/90"
              >
                {/* Simulated Browser Bar */}
                <div className="bg-[#0e1428] px-3 py-2 border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 truncate max-w-[130px]">
                    {card.title.toLowerCase().replace(/\s+/g, '')}.com
                  </span>
                  <ExternalLink className="w-3 h-3 text-cyan-400" />
                </div>

                {/* Screenshot with auto-scroll on hover */}
                <div className="relative h-44 overflow-hidden">
                  <img 
                    src={card.image} 
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-[0.75]" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090d1e] via-transparent to-transparent" />
                  
                  <span className="absolute top-2.5 left-2.5 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-black/80 text-cyan-300 border border-white/10 backdrop-blur-md">
                    {card.badge}
                  </span>
                </div>

                <div className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-semibold text-purple-400 uppercase tracking-wider">
                      {card.category}
                    </p>
                    <h4 className="font-display text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {card.title}
                    </h4>
                  </div>
                  <span className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 group-hover:bg-purple-600 group-hover:text-white transition-all">
                    <Eye className="w-4 h-4 text-cyan-400 group-hover:text-white" />
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
                className="w-72 sm:w-84 shrink-0 glass-card-3d rounded-2xl overflow-hidden border border-white/15 hover:border-cyan-500/60 transition-all duration-300 group cursor-pointer hover:scale-105 shadow-[0_20px_40px_rgba(0,0,0,0.8)] bg-[#090d1e]/90"
              >
                {/* Simulated Browser Bar */}
                <div className="bg-[#0e1428] px-3 py-2 border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 truncate max-w-[130px]">
                    {card.title.toLowerCase().replace(/\s+/g, '')}.com
                  </span>
                  <ExternalLink className="w-3 h-3 text-purple-400" />
                </div>

                {/* Screenshot with zoom */}
                <div className="relative h-44 overflow-hidden">
                  <img 
                    src={card.image} 
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-[0.75]" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090d1e] via-transparent to-transparent" />
                  
                  <span className="absolute top-2.5 left-2.5 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-black/80 text-purple-300 border border-white/10 backdrop-blur-md">
                    {card.badge}
                  </span>
                </div>

                <div className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-semibold text-cyan-400 uppercase tracking-wider">
                      {card.category}
                    </p>
                    <h4 className="font-display text-sm font-bold text-white group-hover:text-purple-300 transition-colors">
                      {card.title}
                    </h4>
                  </div>
                  <span className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all">
                    <Eye className="w-4 h-4 text-purple-400 group-hover:text-slate-950" />
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Interactive 3D Screen Inspector Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card-3d rounded-3xl border border-white/20 p-6 sm:p-10 bg-[#070b1c]/95 shadow-[0_30px_70px_rgba(0,0,0,0.9)]">
          
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-8 border-b border-white/10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
                Real-Time Website Scroll Inspector
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
                Inspect Real Page Flow & Layout
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
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
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all border ${
                      isSelected
                        ? 'gradient-button text-white border-transparent shadow-[0_0_15px_rgba(139,92,246,0.4)]'
                        : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/10'
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
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
                  {selectedPreset.category}
                </span>
                <h4 className="font-display text-2xl font-bold text-white mt-1">
                  {selectedPreset.name}
                </h4>
                <div className="flex items-center gap-2 mt-2 font-mono text-xs text-slate-400 bg-black/40 px-3 py-1.5 rounded-lg border border-white/10 w-fit">
                  <span className="text-emerald-400">🔒</span>
                  <span>{selectedPreset.url}</span>
                </div>
              </div>

              {/* Key Features included in this template */}
              <div className="space-y-2.5 pt-2">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Key Page Components:
                </p>
                {selectedPreset.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Scroll Controls */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setIsAutoScrolling(!isAutoScrolling)}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors border border-white/15"
                >
                  {isAutoScrolling ? <Pause className="w-4 h-4 text-amber-400" /> : <Play className="w-4 h-4 text-emerald-400" />}
                  <span>{isAutoScrolling ? 'Pause Motion' : 'Resume Auto-Scroll'}</span>
                </button>

                <button
                  onClick={handleScrollToTop}
                  className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white font-semibold text-xs transition-colors border border-white/10"
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
                  className="py-3 rounded-xl bg-purple-600/30 hover:bg-purple-600 text-purple-200 hover:text-white text-xs font-bold flex items-center justify-center gap-1.5 border border-purple-500/40 transition-all shadow-md"
                >
                  <Eye className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Open Full Demo</span>
                </button>

                <button
                  onClick={() => onOrderThisWebsite(selectedPreset.id)}
                  className="py-3 rounded-xl gradient-button text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-lg shadow-purple-600/30"
                >
                  <span>Build This Site</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right Screen Device Preview with Smooth Vertical Image Pan */}
            <div className="lg:col-span-7">
              <div className="relative mx-auto max-w-lg rounded-2xl sm:rounded-3xl border-4 border-slate-700 bg-slate-900 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(139,92,246,0.3)] overflow-hidden">
                
                {/* Browser top controls */}
                <div className="bg-[#1e293b] px-4 py-2.5 flex items-center justify-between border-b border-slate-700">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  </div>
                  <div className="bg-[#0f172a] px-3 py-1 rounded-full text-[11px] font-mono text-slate-300 flex items-center gap-2 border border-slate-700/60 max-w-[200px] truncate">
                    <span className="text-emerald-400">🔒</span>
                    <span className="truncate">{selectedPreset.url}</span>
                  </div>
                  <span className="text-[10px] text-cyan-400 bg-cyan-500/10 px-1.5 py-0.5 rounded font-mono">
                    {Math.round(scrollProgress)}% Scrolled
                  </span>
                </div>

                {/* Simulated Screen Body with Smooth Vertical Pan */}
                <div 
                  ref={scrollContainerRef}
                  className="relative h-[340px] sm:h-[400px] overflow-hidden bg-black"
                >
                  <img
                    src={selectedPreset.image}
                    alt={selectedPreset.name}
                    style={{
                      transform: `translateY(-${scrollProgress}%)`,
                      transition: 'transform 0.1s linear',
                    }}
                    className="w-full object-cover will-change-transform"
                  />

                  {/* Gradient bottom overlay indicator */}
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/80 to-transparent pointer-events-none flex items-end justify-center pb-2">
                    <span className="text-[10px] text-slate-400 bg-black/60 backdrop-blur-sm px-3 py-0.5 rounded-full border border-white/10">
                      Scroll Simulation Active
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
