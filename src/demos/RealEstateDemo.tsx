import React, { useState } from 'react';
import {
  Building,
  MapPin,
  CheckCircle2,
  Sparkles,
  Compass,
  Heart,
  Eye,
  Calendar,
  Layers,
  ArrowRight,
  Calculator,
  Download,
  X,
  MessageCircle,
  Check,
  Grid,
  List
} from 'lucide-react';
import {
  formatINR,
  isValidPhone,
  todayStr,
  generateICS,
  downloadICS
} from './shared/utils';
import {
  useLocalStorage,
  useToast
} from './shared/hooks';
import { useDemoState } from './shared/DemoStateContext';
import {
  DemoBadge,
  ToastContainer,
  WhatsAppButton,
  SkeletonImage,
  DemoFormNote,
  EmptyState
} from './shared/components';
import { getWhatsAppUrl } from '../utils/whatsapp';

interface RealEstateDemoProps {
  onOrderThisWebsite?: () => void;
  onBackToMain?: () => void;
}

interface Property {
  id: string;
  title: string;
  bhk: '2 BHK' | '3 BHK' | 'Villa' | 'Penthouse';
  price: number;
  priceStr: string;
  loc: 'Sarjapur Road' | 'Whitefield' | 'Electronic City' | 'Koramangala';
  area: string;
  status: 'Ready to Move' | 'Under Construction' | 'New Launch';
  furnishing: 'Fully Furnished' | 'Semi-Furnished' | 'Unfurnished';
  floors: number;
  parking: number;
  facing: string;
  amenities: string[];
  images: string[];
  mapCoords: { x: number; y: number };
  highlights: string;
}

const PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'Skyline Sovereign Towers',
    bhk: '3 BHK',
    price: 14500000,
    priceStr: '₹1.45 Cr',
    loc: 'Sarjapur Road',
    area: '1,840 sq.ft',
    status: 'Ready to Move',
    furnishing: 'Fully Furnished',
    floors: 18,
    parking: 2,
    facing: 'East Facing',
    amenities: ['Clubhouse', 'Rooftop Pool', 'Smart Home', 'Power Backup', 'EV Charging Point', '24/7 Security'],
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80'
    ],
    mapCoords: { x: 120, y: 70 },
    highlights: 'Luxury 3 BHK high-rise residence featuring private panoramic sundeck balconies overlooking the lake.'
  },
  {
    id: '2',
    title: 'Aura Whisper Valleys Villa',
    bhk: 'Villa',
    price: 28500000,
    priceStr: '₹2.85 Cr',
    loc: 'Whitefield',
    area: '3,250 sq.ft',
    status: 'Under Construction',
    furnishing: 'Semi-Furnished',
    floors: 2,
    parking: 3,
    facing: 'North Facing',
    amenities: ['Private Garden', 'EV Charging Point', 'Smart Security', 'Vastu Compliant', 'Guest Suite', 'Clubhouse'],
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80'
    ],
    mapCoords: { x: 190, y: 50 },
    highlights: 'Gated enclave of 48 bespoke villas with double-height ceiling living halls and private terrace gardens.'
  },
  {
    id: '3',
    title: 'Elysium Urban Residences',
    bhk: '2 BHK',
    price: 8200000,
    priceStr: '₹82 Lakhs',
    loc: 'Electronic City',
    area: '1,190 sq.ft',
    status: 'New Launch',
    furnishing: 'Fully Furnished',
    floors: 12,
    parking: 1,
    facing: 'West Facing',
    amenities: ['Metro Nearby', 'Children Play Zone', 'Jogging Track', '24/7 Security', 'Gym', 'Power Backup'],
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80'
    ],
    mapCoords: { x: 60, y: 150 },
    highlights: 'Smart compact luxury homes situated 400m from the upcoming yellow line metro terminal.'
  },
  {
    id: '4',
    title: 'The Grand Imperial Penthouse',
    bhk: 'Penthouse',
    price: 35000000,
    priceStr: '₹3.50 Cr',
    loc: 'Koramangala',
    area: '4,100 sq.ft',
    status: 'Ready to Move',
    furnishing: 'Fully Furnished',
    floors: 20,
    parking: 4,
    facing: 'South-West Facing',
    amenities: ['Private Terrace', 'Home Theatre', 'Jacuzzi', 'Servant Quarters', '360° City View', 'Smart Home'],
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80'
    ],
    mapCoords: { x: 110, y: 100 },
    highlights: 'Exclusive single-unit penthouse with private elevator, heated infinity pool, and unobstructed skyline views.'
  },
  {
    id: '5',
    title: 'Serene Heights 2BHK Smart Homes',
    bhk: '2 BHK',
    price: 6800000,
    priceStr: '₹68 Lakhs',
    loc: 'Sarjapur Road',
    area: '1,050 sq.ft',
    status: 'Under Construction',
    furnishing: 'Unfurnished',
    floors: 8,
    parking: 1,
    facing: 'North-East Facing',
    amenities: ['Amphitheatre', 'Mini Mart', 'Swimming Pool', 'Yoga Deck', '24/7 Security', 'EV Charging Point'],
    images: [
      'https://images.unsplash.com/photo-1582407947304-fd86f28f3e9e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=800&q=80'
    ],
    mapCoords: { x: 135, y: 95 },
    highlights: 'Community living with 70% open green space and modern co-working lounge for hybrid professionals.'
  }
];

