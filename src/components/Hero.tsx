import React from 'react';
import { 
  ArrowRight, 
  Check, 
  Sparkles, 
  Eye, 
  Lock, 
  UtensilsCrossed, 
  Stethoscope, 
  Building2, 
  ShoppingBag,
  Zap,
  MessageCircle,
  Star,
  ShieldCheck
} from 'lucide-react';
import { motion } from 'framer-motion';
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
    <section id="home" className="relative pt-28 pb-20 sm:pt-36 sm:pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-[90vh] flex items-center">
      {/* 3D WebGL Three.js Scene in background */}
      <HeroScene3D />

      {/* Ambient Radial Lighting Glows */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[450px] bg-purple-600/15 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-1/4 w-[650px] h-[500px] bg-blue-600/15 rounded-full blur-[170px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* ================= LEFT COLUMN ================= */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 xl:col-span-6 text-left"
          >
            {/* Small Badge: ✦ DIGITAL SOLUTIONS FOR MODERN BUSINESSES */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-semibold mb-6 shadow-[0_0_20px_rgba(139,92,246,0.25)]">
              <span className="text-cyan-400">✦</span>
              <span className="tracking-wide">DIGITAL SOLUTIONS FOR MODERN BUSINESSES</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-4xl sm:text-5xl xl:text-6xl font-extrabold text-white tracking-tight leading-[1.12] mb-6">
              Your Business Deserves{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#3B82F6] to-[#22D3EE] drop-shadow-[0_0_35px_rgba(139,92,246,0.35)]">
                More Than Just a Website.
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8 max-w-xl">
              We create stunning, high-performance websites that help local businesses attract customers, build trust, and grow in the digital world.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8">
              <a
                href="#contact"
                onClick={(e) => handleScrollTo(e, '#contact')}
                className="px-8 py-4 rounded-xl gradient-button text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-[0_15px_35px_rgba(139,92,246,0.45)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <span>GET YOUR WEBSITE</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#demos"
                onClick={(e) => handleScrollTo(e, '#demos')}
                className="px-8 py-4 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-white font-bold text-xs uppercase tracking-wider border border-white/15 hover:border-purple-400/50 flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
              >
                <Eye className="w-4 h-4 text-cyan-400" />
                <span>EXPLORE OUR WORK</span>
              </a>
            </div>

            {/* Three Trust Indicators */}
            <div className="space-y-2.5 pt-4 border-t border-white/10 text-xs sm:text-sm font-medium text-slate-300">
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <span>Affordable Website Solutions (Starting at ₹2,999)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <span>Mobile-First Design (Fast, responsive & verified)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <span>Custom-Built Experiences (Zero cookie-cutter templates)</span>
              </div>
            </div>
          </motion.div>

          {/* ================= RIGHT COLUMN (ANIMATED COMPOSITION) ================= */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 xl:col-span-6 relative"
          >
            {/* Composition container with subtle 3D perspective */}
            <div className="relative w-full max-w-lg lg:max-w-none mx-auto py-6" style={{ perspective: '1200px' }}>

              {/* Floating Top Badge: 99+ Speed Score */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-3 left-4 sm:left-8 z-30 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0b1020]/90 backdrop-blur-md border border-cyan-500/30 text-cyan-300 text-xs font-semibold shadow-xl shadow-cyan-950/40 pointer-events-none"
              >
                <Zap className="w-3.5 h-3.5 text-cyan-400" />
                <span>99+ Speed Score</span>
                <span className="text-[10px] text-slate-400 font-mono">Lighthouse</span>
              </motion.div>

              {/* Floating Top-Right Badge: WhatsApp Engine */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-3 right-4 sm:right-6 z-30 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0b1020]/90 backdrop-blur-md border border-emerald-500/30 text-emerald-300 text-xs font-semibold shadow-xl shadow-emerald-950/40 pointer-events-none"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp Engine</span>
              </motion.div>

              {/* Central Main Browser Mockup (Savoria Bistro Restaurant Preview) */}
              <motion.div 
                whileHover={{ scale: 1.01 }}
                className="rounded-2xl overflow-hidden border border-white/15 bg-[#090d20] shadow-[0_25px_60px_rgba(0,0,0,0.85)] relative z-10 group"
              >
                {/* Browser Top Chrome */}
                <div className="bg-[#0e1328] px-4 py-3 border-b border-white/10 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                  </div>
                  <div className="flex-1 max-w-xs mx-auto bg-[#050814] px-3 py-1 rounded-lg border border-white/5 flex items-center justify-center gap-1.5 text-[11px] text-slate-300 font-mono">
                    <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
                    <span className="truncate">https://savoria-bistro.nexora.tech</span>
                  </div>
                  <button
                    onClick={() => onOpenDemo('restaurant')}
                    className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 hover:bg-purple-500/30 transition-colors"
                  >
                    Live Demo
                  </button>
                </div>

                {/* Browser Content: Restaurant Preview */}
                <div className="relative h-64 sm:h-72 overflow-hidden bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80')" }}>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090d20] via-[#090d20]/60 to-black/40" />

                  <div className="absolute inset-0 p-5 flex flex-col justify-between">
                    {/* Top bar inside site */}
                    <div className="flex items-center justify-between text-white text-xs">
                      <span className="font-display font-bold tracking-wider text-amber-300 flex items-center gap-1.5">
                        <UtensilsCrossed className="w-3.5 h-3.5" />
                        SAVORIA BISTRO
                      </span>
                      <span className="text-[10px] text-slate-300 flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded-full border border-white/10">
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                        4.9 (420+ Reviews)
                      </span>
                    </div>

                    {/* Middle title */}
                    <div>
                      <p className="text-[11px] uppercase tracking-widest text-amber-400 font-bold">Fine Dining & Artisan Cocktails</p>
                      <h4 className="font-display text-xl sm:text-2xl font-black text-white mt-0.5">
                        Authentic Gourmet Cuisine
                      </h4>
                      <div className="flex gap-2 mt-2">
                        <span className="text-[10px] bg-white/10 backdrop-blur-sm px-2 py-0.5 rounded text-slate-200">Woodfired Pizza</span>
                        <span className="text-[10px] bg-white/10 backdrop-blur-sm px-2 py-0.5 rounded text-slate-200">Truffle Pasta</span>
                        <span className="text-[10px] bg-white/10 backdrop-blur-sm px-2 py-0.5 rounded text-slate-200">Mocktails</span>
                      </div>
                    </div>

                    {/* Bottom CTA bar */}
                    <div className="flex items-center justify-between gap-3 bg-[#0a0e24]/90 backdrop-blur-md p-2.5 rounded-xl border border-white/10">
                      <div>
                        <p className="text-[10px] text-slate-400">Open Today: 12:00 PM – 11:30 PM</p>
                        <p className="text-xs font-bold text-white">Instant Table Booking & Menu</p>
                      </div>
                      <button 
                        onClick={() => onOpenDemo('restaurant')}
                        className="px-3.5 py-1.5 rounded-lg gradient-button text-white text-[11px] font-bold uppercase tracking-wider shrink-0 cursor-pointer"
                      >
                        Book Table
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating Card 1: Healthcare Website Preview (PulseCare Clinic) */}
              <motion.div
                animate={{ y: [0, -8, 0], x: [0, 4, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
                onClick={() => onOpenDemo('clinic')}
                className="absolute -top-8 -right-4 sm:-right-8 w-60 sm:w-64 rounded-2xl p-3.5 bg-[#0d122b]/95 backdrop-blur-xl border border-cyan-500/30 shadow-[0_20px_40px_rgba(0,0,0,0.8)] z-20 cursor-pointer hover:border-cyan-400 transition-all hover:scale-105"
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                    <Stethoscope className="w-4 h-4" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-xs font-bold text-white truncate">PulseCare Clinic</p>
                    <p className="text-[10px] text-cyan-400">Multi-Specialty Healthcare</p>
                  </div>
                </div>
                <div className="bg-[#060918] p-2 rounded-lg border border-white/5 text-[11px] space-y-1">
                  <div className="flex justify-between text-slate-300">
                    <span>OPD Doctor:</span>
                    <span className="text-white font-semibold">Dr. A. Mehta</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Next Slot:</span>
                    <span className="text-emerald-400 font-semibold">Today 4:30 PM</span>
                  </div>
                </div>
              </motion.div>

              {/* Floating Card 2: Hotel & Resort Preview (Grand Oberoi) */}
              <motion.div
                animate={{ y: [0, 8, 0], x: [0, -4, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                onClick={() => onOpenDemo('hotel')}
                className="absolute -bottom-6 -left-4 sm:-left-8 w-60 sm:w-64 rounded-2xl p-3.5 bg-[#0d122b]/95 backdrop-blur-xl border border-purple-500/30 shadow-[0_20px_40px_rgba(0,0,0,0.8)] z-20 cursor-pointer hover:border-purple-400 transition-all hover:scale-105"
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-xs font-bold text-white truncate">The Grand Oberoi</p>
                    <p className="text-[10px] text-purple-300">Luxury Heritage Resort</p>
                  </div>
                </div>
                <div className="bg-[#060918] p-2 rounded-lg border border-white/5 text-[11px] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400">Royal Pool Villa</span>
                    <p className="text-xs font-bold text-white">₹4,999<span className="text-[10px] font-normal text-slate-400">/night</span></p>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                    Check Dates
                  </span>
                </div>
              </motion.div>

              {/* Floating Card 3: E-commerce Website Preview */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 6.2, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                className="absolute -bottom-10 right-2 sm:right-6 w-52 sm:w-56 rounded-2xl p-3 bg-[#0d122b]/95 backdrop-blur-xl border border-blue-500/30 shadow-[0_20px_40px_rgba(0,0,0,0.8)] z-20 hidden sm:block"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-6 h-6 rounded-md bg-blue-500/20 text-blue-400 flex items-center justify-center">
                    <ShoppingBag className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[11px] font-bold text-white">E-Commerce Store</span>
                </div>
                <div className="text-[10px] text-slate-300 flex justify-between items-center bg-[#060918] p-1.5 rounded-lg border border-white/5">
                  <span>Cart Items: <strong>2</strong></span>
                  <span className="text-cyan-400 font-bold">Checkout →</span>
                </div>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
