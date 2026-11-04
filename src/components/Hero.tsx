import React, { Suspense, lazy } from 'react';
import { 
  ArrowRight, 
  Check, 
  Eye, 
} from 'lucide-react';
import { DemoId } from '../types';
import { HeroParticles } from './HeroParticles';
import { TiltCard } from './TiltCard';
import { HeroStaticFallback } from './HeroStaticFallback';

// Lazy-load the 3D Hero scene with React.lazy + Suspense for optimal initial page load & Lighthouse performance
const Hero3D = lazy(() => import('./Hero3D'));

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
    <section id="home" className="relative pt-28 pb-16 sm:pt-32 sm:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* 1. Animated Gradient Mesh Blobs (CSS only) */}
      <div className="hero-gradient-mesh">
        <div className="hero-mesh-blob-1 absolute top-[15%] left-[8%] w-[520px] h-[420px] bg-aurora-violet/15 rounded-full blur-[110px]" />
        <div className="hero-mesh-blob-2 absolute top-[25%] right-[10%] w-[580px] h-[460px] bg-aurora-magenta/15 rounded-full blur-[120px]" />
        <div className="hero-mesh-blob-3 absolute bottom-[10%] left-[32%] w-[540px] h-[360px] bg-aurora-amber/12 rounded-full blur-[110px]" />
      </div>

      {/* 2. Faint Grid with Perspective Fade (CSS only) */}
      <div className="hero-perspective-grid" />

      {/* 3. Tiny Floating Particles (25 subtle CSS floating particles) */}
      <HeroParticles />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* ================= LEFT COLUMN ================= */}
          <div className="lg:col-span-6 xl:col-span-6 text-left">
            {/* Small Badge: ✦ DIGITAL SOLUTIONS FOR MODERN BUSINESSES */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-aurora-surface border border-aurora-violet/40 text-aurora-amber text-xs font-semibold mb-6 shadow-[0_0_20px_rgba(124,92,255,0.25)]">
              <span className="text-aurora-amber">✦</span>
              <span className="tracking-wide">DIGITAL SOLUTIONS FOR MODERN BUSINESSES</span>
            </div>

            {/* Main Headline with slow shimmer animation */}
            <h1 className="font-display text-4xl sm:text-5xl xl:text-6xl font-extrabold text-white tracking-tight leading-[1.12] mb-6">
              Your Business Deserves{' '}
              <span className="headline-shimmer drop-shadow-[0_0_35px_rgba(124,92,255,0.35)]">
                More Than Just a Website.
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8 max-w-xl">
              We create stunning, high-performance websites that help local businesses attract customers, build trust, and grow in the digital world.
            </p>

            {/* CTAs with 3D Tilt on "Get Your Website" */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8">
              <TiltCard maxTilt={8} scale={1.03} className="inline-block">
                <a
                  href="#contact"
                  onClick={(e) => handleScrollTo(e, '#contact')}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl btn-amber-cta text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <span>GET YOUR WEBSITE</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </TiltCard>

              <TiltCard maxTilt={6} scale={1.02} className="inline-block">
                <a
                  href="#demos"
                  onClick={(e) => handleScrollTo(e, '#demos')}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl btn-glass-secondary font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Eye className="w-4 h-4 text-aurora-amber" />
                  <span>EXPLORE OUR WORK</span>
                </a>
              </TiltCard>
            </div>

            {/* Three Trust Indicators */}
            <div className="space-y-2.5 pt-4 border-t border-white/10 text-xs sm:text-sm font-medium text-slate-300">
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-aurora-amber/15 text-aurora-amber flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <span>Affordable Website Solutions (Starting at ₹2,999)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-aurora-amber/15 text-aurora-amber flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <span>Mobile-First Design (Fast, responsive & verified)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-aurora-amber/15 text-aurora-amber flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <span>Custom-Built Experiences (Zero cookie-cutter templates)</span>
              </div>
            </div>
          </div>

          {/* ================= RIGHT COLUMN (3D HERO SCENE WITH SUSPENSE & FALLBACK) ================= */}
          <div className="lg:col-span-6 xl:col-span-6 relative w-full">
            {/* Reserved container height to ensure zero layout shift (CLS = 0) */}
            <div className="relative w-full min-h-[380px] sm:min-h-[460px] lg:min-h-[500px] flex items-center justify-center">
              <Suspense fallback={<HeroStaticFallback onOpenDemo={(id) => onOpenDemo(id as DemoId)} />}>
                <Hero3D onOpenDemo={(id) => onOpenDemo(id as DemoId)} />
              </Suspense>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
