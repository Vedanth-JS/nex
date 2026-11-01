import React, { useState } from 'react';
import { 
  Building2, 
  Calendar, 
  Users, 
  MapPin, 
  CheckCircle2, 
  Star, 
  Wifi, 
  Coffee, 
  Waves, 
  Sparkles,
  PhoneCall
} from 'lucide-react';
import { getWhatsAppUrl } from '../utils/whatsapp';

interface SuiteRoom {
  id: string;
  name: string;
  tagline: string;
  pricePerNight: string;
  size: string;
  view: string;
  image: string;
  amenities: string[];
}

const SUITES: SuiteRoom[] = [
  {
    id: '1',
    name: 'Kohinoor Royal Pool Villa',
    tagline: 'Private infinity pool overlooking serene valley waters',
    pricePerNight: '₹18,500',
    size: '1,450 sq.ft',
    view: 'Panoramic Lake View',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    amenities: ['Private Infinity Pool', '24/7 Butler Service', 'Jacuzzi', 'Breakfast Included']
  },
  {
    id: '2',
    name: 'Heritage Courtyard Pavilion',
    tagline: 'Traditional sandstone architecture with contemporary luxuries',
    pricePerNight: '₹12,800',
    size: '950 sq.ft',
    view: 'Royal Courtyard & Fountains',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    amenities: ['King Sized Canopy Bed', 'Deep Soaking Tub', 'Complimentary High Tea']
  },
  {
    id: '3',
    name: 'Palace Premiere Suite',
    tagline: 'Expansive private balcony with teakwood sun loungers',
    pricePerNight: '₹8,900',
    size: '680 sq.ft',
    view: 'Lush Botanical Gardens',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
    amenities: ['Garden Patio', 'High-Speed Wi-Fi', 'Espresso Machine']
  }
];

