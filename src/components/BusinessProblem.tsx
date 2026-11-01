import React from 'react';
import { 
  UsersRound, 
  Share2, 
  Building2, 
  ArrowRight, 
  AlertTriangle, 
  TrendingUp, 
  Sparkles,
  SearchX,
  Smartphone,
  ShieldCheck
} from 'lucide-react';
import { Card3D } from './3d/Card3D';

interface BusinessProblemProps {
  onBuildWebsite: () => void;
}

export const BusinessProblem: React.FC<BusinessProblemProps> = ({ onBuildWebsite }) => {
  const problems = [
    {
      icon: SearchX,
      title: 'Losing Potential Customers',
      subtitle: 'Missed Discovery & Enquiries',
      description: 'Customers cannot easily find your services, prices, products, or business information when searching online.',
      stat: '76% of customers',
      statLabel: 'search online before visiting a local business',
      accentColor: 'from-rose-500/20 to-orange-500/10',
      borderColor: 'group-hover:border-rose-500/40',
      iconBg: 'bg-rose-500/20 text-rose-400'
    },
    {
      icon: Share2,
      title: 'Limited Online Visibility',
      subtitle: 'Algorithm & Feed Restrictions',
      description: 'Depending only on social media makes it harder to provide customers with a complete, distraction-free business experience.',
      stat: '< 10% organic reach',
      statLabel: 'on average social media business profiles',
      accentColor: 'from-amber-500/20 to-yellow-500/10',
      borderColor: 'group-hover:border-amber-500/40',
      iconBg: 'bg-amber-500/20 text-amber-400'
    },
    {
      icon: Building2,
      title: 'Lack of Professional Presence',
      subtitle: 'Credibility & Trust Barrier',
      description: 'A professional website gives customers a verified central place to learn about, trust, and directly contact your business.',
      stat: '84% of consumers',
      statLabel: 'consider a dedicated website more credible',
      accentColor: 'from-blue-500/20 to-purple-500/10',
      borderColor: 'group-hover:border-blue-500/40',
      iconBg: 'bg-blue-500/20 text-blue-400'
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative bg-[#070b18] overflow-hidden border-t border-white/5">
      {/* Background Subtle Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-purple-900/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-semibold mb-4 shadow-sm">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            <span>The Reality of Modern Local Business</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Your Customers Are Online.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-300">
              Is Your Business?
            </span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed">
            In today's digital-first market, customers look for prices, menus, doctor schedules, and reviews online before stepping out. Without a dedicated website, your business remains practically invisible to ready-to-buy local clients.
          </p>
        </div>

        {/* 3 Problem Cards with 3D Depth */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {problems.map((prob, idx) => {
            const Icon = prob.icon;
            return (
              <Card3D key={idx} intensity={12} glareOpacity={0.16}>
                <div className={`glass-card-3d rounded-3xl p-8 border border-white/10 ${prob.borderColor} transition-all duration-300 flex flex-col justify-between h-full bg-[#0a0f22]/90 relative overflow-hidden group`}>
                  {/* Subtle Gradient Backing */}
                  <div className={`absolute top-0 right-0 w-36 h-36 bg-gradient-to-br ${prob.accentColor} rounded-bl-full pointer-events-none transition-all group-hover:scale-125 opacity-60`} />

                  <div style={{ transform: 'translateZ(15px)' }}>
                    <div className="w-13 h-13 p-3.5 rounded-2xl bg-white/5 border border-white/15 flex items-center justify-center mb-6 shadow-md w-fit">
                      <Icon className="w-6 h-6 text-white" />
                    </div>

                    <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 font-mono">
                      {prob.subtitle}
                    </span>

                    <h3 className="font-display text-xl font-bold text-white mt-1 mb-3 group-hover:text-cyan-300 transition-colors">
                      {prob.title}
                    </h3>

                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                      {prob.description}
                    </p>
                  </div>

                  {/* Fact / Stat Box */}
                  <div style={{ transform: 'translateZ(25px)' }} className="pt-4 border-t border-white/10 mt-auto">
                    <p className="text-xs font-bold text-white">{prob.stat}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">{prob.statLabel}</p>
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
