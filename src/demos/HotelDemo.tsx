import React, { useState, useMemo } from 'react';
import { 
  Sparkles, Star, MapPin, Calendar, ChevronLeft, ChevronRight, Check, X, 
  CheckCircle2, Download, ArrowRight, SlidersHorizontal, Sparkle, MessageCircle 
} from 'lucide-react';
import { 
  formatINR, calcNights, todayStr, addDays, generateICS, downloadICS, isValidPhone 
} from './shared/utils';
import { useToast } from './shared/hooks';
import { useDemoState } from './shared/DemoStateContext';
import { 
  DemoBadge, ToastContainer, WhatsAppButton, SkeletonImage, DemoFormNote, FieldError, Stepper, AccordionItem,
  DemoMobileBottomBar
} from './shared/components';
import { getWhatsAppUrl } from '../utils/whatsapp';

interface Suite {
  id: string;
  name: string;
  tagline: string;
  price: number;
  size: string;
  view: string;
  amenities: string[];
  images: string[];
}

const SUITES: Suite[] = [
  { 
    id: '1', 
    name: 'The Grand Royal Villa', 
    tagline: 'Private infinity plunge pool overlooking Pichola waters with dedicated royal butler',
    price: 18500, 
    size: '1,450 sq.ft', 
    view: 'Panoramic Lake & Aravali Hills', 
    amenities: ['Private Pool', 'Butler', 'Jacuzzi', 'Breakfast', 'Soaking Tub'], 
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=70',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&q=70',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=70'
    ] 
  },
  { 
    id: '2', 
    name: 'Deluxe Heritage Palace Suite', 
    tagline: 'Traditional sandstone archways paired with bespoke antique teakwood handcrafted luxuries',
    price: 12800, 
    size: '950 sq.ft', 
    view: 'Royal Courtyard & Fountains', 
    amenities: ['Canopy Bed', 'Soaking Tub', 'High Tea', 'Wi-Fi', 'Espresso'], 
    images: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=70',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&q=70',
      'https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?w=600&q=70'
    ] 
  },
  { 
    id: '3', 
    name: 'Presidential Penthouse', 
    tagline: 'Crown jewel top-floor residence with 360-degree glass rotunda and private rooftop sun-deck',
    price: 24500, 
    size: '2,100 sq.ft', 
    view: '360° Lake, Fort & Botanical Gardens', 
    amenities: ['Private Rooftop', 'Butler', 'Jacuzzi', 'Breakfast', 'Mini Bar', 'High Tea'], 
    images: [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&q=70',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=70',
      'https://images.unsplash.com/photo-1560185009-5bf9f2849488?w=600&q=70'
    ] 
  },
];

const ALL_AMENITIES = ['Private Pool', 'Butler', 'Jacuzzi', 'Breakfast', 'Canopy Bed', 'Soaking Tub', 'High Tea', 'Wi-Fi', 'Garden Patio', 'Espresso', 'Mini Bar'];
const NEARBY_ATTRACTIONS = [
  { name: 'City Palace', dist: '4 km', emoji: '🏯', desc: 'Historic 16th-century royal palace complex overlooking Lake Pichola with majestic courtyards.' },
  { name: 'Local Spice Market', dist: '1.5 km', emoji: '🌶️', desc: 'Ancient artisanal bazaar offering organic saffron, royal chai blends, and silvercraft.' },
  { name: 'Heritage Lake', dist: '2 km', emoji: '🏞️', desc: 'Tranquil sunset boat cruises with stunning panoramic views of Jag Mandir Island.' },
];

