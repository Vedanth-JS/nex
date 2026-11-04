import React, { useState } from 'react';
import { 
  Eye, 
  ArrowRight, 
  UtensilsCrossed, 
  Stethoscope, 
  Building2, 
  GraduationCap, 
  Dumbbell, 
  Home, 
  CheckCircle2, 
  Laptop,
  RotateCw,
  Sparkles
} from 'lucide-react';
import { DemoId } from '../types';

interface DemosSectionProps {
  onOpenDemo: (id: DemoId) => void;
  onOrderThisWebsite: (id: DemoId) => void;
}

const DEMO_CARDS: {
  id: DemoId;
  title: string;
  category: string;
  theme: string;
  image: string;
  description: string;
  highlights: string[];
  features: string[];
  icon: React.ElementType;
}[] = [
  {
    id: 'restaurant',
    title: 'Savoria Fine Dining & Bistro',
    category: 'Restaurant & Cafe Website',
    theme: 'Dark Noir Luxury Aesthetic',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80',
    description: 'Michelin-inspired dining experience with interactive categorized food menu, dish pricing, instant table reservations, and WhatsApp ordering.',
    highlights: ['Table Reservation Form', 'Filterable Food Menu', 'Chef Specialties'],
    features: ['Direct WhatsApp order triggers', 'Seasonal tasting menu cards', 'Instant reservation receipt confirmation'],
    icon: UtensilsCrossed,
  },
  {
    id: 'clinic',
    title: 'PulseCare Multi-Specialty Clinic',
    category: 'Hospital & Healthcare Website',
    theme: 'Clinical Trust & Modern Medical Tech',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1000&q=80',
    description: 'Clean medical portal featuring doctor qualifications, OPD timings, department selection, emergency hotline, and slot booking.',
    highlights: ['Doctor Directory', 'Appointment Scheduler', 'Emergency Hotline'],
    features: ['NABH accreditation showcase', 'Specialist doctor selection', 'Direct patient confirmation workflow'],
    icon: Stethoscope,
  },
  {
    id: 'hotel',
    title: 'The Grand Oberoi Palace & Resort',
    category: 'Luxury Hotel & Resort Website',
    theme: 'Royal Heritage & Serene Pool Villas',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80',
    description: 'Immersive resort showcase with room tariff guides, pool villa previews, check-in/out date calculators, and direct zero-commission booking.',
    highlights: ['Suite Showcase', 'Availability Calendar', 'Luxury Amenities'],
    features: ['Floating availability inquiry strip', 'Per-night tariff breakdown', 'Concierge WhatsApp direct desk'],
    icon: Building2,
  },
  {
    id: 'coaching',
    title: 'DreamIAS & Apex Career Academy',
    category: 'Educational & Coaching Portal',
    theme: 'High-Impact EdTech & Admissions Hub',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1000&q=80',
    description: 'Lead generation powerhouse for coaching centers featuring course fee calculators, syllabus PDF downloads, and counseling call bookings.',
    highlights: ['Course Fee Calculator', 'Syllabus PDF Request', 'Toppers Hall of Fame'],
    features: ['Upcoming batch countdowns', 'Single-click syllabus download', 'Admission counseling booking form'],
    icon: GraduationCap,
  },
  {
    id: 'gym',
    title: 'IronCore Elite Fitness & Gym',
    category: 'Gym & Fitness Studio Website',
    theme: 'High-Energy Athletic Power',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=80',
    description: 'High-conversion fitness website featuring monthly/annual membership cards, trainer bios, facility gallery, and 1-day free pass booking.',
    highlights: ['Membership Pricing', 'Trainer Profiles', '1-Day Free Trial Pass'],
    features: ['Interactive VIP day pass generator', 'Workout program guides', 'WhatsApp membership desk'],
    icon: Dumbbell,
  },
  {
    id: 'real-estate',
    title: 'Aura Prime Living & Estates',
    category: 'Real Estate & Builder Website',
    theme: 'Corporate Architectural Prestige',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
    description: 'Luxury real estate showcase featuring 2BHK/3BHK residential listings, RERA compliance badges, floor plans, and free cab site visit scheduling.',
    highlights: ['Interactive Listings', 'Virtual Tour CTA', 'Schedule Site Visit'],
    features: ['Filter by BHK & budget', 'Guided site visit booking form', 'WhatsApp brochure dispatch'],
    icon: Home,
  }
];

