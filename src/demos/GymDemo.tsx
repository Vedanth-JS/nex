import React, { useState, useId } from 'react';
import {
  Dumbbell,
  Flame,
  Trophy,
  CheckCircle2,
  Clock,
  User,
  HeartPulse,
  Activity,
  ArrowRight,
  PlusCircle,
  TrendingDown,
  X,
  MessageCircle
} from 'lucide-react';
import {
  formatINR,
  isValidPhone,
  todayStr
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

interface GymDemoProps {
  onOrderThisWebsite?: () => void;
  onBackToMain?: () => void;
}

interface ClassSession {
  id: string;
  name: string;
  type: 'HIIT' | 'Yoga' | 'Boxing' | 'Zumba' | 'CrossFit';
  trainer: string;
  time: string;
  day: string;
  capacity: number;
  booked: number;
}

interface WeightLog {
  id: string;
  date: string;
  weight: number;
}

const PLANS = [
  {
    id: 'monthly',
    name: 'Standard Monthly',
    monthlyPrice: 1999,
    quarterlyPrice: 1999 * 3,
    yearlyPrice: 1999 * 12,
    badge: null,
    features: [
      'Unlimited Gym Floor Access',
      'Cardio & Free Weight Zone',
      'Locker & Steam Room Access',
      'Initial Fitness Assessment',
      'Mobile App Workout Tracker'
    ],
    notIncluded: ['Custom Diet Blueprint', 'Personal Training Sessions', 'Sauna & Cryotherapy Suite']
  },
  {
    id: 'quarterly',
    name: 'Transform 90-Day',
    monthlyPrice: 1666,
    quarterlyPrice: 4999,
    yearlyPrice: 4999 * 4,
    badge: 'Most Popular',
    popular: true,
    savings: 'Save ₹998',
    features: [
      'Unlimited Gym Floor Access',
      'Cardio & Free Weight Zone',
      'Locker & Steam Room Access',
      'Custom Diet & Nutrition Blueprint',
      '2 Complimentary PT Sessions',
      'Unlimited HIIT & Group Classes',
      'Bio-Impedance Body Fat Scan'
    ],
    notIncluded: ['Sauna & Cryotherapy Suite']
  },
  {
    id: 'yearly',
    name: 'IronPulse Elite VIP',
    monthlyPrice: 1249,
    quarterlyPrice: 3749,
    yearlyPrice: 14999,
    badge: 'Best Value',
    savings: 'Save ₹8,989',
    features: [
      'All Transform 90-Day Features',
      '1 Month Free Membership Freeze',
      '6 Dedicated Personal Training Sessions',
      'Sauna, Steam & Cryo Recovery Suite',
      'IronPulse VIP Gym Kit (Bag & Shaker)',
      'Priority Class Slot Reservation',
      'Guest Pass: 2 Friends Free per Month'
    ],
    notIncluded: []
  }
];

const COMPARISON_FEATURES = [
  { name: 'Gym Floor & Free Weights', monthly: true, quarterly: true, yearly: true },
  { name: 'Cardio & Strength Machines', monthly: true, quarterly: true, yearly: true },
  { name: 'Locker & Steam Access', monthly: true, quarterly: true, yearly: true },
  { name: 'Custom Diet Blueprint', monthly: false, quarterly: true, yearly: true },
  { name: 'Complimentary PT Sessions', monthly: false, quarterly: '2 Sessions', yearly: '6 Sessions' },
  { name: 'HIIT & Group Studio Classes', monthly: false, quarterly: true, yearly: true },
  { name: 'Body Composition Scan', monthly: false, quarterly: true, yearly: true },
  { name: 'Sauna & Cryo Suite', monthly: false, quarterly: false, yearly: true },
  { name: 'Membership Freeze Option', monthly: false, quarterly: false, yearly: '1 Month Free' },
  { name: 'Free Monthly Guest Passes', monthly: false, quarterly: false, yearly: '2 Passes / Mo' }
];

const TRAINERS = [
  {
    id: '1',
    name: 'Alex Fernandes (Sample)',
    specialty: 'CrossFit & Functional Strength',
    experience: '8+ Years Coaching',
    image: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=600&q=80',
    tags: ['CrossFit Level 2', 'Olympic Lifting', 'Hypertrophy'],
    bio: 'Former national athlete specializing in athletic conditioning, metabolic acceleration, and functional mass building.'
  },
  {
    id: '2',
    name: 'Priya Menon (Sample)',
    specialty: 'Power Yoga & Mobility',
    experience: '6+ Years Coaching',
    image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=600&q=80',
    tags: ['Yoga Alliance 500H', 'Core Conditioning', 'Flexibility'],
    bio: 'Passionate about structural alignment, breathwork, and deep somatic mobility for pain-free posture.'
  },
  {
    id: '3',
    name: 'Sam Tiwari (Sample)',
    specialty: 'Boxing & High-Intensity Conditioning',
    experience: '10+ Years Coaching',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    tags: ['Pro Boxing Coach', 'HIIT Specialist', 'Fat Loss'],
    bio: 'High-octane boxing workouts engineered to melt body fat, sharpen reflexes, and forge unstoppable grit.'
  }
];

const INITIAL_CLASSES: ClassSession[] = [
  { id: 'c1', name: 'Dawn Blitz HIIT', type: 'HIIT', trainer: 'Alex Fernandes', time: '06:00 AM', day: 'Monday', capacity: 16, booked: 14 },
  { id: 'c2', name: 'Vinyasa Flow Yoga', type: 'Yoga', trainer: 'Priya Menon', time: '07:30 AM', day: 'Monday', capacity: 20, booked: 18 },
  { id: 'c3', name: 'Heavy Bag Striking', type: 'Boxing', trainer: 'Sam Tiwari', time: '05:30 PM', day: 'Monday', capacity: 12, booked: 9 },
  { id: 'c4', name: 'Iron CrossFit WOD', type: 'CrossFit', trainer: 'Alex Fernandes', time: '07:00 PM', day: 'Monday', capacity: 15, booked: 15 },

  { id: 'c5', name: 'Cardio Kickboxing', type: 'Boxing', trainer: 'Sam Tiwari', time: '06:00 AM', day: 'Tuesday', capacity: 14, booked: 10 },
  { id: 'c6', name: 'Core & Mobility Yoga', type: 'Yoga', trainer: 'Priya Menon', time: '08:00 AM', day: 'Tuesday', capacity: 20, booked: 12 },
  { id: 'c7', name: 'Tabata Burn', type: 'HIIT', trainer: 'Alex Fernandes', time: '06:00 PM', day: 'Tuesday', capacity: 16, booked: 16 },

  { id: 'c8', name: 'Spartan CrossFit', type: 'CrossFit', trainer: 'Alex Fernandes', time: '06:00 AM', day: 'Wednesday', capacity: 15, booked: 11 },
  { id: 'c9', name: 'Golden Hour Yoga', type: 'Yoga', trainer: 'Priya Menon', time: '05:30 PM', day: 'Wednesday', capacity: 20, booked: 19 },
  { id: 'c10', name: 'Knockout Boxing', type: 'Boxing', trainer: 'Sam Tiwari', time: '07:00 PM', day: 'Wednesday', capacity: 12, booked: 12 },

  { id: 'c11', name: 'Sunrise HIIT Circuit', type: 'HIIT', trainer: 'Alex Fernandes', time: '06:30 AM', day: 'Thursday', capacity: 16, booked: 8 },
  { id: 'c12', name: 'Restorative Yin Yoga', type: 'Yoga', trainer: 'Priya Menon', time: '06:00 PM', day: 'Thursday', capacity: 20, booked: 15 },

  { id: 'c13', name: 'Friday Night Fight Club', type: 'Boxing', trainer: 'Sam Tiwari', time: '06:30 PM', day: 'Friday', capacity: 14, booked: 13 },
  { id: 'c14', name: 'Hero WOD Challenge', type: 'CrossFit', trainer: 'Alex Fernandes', time: '07:30 PM', day: 'Friday', capacity: 18, booked: 17 },

  { id: 'c15', name: 'Weekend Warrior Boot Camp', type: 'HIIT', trainer: 'Alex Fernandes', time: '08:00 AM', day: 'Saturday', capacity: 25, booked: 22 },
  { id: 'c16', name: 'Pranayama & Sound Bath', type: 'Yoga', trainer: 'Priya Menon', time: '09:30 AM', day: 'Saturday', capacity: 25, booked: 20 },
  { id: 'c17', name: 'Recovery Stretch & Mobility', type: 'Yoga', trainer: 'Priya Menon', time: '09:00 AM', day: 'Sunday', capacity: 20, booked: 11 }
];

export const GymDemo: React.FC<GymDemoProps> = ({ onOrderThisWebsite }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'quarterly' | 'yearly'>('quarterly');
  const [selectedDay, setSelectedDay] = useState<string>('Monday');
  const [selectedClassType, setSelectedClassType] = useState<string>('all');
  const [selectedTrainer, setSelectedTrainer] = useState<string>('all');
  
  // BMI & Calorie Calculator state
  const [heightCm, setHeightCm] = useState<number>(172);
  const [weightKg, setWeightKg] = useState<number>(74);
  const [age, setAge] = useState<number>(28);
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [activityLevel, setActivityLevel] = useState<number>(1.55); // 1.2, 1.375, 1.55, 1.725
  const [bmiResult, setBmiResult] = useState<{ bmi: number; category: string; calories: number; recommendation: string } | null>(null);

  // Free trial pass generator state
  const [passName, setPassName] = useState('');
  const [passPhone, setPassPhone] = useState('');
  const [passGoal, setPassGoal] = useState('Muscle Building & Strength');
  const [passSlot, setPassSlot] = useState('Morning (06:00 AM - 10:00 AM)');
  const [passDuration, setPassDuration] = useState<'1-Day Free Trial' | '7-Day VIP Guest Pass'>('1-Day Free Trial');
  const [generatedPass, setGeneratedPass] = useState<{ id: string; name: string; phone: string; goal: string; slot: string; validUntil: string; duration: string } | null>(null);

  // Timetable booking modal
  const [bookingClass, setBookingClass] = useState<ClassSession | null>(null);
  const [bookingName, setBookingName] = useState('');
  const [bookingPhone, setBookingPhone] = useState('');
  const [classesList, setClassesList] = useState<ClassSession[]>(INITIAL_CLASSES);

  // Progress tracker (Weight log)
  const [weightLogs, setWeightLogs] = useLocalStorage<WeightLog[]>('nexora_gym_weights', [
    { id: 'w1', date: '2026-10-01', weight: 79.5 },
    { id: 'w2', date: '2026-10-08', weight: 78.8 },
    { id: 'w3', date: '2026-10-15', weight: 77.9 },
    { id: 'w4', date: '2026-10-22', weight: 76.8 },
    { id: 'w5', date: '2026-10-29', weight: 75.9 },
    { id: 'w6', date: '2026-11-03', weight: 74.5 }
  ]);
  const [newLogDate, setNewLogDate] = useState(todayStr());
  const [newLogWeight, setNewLogWeight] = useState(74.0);

  const { toasts, dismiss: dismissToast } = useToast();
  const { toast, triggerSimulatedDispatch, playChime } = useDemoState();

  const svgPassId = useId();

  // Calculate BMI
  const handleCalculateBMI = (e: React.FormEvent) => {
    e.preventDefault();
    if (heightCm <= 0 || weightKg <= 0 || age <= 0) return;

    const heightM = heightCm / 100;
    const bmi = +(weightKg / (heightM * heightM)).toFixed(1);

    let category = 'Normal Weight';
    let recommendation = 'Transform 90-Day Plan';
    if (bmi < 18.5) {
      category = 'Underweight';
      recommendation = 'Transform 90-Day Plan (Hypertrophy & High-Calorie Nutrition)';
    } else if (bmi <= 24.9) {
      category = 'Optimal Health / Normal';
      recommendation = 'Transform 90-Day or IronPulse Elite Plan (Strength Conditioning)';
    } else if (bmi <= 29.9) {
      category = 'Overweight';
      recommendation = 'Transform 90-Day Fat Loss & HIIT Acceleration Blueprint';
    } else {
      category = 'High BMI / Intensive Focus Needed';
      recommendation = 'IronPulse Elite VIP (Includes 6 1-on-1 PT Sessions & Metabolic Scan)';
    }

    // Mifflin-St Jeor Formula
    const bmr = gender === 'male'
      ? 10 * weightKg + 6.25 * heightCm - 5 * age + 5
      : 10 * weightKg + 6.25 * heightCm - 5 * age - 161;

    const maintenanceCalories = Math.round(bmr * activityLevel);

    setBmiResult({
      bmi,
      category,
      calories: maintenanceCalories,
      recommendation
    });
    playChime('pop');
    toast.info(`BMI calculated: ${bmi} (${category}) · Daily maintenance: ${maintenanceCalories} kcal`);
  };

  // Generate trial pass
  const handleGeneratePass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passName.trim() || !isValidPhone(passPhone)) {
      toast.error('Please provide your name and a valid 10-digit mobile number.');
      return;
    }

    const expiryDays = passDuration === '1-Day Free Trial' ? 1 : 7;
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + expiryDays);
    const validUntil = expiryDate.toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' });
    const token = `NX-IC-${Math.floor(1000 + Math.random() * 9000)}`;

    const newPass = {
      id: token,
      name: passName.trim(),
      phone: passPhone.trim(),
      goal: passGoal,
      slot: passSlot,
      validUntil,
      duration: passDuration
    };

    setGeneratedPass(newPass);
    playChime('success');
    toast.success(`Your ${passDuration} #${token} has been generated with digital barcode!`, 'VIP Pass Active');
    triggerSimulatedDispatch('sms', {
      recipient: passPhone.trim(),
      title: `${passDuration}`,
      token
    });
  };

  // Book class spot
  const handleConfirmSpotBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingName.trim() || !isValidPhone(bookingPhone)) {
      toast.error('Please provide your name and a valid 10-digit phone number.');
      return;
    }

    if (!bookingClass) return;

    if (bookingClass.booked >= bookingClass.capacity) {
      toast.error('Sorry! This class session is fully booked.');
      return;
    }

    const token = `NX-SPT-${Math.floor(1000 + Math.random() * 9000)}`;
    setClassesList(prev =>
      prev.map(c => (c.id === bookingClass.id ? { ...c, booked: c.booked + 1 } : c))
    );
    playChime('success');
    toast.success(`Spot confirmed in ${bookingClass.name} with ${bookingClass.trainer}!`, 'Class Reserved');
    triggerSimulatedDispatch('whatsapp', {
      recipient: bookingPhone.trim(),
      title: `${bookingClass.name} Spot`,
      token
    });
    setBookingClass(null);
    setBookingName('');
    setBookingPhone('');
  };

  // Add weight log
  const handleAddWeightLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (newLogWeight <= 20 || newLogWeight >= 300) {
      toast.error('Please enter a realistic weight value in kg.');
      return;
    }

    const newEntry: WeightLog = {
      id: `LOG-${Date.now()}`,
      date: newLogDate,
      weight: +newLogWeight.toFixed(1)
    };

    setWeightLogs(prev => [...prev.filter(l => l.date !== newLogDate), newEntry].sort((a, b) => a.date.localeCompare(b.date)));
    toast.success(`Logged ${newLogWeight} kg for ${newLogDate}`);
  };

  // Remove weight log
  const handleRemoveLog = (id: string) => {
    setWeightLogs(prev => prev.filter(l => l.id !== id));
    toast.info('Log entry removed');
  };

  // Filtered classes
  const filteredClasses = classesList.filter(c => {
    const dayMatch = c.day === selectedDay;
    const typeMatch = selectedClassType === 'all' || c.type === selectedClassType;
    const trainerMatch = selectedTrainer === 'all' || c.trainer.includes(selectedTrainer);
    return dayMatch && typeMatch && trainerMatch;
  });

  // SVG Chart calculation for Weight Tracker
  const sortedWeights = [...weightLogs].sort((a, b) => a.date.localeCompare(b.date));
  const minW = sortedWeights.length ? Math.min(...sortedWeights.map(w => w.weight)) - 2 : 60;
  const maxW = sortedWeights.length ? Math.max(...sortedWeights.map(w => w.weight)) + 2 : 90;
  const chartHeight = 160;
  const chartWidth = 500;

  const getCoordinates = (index: number, weight: number) => {
    const x = (index / (Math.max(sortedWeights.length - 1, 1))) * (chartWidth - 60) + 30;
    const y = chartHeight - 20 - ((weight - minW) / (maxW - minW || 1)) * (chartHeight - 40);
    return { x, y };
  };

  const polylinePoints = sortedWeights.map((w, idx) => {
    const { x, y } = getCoordinates(idx, w.weight);
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="bg-[#090a0f] text-slate-100 font-sans min-h-screen selection:bg-rose-500 selection:text-white pb-24">
      <ToastContainer toasts={toasts} dismiss={dismissToast} />
      <DemoBadge />

      {/* Top Notification Bar */}
      <div className="bg-rose-950/40 border-b border-rose-900/40 px-4 sm:px-6 py-2.5 text-xs flex flex-wrap justify-between items-center text-rose-200">
        <div className="flex items-center gap-2">
          <Flame className="w-4 h-4 text-rose-500 animate-pulse" />
          <span className="font-medium">
            Nexora Client Template: High-Converting Gym & Fitness Portal
          </span>
          <span className="hidden md:inline px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-[10px] font-mono">
            LIVE DEMO
          </span>
        </div>
        {onOrderThisWebsite && (
          <button
            onClick={onOrderThisWebsite}
            className="text-rose-400 hover:text-white font-semibold underline text-xs transition-colors cursor-pointer"
          >
            Get this website design for your gym →
          </button>
        )}
      </div>

      {/* Sticky Main Navigation */}
      <nav className="bg-[#0b0c16]/95 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-4 sticky top-0 z-30 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center font-black text-black shadow-lg shadow-rose-600/30">
            <Dumbbell className="w-5 h-5 text-black" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black tracking-wider text-xl text-white uppercase font-display">IRONPULSE</span>
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-rose-600/20 text-rose-400 font-bold border border-rose-500/30">
                FITNESS
              </span>
            </div>
            <p className="text-[10px] text-slate-400 -mt-0.5">Strength • Conditioning • Recovery</p>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-6 text-xs font-semibold text-slate-300">
          <a href="#plans" className="hover:text-rose-400 transition-colors">Memberships</a>
          <a href="#comparison" className="hover:text-rose-400 transition-colors">Compare Plans</a>
          <a href="#calculator" className="hover:text-rose-400 transition-colors">BMI & Calories</a>
          <a href="#timetable" className="hover:text-rose-400 transition-colors">Class Timetable</a>
          <a href="#trainers" className="hover:text-rose-400 transition-colors">Coaches</a>
          <a href="#pass" className="hover:text-rose-400 transition-colors">Free Pass</a>
          <a href="#tracker" className="hover:text-rose-400 transition-colors">Weight Tracker</a>
        </div>

        <div className="flex items-center gap-3">
          <WhatsAppButton
            message="Hello IronPulse Fitness! I would like to inquire about membership packages and trainer availability."
            label="Inquire via WhatsApp"
            size="sm"
          />
          <a
            href="#pass"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-rose-500 hover:brightness-110 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-rose-900/30 hidden sm:inline-block"
          >
            Claim 7-Day Pass
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-16 pb-20 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-rose-950/20 via-[#090a0f] to-[#090a0f] -z-10" />
        
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/60 border border-rose-800/40 text-rose-400 text-xs font-medium mb-6">
              <Trophy className="w-3.5 h-3.5" />
              <span>Bangalore’s Premier 12,000 Sq.Ft Athletic Performance Center</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-white leading-tight uppercase font-display tracking-tight mb-6">
              Break Plateaus. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-amber-400 to-rose-400">
                Forge True Strength.
              </span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base mb-8 leading-relaxed max-w-xl">
              State-of-the-art Eleiko Olympic lifting platforms, biometric body composition analysis, high-intensity boxing turf, and dedicated restorative sauna suites.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#plans"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-rose-600 via-rose-500 to-rose-600 hover:brightness-110 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-xl shadow-rose-950/50 flex items-center gap-2"
              >
                <span>View Membership Plans</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#calculator"
                className="px-6 py-3.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-slate-200 font-semibold text-xs uppercase tracking-wider transition-all flex items-center gap-2"
              >
                <HeartPulse className="w-4 h-4 text-rose-400" />
                <span>Calculate Your BMI</span>
              </a>
            </div>

            {/* Quick stats row */}
            <div className="mt-10 grid grid-cols-3 gap-4 pt-6 border-t border-white/10 max-w-lg">
              <div>
                <p className="text-2xl sm:text-3xl font-black text-white">12,000<span className="text-rose-500 text-lg">sqft</span></p>
                <p className="text-[11px] text-slate-400 uppercase tracking-wider mt-0.5">Floor Space</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-white">25+<span className="text-rose-500 text-lg">Daily</span></p>
                <p className="text-[11px] text-slate-400 uppercase tracking-wider mt-0.5">Studio Classes</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-white">06:00<span className="text-rose-500 text-lg">AM</span></p>
                <p className="text-[11px] text-slate-400 uppercase tracking-wider mt-0.5">Open 7 Days</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-rose-900/40 shadow-2xl shadow-rose-950/40">
              <SkeletonImage
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80"
                alt="IronPulse Fitness Training Turf"
                className="w-full h-[420px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090a0f] via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-black/80 backdrop-blur-md border border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-rose-400 font-mono uppercase font-bold">Limited Time Promo</span>
                  <p className="text-sm font-bold text-white">7-Day Free Full Access Pass</p>
                </div>
                <a
                  href="#pass"
                  className="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  Claim Pass
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ========================================================= */}
      {/* SECTION 1: Membership Plans with Toggle                  */}
      {/* ========================================================= */}
      <section id="plans" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto border-t border-white/5">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-rose-500 text-xs uppercase tracking-widest font-bold">Flexible Options</span>
          <h2 className="text-3xl sm:text-4xl font-black text-white uppercase font-display mt-1">
            Choose Your Tier
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-2">
            No hidden maintenance charges. Transparent billing with instant cancellation privileges.
          </p>

          {/* Billing Cycle Switcher */}
          <div className="inline-flex items-center p-1 rounded-2xl bg-[#141524] border border-white/10 mt-6 shadow-inner">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all cursor-pointer ${
                billingCycle === 'monthly' ? 'bg-rose-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('quarterly')}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
                billingCycle === 'quarterly' ? 'bg-rose-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Quarterly</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-amber-400 text-black font-extrabold">Save ₹998</span>
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
                billingCycle === 'yearly' ? 'bg-rose-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Yearly VIP</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-emerald-400 text-black font-extrabold">Save ₹8.9k</span>
            </button>
          </div>
        </div>

        {/* Plan Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PLANS.map(plan => {
            const displayPrice = billingCycle === 'monthly'
              ? plan.monthlyPrice
              : billingCycle === 'quarterly'
              ? plan.quarterlyPrice
              : plan.yearlyPrice;

            const durationText = billingCycle === 'monthly'
              ? '/ month'
              : billingCycle === 'quarterly'
              ? '/ 3 months'
              : '/ 12 months';

            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl p-6 sm:p-8 transition-all flex flex-col justify-between border ${
                  plan.popular
                    ? 'bg-gradient-to-b from-[#1b101c] via-[#10111e] to-[#0a0b14] border-rose-500 shadow-2xl shadow-rose-950/40 ring-1 ring-rose-500/50 scale-[1.02]'
                    : 'bg-[#10111e] border-white/10 hover:border-white/20'
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-rose-600 to-amber-500 text-black font-mono text-[10px] font-black uppercase tracking-wider shadow-lg">
                    {plan.badge}
                  </div>
                )}

                <div>
                  <h3 className="text-xl font-black text-white uppercase font-display">{plan.name}</h3>
                  <div className="mt-4 mb-6 pb-6 border-b border-white/10">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl sm:text-4xl font-black text-white">{formatINR(displayPrice)}</span>
                      <span className="text-xs text-slate-400">{durationText}</span>
                    </div>
                    {billingCycle !== 'monthly' && (
                      <p className="text-[11px] text-emerald-400 font-mono mt-1 font-medium">
                        Effective ₹{Math.round(displayPrice / (billingCycle === 'quarterly' ? 3 : 12))}/month
                      </p>
                    )}
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                    {plan.notIncluded.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-500 line-through">
                        <X className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href={`https://wa.me/917975976491?text=${encodeURIComponent(`Hello IronPulse Fitness! I am interested in joining the ${plan.name} (${billingCycle} billing, ${formatINR(displayPrice)}). Please send registration details.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                    plan.popular
                      ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-900/30'
                      : 'bg-white/10 hover:bg-white/20 text-white'
                  }`}
                >
                  <span>Select {plan.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 2: Plan Comparison Matrix Table                  */}
      {/* ========================================================= */}
      <section id="comparison" className="py-16 px-4 sm:px-6 max-w-5xl mx-auto border-t border-white/5">
        <div className="text-center mb-10">
          <span className="text-rose-500 text-xs uppercase tracking-widest font-bold">Deep Dive</span>
          <h2 className="text-2xl sm:text-3xl font-black text-white uppercase font-display mt-1">
            Compare Plan Inclusions
          </h2>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0d0e1b] overflow-hidden overflow-x-auto shadow-xl">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#141525] text-white uppercase font-mono text-[11px] border-b border-white/10">
              <tr>
                <th className="py-4 px-5">Features & Amenities</th>
                <th className="py-4 px-4 text-center">Monthly</th>
                <th className="py-4 px-4 text-center text-rose-400">Transform 90-Day</th>
                <th className="py-4 px-4 text-center text-amber-400">Elite VIP Yearly</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {COMPARISON_FEATURES.map((item, idx) => (
                <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-5 font-medium text-white">{item.name}</td>
                  
                  {/* Monthly column */}
                  <td className="py-3.5 px-4 text-center">
                    {typeof item.monthly === 'boolean' ? (
                      item.monthly ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto" />
                      ) : (
                        <X className="w-4 h-4 text-slate-600 mx-auto" />
                      )
                    ) : (
                      <span className="text-[11px] font-mono text-slate-300">{item.monthly}</span>
                    )}
                  </td>

                  {/* Quarterly column */}
                  <td className="py-3.5 px-4 text-center bg-rose-950/10">
                    {typeof item.quarterly === 'boolean' ? (
                      item.quarterly ? (
                        <CheckCircle2 className="w-4 h-4 text-rose-400 mx-auto" />
                      ) : (
                        <X className="w-4 h-4 text-slate-600 mx-auto" />
                      )
                    ) : (
                      <span className="text-[11px] font-mono text-rose-300 font-bold">{item.quarterly}</span>
                    )}
                  </td>

                  {/* Yearly column */}
                  <td className="py-3.5 px-4 text-center bg-amber-950/10">
                    {typeof item.yearly === 'boolean' ? (
                      item.yearly ? (
                        <CheckCircle2 className="w-4 h-4 text-amber-400 mx-auto" />
                      ) : (
                        <X className="w-4 h-4 text-slate-600 mx-auto" />
                      )
                    ) : (
                      <span className="text-[11px] font-mono text-amber-300 font-bold">{item.yearly}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 3: Interactive BMI & Calorie Calculator          */}
      {/* ========================================================= */}
      <section id="calculator" className="py-20 px-4 sm:px-6 max-w-5xl mx-auto border-t border-white/5">
        <div className="bg-gradient-to-b from-[#141527] to-[#0c0d18] border border-rose-900/40 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto text-center mb-8">
            <span className="text-rose-500 text-xs uppercase tracking-widest font-bold">Interactive Health Tool</span>
            <h2 className="text-2xl sm:text-4xl font-black text-white uppercase font-display mt-1">
              BMI & Daily Caloric Needs Calculator
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Compute your metabolic benchmark and discover the targeted nutrition & training tier engineered for your physique.
            </p>
          </div>

          <form onSubmit={handleCalculateBMI} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Left inputs */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Height (cm): <span className="text-rose-400 font-mono font-bold">{heightCm} cm</span>
                </label>
                <input
                  type="range"
                  min="130"
                  max="220"
                  value={heightCm}
                  onChange={e => setHeightCm(+e.target.value)}
                  className="w-full accent-rose-500 cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Current Weight (kg): <span className="text-rose-400 font-mono font-bold">{weightKg} kg</span>
                </label>
                <input
                  type="range"
                  min="35"
                  max="160"
                  value={weightKg}
                  onChange={e => setWeightKg(+e.target.value)}
                  className="w-full accent-rose-500 cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Age (Years)</label>
                  <input
                    type="number"
                    min="14"
                    max="80"
                    value={age}
                    onChange={e => setAge(+e.target.value)}
                    className="w-full bg-[#0a0b16] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-rose-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Gender</label>
                  <div className="grid grid-cols-2 gap-1.5 bg-[#0a0b16] p-1 rounded-xl border border-white/10">
                    <button
                      type="button"
                      onClick={() => setGender('male')}
                      className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
                        gender === 'male' ? 'bg-rose-600 text-white' : 'text-slate-400'
                      }`}
                    >
                      Male
                    </button>
                    <button
                      type="button"
                      onClick={() => setGender('female')}
                      className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
                        gender === 'female' ? 'bg-rose-600 text-white' : 'text-slate-400'
                      }`}
                    >
                      Female
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Weekly Activity Level</label>
                <select
                  value={activityLevel}
                  onChange={e => setActivityLevel(+e.target.value)}
                  className="w-full bg-[#0a0b16] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-rose-500"
                >
                  <option value={1.2}>Sedentary (Desk job, little/no exercise)</option>
                  <option value={1.375}>Lightly Active (1-3 workout sessions / week)</option>
                  <option value={1.55}>Moderately Active (3-5 intense gym workouts / week)</option>
                  <option value={1.725}>Very Active (6-7 intense athletic sessions / week)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-rose-600 to-rose-500 hover:brightness-110 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-rose-900/30 transition-all cursor-pointer"
              >
                Compute Health Score & Caloric Target
              </button>
            </div>

            {/* Right Results Display */}
            <div className="bg-[#0a0b16]/90 border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
              {bmiResult ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <span className="text-[10px] font-mono uppercase text-slate-400">YOUR BMI SCORE</span>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold">CALCULATED</span>
                  </div>

                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl font-black text-rose-500 font-mono">{bmiResult.bmi}</span>
                    <span className="text-sm font-bold text-white px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                      {bmiResult.category}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400">Est. Daily Maintenance Calories:</span>
                      <span className="font-mono font-bold text-white">{bmiResult.calories} kcal/day</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400">Fat Loss Target (-500 kcal):</span>
                      <span className="font-mono font-bold text-amber-400">{bmiResult.calories - 500} kcal/day</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400">Muscle Gain Target (+300 kcal):</span>
                      <span className="font-mono font-bold text-emerald-400">{bmiResult.calories + 300} kcal/day</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-500/30">
                    <span className="text-[10px] font-mono uppercase text-rose-400 font-bold block mb-1">
                      RECOMMENDED IRONPULSE BLUEPRINT:
                    </span>
                    <p className="text-xs text-slate-200 font-semibold">{bmiResult.recommendation}</p>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center py-8">
                  <Activity className="w-12 h-12 text-rose-500/40 mb-3" />
                  <p className="text-sm font-bold text-white">Adjust sliders and click calculate</p>
                  <p className="text-xs text-slate-400 mt-1 max-w-xs">
                    Get an instant breakdown of your BMI, basal metabolic rate, and custom workout plan recommendation.
                  </p>
                </div>
              )}

              <p className="text-[10px] text-slate-400 italic mt-4 pt-3 border-t border-white/5 text-center">
                * Note: Estimations based on standard Mifflin-St Jeor equation. Does not substitute professional medical advice.
              </p>
            </div>
          </form>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 4: Weekly Class Timetable with Spot Booking       */}
      {/* ========================================================= */}
      <section id="timetable" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto border-t border-white/5">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <span className="text-rose-500 text-xs uppercase tracking-widest font-bold">Studio Schedule</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white uppercase font-display mt-1">
              Weekly Class Timetable
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Select your day and lock in your studio spot. High-demand sessions fill up fast.
            </p>
          </div>

          {/* Day of Week Selector */}
          <div className="flex flex-wrap gap-1 mt-4 md:mt-0">
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedDay === day
                    ? 'bg-rose-600 text-white shadow-md'
                    : 'bg-[#121324] text-slate-400 hover:text-white border border-white/5'
                }`}
              >
                {day.slice(0, 3)}
              </button>
            ))}
          </div>
        </div>

        {/* Filter Row: Type + Trainer */}
        <div className="flex flex-wrap gap-3 mb-6 p-3 rounded-2xl bg-[#0f1020] border border-white/10 items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-mono text-[11px]">DISCIPLINE:</span>
            {['all', 'HIIT', 'Yoga', 'Boxing', 'CrossFit'].map(t => (
              <button
                key={t}
                onClick={() => setSelectedClassType(t)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-colors cursor-pointer ${
                  selectedClassType === t ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-mono text-[11px]">COACH:</span>
            <select
              value={selectedTrainer}
              onChange={e => setSelectedTrainer(e.target.value)}
              className="bg-[#181930] border border-white/10 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none"
            >
              <option value="all">All Coaches</option>
              <option value="Alex">Alex Fernandes</option>
              <option value="Priya">Priya Menon</option>
              <option value="Sam">Sam Tiwari</option>
            </select>
          </div>
        </div>

        {/* Sessions Grid */}
        {filteredClasses.length === 0 ? (
          <EmptyState
            icon="🏋️"
            title={`No ${selectedClassType !== 'all' ? selectedClassType : ''} classes scheduled on ${selectedDay}`}
            description="Please choose another day or select 'All' disciplines."
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredClasses.map(session => {
              const spotsLeft = session.capacity - session.booked;
              const isFull = spotsLeft <= 0;

              return (
                <div
                  key={session.id}
                  className="p-5 rounded-2xl bg-[#101122] border border-white/10 hover:border-rose-500/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] font-bold font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-rose-600/20 text-rose-300 border border-rose-500/30">
                        {session.type}
                      </span>
                      <span className="text-xs font-mono font-semibold text-slate-300 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-rose-500" />
                        {session.time}
                      </span>
                    </div>

                    <h3 className="font-bold text-base text-white mt-1">{session.name}</h3>
                    <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                      <User className="w-3 h-3 text-slate-500" />
                      Coach {session.trainer}
                    </p>

                    <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                      <span className="text-slate-400">Available Spots:</span>
                      <span className={`font-mono font-bold ${spotsLeft <= 2 ? 'text-amber-400' : 'text-emerald-400'}`}>
                        {isFull ? 'FULL (0)' : `${spotsLeft} / ${session.capacity}`}
                      </span>
                    </div>
                  </div>

                  <button
                    disabled={isFull}
                    onClick={() => setBookingClass(session)}
                    className={`mt-4 w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      isFull
                        ? 'bg-white/5 text-slate-500 cursor-not-allowed'
                        : 'bg-rose-600 hover:bg-rose-500 text-white shadow-md shadow-rose-900/20'
                    }`}
                  >
                    {isFull ? 'Session Full' : 'Book Your Spot'}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Booking Spot Modal */}
      {bookingClass && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#121326] border border-rose-500/40 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative">
            <button
              onClick={() => setBookingClass(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] font-mono uppercase tracking-widest text-rose-400 font-bold block mb-1">
              CONFIRM CLASS SPOT
            </span>
            <h3 className="text-xl font-black text-white uppercase font-display">{bookingClass.name}</h3>
            <p className="text-xs text-slate-300 mt-1">
              {bookingClass.day} at {bookingClass.time} with Coach {bookingClass.trainer}
            </p>

            <form onSubmit={handleConfirmSpotBooking} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={bookingName}
                  onChange={e => setBookingName(e.target.value)}
                  className="w-full bg-[#0a0b16] border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">WhatsApp Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9876543210"
                  value={bookingPhone}
                  onChange={e => setBookingPhone(e.target.value)}
                  className="w-full bg-[#0a0b16] border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <DemoFormNote />

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-rose-900/30 cursor-pointer"
              >
                Confirm Free Spot Reservation
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SECTION 5: Elite Coaching Staff                          */}
      {/* ========================================================= */}
      <section id="trainers" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto border-t border-white/5">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-rose-500 text-xs uppercase tracking-widest font-bold">The Coaches</span>
          <h2 className="text-3xl sm:text-4xl font-black text-white uppercase font-display mt-1">
            Certified Master Trainers
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Every coach on our floor holds internationally recognized credentials and first-aid CPR certification.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TRAINERS.map(trainer => (
            <div
              key={trainer.id}
              className="rounded-3xl bg-[#0f1020] border border-white/10 overflow-hidden hover:border-rose-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative h-64 overflow-hidden">
                  <SkeletonImage
                    src={trainer.image}
                    alt={trainer.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f1020] via-transparent to-transparent" />
                  <span className="absolute top-3 right-3 text-[9px] font-mono px-2 py-0.5 rounded-full bg-black/70 text-slate-300 border border-white/10">
                    SAMPLE PROFILE
                  </span>
                </div>

                <div className="p-6">
                  <span className="text-rose-400 text-xs font-bold uppercase tracking-wider block">
                    {trainer.specialty}
                  </span>
                  <h3 className="text-lg font-black text-white mt-1">{trainer.name}</h3>
                  <p className="text-[11px] text-slate-400 mb-3">{trainer.experience}</p>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">{trainer.bio}</p>

                  <div className="flex flex-wrap gap-1.5">
                    {trainer.tags.map((tag, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/5">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <a
                  href={`https://wa.me/917975976491?text=${encodeURIComponent(`Hello IronPulse! I would like to book a 1-on-1 consultation session with ${trainer.name}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors border border-white/10"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-rose-500" />
                  <span>Request Coach Consultation</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 6: Free 7-Day Trial Pass Generator               */}
      {/* ========================================================= */}
      <section id="pass" className="py-20 px-4 sm:px-6 max-w-4xl mx-auto border-t border-white/5">
        <div className="bg-gradient-to-b from-[#15162a] to-[#0c0d18] border border-rose-500/40 rounded-3xl p-6 sm:p-10 shadow-2xl">
          <div className="text-center max-w-lg mx-auto mb-8">
            <span className="text-rose-400 text-xs uppercase tracking-widest font-bold">Zero Financial Commitment</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white uppercase font-display mt-1">
              Generate 7-Day Free VIP Access Pass
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1">
              Experience all facilities, attend studio classes, and meet our coaches completely free for one full week.
            </p>
          </div>

          {generatedPass ? (
            <div className="space-y-6">
              {/* Visual Generated Pass Card with SVG QR Pattern */}
              <div
                id="ironpulse-pass"
                className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-rose-950/80 via-[#111224] to-black border-2 border-rose-500 shadow-2xl text-white overflow-hidden"
              >
                {/* Decorative background watermark */}
                <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none">
                  <Dumbbell className="w-64 h-64 text-rose-500" />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-rose-600 flex items-center justify-center font-black text-black">
                      <Dumbbell className="w-4 h-4 text-black" />
                    </div>
                    <div>
                      <p className="font-black text-base uppercase font-display">IRONPULSE FITNESS</p>
                      <p className="text-[10px] text-rose-400 font-mono">OFFICIAL 7-DAY VIP PASS</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono text-slate-400 block">PASS ID:</span>
                    <span className="font-mono text-xs font-bold text-amber-400">{generatedPass.id}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-6 items-center">
                  <div className="sm:col-span-2 space-y-2">
                    <p className="text-xs text-slate-400">Cardholder Name:</p>
                    <p className="text-xl font-black text-white uppercase">{generatedPass.name}</p>
                    
                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div>
                        <p className="text-[10px] text-slate-400 uppercase">Registered Goal:</p>
                        <p className="text-xs font-semibold text-rose-300">{generatedPass.goal}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 uppercase">Preferred Window:</p>
                        <p className="text-xs font-semibold text-white">{generatedPass.slot}</p>
                      </div>
                    </div>
                  </div>

                  {/* Programmatic SVG QR & Barcode Pattern */}
                  <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white text-black shadow-lg">
                    <svg
                      aria-labelledby={svgPassId}
                      className="w-20 h-20"
                      viewBox="0 0 100 100"
                    >
                      <title id={svgPassId}>Pass QR Code</title>
                      {/* Corner locator squares */}
                      <rect x="5" y="5" width="25" height="25" fill="#000" />
                      <rect x="8" y="8" width="19" height="19" fill="#fff" />
                      <rect x="12" y="12" width="11" height="11" fill="#000" />

                      <rect x="70" y="5" width="25" height="25" fill="#000" />
                      <rect x="73" y="8" width="19" height="19" fill="#fff" />
                      <rect x="77" y="12" width="11" height="11" fill="#000" />

                      <rect x="5" y="70" width="25" height="25" fill="#000" />
                      <rect x="8" y="73" width="19" height="19" fill="#fff" />
                      <rect x="12" y="77" width="11" height="11" fill="#000" />

                      {/* Procedural data dots */}
                      {Array.from({ length: 40 }).map((_, idx) => {
                        const px = 35 + ((idx * 7) % 30);
                        const py = 10 + ((idx * 11) % 80);
                        return <rect key={idx} x={px} y={py} width="4" height="4" fill="#000" />;
                      })}
                    </svg>

                    {/* Barcode Strip */}
                    <div className="flex items-center gap-[1px] justify-center mt-2 h-4 w-24 overflow-hidden">
                      {[3, 1, 2, 1, 3, 2, 1, 2, 3, 1, 1, 2, 3, 2, 1, 2, 1, 3, 2, 1].map((w, i) => (
                        <div key={i} style={{ width: `${w}px` }} className="h-full bg-black shrink-0" />
                      ))}
                    </div>
                    <span className="text-[8px] font-mono font-bold mt-1 text-slate-800">AUTH: {generatedPass.id}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Valid for 7 Consecutive Days from Generation</span>
                  <span className="text-emerald-400 font-mono font-bold">Expires: {generatedPass.validUntil}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={getWhatsAppUrl(`Hello IronPulse Fitness! I have generated my 7-Day Free VIP Pass (${generatedPass.id}) for ${generatedPass.name}. Please confirm my reception check-in.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/30"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Confirm on WhatsApp</span>
                </a>
                <button
                  onClick={() => setGeneratedPass(null)}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs"
                >
                  Generate Another Pass
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleGeneratePass} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikram Malhotra"
                    value={passName}
                    onChange={e => setPassName(e.target.value)}
                    className="w-full bg-[#0a0b16] border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-rose-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">WhatsApp Mobile *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9876543210"
                    value={passPhone}
                    onChange={e => setPassPhone(e.target.value)}
                    className="w-full bg-[#0a0b16] border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Primary Fitness Goal</label>
                  <select
                    value={passGoal}
                    onChange={e => setPassGoal(e.target.value)}
                    className="w-full bg-[#0a0b16] border border-white/10 rounded-xl px-3.5 py-3 text-xs text-white focus:outline-none focus:border-rose-500"
                  >
                    <option value="Muscle Building & Hypertrophy">Muscle Building & Hypertrophy</option>
                    <option value="Weight Loss & Fat Reduction">Weight Loss & Fat Reduction</option>
                    <option value="Functional Conditioning & Endurance">Functional Conditioning & Endurance</option>
                    <option value="Flexibility & Yoga Somatics">Flexibility & Yoga Somatics</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Preferred Workout Slot</label>
                  <select
                    value={passSlot}
                    onChange={e => setPassSlot(e.target.value)}
                    className="w-full bg-[#0a0b16] border border-white/10 rounded-xl px-3.5 py-3 text-xs text-white focus:outline-none focus:border-rose-500"
                  >
                    <option value="Morning (06:00 AM - 10:00 AM)">Morning (06:00 AM - 10:00 AM)</option>
                    <option value="Afternoon (11:00 AM - 04:00 PM)">Afternoon (11:00 AM - 04:00 PM)</option>
                    <option value="Evening (05:00 PM - 10:00 PM)">Evening (05:00 PM - 10:00 PM)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Pass Access Tier</label>
                <div className="grid grid-cols-2 gap-3">
                  {(['1-Day Free Trial', '7-Day VIP Guest Pass'] as const).map(d => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setPassDuration(d)}
                      className={`p-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        passDuration === d
                          ? 'bg-rose-600/30 border-rose-500 text-rose-300 shadow-md'
                          : 'bg-[#0a0b16] border-white/10 text-slate-400 hover:text-white'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <DemoFormNote />

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 hover:brightness-110 text-white font-extrabold text-xs uppercase tracking-wider shadow-xl shadow-rose-950/50 transition-all cursor-pointer mt-2"
              >
                Generate & Reveal Instant VIP Pass
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 7: Interactive Weight Progress Tracker Demo       */}
      {/* ========================================================= */}
      <section id="tracker" className="py-20 px-4 sm:px-6 max-w-5xl mx-auto border-t border-white/5">
        <div className="bg-[#0e0f1e] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-rose-500 text-xs uppercase tracking-widest font-bold">Interactive Client Feature</span>
              <h2 className="text-2xl sm:text-3xl font-black text-white uppercase font-display mt-1">
                Body Weight Progress Tracker
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm mt-1">
                Demonstrating persistent local data logging. Log weekly check-ins to view real-time vector charting.
              </p>
            </div>

            {weightLogs.length > 0 && (
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
                <TrendingDown className="w-4 h-4 text-emerald-400" />
                <span>
                  Net Change: {(weightLogs[weightLogs.length - 1].weight - weightLogs[0].weight).toFixed(1)} kg
                </span>
              </div>
            )}
          </div>

          {/* SVG Vector Chart */}
          <div className="p-4 rounded-2xl bg-[#090a14] border border-white/10 mb-8 overflow-hidden">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="font-mono text-[11px]">WEIGHT (KG) OVER TIME</span>
              <span className="font-mono text-[11px] text-rose-400">TRENDLINE</span>
            </div>

            <div className="relative w-full h-[180px] flex items-center justify-center">
              {sortedWeights.length > 1 ? (
                <svg className="w-full h-full" viewBox={`0 0 ${chartWidth} ${chartHeight}`}>
                  {/* Grid background lines */}
                  <line x1="30" y1="30" x2={chartWidth - 30} y2="30" stroke="#ffffff" strokeOpacity="0.05" strokeDasharray="4" />
                  <line x1="30" y1="80" x2={chartWidth - 30} y2="80" stroke="#ffffff" strokeOpacity="0.05" strokeDasharray="4" />
                  <line x1="30" y1="130" x2={chartWidth - 30} y2="130" stroke="#ffffff" strokeOpacity="0.05" strokeDasharray="4" />

                  {/* Gradient Area under curve */}
                  <defs>
                    <linearGradient id="gymWeightGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#e11d48" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#e11d48" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Trendline Path */}
                  <polyline
                    fill="none"
                    stroke="#f43f5e"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={polylinePoints}
                  />

                  {/* Plot data points with values */}
                  {sortedWeights.map((w, idx) => {
                    const { x, y } = getCoordinates(idx, w.weight);
                    return (
                      <g key={w.id}>
                        <circle cx={x} cy={y} r="5" fill="#f43f5e" stroke="#090a0f" strokeWidth="2" />
                        <text
                          x={x}
                          y={y - 10}
                          textAnchor="middle"
                          fill="#ffffff"
                          fontSize="10"
                          fontFamily="monospace"
                        >
                          {w.weight}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              ) : (
                <p className="text-xs text-slate-500">Need at least 2 logged dates to draw trendline.</p>
              )}
            </div>
          </div>

          {/* Add Log Form */}
          <form onSubmit={handleAddWeightLog} className="flex flex-wrap items-end gap-3 pt-4 border-t border-white/10">
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">Check-in Date</label>
              <input
                type="date"
                required
                value={newLogDate}
                onChange={e => setNewLogDate(e.target.value)}
                className="bg-[#090a14] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-rose-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">Weight (kg)</label>
              <input
                type="number"
                step="0.1"
                required
                value={newLogWeight}
                onChange={e => setNewLogWeight(+e.target.value)}
                className="bg-[#090a14] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-rose-500 w-32"
              />
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Log Weight</span>
            </button>
          </form>

          {/* Log History Chips */}
          <div className="mt-6 pt-4 border-t border-white/5">
            <span className="text-[11px] font-mono text-slate-400 block mb-2">RECENT LOGS:</span>
            <div className="flex flex-wrap gap-2">
              {sortedWeights.map(log => (
                <div
                  key={log.id}
                  className="px-3 py-1.5 rounded-xl bg-[#090a14] border border-white/10 flex items-center gap-2 text-xs"
                >
                  <span className="font-mono text-slate-400">{log.date}:</span>
                  <span className="font-bold text-white">{log.weight} kg</span>
                  <button
                    onClick={() => handleRemoveLog(log.id)}
                    className="text-slate-500 hover:text-rose-400 transition-colors ml-1"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 bg-[#06070a] px-4 sm:px-6 text-center text-xs text-slate-400">
        <p className="font-display font-black text-lg text-white mb-2 uppercase">IRONPULSE PERFORMANCE CENTER</p>
        <p className="mb-4">Plot 44, 100 Feet Road, Koramangala 4th Block, Bengaluru, Karnataka</p>
        <p className="text-[11px] text-slate-500">
          Gym & Fitness Demo Portal Designed & Developed by Nexora Technologies
        </p>
      </footer>
    </div>
  );
};

export default GymDemo;
