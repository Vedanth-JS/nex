import React from 'react';
import { 
  UtensilsCrossed, 
  Stethoscope, 
  Building2, 
  GraduationCap, 
  Dumbbell, 
  Sparkles, 
  Home, 
  ShoppingBag, 
  Compass, 
  Wrench, 
  PartyPopper, 
  Briefcase,
  ArrowRight,
  Eye,
  Check
} from 'lucide-react';
import { INDUSTRIES_DATA } from '../data/industriesData';
import { Card3D } from './3d/Card3D';
import { DemoId } from '../types';

interface IndustriesProps {
  onOpenDemo: (id: DemoId) => void;
  onSelectIndustry: (industryName: string) => void;
}

const INDUSTRY_ICONS: Record<string, React.ElementType> = {
  UtensilsCrossed,
  Stethoscope,
  Building2,
  GraduationCap,
  Dumbbell,
  Sparkles,
  Home,
  ShoppingBag,
  Compass,
  Wrench,
  PartyPopper,
  Briefcase,
};

const IndustryImage: React.FC<{
  src: string;
  name: string;
  gradient: string;
  icon: React.ElementType;
}> = ({ src, name, gradient, icon: Icon }) => {
  const [hasError, setHasError] = React.useState(false);
  const [isLoaded, setIsLoaded] = React.useState(false);

  return (
    <div className={`relative h-44 overflow-hidden bg-gradient-to-br ${gradient} bg-[#0A0C16]`}>
      {/* Background Graphic Watermark if image is loading or failed */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
        <Icon className="w-28 h-28 text-white/30 transform -rotate-12 translate-x-4 translate-y-2" />
      </div>

      {/* Shimmer Placeholder while loading */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse" />
      )}

      {/* Actual Image - only rendered if not errored to prevent browser broken alt text overlay */}
      {!hasError && (
        <img 
          src={src} 
          alt="" 
          aria-label={name}
          loading="lazy"
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-[0.7] ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`} 
        />
      )}

      {/* Subtle vignette shadow overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-aurora-surface via-aurora-surface/30 to-transparent" />
    </div>
  );
};

export const Industries: React.FC<IndustriesProps> = ({ onOpenDemo, onSelectIndustry }) => {
  return (
    <section id="industries" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-aurora-bg/95 overflow-hidden border-t border-white/5">
      {/* Background Ambience & Aurora Grid */}
      <div className="absolute inset-0 aurora-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-aurora-violet/15 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-aurora-surface border border-aurora-violet/40 text-aurora-amber text-xs font-semibold mb-4 shadow-[0_0_20px_rgba(124,92,255,0.25)]">
            <Compass className="w-3.5 h-3.5 text-aurora-amber" />
            <span>Tailored for 12+ Diverse Business Niches</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Industries We Serve Across <br />
            <span className="headline-shimmer">
              India’s Thriving Business Landscape
            </span>
          </h2>
          <p className="text-aurora-muted text-base sm:text-lg mt-4 leading-relaxed">
            Whether you run a clinic needing appointment bookings, a restaurant requiring instant WhatsApp menus, or a boutique retail store—we have proven blueprints ready to launch.
          </p>
        </div>

        {/* 12 Industries Grid with Photography & 3D Tilt */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {INDUSTRIES_DATA.map((ind) => {
            const Icon = INDUSTRY_ICONS[ind.icon] || Sparkles;
            return (
              <Card3D key={ind.id} intensity={12} glareOpacity={0.16}>
                <div
                  className="glass-card-3d rounded-2xl overflow-hidden border border-white/10 hover:border-aurora-amber/40 transition-all duration-300 flex flex-col justify-between group h-full bg-aurora-surface/90 relative shadow-xl hover:-translate-y-1"
                >
                  {/* High Quality Photography Header with Web Preview & Error Fallback */}
                  <div className="relative">
                    <IndustryImage 
                      src={ind.image} 
                      name={ind.name}
                      gradient={ind.gradient}
                      icon={Icon}
                    />
                    
                    {/* Top Icon & Tag */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                      <div className="w-9 h-9 rounded-xl bg-black/70 backdrop-blur-md border border-white/15 flex items-center justify-center text-aurora-amber shadow-md">
                        <Icon className="w-4 h-4" />
                      </div>
                      {ind.demoId && (
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-aurora-violet/25 text-aurora-amber border border-aurora-violet/40 backdrop-blur-md">
                          Demo concept
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-2.5 left-3 right-3 pointer-events-none">
                      <h3 className="font-display text-base font-bold text-white group-hover:text-aurora-amber transition-colors">
                        {ind.name}
                      </h3>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-xs text-aurora-violet font-medium mb-2">
                        {ind.tagline}
                      </p>
                      <p className="text-aurora-muted text-xs leading-relaxed mb-4">
                        {ind.description}
                      </p>

                      {/* Key Features Pill list */}
                      <div className="space-y-1.5 mb-5 pt-3 border-t border-white/10">
                        {ind.features.map((f, i) => (
                          <div key={i} className="flex items-center gap-2 text-[11px] text-aurora-text">
                            <Check className="w-3 h-3 text-aurora-amber shrink-0" />
                            <span>{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Actions */}
                    <div className="pt-3 border-t border-white/10 flex flex-col gap-2 mt-auto">
                      {ind.demoId && (
                        <button
                          onClick={() => onOpenDemo(ind.demoId!)}
                          className="w-full py-2 rounded-xl btn-glass-secondary text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5 text-aurora-amber" />
                          <span>View Demo</span>
                        </button>
                      )}
                      <button
                        onClick={() => onSelectIndustry(ind.name)}
                        className="w-full py-2.5 rounded-xl btn-amber-cta text-[11px] uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>GET A WEBSITE FOR YOUR BUSINESS</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>

                </div>
              </Card3D>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Industries;
