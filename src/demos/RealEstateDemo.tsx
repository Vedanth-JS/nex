import React, { useState } from 'react';
import { 
  Building, 
  MapPin, 
  Home, 
  CheckCircle2, 
  Sparkles, 
  Phone, 
  Maximize2, 
  Bed, 
  Bath, 
  Calendar,
  Compass
} from 'lucide-react';
import { getWhatsAppUrl } from '../utils/whatsapp';

interface Property {
  id: string;
  title: string;
  type: '2 BHK' | '3 BHK' | 'Penthouse' | 'Villa';
  price: string;
  location: string;
  carpetArea: string;
  status: string;
  image: string;
  features: string[];
}

const PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'The Skyline Sovereign Towers',
    type: '3 BHK',
    price: '₹1.45 Cr onwards',
    location: 'Sarjapur Main Road, Bengaluru',
    carpetArea: '1,840 sq.ft',
    status: 'Ready to Move / OC Received',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    features: ['Private Sundeck Balcony', 'Clubhouse with Rooftop Pool', 'Smart Home Automation', '2 Covered Car Parks']
  },
  {
    id: '2',
    title: 'Aura Whisper Valleys',
    type: 'Villa',
    price: '₹2.85 Cr onwards',
    location: 'Whitefield Extended, Bengaluru',
    carpetArea: '3,250 sq.ft',
    status: 'Under Construction (Possession 2027)',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80',
    features: ['Private Landscaped Garden', 'Double-Height Living Hall', 'EV Charging Point', '100% Vastu Compliant']
  },
  {
    id: '3',
    title: 'Elysium Urban Residences',
    type: '2 BHK',
    price: '₹82 Lakhs onwards',
    location: 'Electronic City Phase 1, Bengaluru',
    carpetArea: '1,190 sq.ft',
    status: 'New Launch • Pre-booking Open',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    features: ['Metro Station 500m Away', 'Zero Space Wastage Layout', 'Low Maintenance Community', 'Children Play Zone']
  }
];

