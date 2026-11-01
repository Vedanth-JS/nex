import React from 'react';
import { 
  IndianRupee, 
  Sparkles, 
  Smartphone, 
  Zap, 
  MessageSquare, 
  SlidersHorizontal, 
  SearchCheck, 
  ShieldCheck, 
  CheckCircle2,
  Award
} from 'lucide-react';
import { WHY_CHOOSE_ITEMS } from '../data/processData';

const ICONS_MAP: Record<string, React.ElementType> = {
  IndianRupee,
  Sparkles,
  Smartphone,
  Zap,
  MessageSquare,
  SlidersHorizontal,
  SearchCheck,
  ShieldCheck,
};

export const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative bg-[#050510] border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-semibold mb-4">
            <Award className="w-3.5 h-3.5 text-cyan-400" />
            <span>The Nexora Advantage</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Why Local Businesses Choose <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-300">
              Nexora Technologies
            </span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed">
            We bridge the gap between expensive enterprise agencies and low-quality amateur templates. You get premium digital craftsmanship at pricing that makes business sense.
          </p>
        </div>

        {/* 8 Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_CHOOSE_ITEMS.map((item) => {
            const Icon = ICONS_MAP[item.icon] || Sparkles;
            return (
              <div
                key={item.id}
                className="glass-card rounded-2xl p-6 border border-white/10 hover:border-purple-500/40 transition-all duration-300 flex flex-col justify-between group hover:shadow-xl hover:shadow-purple-950/20 bg-[#090d1c]/80"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-all mb-4 shadow-md">
                    <Icon className="w-6 h-6" />
                  </div>
                  
                  <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 font-mono">
                    {item.highlight}
                  </span>
                  
                  <h3 className="font-display text-lg font-bold text-white mt-1 mb-2 group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>
                  
                  <p className="text-slate-400 text-xs leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-white/5 flex items-center gap-1.5 text-[11px] text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Guaranteed quality standard</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