export const HotelDemo: React.FC<{ onOrderThisWebsite?: () => void }> = ({ onOrderThisWebsite }) => {
  const [checkIn, setCheckIn] = useState('2026-11-10');
  const [checkOut, setCheckOut] = useState('2026-11-13');
  const [guests, setGuests] = useState('2 Adults, 1 Room');
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [selectedSuite, setSelectedSuite] = useState(SUITES[0].name);
  const [isReserved, setIsReserved] = useState(false);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !guestPhone) return;
    setIsReserved(true);
  };

  const handleWhatsAppEnquiry = (suiteName?: string) => {
    const text = suiteName 
      ? `Hello The Grand Oberoi Palace! I'm interested in booking the "${suiteName}" from ${checkIn} to ${checkOut}. Please share tariff & availability.`
      : `Hello The Grand Oberoi Palace! I want to check room availability for ${guests} from ${checkIn} to ${checkOut}.`;
    window.open(getWhatsAppUrl(text), '_blank');
  };

  return (
    <div className="bg-[#0a0f1d] text-slate-100 font-sans min-h-screen selection:bg-amber-500 selection:text-slate-950">
      {/* Top Banner */}
      <div className="bg-[#12182b] border-b border-amber-600/20 px-6 py-2 text-xs flex justify-between items-center text-amber-200">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Demo preview: Ultra-luxury heritage resort template by Nexora Technologies</span>
        </div>
        {onOrderThisWebsite && (
          <button 
            onClick={onOrderThisWebsite}
            className="text-amber-400 hover:text-amber-300 font-semibold underline text-xs hidden sm:block"
          >
            Order Hotel Website Design →
          </button>
        )}
      </div>

      {/* Luxury Nav */}
      <nav className="bg-[#0a0f1d]/90 backdrop-blur-md border-b border-white/10 px-6 py-4 sticky top-0 z-20 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full border border-amber-400/40 flex items-center justify-center text-amber-300 font-serif font-bold text-sm">
            O
          </div>
          <div>
            <span className="font-serif tracking-widest text-lg font-bold text-white uppercase">The Grand Oberoi</span>
            <span className="block text-[10px] tracking-widest uppercase text-amber-400 font-medium">Palace & Luxury Resort</span>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-8 text-xs uppercase tracking-widest text-slate-300">
          <a href="#villas" className="hover:text-amber-400 transition-colors">Villas & Suites</a>
          <a href="#experiences" className="hover:text-amber-400 transition-colors">Experiences</a>
          <a href="#dining" className="hover:text-amber-400 transition-colors">Fine Dining</a>
          <a href="#booking" className="hover:text-amber-400 transition-colors">Check Tariff</a>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => handleWhatsAppEnquiry()}
            className="text-xs px-3 py-2 rounded-lg bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-600/30 font-semibold hidden sm:block"
          >
            WhatsApp Concierge
          </button>
          <a 
            href="#booking"
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-lg shadow-amber-500/20"
          >
            Book Directly
          </a>
        </div>
      </nav>

      {/* Hero with Oberoi style */}
      <header className="relative min-h-[520px] flex items-center justify-center px-6 py-16 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80" 
          alt="Luxury Resort Pool Villa" 
          className="absolute inset-0 w-full h-full object-cover brightness-[0.45]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1d] via-transparent to-black/40" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-500/40 text-amber-300 text-xs font-medium mb-6">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>Condé Nast Traveler Gold List Award 2026</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-light text-white tracking-wide leading-tight mb-4">
            Where Luxury Is A <span className="italic font-normal text-amber-300">Way Of Life</span>
          </h1>
          <p className="text-slate-200 text-sm sm:text-base font-light max-w-2xl mx-auto mb-10 leading-relaxed drop-shadow">
            Indulge in magnificent palace courtyards, private plunge pools, royal spa sanctuaries, and bespoke culinary journeys in the heart of royal heritage.
          </p>

          {/* Availability Floating Strip */}
          <div className="bg-[#0f172a]/95 backdrop-blur-md border border-amber-500/30 rounded-2xl p-4 sm:p-5 shadow-2xl max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-4 gap-3 text-left">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-amber-300 mb-1">Check In</label>
              <input 
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full bg-[#1e293b] border border-slate-700 rounded-lg px-2.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-amber-300 mb-1">Check Out</label>
              <input 
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full bg-[#1e293b] border border-slate-700 rounded-lg px-2.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-amber-300 mb-1">Guests</label>
              <select 
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full bg-[#1e293b] border border-slate-700 rounded-lg px-2.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
              >
                <option value="1 Adult, 1 Room">1 Adult, 1 Room</option>
                <option value="2 Adults, 1 Room">2 Adults, 1 Room</option>
                <option value="2 Adults, 2 Children">2 Adults, 2 Children</option>
                <option value="4 Adults, 2 Rooms">4 Adults, 2 Rooms</option>
              </select>
            </div>
            <div className="flex items-end">
              <a 
                href="#booking"
                className="w-full py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-400 hover:brightness-110 text-slate-950 font-bold text-xs uppercase tracking-wider text-center transition-all shadow-lg shadow-amber-500/20"
              >
                Check Tariff
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Suites Showcase */}
      <section id="villas" className="py-20 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-amber-400 text-xs uppercase tracking-widest font-semibold">Accommodations</span>
          <h2 className="font-serif text-3xl sm:text-4xl text-white font-light mt-1">Palatial Suites & Villas</h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-2 max-w-lg mx-auto">
            Book directly through our website to enjoy best rate guarantee, complimentary breakfast, and flexible cancellation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SUITES.map(suite => (
            <div 
              key={suite.id}
              className="bg-[#111827]/80 border border-slate-800 rounded-2xl overflow-hidden hover:border-amber-500/50 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={suite.image} 
                    alt={suite.name} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-sm px-2.5 py-1 rounded text-xs font-serif font-bold text-amber-300">
                    {suite.pricePerNight} <span className="text-[10px] font-sans font-normal text-slate-400">/ night</span>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-xs text-amber-400 font-semibold uppercase tracking-wider">{suite.view}</p>
                  <h3 className="font-serif text-xl font-bold text-white mt-1">{suite.name}</h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">{suite.tagline}</p>
                  
                  <div className="mt-4 pt-4 border-t border-slate-800 flex flex-wrap gap-2">
                    {suite.amenities.map((am, i) => (
                      <span key={i} className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        {am}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 flex gap-2">
                <button 
                  onClick={() => handleWhatsAppEnquiry(suite.name)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-700 hover:border-amber-400 text-xs font-semibold text-slate-200 hover:text-amber-300 transition-colors"
                >
                  WhatsApp Tariff
                </button>
                <a 
                  href="#booking"
                  onClick={() => setSelectedSuite(suite.name)}
                  className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold text-center transition-colors"
                >
                  Reserve Suite
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Booking Form Section */}
      <section id="booking" className="py-16 px-6 max-w-4xl mx-auto border-t border-slate-800">
        <div className="bg-[#111827] border border-amber-600/30 rounded-3xl p-8 sm:p-10 shadow-2xl">
          <div className="text-center mb-8">
            <span className="text-amber-400 text-xs uppercase tracking-widest font-semibold">Direct Reservation Desk</span>
            <h2 className="font-serif text-2xl sm:text-3xl text-white font-light mt-1">Book Your Luxury Stay</h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Zero booking commission • Guaranteed best room allocation
            </p>
          </div>

          {isReserved ? (
            <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-2xl p-8 text-center text-emerald-200">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
              <h3 className="text-xl font-serif font-bold text-white mb-1">Reservation Request Placed!</h3>
              <p className="text-xs text-slate-300 max-w-md mx-auto mb-4">
                Thank you, {guestName}. Your reservation request for <strong>{selectedSuite}</strong> from {checkIn} to {checkOut} ({guests}) has been logged. Our concierge will contact you at {guestPhone}.
              </p>
              <button 
                onClick={() => setIsReserved(false)}
                className="text-xs text-amber-400 underline font-semibold"
              >
                Book another room
              </button>
            </div>
          ) : (
            <form onSubmit={handleBooking} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Guest Name *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Vikramaditya Rao"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full bg-[#1e293b] border border-slate-700 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Phone Number *</label>
                  <input 
                    type="tel" 
                    required
                    placeholder="+91 98765 43210"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    className="w-full bg-[#1e293b] border border-slate-700 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Selected Suite</label>
                  <select 
                    value={selectedSuite}
                    onChange={(e) => setSelectedSuite(e.target.value)}
                    className="w-full bg-[#1e293b] border border-slate-700 rounded-xl px-3 py-3 text-xs text-white focus:outline-none focus:border-amber-400"
                  >
                    {SUITES.map(s => (
                      <option key={s.id} value={s.name}>{s.name} ({s.pricePerNight})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Check In</label>
                  <input 
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full bg-[#1e293b] border border-slate-700 rounded-xl px-3 py-3 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Check Out</label>
                  <input 
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full bg-[#1e293b] border border-slate-700 rounded-xl px-3 py-3 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 font-bold text-sm uppercase tracking-wider hover:brightness-110 transition-all shadow-xl shadow-amber-500/20 mt-3"
              >
                Submit Direct Stay Request
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-800 bg-[#080d19] text-center text-xs text-slate-400">
        <p className="font-serif text-sm font-bold text-amber-300 mb-1">THE GRAND OBEROI PALACE & RESORT</p>
        <p className="text-[11px]">Udaivilas Road, Haridas Ji Ki Magri, Udaipur, Rajasthan</p>
        <p className="text-[10px] text-slate-400 mt-2">Luxury Resort Demo Website Designed & Built by Nexora Technologies</p>
      </footer>
    </div>
  );
};
