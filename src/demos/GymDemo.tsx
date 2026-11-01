import React, { useState } from 'react';
import { 
  Dumbbell, 
  Flame, 
  Trophy, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  MapPin, 
  Sparkles,
  PhoneCall
} from 'lucide-react';
import { getWhatsAppUrl } from '../utils/whatsapp';

interface Plan {
  id: string;
  name: string;
  duration: string;
  price: string;
  popular?: boolean;
  features: string[];
}

const PLANS: Plan[] = [
  {
    id: 'monthly',
    name: 'Standard Monthly',
    duration: '1 Month Membership',
    price: '₹1,999',
    features: ['Unlimited Gym Floor Access', 'Locker & Steam Room', 'General Fitness Assessment', 'Cardio & Strength Zone']
  },
  {
    id: 'quarterly',
    name: 'Transform 90-Day',
    duration: '3 Months Pro',
    price: '₹4,999',
    popular: true,
    features: ['Unlimited Gym Floor Access', 'Custom Diet & Workout Blueprint', '2 Complimentary PT Sessions', 'Crossfit & HIIT Group Classes', 'Bio-Impedance Body Scan']
  },
  {
    id: 'annual',
    name: 'IronCore Elite VIP',
    duration: '12 Months All-Access',
    price: '₹14,999',
    features: ['1 Year Unrestricted Access', 'Free 1-Month Freeze Option', '6 Personal Training Sessions', 'Sauna, Steam & Recovery Suite', 'IronCore Gym Bag & Shaker']
  }
];