export const RealEstateDemo: React.FC<RealEstateDemoProps> = ({ onOrderThisWebsite }) => {
  const { toasts, dismiss: dismissToast } = useToast();
  const { toast, triggerSimulatedDispatch, playChime } = useDemoState();

  // Filter states
  const [bhkFilter, setBhkFilter] = useState<string>('all');
  const [locFilter, setLocFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [furnishingFilter, setFurnishingFilter] = useState<string>('all');
  const [maxBudget, setMaxBudget] = useState<number>(40000000); // 4 Cr
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'area-desc'>('price-asc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Shortlist (Favourites) stored in localStorage
  const [shortlist, setShortlist] = useLocalStorage<string[]>('nexora_re_shortlist', ['1', '3']);
  const [showShortlistModal, setShowShortlistModal] = useState(false);

  // Compare properties (max 3)
  const [compareList, setCompareList] = useState<string[]>([]);
  const [showCompareModal, setShowCompareModal] = useState(false);

  // Detail drawer state
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [activeImageIdx, setActiveImageIdx] = useState<number>(0);

  // Site visit scheduler state
  const [schedProperty, setSchedProperty] = useState<Property | null>(null);
  const [schedDate, setSchedDate] = useState<string>(todayStr());
  const [schedSlot, setSchedSlot] = useState<string>('11:00 AM');
  const [pickupMode, setPickupMode] = useState<'Self-drive / Direct' | 'Free Luxury Chauffeur Cab'>('Free Luxury Chauffeur Cab');
  const [pickupAddress, setPickupAddress] = useState<string>('');
  const [visitorName, setVisitorName] = useState<string>('');
  const [visitorPhone, setVisitorPhone] = useState<string>('');
  const [visitToken, setVisitToken] = useState<string | null>(null);

  // Interactive EMI Calculator State
  const [loanPrincipal, setLoanPrincipal] = useState<number>(10000000); // 1 Cr
  const [interestRate, setInterestRate] = useState<number>(8.5); // 8.5%
  const [tenureYears, setTenureYears] = useState<number>(20); // 20 Yrs

  // Toggle Shortlist item
  const toggleShortlist = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    playChime('pop');
    if (shortlist.includes(id)) {
      setShortlist(prev => prev.filter(x => x !== id));
      toast.info('Removed from saved shortlist');
    } else {
      setShortlist(prev => [...prev, id]);
      toast.success('Property saved to your shortlist!', 'Shortlist Saved');
    }
  };

  // Toggle Compare item
  const toggleCompare = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (compareList.includes(id)) {
      setCompareList(prev => prev.filter(x => x !== id));
    } else {
      if (compareList.length >= 3) {
        toast.error('You can compare a maximum of 3 properties at once.');
        return;
      }
      playChime('pop');
      setCompareList(prev => [...prev, id]);
      toast.info('Added to comparison deck');
    }
  };

  // Filter & sort logic
  const filteredProperties = PROPERTIES.filter(p => {
    const matchBhk = bhkFilter === 'all' || p.bhk === bhkFilter;
    const matchLoc = locFilter === 'all' || p.loc === locFilter;
    const matchStatus = statusFilter === 'all' || p.status === statusFilter;
    const matchFurnishing = furnishingFilter === 'all' || p.furnishing === furnishingFilter;
    const matchBudget = p.price <= maxBudget;
    return matchBhk && matchLoc && matchStatus && matchFurnishing && matchBudget;
  }).sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    return parseInt(b.area) - parseInt(a.area);
  });

  // Calculate Monthly EMI
  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = tenureYears * 12;
  const calculatedEmi = Math.round(
    (loanPrincipal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
    (Math.pow(1 + monthlyRate, totalMonths) - 1)
  );
  const totalAmountPayable = calculatedEmi * totalMonths;
  const totalInterestPayable = totalAmountPayable - loanPrincipal;
  const principalPercentage = Math.round((loanPrincipal / totalAmountPayable) * 100);
  const _interestPercentage = 100 - principalPercentage;

  // Donut SVG circumference calculation
  const circleRadius = 60;
  const circumference = 2 * Math.PI * circleRadius;
  const principalStrokeDash = (principalPercentage / 100) * circumference;

  // Handle Site Visit Booking
  const handleScheduleVisit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitorName.trim() || !isValidPhone(visitorPhone)) {
      toast.error('Please provide your name and a valid 10-digit mobile number.');
      return;
    }

    const token = `NX-APR-${Math.floor(1000 + Math.random() * 9000)}`;
    setVisitToken(token);
    playChime('success');
    toast.success(`Site visit confirmed! Token #${token} generated (${pickupMode}).`, 'Visit Confirmed');
    triggerSimulatedDispatch('whatsapp', {
      recipient: visitorPhone.trim(),
      title: `Site Visit for ${schedProperty?.title || 'Property'} (${pickupMode})`,
      token
    });
  };

  // Handle ICS Download for Site Visit
  const handleDownloadVisitICS = () => {
    if (!schedProperty) return;
    const icsData = generateICS({
      title: `Site Visit: ${schedProperty.title}`,
      description: `Guided property walkthrough with Skyline Estates senior relationship manager. Ref Token: ${visitToken}`,
      location: `${schedProperty.loc}, Bengaluru`,
      startDate: schedDate,
      startTime: schedSlot.includes('PM') && !schedSlot.startsWith('12') 
        ? `${parseInt(schedSlot.split(':')[0]) + 12}:00` 
        : `${schedSlot.split(':')[0]}:00`,
      durationMins: 60
    });
    downloadICS(`Site-Visit-${visitToken}.ics`, icsData);
    toast.success('Calendar invite (.ics) downloaded!', 'Calendar Synced');
  };

  return (
    <div className="bg-slate-950 text-slate-100 font-sans min-h-screen selection:bg-emerald-500 selection:text-black pb-28">
      <ToastContainer toasts={toasts} dismiss={dismissToast} />
      <DemoBadge />

      {/* Top Banner */}
      <div className="bg-emerald-950/40 border-b border-emerald-900/40 px-4 sm:px-6 py-2.5 text-xs flex flex-wrap justify-between items-center text-emerald-200">
        <div className="flex items-center gap-2">
          <Building className="w-4 h-4 text-emerald-400" />
          <span className="font-medium">
            Nexora Client Template: High-Converting Real Estate & Developer Showcase Portal
          </span>
          <span className="hidden md:inline px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono">
            LIVE DEMO
          </span>
        </div>
        {onOrderThisWebsite && (
          <button
            onClick={onOrderThisWebsite}
            className="text-emerald-400 hover:text-white font-semibold underline text-xs transition-colors cursor-pointer"
          >
            Get this real estate website for your agency →
          </button>
        )}
      </div>

      {/* Sticky Main Navigation */}
      <nav className="bg-slate-950/95 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-4 sticky top-0 z-30 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center font-bold text-slate-950 shadow-lg shadow-emerald-500/20">
            <Building className="w-5 h-5 text-slate-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold tracking-wider text-xl text-white uppercase font-display">SKYLINE</span>
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                ESTATES
              </span>
            </div>
            <p className="text-[10px] text-slate-400 -mt-0.5">RERA Registered Prime Realty • Bangalore</p>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-6 text-xs font-semibold text-slate-300">
          <a href="#properties" className="hover:text-emerald-400 transition-colors">Properties</a>
          <a href="#map-section" className="hover:text-emerald-400 transition-colors">City Locality Map</a>
          <a href="#emi-calculator" className="hover:text-emerald-400 transition-colors">EMI Calculator</a>
          <a href="#why-skyline" className="hover:text-emerald-400 transition-colors">Why Choose Us</a>
        </div>

        <div className="flex items-center gap-3">
          {/* Saved Shortlist button */}
          <button
            onClick={() => setShowShortlistModal(true)}
            className="relative p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 text-xs"
            title="View Saved Shortlist"
          >
            <Heart className={`w-4 h-4 ${shortlist.length ? 'text-rose-500 fill-rose-500' : 'text-slate-400'}`} />
            <span className="hidden sm:inline">Saved</span>
            {shortlist.length > 0 && (
              <span className="w-4 h-4 rounded-full bg-rose-600 text-white font-mono text-[10px] flex items-center justify-center">
                {shortlist.length}
              </span>
            )}
          </button>

          {/* Compare Button */}
          {compareList.length > 0 && (
            <button
              onClick={() => setShowCompareModal(true)}
              className="px-3 py-2 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Compare ({compareList.length})</span>
            </button>
          )}

          <WhatsAppButton
            message="Hello Skyline Estates! I am looking to invest in luxury properties in Bengaluru. Please share current projects."
            label="Enquire via WhatsApp"
            size="sm"
          />
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-16 pb-20 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-950/20 via-slate-950 to-slate-950 -z-10" />

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/40 text-emerald-400 text-xs font-medium mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Direct Builder Pricing • Zero Brokerage • 100% Legal Clear Titles</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold text-white leading-tight font-display tracking-tight mb-6">
              Curated Addresses <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500">
                For Discerning Owners.
              </span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base mb-8 leading-relaxed max-w-xl">
              Discover Grade-A luxury apartments, private garden villas, and skyline penthouses situated in Bengaluru’s premier growth corridors.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#properties"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:brightness-110 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-xl shadow-emerald-950/50 flex items-center gap-2"
              >
                <span>Browse {PROPERTIES.length} Premium Listings</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#emi-calculator"
                className="px-6 py-3.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-slate-200 font-semibold text-xs uppercase tracking-wider transition-all flex items-center gap-2"
              >
                <Calculator className="w-4 h-4 text-emerald-400" />
                <span>Calculate Monthly EMI</span>
              </a>
            </div>

            {/* Quick trust metrics */}
            <div className="mt-10 grid grid-cols-3 gap-4 pt-6 border-t border-white/10 max-w-lg">
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-white">₹1.2K<span className="text-emerald-400 text-lg">Cr+</span></p>
                <p className="text-[11px] text-slate-400 uppercase tracking-wider mt-0.5">Asset Inventory</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-white">0%</p>
                <p className="text-[11px] text-slate-400 uppercase tracking-wider mt-0.5">Brokerage Fee</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-white">100%</p>
                <p className="text-[11px] text-slate-400 uppercase tracking-wider mt-0.5">RERA Approved</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-emerald-900/40 shadow-2xl shadow-emerald-950/40">
              <SkeletonImage
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
                alt="Skyline Sovereign Towers Penthouse"
                className="w-full h-[420px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-black/80 backdrop-blur-md border border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-emerald-400 font-mono uppercase font-bold">Featured Flagship</span>
                  <p className="text-sm font-bold text-white">Skyline Sovereign Towers</p>
                  <p className="text-xs text-slate-300">Sarjapur Road • ₹1.45 Cr onwards</p>
                </div>
                <button
                  onClick={() => {
                    setSelectedProperty(PROPERTIES[0]);
                    setActiveImageIdx(0);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ========================================================= */}
      {/* SECTION 1: Property Listings & Interactive Filters       */}
      {/* ========================================================= */}
      <section id="properties" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto border-t border-white/5">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-emerald-400 text-xs uppercase tracking-widest font-bold">Verified Portfolio</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display mt-1">
              Explore Available Properties
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Showing {filteredProperties.length} of {PROPERTIES.length} verified listings in Bengaluru
            </p>
          </div>

          {/* Grid vs List toggle */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <div className="flex items-center bg-slate-900 border border-white/10 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                  viewMode === 'grid' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Grid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Grid</span>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                  viewMode === 'list' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                <List className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">List</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-white/10 mb-8 space-y-4 shadow-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {/* BHK Filter */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1.5 uppercase font-mono">BHK Configuration</label>
              <select
                value={bhkFilter}
                onChange={e => setBhkFilter(e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 cursor-pointer"
              >
                <option value="all">All Configurations</option>
                <option value="2 BHK">2 BHK Apartments</option>
                <option value="3 BHK">3 BHK Luxury Homes</option>
                <option value="Villa">Exclusive Villas</option>
                <option value="Penthouse">Sky Penthouses</option>
              </select>
            </div>

            {/* Locality Filter */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1.5 uppercase font-mono">Prime Locality</label>
              <select
                value={locFilter}
                onChange={e => setLocFilter(e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 cursor-pointer"
              >
                <option value="all">All Prime Localities</option>
                <option value="Sarjapur Road">Sarjapur Road</option>
                <option value="Whitefield">Whitefield</option>
                <option value="Electronic City">Electronic City</option>
                <option value="Koramangala">Koramangala</option>
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1.5 uppercase font-mono">Construction Status</label>
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 cursor-pointer"
              >
                <option value="all">All Construction Stages</option>
                <option value="Ready to Move">Ready to Move</option>
                <option value="Under Construction">Under Construction</option>
                <option value="New Launch">New Launch</option>
              </select>
            </div>

            {/* Furnishing Filter */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1.5 uppercase font-mono">Furnishing</label>
              <select
                value={furnishingFilter}
                onChange={e => setFurnishingFilter(e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 cursor-pointer"
              >
                <option value="all">All Furnishing Types</option>
                <option value="Fully Furnished">Fully Furnished</option>
                <option value="Semi-Furnished">Semi-Furnished</option>
                <option value="Unfurnished">Unfurnished</option>
              </select>
            </div>

            {/* Sort Filter */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1.5 uppercase font-mono">Sort Results</label>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as any)}
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 cursor-pointer"
              >
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="area-desc">Carpet Area: Largest First</option>
              </select>
            </div>
          </div>

          {/* Budget Range Slider */}
          <div className="pt-3 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3 w-full sm:w-2/3">
              <span className="text-slate-400 font-mono text-[11px] shrink-0">MAX BUDGET:</span>
              <input
                type="range"
                min="6000000"
                max="40000000"
                step="2000000"
                value={maxBudget}
                onChange={e => setMaxBudget(+e.target.value)}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <span className="font-mono font-bold text-emerald-400 shrink-0">
                {formatINR(maxBudget)}
              </span>
            </div>

            <button
              onClick={() => {
                setBhkFilter('all');
                setLocFilter('all');
                setStatusFilter('all');
                setMaxBudget(40000000);
              }}
              className="text-slate-400 hover:text-white underline text-xs cursor-pointer self-end sm:self-auto"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Property Cards Rendering (Grid vs List) */}
        {filteredProperties.length === 0 ? (
          <EmptyState
            icon="🏢"
            title="No properties match your exact criteria"
            description="Try increasing your maximum budget slider or selecting 'All' configurations."
          />
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map(prop => {
              const isFav = shortlist.includes(prop.id);
              const isComp = compareList.includes(prop.id);

              return (
                <div
                  key={prop.id}
                  className="rounded-3xl bg-slate-900 border border-white/10 overflow-hidden hover:border-emerald-500/40 transition-all flex flex-col justify-between group shadow-lg"
                >
                  <div>
                    {/* Image with Tag & Heart */}
                    <div className="relative h-56 overflow-hidden">
                      <SkeletonImage
                        src={prop.images[0]}
                        alt={prop.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

                      {/* Status Tag */}
                      <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-black/70 backdrop-blur-sm text-emerald-400 border border-white/10">
                        {prop.status}
                      </span>

                      {/* Favorite Heart Button */}
                      <button
                        onClick={e => toggleShortlist(prop.id, e)}
                        className="absolute top-3 right-3 p-2 rounded-full bg-black/60 backdrop-blur-sm text-white hover:scale-110 transition-transform cursor-pointer border border-white/10"
                        title={isFav ? 'Remove from Shortlist' : 'Add to Shortlist'}
                      >
                        <Heart className={`w-4 h-4 ${isFav ? 'text-rose-500 fill-rose-500' : 'text-white'}`} />
                      </button>

                      {/* Price Badge */}
                      <div className="absolute bottom-3 left-3">
                        <span className="text-xl font-extrabold text-white drop-shadow-md">{prop.priceStr}</span>
                        <span className="text-[11px] text-slate-300 ml-1">onwards</span>
                      </div>
                    </div>

                    {/* Details content */}
                    <div className="p-5">
                      <div className="flex justify-between items-start gap-2 mb-2">
                        <h3 className="font-bold text-base text-white group-hover:text-emerald-400 transition-colors">
                          {prop.title}
                        </h3>
                      </div>

                      <p className="text-xs text-slate-400 flex items-center gap-1 mb-4">
                        <MapPin className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{prop.loc}, Bengaluru</span>
                      </p>

                      {/* Quick Specs Icons */}
                      <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/5 text-center text-xs">
                        <div>
                          <p className="text-[10px] text-slate-500 uppercase">Type</p>
                          <p className="font-semibold text-white mt-0.5">{prop.bhk}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-slate-500 uppercase">Carpet Area</p>
                          <p className="font-semibold text-white mt-0.5">{prop.area}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-slate-500 uppercase">Facing</p>
                          <p className="font-semibold text-white mt-0.5">{prop.facing.split(' ')[0]}</p>
                        </div>
                      </div>

                      <p className="text-xs text-slate-400 mt-3 line-clamp-2 leading-relaxed">
                        {prop.highlights}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Action Footer */}
                  <div className="p-5 pt-0 space-y-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedProperty(prop);
                          setActiveImageIdx(0);
                        }}
                        className="flex-1 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 border border-white/10 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 text-emerald-400" />
                        <span>View Details</span>
                      </button>

                      <button
                        onClick={() => {
                          setSchedProperty(prop);
                          setVisitToken(null);
                        }}
                        className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-emerald-950/30 flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Book Visit</span>
                      </button>
                    </div>

                    <div className="flex items-center justify-between pt-2 text-[11px] text-slate-400">
                      <label className="flex items-center gap-1.5 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={isComp}
                          onChange={e => toggleCompare(prop.id, e as any)}
                          className="rounded text-emerald-600 focus:ring-0"
                        />
                        <span>Compare Spec</span>
                      </label>

                      <a
                        href={getWhatsAppUrl(`Hello Skyline Estates! I would like to download the brochure and schedule a site visit for "${prop.title}".`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-400 hover:underline flex items-center gap-1"
                      >
                        <MessageCircle className="w-3 h-3" />
                        <span>WhatsApp Brochure</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* List Mode View */
          <div className="space-y-4">
            {filteredProperties.map(prop => (
              <div
                key={prop.id}
                className="rounded-3xl bg-slate-900 border border-white/10 overflow-hidden hover:border-emerald-500/40 transition-all p-4 sm:p-6 flex flex-col md:flex-row gap-6 items-center shadow-lg"
              >
                <div className="relative w-full md:w-64 h-48 rounded-2xl overflow-hidden shrink-0">
                  <SkeletonImage
                    src={prop.images[0]}
                    alt={prop.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded bg-black/70 text-emerald-400">
                    {prop.status}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <h3 className="font-bold text-lg text-white">{prop.title}</h3>
                    <span className="text-xl font-extrabold text-emerald-400">{prop.priceStr}</span>
                  </div>

                  <p className="text-xs text-slate-400 flex items-center gap-1 mb-3">
                    <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                    <span>{prop.loc}, Bengaluru</span>
                  </p>

                  <p className="text-xs text-slate-300 mb-4 line-clamp-2">{prop.highlights}</p>

                  <div className="flex flex-wrap gap-4 text-xs font-mono text-slate-400">
                    <span>Config: <strong className="text-white">{prop.bhk}</strong></span>
                    <span>Area: <strong className="text-white">{prop.area}</strong></span>
                    <span>Floors: <strong className="text-white">{prop.floors} Floors</strong></span>
                    <span>Facing: <strong className="text-white">{prop.facing}</strong></span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 w-full md:w-44 shrink-0">
                  <button
                    onClick={() => {
                      setSelectedProperty(prop);
                      setActiveImageIdx(0);
                    }}
                    className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold border border-white/10"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => {
                      setSchedProperty(prop);
                      setVisitToken(null);
                    }}
                    className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider"
                  >
                    Schedule Visit
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ========================================================= */}
      {/* SECTION 2: Mock Vector Map of Bengaluru Localities        */}
      {/* ========================================================= */}
      <section id="map-section" className="py-16 px-4 sm:px-6 max-w-5xl mx-auto border-t border-white/5">
        <div className="bg-slate-900 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-emerald-400 text-xs uppercase tracking-widest font-bold">Interactive Geographic Grid</span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white font-display mt-0.5">
                Prime Bengaluru Development Map
              </h2>
              <p className="text-slate-400 text-xs mt-0.5">
                Click any property pin to inspect location coordinates and project details.
              </p>
            </div>
            <span className="text-[10px] font-mono text-slate-500 bg-black/40 px-3 py-1 rounded-full border border-white/10 self-start sm:self-auto">
              STYLED SVG VECTOR MAP (NO EXTERNAL API KEY REQUIRED)
            </span>
          </div>

          <div className="relative rounded-2xl bg-slate-950 border border-white/10 p-4 overflow-hidden h-[280px] flex items-center justify-center">
            {/* SVG Stylized Metro & Road Grid */}
            <svg className="w-full h-full" viewBox="0 0 240 180">
              {/* Arterial grid roads */}
              <line x1="20" y1="50" x2="220" y2="50" stroke="#334155" strokeWidth="1" strokeDasharray="3" />
              <line x1="20" y1="100" x2="220" y2="100" stroke="#334155" strokeWidth="1.5" />
              <line x1="20" y1="140" x2="220" y2="140" stroke="#334155" strokeWidth="1" strokeDasharray="3" />
              <line x1="70" y1="20" x2="70" y2="160" stroke="#334155" strokeWidth="1" />
              <line x1="130" y1="20" x2="130" y2="160" stroke="#10b981" strokeWidth="2" strokeOpacity="0.4" />
              <line x1="180" y1="20" x2="180" y2="160" stroke="#334155" strokeWidth="1" />

              {/* Highway Curves */}
              <path d="M 30,30 Q 120,90 210,150" fill="none" stroke="#475569" strokeWidth="2" />

              {/* Area Labels */}
              <text x="35" y="165" fill="#64748b" fontSize="8" fontFamily="monospace">Electronic City</text>
              <text x="100" y="30" fill="#64748b" fontSize="8" fontFamily="monospace">Koramangala</text>
              <text x="160" y="40" fill="#64748b" fontSize="8" fontFamily="monospace">Whitefield</text>
              <text x="135" y="125" fill="#64748b" fontSize="8" fontFamily="monospace">Sarjapur Road</text>

              {/* Clickable Pins for each property */}
              {PROPERTIES.map(p => {
                const isSelected = selectedProperty?.id === p.id;
                return (
                  <g
                    key={p.id}
                    onClick={() => {
                      setSelectedProperty(p);
                      setActiveImageIdx(0);
                    }}
                    className="cursor-pointer group"
                  >
                    {/* Pulsing ring */}
                    <circle
                      cx={p.mapCoords.x}
                      cy={p.mapCoords.y}
                      r={isSelected ? 10 : 7}
                      fill="#10b981"
                      fillOpacity={isSelected ? 0.4 : 0.2}
                      className="transition-all"
                    />
                    {/* Center pin point */}
                    <circle
                      cx={p.mapCoords.x}
                      cy={p.mapCoords.y}
                      r="4"
                      fill={isSelected ? '#34d399' : '#10b981'}
                      stroke="#020617"
                      strokeWidth="1.5"
                    />
                    {/* Property Label tooltip on hover */}
                    <text
                      x={p.mapCoords.x}
                      y={p.mapCoords.y - 12}
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize="7"
                      fontWeight="bold"
                      className="opacity-0 group-hover:opacity-100 transition-opacity bg-black"
                    >
                      {p.title.split(' ')[0]} ({p.priceStr})
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 3: Interactive Home Loan EMI Calculator           */}
      {/* ========================================================= */}
      <section id="emi-calculator" className="py-20 px-4 sm:px-6 max-w-5xl mx-auto border-t border-white/5">
        <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border border-emerald-900/40 rounded-3xl p-6 sm:p-10 shadow-2xl">
          <div className="max-w-xl mx-auto text-center mb-10">
            <span className="text-emerald-400 text-xs uppercase tracking-widest font-bold">Financial Planning Engine</span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display mt-1">
              Home Loan EMI & Amortization Calculator
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Adjust principal, interest rate, and tenure sliders to preview exact monthly outflow.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Sliders */}
            <div className="lg:col-span-7 space-y-6">
              {/* Slider 1: Loan Amount */}
              <div>
                <div className="flex justify-between items-center text-xs mb-2">
                  <span className="font-semibold text-slate-300">Loan Amount (Principal)</span>
                  <span className="font-mono font-bold text-emerald-400 text-sm">
                    {formatINR(loanPrincipal)}
                  </span>
                </div>
                <input
                  type="range"
                  min="2000000"
                  max="40000000"
                  step="500000"
                  value={loanPrincipal}
                  onChange={e => setLoanPrincipal(+e.target.value)}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                  <span>₹20 Lakhs</span>
                  <span>₹2 Cr</span>
                  <span>₹4 Cr</span>
                </div>
              </div>

              {/* Slider 2: Interest Rate */}
              <div>
                <div className="flex justify-between items-center text-xs mb-2">
                  <span className="font-semibold text-slate-300">Annual Interest Rate</span>
                  <span className="font-mono font-bold text-emerald-400 text-sm">
                    {interestRate.toFixed(1)}% p.a.
                  </span>
                </div>
                <input
                  type="range"
                  min="7.0"
                  max="14.0"
                  step="0.1"
                  value={interestRate}
                  onChange={e => setInterestRate(+e.target.value)}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                  <span>7.0%</span>
                  <span>8.5% (Typical Bank Rate)</span>
                  <span>14.0%</span>
                </div>
              </div>

              {/* Slider 3: Loan Tenure */}
              <div>
                <div className="flex justify-between items-center text-xs mb-2">
                  <span className="font-semibold text-slate-300">Loan Tenure</span>
                  <span className="font-mono font-bold text-emerald-400 text-sm">
                    {tenureYears} Years ({totalMonths} Months)
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="30"
                  step="1"
                  value={tenureYears}
                  onChange={e => setTenureYears(+e.target.value)}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                  <span>5 Years</span>
                  <span>20 Years</span>
                  <span>30 Years</span>
                </div>
              </div>
            </div>

            {/* Right Donut & Results Card */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-950 border border-white/10 flex flex-col items-center text-center">
              <span className="text-[10px] font-mono uppercase text-slate-400">ESTIMATED MONTHLY EMI</span>
              <p className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-mono my-2">
                {formatINR(calculatedEmi)}
                <span className="text-xs text-slate-400 font-sans font-normal"> / mo</span>
              </p>

              {/* Plain SVG Donut Chart */}
              <div className="relative w-36 h-36 my-4 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
                  {/* Background Total Circle */}
                  <circle
                    cx="80"
                    cy="80"
                    r={circleRadius}
                    fill="transparent"
                    stroke="#334155"
                    strokeWidth="18"
                  />
                  {/* Principal Segment (Emerald) */}
                  <circle
                    cx="80"
                    cy="80"
                    r={circleRadius}
                    fill="transparent"
                    stroke="#10b981"
                    strokeWidth="18"
                    strokeDasharray={`${principalStrokeDash} ${circumference}`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-xs font-mono font-bold text-white">{principalPercentage}%</span>
                  <span className="text-[9px] text-slate-400 uppercase">Principal</span>
                </div>
              </div>

              {/* Breakdown Legend */}
              <div className="w-full space-y-2 text-xs pt-3 border-t border-white/10 text-left">
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1.5 text-slate-300">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    Principal Loan:
                  </span>
                  <span className="font-mono font-bold text-white">{formatINR(loanPrincipal)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1.5 text-slate-300">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                    Total Interest:
                  </span>
                  <span className="font-mono font-bold text-slate-300">{formatINR(totalInterestPayable)}</span>
                </div>
                <div className="flex justify-between items-center pt-1 border-t border-white/5 font-bold">
                  <span className="text-slate-200">Total Payable:</span>
                  <span className="font-mono text-emerald-400">{formatINR(totalAmountPayable)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* PROPERTY DETAIL DRAWER (Slide-in modal)                  */}
      {/* ========================================================= */}
      {selectedProperty && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border-l border-white/15 w-full max-w-2xl h-full overflow-y-auto p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative">
            <button
              onClick={() => setSelectedProperty(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-black/50 hover:bg-black text-slate-400 hover:text-white transition-colors cursor-pointer z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              {/* Drawer Gallery Carousel */}
              <div className="relative rounded-2xl overflow-hidden h-72 mb-6">
                <SkeletonImage
                  src={selectedProperty.images[activeImageIdx] || selectedProperty.images[0]}
                  alt={selectedProperty.title}
                  className="w-full h-full object-cover"
                />

                {selectedProperty.images.length > 1 && (
                  <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2 z-10">
                    {selectedProperty.images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImageIdx(idx)}
                        className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                          activeImageIdx === idx ? 'bg-emerald-400 w-6' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Title & Price Header */}
              <div className="flex flex-wrap items-baseline justify-between gap-2 pb-4 border-b border-white/10">
                <div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 uppercase font-bold">
                    {selectedProperty.status}
                  </span>
                  <h3 className="text-2xl font-bold text-white mt-1">{selectedProperty.title}</h3>
                  <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{selectedProperty.loc}, Bengaluru</span>
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-extrabold text-emerald-400">{selectedProperty.priceStr}</span>
                  <p className="text-[11px] text-slate-400">All Inclusive Estimated</p>
                </div>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6 text-xs">
                <div className="p-3 rounded-xl bg-slate-950 border border-white/10">
                  <span className="text-slate-500 text-[10px] uppercase">Configuration</span>
                  <p className="font-bold text-white mt-0.5">{selectedProperty.bhk}</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-white/10">
                  <span className="text-slate-500 text-[10px] uppercase">Carpet Area</span>
                  <p className="font-bold text-white mt-0.5">{selectedProperty.area}</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-white/10">
                  <span className="text-slate-500 text-[10px] uppercase">Floor Structure</span>
                  <p className="font-bold text-white mt-0.5">{selectedProperty.floors} Levels</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-white/10">
                  <span className="text-slate-500 text-[10px] uppercase">Reserved Car Parks</span>
                  <p className="font-bold text-white mt-0.5">{selectedProperty.parking} Slots</p>
                </div>
              </div>

              {/* Overview text */}
              <div className="mb-6">
                <h4 className="text-xs font-mono uppercase text-slate-400 font-bold mb-2">Project Overview</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{selectedProperty.highlights}</p>
              </div>

              {/* Amenities Grid */}
              <div className="mb-6">
                <h4 className="text-xs font-mono uppercase text-slate-400 font-bold mb-3">Amenities & Security</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {selectedProperty.amenities.map((amenity, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-300 p-2 rounded-lg bg-white/5 border border-white/5">
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floor Plan Placeholder */}
              <div className="p-6 rounded-2xl border-2 border-dashed border-white/15 text-center mb-6 bg-slate-950">
                <Layers className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                <p className="text-xs font-bold text-white">Architectural Floor Plans Available</p>
                <p className="text-[11px] text-slate-400 mt-1">
                  Request custom 2D & 3D dimensioned layouts directly on WhatsApp.
                </p>
              </div>
            </div>

            {/* Drawer Actions */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  setSchedProperty(selectedProperty);
                  setSelectedProperty(null);
                }}
                className="flex-1 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-emerald-950/40"
              >
                Schedule Private Site Visit
              </button>
              <a
                href={getWhatsAppUrl(`Hello Skyline Estates! I'm reviewing "${selectedProperty.title}" and would like to receive the complete project brochure and pricing sheet.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Enquire on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SITE VISIT SCHEDULER MODAL                                */}
      {/* ========================================================= */}
      {schedProperty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-emerald-500/40 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative">
            <button
              onClick={() => {
                setSchedProperty(null);
                setVisitToken(null);
              }}
              className="absolute top-5 right-5 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {visitToken ? (
              <div className="text-center py-4 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold block">
                  WALKTHROUGH CONFIRMED
                </span>
                <h3 className="text-2xl font-bold text-white">Visit Pass: {visitToken}</h3>
                <p className="text-xs text-slate-300 max-w-md mx-auto">
                  A personal walkthrough for <strong>{schedProperty.title}</strong> has been scheduled for <strong>{schedDate}</strong> at <strong>{schedSlot}</strong>.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
                  <button
                    onClick={handleDownloadVisitICS}
                    className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4 text-emerald-400" />
                    <span>Download Calendar (.ics)</span>
                  </button>
                  <a
                    href={getWhatsAppUrl(`Hello Skyline Estates! I have scheduled a site visit for "${schedProperty.title}" on ${schedDate} at ${schedSlot}. My visit token is ${visitToken}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Share on WhatsApp</span>
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleScheduleVisit} className="space-y-4">
                <div>
                  <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold">VIP SITE VISIT</span>
                  <h3 className="text-xl font-bold text-white mt-0.5">{schedProperty.title}</h3>
                  <p className="text-xs text-slate-400">{schedProperty.loc}, Bengaluru</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Preferred Date *</label>
                    <input
                      type="date"
                      required
                      min={todayStr()}
                      value={schedDate}
                      onChange={e => setSchedDate(e.target.value)}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Preferred Time Slot *</label>
                    <select
                      value={schedSlot}
                      onChange={e => setSchedSlot(e.target.value)}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                    >
                      <option value="10:00 AM">10:00 AM (Morning)</option>
                      <option value="11:30 AM">11:30 AM (Morning)</option>
                      <option value="02:30 PM">02:30 PM (Afternoon)</option>
                      <option value="04:30 PM">04:30 PM (Evening)</option>
                      <option value="05:30 PM">05:30 PM (Sunset View)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Anand Murthy"
                    value={visitorName}
                    onChange={e => setVisitorName(e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">WhatsApp Phone *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9876543210"
                    value={visitorPhone}
                    onChange={e => setVisitorPhone(e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                {/* Pickup Mode */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Preferred Site Visit Transport</label>
                  <div className="grid grid-cols-2 gap-2.5">
                    {(['Self-drive / Direct', 'Free Luxury Chauffeur Cab'] as const).map(mode => (
                      <button
                        key={mode}
                        type="button"
                        onClick={() => setPickupMode(mode)}
                        className={`p-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                          pickupMode === mode
                            ? 'bg-emerald-600/30 border-emerald-400 text-emerald-300 shadow'
                            : 'bg-slate-950 border-white/10 text-slate-400 hover:text-white'
                        }`}
                      >
                        {mode === 'Self-drive / Direct' ? '🚗 Self-Drive / Direct' : '🚕 Free Cab Pickup'}
                      </button>
                    ))}
                  </div>
                </div>

                {pickupMode === 'Free Luxury Chauffeur Cab' && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Your Pickup Residence Address *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Flat 402, Prestige Palms, Indiranagar"
                      value={pickupAddress}
                      onChange={e => setPickupAddress(e.target.value)}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                )}

                <DemoFormNote />

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-emerald-950/40 cursor-pointer"
                >
                  Confirm Free Guided Walkthrough
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SAVED SHORTLIST MODAL                                     */}
      {/* ========================================================= */}
      {showShortlistModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-white/10 rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl relative max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setShowShortlistModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
              <span>Saved Shortlist ({shortlist.length})</span>
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Saved locally on your browser. Easily compare or schedule site walkthroughs.
            </p>

            {shortlist.length === 0 ? (
              <EmptyState
                icon="💔"
                title="Your shortlist is currently empty"
                description="Click the heart icon on any property card to save it here for later review."
              />
            ) : (
              <div className="space-y-3">
                {PROPERTIES.filter(p => shortlist.includes(p.id)).map(prop => (
                  <div
                    key={prop.id}
                    className="p-3.5 rounded-2xl bg-slate-950 border border-white/10 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <img src={prop.images[0]} alt={prop.title} className="w-14 h-14 rounded-xl object-cover" />
                      <div>
                        <p className="font-bold text-sm text-white">{prop.title}</p>
                        <p className="text-[11px] text-slate-400">{prop.loc} • {prop.bhk}</p>
                        <p className="text-xs font-mono font-bold text-emerald-400 mt-0.5">{prop.priceStr}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedProperty(prop);
                          setShowShortlistModal(false);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold"
                      >
                        Inspect
                      </button>
                      <button
                        onClick={() => toggleShortlist(prop.id)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* PROPERTY COMPARISON MODAL                                 */}
      {/* ========================================================= */}
      {showCompareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-white/10 rounded-3xl p-6 sm:p-8 max-w-4xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowCompareModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-white mb-1">Side-by-Side Property Comparison</h3>
            <p className="text-xs text-slate-400 mb-6">Comparing up to 3 selected properties across specifications.</p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead>
                  <tr className="border-b border-white/10 text-white">
                    <th className="py-3 px-4">Metric</th>
                    {PROPERTIES.filter(p => compareList.includes(p.id)).map(p => (
                      <th key={p.id} className="py-3 px-4 font-bold text-emerald-400 min-w-[180px]">
                        {p.title}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr>
                    <td className="py-3 px-4 font-medium text-slate-400">Price</td>
                    {PROPERTIES.filter(p => compareList.includes(p.id)).map(p => (
                      <td key={p.id} className="py-3 px-4 font-mono font-bold text-white">{p.priceStr}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-slate-400">Configuration</td>
                    {PROPERTIES.filter(p => compareList.includes(p.id)).map(p => (
                      <td key={p.id} className="py-3 px-4 text-white">{p.bhk}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-slate-400">Locality</td>
                    {PROPERTIES.filter(p => compareList.includes(p.id)).map(p => (
                      <td key={p.id} className="py-3 px-4 text-white">{p.loc}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-slate-400">Carpet Area</td>
                    {PROPERTIES.filter(p => compareList.includes(p.id)).map(p => (
                      <td key={p.id} className="py-3 px-4 text-white">{p.area}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-slate-400">Status</td>
                    {PROPERTIES.filter(p => compareList.includes(p.id)).map(p => (
                      <td key={p.id} className="py-3 px-4 text-white">{p.status}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-slate-400">Orientation</td>
                    {PROPERTIES.filter(p => compareList.includes(p.id)).map(p => (
                      <td key={p.id} className="py-3 px-4 text-white">{p.facing}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-slate-400">Car Parks</td>
                    {PROPERTIES.filter(p => compareList.includes(p.id)).map(p => (
                      <td key={p.id} className="py-3 px-4 text-white">{p.parking} Slots</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center">
              <button
                onClick={() => setCompareList([])}
                className="text-xs text-slate-400 hover:text-rose-400 underline"
              >
                Clear Comparison
              </button>
              <button
                onClick={() => setShowCompareModal(false)}
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold"
              >
                Close Comparison
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 bg-slate-950 px-4 sm:px-6 text-center text-xs text-slate-400">
        <p className="font-display font-bold text-lg text-white mb-2 uppercase">SKYLINE ESTATES PRIVATE LIMITED</p>
        <p className="mb-4">100 Feet Road, 4th Block, Koramangala, Bengaluru, Karnataka • RERA Reg: PRM/KA/RERA/1251/310/PR/180516/001750</p>
        <p className="text-[11px] text-slate-500">
          Real Estate Demo Showcase Portal Designed & Developed by Nexora Technologies
        </p>
      </footer>
    </div>
  );
};

export default RealEstateDemo;
