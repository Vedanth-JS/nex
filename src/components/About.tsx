import React from 'react';
import { 
  Building, 
  Target, 
  Eye, 
  Sparkles, 
  ShieldCheck, 
  HeartHandshake
} from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-aurora-bg/95 border-t border-white/5 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 aurora-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-aurora-violet/10 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Pill */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-aurora-surface border border-aurora-violet/40 text-aurora-amber text-xs font-semibold mb-4 shadow-sm">
            <Building className="w-3.5 h-3.5 text-aurora-amber" />
            <span>About Nexora Technologies</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-4xl mx-auto">
            Helping Local Businesses Build a{' '}
            <span className="headline-shimmer">
              Powerful Digital Presence.
            </span>
          </h2>
        </div>

        {/* Main Content Card */}
        <div className="glass-card-3d rounded-3xl p-8 sm:p-12 border border-white/10 bg-aurora-surface/90 shadow-2xl relative overflow-hidden mb-12">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-aurora-text text-base sm:text-xl leading-relaxed mb-10 font-normal">
              Nexora Technologies helps local businesses establish their online presence through professional, affordable, and modern website solutions. We transform business ideas into attractive digital experiences that make it easier for customers to discover services, explore products, and connect with businesses.
            </p>
          </div>

          {/* Mission and Vision Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-white/10">
            {/* Mission Card */}
            <div className="bg-aurora-elevated/70 border border-white/10 rounded-2xl p-6 sm:p-8 hover:border-aurora-violet/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-aurora-violet/20 text-aurora-violet flex items-center justify-center mb-4">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-2">Our Mission</h3>
              <p className="text-aurora-muted text-sm sm:text-base leading-relaxed">
                Make professional websites accessible and affordable for local businesses.
              </p>
            </div>

            {/* Vision Card */}
            <div className="bg-aurora-elevated/70 border border-white/10 rounded-2xl p-6 sm:p-8 hover:border-aurora-amber/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-aurora-amber/20 text-aurora-amber flex items-center justify-center mb-4">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-2">Our Vision</h3>
              <p className="text-aurora-muted text-sm sm:text-base leading-relaxed">
                Help businesses grow through technology and digital innovation.
              </p>
            </div>
          </div>
        </div>

        {/* Commitment Points */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="glass-card-3d rounded-2xl p-6 border border-white/10 bg-aurora-surface/80">
            <HeartHandshake className="w-8 h-8 text-aurora-amber mx-auto mb-3" />
            <h4 className="font-bold text-white text-base mb-1">Local Business Focus</h4>
            <p className="text-xs text-aurora-muted">Tailored specifically for shops, clinics, dining, and regional service providers.</p>
          </div>
          <div className="glass-card-3d rounded-2xl p-6 border border-white/10 bg-aurora-surface/80">
            <ShieldCheck className="w-8 h-8 text-aurora-violet mx-auto mb-3" />
            <h4 className="font-bold text-white text-base mb-1">Transparent & Honest</h4>
            <p className="text-xs text-aurora-muted">Upfront starting prices without complex retainers or exaggerated claims.</p>
          </div>
          <div className="glass-card-3d rounded-2xl p-6 border border-white/10 bg-aurora-surface/80">
            <Sparkles className="w-8 h-8 text-aurora-amber mx-auto mb-3" />
            <h4 className="font-bold text-white text-base mb-1">Modern Technologies</h4>
            <p className="text-xs text-aurora-muted">Built with modern React, high-speed CDN, and seamless mobile responsiveness.</p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
