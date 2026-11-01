import React from 'react';
import { 
  MessageSquareCheck, 
  IndianRupee, 
  Palette, 
  Rocket, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Card3D } from './3d/Card3D';

interface ExpectationsSectionProps {
  onStartProject: () => void;
}

export const ExpectationsSection: React.FC<ExpectationsSectionProps> = ({ onStartProject }) => {
  const pillars = [
    {
      icon: MessageSquareCheck,
      title: 'Clear Communication',
      tagline: 'Direct Founder & Dev Access',
      description: 'No frustrating corporate middle-management or technical jargon. Speak directly with your designer and developer over phone or WhatsApp throughout the project.',
      guarantee: 'Real-time updates via WhatsApp',
      gradient: 'from-purple-500/20 to-blue-500/10'
    },
    {
      icon: IndianRupee,
      title: 'Transparent Pricing',
      tagline: 'No Hidden Retainers or Markups',
      description: 'Upfront, honest pricing starting at ₹2,999. Every included feature, third-party cost (domains/hosting), and milestone is documented before starting.',
      guarantee: 'Detailed itemized quote upfront',
      gradient: 'from-cyan-500/20 to-teal-500/10'
    },
    {
      icon: Palette,
      title: 'Custom Design',
      tagline: 'Crafted Around Your Business Identity',
      description: 'We do not sell cookie-cutter site builder templates. Every layout, color palette, digital menu, or booking form is tailored to your brand and customers.',
      guarantee: '100% bespoke layout & styling',
      gradient: 'from-amber-500/20 to-orange-500/10'
    },
    {
      icon: Rocket,
      title: 'Reliable Delivery',
      tagline: 'Fast Turnaround (2 to 7 Days)',
      description: 'We respect your time. Starter websites launch in 2 to 4 business days. Growth packages launch within a week. Tested, polished, and ready to generate leads.',
      guarantee: 'On-schedule launch commitment',
      gradient: 'from-rose-500/20 to-pink-500/10'
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative bg-[#050510] border-t border-white/5 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[300px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-4 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>Our Service Standard</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            What You Can Expect <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-300">
              From Nexora Technologies
            </span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed">
            We hold ourselves to high international development standards. Here is the unwavering service commitment we bring to every business we partner with.
          </p>
        </div>

        {/* 4 Pillars Grid with 3D Depth */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Card3D key={idx} intensity={12} glareOpacity={0.16}>
                <div className="glass-card-3d rounded-3xl p-7 border border-white/10 hover:border-purple-500/40 transition-all duration-300 flex flex-col justify-between h-full bg-[#090d1e]/90 relative overflow-hidden group">
                  <div style={{ transform: 'translateZ(15px)' }}>
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/15 flex items-center justify-center text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-all mb-5 shadow-inner">
                      <Icon className="w-6 h-6" />
                    </div>

                    <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 font-mono">
                      {item.tagline}
                    </span>

                    <h3 className="font-display text-lg font-bold text-white mt-1 mb-2.5 group-hover:text-cyan-300 transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-slate-400 text-xs leading-relaxed mb-6">
                      {item.description}
                    </p>
                  </div>

                  {/* Guarantee Pill */}
                  <div style={{ transform: 'translateZ(25px)' }} className="pt-4 border-t border-white/10 mt-auto flex items-center gap-2 text-[11px] text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="font-medium">{item.guarantee}</span>
                  </div>
                </div>
              </Card3D>
            );
          })}
        </div>

        {/* Transparent Placeholder Notice & Bottom CTA */}
        <div className="glass-card-3d rounded-2xl p-6 sm:p-8 border border-white/10 bg-[#070b18] max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <p className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>Transparency First</span>
            </p>
            <p className="text-xs text-slate-400 mt-1">
              We never fabricate client counts or fake testimonials. All demonstration projects are real working prototypes built by our engineering team to demonstrate real capabilities.
            </p>
          </div>

          <button
            onClick={onStartProject}
            className="w-full sm:w-auto px-6 py-3 rounded-xl gradient-button text-white font-bold text-xs uppercase tracking-wider shrink-0 flex items-center justify-center gap-2 shadow-lg shadow-purple-600/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <span>Start Your Project</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
