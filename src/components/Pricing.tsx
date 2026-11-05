import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  Info, 
  Clock, 
  Zap,
  PhoneCall,
  Box,
  Diamond,
  Gem
} from 'lucide-react';
import { PRICING_PLANS, PRICING_DISCLAIMERS } from '../data/pricingData';
import { Card3D } from './3d/Card3D';
import { scrollToSection } from '../utils/scroll';

interface PricingProps {
  onSelectPlan: (planName: string) => void;
  onOpenConsultation: () => void;
}

// 3D Crystal Component: Cube (Starter), Octahedron (Growth), Icosahedron (Professional)
const Crystal3D: React.FC<{ type: 'cube' | 'octahedron' | 'icosahedron'; isHovered: boolean; accentColor: string }> = ({ 
  type, 
  isHovered, 
  accentColor 
}) => {
  return (
    <div className="relative w-16 h-16 mx-auto mb-4 flex items-center justify-center select-none" style={{ perspective: 600 }}>
      {/* 3D Rotating Crystal Rig */}
      <div 
        className={`w-12 h-12 relative flex items-center justify-center transition-all duration-300 ${
          isHovered ? 'scale-125' : 'scale-100'
        }`}
        style={{
          transformStyle: 'preserve-3d',
          animation: `spin3d ${isHovered ? '2s' : '7s'} linear infinite`,
        }}
      >
        {type === 'cube' && (
          <div className="relative w-10 h-10 flex items-center justify-center">
            {/* 3D Cube Faces */}
            <div className="absolute inset-0 border border-aurora-violet bg-aurora-violet/20 backdrop-blur-sm shadow-[0_0_15px_rgba(124,92,255,0.4)] rounded-lg transform -rotate-12" />
            <div className="absolute inset-0 border border-aurora-violet/60 bg-aurora-violet/10 rounded-lg transform rotate-45" />
            <Box className="w-7 h-7 text-aurora-violet relative z-10 drop-shadow-[0_0_10px_rgba(124,92,255,0.8)]" />
          </div>
        )}

        {type === 'octahedron' && (
          <div className="relative w-12 h-12 flex items-center justify-center">
            {/* 3D Octahedron Diamond Faces */}
            <div className="absolute inset-0 border-2 border-aurora-amber bg-aurora-amber/25 backdrop-blur-sm shadow-[0_0_25px_rgba(255,181,71,0.6)] rounded-xl transform rotate-45" />
            <div className="absolute inset-1 border border-white/60 bg-white/10 rounded-lg transform -rotate-12" />
            <Diamond className="w-8 h-8 text-aurora-amber relative z-10 drop-shadow-[0_0_15px_rgba(255,181,71,1)]" />
          </div>
        )}

        {type === 'icosahedron' && (
          <div className="relative w-12 h-12 flex items-center justify-center">
            {/* 3D Icosahedron Gem Faces */}
            <div className="absolute inset-0 border border-aurora-magenta bg-aurora-magenta/20 backdrop-blur-sm shadow-[0_0_20px_rgba(225,75,255,0.5)] rounded-2xl transform rotate-12" />
            <div className="absolute inset-0 border border-aurora-violet/60 bg-aurora-violet/10 rounded-2xl transform -rotate-45" />
            <Gem className="w-7 h-7 text-aurora-magenta relative z-10 drop-shadow-[0_0_12px_rgba(225,75,255,0.8)]" />
          </div>
        )}
      </div>

      {/* Crystal Glow Pulse */}
      <div 
        className="absolute inset-2 rounded-full blur-xl pointer-events-none transition-opacity duration-300"
        style={{
          background: accentColor,
          opacity: isHovered ? 0.6 : 0.25,
        }}
      />
    </div>
  );
};

