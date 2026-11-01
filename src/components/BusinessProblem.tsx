import React from 'react';
import { 
  Globe2, 
  ShieldCheck, 
  TrendingUp, 
  ArrowRight, 
  AlertTriangle, 
  Search,
  CheckCircle2
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Card3D } from './3d/Card3D';

interface BusinessProblemProps {
  onBuildWebsite: () => void;
}

export const BusinessProblem: React.FC<BusinessProblemProps> = ({ onBuildWebsite }) => {
  const cards = [
    {
      icon: Globe2,
      title: 'ONLINE VISIBILITY',
      tagline: 'Get Discovered First',
      description: 'Help customers discover your business online when they search for local services, opening hours, menus, or addresses.',
      highlight: '97% of people learn more about a local company online than anywhere else.',
      accent: 'from-purple-500/25 to-blue-500/10',
      borderHover: 'hover:border-purple-500/50',
      iconColor: 'text-purple-400'
    },
    {
      icon: ShieldCheck,
      title: 'CUSTOMER TRUST',
      tagline: 'Build Immediate Credibility',
      description: 'Create a professional first impression with a modern website that gives customers confidence in your services and quality.',
      highlight: '84% of consumers believe a business with a website is more credible than one with only social media.',
      accent: 'from-blue-500/25 to-cyan-500/10',
      borderHover: 'hover:border-blue-500/50',
      iconColor: 'text-blue-400'
    },
    {
      icon: TrendingUp,
      title: 'BUSINESS GROWTH',
      tagline: 'Turn Visitors Into Paying Clients',
      description: 'Make it easier for customers to explore your services and contact you directly through seamless WhatsApp and appointment forms.',
      highlight: 'Direct WhatsApp and lead forms capture ready-to-buy inquiries 24/7 without friction.',
      accent: 'from-cyan-500/25 to-emerald-500/10',
      borderHover: 'hover:border-cyan-500/50',
      iconColor: 'text-cyan-400'
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative bg-[#050510] overflow-hidden border-t border-white/5">
      {/* Background Subtle Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-purple-900/10 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-semibold mb-4 shadow-sm">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            <span>Digital Presence Matters</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Your Customers Are Online.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-300">
              Is Your Business?
            </span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-2xl mx-auto">
            Customers search online before choosing a business. Give them a professional place to discover your services, explore your offerings, and contact you.
          </p>
        </div>

        {/* 3 Premium Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <Card3D key={idx} intensity={10} glareOpacity={0.16}>
                <div className={`glass-card-3d rounded-3xl p-8 border border-white/10 ${card.borderHover} transition-all duration-300 flex flex-col justify-between h-full bg-[#0a0f22]/90 relative overflow-hidden group`}>
                  {/* Subtle Gradient Backing */}
                  <div className={`absolute top-0 right-0 w-36 h-36 bg-gradient-to-br ${card.accent} rounded-bl-full pointer-events-none transition-all group-hover:scale-125 opacity-70`} />

                  <div style={{ transform: 'translateZ(15px)' }}>
                    <div className="w-13 h-13 p-3.5 rounded-2xl bg-white/5 border border-white/15 flex items-center justify-center mb-6 shadow-md w-fit">
                      <Icon className={`w-6 h-6 ${card.iconColor}`} />
                    </div>

                    <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 font-mono">
                      {card.tagline}
                    </span>

                    <h3 className="font-display text-xl font-bold text-white mt-1 mb-3 group-hover:text-cyan-300 transition-colors">
                      {card.title}
                    </h3>

                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                      {card.description}
                    </p>
                  </div>

                  {/* Fact / Stat Box */}
                  <div style={{ transform: 'translateZ(25px)' }} className="pt-4 border-t border-white/10 mt-auto">
                    <p className="text-[11px] text-slate-400 leading-snug flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{card.highlight}</span>
                    </p>
                  </div>
                </div>
              </Card3D>
            );
          })}
        </div>

        {/* Closing Statement & Conversion Box */}
        <div className="glass-card-3d rounded-3xl p-8 sm:p-10 border border-purple-500/30 bg-gradient-to-r from-purple-950/40 via-[#0B1020] to-cyan-950/30 text-center max-w-4xl mx-auto shadow-xl">
          <div className="max-w-2xl mx-auto">
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white mb-3">
              "Let's give your business the digital presence it deserves."
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-8">
              Nexora builds professional, modern websites designed to establish trust, capture customer enquiries, and put your business ahead of local competitors.
            </p>
            <button
              onClick={onBuildWebsite}
              className="px-8 py-4 rounded-xl gradient-button text-white font-bold text-xs uppercase tracking-wider inline-flex items-center gap-2.5 shadow-xl shadow-purple-600/35 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <span>Build My Website</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
