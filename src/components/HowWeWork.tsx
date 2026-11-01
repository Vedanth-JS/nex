import React from 'react';
import { 
  Compass, 
  Layers, 
  Code2, 
  Rocket, 
  Headphones, 
  Check, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { WORK_PROCESS_STEPS } from '../data/processData';

const STEP_ICONS: Record<string, React.ElementType> = {
  Compass,
  Layers,
  Code2,
  Rocket,
  Headphones,
};

export const HowWeWork: React.FC = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative bg-[#070b18] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-4">
            <Rocket className="w-3.5 h-3.5 text-cyan-400" />
            <span>Smooth 5-Step Execution Workflow</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            How We Work With You From <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-300">
              Concept to Live Deployment
            </span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed">
            A frictionless, transparent process designed to get your website up and generating leads in days, not months.
          </p>
        </div>

        {/* 5 Process Steps Horizontal / Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 relative">
          {WORK_PROCESS_STEPS.map((item, idx) => {
            const Icon = STEP_ICONS[item.icon] || Sparkles;
            return (
              <div
                key={item.step}
                className="glass-card rounded-2xl p-6 border border-white/10 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group hover:shadow-xl hover:shadow-cyan-950/20 bg-[#090e22]/90 relative"
              >
                <div>
                  {/* Step Number with Gradient */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-display font-black text-2xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                      {item.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all shadow-sm">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-display text-base font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[11px] font-semibold text-purple-400 uppercase tracking-wider mb-2.5">
                    {item.tagline}
                  </p>
                  <p className="text-slate-400 text-xs leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                {/* Deliverables list */}
                <div className="pt-3 border-t border-white/5 space-y-1.5 mt-auto">
                  {item.deliverables.map((deliv, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-[10px] text-slate-300">
                      <Check className="w-3 h-3 text-cyan-400 shrink-0" />
                      <span>{deliv}</span>
                    </div>
                  ))}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
