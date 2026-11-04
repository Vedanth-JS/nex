import React, { useState } from 'react';
import { 
  Palette, 
  Smartphone, 
  IndianRupee, 
  MessageSquareCheck,
  Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';

interface BenefitItem {
  icon: typeof Palette;
  gemType: string;
  title: string;
  description: string;
  accent: string;
  glow: string;
  borderHover: string;
}

export const TrustAndValue: React.FC = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const benefits: BenefitItem[] = [
    {
      icon: Palette,
      gemType: 'Violet Crystal',
      title: 'Professional Designs',
      description: 'Award-winning aesthetics tailored specifically to your brand, services, and local clientele.',
      accent: 'text-aurora-violet',
      glow: 'shadow-[0_0_25px_rgba(124,92,255,0.4)]',
      borderHover: 'hover:border-aurora-violet/50',
    },
    {
      icon: Smartphone,
      gemType: 'Magenta Prism',
      title: 'Mobile Responsive',
      description: 'Engineered mobile-first for fluid viewing across smartphones, tablets, and desktops.',
      accent: 'text-aurora-magenta',
      glow: 'shadow-[0_0_25px_rgba(225,75,255,0.4)]',
      borderHover: 'hover:border-aurora-magenta/50',
    },
    {
      icon: IndianRupee,
      gemType: 'Amber Topaz',
      title: 'Affordable Pricing',
      description: 'Clear, transparent packages starting at ₹2,999 with zero hidden markups or retainers.',
      accent: 'text-aurora-amber',
      glow: 'shadow-[0_0_25px_rgba(255,181,71,0.4)]',
      borderHover: 'hover:border-aurora-amber/50',
    },
    {
      icon: MessageSquareCheck,
      gemType: 'Aurora Beryl',
      title: 'Direct Communication',
      description: 'Direct phone and WhatsApp access with your developer for fast updates and ongoing support.',
      accent: 'text-aurora-violet',
      glow: 'shadow-[0_0_25px_rgba(124,92,255,0.4)]',
      borderHover: 'hover:border-aurora-violet/50',
    }
  ];

  return (
    <section className="relative py-14 px-4 sm:px-6 lg:px-8 bg-aurora-surface/75 border-y border-white/5 overflow-hidden">
      {/* Aurora perspective grid & ambient glow */}
      <div className="absolute inset-0 aurora-grid opacity-25 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-28 bg-gradient-to-r from-aurora-violet/10 via-aurora-magenta/10 to-aurora-amber/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((item, idx) => {
            const Icon = item.icon;
            const isHovered = hoveredIdx === idx;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className={`group p-6 rounded-2xl bg-aurora-elevated/70 border border-white/10 ${item.borderHover} transition-all duration-300 relative overflow-hidden flex flex-col justify-between shadow-lg hover:shadow-2xl hover:-translate-y-1`}
                style={{ perspective: 1000 }}
              >
                {/* Subtle top corner gradient flare */}
                <div className={`absolute top-0 right-0 w-28 h-28 bg-gradient-to-br from-aurora-violet/20 via-aurora-magenta/10 to-transparent rounded-bl-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                <div>
                  {/* 3D Spinning Interactive Gem & Icon Container */}
                  <div className="relative w-14 h-14 mb-5 flex items-center justify-center">
                    {/* Spinning 3D Crystal Hexagon Gem Background */}
                    <div 
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/10 to-white/5 border border-white/20 transition-all duration-700 ease-out flex items-center justify-center ${item.glow}`}
                      style={{
                        transformStyle: 'preserve-3d',
                        transform: isHovered 
                          ? 'rotateY(360deg) rotateX(15deg) scale(1.1)' 
                          : 'rotateY(0deg) rotateX(0deg) scale(1.0)',
                      }}
                    >
                      {/* Faceted gemstone reflection overlay */}
                      <div className="absolute inset-1 rounded-xl bg-gradient-to-br from-white/20 via-transparent to-black/30 pointer-events-none" />
                      
                      {/* 3D Gem Sparkle */}
                      <div className="absolute -top-1 -right-1">
                        <Sparkles className={`w-3.5 h-3.5 ${item.accent} ${isHovered ? 'animate-spin' : ''}`} />
                      </div>
                    </div>

                    {/* Central Icon */}
                    <div 
                      className="relative z-10 transition-transform duration-500 ease-out"
                      style={{
                        transform: isHovered ? 'scale(1.2) translateZ(20px)' : 'scale(1) translateZ(0px)',
                      }}
                    >
                      <Icon className={`w-6 h-6 ${item.accent} transition-colors drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]`} />
                    </div>
                  </div>

                  {/* Benefit Title */}
                  <h3 className="font-display text-base font-bold text-white mb-2 group-hover:text-aurora-amber transition-colors">
                    {item.title}
                  </h3>

                  {/* Benefit Description */}
                  <p className="text-aurora-muted text-xs sm:text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Subtle bottom indicator */}
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-aurora-muted/80">
                  <span>CONCEPT VALUE</span>
                  <span className={item.accent}>0{idx + 1}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
