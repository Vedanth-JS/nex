import React from 'react';
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
  Laptop
} from 'lucide-react';
import { Card3D } from './3d/Card3D';
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
  accent: string;
}[] = [
  {
    id: 'restaurant',
    title: 'Savoria Fine Dining & Bistro',
    category: 'Restaurant & Cafe Website',
    theme: 'Dark Noir Luxury Aesthetic',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80',
    description: 'Michelin-star inspired dining experience with interactive categorized food menu, dish pricing, instant table reservations, and WhatsApp ordering.',
    highlights: ['Table Reservation Form', 'Filterable Food Menu', 'Chef Specialties'],
    features: ['Direct WhatsApp order triggers', 'Seasonal tasting menu cards', 'Instant reservation receipt confirmation'],
    icon: UtensilsCrossed,
    accent: 'from-amber-500/20 to-orange-500/10'
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
    accent: 'from-cyan-500/20 to-blue-500/10'
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
    accent: 'from-emerald-500/20 to-teal-500/10'
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
    accent: 'from-purple-500/20 to-indigo-500/10'
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
    accent: 'from-rose-500/20 to-red-500/10'
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
    accent: 'from-blue-500/20 to-cyan-500/10'
  }
];

export const DemosSection: React.FC<DemosSectionProps> = ({ onOpenDemo, onOrderThisWebsite }) => {
  return (
    <section id="demos" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-[#050816]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-4 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
            <Laptop className="w-3.5 h-3.5 text-emerald-400" />
            <span>Interactive Working Demonstrations</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            See What Your Business <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-300">
              Could Look Like Online.
            </span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed">
            Every demo below is a fully functional web experience created by our design team. Click <strong>"View Live Demo"</strong> to test live menus, booking forms, WhatsApp workflows, and switch device viewports.
          </p>
        </div>

        {/* 6 Demos Grid with 3D Tilt */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {DEMO_CARDS.map((demo) => {
            const Icon = demo.icon;
            return (
              <Card3D key={demo.id} intensity={12} glareOpacity={0.16}>
                <div
                  className="glass-card-3d rounded-3xl overflow-hidden border border-white/10 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group h-full bg-[#0a0f22]/95"
                >
                  <div>
                    {/* Image with overlay badge */}
                    <div className="relative h-56 overflow-hidden">
                      <img 
                        src={demo.image} 
                        alt={demo.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.75]" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f22] via-transparent to-transparent" />
                      
                      {/* Live working badge with 3D Depth */}
                      <div 
                        style={{ transform: 'translateZ(30px)' }}
                        className="absolute top-4 left-4 flex items-center gap-1.5 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-emerald-400 border border-emerald-500/30 shadow-lg"
                      >
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span>LIVE WORKING DEMO</span>
                      </div>

                      <div 
                        style={{ transform: 'translateZ(25px)' }}
                        className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-black/60 backdrop-blur-md flex items-center justify-center text-white border border-white/10 shadow-lg"
                      >
                        <Icon className="w-4 h-4 text-cyan-400" />
                      </div>

                      <div 
                        style={{ transform: 'translateZ(20px)' }}
                        className="absolute bottom-3 left-4 right-4"
                      >
                        <p className="text-[11px] text-cyan-400 font-semibold uppercase tracking-wider">
                          {demo.category}
                        </p>
                        <h3 className="font-display text-xl font-bold text-white">
                          {demo.title}
                        </h3>
                      </div>
                    </div>

                    {/* Body Content */}
                    <div style={{ transform: 'translateZ(15px)' }} className="p-6">
                      <p className="text-xs text-slate-300 leading-relaxed mb-4">
                        {demo.description}
                      </p>

                      {/* Features list */}
                      <div className="space-y-2 mb-6 pt-3 border-t border-white/5">
                        {demo.features.map((feat, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>

                      {/* Highlights tags */}
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {demo.highlights.map((h, i) => (
                          <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/5 font-medium">
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Action Buttons with 3D Popout */}
                  <div 
                    style={{ transform: 'translateZ(30px)' }}
                    className="p-6 pt-0 grid grid-cols-2 gap-3 border-t border-white/10 mt-auto"
                  >
                    <button
                      onClick={() => onOpenDemo(demo.id)}
                      className="py-3 rounded-xl bg-white/5 hover:bg-white/15 text-white text-xs font-bold flex items-center justify-center gap-1.5 border border-white/15 transition-all hover:border-cyan-400/50 shadow-sm"
                    >
                      <Eye className="w-3.5 h-3.5 text-cyan-400" />
                      <span>View Demo</span>
                    </button>

                    <button
                      onClick={() => onOrderThisWebsite(demo.id)}
                      className="py-3 rounded-xl gradient-button text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-lg shadow-purple-600/30"
                    >
                      <span>Order Design</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              </Card3D>
            );
          })}
        </div>

      </div>
    </section>
  );
};
