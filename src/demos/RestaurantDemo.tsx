import React, { useState, useMemo } from 'react';
import {
  ShoppingBag,
  Clock,
  MapPin,
  Search,
  Plus,
  Minus,
  Trash2,
  X,
  CheckCircle2,
  ArrowRight,
  Flame,
  ChefHat,
  Check,
  Award,
  Download,
  Sparkles,
  Phone,
  Mail
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
  useToast,
  useCountdown
} from './shared/hooks';
import { useDemoState } from './shared/DemoStateContext';
import {
  DemoBadge,
  ToastContainer,
  WhatsAppButton,
  SkeletonImage,
  Reveal,
  DemoFormNote,
  FieldError,
  EmptyState,
  Stepper,
  DemoMobileBottomBar
} from './shared/components';
import { getWhatsAppUrl } from '../utils/whatsapp';

interface Dish {
  id: string;
  name: string;
  cat: 'mains' | 'appetizers' | 'drinks' | 'desserts';
  price: number;
  veg: boolean;
  spice: number;
  desc: string;
  image: string;
  tag?: string;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
  image: string;
  spice?: string;
  portion?: string;
  addOns?: string[];
}

const DISHES: Dish[] = [
  { id: '1', name: 'Black Truffle Tartare', cat: 'mains', price: 750, veg: false, spice: 0, desc: 'Aged tenderloin, cured yolk, perigord truffle, gold leaf.', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=70', tag: 'Chef Special' },
  { id: '2', name: 'Hokkaido Uni Linguine', cat: 'mains', price: 890, veg: false, spice: 1, desc: 'Artisanal pasta, fresh sea urchin foam, lemon zest, chili oil.', image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&q=70', tag: 'Signature' },
  { id: '3', name: 'Forest Mushroom Risotto', cat: 'mains', price: 620, veg: true, spice: 0, desc: 'Chanterelles, arborio rice, truffle oil, shaved pecorino.', image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&q=70', tag: 'Veg' },
  { id: '4', name: 'Wild Mushroom Crostini', cat: 'appetizers', price: 420, veg: true, spice: 0, desc: 'Toasted brioche, sautéed chanterelles, garlic confit.', image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?w=400&q=70' },
  { id: '5', name: 'Tempura Soft Shell Crab', cat: 'appetizers', price: 560, veg: false, spice: 2, desc: 'Light yuzu emulsion, pickled radish, shichimi togarashi.', image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&q=70' },
  { id: '6', name: 'Burrata & Heirloom Tomatoes', cat: 'appetizers', price: 480, veg: true, spice: 0, desc: 'Fresh burrata, heirloom tomatoes, basil pesto, aged balsamic.', image: 'https://images.unsplash.com/photo-1563865436874-9aef32095fad?w=400&q=70', tag: 'Veg' },
  { id: '7', name: 'Midnight Smoke Cocktail', cat: 'drinks', price: 480, veg: true, spice: 0, desc: 'Smoked oak bourbon, activated charcoal, maple reduction.', image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&q=70', tag: 'Signature' },
  { id: '8', name: 'Hibiscus Spritz', cat: 'drinks', price: 280, veg: true, spice: 0, desc: 'Hibiscus cordial, elderflower, sparkling water, fresh mint.', image: 'https://images.unsplash.com/photo-1557687647-1bff1c2c94b2?w=400&q=70', tag: 'Mocktail' },
  { id: '9', name: 'Saffron Lassi', cat: 'drinks', price: 180, veg: true, spice: 0, desc: 'Thick hung curd, saffron, rose water, silver vark.', image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&q=70', tag: 'Non-Alcoholic' },
  { id: '10', name: 'Valrhona Chocolate Sphere', cat: 'desserts', price: 490, veg: true, spice: 0, desc: 'Salted caramel poured tableside, single-origin chocolate, raspberry.', image: 'https://images.unsplash.com/photo-1579372786545-d24232daf58c?w=400&q=70', tag: 'Must Try' },
  { id: '11', name: 'Mango Saffron Panna Cotta', cat: 'desserts', price: 350, veg: true, spice: 0, desc: 'Italian panna cotta, Alphonso mango coulis, pistachio crumble.', image: 'https://images.unsplash.com/photo-1488477304112-4944851de03d?w=400&q=70' },
  { id: '12', name: 'Seasonal Tasting Platter', cat: 'desserts', price: 680, veg: true, spice: 0, desc: '5 micro-desserts: macaron, madeleine, tart, truffle, mousse shot.', image: 'https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?w=400&q=70', tag: 'Share' },
];

const TIME_SLOTS = ['12:30 PM', '1:30 PM', '3:00 PM', '7:00 PM', '8:00 PM', '9:30 PM'];

const TABLES = [
  { id: 'T1', label: 'T1', seats: 2, booked: false },
  { id: 'T2', label: 'T2', seats: 4, booked: true },
  { id: 'T3', label: 'T3', seats: 4, booked: false },
  { id: 'T4', label: 'T4', seats: 2, booked: false },
  { id: 'T5', label: 'T5', seats: 6, booked: true },
  { id: 'T6', label: 'T6', seats: 4, booked: false },
  { id: 'T7', label: 'T7', seats: 8, booked: false },
  { id: 'T8', label: 'T8', seats: 2, booked: false },
];

function slotTo24h(slot: string): string {
  const match = slot.match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (!match) return '19:00';
  let h = parseInt(match[1], 10);
  const m = match[2];
  const ampm = match[3].toUpperCase();
  if (ampm === 'PM' && h < 12) h += 12;
  if (ampm === 'AM' && h === 12) h = 0;
  return `${String(h).padStart(2, '0')}:${m}`;
}

const OrderTimelineTracker: React.FC<{
  order: { id: string; total: number; type: string; count: number };
  onReset: () => void;
}> = ({ order, onReset }) => {
  const { remaining, pct } = useCountdown(90);
  const step = remaining > 60 ? 1 : remaining > 0 ? 2 : 3;

  return (
    <div className="p-6 space-y-6 text-stone-200">
      <div className="text-center space-y-2">
        <div className="inline-flex p-3 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
          <ChefHat className="w-8 h-8 animate-bounce" />
        </div>
        <h4 className="font-serif text-2xl font-bold text-stone-100">Order Placed</h4>
        <p className="text-xs font-mono text-amber-400 tracking-wider">REF: {order.id}</p>
        <p className="text-xs text-stone-400">{order.type} · {order.count} dishes · {formatINR(order.total)}</p>
      </div>

      <div className="bg-stone-900/90 rounded-2xl p-4 border border-stone-800 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="text-stone-400">Preparation ETA (90s Timer)</span>
          <span className="font-mono text-base font-bold text-amber-400">
            {Math.floor(remaining / 60)}:{String(remaining % 60).padStart(2, '0')}
          </span>
        </div>
        <div className="w-full h-2 bg-stone-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-600 to-amber-400 transition-all duration-1000 ease-linear"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      <div className="space-y-4 pt-2">
        <div className="flex items-start gap-3">
          <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div>
            <p className="text-sm font-semibold text-stone-200">1. Confirmed</p>
            <p className="text-xs text-stone-400">Received and verified by front desk</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border ${
            step >= 2 ? 'bg-amber-500/20 text-amber-400 border-amber-500/40 animate-pulse' : 'bg-stone-800 text-stone-600 border-stone-700'
          }`}>
            <Flame className="w-4 h-4" />
          </div>
          <div>
            <p className={`text-sm font-semibold ${step >= 2 ? 'text-amber-400' : 'text-stone-500'}`}>
              2. Preparing {step === 2 && '(Live in Kitchen)'}
            </p>
            <p className="text-xs text-stone-400">Wood-fire hearth and artisanal plating</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border ${
            step === 3 ? 'bg-emerald-500 text-stone-950 border-emerald-400 shadow-lg shadow-emerald-500/30' : 'bg-stone-800 text-stone-600 border-stone-700'
          }`}>
            <Check className="w-4 h-4" />
          </div>
          <div>
            <p className={`text-sm font-semibold ${step === 3 ? 'text-emerald-400' : 'text-stone-500'}`}>
              3. Ready {step === 3 ? '· Bon Appétit!' : ''}
            </p>
            <p className="text-xs text-stone-400">
              {step === 3 ? 'Plates are ready for table service / dispatch' : 'Awaiting final quality inspection'}
            </p>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={onReset}
        className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm transition-all focus:outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer shadow-lg shadow-amber-500/20"
      >
        Place Another Order
      </button>
    </div>
  );
};

export const RestaurantDemo: React.FC<{ onOrderThisWebsite?: () => void; onBackToMain?: () => void }> = ({
  onOrderThisWebsite
}) => {
  const { toasts, show, dismiss } = useToast();
  const { toast, triggerSimulatedDispatch, playChime } = useDemoState();
  const [cart, setCart] = useLocalStorage<CartItem[]>('savoria_cart', []);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orderType, setOrderType] = useState<'Dine-in' | 'Takeaway' | 'Delivery'>('Dine-in');
  const [tipPct, setTipPct] = useState<number>(10);
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');
  const [activeOrder, setActiveOrder] = useState<{ id: string; total: number; type: string; count: number } | null>(null);

  // Dish Customization Modal State
  const [customizingDish, setCustomizingDish] = useState<Dish | null>(null);
  const [customSpice, setCustomSpice] = useState<'Mild' | 'Medium' | 'Fiery Hot'>('Medium');
  const [customPortion, setCustomPortion] = useState<'Single' | 'Family Sharing (+₹160)'>('Single');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  // Menu filters
  const [category, setCategory] = useState<'all' | 'mains' | 'appetizers' | 'drinks' | 'desserts'>('all');
  const [dietary, setDietary] = useState<'all' | 'veg' | 'non-veg'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Table reservation state
  const [resDate, setResDate] = useState(todayStr());
  const [resSlot, setResSlot] = useState('7:00 PM');
  const [partySize, setPartySize] = useState(2);
  const [selectedTable, setSelectedTable] = useState('T1');
  const [seatingZone, setSeatingZone] = useState<'Indoor AC Cellar' | 'Alfresco Garden Terrace' | 'Private Chef Table'>('Indoor AC Cellar');
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [guestNotes, setGuestNotes] = useState('');
  const [resErrors, setResErrors] = useState<{ name?: string; phone?: string; table?: string }>({});
  const [confirmedBooking, setConfirmedBooking] = useState<{
    token: string;
    name: string;
    phone: string;
    date: string;
    time: string;
    table: string;
    guests: number;
    zone: string;
    notes?: string;
  } | null>(null);

  // Cart math
  const cartCount = useMemo(() => cart.reduce((s, i) => s + i.qty, 0), [cart]);
  const subtotal = useMemo(() => cart.reduce((s, i) => s + i.price * i.qty, 0), [cart]);
  const discount = couponApplied ? Math.round(subtotal * 0.1) : 0;
  const discountedSubtotal = Math.max(0, subtotal - discount);
  const gst = Math.round(discountedSubtotal * 0.05); // 5% restaurant GST
  const tipAmount = Math.round(subtotal * (tipPct / 100));
  const finalTotal = discountedSubtotal + gst + tipAmount;

  // WhatsApp text format
  const waCartMessage = useMemo(() => {
    const itemsText = cart.map(i => {
      const details = [i.spice, i.portion, ...(i.addOns || [])].filter(Boolean).join(', ');
      return `• ${i.name} x${i.qty} (${formatINR(i.price * i.qty)})${details ? ` [${details}]` : ''}`;
    }).join('\n');
    return `[Nexora demo - Savoria Bistro]\n\n*Savoria Fine Dining Order*\n${itemsText}\n\n*Dining Mode:* ${orderType}\n*Subtotal:* ${formatINR(subtotal)}\n*GST (5%):* ${formatINR(gst)}${discount > 0 ? `\n*Promo Discount:* -${formatINR(discount)}` : ''}\n*Gratuity:* ${formatINR(tipAmount)}\n*Total Payable:* ${formatINR(finalTotal)}\n\nPlease confirm availability and dispatch!`;
  }, [cart, orderType, subtotal, gst, discount, tipAmount, finalTotal]);

  const addToCart = (dish: Dish) => {
    playChime('pop');
    setCart(prev => {
      const idx = prev.findIndex(item => item.id === dish.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx].qty += 1;
        return copy;
      }
      return [...prev, { id: dish.id, name: dish.name, price: dish.price, qty: 1, image: dish.image }];
    });
    toast.success(`Added ${dish.name} to order`, 'Cart Updated');
  };

  const handleAddCustomizedToCart = () => {
    if (!customizingDish) return;
    playChime('pop');
    const addonPrice = selectedAddons.length * 70 + (customPortion.includes('+₹160') ? 160 : 0);
    const itemFinalPrice = customizingDish.price + addonPrice;

    setCart(prev => [
      ...prev,
      {
        id: `${customizingDish.id}-${Date.now()}`,
        name: customizingDish.name,
        price: itemFinalPrice,
        qty: 1,
        image: customizingDish.image,
        spice: customSpice,
        portion: customPortion,
        addOns: selectedAddons
      }
    ]);

    toast.success(
      `Customized ${customizingDish.name} added (${customSpice}, ${selectedAddons.length} add-ons)`,
      'Custom Dish Added'
    );
    setCustomizingDish(null);
    setSelectedAddons([]);
  };

  const updateCartQty = (id: string, delta: number) => {
    playChime('pop');
    setCart(prev =>
      prev
        .map(i => (i.id === id ? { ...i, qty: i.qty + delta } : i))
        .filter(i => i.qty > 0)
    );
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(i => i.id !== id));
    toast.info('Item removed from cart');
  };

  const handleApplyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    if (code === 'NEXORA10' || code === 'WELCOME10') {
      setCouponApplied(true);
      setCouponError('');
      playChime('success');
      toast.success(`Coupon code "${code}" verified! 10% instant bill reduction applied.`, 'Discount Active');
    } else {
      setCouponError('Invalid promo code. Enter "NEXORA10" for 10% off');
      setCouponApplied(false);
    }
  };

  const handlePlaceOrder = () => {
    if (cart.length === 0) return;
    const orderId = `NX-ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    setActiveOrder({
      id: orderId,
      total: finalTotal,
      type: orderType,
      count: cartCount
    });
    setCart([]);
    playChime('success');
    toast.success(`Order #${orderId} transmitted to chef! Live preparation timeline active.`, 'Order Placed');
  };

  const handleReservationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: { name?: string; phone?: string; table?: string } = {};
    if (!guestName.trim()) errs.name = 'Full name is required';
    if (!isValidPhone(guestPhone)) errs.phone = 'Valid 10-digit phone number is required';
    if (!selectedTable) errs.table = 'Please select a table on the floor plan';

    if (Object.keys(errs).length > 0) {
      setResErrors(errs);
      return;
    }
    setResErrors({});
    const token = `NX-${Math.floor(1000 + Math.random() * 9000)}`;
    setConfirmedBooking({
      token,
      name: guestName,
      phone: guestPhone,
      date: resDate,
      time: resSlot,
      table: selectedTable,
      guests: partySize,
      zone: seatingZone,
      notes: guestNotes
    });
    playChime('success');
    toast.success(`Table ${selectedTable} reserved successfully! Confirmation #${token} sent via WhatsApp.`, 'Table Reserved');
    triggerSimulatedDispatch('whatsapp', {
      recipient: guestPhone,
      title: `Table ${selectedTable} Reserved`,
      token
    });
  };

  const handleDownloadCalendar = () => {
    if (!confirmedBooking) return;
    const icsContent = generateICS({
      title: `Dinner Reservation at Savoria Bistro (${confirmedBooking.table})`,
      description: `Party of ${confirmedBooking.guests} guests. Booked under ${confirmedBooking.name}. Token: ${confirmedBooking.token}.`,
      location: 'Savoria Bistro, 100ft Road, Indiranagar, Bengaluru',
      startDate: confirmedBooking.date,
      startTime: slotTo24h(confirmedBooking.time),
      durationMins: 120
    });
    downloadICS(`savoria-booking-${confirmedBooking.token}.ics`, icsContent);
    show('Calendar invitation downloaded', 'info');
  };

  // Filtered dishes
  const filteredDishes = useMemo(() => {
    return DISHES.filter(d => {
      if (category !== 'all' && d.cat !== category) return false;
      if (dietary === 'veg' && !d.veg) return false;
      if (dietary === 'non-veg' && d.veg) return false;
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        return d.name.toLowerCase().includes(q) || d.desc.toLowerCase().includes(q);
      }
      return true;
    });
  }, [category, dietary, searchTerm]);

  return (
    <div className="min-h-screen bg-[#0c0a09] text-stone-200 font-sans selection:bg-amber-500 selection:text-stone-950 pb-24 md:pb-8">
      <ToastContainer toasts={toasts} dismiss={dismiss} />

      {/* Branded Demo Concept Tag in Document Flow */}
      <DemoBadge />

      {/* Sticky Navigation */}
      <nav className="sticky top-0 z-40 bg-[#0c0a09]/95 backdrop-blur-md border-b border-stone-800/80 px-4 sm:px-8 py-3 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
              <Sparkles className="w-4 h-4" />
            </span>
            <a href="#hero" className="font-serif tracking-widest text-base sm:text-xl font-bold text-amber-400 hover:text-amber-300 transition-colors truncate">
              SAVORIA BISTRO
            </a>
          </div>

          <div className="hidden md:flex items-center gap-8 text-xs font-semibold tracking-wider uppercase text-stone-400">
            <a href="#menu" className="hover:text-amber-400 transition-colors">Menu</a>
            <a href="#reserve" className="hover:text-amber-400 transition-colors">Reserve</a>
            <a href="#story" className="hover:text-amber-400 transition-colors">Story</a>
            <a href="#contact" className="hover:text-amber-400 transition-colors">Contact</a>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <a
              href={getWhatsAppUrl("[Nexora demo - Savoria Bistro]\n\nHello Savoria Bistro, I'd like to place an order / make an enquiry.")}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Order on WhatsApp"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/80 hover:bg-emerald-900/90 active:scale-95 text-emerald-300 border border-emerald-500/30 text-xs font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-emerald-400"
            >
              WhatsApp Order
            </a>

            <a
              href="#reserve"
              className="hidden sm:inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-stone-950 text-xs font-bold transition-all shadow-md shadow-amber-500/20 focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              Book Table
            </a>

            <button
              type="button"
              aria-label={`Open Cart (${cartCount} items)`}
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-xl bg-stone-900 border border-stone-800 hover:border-amber-500/50 text-stone-200 hover:text-amber-400 transition-all focus:outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-amber-500 text-stone-950 text-[10px] font-bold flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-[520px] sm:min-h-[640px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80"
            alt="Savoria Bistro Ambience"
            className="w-full h-full object-cover brightness-[0.35] scale-105 transform motion-safe:animate-[pulse_10s_ease-in-out_infinite]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a09] via-[#0c0a09]/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 py-16 sm:py-20 text-center space-y-6">
          {/* Honesty cleanup: Neutral description instead of Michelin */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono uppercase tracking-widest max-w-full">
            <Sparkles className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Artisanal Fine Dining · Sample Concept</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-6xl md:text-7xl font-bold tracking-tight text-stone-100 leading-tight">
            Culinary Artistry <br />
            <span className="text-amber-400 italic font-normal">Meets Modern Elegance</span>
          </h1>

          <p className="text-stone-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Perigord truffles, Hokkaido uni, and wood-fire grilled delicacies curated daily by Chef Marco Valenti in the heart of Bengaluru.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 max-w-md mx-auto sm:max-w-none">
            <a
              href="#menu"
              className="w-full sm:w-auto h-12 min-h-[48px] px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm tracking-wide transition-all shadow-lg shadow-amber-500/30 flex items-center justify-center cursor-pointer"
            >
              Explore Menu
            </a>
            <a
              href="#reserve"
              className="w-full sm:w-auto h-12 min-h-[48px] px-6 rounded-xl bg-stone-900/90 hover:bg-stone-800 text-stone-200 border border-stone-700 font-semibold text-sm transition-all flex items-center justify-center cursor-pointer"
            >
              Reserve a Table
            </a>
          </div>

          {/* Stats / Info Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 max-w-3xl mx-auto">
            <div className="p-3.5 rounded-2xl bg-stone-950/70 border border-stone-800/80 backdrop-blur-md flex items-center justify-center gap-3 text-left">
              <Clock className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <p className="text-[11px] text-stone-400 uppercase font-mono">Service Hours</p>
                <p className="text-xs font-bold text-stone-200">Daily: 12:30 PM - 11:30 PM</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-stone-950/70 border border-stone-800/80 backdrop-blur-md flex items-center justify-center gap-3 text-left">
              <MapPin className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <p className="text-[11px] text-stone-400 uppercase font-mono">Sanctuary</p>
                <p className="text-xs font-bold text-stone-200">Indiranagar, Bengaluru</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-stone-950/70 border border-stone-800/80 backdrop-blur-md flex items-center justify-center gap-3 text-left">
              <Award className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <p className="text-[11px] text-stone-400 uppercase font-mono">Dining Experience</p>
                <p className="text-xs font-bold text-stone-200">Handcrafted Tasting Menu</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto space-y-10">
        <Reveal>
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400">Degustation & À La Carte</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-100">The Savoria Menu</h2>
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
              Every dish is hand-crafted with seasonal micro-harvests, wild-foraged mushrooms, and sustainable maritime delicacies.
            </p>
          </div>
        </Reveal>

        {/* Filter Controls Bar */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Category Tabs: Horizontally scrollable chip row on mobile */}
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none snap-x flex-nowrap w-full md:w-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0">
              {[
                { id: 'all', label: 'All Dishes' },
                { id: 'mains', label: 'Mains' },
                { id: 'appetizers', label: 'Appetizers' },
                { id: 'drinks', label: 'Drinks' },
                { id: 'desserts', label: 'Desserts' },
              ].map(cat => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategory(cat.id as any)}
                  className={`snap-start shrink-0 whitespace-nowrap px-4 py-2.5 sm:py-2 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer min-h-[44px] sm:min-h-0 flex items-center justify-center ${
                    category === cat.id
                      ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20 font-bold'
                      : 'bg-stone-900 border border-stone-800 text-stone-400 hover:text-stone-200 hover:border-stone-700'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search Input - 16px font on mobile to prevent iOS zoom */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search dishes or ingredients..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full bg-stone-900 border border-stone-800 rounded-xl pl-9 pr-4 py-2.5 sm:py-2 text-base sm:text-xs text-stone-200 placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500 min-h-[44px] sm:min-h-0"
              />
            </div>
          </div>

          {/* Veg / Non-Veg Toggle Buttons */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-stone-500 mr-1">Dietary:</span>
            {[
              { id: 'all', label: 'All' },
              { id: 'veg', label: 'Veg Only' },
              { id: 'non-veg', label: 'Non-Veg Only' },
            ].map(diet => (
              <button
                key={diet.id}
                type="button"
                onClick={() => setDietary(diet.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                  dietary === diet.id
                    ? 'bg-stone-800 border-amber-500/50 text-amber-300'
                    : 'bg-stone-900/50 border-stone-800/80 text-stone-400 hover:text-stone-200'
                }`}
              >
                {diet.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dishes Grid */}
        {filteredDishes.length === 0 ? (
          <EmptyState
            icon="🍽️"
            title="No dishes found"
            description="Try clearing your search query or switching dietary toggles."
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDishes.map(dish => {
              const inCartItem = cart.find(i => i.id === dish.id);
              return (
                <div
                  key={dish.id}
                  className="group rounded-2xl bg-stone-900/60 border border-stone-800/80 hover:border-amber-500/30 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-black/40"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-stone-950">
                    <SkeletonImage
                      src={dish.image}
                      alt={dish.name}
                      fallbackGradient="from-amber-950/40 to-stone-900"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span
                        className={`inline-flex items-center justify-center w-4 h-4 rounded border p-0.5 bg-stone-950/80 ${
                          dish.veg ? 'border-emerald-500' : 'border-rose-600'
                        }`}
                        title={dish.veg ? 'Vegetarian' : 'Non-Vegetarian'}
                      >
                        <span className={`w-2 h-2 rounded-full ${dish.veg ? 'bg-emerald-500' : 'bg-rose-600'}`} />
                      </span>

                      {dish.tag && (
                        <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/90 text-stone-950 shadow">
                          {dish.tag}
                        </span>
                      )}
                    </div>

                    {dish.spice > 0 && (
                      <div className="absolute top-3 right-3 flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-stone-950/80 border border-stone-800 text-amber-400 text-[10px]">
                        {Array.from({ length: dish.spice }).map((_, idx) => (
                          <Flame key={idx} className="w-3 h-3 fill-amber-500 text-amber-500" />
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-1.5">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-serif text-base font-bold text-stone-100 group-hover:text-amber-300 transition-colors">
                          {dish.name}
                        </h3>
                        <span className="font-mono text-sm font-bold text-amber-400 shrink-0">
                          {formatINR(dish.price)}
                        </span>
                      </div>
                      <p className="text-xs text-stone-400 leading-relaxed line-clamp-2">
                        {dish.desc}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-stone-800/80 flex items-center justify-between">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-stone-500">
                        {dish.cat}
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setCustomizingDish(dish);
                            setCustomSpice(dish.spice > 1 ? 'Fiery Hot' : dish.spice === 1 ? 'Medium' : 'Mild');
                            setSelectedAddons([]);
                          }}
                          className="px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-stone-300 border border-stone-800 text-[11px] font-semibold transition-all cursor-pointer"
                          title="Customize spice, portion & modifiers"
                        >
                          Customize
                        </button>

                        {inCartItem ? (
                          <div className="flex items-center gap-2 bg-stone-800/80 px-2 py-1 rounded-xl border border-stone-700">
                            <button
                              type="button"
                              aria-label={`Decrease ${dish.name}`}
                              onClick={() => updateCartQty(dish.id, -1)}
                              className="w-6 h-6 rounded bg-stone-700 hover:bg-stone-600 text-stone-200 flex items-center justify-center text-xs"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold text-stone-100 min-w-[1rem] text-center">
                              {inCartItem.qty}
                            </span>
                            <button
                              type="button"
                              aria-label={`Increase ${dish.name}`}
                              onClick={() => updateCartQty(dish.id, 1)}
                              className="w-6 h-6 rounded bg-amber-500 hover:bg-amber-400 text-stone-950 flex items-center justify-center text-xs font-bold"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            aria-label={`Add ${dish.name} to cart`}
                            onClick={() => addToCart(dish)}
                            className="px-3.5 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500 text-amber-400 hover:text-stone-950 border border-amber-500/30 text-xs font-bold transition-all flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" /> Add
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Table Reservation Section */}
      <section id="reserve" className="py-20 px-4 sm:px-8 bg-stone-950/60 border-y border-stone-900">
        <div className="max-w-5xl mx-auto space-y-12">
          <Reveal>
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400">Intimate Dining</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-100">Reserve Your Table</h2>
              <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
                Choose your desired date, seating slot, party size, and tap a designated table on our interactive floor plan.
              </p>
            </div>
          </Reveal>

          {confirmedBooking ? (
            <div className="max-w-2xl mx-auto p-8 rounded-3xl bg-stone-900/90 border border-amber-500/30 text-center space-y-6 shadow-2xl">
              <div className="inline-flex p-3 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                  BOOKING REFERENCE: {confirmedBooking.token}
                </span>
                <h3 className="font-serif text-3xl font-bold text-stone-100 mt-3">Table Reservation Confirmed</h3>
                <p className="text-xs text-stone-400 mt-1">We have reserved Table {confirmedBooking.table} for you.</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-stone-950/60 border border-stone-800 text-left text-xs">
                <div>
                  <span className="text-stone-500 block">Date</span>
                  <span className="font-semibold text-stone-200">{confirmedBooking.date}</span>
                </div>
                <div>
                  <span className="text-stone-500 block">Slot</span>
                  <span className="font-semibold text-stone-200">{confirmedBooking.time}</span>
                </div>
                <div>
                  <span className="text-stone-500 block">Table</span>
                  <span className="font-semibold text-amber-400">{confirmedBooking.table}</span>
                </div>
                <div>
                  <span className="text-stone-500 block">Guests</span>
                  <span className="font-semibold text-stone-200">{confirmedBooking.guests} Person(s)</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleDownloadCalendar}
                  className="flex-1 py-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-400 border border-stone-700 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4" /> Download Calendar Invite (.ics)
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmedBooking(null)}
                  className="flex-1 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold transition-all shadow-md shadow-amber-500/20 cursor-pointer"
                >
                  Reserve Another Table
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleReservationSubmit} className="max-w-4xl mx-auto space-y-8 bg-stone-900/60 p-6 sm:p-10 rounded-3xl border border-stone-800">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                {/* Left column: Date, Party Size, Time Slot */}
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="res-date" className="text-xs font-semibold text-stone-300 uppercase tracking-wider block">
                        Date *
                      </label>
                      <input
                        id="res-date"
                        type="date"
                        min={todayStr()}
                        value={resDate}
                        onChange={e => setResDate(e.target.value)}
                        className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-stone-300 uppercase tracking-wider block">
                        Party Size
                      </label>
                      <div className="h-[38px] flex items-center justify-between px-3 bg-stone-900 border border-stone-800 rounded-xl">
                        <Stepper
                          label="Guests"
                          value={partySize}
                          min={1}
                          max={10}
                          onChange={setPartySize}
                          className="w-full justify-between"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Time Slots */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-stone-300 uppercase tracking-wider block">
                      Time Slot *
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {TIME_SLOTS.map(slot => {
                        const isFull = slot === '3:00 PM' || slot === '9:30 PM';
                        const isSelected = resSlot === slot;
                        return (
                          <button
                            key={slot}
                            type="button"
                            disabled={isFull}
                            aria-label={`${slot} ${isFull ? '(Fully Booked)' : ''}`}
                            onClick={() => setResSlot(slot)}
                            className={`py-2 px-2 rounded-xl text-xs font-semibold border transition-all text-center ${
                              isFull
                                ? 'border-stone-800/60 bg-stone-900/30 text-stone-600 cursor-not-allowed'
                                : isSelected
                                ? 'border-amber-500 bg-amber-500/20 text-amber-300 shadow-sm'
                                : 'border-stone-800 bg-stone-900/70 text-stone-300 hover:border-stone-700'
                            }`}
                          >
                            <div>{slot}</div>
                            {isFull && <span className="text-[9px] block text-rose-500 font-mono mt-0.5 font-bold">FULL</span>}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Seating Preference */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-stone-300 uppercase tracking-wider block">
                      Seating Ambience
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['Indoor AC Cellar', 'Alfresco Garden Terrace', 'Private Chef Table'] as const).map(zone => (
                        <button
                          key={zone}
                          type="button"
                          onClick={() => setSeatingZone(zone)}
                          className={`p-2 rounded-xl text-[11px] font-semibold border transition-all cursor-pointer ${
                            seatingZone === zone
                              ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-sm'
                              : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-white'
                          }`}
                        >
                          {zone}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Guest Contact fields */}
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="guest-name" className="text-xs font-semibold text-stone-300 uppercase tracking-wider block mb-1">
                        Full Name *
                      </label>
                      <input
                        id="guest-name"
                        type="text"
                        placeholder="e.g. Vikramaditya Singhania"
                        value={guestName}
                        onChange={e => {
                          setGuestName(e.target.value);
                          if (resErrors.name) setResErrors(er => ({ ...er, name: undefined }));
                        }}
                        className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-stone-200 placeholder:text-stone-600 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                      <FieldError error={resErrors.name} />
                    </div>

                    <div>
                      <label htmlFor="guest-phone" className="text-xs font-semibold text-stone-300 uppercase tracking-wider block mb-1">
                        Mobile Number *
                      </label>
                      <input
                        id="guest-phone"
                        type="tel"
                        placeholder="10-digit Indian mobile"
                        value={guestPhone}
                        onChange={e => {
                          setGuestPhone(e.target.value);
                          if (resErrors.phone) setResErrors(er => ({ ...er, phone: undefined }));
                        }}
                        className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-stone-200 placeholder:text-stone-600 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                      <FieldError error={resErrors.phone} />
                    </div>

                    <div>
                      <label htmlFor="guest-notes" className="text-xs font-semibold text-stone-300 uppercase tracking-wider block mb-1">
                        Special Notes (Optional)
                      </label>
                      <input
                        id="guest-notes"
                        type="text"
                        placeholder="e.g. Anniversary dinner, corner booth preferred"
                        value={guestNotes}
                        onChange={e => setGuestNotes(e.target.value)}
                        className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-stone-200 placeholder:text-stone-600 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Right column: Interactive Floor Plan */}
                <div className="space-y-4">
                  <div className="p-5 rounded-2xl bg-stone-950/80 border border-stone-800 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-stone-300 uppercase tracking-wider">Floor Plan Layout</span>
                      <div className="flex items-center gap-3 text-[10px] text-stone-400">
                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-stone-800 border border-stone-700" /> Booked</span>
                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-stone-900 border border-stone-600" /> Available</span>
                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500" /> Selected</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-3 sm:gap-4 p-5 rounded-2xl bg-[#080706] border border-stone-900">
                      {TABLES.map(table => {
                        const isSelected = selectedTable === table.id;
                        return (
                          <button
                            key={table.id}
                            type="button"
                            disabled={table.booked}
                            aria-label={`Table ${table.id}, ${table.seats} seats ${table.booked ? '(Pre-booked)' : ''}`}
                            onClick={() => {
                              setSelectedTable(table.id);
                              if (resErrors.table) setResErrors(er => ({ ...er, table: undefined }));
                            }}
                            className={`relative aspect-square rounded-full flex flex-col items-center justify-center transition-all ${
                              table.booked
                                ? 'bg-stone-900/40 border border-stone-800 text-stone-600 cursor-not-allowed opacity-60'
                                : isSelected
                                ? 'bg-amber-500 text-stone-950 font-bold border-2 border-amber-300 shadow-lg shadow-amber-500/30 scale-105 ring-2 ring-amber-400/40'
                                : 'bg-stone-900/90 border border-stone-700 text-stone-300 hover:border-amber-500/60 hover:text-amber-300'
                            }`}
                          >
                            <span className="text-xs sm:text-sm font-bold">{table.label}</span>
                            <span className="text-[9px] opacity-80">{table.booked ? 'Booked' : `${table.seats}s`}</span>
                          </button>
                        );
                      })}
                    </div>

                    <p className="text-[11px] text-stone-400 text-center">
                      Selected: <strong className="text-amber-400">Table {selectedTable}</strong> ({TABLES.find(t => t.id === selectedTable)?.seats || 2} Seats Capacity)
                    </p>
                    <FieldError error={resErrors.table} />
                  </div>

                  <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 text-xs text-stone-400 space-y-1">
                    <p className="text-amber-300 font-semibold">Hospitality Note</p>
                    <p>Tables are held for 15 minutes past scheduled slot time. Valet parking is available at our main entrance.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-800 space-y-3">
                <DemoFormNote />
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-bold text-sm tracking-wide transition-all shadow-lg shadow-amber-500/25 focus:outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer"
                >
                  Confirm Table Reservation ({selectedTable})
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* Story Section */}
      <section id="story" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto">
        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400">The Savoria Philosophy</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-100 leading-snug">
                Where Ancient Embers Meet Avant-Garde Gastronomy
              </h2>
              <p className="text-sm text-stone-400 leading-relaxed">
                Founded in 2019, Savoria Bistro was born from a quest to harmonize ancestral wood-fired roasting with delicate European fine dining techniques.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-stone-900 border border-stone-800 space-y-1">
                  <h4 className="font-serif font-bold text-amber-400 text-base">Zero-Mile Greens</h4>
                  <p className="text-xs text-stone-400">Harvested from certified organic micro-farms across South India.</p>
                </div>
                <div className="p-4 rounded-xl bg-stone-900 border border-stone-800 space-y-1">
                  <h4 className="font-serif font-bold text-amber-400 text-base">Oak-Aged Cellar</h4>
                  <p className="text-xs text-stone-400">Over 180 rare biodynamic labels handpicked by master sommeliers.</p>
                </div>
              </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] border border-stone-800 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80"
                alt="Chef preparing dish"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-stone-950/80 backdrop-blur-md border border-stone-800">
                <p className="text-xs italic text-stone-300">"Cooking is memory, poetry, and restraint on a heated porcelain canvas."</p>
                <p className="text-[11px] font-bold text-amber-400 mt-1">— Marco Valenti, Executive Chef</p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-8 bg-stone-950/80 border-t border-stone-900">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400">Concierge & Location</span>
            <h2 className="font-serif text-3xl font-bold text-stone-100">Visit Savoria</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-stone-900/60 border border-stone-800 space-y-2">
              <MapPin className="w-6 h-6 text-amber-400" />
              <h4 className="font-serif font-bold text-stone-100 text-base">Address</h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                42, 100ft Road, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560038
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-stone-900/60 border border-stone-800 space-y-2">
              <Phone className="w-6 h-6 text-amber-400" />
              <h4 className="font-serif font-bold text-stone-100 text-base">Reservations & Delivery</h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                +91 (80) 4912-3400 · +91 79 7597 6491
              </p>
              <p className="text-xs text-stone-500">Concierge desk open daily from 11:00 AM</p>
            </div>

            <div className="p-6 rounded-2xl bg-stone-900/60 border border-stone-800 space-y-2">
              <Mail className="w-6 h-6 text-amber-400" />
              <h4 className="font-serif font-bold text-stone-100 text-base">Private Enquiries</h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                concierge@savoriabistro.com
              </p>
              <p className="text-xs text-stone-500">Corporate private dining and chef tasting tables</p>
            </div>
          </div>

          {/* Nexora Portfolio Callout */}
          {onOrderThisWebsite && (
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-950/40 via-stone-900 to-amber-950/40 border border-amber-500/20 text-center space-y-3">
              <span className="text-[10px] font-mono tracking-widest uppercase text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 inline-block">
                NEXORA TECHNOLOGIES PORTFOLIO
              </span>
              <h3 className="font-serif text-2xl font-bold text-stone-100">
                Want a Website Like Savoria Bistro for Your Restaurant?
              </h3>
              <p className="text-xs sm:text-sm text-stone-400 max-w-xl mx-auto leading-relaxed">
                We craft bespoke digital storefronts featuring interactive menus, instant table reservations, WhatsApp ordering, and lightning-fast checkout.
              </p>
              <button
                type="button"
                onClick={onOrderThisWebsite}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold tracking-wide transition-all shadow-lg shadow-amber-500/20 focus:outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer"
              >
                Order This Website <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Cart Drawer (Right Slide-over) */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end animate-in fade-in duration-200">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={() => setIsCartOpen(false)}
          />

          <aside className="relative w-full max-w-md bg-[#0e0d0c] border-l border-stone-800 h-full flex flex-col z-10 shadow-2xl">
            {/* Header */}
            <div className="p-4 border-b border-stone-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-amber-400" />
                <h3 className="font-serif text-base font-bold text-stone-100">
                  Your Order {cartCount > 0 && `(${cartCount})`}
                </h3>
              </div>
              <button
                type="button"
                aria-label="Close Cart"
                onClick={() => setIsCartOpen(false)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto">
              {activeOrder ? (
                <OrderTimelineTracker
                  order={activeOrder}
                  onReset={() => setActiveOrder(null)}
                />
              ) : cart.length === 0 ? (
                <EmptyState
                  icon="🍽️"
                  title="Your order is empty"
                  description="Explore our chef-curated menu to add signature dishes."
                />
              ) : (
                <div className="p-4 space-y-4">
                  {/* Order Type Toggle */}
                  <div className="flex p-1 bg-stone-900 rounded-xl border border-stone-800">
                    {(['Dine-in', 'Takeaway', 'Delivery'] as const).map(type => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setOrderType(type)}
                        className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                          orderType === type
                            ? 'bg-amber-500 text-stone-950 shadow'
                            : 'text-stone-400 hover:text-stone-200'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>

                  {/* Cart Items List */}
                  <div className="space-y-2.5">
                    {cart.map(item => (
                      <div
                        key={item.id}
                        className="flex items-center gap-3 p-2.5 rounded-xl bg-stone-900/60 border border-stone-800/80"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 rounded-lg object-cover shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-semibold text-stone-200 truncate">{item.name}</h4>
                          <p className="text-[11px] font-mono text-amber-400">{formatINR(item.price)}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <button
                              type="button"
                              aria-label={`Decrease ${item.name}`}
                              onClick={() => updateCartQty(item.id, -1)}
                              className="w-5 h-5 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 flex items-center justify-center text-xs"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold text-stone-100 min-w-[1rem] text-center">
                              {item.qty}
                            </span>
                            <button
                              type="button"
                              aria-label={`Increase ${item.name}`}
                              onClick={() => updateCartQty(item.id, 1)}
                              className="w-5 h-5 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 flex items-center justify-center text-xs"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-xs font-bold text-stone-100">{formatINR(item.price * item.qty)}</p>
                          <button
                            type="button"
                            aria-label={`Remove ${item.name}`}
                            onClick={() => removeFromCart(item.id)}
                            className="text-stone-500 hover:text-rose-400 p-1 mt-1 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Coupon Field */}
                  <div className="space-y-1.5 pt-2 border-t border-stone-800">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Coupon code (WELCOME10)"
                        value={couponCode}
                        onChange={e => setCouponCode(e.target.value.toUpperCase())}
                        className="flex-1 bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-200 uppercase tracking-wider placeholder:normal-case placeholder:tracking-normal placeholder:text-stone-600 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                      <button
                        type="button"
                        onClick={handleApplyCoupon}
                        className="px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-400 text-xs font-bold transition-colors cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>
                    {couponError && <FieldError error={couponError} />}
                    {couponApplied && (
                      <p className="text-[11px] text-emerald-400 flex items-center gap-1">
                        <Check className="w-3 h-3" /> WELCOME10 applied (10% discount)
                      </p>
                    )}
                  </div>

                  {/* Tip Buttons */}
                  <div className="space-y-1.5">
                    <span className="text-[11px] text-stone-400 uppercase tracking-wider block font-semibold">
                      Add Kitchen Staff Tip
                    </span>
                    <div className="flex gap-2">
                      {[0, 10, 15].map(pct => (
                        <button
                          key={pct}
                          type="button"
                          onClick={() => setTipPct(pct)}
                          className={`flex-1 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                            tipPct === pct
                              ? 'border-amber-500 bg-amber-500/20 text-amber-300'
                              : 'border-stone-800 bg-stone-900 text-stone-400 hover:border-stone-700'
                          }`}
                        >
                          {pct === 0 ? 'No Tip' : `${pct}%`}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Bill Breakdown */}
                  <div className="p-3.5 rounded-xl bg-stone-900/60 border border-stone-800/80 space-y-1.5 text-xs">
                    <div className="flex justify-between text-stone-400">
                      <span>Subtotal</span>
                      <span className="font-mono text-stone-200">{formatINR(subtotal)}</span>
                    </div>

                    {discount > 0 && (
                      <div className="flex justify-between text-emerald-400">
                        <span>Discount (10%)</span>
                        <span className="font-mono">-{formatINR(discount)}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-stone-400">
                      <span>GST (18%)</span>
                      <span className="font-mono text-stone-200">{formatINR(gst)}</span>
                    </div>

                    {tipAmount > 0 && (
                      <div className="flex justify-between text-stone-400">
                        <span>Staff Tip ({tipPct}%)</span>
                        <span className="font-mono text-stone-200">{formatINR(tipAmount)}</span>
                      </div>
                    )}

                    <div className="pt-2 border-t border-stone-800 flex justify-between text-sm font-bold text-stone-100">
                      <span>Total Amount</span>
                      <span className="font-mono text-amber-400">{formatINR(finalTotal)}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            {!activeOrder && cart.length > 0 && (
              <div className="p-4 border-t border-stone-800 bg-[#0c0a09] space-y-2">
                <WhatsAppButton
                  message={waCartMessage}
                  label="Send Order on WhatsApp"
                  className="w-full justify-center"
                />

                <button
                  type="button"
                  onClick={handlePlaceOrder}
                  className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs tracking-wider uppercase transition-all shadow-lg shadow-amber-500/25 focus:outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer"
                >
                  Place Order · {formatINR(finalTotal)}
                </button>
              </div>
            )}
          </aside>
        </div>
      )}

      {/* Shared Mobile Bottom Action Bar (Phone only: < 768px) */}
      <DemoMobileBottomBar
        primaryAction={{
          label: 'Reserve Table',
          href: '#reserve',
          accentColorClass: 'bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold shadow-amber-500/20'
        }}
        secondaryAction={{
          label: cartCount > 0 ? `Cart (${cartCount})` : 'Cart',
          onClick: () => setIsCartOpen(true),
          icon: ShoppingBag,
          badge: cartCount > 0 ? cartCount : undefined,
          accentColorClass: 'border-amber-500/30 text-amber-300 bg-amber-500/10'
        }}
      />

      {/* Dish Customization Modal: App-like Bottom Sheet on mobile */}
      {customizingDish && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-[#141210] border border-amber-500/30 rounded-t-3xl sm:rounded-3xl max-w-lg w-full max-h-[85dvh] overflow-y-auto overscroll-contain pb-[max(1rem,env(safe-area-inset-bottom))] shadow-2xl animate-in slide-in-from-bottom-4 duration-200">
            <div className="w-12 h-1 bg-white/20 rounded-full mx-auto my-2 sm:hidden shrink-0" />
            <div className="relative aspect-[16/9] w-full">
              <img src={customizingDish.image} alt={customizingDish.name} className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => setCustomizingDish(null)}
                className="absolute top-3 right-3 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono text-amber-400 font-bold border border-amber-500/20">
                Base: {formatINR(customizingDish.price)}
              </div>
            </div>

            <div className="p-6 space-y-5 text-left">
              <div>
                <h3 className="font-serif text-xl font-bold text-stone-100">{customizingDish.name}</h3>
                <p className="text-xs text-stone-400 mt-1">{customizingDish.desc}</p>
              </div>

              {/* Portion Size */}
              <div>
                <label className="text-xs font-semibold text-stone-300 block mb-2">Portion Size</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['Single', 'Family Sharing (+₹160)'] as const).map(p => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setCustomPortion(p)}
                      className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                        customPortion === p
                          ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                          : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-white'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Spice Level */}
              <div>
                <label className="text-xs font-semibold text-stone-300 block mb-2">Spice Level</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'Mild' as const, label: 'Mild 🌿' },
                    { id: 'Medium' as const, label: 'Medium 🌶️' },
                    { id: 'Fiery Hot' as const, label: 'Fiery Hot 🌶️🌶️' }
                  ].map(s => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setCustomSpice(s.id)}
                      className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                        customSpice === s.id
                          ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                          : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-white'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add-on Modifiers */}
              <div>
                <label className="text-xs font-semibold text-stone-300 block mb-2">Chef Add-ons (+₹70 each)</label>
                <div className="space-y-1.5">
                  {[
                    'Shaved Perigord Truffle Butter',
                    'Artisanal Herb Garlic Brioche',
                    'Aged Smoked Buffalo Mozzarella'
                  ].map(addon => {
                    const selected = selectedAddons.includes(addon);
                    return (
                      <button
                        key={addon}
                        type="button"
                        onClick={() => {
                          setSelectedAddons(prev =>
                            prev.includes(addon) ? prev.filter(a => a !== addon) : [...prev, addon]
                          );
                        }}
                        className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                          selected
                            ? 'bg-amber-500/10 border-amber-500/50 text-amber-200'
                            : 'bg-stone-900/60 border-stone-800 text-stone-400 hover:text-stone-200'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className={`w-4 h-4 rounded flex items-center justify-center border text-[10px] ${selected ? 'bg-amber-500 text-stone-950 border-amber-400 font-bold' : 'border-stone-700'}`}>
                            {selected && '✓'}
                          </span>
                          {addon}
                        </span>
                        <span className="font-mono text-amber-400">+₹70</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-3 border-t border-stone-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-stone-400 block font-mono">TOTAL ITEM PRICE</span>
                  <span className="font-mono text-lg font-bold text-amber-400">
                    {formatINR(customizingDish.price + selectedAddons.length * 70 + (customPortion.includes('+₹160') ? 160 : 0))}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleAddCustomizedToCart}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-amber-500/20 cursor-pointer"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantDemo;
