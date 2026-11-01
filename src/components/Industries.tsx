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
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-4 shadow-[0_0_20px_rgba(34,211,238,0.25)]">
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

        {/* 12 Industries Grid with 3D Tilt */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {INDUSTRIES_DATA.map((ind) => {
            const Icon = INDUSTRY_ICONS[ind.icon] || Sparkles;
            return (
              <Card3D key={ind.id} intensity={14} glareOpacity={0.18}>
                <div
                  className="glass-card-3d rounded-2xl p-6 border border-white/10 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group h-full bg-[#0a0f20]/90 relative overflow-hidden"
                >
                  <div style={{ transform: 'translateZ(15px)' }}>
                    {/* Top Bar */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/15 flex items-center justify-center text-cyan-400 group-hover:bg-gradient-to-tr group-hover:from-cyan-500 group-hover:to-blue-600 group-hover:text-white transition-all shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                        <Icon className="w-5 h-5" />
                      </div>
                      {ind.demoId && (
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          Live Demo
                        </span>
                      )}
                    </div>

                    <h3 className="font-display text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {ind.name}
                    </h3>
                    <p className="text-xs text-purple-300 font-medium mt-0.5 mb-2.5">
                      {ind.tagline}
                    </p>
                    <p className="text-slate-400 text-xs leading-relaxed mb-4">
                      {ind.description}
                    </p>

                    {/* Key Features Pill list */}
                    <div className="space-y-1.5 mb-6 pt-3 border-t border-white/10">
                      {ind.features.map((f, i) => (
                        <div key={i} className="flex items-center gap-2 text-[11px] text-slate-300">
                          <Check className="w-3 h-3 text-cyan-400 shrink-0" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Actions with 3D Popout */}
                  <div style={{ transform: 'translateZ(25px)' }} className="pt-3 border-t border-white/10 flex items-center gap-2 mt-auto">
                    {ind.demoId ? (
                      <button
                        onClick={() => onOpenDemo(ind.demoId!)}
                        className="flex-1 py-2 rounded-xl bg-white/5 hover:bg-white/15 text-slate-200 hover:text-white text-xs font-semibold flex items-center justify-center gap-1 border border-white/10 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Preview</span>
                      </button>
                    ) : null}
                    <button
                      onClick={() => onSelectIndustry(ind.name)}
                      className="flex-1 py-2 rounded-xl gradient-button text-white text-xs font-bold flex items-center justify-center gap-1 shadow-sm"
                    >
                      <span>Get Website</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
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
