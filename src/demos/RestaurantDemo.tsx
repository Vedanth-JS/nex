import React, { useState } from 'react';
import { 
  UtensilsCrossed, 
  Clock, 
  MapPin, 
  Phone, 
  Calendar, 
  Users, 
  CheckCircle2, 
  MessageCircle, 
  ChevronRight, 
  Star,
  Sparkles
} from 'lucide-react';
import { getWhatsAppUrl } from '../utils/whatsapp';

interface DishItem {
  id: string;
  name: string;
  category: 'mains' | 'appetizers' | 'drinks' | 'desserts';
  price: string;
  description: string;
  rating: number;
  tag?: string;
  image: string;
}

const DISHES: DishItem[] = [
  {
    id: '1',
    name: 'Black Truffle Tartare',
    category: 'mains',
    price: '₹750',
    description: 'Hand-cut aged tenderloin, cured yolk, perigord truffles, and gold leaf finish.',
    rating: 4.9,
    tag: 'Chef Special',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: '2',
    name: 'Hokkaido Uni Linguine',
    category: 'mains',
    price: '₹890',
    description: 'Artisanal pasta, fresh sea urchin foam, lemon zest, and cold-pressed chili oil.',
    rating: 5.0,
    tag: 'Signature',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: '3',
    name: 'Wild Forest Mushroom Crostini',
    category: 'appetizers',
    price: '₹420',
    description: 'Toasted brioche, sautéed chanterelles, garlic confit, and shaved pecorino.',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: '4',
    name: 'The Midnight Smoke Cocktail',
    category: 'drinks',
    price: '₹480',
    description: 'Smoked oak bourbon, activated charcoal, maple reduction, and torched cinnamon quill.',
    rating: 4.9,
    tag: 'Cocktail',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: '5',
    name: 'Valrhona Dark Chocolate Sphere',
    category: 'desserts',
    price: '₹490',
    description: 'Warm salted caramel poured tableside over single-origin chocolate with raspberry coulis.',
    rating: 5.0,
    tag: 'Must Try',
    image: 'https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: '6',
    name: 'Crispy Tempura Soft Shell Crab',
    category: 'appetizers',
    price: '₹560',
    description: 'Light yuzu emulsion, pickled radish, and shichimi togarashi seasoning.',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80'
  }
];

