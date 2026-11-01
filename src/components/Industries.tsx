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

export const Industries: React.FC<IndustriesProps> = ({ onOpenDemo, onSelectIndustry }) => {
  return (
    <section id="industries" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-[#070a16] overflow-hidden">
      {/* Ambience */}
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-4 shadow-[0_0_20px_rgba(34,211,238,0.2)]">
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            <span>Tailored for 12+ Diverse Business Niches</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Industries We Serve Across <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-300">
              India’s Thriving Business Landscape
            </span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed">
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
                  className="glass-card-3d rounded-2xl overflow-hidden border border-white/10 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group h-full bg-[#0a0f20]/95 relative"
                >
                  {/* High Quality Photography Header with Miniature Web Preview */}
                  <div className="relative h-44 overflow-hidden bg-black/60">
                    <img 
                      src={ind.image} 
                      alt={ind.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-[0.7]" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f20] via-[#0a0f20]/30 to-transparent" />
                    
                    {/* Top Icon & Tag */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <div className="w-9 h-9 rounded-xl bg-black/70 backdrop-blur-md border border-white/15 flex items-center justify-center text-cyan-400 shadow-md">
                        <Icon className="w-4 h-4" />
                      </div>
                      {ind.demoId && (
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 backdrop-blur-md">
                          Live Demo
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-2.5 left-3 right-3">
                      <h3 className="font-display text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {ind.name}
                      </h3>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-xs text-purple-300 font-medium mb-2">
                        {ind.tagline}
                      </p>
                      <p className="text-slate-400 text-xs leading-relaxed mb-4">
                        {ind.description}
                      </p>

                      {/* Key Features Pill list */}
                      <div className="space-y-1.5 mb-5 pt-3 border-t border-white/10">
                        {ind.features.map((f, i) => (
                          <div key={i} className="flex items-center gap-2 text-[11px] text-slate-300">
                            <Check className="w-3 h-3 text-cyan-400 shrink-0" />
                            <span>{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Actions with exact CTA from requirements */}
                    <div className="pt-3 border-t border-white/10 flex flex-col gap-2 mt-auto">
                      {ind.demoId && (
                        <button
                          onClick={() => onOpenDemo(ind.demoId!)}
                          className="w-full py-2 rounded-xl bg-white/5 hover:bg-white/15 text-slate-200 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 border border-white/10 transition-colors cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5 text-cyan-400" />
                          <span>View Live Demo</span>
                        </button>
                      )}
                      <button
                        onClick={() => onSelectIndustry(ind.name)}
                        className="w-full py-2.5 rounded-xl gradient-button text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
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