export const RealEstateDemo: React.FC<{ onOrderThisWebsite?: () => void }> = ({ onOrderThisWebsite }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | '2 BHK' | '3 BHK' | 'Villa'>('all');
  const [buyerName, setBuyerName] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [selectedProperty, setSelectedProperty] = useState(PROPERTIES[0].title);
  const [visitDate, setVisitDate] = useState('2026-11-08');
  const [isBooked, setIsBooked] = useState(false);

  const filteredProperties = activeFilter === 'all'
    ? PROPERTIES
    : PROPERTIES.filter(p => p.type === activeFilter);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyerName || !buyerPhone) return;
    setIsBooked(true);
  };

  const handleWhatsAppChat = (propTitle?: string) => {
    const text = propTitle
      ? `Hello Aura Prime Estates! I would like to schedule a site visit and download the brochure for "${propTitle}".`
      : `Hello Aura Prime Estates! I'm looking for residential properties in Bengaluru. Please share available projects.`;
    window.open(getWhatsAppUrl(text), '_blank');
  };

  return (
    <div className="bg-[#080d1a] text-slate-100 font-sans min-h-screen selection:bg-blue-600 selection:text-white">
      {/* Top Banner */}
      <div className="bg-blue-950/40 border-b border-blue-900/40 px-6 py-2 text-xs flex justify-between items-center text-blue-200">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          <span>Demo preview: Premium Real Estate & Property Portal by Nexora Technologies</span>
        </div>
        {onOrderThisWebsite && (
          <button 
            onClick={onOrderThisWebsite}
            className="text-blue-300 hover:text-white font-semibold underline text-xs hidden sm:block"
          >
            Order Real Estate Website Design →
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="bg-[#080d1a]/90 backdrop-blur-md border-b border-slate-800 px-6 py-4 sticky top-0 z-20 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-blue-600/30 font-bold">
            <Building className="w-5 h-5" />
          </div>
          <div>
            <span className="font-extrabold text-lg text-white tracking-tight">AURA<span className="text-cyan-400">PRIME</span></span>
            <span className="block text-[10px] text-slate-400 tracking-wider uppercase font-semibold">LIVING & ESTATES</span>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-8 text-xs font-semibold text-slate-300">
          <a href="#projects" className="hover:text-cyan-400 transition-colors">Featured Projects</a>
          <a href="#amenities" className="hover:text-cyan-400 transition-colors">Amenities</a>
          <a href="#location" className="hover:text-cyan-400 transition-colors">Locations</a>
          <a href="#sitevisit" className="hover:text-cyan-400 transition-colors">Schedule Site Visit</a>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => handleWhatsAppChat()}
            className="text-xs px-3 py-2 rounded-lg bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-600/30 font-semibold hidden sm:flex items-center gap-1.5"
          >
            WhatsApp Sales Desk
          </button>
          <a 
            href="#sitevisit"
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-xs hover:brightness-110 transition-all shadow-lg shadow-blue-600/25"
          >
            Book Free Site Visit
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-16 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-950/30 via-[#080d1a] to-[#080d1a] -z-10" />
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 text-cyan-300 text-xs font-medium mb-6">
              <Compass className="w-3.5 h-3.5 text-cyan-400" />
              <span>RERA Registered Luxury Residential Communities</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-6 tracking-tight">
              Find Your Sanctuary In <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Prime Locations.</span>
            </h1>
            <p className="text-slate-300 text-base leading-relaxed mb-8 max-w-xl">
              Explore thoughtfully planned 2BHK, 3BHK, and private luxury villas built with top-tier construction standards, green landscapes, and seamless city connectivity.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-8">
              <a 
                href="#sitevisit"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-sm hover:brightness-110 transition-all shadow-xl shadow-blue-600/30"
              >
                Schedule Free Site Cab Visit →
              </a>
              <a 
                href="#projects"
                className="px-6 py-3.5 rounded-xl border border-slate-700 bg-slate-900/60 text-slate-200 hover:text-white font-semibold text-sm transition-all"
              >
                Browse Projects
              </a>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800 text-xs">
              <div>
                <p className="text-xl font-bold text-cyan-400">100%</p>
                <p className="text-slate-400">RERA Compliant</p>
              </div>
              <div>
                <p className="text-xl font-bold text-blue-400">2,400+</p>
                <p className="text-slate-400">Happy Families</p>
              </div>
              <div>
                <p className="text-xl font-bold text-emerald-400">0%</p>
                <p className="text-slate-400">Brokerage Direct</p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-3xl overflow-hidden border border-slate-700 shadow-2xl shadow-blue-950/50 bg-slate-900">
              <img 
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=700&q=80" 
                alt="Modern luxury house" 
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080d1a] via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md border border-slate-700 p-4 rounded-2xl flex items-center justify-between">
                <div>
                  <p className="text-xs text-cyan-400 font-semibold">Featured Masterpiece</p>
                  <p className="text-sm font-bold text-white">The Skyline Sovereign Towers</p>
                  <p className="text-[11px] text-slate-300">Sarjapur Road • ₹1.45 Cr onwards</p>
                </div>
                <button 
                  onClick={() => handleWhatsAppChat('The Skyline Sovereign Towers')}
                  className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors"
                >
                  Brochure
                </button>
              </div>
            </div>
          </div>

        </div>
      </header>

      {/* Projects Grid */}
      <section id="projects" className="py-16 px-6 max-w-6xl mx-auto border-t border-slate-800">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-cyan-400 text-xs uppercase tracking-widest font-semibold">Curated Portfolio</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Prime Residential Communities</h2>
          </div>
          {/* Filters */}
          <div className="flex flex-wrap gap-2 mt-6 md:mt-0">
            {(['all', '2 BHK', '3 BHK', 'Villa'] as const).map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                  activeFilter === filter
                    ? 'bg-blue-600 text-white font-bold'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredProperties.map(prop => (
            <div 
              key={prop.id}
              className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative h-52 overflow-hidden">
                  <img 
                    src={prop.image} 
                    alt={prop.title} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-sm px-2.5 py-1 rounded text-xs font-bold text-cyan-300">
                    {prop.type}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-blue-600 text-white px-2.5 py-1 rounded text-xs font-bold shadow-md">
                    {prop.price}
                  </div>
                </div>
                <div className="p-6">
                  <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                    {prop.status}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-2">{prop.title}</h3>
                  <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{prop.location}</span>
                  </p>
                  <p className="text-xs text-slate-300 font-medium mt-2">
                    Carpet Area: {prop.carpetArea}
                  </p>

                  <ul className="mt-4 pt-3 border-t border-slate-800 space-y-1.5">
                    {prop.features.map((f, i) => (
                      <li key={i} className="text-[11px] text-slate-300 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-cyan-400 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-6 pt-0 flex gap-2">
                <button 
                  onClick={() => handleWhatsAppChat(prop.title)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-700 hover:border-cyan-400 text-xs font-semibold text-slate-200 hover:text-cyan-300 transition-colors"
                >
                  WhatsApp Layout
                </button>
                <a 
                  href="#sitevisit"
                  onClick={() => setSelectedProperty(prop.title)}
                  className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold text-center transition-colors"
                >
                  Book Visit
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Schedule Site Visit Form */}
      <section id="sitevisit" className="py-16 px-6 max-w-4xl mx-auto border-t border-slate-800">
        <div className="bg-slate-900 border border-blue-900/40 rounded-3xl p-6 sm:p-10 shadow-2xl">
          <div className="text-center mb-8">
            <span className="text-cyan-400 text-xs uppercase tracking-widest font-semibold">Complimentary Cab Pickup</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Schedule Guided Site Visit</h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1">
              Visit our sample model apartments with a dedicated property advisor.
            </p>
          </div>

          {isBooked ? (
            <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-2xl p-8 text-center text-emerald-200">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
              <h3 className="text-xl font-bold text-white mb-1">Site Visit Confirmed!</h3>
              <p className="text-xs text-slate-300 max-w-md mx-auto mb-4">
                Thank you, {buyerName}. We have reserved your guided tour for <strong>{selectedProperty}</strong> on {visitDate}. Our sales team will call {buyerPhone} to confirm your cab pickup location.
              </p>
              <button 
                onClick={() => setIsBooked(false)}
                className="text-xs text-cyan-400 underline font-semibold"
              >
                Schedule another project visit
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Your Name *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Sanjeev Hegde"
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    className="w-full bg-[#131b2e] border border-slate-700 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Phone Number *</label>
                  <input 
                    type="tel" 
                    required
                    placeholder="+91 98765 43210"
                    value={buyerPhone}
                    onChange={(e) => setBuyerPhone(e.target.value)}
                    className="w-full bg-[#131b2e] border border-slate-700 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Select Project</label>
                  <select 
                    value={selectedProperty}
                    onChange={(e) => setSelectedProperty(e.target.value)}
                    className="w-full bg-[#131b2e] border border-slate-700 rounded-xl px-3 py-3 text-xs text-white focus:outline-none focus:border-cyan-500"
                  >
                    {PROPERTIES.map(p => (
                      <option key={p.id} value={p.title}>{p.title} ({p.type})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Preferred Visit Date</label>
                  <input 
                    type="date"
                    value={visitDate}
                    onChange={(e) => setVisitDate(e.target.value)}
                    className="w-full bg-[#131b2e] border border-slate-700 rounded-xl px-3 py-3 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-sm tracking-wide hover:brightness-110 transition-all shadow-xl shadow-blue-600/30 mt-3"
              >
                Confirm Site Visit Booking
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-800 bg-[#050914] text-center text-xs text-slate-400">
        <p className="font-extrabold text-white mb-1">AURA PRIME LIVING & ESTATES</p>
        <p className="text-[11px]">Outer Ring Road, Bellandur, Bengaluru, Karnataka</p>
        <p className="text-[10px] text-slate-400 mt-2">Real Estate Demo Website Crafted by Nexora Technologies</p>
      </footer>
    </div>
  );
};
