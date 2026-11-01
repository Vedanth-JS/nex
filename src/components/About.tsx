import React from 'react';
import { 
  Building, 
  Target, 
  Eye, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  HeartHandshake
} from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-[#050510] border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Pill */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-semibold mb-4">
            <Building className="w-3.5 h-3.5 text-cyan-400" />
            <span>About Nexora Technologies</span>
          </div>
          {/* Exact Heading from prompt */}
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-4xl mx-auto">
            Helping Local Businesses Build a{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-300">
              Powerful Digital Presence.
            </span>
          </h2>
        </div>

        {/* Main Content Card */}
        <div className="glass-card rounded-3xl p-8 sm:p-12 border border-white/10 bg-[#090d1e]/80 shadow-2xl relative overflow-hidden mb-12">
          <div className="max-w-3xl mx-auto text-center">
            {/* Exact Description from prompt */}
            <p className="text-slate-200 text-base sm:text-xl leading-relaxed mb-10 font-normal">
              Nexora Technologies helps local businesses establish their online presence through professional, affordable, and modern website solutions. We transform business ideas into attractive digital experiences that make it easier for customers to discover services, explore products, and connect with businesses.
            </p>
          </div>

          {/* Mission and Vision Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-white/10">
            {/* Mission Card */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 hover:border-purple-500/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-4">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-2">Our Mission</h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Make professional websites accessible and affordable for local businesses.
              </p>
            </div>

            {/* Vision Card */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 hover:border-cyan-500/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-4">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-2">Our Vision</h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Help businesses grow through technology and digital innovation.
              </p>
            </div>
          </div>
        </div>

        {/* Commitment Points */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="glass-card rounded-2xl p-6 border border-white/10">
            <HeartHandshake className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
            <h4 className="font-bold text-white text-base mb-1">Local Business Focus</h4>
            <p className="text-xs text-slate-400">Tailored specifically for shops, clinics, dining, and regional service providers.</p>
          </div>
          <div className="glass-card rounded-2xl p-6 border border-white/10">
            <ShieldCheck className="w-8 h-8 text-purple-400 mx-auto mb-3" />
            <h4 className="font-bold text-white text-base mb-1">Transparent & Honest</h4>
            <p className="text-xs text-slate-400">Upfront starting prices without complex retainers or exaggerated claims.</p>
          </div>
          <div className="glass-card rounded-2xl p-6 border border-white/10">
            <Sparkles className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
            <h4 className="font-bold text-white text-base mb-1">Modern Technologies</h4>
            <p className="text-xs text-slate-400">Built with modern React, high-speed CDN, and seamless mobile responsiveness.</p>
          </div>
        </div>

      </div>
    </section>
  );
};