export const Pricing: React.FC<PricingProps> = ({ onSelectPlan, onOpenConsultation }) => {
  const [hoveredPlanId, setHoveredPlanId] = useState<string | null>(null);

  const crystalMap: Record<string, { type: 'cube' | 'octahedron' | 'icosahedron'; accent: string }> = {
    starter: { type: 'cube', accent: '#7C5CFF' },
    growth: { type: 'octahedron', accent: '#FFB547' },
    professional: { type: 'icosahedron', accent: '#E14BFF' }
  };

  return (
    <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-aurora-bg/95">
      {/* Aurora Grid & Background Ambient Glow */}
      <div className="absolute inset-0 aurora-grid opacity-25 pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-aurora-violet/15 via-aurora-magenta/10 to-aurora-amber/15 rounded-full blur-[150px] pointer-events-none -z-10" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-aurora-surface border border-aurora-violet/40 text-aurora-amber text-xs font-semibold mb-4 shadow-[0_0_20px_rgba(124,92,255,0.25)]">
            <Zap className="w-3.5 h-3.5 text-aurora-amber" />
            <span>Honest, Transparent Starting Prices</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Professional Websites.{' '}
            <span className="headline-shimmer">
              Affordable Packages.
            </span>
          </h2>
          <p className="text-aurora-muted text-base sm:text-lg mt-4 leading-relaxed max-w-2xl mx-auto">
            High-converting websites engineered to fit your budget. Simple, straightforward packages with zero hidden markups.
          </p>
          <div className="mt-6 flex justify-center">
            <button
              onClick={onOpenConsultation}
              className="px-5 py-2.5 rounded-full bg-aurora-surface hover:bg-white/10 text-aurora-amber border border-aurora-amber/30 text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-sm hover:scale-105"
            >
              <span>Compare All Package Features</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 3 Pricing Cards Grid with 3D Tilt */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16 items-stretch">
          {PRICING_PLANS.map((plan) => {
            const crystalInfo = crystalMap[plan.id] || { type: 'cube', accent: '#7C5CFF' };
            const isHovered = hoveredPlanId === plan.id;

            return (
              <div 
                key={plan.id}
                onMouseEnter={() => setHoveredPlanId(plan.id)}
                onMouseLeave={() => setHoveredPlanId(null)}
                className="relative h-full"
              >
                {/* Floating Halo Ring for Growth Card */}
                {plan.isPopular && (
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-48 h-12 pointer-events-none z-30 flex items-center justify-center animate-bounce duration-1000">
                    <div 
                      className="w-40 h-8 rounded-full border-2 border-aurora-amber/90 shadow-[0_0_25px_rgba(255,181,71,0.8),inset_0_0_15px_rgba(255,181,71,0.4)]"
                      style={{
                        transform: 'rotateX(72deg)',
                        filter: 'drop-shadow(0 0 10px #FFB547)',
                      }}
                    />
                  </div>
                )}

                <Card3D 
                  intensity={plan.isPopular ? 14 : 10} 
                  glareOpacity={plan.isPopular ? 0.22 : 0.15}
                  className="h-full"
                >
                  <div
                    className={`rounded-3xl p-8 border transition-all duration-300 flex flex-col justify-between relative h-full ${
                      plan.isPopular
                        ? 'border-aurora-amber/70 shadow-[0_25px_60px_rgba(255,181,71,0.3)] bg-gradient-to-b from-aurora-elevated to-aurora-surface'
                        : 'border-white/10 hover:border-aurora-violet/50 bg-aurora-surface/90 shadow-xl'
                    }`}
                  >
                    {/* Most popular badge with 3D Popout */}
                    {plan.badge && (
                      <div 
                        style={{ transform: 'translateZ(35px)' }}
                        className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider btn-amber-cta"
                      >
                        {plan.badge}
                      </div>
                    )}

                    <div style={{ transform: 'translateZ(15px)' }}>
                      {/* 3D Rotating Crystal */}
                      <Crystal3D 
                        type={crystalInfo.type} 
                        isHovered={isHovered} 
                        accentColor={crystalInfo.accent} 
                      />

                      <h3 className="font-display text-2xl font-bold text-white mb-2 text-center">
                        {plan.name}
                      </h3>
                      <p className="text-aurora-muted text-xs leading-relaxed mb-6 text-center">
                        {plan.tagline}
                      </p>

                      {/* Price Display with 3D depth */}
                      <div className="mb-6 pb-6 border-b border-white/10 text-center">
                        <div className="flex items-baseline justify-center gap-2">
                          <span className="text-xs text-aurora-muted font-medium">Starts from</span>
                          <span className="text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]">
                            {plan.startingPrice}
                          </span>
                        </div>
                        <p className="text-[11px] text-aurora-amber font-medium mt-1">
                          {plan.priceNote}
                        </p>
                      </div>

                      {/* Delivery & Ideal for */}
                      <div className="space-y-2 mb-6 text-xs text-aurora-text bg-white/5 p-3.5 rounded-xl border border-white/5 shadow-inner">
                        <div className="flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5 text-aurora-violet shrink-0" />
                          <span><strong>Delivery:</strong> {plan.deliveryTime}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <Sparkles className="w-3.5 h-3.5 text-aurora-amber shrink-0 mt-0.5" />
                          <span><strong>Ideal for:</strong> {plan.idealFor}</span>
                        </div>
                      </div>

                      {/* Feature Checklist */}
                      <div className="space-y-3 mb-8">
                        <p className="text-xs font-bold uppercase tracking-wider text-aurora-muted">
                          What's Included:
                        </p>
                        {plan.features.map((feat, i) => (
                          <div key={i} className="flex items-start gap-2.5 text-xs text-aurora-text">
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
                        className={`w-full py-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-xl cursor-pointer ${
                          plan.isPopular
                            ? 'btn-amber-cta'
                            : 'btn-glass-secondary'
                        }`}
                      >
                        <span>{plan.ctaText}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                </Card3D>
              </div>
            );
          })}
        </div>

        {/* Pricing Transparency & Disclaimers */}
        <div className="glass-card-3d rounded-2xl p-6 sm:p-8 border border-white/10 bg-aurora-surface/90 max-w-4xl mx-auto mb-14 shadow-xl">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-aurora-amber shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-white mb-2">
                Transparent Pricing Policy & Scope Guidelines
              </h4>
              <ul className="space-y-1.5 text-xs text-aurora-muted">
                {PRICING_DISCLAIMERS.map((disc, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-aurora-amber font-bold">•</span>
                    <span>{disc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Custom Requirements Banner */}
        <div className="glass-card-3d rounded-3xl p-8 sm:p-10 border border-aurora-violet/40 bg-gradient-to-r from-aurora-elevated via-aurora-surface to-aurora-elevated text-center max-w-3xl mx-auto shadow-[0_20px_50px_rgba(124,92,255,0.2)]">
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3">
            Need something customized? Let's discuss your requirements.
          </h3>
          <p className="text-aurora-muted text-xs sm:text-sm leading-relaxed mb-6 max-w-xl mx-auto">
            Have specialized booking rules, e-commerce catalog requirements, or specific design preferences? We engineer custom solutions tailored to your unique operational flow.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => scrollToSection('#contact')}
              className="px-8 py-4 rounded-xl btn-amber-cta text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer active:scale-95 transition-all shadow-lg"
            >
              <span>GET A FREE QUOTE</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenConsultation}
              className="px-6 py-4 rounded-xl btn-glass-secondary font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer"
            >
              <PhoneCall className="w-4 h-4 text-aurora-amber" />
              <span>Book 10-Min Call</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Pricing;