export const HotelDemo: React.FC<{ onOrderThisWebsite?: () => void; onBackToMain?: () => void }> = ({ onOrderThisWebsite, onBackToMain }) => {
  const { toasts, show: showToast, dismiss: dismissToast } = useToast();
  const { toast, triggerSimulatedDispatch, playChime } = useDemoState();
  const [checkIn, setCheckIn] = useState(addDays(todayStr(), 1));
  const [checkOut, setCheckOut] = useState(addDays(todayStr(), 4));
  const [guests, setGuests] = useState(2);
  const [rooms, setRooms] = useState(1);
  const [, setShowAvailabilityState] = useState(false);

  const [activeImageIdx, setActiveImageIdx] = useState<Record<string, number>>({});
  const [comparedSuiteIds, setComparedSuiteIds] = useState<string[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [lightboxData, setLightboxData] = useState<{ images: string[]; activeIdx: number; title: string } | null>(null);

  const [bookingSuite, setBookingSuite] = useState<Suite | null>(null);
  const [bookingStep, setBookingStep] = useState<1 | 2 | 3 | 4>(1);
  const [bookingToken, setBookingToken] = useState('');
  const [addOns, setAddOns] = useState({ breakfast: false, airportPickup: false, spaPackage: false });
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [formErrors, setFormErrors] = useState<{ name?: string; phone?: string; email?: string }>({});

  const nights = useMemo(() => Math.max(1, calcNights(checkIn, checkOut)), [checkIn, checkOut]);
  const isWeekend = useMemo(() => {
    const day = new Date(checkIn + 'T00:00:00').getDay();
    return day === 5 || day === 6;
  }, [checkIn]);
  const seasonalMultiplier = isWeekend ? 1.15 : 1.0;

  const handleCheckInChange = (newDate: string) => {
    setCheckIn(newDate);
    if (newDate >= checkOut) setCheckOut(addDays(newDate, 3));
  };

  const handleCheckOutChange = (newDate: string) => {
    if (newDate <= checkIn) {
      showToast('Check-out date must be after check-in', 'error');
      return;
    }
    setCheckOut(newDate);
  };

  const handlePrevImage = (suiteId: string, count: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIdx(p => ({ ...p, [suiteId]: ((p[suiteId] ?? 0) - 1 + count) % count }));
  };

  const handleNextImage = (suiteId: string, count: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIdx(p => ({ ...p, [suiteId]: ((p[suiteId] ?? 0) + 1) % count }));
  };

  const toggleCompare = (suiteId: string) => {
    if (comparedSuiteIds.includes(suiteId)) {
      const next = comparedSuiteIds.filter(id => id !== suiteId);
      setComparedSuiteIds(next);
      if (next.length === 0) setIsCompareOpen(false);
      showToast('Suite removed from comparison', 'info');
    } else {
      if (comparedSuiteIds.length >= 2) {
        showToast('You can compare a maximum of 2 suites at once', 'error');
        return;
      }
      const next = [...comparedSuiteIds, suiteId];
      setComparedSuiteIds(next);
      showToast(`Added to compare (${next.length}/2)`, 'success');
      if (next.length === 2) setIsCompareOpen(true);
    }
  };

  const suiteNightlyRate = bookingSuite ? Math.round(bookingSuite.price * seasonalMultiplier) : 0;
  const roomBaseTotal = suiteNightlyRate * nights * rooms;
  const breakfastCost = addOns.breakfast ? 800 * guests * nights : 0;
  const pickupCost = addOns.airportPickup ? 1500 : 0;
  const spaCost = addOns.spaPackage ? 3500 : 0;
  const addOnsTotal = breakfastCost + pickupCost + spaCost;
  const subtotal = roomBaseTotal + addOnsTotal;
  const taxGST = Math.round(subtotal * 0.12);
  const grandTotal = subtotal + taxGST;

  const startBooking = (suite: Suite) => {
    setBookingSuite(suite);
    setBookingStep(1);
    setAddOns({ breakfast: false, airportPickup: false, spaPackage: false });
    setFormErrors({});
    setIsCompareOpen(false);
  };

  const validateGuestForm = () => {
    const errs: { name?: string; phone?: string; email?: string } = {};
    if (!guestName.trim() || guestName.trim().length < 2) errs.name = 'Please enter your full name (min 2 characters)';
    if (!guestPhone.trim() || !isValidPhone(guestPhone)) errs.phone = 'Please enter a valid 10-digit Indian phone number';
    if (!guestEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(guestEmail)) errs.email = 'Please enter a valid email address';
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleConfirmReservation = () => {
    const token = `NX-GOP-${Math.floor(1000 + Math.random() * 9000)}`;
    setBookingToken(token);
    setBookingStep(4);
    playChime('success');
    toast.success(`Booking Reference #${token} confirmed! Suite ${bookingSuite?.name} reserved for ${nights} nights.`, 'Stay Reserved');
    triggerSimulatedDispatch('whatsapp', {
      recipient: guestPhone,
      title: `Palace Stay Reference #${token}`,
      token
    });
  };

  const handleDownloadICS = () => {
    if (!bookingSuite) return;
    const ics = generateICS({
      title: `Stay at Royal Heritage Resort - ${bookingSuite.name}`,
      description: `Reservation #${bookingToken} for ${guestName}. ${nights} night stay in ${bookingSuite.name}. Total: ${formatINR(grandTotal)}. Requests: ${specialRequests || 'None'}.`,
      location: 'Royal Heritage Resort, Lake Pichola Waterfront, Udaipur, Rajasthan, India',
      startDate: checkIn,
      startTime: '14:00',
      durationMins: nights * 24 * 60,
    });
    downloadICS(`Royal-Heritage-Resort-${bookingToken}.ics`, ics);
    showToast('Calendar reservation (.ics) downloaded', 'info');
  };

  const whatsappMessage = bookingSuite
    ? `Hello Royal Heritage Resort Concierge! I have confirmed reservation #${bookingToken} for ${bookingSuite.name} from ${checkIn} to ${checkOut} (${nights} nights, ${guests} guests). Guest: ${guestName} (${guestPhone}). Total: ${formatINR(grandTotal)}.`
    : `Hello Royal Heritage Resort! I would like to inquire about room availability from ${checkIn} to ${checkOut} for ${guests} guests.`;

  return (
    <div className="bg-[#0a0f1d] text-slate-100 font-sans min-h-screen selection:bg-amber-500 selection:text-slate-950 pb-24 md:pb-0">
      <ToastContainer toasts={toasts} dismiss={dismissToast} />

      {/* Branded Demo Concept Tag in Normal Flow at Top */}
      <DemoBadge />

      {/* Top Demo Bar (Desktop only) */}
      <div className="hidden md:flex bg-[#0e1628] border-b border-amber-500/20 px-4 sm:px-6 py-2 text-xs justify-between items-center text-amber-200/90">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span className="truncate">Nexora Showcase: Ultra-Luxury Palace Resort & Live Reservation Engine</span>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          {onBackToMain && <button onClick={onBackToMain} className="text-slate-400 hover:text-white transition-colors text-xs hidden md:inline">← Main Portfolio</button>}
          {onOrderThisWebsite && <button onClick={onOrderThisWebsite} className="text-amber-400 hover:text-amber-300 font-semibold underline text-xs">Order This Website →</button>}
        </div>
      </div>

      {/* Sticky Header: Nav + Availability Bar */}
      <header className="sticky top-0 z-40 bg-[#0a0f1d]/95 backdrop-blur-md border-b border-amber-500/20 shadow-2xl">
        <nav className="px-4 sm:px-6 py-3 flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-amber-400/50 bg-gradient-to-br from-amber-400/20 to-transparent flex items-center justify-center text-amber-300 font-serif font-bold text-xs sm:text-sm shadow-inner shadow-amber-400/20 shrink-0">
              RHR
            </div>
            <div className="min-w-0">
              <span className="font-serif tracking-wide sm:tracking-widest text-base sm:text-lg font-bold text-white uppercase block leading-none truncate">Royal Heritage Resort</span>
              <span className="text-[10px] tracking-wide uppercase text-amber-400/90 font-medium mt-0.5 block truncate">Palace & Lakeview Sanctuary · Udaipur</span>
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-7 text-xs uppercase tracking-widest text-slate-300">
            <a href="#suites" className="hover:text-amber-400 transition-colors">Palace Suites</a>
            <a href="#attractions" className="hover:text-amber-400 transition-colors">Attractions</a>
            <a href="#faq" className="hover:text-amber-400 transition-colors">Guest FAQ</a>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <WhatsAppButton message="Hello Royal Heritage Resort! I would like to inquire about suite availability and royal packages." label="WhatsApp Concierge" size="sm" className="hidden sm:inline-flex" />
            <a href="#suites" className="hidden sm:inline-flex px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-md shadow-amber-500/20">Book Stay</a>
          </div>
        </nav>

        {/* Sticky Availability Bar */}
        <div className="border-t border-white/10 bg-[#0d1424]/95 px-4 sm:px-6 py-2.5 text-xs">
          {/* Desktop view (>= md) */}
          <div className="hidden md:flex max-w-7xl mx-auto flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="text-slate-400 text-[11px] uppercase tracking-wider font-semibold">Dates:</span>
                <input type="date" value={checkIn} min={todayStr()} onChange={(e) => handleCheckInChange(e.target.value)} className="bg-[#172136] border border-slate-700/80 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-amber-400" aria-label="Check-in date" />
                <span className="text-slate-500">→</span>
                <input type="date" value={checkOut} min={addDays(checkIn, 1)} onChange={(e) => handleCheckOutChange(e.target.value)} className="bg-[#172136] border border-slate-700/80 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-amber-400" aria-label="Check-out date" />
                <span className="px-2 py-0.5 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 font-bold text-[11px]">{nights} {nights === 1 ? 'Night' : 'Nights'}</span>
              </div>
              <div className="flex items-center gap-3">
                <Stepper label="Guests" value={guests} min={1} max={6} onChange={setGuests} />
                <Stepper label="Rooms" value={rooms} min={1} max={4} onChange={setRooms} />
              </div>
              {isWeekend && (
                <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-950/70 border border-amber-500/40 text-[11px] text-amber-300">
                  <Sparkle className="w-3 h-3 text-amber-400 fill-amber-400" />
                  <span>Weekend Tariff (+15% seasonal uplift active)</span>
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={() => {
                setShowAvailabilityState(true);
                showToast(`Rates updated for ${nights} nights (${guests} guests, ${rooms} room${rooms > 1 ? 's' : ''})`, 'success');
                document.getElementById('suites')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-md shadow-amber-500/25 flex items-center gap-1.5 cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Check Availability</span>
            </button>
          </div>

          {/* Mobile Phone View (< md): Clean stacked booking card */}
          <div className="md:hidden space-y-3">
            {/* Dates row: two equal date inputs side by side with arrow */}
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-400 block">Check-in</label>
                <input
                  type="date"
                  value={checkIn}
                  min={todayStr()}
                  onChange={(e) => handleCheckInChange(e.target.value)}
                  className="w-full bg-[#172136] border border-slate-700/80 rounded-xl px-2.5 py-2 text-base text-white focus:outline-none focus:border-amber-400"
                  aria-label="Check-in date"
                />
              </div>
              <span className="text-slate-400 mt-4 font-bold">→</span>
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-400 block">Check-out</label>
                <input
                  type="date"
                  value={checkOut}
                  min={addDays(checkIn, 1)}
                  onChange={(e) => handleCheckOutChange(e.target.value)}
                  className="w-full bg-[#172136] border border-slate-700/80 rounded-xl px-2.5 py-2 text-base text-white focus:outline-none focus:border-amber-400"
                  aria-label="Check-out date"
                />
              </div>
            </div>

            {/* Full-width X nights label */}
            <div className="w-full py-1.5 text-center rounded-lg bg-amber-400/15 border border-amber-400/30 text-amber-300 font-bold text-xs">
              {nights} {nights === 1 ? 'Night' : 'Nights'} Selected {isWeekend ? '· Weekend Rate (+15%)' : ''}
            </div>

            {/* Guests and Rooms: two separate rows with steppers right-aligned */}
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 rounded-xl bg-[#141d30] border border-white/5">
                <span className="text-xs font-semibold text-slate-200">Guests</span>
                <Stepper label="" value={guests} min={1} max={6} onChange={setGuests} />
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-[#141d30] border border-white/5">
                <span className="text-xs font-semibold text-slate-200">Suites / Rooms</span>
                <Stepper label="" value={rooms} min={1} max={4} onChange={setRooms} />
              </div>
            </div>

            {/* Check availability: full-width button */}
            <button
              type="button"
              onClick={() => {
                setShowAvailabilityState(true);
                showToast(`Rates updated for ${nights} nights (${guests} guests, ${rooms} room${rooms > 1 ? 's' : ''})`, 'success');
                document.getElementById('suites')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full h-11 min-h-[44px] rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 active:scale-[0.98] transition-all shadow-md shadow-amber-500/25 flex items-center justify-center gap-2 cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Check Availability & Rates</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[500px] flex items-center justify-center px-4 sm:px-6 py-16 sm:py-20 overflow-hidden text-center">
        <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80" alt="Royal Heritage Resort Luxury Villa" className="absolute inset-0 w-full h-full object-cover brightness-[0.38] scale-105 transition-transform duration-1000" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1d] via-[#0a0f1d]/50 to-black/60" />
        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Honesty cleanup: Neutral sample concept instead of fake Conde Nast award */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/70 border border-amber-400/40 text-amber-300 text-xs font-medium mb-5 shadow-lg max-w-full">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 shrink-0" />
            <span className="truncate">Heritage stay · Sample concept</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-7xl font-light text-white tracking-wide leading-tight mb-4">
            Where Heritage <span className="italic font-normal text-amber-300">Meets Luxury</span>
          </h1>
          <p className="text-slate-200 text-sm sm:text-base font-light max-w-2xl mx-auto mb-8 leading-relaxed drop-shadow">
            Experience regal 16th-century Rajputana opulence on the calm waters of Lake Pichola. Handcrafted royal suites, private plunge sanctuaries, and personalized 24/7 butler service.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto sm:max-w-none">
            <a href="#suites" className="w-full sm:w-auto h-12 min-h-[48px] px-6 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2 cursor-pointer">
              <span>Explore Royal Suites</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <WhatsAppButton message={whatsappMessage} label="Inquire via WhatsApp" size="lg" className="w-full sm:w-auto h-12 min-h-[48px] justify-center" />
          </div>
        </div>
      </section>

      {/* Suites Showcase */}
      <section id="suites" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 text-amber-400 text-xs uppercase tracking-widest font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Exclusive Accommodations</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-white font-light">Palatial Suites & Villas</h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-3 max-w-xl mx-auto">
            Dynamic seasonal pricing calculated for <strong className="text-amber-300">{nights} {nights === 1 ? 'night' : 'nights'}</strong> ({guests} {guests === 1 ? 'guest' : 'guests'}, {rooms} {rooms === 1 ? 'room' : 'rooms'}). Book direct for complimentary welcome high-tea.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SUITES.map(suite => {
            const currentImgIdx = activeImageIdx[suite.id] || 0;
            const currentImg = suite.images[currentImgIdx];
            const effNightly = Math.round(suite.price * seasonalMultiplier);
            const suiteStayCost = effNightly * nights * rooms;
            const suiteTax = Math.round(suiteStayCost * 0.12);
            const suiteTotal = suiteStayCost + suiteTax;
            const isCompared = comparedSuiteIds.includes(suite.id);

            return (
              <div key={suite.id} className={`bg-[#0e1628]/90 border rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-xl ${isCompared ? 'border-amber-400 ring-2 ring-amber-400/30' : 'border-slate-800 hover:border-amber-500/40'}`}>
                <div>
                  <div 
                    onClick={() => setLightboxData({ images: suite.images, activeIdx: currentImgIdx, title: suite.name })}
                    className="relative h-60 overflow-hidden group bg-slate-900 cursor-pointer"
                  >
                    <SkeletonImage src={currentImg} alt={suite.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0e1628] via-transparent to-transparent opacity-80" />
                    <button type="button" aria-label="Previous photo" onClick={(e) => { e.stopPropagation(); handlePrevImage(suite.id, suite.images.length, e); }} className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/20 transition-all opacity-80 hover:opacity-100">
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button type="button" aria-label="Next photo" onClick={(e) => { e.stopPropagation(); handleNextImage(suite.id, suite.images.length, e); }} className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/20 transition-all opacity-80 hover:opacity-100">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-[10px] text-white flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>🔍 Expand View</span>
                    </div>
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
                      {suite.images.map((_, i) => (
                        <div key={i} className={`w-2 h-2 rounded-full transition-all ${i === currentImgIdx ? 'bg-amber-400 w-4' : 'bg-white/40'}`} />
                      ))}
                    </div>
                    <div className="absolute top-3 left-3 bg-[#0a0f1d]/85 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-semibold text-amber-300 border border-amber-500/30">
                      {suite.size} · {suite.view}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="font-serif text-xl font-bold text-white leading-snug">{suite.name}</h3>
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed min-h-[36px]">{suite.tagline}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {suite.amenities.map(am => (
                        <span key={am} className="text-[11px] px-2.5 py-1 rounded-lg bg-[#162138] text-slate-300 border border-white/5 flex items-center gap-1">
                          <Check className="w-3 h-3 text-amber-400" />
                          <span>{am}</span>
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-800">
                      <div className="flex items-baseline justify-between mb-2">
                        <div>
                          <span className="font-serif text-2xl font-bold text-amber-300">{formatINR(effNightly)}</span>
                          <span className="text-xs text-slate-400 ml-1">/ night</span>
                        </div>
                        {isWeekend ? (
                          <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 font-medium">Weekend: +15% applies</span>
                        ) : (
                          <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-white/5">Regular Tariff</span>
                        )}
                      </div>

                      <div className="bg-[#080d19] rounded-xl p-3 border border-white/5 text-xs space-y-1 mb-2">
                        <div className="flex justify-between text-slate-300">
                          <span>{nights} {nights === 1 ? 'Night' : 'Nights'} × {rooms} {rooms === 1 ? 'Room' : 'Rooms'}</span>
                          <span>{formatINR(suiteStayCost)}</span>
                        </div>
                        <div className="flex justify-between text-slate-400 text-[11px]">
                          <span>Taxes & 12% GST</span>
                          <span>{formatINR(suiteTax)}</span>
                        </div>
                        <div className="flex justify-between text-amber-300 font-bold border-t border-white/10 pt-1 text-sm">
                          <span>Total Stay Tariff</span>
                          <span>{formatINR(suiteTotal)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none">
                      <input type="checkbox" checked={isCompared} onChange={() => toggleCompare(suite.id)} className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-amber-500 focus:ring-amber-400 accent-amber-500 cursor-pointer" />
                      <span className="font-medium">Compare Suite</span>
                    </label>
                    <button onClick={() => window.open(getWhatsAppUrl(`Hello Royal Heritage Resort! Please share concierge details for ${suite.name} for ${nights} nights starting ${checkIn}.`), '_blank')} className="text-xs text-slate-400 hover:text-amber-300 transition-colors">
                      Inquire Tariff
                    </button>
                  </div>
                  <button type="button" onClick={() => startBooking(suite)} className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:brightness-110 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-1.5">
                    <span>Reserve This Suite</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Compare Floating Pill */}
      {comparedSuiteIds.length > 0 && !isCompareOpen && (
        <div className="fixed bottom-14 right-6 z-40 bg-[#121c33] border border-amber-500/40 backdrop-blur-md rounded-2xl p-3 shadow-2xl flex items-center gap-3">
          <div className="text-xs text-slate-200">
            <span className="font-bold text-amber-300">{comparedSuiteIds.length}/2</span> suites selected
          </div>
          <button type="button" onClick={() => setIsCompareOpen(true)} className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors">
            Open Comparison Table
          </button>
          <button type="button" onClick={() => setComparedSuiteIds([])} className="text-slate-400 hover:text-white p-1 text-xs" title="Clear comparison">✕</button>
        </div>
      )}

      {/* Compare Drawer (Slides in from right) */}
      {isCompareOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-2xl bg-[#0d1424] border-l border-amber-500/30 p-6 flex flex-col justify-between h-full overflow-y-auto shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-white flex items-center gap-2">
                    <span>Suite Comparison</span>
                    <span className="text-xs font-sans px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                      {comparedSuiteIds.length} of 2 Selected
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">Side-by-side features & pricing for your {nights}-night stay</p>
                </div>
                <button type="button" onClick={() => setIsCompareOpen(false)} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {comparedSuiteIds.length < 2 && (
                <div className="mt-4 p-3 rounded-xl bg-amber-950/40 border border-amber-500/30 text-xs text-amber-200">
                  Select a second suite using the "Compare Suite" checkbox to view full side-by-side comparison.
                </div>
              )}

              <div className="mt-6 overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400">
                      <th className="py-3 px-2 font-medium w-1/3">Feature</th>
                      {comparedSuiteIds.map(id => {
                        const s = SUITES.find(item => item.id === id);
                        return <th key={id} className="py-3 px-2 font-serif text-white font-bold w-1/3 text-center">{s?.name}</th>;
                      })}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    <tr>
                      <td className="py-3 px-2 text-slate-400">Nightly Rate</td>
                      {comparedSuiteIds.map(id => {
                        const s = SUITES.find(item => item.id === id);
                        const rate = s ? Math.round(s.price * seasonalMultiplier) : 0;
                        return (
                          <td key={id} className="py-3 px-2 text-center font-bold text-amber-300">
                            {formatINR(rate)}
                            {isWeekend && <span className="block text-[10px] text-amber-400/80 font-normal">+15% Weekend</span>}
                          </td>
                        );
                      })}
                    </tr>
                    <tr>
                      <td className="py-3 px-2 text-slate-400">Total Stay ({nights}N + Tax)</td>
                      {comparedSuiteIds.map(id => {
                        const s = SUITES.find(item => item.id === id);
                        const rate = s ? Math.round(s.price * seasonalMultiplier) : 0;
                        const total = Math.round(rate * nights * rooms * 1.12);
                        return <td key={id} className="py-3 px-2 text-center font-bold text-white">{formatINR(total)}</td>;
                      })}
                    </tr>
                    <tr>
                      <td className="py-3 px-2 text-slate-400">Suite Size</td>
                      {comparedSuiteIds.map(id => <td key={id} className="py-3 px-2 text-center">{SUITES.find(s => s.id === id)?.size}</td>)}
                    </tr>
                    <tr>
                      <td className="py-3 px-2 text-slate-400">View</td>
                      {comparedSuiteIds.map(id => <td key={id} className="py-3 px-2 text-center text-amber-300/90">{SUITES.find(s => s.id === id)?.view}</td>)}
                    </tr>
                    {ALL_AMENITIES.map(amenity => (
                      <tr key={amenity}>
                        <td className="py-2.5 px-2 text-slate-400">{amenity}</td>
                        {comparedSuiteIds.map(id => {
                          const s = SUITES.find(item => item.id === id);
                          const hasIt = s?.amenities.includes(amenity);
                          return (
                            <td key={id} className="py-2.5 px-2 text-center">
                              {hasIt ? <Check className="w-4 h-4 text-emerald-400 mx-auto" /> : <span className="text-slate-600">—</span>}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800 flex gap-3">
              {comparedSuiteIds.map(id => {
                const s = SUITES.find(item => item.id === id);
                if (!s) return null;
                return (
                  <button key={id} type="button" onClick={() => startBooking(s)} className="flex-1 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors">
                    Reserve {s.name.split(' ')[0]}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Booking Flow Modal (4 Steps) */}
      {bookingSuite && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="bg-[#0e1628] border border-amber-500/30 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-auto max-h-[92vh] overflow-y-auto text-slate-200">
            <div className="flex items-start justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-[11px] uppercase tracking-widest text-amber-400 font-semibold">Royal Heritage Direct Reservation</span>
                <h3 className="font-serif text-2xl font-bold text-white mt-0.5">{bookingStep === 4 ? 'Reservation Confirmed' : `Booking ${bookingSuite.name}`}</h3>
              </div>
              <button type="button" onClick={() => setBookingSuite(null)} className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Stepper Header */}
            <div className="my-5 flex items-center justify-between text-xs border-b border-slate-800 pb-4">
              {[
                { step: 1, label: 'Add-ons' },
                { step: 2, label: 'Guest Details' },
                { step: 3, label: 'Price Review' },
                { step: 4, label: 'Confirmation' },
              ].map(({ step, label }) => (
                <div key={step} className="flex items-center gap-1.5">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[11px] ${
                    bookingStep === step ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/30' : bookingStep > step ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-white/5 text-slate-500'
                  }`}>
                    {bookingStep > step ? '✓' : step}
                  </span>
                  <span className={`hidden sm:inline font-medium ${bookingStep === step ? 'text-amber-300' : 'text-slate-400'}`}>{label}</span>
                </div>
              ))}
            </div>

            {/* STEP 1: Add-ons & Suite Summary */}
            {bookingStep === 1 && (
              <div className="space-y-6">
                <div className="bg-[#121c33] border border-amber-500/20 rounded-2xl p-4 flex gap-4 items-center">
                  <img src={bookingSuite.images[0]} alt={bookingSuite.name} className="w-20 h-20 rounded-xl object-cover border border-white/10" />
                  <div className="text-xs space-y-1 flex-1">
                    <p className="font-serif font-bold text-base text-white">{bookingSuite.name}</p>
                    <p className="text-slate-400">{checkIn} to {checkOut} · <span className="text-amber-300 font-semibold">{nights} Nights</span> · {guests} Guests · {rooms} Room</p>
                    <p className="text-amber-300 font-bold">{formatINR(suiteNightlyRate)} / night {isWeekend && '(+15% weekend applied)'}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs uppercase tracking-widest font-semibold text-amber-400 mb-3">Curate Your Experience (Optional Add-ons)</h4>
                  <div className="space-y-3">
                    <label className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${addOns.breakfast ? 'bg-amber-500/10 border-amber-400/50' : 'bg-[#121c33]/70 border-slate-800 hover:border-slate-700'}`}>
                      <div className="flex items-center gap-3">
                        <input type="checkbox" checked={addOns.breakfast} onChange={(e) => setAddOns(prev => ({ ...prev, breakfast: e.target.checked }))} className="w-4 h-4 rounded border-slate-700 text-amber-500 accent-amber-500" />
                        <div>
                          <p className="text-sm font-semibold text-white">Royal Gourmet Breakfast</p>
                          <p className="text-xs text-slate-400">Daily imperial breakfast buffet & champagne mimosa for all guests</p>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-amber-300">₹800 <span className="font-normal text-[10px] text-slate-400">/day</span></span>
                    </label>

                    <label className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${addOns.airportPickup ? 'bg-amber-500/10 border-amber-400/50' : 'bg-[#121c33]/70 border-slate-800 hover:border-slate-700'}`}>
                      <div className="flex items-center gap-3">
                        <input type="checkbox" checked={addOns.airportPickup} onChange={(e) => setAddOns(prev => ({ ...prev, airportPickup: e.target.checked }))} className="w-4 h-4 rounded border-slate-700 text-amber-500 accent-amber-500" />
                        <div>
                          <p className="text-sm font-semibold text-white">Luxury Chauffeur Airport Pickup</p>
                          <p className="text-xs text-slate-400">Private Mercedes-Benz sedan transfer from Maharana Pratap Airport</p>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-amber-300">₹1,500</span>
                    </label>

                    <label className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${addOns.spaPackage ? 'bg-amber-500/10 border-amber-400/50' : 'bg-[#121c33]/70 border-slate-800 hover:border-slate-700'}`}>
                      <div className="flex items-center gap-3">
                        <input type="checkbox" checked={addOns.spaPackage} onChange={(e) => setAddOns(prev => ({ ...prev, spaPackage: e.target.checked }))} className="w-4 h-4 rounded border-slate-700 text-amber-500 accent-amber-500" />
                        <div>
                          <p className="text-sm font-semibold text-white">Couples Ayurvedic Spa Package</p>
                          <p className="text-xs text-slate-400">90-minute royal herbal massage and aromatic steam bath sanctuary</p>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-amber-300">₹3,500</span>
                    </label>
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-slate-800">
                  <button type="button" onClick={() => setBookingStep(2)} className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-amber-500/20 flex items-center gap-2">
                    <span>Guest Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Guest Details Form */}
            {bookingStep === 2 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Full Name *</label>
                    <input type="text" placeholder="e.g. Maharaja Vikramaditya Rao" value={guestName} onChange={(e) => setGuestName(e.target.value)} className="w-full bg-[#121c33] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400" />
                    <FieldError error={formErrors.name} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Phone Number (10-digit) *</label>
                    <input type="tel" placeholder="e.g. 9876543210" value={guestPhone} onChange={(e) => setGuestPhone(e.target.value)} className="w-full bg-[#121c33] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400" />
                    <FieldError error={formErrors.phone} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Email Address *</label>
                  <input type="email" placeholder="e.g. vikramaditya@palace.demo" value={guestEmail} onChange={(e) => setGuestEmail(e.target.value)} className="w-full bg-[#121c33] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400" />
                  <FieldError error={formErrors.email} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Special Requests (Optional)</label>
                  <textarea rows={3} placeholder="High floor, lake facing preference, anniversary decor, dietary restrictions..." value={specialRequests} onChange={(e) => setSpecialRequests(e.target.value)} className="w-full bg-[#121c33] border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-400" />
                </div>
                <DemoFormNote />
                <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                  <button type="button" onClick={() => setBookingStep(1)} className="px-4 py-2.5 rounded-xl border border-slate-700 hover:border-slate-500 text-xs font-semibold text-slate-300">← Back</button>
                  <button type="button" onClick={() => { if (validateGuestForm()) setBookingStep(3); }} className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-amber-500/20 flex items-center gap-2">
                    <span>Review Price Breakdown</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Price Breakdown Summary */}
            {bookingStep === 3 && (
              <div className="space-y-5">
                <div className="bg-[#121c33] rounded-2xl p-5 border border-amber-500/20 text-xs space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                    <span className="font-semibold text-white text-sm">{bookingSuite.name}</span>
                    <span className="text-amber-300 font-bold">{nights} Nights · {rooms} Room · {guests} Guests</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Base Suite Rate ({nights} nights × {rooms} room)</span>
                    <span>{formatINR(roomBaseTotal)}</span>
                  </div>
                  {isWeekend && (
                    <div className="flex justify-between text-amber-300/90 text-[11px]">
                      <span>Weekend Peak Surcharge (+15% seasonal uplift)</span>
                      <span>Included</span>
                    </div>
                  )}
                  {addOns.breakfast && (
                    <div className="flex justify-between text-slate-300">
                      <span>Royal Breakfast ({guests} guests × {nights} days @ ₹800)</span>
                      <span>{formatINR(breakfastCost)}</span>
                    </div>
                  )}
                  {addOns.airportPickup && (
                    <div className="flex justify-between text-slate-300">
                      <span>Airport Chauffeur Transfer</span>
                      <span>{formatINR(pickupCost)}</span>
                    </div>
                  )}
                  {addOns.spaPackage && (
                    <div className="flex justify-between text-slate-300">
                      <span>Couples Ayurvedic Spa Package</span>
                      <span>{formatINR(spaCost)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-400 pt-2 border-t border-slate-800">
                    <span>Subtotal</span>
                    <span>{formatINR(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Goods & Services Tax (12% GST)</span>
                    <span>{formatINR(taxGST)}</span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-amber-500/30 text-base font-serif font-bold text-amber-300">
                    <span>Total Stay Payable</span>
                    <span className="text-xl">{formatINR(grandTotal)}</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-xs text-emerald-300">
                  Guest: <strong>{guestName}</strong> ({guestPhone}) · Best rate guaranteed with zero booking commission.
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                  <button type="button" onClick={() => setBookingStep(2)} className="px-4 py-2.5 rounded-xl border border-slate-700 hover:border-slate-500 text-xs font-semibold text-slate-300">← Edit Details</button>
                  <button type="button" onClick={handleConfirmReservation} className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:brightness-110 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-xl shadow-amber-500/25">
                    Confirm Stay Reservation
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: Confirmation */}
            {bookingStep === 4 && (
              <div className="text-center space-y-6 py-2">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <div>
                  <h4 className="font-serif text-2xl font-bold text-white">Your Regal Stay Is Reserved!</h4>
                  <p className="text-xs text-slate-300 mt-1">
                    Thank you, <span className="text-white font-semibold">{guestName}</span>. Your stay at Royal Heritage Resort has been confirmed.
                  </p>
                </div>
                <div className="bg-[#121c33] border border-amber-500/30 rounded-2xl p-5 max-w-md mx-auto text-left text-xs space-y-2">
                  <div className="flex justify-between pb-2 border-b border-slate-800">
                    <span className="text-slate-400">Booking Reference</span>
                    <span className="font-mono font-bold text-amber-300 text-sm">{bookingToken}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Suite</span>
                    <span className="font-semibold text-white">{bookingSuite.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Dates</span>
                    <span>{checkIn} to {checkOut} ({nights} nights)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Check-In Time</span>
                    <span>From 2:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Total Tariff</span>
                    <span className="font-bold text-amber-300">{formatINR(grandTotal)}</span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
                  <button type="button" onClick={handleDownloadICS} className="flex-1 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-white/10 transition-colors flex items-center justify-center gap-2">
                    <Download className="w-4 h-4 text-amber-400" />
                    <span>Save to Calendar (.ics)</span>
                  </button>
                  <WhatsAppButton message={whatsappMessage} label="WhatsApp Concierge" className="flex-1 justify-center" />
                </div>
                <div className="pt-2">
                  <button type="button" onClick={() => setBookingSuite(null)} className="text-xs text-amber-400 hover:text-amber-300 underline font-medium">
                    Done & Return to Resort View
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Nearby Attractions */}
      <section id="attractions" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto border-t border-slate-800/80">
        <div className="text-center mb-12">
          <span className="text-amber-400 text-xs uppercase tracking-widest font-semibold">Historic Udaipur</span>
          <h2 className="font-serif text-3xl sm:text-4xl text-white font-light mt-1">Nearby Royal Attractions</h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-2 max-w-md mx-auto">
            Situated moments from ancient heritage landmarks, spice bazaars, and scenic lake promenades.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {NEARBY_ATTRACTIONS.map(att => (
            <div key={att.name} className="bg-[#0e1628] border border-slate-800 hover:border-amber-500/40 rounded-2xl p-6 transition-all shadow-lg flex flex-col justify-between">
              <div>
                <div className="text-4xl mb-4">{att.emoji}</div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-serif text-lg font-bold text-white">{att.name}</h3>
                  <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/20">{att.dist}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{att.desc}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center gap-1.5 text-[11px] text-amber-400 font-medium">
                <MapPin className="w-3.5 h-3.5" />
                <span>Concierge private car escort available</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 px-4 sm:px-6 max-w-3xl mx-auto border-t border-slate-800/80">
        <div className="text-center mb-10">
          <span className="text-amber-400 text-xs uppercase tracking-widest font-semibold">Common Inquiries</span>
          <h2 className="font-serif text-3xl text-white font-light mt-1">Resort Guest FAQ</h2>
        </div>
        <div className="space-y-3">
          <AccordionItem question="What is the check-in/check-out time?" answer="Check-in from 2:00 PM, Check-out by 11:00 AM. Early/late requests are subject to availability." accentColor="text-amber-400" />
          <AccordionItem question="Is breakfast included?" answer="Complimentary breakfast is included with the Kohinoor Pool Villa. Other suites offer an optional Breakfast add-on (₹800/person/day)." accentColor="text-amber-400" />
          <AccordionItem question="Can I cancel or modify a booking?" answer="This is a demo. In a real booking, cancellations typically follow the property's refund policy." accentColor="text-amber-400" />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-800 bg-[#080d19] text-center text-xs text-slate-400 px-4">
        <div className="max-w-4xl mx-auto space-y-3">
          <p className="font-serif text-base font-bold text-amber-300 tracking-wider">ROYAL HERITAGE RESORT & LAKE SANCTUARY</p>
          <p className="text-slate-400 text-xs">Lake Pichola Waterfront, Haridas Ji Ki Magri, Udaipur, Rajasthan 313001</p>
          <p className="text-[11px] text-slate-400">Reservations: +91 79 7597 6491 · concierge@royalheritageresort.demo</p>
          <div className="pt-4 border-t border-slate-800/60 text-[10px] text-slate-400">
            Interactive Luxury Demo Designed & Developed by Nexora Technologies
          </div>
        </div>
      </footer>

      {/* Lightbox Modal */}
      {lightboxData && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg flex flex-col items-center justify-between p-4 sm:p-6 animate-in fade-in duration-200">
          <div className="w-full max-w-5xl flex items-center justify-between text-white pb-3 border-b border-white/10">
            <div>
              <h3 className="font-serif text-lg font-bold text-amber-300">{lightboxData.title}</h3>
              <p className="text-xs text-slate-400">Photo {lightboxData.activeIdx + 1} of {lightboxData.images.length}</p>
            </div>
            <button
              onClick={() => setLightboxData(null)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="relative flex-1 w-full max-w-4xl flex items-center justify-center my-4 overflow-hidden">
            <img
              src={lightboxData.images[lightboxData.activeIdx]}
              alt={lightboxData.title}
              className="max-h-[65vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl transition-all"
            />
            <button
              onClick={() => setLightboxData(prev => prev ? ({
                ...prev,
                activeIdx: (prev.activeIdx - 1 + prev.images.length) % prev.images.length
              }) : null)}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/70 hover:bg-black/90 text-white border border-white/20 cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => setLightboxData(prev => prev ? ({
                ...prev,
                activeIdx: (prev.activeIdx + 1) % prev.images.length
              }) : null)}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/70 hover:bg-black/90 text-white border border-white/20 cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          <div className="flex items-center gap-3 overflow-x-auto p-2 bg-black/50 rounded-2xl border border-white/10 max-w-xl">
            {lightboxData.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setLightboxData(prev => prev ? ({ ...prev, activeIdx: idx }) : null)}
                className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                  lightboxData.activeIdx === idx ? 'border-amber-400 scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img} alt="thumb" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Shared Mobile Bottom Action Bar (Phone only: < 768px) */}
      <DemoMobileBottomBar
        primaryAction={{
          label: 'Book Stay',
          href: '#suites',
          icon: Calendar,
          accentColorClass: 'bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 font-bold shadow-amber-500/25'
        }}
        secondaryAction={{
          label: 'WhatsApp',
          href: getWhatsAppUrl(whatsappMessage),
          icon: MessageCircle,
          accentColorClass: 'border-emerald-500/30 text-emerald-300 bg-emerald-500/10'
        }}
      />
    </div>
  );
};
