import React from 'react';
import { 
  Sparkles, 
  IndianRupee, 
  Code2, 
  Smartphone, 
  Zap, 
  Headphones, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Cpu
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Card3D } from './3d/Card3D';

export const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative bg-[#050510] border-t border-white/5 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[350px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[350px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-semibold mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Digital Craftsmanship</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Not Just Websites.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-300">
              Digital Experiences.
            </span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed">
            We bridge the gap between expensive enterprise agencies and amateur website builders. Every project is engineered to convert local visitors into customers.
          </p>
        </div>

        {/* Sophisticated Bento Grid Layout (6 Highlights) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* 1. Modern UI/UX (Bento Hero Card - spans 2 cols on lg) */}
          <div className="lg:col-span-2">
            <Card3D intensity={8} glareOpacity={0.15}>
              <div className="glass-card-3d rounded-3xl p-8 border border-white/10 hover:border-purple-500/40 transition-all duration-300 bg-gradient-to-br from-[#0c1026] via-[#090d20] to-[#070b18] relative overflow-hidden group h-full flex flex-col justify-between">
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl pointer-events-none group-hover:bg-purple-600/20 transition-all" />

                <div style={{ transform: 'translateZ(15px)' }}>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-300 flex items-center justify-center border border-purple-500/30 shadow-inner">
                      <Sparkles className="w-6 h-6 text-purple-400" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 font-mono">
                      Aesthetics First
                    </span>
                  </div>

                  <h3 className="font-display text-2xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                    Modern UI/UX Design
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed max-w-xl mb-6">
                    Bespoke agency aesthetics tailored specifically to your industry. We craft interfaces with high visual contrast, intuitive typography, fluid animations, and clear booking pathways that make your business look like an established industry leader.
                  </p>
                </div>

                {/* Visual UI Preview Element */}
                <div style={{ transform: 'translateZ(25px)' }} className="mt-auto pt-4 border-t border-white/10 grid grid-cols-3 gap-3 text-center">
                  <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                    <p className="text-white font-bold text-xs sm:text-sm">Bespoke Aesthetics</p>
                    <p className="text-[10px] text-slate-400">Zero template fatigue</p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                    <p className="text-cyan-400 font-bold text-xs sm:text-sm">Conversion Layouts</p>
                    <p className="text-[10px] text-slate-400">Engineered for leads</p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                    <p className="text-emerald-400 font-bold text-xs sm:text-sm">Dark/Light Themes</p>
                    <p className="text-[10px] text-slate-400">Tailored to your niche</p>
                  </div>
                </div>
              </div>
            </Card3D>
          </div>

          {/* 2. Affordable Pricing */}
          <div>
            <Card3D intensity={10} glareOpacity={0.16}>
              <div className="glass-card-3d rounded-3xl p-8 border border-white/10 hover:border-emerald-500/40 transition-all duration-300 bg-[#090d20] relative overflow-hidden group h-full flex flex-col justify-between">
                <div style={{ transform: 'translateZ(15px)' }}>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                      <IndianRupee className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono">
                      From ₹2,999
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-white mb-3 group-hover:text-emerald-300 transition-colors">
                    Affordable Pricing
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                    Transparent, honest pricing designed for small businesses and independent entrepreneurs. You get agency-grade digital experiences without enterprise agency retainers.
                  </p>
                </div>

                <div style={{ transform: 'translateZ(25px)' }} className="pt-4 border-t border-white/10 mt-auto flex items-center gap-2 text-xs text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Zero hidden markups or surprises</span>
                </div>
              </div>
            </Card3D>
          </div>

          {/* 3. Custom Development */}
          <div>
            <Card3D intensity={10} glareOpacity={0.16}>
              <div className="glass-card-3d rounded-3xl p-8 border border-white/10 hover:border-blue-500/40 transition-all duration-300 bg-[#090d20] relative overflow-hidden group h-full flex flex-col justify-between">
                <div style={{ transform: 'translateZ(15px)' }}>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
                      <Code2 className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 font-mono">
                      Pure Code
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                    Custom Development
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                    Handcrafted React and TypeScript applications built without bloated page builders or slow WordPress plugins. Clean, lightweight code that scales with your business.
                  </p>
                </div>

                <div style={{ transform: 'translateZ(25px)' }} className="pt-4 border-t border-white/10 mt-auto flex items-center gap-2 text-xs text-blue-300">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>100% custom codebase ownership</span>
                </div>
              </div>
            </Card3D>
          </div>

          {/* 4. Mobile-First Approach */}
          <div>
            <Card3D intensity={10} glareOpacity={0.16}>
              <div className="glass-card-3d rounded-3xl p-8 border border-white/10 hover:border-cyan-500/40 transition-all duration-300 bg-[#090d20] relative overflow-hidden group h-full flex flex-col justify-between">
                <div style={{ transform: 'translateZ(15px)' }}>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center border border-cyan-500/30">
                      <Smartphone className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-mono">
                      Responsive
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                    Mobile-First Approach
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                    Over 80% of local customers browse on mobile devices. We design specifically for touch screens, easy thumb navigation, and single-tap WhatsApp calling.
                  </p>
                </div>

                <div style={{ transform: 'translateZ(25px)' }} className="pt-4 border-t border-white/10 mt-auto flex items-center gap-2 text-xs text-cyan-300">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Tested across iPhone and Android</span>
                </div>
              </div>
            </Card3D>
          </div>

          {/* 5. Fast Performance & 6. Ongoing Support (Combined/Feature card) */}
          <div>
            <Card3D intensity={10} glareOpacity={0.16}>
              <div className="glass-card-3d rounded-3xl p-8 border border-white/10 hover:border-purple-500/40 transition-all duration-300 bg-[#090d20] relative overflow-hidden group h-full flex flex-col justify-between">
                <div style={{ transform: 'translateZ(15px)' }}>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center border border-purple-500/30">
                      <Zap className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 font-mono">
                      Speed & Support
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                    Fast Performance & Support
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                    Sub-second load times engineered for high Google search ranking, paired with direct WhatsApp communication for fast menu updates, price changes, and technical assistance.
                  </p>
                </div>

                <div style={{ transform: 'translateZ(25px)' }} className="pt-4 border-t border-white/10 mt-auto flex items-center gap-2 text-xs text-purple-300">
                  <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>90+ Lighthouse score & WhatsApp line</span>
                </div>
              </div>
            </Card3D>
          </div>

        </div>

      </div>
    </section>
  );
};