export const GymDemo: React.FC<{ onOrderThisWebsite?: () => void }> = ({ onOrderThisWebsite }) => {
  const [visitorName, setVisitorName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('Morning (6 AM - 10 AM)');
  const [fitnessGoal, setFitnessGoal] = useState('Weight Loss & Fat Burn');
  const [isPassGenerated, setIsPassGenerated] = useState(false);

  const handleClaimPass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitorName || !phone) return;
    setIsPassGenerated(true);
  };

  const handleWhatsAppChat = () => {
    window.open(getWhatsAppUrl('Hello IronCore Fitness! I want to inquire about gym membership plans and personal trainer packages.'), '_blank');
  };

  return (
    <div className="bg-[#090a0f] text-slate-100 font-sans min-h-screen selection:bg-rose-500 selection:text-white">
      {/* Top Banner */}
      <div className="bg-rose-950/40 border-b border-rose-900/30 px-6 py-2 text-xs flex justify-between items-center text-rose-200">
        <div className="flex items-center gap-2">
          <Flame className="w-3.5 h-3.5 text-rose-400" />
          <span>Demo preview: High-energy Gym & Fitness Center template by Nexora Technologies</span>
        </div>
        {onOrderThisWebsite && (
          <button 
            onClick={onOrderThisWebsite}
            className="text-rose-400 hover:text-rose-300 font-semibold underline text-xs hidden sm:block"
          >
            Order Gym Website Design →
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="bg-[#090a0f]/90 backdrop-blur-md border-b border-white/10 px-6 py-4 sticky top-0 z-20 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center text-white shadow-lg shadow-rose-600/30 font-bold">
            <Dumbbell className="w-5 h-5" />
          </div>
          <div>
            <span className="font-black text-lg tracking-wider text-white uppercase">IRONCORE</span>
            <span className="block text-[10px] text-rose-500 tracking-widest uppercase font-bold">FITNESS & CROSSFIT</span>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-8 text-xs font-bold uppercase tracking-wider text-slate-300">
          <a href="#plans" className="hover:text-rose-400 transition-colors">Memberships</a>
          <a href="#trainers" className="hover:text-rose-400 transition-colors">Trainers</a>
          <a href="#facilities" className="hover:text-rose-400 transition-colors">Facilities</a>
          <a href="#trial" className="hover:text-rose-400 transition-colors">Free Pass</a>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={handleWhatsAppChat}
            className="text-xs px-3 py-2 rounded-lg bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-600/30 font-semibold hidden sm:block"
          >
            WhatsApp Desk
          </button>
          <a 
            href="#trial"
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-rose-600 to-amber-600 text-white font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-lg shadow-rose-600/25"
          >
            Get 1-Day Free Pass
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-16 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-rose-950/30 via-[#090a0f] to-[#090a0f] -z-10" />
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/60 border border-rose-600/40 text-rose-300 text-xs font-bold mb-6">
              <Trophy className="w-3.5 h-3.5 text-rose-400" />
              <span>Bangalore’s Premier 12,000 Sq.Ft Training Facility</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-black text-white leading-tight uppercase tracking-tight mb-6">
              Forge Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-orange-400 to-amber-400">Strongest Self</span>
            </h1>
            <p className="text-slate-300 text-base leading-relaxed mb-8 max-w-xl">
              Equipped with imported biomechanical strength machines, Olympic lifting platforms, certified personal trainers, and high-intensity group bootcamps.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-8">
              <a 
                href="#trial"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-rose-600 to-orange-500 text-white font-bold text-sm uppercase tracking-wider hover:brightness-110 transition-all shadow-xl shadow-rose-600/30"
              >
                Claim Free 1-Day VIP Pass →
              </a>
              <a 
                href="#plans"
                className="px-6 py-3.5 rounded-xl border border-slate-700 bg-slate-900/60 text-slate-300 hover:text-white font-semibold text-sm transition-all"
              >
                View Plans from ₹1,999
              </a>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800 text-xs">
              <div>
                <p className="text-xl font-black text-rose-400">12,000</p>
                <p className="text-slate-400">Sq.Ft Training Area</p>
              </div>
              <div>
                <p className="text-xl font-black text-amber-400">14+</p>
                <p className="text-slate-400">Certified Coaches</p>
              </div>
              <div>
                <p className="text-xl font-black text-emerald-400">5:30 AM</p>
                <p className="text-slate-400">Early Open Daily</p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-3xl overflow-hidden border border-rose-900/40 shadow-2xl shadow-rose-950/40 bg-slate-900">
              <img 
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=700&q=80" 
                alt="Gym workout dumbbell training" 
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090a0f] via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md border border-slate-800 p-4 rounded-2xl flex items-center justify-between">
                <div>
                  <p className="text-xs text-rose-400 font-bold uppercase">Today’s Class</p>
                  <p className="text-sm font-bold text-white">HIIT & Core Conditioning</p>
                  <p className="text-[11px] text-slate-400">6:30 PM • Studio A</p>
                </div>
                <span className="px-2.5 py-1 rounded bg-rose-600/30 text-rose-300 text-xs font-bold border border-rose-500/30">
                  Live
                </span>
              </div>
            </div>
          </div>

        </div>
      </header>

      {/* Membership Plans */}
      <section id="plans" className="py-16 px-6 max-w-6xl mx-auto border-t border-slate-800">
        <div className="text-center mb-12">
          <span className="text-rose-500 text-xs uppercase tracking-widest font-bold">Invest In Yourself</span>
          <h2 className="text-3xl font-black text-white mt-1 uppercase">Membership Plans</h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-2 max-w-lg mx-auto">
            Transparent pricing with zero hidden registration fees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PLANS.map(plan => (
            <div 
              key={plan.id}
              className={`bg-slate-900/80 rounded-2xl p-6 border transition-all flex flex-col justify-between ${
                plan.popular 
                  ? 'border-rose-500 shadow-xl shadow-rose-950/40 relative' 
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-rose-600 text-white font-bold text-[10px] uppercase tracking-wider">
                    Most Popular Choice
                  </span>
                )}
                <h3 className="text-lg font-bold text-white mt-2">{plan.name}</h3>
                <p className="text-xs text-slate-400 mb-4">{plan.duration}</p>
                <div className="mb-6 pb-4 border-b border-slate-800">
                  <span className="text-3xl font-black text-white">{plan.price}</span>
                </div>
                <ul className="space-y-2.5 mb-6">
                  {plan.features.map((f, i) => (
                    <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a 
                href="#trial"
                className={`w-full py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-center transition-all ${
                  plan.popular 
                    ? 'bg-gradient-to-r from-rose-600 to-amber-600 text-white shadow-lg shadow-rose-600/30' 
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                }`}
              >
                Join {plan.name}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Free 1-Day Trial Form */}
      <section id="trial" className="py-16 px-6 max-w-4xl mx-auto border-t border-slate-800">
        <div className="bg-slate-900 border border-rose-900/40 rounded-3xl p-6 sm:p-10 shadow-2xl">
          <div className="text-center mb-8">
            <span className="text-rose-400 text-xs uppercase tracking-widest font-bold">Try Before You Commit</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1 uppercase">Claim Your 1-Day Free VIP Pass</h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1">
              Experience the gym floor, steam room, and workout classes with zero obligation.
            </p>
          </div>

          {isPassGenerated ? (
            <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-2xl p-8 text-center text-emerald-200">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
              <h3 className="text-xl font-bold text-white mb-1">VIP Day Pass Generated!</h3>
              <p className="text-xs text-slate-300 max-w-md mx-auto mb-4">
                Welcome, {visitorName}! Your free 1-Day pass for {selectedSlot} has been registered. Show this confirmation or SMS sent to {phone} at our front desk.
              </p>
              <button 
                onClick={() => setIsPassGenerated(false)}
                className="text-xs text-rose-400 underline font-semibold"
              >
                Register another pass
              </button>
            </div>
          ) : (
            <form onSubmit={handleClaimPass} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Your Name *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Arun Gowda"
                    value={visitorName}
                    onChange={(e) => setVisitorName(e.target.value)}
                    className="w-full bg-[#131622] border border-slate-700 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-rose-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">WhatsApp / Phone *</label>
                  <input 
                    type="tel" 
                    required
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#131622] border border-slate-700 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Preferred Slot</label>
                  <select 
                    value={selectedSlot}
                    onChange={(e) => setSelectedSlot(e.target.value)}
                    className="w-full bg-[#131622] border border-slate-700 rounded-xl px-3 py-3 text-xs text-white focus:outline-none focus:border-rose-500"
                  >
                    <option value="Morning (6 AM - 10 AM)">Morning (6:00 AM - 10:00 AM)</option>
                    <option value="Afternoon (12 PM - 4 PM)">Afternoon (12:00 PM - 4:00 PM)</option>
                    <option value="Evening (5 PM - 9 PM)">Evening (5:00 PM - 9:00 PM)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Primary Fitness Goal</label>
                  <select 
                    value={fitnessGoal}
                    onChange={(e) => setFitnessGoal(e.target.value)}
                    className="w-full bg-[#131622] border border-slate-700 rounded-xl px-3 py-3 text-xs text-white focus:outline-none focus:border-rose-500"
                  >
                    <option value="Weight Loss & Fat Burn">Weight Loss & Fat Burn</option>
                    <option value="Muscle Building & Strength">Muscle Building & Strength</option>
                    <option value="Crossfit & Endurance">Crossfit & Endurance</option>
                    <option value="General Health & Mobility">General Health & Mobility</option>
                  </select>
                </div>
              </div>

              <button 
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 text-white font-black text-sm uppercase tracking-wider hover:brightness-110 transition-all shadow-xl shadow-rose-600/30 mt-3"
              >
                Instant Download 1-Day Pass
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-800 bg-[#06070a] text-center text-xs text-slate-400">
        <p className="font-black text-white mb-1 uppercase tracking-wider">IRONCORE ELITE FITNESS & CROSSFIT</p>
        <p className="text-[11px]">80 Feet Road, Koramangala 4th Block, Bengaluru</p>
        <p className="text-[10px] text-slate-400 mt-2">Gym Demo Website Crafted by Nexora Technologies</p>
      </footer>
    </div>
  );
};