export const DemosSection: React.FC<DemosSectionProps> = ({ onOpenDemo, onOrderThisWebsite }) => {
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  const toggleFlip = (id: string) => {
    setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="demos" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-aurora-bg/95 border-t border-white/5">
      {/* Background Ambience & Aurora Grid */}
      <div className="absolute inset-0 aurora-grid opacity-25 pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[400px] bg-aurora-violet/15 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-aurora-surface border border-aurora-violet/40 text-aurora-amber text-xs font-semibold mb-4 shadow-[0_0_20px_rgba(124,92,255,0.25)]">
            <Laptop className="w-3.5 h-3.5 text-aurora-amber" />
            <span>Interactive Working Demonstrations</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            See What Your Business <br />
            <span className="headline-shimmer">
              Could Look Like Online.
            </span>
          </h2>
          <p className="text-aurora-muted text-base sm:text-lg mt-4 leading-relaxed">
            Every demo below is a fully functional web experience created by our design team. Click <strong>"View Demo"</strong> to test live menus, booking forms, WhatsApp workflows, and switch device viewports. Tap <strong>"Flip Card"</strong> to reveal architectural specs.
          </p>
        </div>

        {/* 6 Demos Grid with 3D Device Tilt & Card Flip */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {DEMO_CARDS.map((demo) => {
            const Icon = demo.icon;
            const isFlipped = !!flippedCards[demo.id];

            return (
              <div
                key={demo.id}
                className="group relative h-[560px] rounded-3xl"
                style={{ perspective: 1200 }}
              >
                {/* 3D Flippable Container */}
                <div
                  className="relative w-full h-full transition-transform duration-700 ease-out"
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  }}
                >
                  {/* ================= CARD FRONT (DEVICE MOCKUP FRAME) ================= */}
                  <div
                    className="absolute inset-0 rounded-3xl overflow-hidden border border-white/10 hover:border-aurora-amber/50 transition-all duration-300 flex flex-col justify-between bg-aurora-surface/95 shadow-2xl hover:-translate-y-2 group-hover:shadow-[0_20px_50px_rgba(7,7,13,0.9)]"
                    style={{
                      backfaceVisibility: 'hidden',
                      transformStyle: 'preserve-3d',
                    }}
                  >
                    <div>
                      {/* Laptop/Device Top Bezel Chrome */}
                      <div className="bg-aurora-elevated px-4 py-2.5 border-b border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                        </div>
                        <span className="text-[10px] font-mono text-aurora-muted truncate max-w-[150px]">
                          {demo.id}.nexora.tech
                        </span>
                        <button
                          onClick={() => toggleFlip(demo.id)}
                          className="flex items-center gap-1 text-[10px] text-aurora-amber hover:underline font-mono cursor-pointer"
                          title="Flip card for technical details"
                        >
                          <RotateCw className="w-3 h-3" />
                          <span>Specs</span>
                        </button>
                      </div>

                      {/* Image with overlay badge */}
                      <div className="relative h-56 overflow-hidden bg-gradient-to-br from-aurora-violet/20 to-aurora-surface bg-[#0A0C16]">
                        {/* Watermark fallback */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                          <Icon className="w-32 h-32 text-white/30 transform -rotate-12 translate-x-4 translate-y-2" />
                        </div>
                        <img 
                          src={demo.image} 
                          alt=""
                          aria-label={demo.title}
                          loading="lazy"
                          decoding="async"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.75]" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-aurora-surface via-transparent to-transparent pointer-events-none" />
                        
                        {/* Demo concept badge */}
                        <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-aurora-amber border border-aurora-amber/30 shadow-lg">
                          <span className="w-2 h-2 rounded-full bg-aurora-amber animate-pulse" />
                          <span>DEMO CONCEPT</span>
                        </div>

                        <div className="absolute top-3 right-3 w-8 h-8 rounded-xl bg-black/60 backdrop-blur-md flex items-center justify-center text-white border border-white/10 shadow-lg">
                          <Icon className="w-4 h-4 text-aurora-amber" />
                        </div>

                        <div className="absolute bottom-3 left-4 right-4">
                          <p className="text-[10px] text-aurora-violet font-semibold uppercase tracking-wider">
                            {demo.category}
                          </p>
                          <h3 className="font-display text-lg font-bold text-white">
                            {demo.title}
                          </h3>
                        </div>
                      </div>

                      {/* Body Content */}
                      <div className="p-6 pb-2">
                        <p className="text-xs text-aurora-muted leading-relaxed mb-4 line-clamp-2">
                          {demo.description}
                        </p>

                        {/* Features list */}
                        <div className="space-y-1.5 mb-4 pt-2 border-t border-white/5">
                          {demo.features.slice(0, 2).map((feat, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-aurora-text">
                              <CheckCircle2 className="w-3.5 h-3.5 text-aurora-amber shrink-0" />
                              <span className="truncate">{feat}</span>
                            </div>
                          ))}
                        </div>

                        {/* Highlights tags */}
                        <div className="flex flex-wrap gap-1.5">
                          {demo.highlights.map((h, i) => (
                            <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-aurora-muted border border-white/5 font-medium">
                              {h}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action Buttons */}
                    <div className="p-6 pt-0 grid grid-cols-2 gap-3 border-t border-white/10 mt-auto">
                      <button
                        onClick={() => onOpenDemo(demo.id)}
                        className="py-3 rounded-xl btn-glass-secondary text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 text-aurora-amber" />
                        <span>View Demo</span>
                      </button>

                      <button
                        onClick={() => onOrderThisWebsite(demo.id)}
                        className="py-3 rounded-xl btn-amber-cta text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>Order Design</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>

                  {/* ================= CARD BACK (3D FLIP SPEC SHEET) ================= */}
                  <div
                    className="absolute inset-0 rounded-3xl p-6 border border-aurora-violet/50 bg-aurora-elevated flex flex-col justify-between shadow-2xl text-left"
                    style={{
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                    }}
                  >
                    <div>
                      {/* Back Header */}
                      <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
                        <div className="flex items-center gap-2">
                          <Icon className="w-5 h-5 text-aurora-amber" />
                          <h4 className="font-display text-sm font-bold text-white uppercase tracking-wider">
                            Interactive Architecture
                          </h4>
                        </div>
                        <button
                          onClick={() => toggleFlip(demo.id)}
                          className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-aurora-amber cursor-pointer"
                          title="Flip Back to Preview"
                        >
                          <RotateCw className="w-4 h-4" />
                        </button>
                      </div>

                      <span className="text-[11px] font-mono text-aurora-violet uppercase tracking-wider block mb-1">
                        {demo.theme}
                      </span>
                      <p className="text-xs text-aurora-text leading-relaxed mb-4">
                        {demo.description}
                      </p>

                      <h5 className="text-[11px] font-bold text-aurora-muted uppercase tracking-wider mb-2">
                        Key Built-In Features:
                      </h5>
                      <ul className="space-y-2 mb-6">
                        {demo.features.map((feat, idx) => (
                          <li key={idx} className="text-xs text-aurora-text flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-aurora-amber shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="p-3 rounded-xl bg-aurora-surface border border-white/5 mb-4">
                        <div className="flex items-center gap-2 text-xs font-semibold text-aurora-amber mb-1">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Conversion Engine</span>
                        </div>
                        <p className="text-[11px] text-aurora-muted leading-relaxed">
                          Equipped with instant 1-tap WhatsApp consultation, mobile menu drawers, and responsive UI components.
                        </p>
                      </div>
                    </div>

                    {/* Back Actions */}
                    <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10">
                      <button
                        onClick={() => onOpenDemo(demo.id)}
                        className="py-3 rounded-xl btn-glass-secondary text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 text-aurora-amber" />
                        <span>Launch Demo</span>
                      </button>

                      <button
                        onClick={() => onOrderThisWebsite(demo.id)}
                        className="py-3 rounded-xl btn-amber-cta text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>Build Website</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default DemosSection;
