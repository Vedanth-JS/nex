import React, { useState, useEffect } from 'react';
import { 
  Building, 
  UtensilsCrossed, 
  Stethoscope, 
  Hotel, 
  ShoppingBag, 
  GraduationCap, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  RefreshCw, 
  ShieldCheck, 
  Globe, 
  Server, 
  Search, 
  MapPin, 
  MessageCircle, 
  Info,
  ChevronLeft,
  ChevronRight,
  RotateCw,
  LayoutGrid
} from 'lucide-react';
import { MAIN_SERVICES, ADDITIONAL_SERVICES } from '../data/servicesData';

interface ServicesProps {
  onSelectService: (serviceName: string) => void;
  onOpenServiceDetail: (serviceId: string) => void;
}

const SERVICE_ICONS: Record<string, React.ElementType> = {
  business: Building,
  restaurant: UtensilsCrossed,
  clinic: Stethoscope,
  hotel: Hotel,
  ecommerce: ShoppingBag,
  education: GraduationCap,
};

const ADDITIONAL_ICONS: Record<string, React.ElementType> = {
  RefreshCw,
  ShieldCheck,
  Globe,
  Server,
  Search,
  MapPin,
  MessageCircle,
};

export const Services: React.FC<ServicesProps> = ({ 
  onSelectService, 
  onOpenServiceDetail 
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'3d-ring' | 'grid'>('3d-ring');
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);

  const totalCards = MAIN_SERVICES.length; // 6 cards
  const angleStep = 360 / totalCards; // 60 degrees

  // Auto slow rotation when idle (pauses on hover or dragging)
  useEffect(() => {
    if (!isAutoRotating || viewMode !== '3d-ring') return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalCards);
    }, 4500);
    return () => clearInterval(interval);
  }, [isAutoRotating, viewMode, totalCards]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % totalCards);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + totalCards) % totalCards);
  };

  // Drag controls
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setDragOffset(0);
    setIsAutoRotating(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const diff = e.clientX - startX;
    setDragOffset(diff);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragOffset < -50) {
      handleNext();
    } else if (dragOffset > 50) {
      handlePrev();
    }
    setDragOffset(0);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setDragOffset(0);
    setIsAutoRotating(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const diff = e.touches[0].clientX - startX;
    setDragOffset(diff);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragOffset < -40) {
      handleNext();
    } else if (dragOffset > 40) {
      handlePrev();
    }
    setDragOffset(0);
  };

  return (
    <section id="services" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-aurora-bg/95">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-aurora-violet/15 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-aurora-amber/15 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute inset-0 aurora-grid opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-aurora-surface border border-aurora-violet/40 text-aurora-amber text-xs font-semibold mb-4 shadow-[0_0_20px_rgba(124,92,255,0.25)]">
            <Sparkles className="w-3.5 h-3.5 text-aurora-amber" />
            <span>High-Impact Web Solutions</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Everything Your Business <br />
            <span className="headline-shimmer">
              Needs to Grow Online.
            </span>
          </h2>
          <p className="text-aurora-muted text-base sm:text-lg mt-4 leading-relaxed">
            Every business has distinct customer conversion pathways. We engineer websites tailored around your booking requirements, menu displays, product catalogs, and WhatsApp inquiries.
          </p>

          {/* View Toggle & Carousel Controls */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={() => setViewMode(viewMode === '3d-ring' ? 'grid' : '3d-ring')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-aurora-surface border border-white/10 hover:border-aurora-amber/50 text-xs font-bold text-aurora-text transition-all cursor-pointer shadow-md"
            >
              {viewMode === '3d-ring' ? <LayoutGrid className="w-3.5 h-3.5 text-aurora-amber" /> : <RotateCw className="w-3.5 h-3.5 text-aurora-violet" />}
              <span>{viewMode === '3d-ring' ? 'Switch to Grid View' : 'Switch to 3D Ring View'}</span>
            </button>
          </div>
        </div>

        {/* ================= 3D CAROUSEL RING VIEW ================= */}
        {viewMode === '3d-ring' && (
          <div 
            className="relative py-12 select-none"
            onMouseEnter={() => setIsAutoRotating(false)}
            onMouseLeave={() => setIsAutoRotating(true)}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* 3D Viewport Stage with clear top-down perspective */}
            <div 
              className="relative w-full min-h-[640px] sm:min-h-[680px] flex items-center justify-center overflow-visible"
              style={{ 
                perspective: '1500px',
                perspectiveOrigin: '50% 28%'
              }}
            >
              {/* Carousel Ring with subtle top-down angle */}
              <div 
                className="relative w-[320px] sm:w-[390px] h-[520px] sm:h-[540px] transition-transform duration-700 ease-out"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: `rotateX(5deg) rotateY(${-activeIndex * angleStep + (dragOffset * 0.15)}deg)`,
                }}
              >
                {MAIN_SERVICES.map((srv, idx) => {
                  const Icon = SERVICE_ICONS[srv.id] || Building;
                  const cardAngle = idx * angleStep;
                  const isActive = activeIndex === idx;

                  // Radius for 6 cards
                  const radius = typeof window !== 'undefined' && window.innerWidth < 640 ? 320 : 420;

                  return (
                    <div
                      key={srv.id}
                      onClick={() => {
                        if (!isActive) setActiveIndex(idx);
                      }}
                      className={`absolute inset-0 rounded-3xl p-6 sm:p-7 border transition-all duration-500 cursor-pointer flex flex-col justify-between ${
                        isActive
                          ? 'border-aurora-amber/70 bg-aurora-elevated shadow-[0_25px_60px_rgba(255,181,71,0.28)] opacity-100 scale-100 z-30 ring-1 ring-aurora-amber/40'
                          : 'border-white/10 bg-aurora-surface/90 backdrop-blur-md opacity-40 hover:opacity-75 scale-95 shadow-xl'
                      }`}
                      style={{
                        transformStyle: 'preserve-3d',
                        transform: `rotateY(${cardAngle}deg) translateZ(${radius}px)`,
                        backfaceVisibility: 'hidden',
                      }}
                    >
                      {/* Top Bar with Number & Badge */}
                      <div className="flex items-center justify-between mb-3 shrink-0">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-md transition-all ${
                          isActive 
                            ? 'bg-aurora-amber text-[#07070D] shadow-[0_0_20px_rgba(255,181,71,0.5)]' 
                            : 'bg-white/5 border border-white/15 text-aurora-violet'
                        }`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono text-aurora-muted">{srv.number}</span>
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                            isActive
                              ? 'bg-aurora-amber/20 text-aurora-amber border-aurora-amber/40'
                              : 'bg-aurora-violet/20 text-aurora-violet border-aurora-violet/30'
                          }`}>
                            {srv.badge}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 flex flex-col justify-center">
                        <h3 className="font-display text-lg sm:text-xl font-bold text-white mb-1">
                          {srv.title}
                        </h3>
                        <p className="text-[11px] font-semibold text-aurora-violet uppercase tracking-wider mb-2">
                          {srv.subtitle}
                        </p>
                        <p className="text-aurora-muted text-xs leading-relaxed mb-3 line-clamp-3">
                          {srv.description}
                        </p>

                        {/* Features List */}
                        <ul className="space-y-1.5 border-t border-white/10 pt-3">
                          {srv.features.slice(0, 3).map((feature, i) => (
                            <li key={i} className="text-xs text-aurora-text flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-aurora-amber shrink-0 mt-0.5" />
                              <span className="truncate">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Actions */}
                      <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/10 mt-3 shrink-0">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenServiceDetail(srv.id);
                          }}
                          className="py-2.5 rounded-xl btn-glass-secondary text-xs font-bold flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <Info className="w-3.5 h-3.5 text-aurora-amber" />
                          <span>Explore</span>
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectService(srv.title);
                          }}
                          className="py-2.5 rounded-xl btn-amber-cta text-xs font-bold flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <span>Get Quote</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>

            {/* Navigation Arrows & Dot Indicators */}
            <div className="flex items-center justify-center gap-6 mt-10 sm:mt-12">
              <button
                onClick={handlePrev}
                aria-label="Previous Service"
                className="w-11 h-11 rounded-full bg-aurora-surface border border-white/15 hover:border-aurora-amber/60 text-white flex items-center justify-center transition-all hover:scale-110 shadow-lg cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5 text-aurora-amber" />
              </button>

              <div className="flex items-center gap-2">
                {MAIN_SERVICES.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    onClick={() => setActiveIndex(dotIdx)}
                    aria-label={`Go to service ${dotIdx + 1}`}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      activeIndex === dotIdx 
                        ? 'w-7 bg-aurora-amber shadow-[0_0_12px_rgba(255,181,71,0.6)]' 
                        : 'w-2 bg-white/20 hover:bg-white/40'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                aria-label="Next Service"
                className="w-11 h-11 rounded-full bg-aurora-surface border border-white/15 hover:border-aurora-amber/60 text-white flex items-center justify-center transition-all hover:scale-110 shadow-lg cursor-pointer"
              >
                <ChevronRight className="w-5 h-5 text-aurora-amber" />
              </button>
            </div>
            
            <p className="text-center text-[11px] text-aurora-muted mt-3 font-mono">
              Drag or use arrows to spin the 3D service ring • Click any card to face front
            </p>
          </div>
        )}

        {/* ================= EXPANDED 6 PRIMARY SERVICES GRID ================= */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {MAIN_SERVICES.map((srv) => {
              const Icon = SERVICE_ICONS[srv.id] || Building;
              return (
                <div
                  key={srv.id}
                  className="rounded-3xl p-8 border border-white/10 hover:border-aurora-amber/50 transition-all duration-300 flex flex-col justify-between group h-full relative overflow-hidden bg-aurora-surface/90 shadow-xl hover:-translate-y-1"
                >
                  {/* Background Corner Glow */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-aurora-violet/20 via-aurora-magenta/15 to-transparent rounded-bl-full pointer-events-none transition-all group-hover:scale-150 group-hover:opacity-100 opacity-40" />

                  <div>
                    {/* Top Bar with Number & Badge */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-13 h-13 p-3.5 rounded-2xl bg-white/5 border border-white/15 flex items-center justify-center text-aurora-violet group-hover:bg-gradient-to-tr group-hover:from-aurora-violet group-hover:to-aurora-amber group-hover:text-[#07070D] transition-all shadow-md">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-aurora-muted">{srv.number}</span>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-aurora-violet/20 text-aurora-amber border border-aurora-violet/30">
                          {srv.badge}
                        </span>
                      </div>
                    </div>

                    <h3 className="font-display text-xl font-bold text-white group-hover:text-aurora-amber transition-colors">
                      {srv.title}
                    </h3>
                    <p className="text-xs font-semibold text-aurora-violet uppercase tracking-wider mt-1 mb-3">
                      {srv.subtitle}
                    </p>
                    <p className="text-aurora-muted text-xs sm:text-sm leading-relaxed mb-6">
                      {srv.description}
                    </p>

                    {/* Features List */}
                    <ul className="space-y-2.5 mb-8 border-t border-white/10 pt-5">
                      {srv.features.map((feature, i) => (
                        <li key={i} className="text-xs text-aurora-text flex items-start gap-2.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-aurora-amber shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Card Actions */}
                  <div className="grid grid-cols-2 gap-2.5 pt-4 border-t border-white/10 mt-auto">
                    <button
                      onClick={() => onOpenServiceDetail(srv.id)}
                      className="py-3 rounded-xl btn-glass-secondary text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Info className="w-3.5 h-3.5 text-aurora-amber" />
                      <span>Explore</span>
                    </button>

                    <button
                      onClick={() => onSelectService(srv.title)}
                      className="py-3 rounded-xl btn-amber-cta text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Get a Quote</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        )}

        {/* Additional Services Bar */}
        <div className="glass-card-3d rounded-3xl p-8 sm:p-10 border border-white/10 bg-aurora-surface/90 shadow-2xl mt-12">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-aurora-amber">Complete Digital Ecosystem</span>
            <h3 className="font-display text-2xl font-bold text-white mt-1">
              Essential Add-On Services For 360° Online Growth
            </h3>
            <p className="text-xs sm:text-sm text-aurora-muted mt-1">
              From hosting and domain assistance to Google Business Profile verification, we handle the entire tech setup.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {ADDITIONAL_SERVICES.map((add, idx) => {
              const AddIcon = ADDITIONAL_ICONS[add.icon] || Sparkles;
              return (
                <div 
                  key={idx}
                  className="bg-aurora-elevated/80 hover:bg-aurora-elevated border border-white/10 hover:border-aurora-amber/40 rounded-2xl p-4 transition-all hover:scale-[1.02] shadow-sm"
                >
                  <div className="w-9 h-9 rounded-xl bg-aurora-violet/20 text-aurora-amber flex items-center justify-center mb-3 shadow-inner">
                    <AddIcon className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">{add.title}</h4>
                  <p className="text-[11px] text-aurora-muted leading-relaxed">{add.description}</p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Services;
