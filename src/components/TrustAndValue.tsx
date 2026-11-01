import React from 'react';
import { 
  Palette, 
  Smartphone, 
  IndianRupee, 
  MessageSquareCheck,
  Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';

export const TrustAndValue: React.FC = () => {
  const benefits = [
    {
      icon: Palette,
      title: 'Professional Designs',
      description: 'Award-winning aesthetics tailored specifically to your brand, services, and local clientele.',
      gradient: 'from-purple-500/20 to-blue-500/10',
      iconColor: 'text-purple-400'
    },
    {
      icon: Smartphone,
      title: 'Mobile Responsive',
      description: 'Engineered mobile-first for fluid viewing across smartphones, tablets, and desktops.',
      gradient: 'from-blue-500/20 to-cyan-500/10',
      iconColor: 'text-blue-400'
    },
    {
      icon: IndianRupee,
      title: 'Affordable Pricing',
      description: 'Clear, transparent packages starting at ₹2,999 with zero hidden markups or retainers.',
      gradient: 'from-cyan-500/20 to-emerald-500/10',
      iconColor: 'text-cyan-400'
    },
    {
      icon: MessageSquareCheck,
      title: 'Direct Communication',
      description: 'Direct phone and WhatsApp access with your developer for fast updates and ongoing support.',
      gradient: 'from-emerald-500/20 to-purple-500/10',
      iconColor: 'text-emerald-400'
    }
  ];

  return (
    <section className="relative py-12 px-4 sm:px-6 lg:px-8 bg-[#070b18]/90 border-y border-white/5 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-24 bg-gradient-to-r from-purple-600/10 via-blue-600/10 to-cyan-500/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group p-6 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-purple-500/40 transition-all duration-300 relative overflow-hidden flex flex-col justify-between"
              >
                {/* Subtle corner hover glow */}
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${item.gradient} rounded-bl-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                <div>
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className={`w-6 h-6 ${item.iconColor}`} />
                  </div>
                  <h3 className="font-display text-base font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
