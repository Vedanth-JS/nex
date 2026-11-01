import React from 'react';
import { 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  Info, 
  Clock, 
  Zap,
  PhoneCall
} from 'lucide-react';
import { PRICING_PLANS, PRICING_DISCLAIMERS } from '../data/pricingData';
import { Card3D } from './3d/Card3D';

interface PricingProps {
  onSelectPlan: (planName: string) => void;
  onOpenConsultation: () => void;
}

export const Pricing: React.FC<PricingProps> = ({ onSelectPlan, onOpenConsultation }) => {
  return (
    <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-[#070b18]">
      {/* 3D Cyber Grid in background */}
      <div className="cyber-grid-3d opacity-60" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-4 shadow-[0_0_20px_rgba(34,211,238,0.25)]">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>Honest, Transparent Starting Prices</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Professional Websites.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-300">
              Affordable Packages.
            </span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-2xl mx-auto">
            High-converting websites engineered to fit your budget. Simple, straightforward packages with zero hidden markups.
          </p>
          <div className="mt-6 flex justify-center">
            <button
              onClick={onOpenConsultation}
              className="px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-cyan-300 border border-cyan-500/30 text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-sm hover:scale-105"
            >
              <span>Compare All Package Features</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 3 Pricing Cards Grid with 3D Tilt */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16 items-stretch">
          {PRICING_PLANS.map((plan) => (
            <Card3D 
              key={plan.id} 
              intensity={plan.isPopular ? 14 : 10} 
              glareOpacity={plan.isPopular ? 0.22 : 0.15}
            >
              <div
                className={`glass-card-3d rounded-3xl p-8 border transition-all duration-300 flex flex-col justify-between relative h-full ${
                  plan.isPopular
                    ? 'border-purple-500 shadow-[0_25px_60px_rgba(139,92,246,0.35)] bg-gradient-to-b from-[#121636] to-[#0a0f26]'
                    : 'border-white/10 hover:border-purple-500/40 bg-[#090d1c]/90'
                }`}
              >
                {/* Most popular badge with 3D Popout */}
                {plan.badge && (
                  <div 
                    style={{ transform: 'translateZ(35px)' }}
                    className={`absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg ${
                      plan.isPopular
                        ? 'gradient-button text-white shadow-purple-600/40'
                        : 'bg-white/10 text-slate-300 border border-white/15'
                    }`}
                  >
                    {plan.badge}
                  </div>
                )}

                <div style={{ transform: 'translateZ(15px)' }}>
                  <h3 className="font-display text-2xl font-bold text-white mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-slate-400 text-xs leading-relaxed mb-6">
                    {plan.tagline}
                  </p>

                  {/* Price Display with 3D depth */}
                  <div className="mb-6 pb-6 border-b border-white/10">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs text-slate-400 font-medium">Starts from</span>
                      <span className="text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]">
                        {plan.startingPrice}
                      </span>
                    </div>
                    <p className="text-[11px] text-cyan-400 font-medium mt-1">
                      {plan.priceNote}
                    </p>
                  </div>

                  {/* Delivery & Ideal for */}
                  <div className="space-y-2 mb-6 text-xs text-slate-300 bg-white/5 p-3.5 rounded-xl border border-white/5 shadow-inner">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                      <span><strong>Delivery:</strong> {plan.deliveryTime}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span><strong>Ideal for:</strong> {plan.idealFor}</span>
                    </div>
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-3 mb-8">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      What's Included:
                    </p>
                    {plan.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Package CTA with 3D Popout */}
                <div style={{ transform: 'translateZ(30px)' }} className="mt-auto">
                  <button
                    onClick={() => onSelectPlan(plan.packageType)}
                    className={`w-full py-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-xl ${
                      plan.isPopular
                        ? 'gradient-button text-white shadow-purple-600/40 hover:brightness-110'
                        : 'bg-white/10 hover:bg-white/20 text-white border border-white/10'
                    }`}
                  >
                    <span>{plan.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </Card3D>
          ))}
        </div>

        {/* Pricing Transparency & Disclaimers */}
        <div className="glass-card-3d rounded-2xl p-6 sm:p-8 border border-white/10 bg-[#060914] max-w-4xl mx-auto mb-14">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-white mb-2">
                Transparent Pricing Policy & Scope Guidelines
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-400">
                {PRICING_DISCLAIMERS.map((disc, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-cyan-400 font-bold">•</span>
                    <span>{disc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Custom Requirements Banner */}
        <div className="glass-card-3d rounded-3xl p-8 sm:p-10 border border-purple-500/40 bg-gradient-to-r from-purple-950/40 via-[#0B1020] to-cyan-950/40 text-center max-w-3xl mx-auto shadow-[0_20px_50px_rgba(139,92,246,0.2)]">
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3">
            Need something customized? Let's discuss your requirements.
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6 max-w-xl mx-auto">
            Have specialized booking rules, e-commerce catalog requirements, or specific design preferences? We engineer custom solutions tailored to your unique operational flow.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => {
                const contactEl = document.getElementById('contact');
                if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 rounded-xl gradient-button text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-xl shadow-purple-600/40 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <span>GET A FREE QUOTE</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenConsultation}
              className="px-6 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 border border-white/10 transition-all cursor-pointer"
            >
              <PhoneCall className="w-4 h-4 text-cyan-400" />
              <span>Book 10-Min Call</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