export const RestaurantDemo: React.FC<{ onOrderThisWebsite?: () => void }> = ({ onOrderThisWebsite }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'mains' | 'appetizers' | 'drinks' | 'desserts'>('all');
  const [bookingDate, setBookingDate] = useState('2026-11-05');
  const [bookingTime, setBookingTime] = useState('19:30');
  const [guests, setGuests] = useState('2 Guests');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [isBooked, setIsBooked] = useState(false);

  const filteredDishes = activeCategory === 'all' 
    ? DISHES 
    : DISHES.filter(d => d.category === activeCategory);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone) return;
    setIsBooked(true);
  };

  const handleWhatsAppOrder = (dishName?: string) => {
    const text = dishName 
      ? `Hello Savoria Bistro! I would like to order "${dishName}" for delivery/takeaway.`
      : `Hello Savoria Bistro! I would like to explore your menu and place an order.`;
    window.open(getWhatsAppUrl(text), '_blank');
  };

  return (
    <div className="bg-[#0c0a09] text-[#f5f5f4] font-sans min-h-screen selection:bg-amber-600 selection:text-white">
      {/* Top Notification Banner */}
      <div className="bg-amber-950/40 border-b border-amber-800/30 px-4 py-2 text-xs flex justify-between items-center text-amber-200">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Demo preview: Michelin-style luxury restaurant template built by Nexora Technologies</span>
        </div>
        {onOrderThisWebsite && (
          <button 
            onClick={onOrderThisWebsite}
            className="text-amber-400 hover:text-amber-300 font-semibold underline text-xs"
          >
            Get this design for your restaurant →
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="border-b border-stone-800/80 bg-stone-950/80 backdrop-blur-md sticky top-0 z-20 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center font-bold text-stone-950 text-base">
            S
          </div>
          <span className="font-serif tracking-widest text-lg font-bold text-stone-100 uppercase">SAVORIA</span>
          <span className="text-[10px] tracking-wider uppercase text-amber-500 font-semibold border border-amber-500/30 rounded px-1.5 py-0.5 ml-1">BISTRO</span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm text-stone-300">
          <a href="#menu" className="hover:text-amber-400 transition-colors">Menu</a>
          <a href="#reserve" className="hover:text-amber-400 transition-colors">Reservations</a>
          <a href="#story" className="hover:text-amber-400 transition-colors">Our Story</a>
          <a href="#contact" className="hover:text-amber-400 transition-colors">Hours & Location</a>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => handleWhatsAppOrder()}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-600/30 transition-all"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            WhatsApp Order
          </button>
          <a 
            href="#reserve"
            className="text-xs uppercase tracking-wider font-semibold px-4 py-2 rounded-lg bg-gradient-to-r from-amber-600 to-amber-500 text-stone-950 hover:brightness-110 transition-all shadow-lg shadow-amber-900/30"
          >
            Book Table
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-20 pb-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/20 via-stone-950 to-stone-950 -z-10" />
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-800/40 text-amber-400 text-xs font-medium mb-6">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>Michelin-Curated Seasonal Dining Experience</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-stone-100 leading-tight mb-6">
              Flavors That Stay in <span className="font-semibold text-amber-400 italic">Your Memory</span>
            </h1>
            <p className="text-stone-400 text-base sm:text-lg mb-8 leading-relaxed max-w-xl">
              An immersive culinary odyssey where noir aesthetics meet artisan precision. Experience the digital sommelier’s curated journey through world-class gastronomy.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a 
                href="#reserve"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 text-stone-950 font-bold text-sm tracking-wide uppercase hover:brightness-110 transition-all shadow-xl shadow-amber-950/50 flex items-center gap-2"
              >
                <span>Reserve Table</span>
                <ChevronRight className="w-4 h-4" />
              </a>
              <a 
                href="#menu"
                className="px-6 py-3.5 rounded-xl border border-stone-700 bg-stone-900/60 text-stone-300 font-semibold text-sm hover:border-amber-500/50 hover:text-white transition-all"
              >
                Explore Menu
              </a>
            </div>
            <div className="mt-10 flex items-center gap-6 pt-6 border-t border-stone-800/80 text-xs text-stone-400">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>Open Daily: 12 PM - 11 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>Indiranagar, Bengaluru</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="relative mx-auto rounded-2xl overflow-hidden border border-amber-900/40 shadow-2xl shadow-amber-950/40">
              <img 
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80" 
                alt="Savoria Luxury Dining Room"
                className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 bg-stone-900/80 backdrop-blur-md border border-stone-700/60 rounded-xl p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs text-amber-400 font-medium">Chef’s Signature Selection</p>
                  <p className="text-sm font-serif font-bold text-stone-100">7-Course Autumn Tasting Menu</p>
                </div>
                <button 
                  onClick={() => handleWhatsAppOrder('7-Course Autumn Tasting Menu')}
                  className="px-3 py-1.5 rounded-lg bg-amber-500 text-stone-950 text-xs font-bold hover:bg-amber-400 transition-colors"
                >
                  Order ₹2,499
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Menu Section */}
      <section id="menu" className="py-20 px-6 max-w-6xl mx-auto border-t border-stone-800/60">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-amber-500 text-xs uppercase tracking-widest font-semibold">The Selection</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-stone-100 mt-1">Curated Masterpieces</h2>
          </div>
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mt-6 md:mt-0">
            {(['all', 'mains', 'appetizers', 'drinks', 'desserts'] as const).map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                  activeCategory === cat
                    ? 'bg-amber-500 text-stone-950 font-bold'
                    : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Dishes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDishes.map((dish) => (
            <div 
              key={dish.id}
              className="group bg-stone-900/60 border border-stone-800 rounded-2xl overflow-hidden hover:border-amber-700/60 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={dish.image} 
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  {dish.tag && (
                    <span className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-amber-500 text-stone-950">
                      {dish.tag}
                    </span>
                  )}
                  <div className="absolute bottom-2 left-3 flex items-center gap-1 bg-stone-950/80 backdrop-blur-sm px-2 py-0.5 rounded text-[11px] text-amber-400">
                    <Star className="w-3 h-3 fill-amber-400" />
                    <span>{dish.rating}</span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-serif text-lg font-bold text-stone-100">{dish.name}</h3>
                    <span className="font-semibold text-amber-400 text-base">{dish.price}</span>
                  </div>
                  <p className="text-stone-400 text-xs leading-relaxed">{dish.description}</p>
                </div>
              </div>
              <div className="p-5 pt-0">
                <button 
                  onClick={() => handleWhatsAppOrder(dish.name)}
                  className="w-full py-2.5 rounded-xl bg-stone-800 hover:bg-amber-600 hover:text-stone-950 text-stone-200 text-xs font-semibold flex items-center justify-center gap-2 transition-all border border-stone-700/60"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  Order on WhatsApp
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Reservation Section */}
      <section id="reserve" className="py-20 px-6 max-w-4xl mx-auto border-t border-stone-800/60">
        <div className="bg-gradient-to-b from-stone-900 to-stone-950 border border-amber-900/40 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="text-center mb-8">
            <span className="text-amber-500 text-xs uppercase tracking-widest font-semibold">Immediate Confirmation</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-stone-100 font-light mt-1">Secure Your Table</h2>
            <p className="text-stone-400 text-sm mt-2 max-w-md mx-auto">
              We maintain a limited number of seating per evening to ensure an intimate culinary journey.
            </p>
          </div>

          {isBooked ? (
            <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-2xl p-8 text-center text-emerald-200">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
              <h3 className="text-xl font-serif font-bold text-white mb-1">Reservation Request Received!</h3>
              <p className="text-xs text-stone-300 max-w-md mx-auto mb-4">
                Thank you {customerName}. Table reserved for {guests} on {bookingDate} at {bookingTime}. We have sent a confirmation to {customerPhone}.
              </p>
              <button 
                onClick={() => setIsBooked(false)}
                className="text-xs text-amber-400 underline font-semibold"
              >
                Make another reservation
              </button>
            </div>
          ) : (
            <form onSubmit={handleBooking} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-400 mb-1.5">Date</label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-stone-400 absolute left-3 top-3.5" />
                    <input 
                      type="date"
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl pl-9 pr-3 py-3 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-400 mb-1.5">Time</label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-stone-400 absolute left-3 top-3.5" />
                    <select 
                      value={bookingTime}
                      onChange={(e) => setBookingTime(e.target.value)}
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl pl-9 pr-3 py-3 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                    >
                      <option value="12:30">12:30 PM (Lunch)</option>
                      <option value="13:30">01:30 PM (Lunch)</option>
                      <option value="19:30">07:30 PM (Dinner)</option>
                      <option value="20:30">08:30 PM (Dinner)</option>
                      <option value="21:30">09:30 PM (Dinner)</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-400 mb-1.5">Guests</label>
                  <div className="relative">
                    <Users className="w-4 h-4 text-stone-400 absolute left-3 top-3.5" />
                    <select 
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl pl-9 pr-3 py-3 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                    >
                      <option value="1 Guest">1 Guest</option>
                      <option value="2 Guests">2 Guests</option>
                      <option value="4 Guests">4 Guests</option>
                      <option value="6 Guests">6 Guests</option>
                      <option value="8+ Private Dining">8+ Private Dining</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-400 mb-1.5">Your Name</label>
                  <input 
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-400 mb-1.5">Phone Number</label>
                  <input 
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-stone-950 font-bold text-sm uppercase tracking-wider hover:brightness-110 transition-all shadow-lg shadow-amber-950/50 mt-4"
              >
                Confirm Table Reservation
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="py-12 border-t border-stone-800/80 bg-stone-950 px-6 text-center text-xs text-stone-400">
        <p className="font-serif text-base text-stone-200 font-bold mb-2">SAVORIA DINING & BISTRO</p>
        <p className="mb-4">12th Main Road, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka</p>
        <p className="text-[11px] text-stone-400">Demo Website Designed & Developed by Nexora Technologies</p>
      </footer>
    </div>
  );
};
