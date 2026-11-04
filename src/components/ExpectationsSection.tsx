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
      tagline: 'Direct Developer Access',
      description: 'No frustrating corporate middle-management or technical jargon. Speak directly with your designer and developer over phone or WhatsApp throughout the project.',
      guarantee: 'Real-time updates via WhatsApp',
      gradient: 'from-aurora-violet/25 to-aurora-magenta/10'
    },
    {
      icon: IndianRupee,
      title: 'Transparent Pricing',
      tagline: 'No Hidden Retainers or Markups',
      description: 'Upfront, honest pricing starting at ₹2,999. Every included feature, third-party cost (domains/hosting), and milestone is documented before starting.',
      guarantee: 'Detailed itemized quote upfront',
      gradient: 'from-aurora-amber/25 to-aurora-magenta/10'
    },
    {
      icon: Palette,
      title: 'Custom Design',
      tagline: 'Crafted Around Your Business Identity',
      description: 'We do not sell cookie-cutter site builder templates. Every layout, color palette, digital menu, or booking form is tailored to your brand and customers.',
      guarantee: '100% bespoke layout & styling',
      gradient: 'from-aurora-magenta/25 to-aurora-amber/10'
    },
    {
      icon: Rocket,
      title: 'Reliable Delivery',
      tagline: 'Fast Turnaround (2 to 7 Days)',
      description: 'We respect your time. Starter websites launch in 2 to 4 business days. Growth packages launch within a week. Tested, polished, and ready to generate leads.',
      guarantee: 'On-schedule launch commitment',
      gradient: 'from-aurora-violet/25 to-aurora-amber/10'
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative bg-aurora-bg/95 border-t border-white/5 overflow-hidden">
      {/* Background Ambience & Grid */}
      <div className="absolute inset-0 aurora-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[300px] bg-aurora-violet/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-aurora-surface border border-aurora-violet/40 text-aurora-amber text-xs font-semibold mb-4 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-aurora-amber" />
            <span>Our Service Standard</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            What You Can Expect <br />
            <span className="headline-shimmer">
              From Nexora Technologies
            </span>
          </h2>

          <p className="text-aurora-muted text-base sm:text-lg mt-4 leading-relaxed">
            We hold ourselves to high development standards. Here is the unwavering service commitment we bring to every business we partner with.
          </p>
        </div>

        {/* 4 Pillars Grid with 3D Depth */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Card3D key={idx} intensity={12} glareOpacity={0.16}>
                <div className="glass-card-3d rounded-3xl p-7 border border-white/10 hover:border-aurora-amber/40 transition-all duration-300 flex flex-col justify-between h-full bg-aurora-surface/90 relative overflow-hidden group shadow-xl">
                  <div style={{ transform: 'translateZ(15px)' }}>
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/15 flex items-center justify-center text-aurora-amber group-hover:bg-aurora-amber group-hover:text-[#07070D] transition-all mb-5 shadow-inner">
                      <Icon className="w-6 h-6" />
                    </div>

                    <span className="text-[10px] font-bold uppercase tracking-wider text-aurora-violet font-mono">
                      {item.tagline}
                    </span>

                    <h3 className="font-display text-lg font-bold text-white mt-1 mb-2.5 group-hover:text-aurora-amber transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-aurora-muted text-xs leading-relaxed mb-6">
                      {item.description}
                    </p>
                  </div>

                  {/* Guarantee Pill */}
                  <div style={{ transform: 'translateZ(25px)' }} className="pt-4 border-t border-white/10 mt-auto flex items-center gap-2 text-[11px] text-aurora-text">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="font-medium">{item.guarantee}</span>
                  </div>
                </div>
              </Card3D>
            );
          })}
        </div>

        {/* Transparent Placeholder Notice & Bottom CTA */}
        <div className="glass-card-3d rounded-2xl p-6 sm:p-8 border border-white/10 bg-aurora-surface/90 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="text-left">
            <p className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-aurora-amber" />
              <span>Transparency First</span>
            </p>
            <p className="text-xs text-aurora-muted mt-1">
              We never fabricate client counts or fake testimonials. All demonstration projects are real working prototypes built by our engineering team to demonstrate real capabilities.
            </p>
          </div>

          <button
            onClick={onStartProject}
            className="w-full sm:w-auto px-6 py-3 rounded-xl btn-amber-cta text-xs uppercase tracking-wider shrink-0 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Start Your Project</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
};

export default ExpectationsSection;
