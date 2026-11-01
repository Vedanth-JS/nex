import React from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Eye
} from 'lucide-react';
import { HeroMockupPreview } from './HeroMockupPreview';
import { HeroScene3D } from './3d/HeroScene3D';
import { DemoId } from '../types';

interface HeroProps {
  onOpenDemo: (id: DemoId) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenDemo }) => {
  const handleScrollTo = (e: React.MouseEvent, selector: string) => {
    e.preventDefault();
    const el = document.querySelector(selector);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative pt-32 pb-24 sm:pt-40 sm:pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* 3D WebGL Three.js Scene in background */}
      <HeroScene3D />

      {/* Dynamic Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-purple-600/20 rounded-full blur-[150px] pointer-events-none -z-10 animate-pulse-slow" />
      <div className="absolute top-1/3 left-1/4 w-[450px] h-[350px] bg-blue-600/15 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="absolute top-1/2 right-1/4 w-[400px] h-[350px] bg-cyan-500/15 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto text-center relative z-10">
        
        {/* Top Tagline Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-purple-500/30 text-purple-200 text-xs sm:text-sm font-semibold mb-8 animate-in fade-in slide-in-from-bottom-3 duration-500 shadow-[0_0_25px_rgba(139,92,246,0.25)]">
          <Sparkles className="w-4 h-4 text-cyan-400 animate-spin-slow" />
          <span>Building Digital Experiences for Growing Businesses</span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          <span className="text-cyan-300 font-normal hidden sm:inline">Affordable Packages from ₹2,999</span>
        </div>

        {/* Main Heading (Exact as requested) */}
        <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.12] max-w-5xl mx-auto mb-6 drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
          Your Business Deserves a{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-300">
            Powerful Online Presence.
          </span>
        </h1>

        {/* Subheading (Exact as requested) */}
        <p className="text-slate-300 text-base sm:text-xl lg:text-2xl font-normal leading-relaxed max-w-3xl mx-auto mb-10 text-balance">
          We design and develop stunning, high-performance websites that help local businesses attract more customers, build credibility, and grow online.
        </p>

        {/* Primary CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <a
            href="#contact"
            onClick={(e) => handleScrollTo(e, '#contact')}
            className="w-full sm:w-auto px-8 py-4 rounded-xl gradient-button text-white font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-[0_15px_35px_rgba(139,92,246,0.45)] group hover:scale-[1.03] active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>GET YOUR WEBSITE</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href="#portfolio"
            onClick={(e) => handleScrollTo(e, '#portfolio')}
            className="w-full sm:w-auto px-8 py-4 rounded-xl glass-card hover:bg-white/10 text-white font-semibold text-xs sm:text-sm uppercase tracking-wider border border-white/20 flex items-center justify-center gap-2 transition-all hover:border-purple-400/60 shadow-lg cursor-pointer"
          >
            <Eye className="w-4 h-4 text-cyan-400" />
            <span>EXPLORE OUR WORK</span>
          </a>
        </div>

        {/* Trust Indicators (Exact 4 as requested) */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 pt-5 pb-3 border-y border-white/10 max-w-4xl mx-auto text-xs sm:text-sm font-semibold text-slate-200">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 shadow-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Mobile-First Design</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 shadow-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Affordable Packages</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 shadow-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Custom-Built Websites</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 shadow-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>WhatsApp Integration</span>
          </div>
        </div>

        {/* Browser Mockups 3D Showcase */}
        <HeroMockupPreview onOpenDemo={onOpenDemo} />

      </div>
    </section>
  );
};
