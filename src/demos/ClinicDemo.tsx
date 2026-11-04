import React, { useState, useMemo } from 'react';
import {
  Stethoscope, PhoneCall, Clock, MapPin, CheckCircle2, Calendar as CalendarIcon,
  Search, Trash2, ShieldCheck, Award, X, ChevronRight, Download, AlertTriangle, ArrowLeft, UserCheck
} from 'lucide-react';
import {
  isValidPhone, isNowBetween, formatDateDisplay, todayStr,
  generateICS, downloadICS, formatINR
} from './shared/utils';
import { useLocalStorage, useToast } from './shared/hooks';
import { useDemoState } from './shared/DemoStateContext';
import {
  DemoBadge, ToastContainer, WhatsAppButton, SkeletonImage, Reveal,
  DemoFormNote, FieldError, EmptyState, AccordionItem, DemoMobileBottomBar
} from './shared/components';
import { getWhatsAppUrl } from '../utils/whatsapp';

interface Doctor {
  id: string;
  name: string;
  badge: string;
  specialty: 'Cardiology' | 'Orthopedics' | 'Pediatrics' | 'Dermatology' | 'Neurology' | 'General Medicine';
  shift: 'Morning' | 'Evening' | 'Full Day';
  shiftTimings: string;
  exp: string;
  quals: string;
  fee: number;
  slots: string[];
  availDays: string;
  image: string;
}

const DOCTORS: Doctor[] = [
  { id: '1', name: 'Dr. A. Rajan, MD', badge: 'Chief Cardiologist', specialty: 'Cardiology', shift: 'Morning', shiftTimings: '9:00 AM – 1:00 PM', exp: '14+ Yrs', quals: 'MBBS, MD Cardiology (AIIMS)', fee: 800, slots: ['9AM', '10AM', '11AM', '2PM'], availDays: 'Mon-Fri', image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&q=70' },
  { id: '2', name: 'Dr. S. Mehta, MS', badge: 'Orthopedic Lead', specialty: 'Orthopedics', shift: 'Evening', shiftTimings: '4:00 PM – 8:00 PM', exp: '11+ Yrs', quals: 'MBBS, MS Ortho (Gold Medal)', fee: 700, slots: ['2PM', '3PM', '4PM', '5PM'], availDays: 'Mon-Sat', image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=300&q=70' },
  { id: '3', name: 'Dr. P. Nair, DCH', badge: 'Senior Pediatrician', specialty: 'Pediatrics', shift: 'Morning', shiftTimings: '9:00 AM – 1:00 PM', exp: '9+ Yrs', quals: 'MBBS, DCH, DNB Paediatrics', fee: 600, slots: ['9AM', '10AM', '11AM', '2PM'], availDays: 'Daily', image: 'https://images.unsplash.com/photo-1594824813583-e18e38520ec7?w=300&q=70' },
  { id: '4', name: 'Dr. R. Sharma, MD', badge: 'Consultant Dermatologist', specialty: 'Dermatology', shift: 'Evening', shiftTimings: '4:00 PM – 8:00 PM', exp: '10+ Yrs', quals: 'MBBS, MD Dermatology (PGI)', fee: 750, slots: ['3PM', '4PM', '5PM'], availDays: 'Mon-Wed-Fri', image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&q=70' },
  { id: '5', name: 'Dr. K. Iyer, DM', badge: 'Senior Neuro Physician', specialty: 'Neurology', shift: 'Morning', shiftTimings: '9:00 AM – 1:00 PM', exp: '16+ Yrs', quals: 'MBBS, MD, DM Neurology', fee: 950, slots: ['9AM', '10AM', '11AM'], availDays: 'Tue-Thu-Sat', image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&q=70' },
  { id: '6', name: 'Dr. V. Sen, MD', badge: 'Internal Medicine Lead', specialty: 'General Medicine', shift: 'Full Day', shiftTimings: '9:00 AM – 7:00 PM', exp: '13+ Yrs', quals: 'MBBS, MD Internal Medicine', fee: 550, slots: ['10AM', '11AM', '2PM', '4PM', '5PM'], availDays: 'Mon-Sat', image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&q=70' },
];

const ALL_SLOTS = ['9AM', '10AM', '11AM', '2PM', '3PM', '4PM', '5PM'];

const SYMPTOM_OPTIONS = [
  { id: 'chest-pain', symptom: 'Chest Pain or Palpitations', specialty: 'Cardiology', doctorId: '1', note: 'Requires cardiac evaluation, ECG and blood pressure assessment.' },
  { id: 'knee-pain', symptom: 'Knee Pain or Joint Stiffness', specialty: 'Orthopedics', doctorId: '2', note: 'Specialized bone & joint care, sports injury and mobility review.' },
  { id: 'child-fever', symptom: 'Child Fever, Cough or Cold', specialty: 'Pediatrics', doctorId: '3', note: 'Pediatric specialist for infants, children and growth checkups.' },
  { id: 'skin-issues', symptom: 'Skin Issues, Rashes or Acne', specialty: 'Dermatology', doctorId: '4', note: 'Clinical skin analysis, allergy diagnosis and topical treatments.' },
  { id: 'headache', symptom: 'Severe or Frequent Headache', specialty: 'General/Neurology', doctorId: '1', note: 'Physician screening for migraine, stress and neurovascular health.' },
];

interface Appointment {
  token: string;
  doctorId: string;
  doctorName: string;
  specialty: string;
  date: string;
  slot: string;
  patientName: string;
  patientPhone: string;
  reason: string;
  fee: number;
  bookedAt: string;
}

function slotToHHMM(slot: string): string {
  const map: Record<string, string> = {
    '9AM': '09:00', '10AM': '10:00', '11AM': '11:00',
    '2PM': '14:00', '3PM': '15:00', '4PM': '16:00', '5PM': '17:00'
  };
  return map[slot] || '10:00';
}

function isSunday(dateStr: string): boolean {
  if (!dateStr) return false;
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, m - 1, d).getDay() === 0;
}

function getNextWorkingDates(count = 7): string[] {
  const dates: string[] = [];
  const cur = new Date();
  while (dates.length < count) {
    const y = cur.getFullYear();
    const m = String(cur.getMonth() + 1).padStart(2, '0');
    const d = String(cur.getDate()).padStart(2, '0');
    const str = `${y}-${m}-${d}`;
    if (cur.getDay() !== 0) dates.push(str);
    cur.setDate(cur.getDate() + 1);
  }
  return dates;
}

export const ClinicDemo: React.FC<{
  onOrderThisWebsite?: () => void;
  onBackToMain?: () => void;
}> = ({ onOrderThisWebsite, onBackToMain }) => {
  const { toasts, show: showToast, dismiss } = useToast();
  const { toast, triggerSimulatedDispatch, playChime } = useDemoState();
  const [appointments, setAppointments] = useLocalStorage<Appointment[]>('nexora_clinic_appts', []);

  // Filter & Search states
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('All');
  const [opdShiftFilter, setOpdShiftFilter] = useState<'All' | 'Morning' | 'Evening'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Symptom helper state
  const [selectedSymptomId, setSelectedSymptomId] = useState<string>(SYMPTOM_OPTIONS[0].id);

  // Booking Wizard states
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [wizardStep, setWizardStep] = useState<1 | 2 | 3 | 4>(1);
  const [bookingDoctorId, setBookingDoctorId] = useState<string>(DOCTORS[0].id);
  const [bookingDate, setBookingDate] = useState<string>(getNextWorkingDates()[0]);
  const [bookingSlot, setBookingSlot] = useState<string>('');
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [visitReason, setVisitReason] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [nameError, setNameError] = useState('');
  const [reasonError, setReasonError] = useState('');
  const [confirmedAppt, setConfirmedAppt] = useState<Appointment | null>(null);

  // Real-time clinic open check: Mon-Sat 9AM-8PM using isNowBetween
  const [isClinicOpen] = useState(() => {
    const day = new Date().getDay();
    return day !== 0 && isNowBetween('09:00', '20:00');
  });

  const filteredDoctors = useMemo(() => {
    return DOCTORS.filter(d => {
      const matchSpecialty = selectedSpecialty === 'All' || d.specialty === selectedSpecialty;
      const matchShift = opdShiftFilter === 'All' || d.shift === opdShiftFilter || d.shift === 'Full Day';
      const q = searchQuery.toLowerCase().trim();
      const matchSearch = !q ||
        d.name.toLowerCase().includes(q) ||
        d.specialty.toLowerCase().includes(q) ||
        d.quals.toLowerCase().includes(q);
      return matchSpecialty && matchShift && matchSearch;
    });
  }, [selectedSpecialty, opdShiftFilter, searchQuery]);

  const activeSymptom = useMemo(() => {
    return SYMPTOM_OPTIONS.find(s => s.id === selectedSymptomId) || SYMPTOM_OPTIONS[0];
  }, [selectedSymptomId]);

  const recommendedDoctor = useMemo(() => {
    return DOCTORS.find(d => d.id === activeSymptom.doctorId) || DOCTORS[0];
  }, [activeSymptom]);

  const selectedBookingDoctor = useMemo(() => {
    return DOCTORS.find(d => d.id === bookingDoctorId) || DOCTORS[0];
  }, [bookingDoctorId]);

  const openBookingForDoctor = (docId: string) => {
    setBookingDoctorId(docId);
    setBookingSlot('');
    setPhoneError('');
    setNameError('');
    setReasonError('');
    setWizardStep(2);
    setIsWizardOpen(true);
  };

  const isSlotDisabled = (slot: string): { disabled: boolean; reason?: string } => {
    if (!selectedBookingDoctor.slots.includes(slot)) return { disabled: true, reason: 'Unavailable' };
    if (bookingDoctorId === '1' && slot === '10AM') return { disabled: true, reason: 'Booked' };
    if (bookingDoctorId === '3' && slot === '11AM') return { disabled: true, reason: 'Booked' };
    const booked = appointments.some(a => a.doctorId === bookingDoctorId && a.date === bookingDate && a.slot === slot);
    if (booked) return { disabled: true, reason: 'Booked' };
    return { disabled: false };
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;
    if (!patientName.trim()) { setNameError('Full name is required'); valid = false; } else { setNameError(''); }

    const cleanPhone = patientPhone.replace(/[\s+\-()]/g, '');
    if (!isValidPhone(cleanPhone) || !/^[6-9]\d{9}$/.test(cleanPhone)) {
      setPhoneError('Please enter a valid 10-digit Indian mobile number');
      valid = false;
    } else {
      setPhoneError('');
    }

    if (!visitReason.trim()) { setReasonError('Please describe your symptoms/consultation reason'); valid = false; } else { setReasonError(''); }
    if (!valid) return;

    const token = `NX-PC-${Math.floor(1000 + Math.random() * 9000)}`;
    const newAppt: Appointment = {
      token, doctorId: selectedBookingDoctor.id, doctorName: selectedBookingDoctor.name,
      specialty: selectedBookingDoctor.specialty, date: bookingDate, slot: bookingSlot,
      patientName: patientName.trim(), patientPhone: cleanPhone, reason: visitReason.trim(),
      fee: selectedBookingDoctor.fee, bookedAt: new Date().toISOString()
    };

    setAppointments(prev => [newAppt, ...prev]);
    setConfirmedAppt(newAppt);
    setWizardStep(4);
    playChime('success');
    toast.success(
      `OPD Token #${token} generated! Scheduled with ${selectedBookingDoctor.name} for ${bookingSlot}.`,
      'Appointment Confirmed'
    );
    triggerSimulatedDispatch('whatsapp', {
      recipient: cleanPhone,
      title: `OPD Consultation Token #${token}`,
      token
    });
  };

  const handleCancelAppointment = (token: string) => {
    setAppointments(prev => prev.filter(a => a.token !== token));
    showToast('Appointment cancelled.', 'info');
  };

  const handleDownloadCalendar = () => {
    if (!confirmedAppt) return;
    const ics = generateICS({
      title: `Appointment at PulseCare Clinic - Dr. ${confirmedAppt.doctorName}`,
      description: `Doctor consultation for ${confirmedAppt.reason}. Booking Token: ${confirmedAppt.token}. Patient: ${confirmedAppt.patientName}. Fee: Rs.${confirmedAppt.fee}`,
      location: 'PulseCare Clinic, Medical Hub, 4th Block, Jayanagar, Bengaluru',
      startDate: confirmedAppt.date,
      startTime: slotToHHMM(confirmedAppt.slot),
      durationMins: 30,
    });
    downloadICS(`pulsecare-booking-${confirmedAppt.token}.ics`, ics);
    showToast('Calendar invite (.ics) downloaded!', 'success');
  };

  const upcomingWorkingDays = useMemo(() => getNextWorkingDates(8), []);

  return (
    <div className="bg-slate-900 text-slate-100 min-h-screen font-sans selection:bg-cyan-500 selection:text-white pb-24 md:pb-0">
      <ToastContainer toasts={toasts} dismiss={dismiss} />

      {/* Branded Demo Concept Tag in Document Flow */}
      <DemoBadge />

      {/* 1. Emergency Banner (Always Visible at Top) */}
      <header className="bg-slate-950/95 border-b border-cyan-900/40 px-3 sm:px-4 py-2 text-xs sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-3">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border shrink-0 ${
              isClinicOpen ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40' : 'bg-amber-950/80 text-amber-300 border-amber-500/40'
            }`}>
              <span className={`w-2 h-2 rounded-full ${isClinicOpen ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
              <span className="hidden sm:inline">{isClinicOpen ? 'Open Now (OPD: 9:00 AM - 8:00 PM)' : 'Closed Now (OPD: Mon-Sat 9AM-8PM)'}</span>
              <span className="sm:hidden">{isClinicOpen ? 'OPD Open' : 'OPD Closed'}</span>
            </span>
            <span className="hidden sm:inline text-slate-600">|</span>
            <div className="flex items-center gap-2 text-slate-300 font-medium text-xs">
              <PhoneCall className="w-3.5 h-3.5 text-rose-400 shrink-0" />
              <span>Emergency: <a href="tel:18001234567" className="text-white hover:text-cyan-300 font-bold" aria-label="Call Emergency Hotline">1800-XXX-XXXX</a></span>
              <span className="hidden sm:inline text-slate-600">|</span>
              <span className="hidden sm:inline">Ambulance: <a href="tel:108" className="text-rose-400 hover:text-rose-300 font-bold" aria-label="Call Ambulance 108">108</a></span>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            {onBackToMain && (
              <button type="button" onClick={onBackToMain} aria-label="Back to main portfolio" className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 transition-colors">
                <ArrowLeft className="w-3 h-3" /> Back
              </button>
            )}
            {onOrderThisWebsite && (
              <button type="button" onClick={onOrderThisWebsite} aria-label="Order Clinic Website Design" className="text-[11px] px-2.5 py-1 rounded bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-semibold transition-all">
                Order This Website Design →
              </button>
            )}
          </div>
        </div>
      </header>

      {/* 2. Sticky Nav */}
      <nav className="bg-slate-900/95 border-b border-slate-800 px-4 py-3 sticky top-[37px] z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20 shrink-0">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-white truncate">PulseCare</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30 shrink-0">CLINIC</span>
              </div>
              <p className="text-[10px] text-slate-400 hidden sm:block truncate">Multi-Specialty Care · Sample Concept</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-300">
            <a href="#doctors-dir" className="hover:text-cyan-400 transition-colors">Doctors</a>
            <a href="#symptom-helper" className="hover:text-cyan-400 transition-colors">Symptom Checker</a>
            <a href="#my-appointments" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
              <span>My Appointments</span>
              {appointments.length > 0 && (
                <span className="w-4 h-4 rounded-full bg-cyan-500 text-slate-950 font-bold text-[10px] flex items-center justify-center">
                  {appointments.length}
                </span>
              )}
            </a>
            <a href="#faqs" className="hover:text-cyan-400 transition-colors">FAQs</a>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <WhatsAppButton message="Hello PulseCare Clinic! I have an enquiry regarding doctor consultation and clinic timings." label="WhatsApp" size="sm" className="hidden sm:inline-flex" />
            <button
              type="button"
              onClick={() => { setWizardStep(1); setIsWizardOpen(true); }}
              aria-label="Book doctor appointment"
              className="hidden sm:inline-flex px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:brightness-110 text-white text-xs font-semibold shadow-lg shadow-cyan-500/25 transition-all cursor-pointer"
            >
              Book Appointment
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-12 sm:space-y-16">
        {/* Hero Section */}
        <section className="relative rounded-3xl overflow-hidden border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950/40 p-6 md:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-medium max-w-full">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="truncate">Verified Specialists · Digital Records · Instant Confirmation</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                Modern Healthcare With <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-400">Minimal Waiting Time</span>
              </h1>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
                Consult verified specialists across Cardiology, Orthopedics, Pediatrics, and Dermatology. Choose your slot, book online, and sync directly with your calendar.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-2 max-w-md sm:max-w-none">
                <button
                  type="button"
                  onClick={() => { setWizardStep(1); setIsWizardOpen(true); }}
                  aria-label="Book doctor appointment now"
                  className="w-full sm:w-auto h-12 min-h-[48px] px-5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-xl shadow-cyan-500/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CalendarIcon className="w-4 h-4" /> Book Appointment Now
                </button>
                <a href="#symptom-helper" aria-label="Match doctor by symptom" className="w-full sm:w-auto h-12 min-h-[48px] px-5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2">
                  <Stethoscope className="w-4 h-4 text-cyan-400" /> Match by Symptom
                </a>
              </div>
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-800">
                <div className="bg-slate-800/40 border border-slate-800 rounded-xl p-3">
                  <p className="text-base sm:text-xl font-bold text-cyan-400">Multi-Specialty</p>
                  <p className="text-[11px] text-slate-400">6 Departments</p>
                </div>
                <div className="bg-slate-800/40 border border-slate-800 rounded-xl p-3">
                  <p className="text-base sm:text-xl font-bold text-blue-400">&lt; 15 Mins</p>
                  <p className="text-[11px] text-slate-400">Average Wait Time</p>
                </div>
                <div className="bg-slate-800/40 border border-slate-800 rounded-xl p-3">
                  <p className="text-base sm:text-xl font-bold text-emerald-400">Live Slots</p>
                  <p className="text-[11px] text-slate-400">Instant Calendar Sync</p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-slate-700/70 shadow-2xl bg-slate-800/60">
                <SkeletonImage src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=600&q=80" alt="Clinic consultation" className="w-full h-80 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 bg-slate-900/90 backdrop-blur-md border border-slate-700 p-3.5 rounded-xl flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400 shrink-0"><Clock className="w-5 h-5" /></div>
                  <div>
                    <p className="text-xs font-semibold text-cyan-300">OPD Operating Hours</p>
                    <p className="text-[11px] text-slate-200">Mon - Sat: 9:00 AM - 8:00 PM</p>
                    <p className="text-[10px] text-slate-400">Sunday: Closed for routine OPD · 24/7 Trauma</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Symptom -> Specialist Quick Helper Widget */}
        <section id="symptom-helper" className="scroll-mt-24">
          <Reveal>
            <div className="rounded-3xl border border-cyan-900/50 bg-gradient-to-r from-cyan-950/40 via-slate-900 to-blue-950/30 p-6 md:p-8 shadow-xl">
              <div className="max-w-2xl mb-6">
                <span className="text-[11px] uppercase tracking-wider font-bold text-cyan-400">Specialist Recommendation Widget</span>
                <h2 className="text-2xl font-bold text-white mt-1">Symptom to Specialist Quick Helper</h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">Select your symptom to see which clinical department and doctor you should consult.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-5 space-y-3">
                  <label htmlFor="symptom-select" className="block text-xs font-medium text-slate-300">Select your symptom:</label>
                  <select
                    id="symptom-select"
                    value={selectedSymptomId}
                    onChange={e => setSelectedSymptomId(e.target.value)}
                    aria-label="Select symptom"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
                  >
                    {SYMPTOM_OPTIONS.map(opt => (
                      <option key={opt.id} value={opt.id} className="bg-slate-900 text-white">{opt.symptom}</option>
                    ))}
                  </select>
                  <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700 text-xs space-y-1.5">
                    <p className="text-cyan-300 font-semibold flex items-center gap-1.5">
                      <Stethoscope className="w-3.5 h-3.5" /> Recommended Specialty: {activeSymptom.specialty}
                    </p>
                    <p className="text-slate-300 text-[11px] leading-relaxed">{activeSymptom.note}</p>
                  </div>
                </div>

                <div className="lg:col-span-7 bg-slate-950/70 border border-cyan-500/20 rounded-2xl p-5 space-y-4">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="text-xs font-semibold text-slate-300">Suggested Specialist:</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/50">(Sample Profile)</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-slate-700">
                      <SkeletonImage src={recommendedDoctor.image} alt={recommendedDoctor.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-white truncate">{recommendedDoctor.name}</h4>
                      <p className="text-xs text-cyan-300">{recommendedDoctor.specialty} · {recommendedDoctor.quals}</p>
                      <p className="text-[11px] text-slate-400">{recommendedDoctor.exp} Exp · Fee: {formatINR(recommendedDoctor.fee)}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => openBookingForDoctor(recommendedDoctor.id)}
                      aria-label={`Book appointment with ${recommendedDoctor.name}`}
                      className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-all shadow-md shrink-0"
                    >
                      Book Specialist →
                    </button>
                  </div>
                  <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-300 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400" />
                    <span>⚠️ This is not medical advice. Please consult a qualified doctor.</span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* 3. Doctor Directory */}
        <section id="doctors-dir" className="space-y-6 scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-wider font-bold text-cyan-400">Doctor Directory</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Our Medical Specialists</h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">Filter by medical specialty or search by name. Instant booking with verified slots.</p>
            </div>
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search doctor or specialty..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                aria-label="Search doctors by name or specialty"
                className="w-full bg-slate-800/80 border border-slate-700 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
              />
              {searchQuery && (
                <button type="button" onClick={() => setSearchQuery('')} aria-label="Clear search" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Dual Filter Controls: Specialty & OPD Shift */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
              <span className="text-[11px] font-semibold text-slate-400 mr-1 shrink-0">Specialty:</span>
              {['All', 'Cardiology', 'Orthopedics', 'Pediatrics', 'Dermatology', 'Neurology', 'General Medicine'].map(spec => (
                <button
                  key={spec}
                  type="button"
                  onClick={() => setSelectedSpecialty(spec)}
                  aria-label={`Filter specialty by ${spec}`}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                    selectedSpecialty === spec
                      ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                      : 'bg-slate-800/70 hover:bg-slate-800 text-slate-300 border border-slate-700'
                  }`}
                >
                  {spec}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
              <span className="text-[11px] font-semibold text-slate-400 mr-1 shrink-0">OPD Shift:</span>
              {(['All', 'Morning', 'Evening'] as const).map(shift => (
                <button
                  key={shift}
                  type="button"
                  onClick={() => setOpdShiftFilter(shift)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                    opdShiftFilter === shift
                      ? 'bg-teal-500/20 border-teal-400 text-teal-300 font-bold'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {shift === 'All' ? 'All Shifts' : `${shift} Shift (${shift === 'Morning' ? '9 AM - 1 PM' : '4 PM - 8 PM'})`}
                </button>
              ))}
            </div>
          </div>

          {filteredDoctors.length === 0 ? (
            <EmptyState icon="👨‍⚕️" title="No Doctors Found" description="Try clearing your search query or specialty filter." />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {filteredDoctors.map(doc => (
                <div key={doc.id} className="bg-slate-800/40 border border-slate-700/70 hover:border-cyan-500/50 rounded-2xl overflow-hidden flex flex-col justify-between transition-all group hover:shadow-xl hover:shadow-cyan-950/20">
                  <div>
                    <div className="relative h-48 w-full overflow-hidden">
                      <SkeletonImage src={doc.image} alt={doc.name} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                      <span className="absolute top-2.5 right-2.5 text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-950/80 text-cyan-300 border border-cyan-500/30 backdrop-blur-sm">
                        (Sample Profile)
                      </span>
                      <span className="absolute bottom-2.5 left-2.5 text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-900/90 text-slate-200 border border-slate-700">
                        {doc.availDays}
                      </span>
                    </div>
                    <div className="p-4 space-y-2">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[11px] font-semibold text-cyan-400 bg-cyan-950/80 border border-cyan-800/40 px-2 py-0.5 rounded">{doc.specialty}</span>
                        <span className="text-xs font-bold text-emerald-400">{formatINR(doc.fee)}</span>
                      </div>
                      <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">{doc.name}</h3>
                      <p className="text-xs text-slate-300">{doc.quals}</p>
                      <div className="flex items-center gap-1.5 text-[10px] text-teal-300 font-medium bg-teal-950/60 px-2 py-1 rounded-lg border border-teal-800/30">
                        <Clock className="w-3 h-3 text-teal-400" />
                        <span>{doc.shift} OPD: {doc.shiftTimings}</span>
                      </div>
                      <div className="pt-2 border-t border-slate-700/50 flex items-center justify-between text-[11px] text-slate-400">
                        <span className="flex items-center gap-1"><Award className="w-3.5 h-3.5 text-amber-400" /> {doc.exp}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-cyan-400" /> {doc.slots.length} Slots</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 pt-0">
                    <button
                      type="button"
                      onClick={() => openBookingForDoctor(doc.id)}
                      aria-label={`Book Appointment with ${doc.name}`}
                      className="w-full py-2.5 rounded-xl bg-slate-700/60 hover:bg-cyan-500 hover:text-slate-950 text-cyan-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
                    >
                      <UserCheck className="w-4 h-4" /> Book Appointment
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* 6. My Appointments Panel (LocalStorage) */}
        <section id="my-appointments" className="space-y-4 scroll-mt-24 pt-4 border-t border-slate-800">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <span className="text-xs uppercase tracking-wider font-bold text-cyan-400">Your Bookings</span>
              <h2 className="text-2xl font-bold text-white mt-0.5">My Appointments</h2>
              <p className="text-xs text-slate-400">Stored locally in your browser (key: nexora_clinic_appts). Cancel or view slips anytime.</p>
            </div>
            {appointments.length > 0 && (
              <span className="text-xs text-slate-400">Total Booked: <strong className="text-white">{appointments.length}</strong></span>
            )}
          </div>

          {appointments.length === 0 ? (
            <div className="bg-slate-800/30 border border-slate-800 rounded-2xl p-6">
              <EmptyState icon="📅" title="No Appointments Booked Yet" description="Book your consultation above to generate digital appointment tokens and calendar invites." />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {appointments.map(appt => (
                <div key={appt.token} className="bg-slate-800/50 border border-slate-700 rounded-2xl p-4 space-y-3 relative overflow-hidden">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/40 font-bold">{appt.token}</span>
                      <h4 className="text-sm font-bold text-white mt-1.5">{appt.doctorName}</h4>
                      <p className="text-xs text-cyan-400 font-medium">{appt.specialty}</p>
                    </div>
                    <span className="text-xs font-bold text-emerald-400">{formatINR(appt.fee)}</span>
                  </div>
                  <div className="bg-slate-900/60 rounded-xl p-2.5 text-xs text-slate-300 space-y-1">
                    <p className="flex items-center gap-1.5 text-white font-medium">
                      <CalendarIcon className="w-3.5 h-3.5 text-cyan-400" />
                      {formatDateDisplay(appt.date)} at <span className="text-cyan-300 font-bold">{appt.slot}</span>
                    </p>
                    <p className="text-[11px] text-slate-400 truncate">Patient: {appt.patientName} ({appt.patientPhone})</p>
                    <p className="text-[11px] text-slate-400 italic truncate">Reason: {appt.reason}</p>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <a
                      href={getWhatsAppUrl(`Hello PulseCare Clinic! I have a confirmed appointment (${appt.token}) on ${appt.date} with ${appt.doctorName}.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Enquire on WhatsApp about appointment"
                      className="text-xs text-emerald-400 hover:text-emerald-300 font-medium"
                    >
                      Enquire WhatsApp →
                    </a>
                    <button
                      type="button"
                      onClick={() => handleCancelAppointment(appt.token)}
                      aria-label={`Cancel appointment ${appt.token}`}
                      className="text-xs px-2.5 py-1 rounded bg-rose-950/60 hover:bg-rose-900/60 text-rose-300 border border-rose-800/40 font-medium flex items-center gap-1 transition-colors"
                    >
                      <Trash2 className="w-3 h-3" /> Cancel
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* FAQs */}
        <section id="faqs" className="space-y-4 pt-4 border-t border-slate-800 scroll-mt-24">
          <div>
            <span className="text-xs uppercase tracking-wider font-bold text-cyan-400">Patient Queries</span>
            <h2 className="text-2xl font-bold text-white mt-0.5">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-2.5">
            <AccordionItem question="What should I bring to my first OPD consultation?" answer="Please carry a valid government photo ID, your digital booking token, and any previous medical records, blood reports, or prescription medications." accentColor="text-cyan-400" />
            <AccordionItem question="What is your cancellation or rescheduling policy?" answer="Appointments can be cancelled anytime with zero penalty. Slots are immediately released back to other waiting patients." accentColor="text-cyan-400" />
            <AccordionItem question="Are emergency trauma services available on Sundays?" answer="Yes! While routine OPD consultations are closed on Sundays, our 24/7 Emergency, Ambulance (108), and Trauma desk operates around the clock 365 days a year." accentColor="text-cyan-400" />
          </div>
        </section>
      </main>

      {/* 5. 3-Step Booking Wizard Modal: Bottom sheet on mobile (< 768px) */}
      {isWizardOpen && (
        <div role="dialog" aria-modal="true" aria-labelledby="wizard-title" className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border-t sm:border border-slate-700 w-full max-w-xl rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85dvh] overscroll-contain pb-[max(0.75rem,env(safe-area-inset-bottom))]">
            <div className="w-12 h-1 bg-white/20 rounded-full mx-auto my-2 sm:hidden shrink-0" />
            <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
              <div>
                <h3 id="wizard-title" className="text-base font-bold text-white flex items-center gap-2">
                  <Stethoscope className="w-4 h-4 text-cyan-400" />
                  {wizardStep === 4 ? 'Appointment Confirmed' : 'Book Clinic Appointment'}
                </h3>
                <p className="text-xs text-slate-400">
                  {wizardStep === 1 && 'Step 1 of 3: Select your consulting doctor'}
                  {wizardStep === 2 && 'Step 2 of 3: Select date and available time slot'}
                  {wizardStep === 3 && 'Step 3 of 3: Patient contact and visit reason'}
                  {wizardStep === 4 && 'Your appointment has been reserved successfully'}
                </p>
              </div>
              <button type="button" onClick={() => setIsWizardOpen(false)} aria-label="Close booking wizard" className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            {wizardStep < 4 && (
              <div className="grid grid-cols-3 gap-1 p-3 bg-slate-950/40 border-b border-slate-800">
                {[1, 2, 3].map(stepNum => (
                  <div key={stepNum} className={`h-1.5 rounded-full transition-all ${wizardStep >= stepNum ? 'bg-cyan-500' : 'bg-slate-800'}`} />
                ))}
              </div>
            )}

            <div className="p-4 sm:p-6 overflow-y-auto space-y-5">
              {wizardStep === 1 && (
                <div className="space-y-3">
                  <p className="text-xs font-semibold text-slate-300">Choose a consulting specialist:</p>
                  <div className="space-y-2.5">
                    {DOCTORS.map(doc => {
                      const isSelected = bookingDoctorId === doc.id;
                      return (
                        <label
                          key={doc.id}
                          className={`flex items-center gap-3 p-3 rounded-2xl border cursor-pointer transition-all ${
                            isSelected ? 'bg-cyan-950/40 border-cyan-500 text-white shadow-md shadow-cyan-950/40' : 'bg-slate-800/40 border-slate-700/80 hover:bg-slate-800 text-slate-300'
                          }`}
                        >
                          <input type="radio" name="doctorSelect" value={doc.id} checked={isSelected} onChange={() => setBookingDoctorId(doc.id)} className="sr-only" />
                          <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-slate-700">
                            <SkeletonImage src={doc.image} alt={doc.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-sm text-white">{doc.name}</span>
                              <span className="text-[10px] text-cyan-400 bg-cyan-950 px-1.5 py-0.2 rounded border border-cyan-800">{doc.specialty}</span>
                            </div>
                            <p className="text-xs text-slate-400">{doc.quals} · {doc.exp}</p>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="text-xs font-bold text-emerald-400">{formatINR(doc.fee)}</span>
                            <p className="text-[10px] text-slate-400">{doc.availDays}</p>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}

              {wizardStep === 2 && (
                <div className="space-y-5">
                  <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-slate-400">Doctor:</span> <strong className="text-white">{selectedBookingDoctor.name}</strong> ({selectedBookingDoctor.specialty})
                    </div>
                    <button type="button" onClick={() => setWizardStep(1)} className="text-cyan-400 hover:underline font-semibold">Change</button>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="appointment-date-input" className="block text-xs font-semibold text-slate-300">Select Consultation Date:</label>
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
                      {upcomingWorkingDays.map(dateStr => {
                        const isSelected = bookingDate === dateStr;
                        const [y, m, d] = dateStr.split('-').map(Number);
                        const dt = new Date(y, m - 1, d);
                        return (
                          <button
                            key={dateStr}
                            type="button"
                            onClick={() => { setBookingDate(dateStr); setBookingSlot(''); }}
                            aria-label={`Select date ${dateStr}`}
                            className={`p-2.5 rounded-xl border text-center min-w-[70px] shrink-0 transition-all ${
                              isSelected ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400 shadow-lg shadow-cyan-500/20' : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800'
                            }`}
                          >
                            <span className="block text-[10px] uppercase tracking-wider">{dt.toLocaleDateString('en-IN', { weekday: 'short' })}</span>
                            <span className="block text-base font-extrabold">{d}</span>
                            <span className="block text-[10px] opacity-80">{dt.toLocaleDateString('en-IN', { month: 'short' })}</span>
                          </button>
                        );
                      })}
                    </div>
                    <div className="pt-2">
                      <input
                        id="appointment-date-input"
                        type="date"
                        min={todayStr()}
                        value={bookingDate}
                        onChange={e => { setBookingDate(e.target.value); setBookingSlot(''); }}
                        aria-label="Pick custom date"
                        className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                    {isSunday(bookingDate) && (
                      <p className="text-xs text-amber-400 flex items-center gap-1.5 pt-1">
                        <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                        The clinic OPD is closed on Sundays. Please select a date from Monday to Saturday.
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-slate-300">Select Available Time Slot (30 Mins):</p>
                    {isSunday(bookingDate) ? (
                      <p className="text-xs text-slate-400 italic">No slots available on Sunday.</p>
                    ) : (
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                        {ALL_SLOTS.map(slot => {
                          const { disabled, reason } = isSlotDisabled(slot);
                          const isSelected = bookingSlot === slot;
                          return (
                            <button
                              key={slot}
                              type="button"
                              disabled={disabled}
                              onClick={() => setBookingSlot(slot)}
                              aria-label={`Select slot ${slot} ${disabled ? `(${reason})` : ''}`}
                              className={`py-2 px-2.5 rounded-xl text-xs font-semibold transition-all border flex flex-col items-center justify-center ${
                                isSelected ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md shadow-cyan-500/20'
                                  : disabled ? 'bg-slate-800/20 text-slate-600 border-slate-800/60 cursor-not-allowed line-through'
                                  : 'bg-slate-800/70 hover:bg-slate-800 text-slate-200 border-slate-700'
                              }`}
                            >
                              <span>{slot}</span>
                              {disabled && <span className="text-[9px] font-normal no-underline">({reason})</span>}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {wizardStep === 3 && (
                <form id="booking-patient-form" onSubmit={handleConfirmBooking} className="space-y-4">
                  <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700 text-xs flex justify-between">
                    <div>
                      <p className="text-white font-semibold">{selectedBookingDoctor.name} ({selectedBookingDoctor.specialty})</p>
                      <p className="text-slate-400">{formatDateDisplay(bookingDate)} at {bookingSlot} · Fee: {formatINR(selectedBookingDoctor.fee)}</p>
                    </div>
                    <button type="button" onClick={() => setWizardStep(2)} className="text-cyan-400 text-xs hover:underline font-semibold">Edit Slot</button>
                  </div>
                  <div>
                    <label htmlFor="patient-name-field" className="block text-xs font-medium text-slate-300 mb-1">Full Name *</label>
                    <input
                      id="patient-name-field"
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={patientName}
                      onChange={e => { setPatientName(e.target.value); if (nameError) setNameError(''); }}
                      aria-label="Patient Full Name"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-base sm:text-xs text-white focus:outline-none focus:border-cyan-400 min-h-[44px] sm:min-h-0"
                    />
                    <FieldError error={nameError} />
                  </div>
                  <div>
                    <label htmlFor="patient-phone-field" className="block text-xs font-medium text-slate-300 mb-1">Mobile Number (10-digit Indian) *</label>
                    <input
                      id="patient-phone-field"
                      type="tel"
                      required
                      placeholder="9876543210"
                      value={patientPhone}
                      onChange={e => { setPatientPhone(e.target.value); if (phoneError) setPhoneError(''); }}
                      aria-label="Patient Phone Number"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-base sm:text-xs text-white focus:outline-none focus:border-cyan-400 min-h-[44px] sm:min-h-0"
                    />
                    <FieldError error={phoneError} />
                  </div>
                  <div>
                    <label htmlFor="visit-reason-field" className="block text-xs font-medium text-slate-300 mb-1">Reason for Visit *</label>
                    <textarea
                      id="visit-reason-field"
                      required
                      rows={2}
                      placeholder="e.g. Chronic knee pain, fever checkup, blood pressure review"
                      value={visitReason}
                      onChange={e => { setVisitReason(e.target.value); if (reasonError) setReasonError(''); }}
                      aria-label="Reason for medical visit"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-base sm:text-xs text-white focus:outline-none focus:border-cyan-400 min-h-[44px] sm:min-h-0"
                    />
                    <FieldError error={reasonError} />
                  </div>
                  <DemoFormNote />
                </form>
              )}

              {wizardStep === 4 && confirmedAppt && (
                <div className="space-y-5 text-center">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white">OPD Appointment Confirmed!</h4>
                    <p className="text-xs text-slate-300 mt-1">Your priority slot has been reserved. Please arrive 10 minutes prior to scheduled time.</p>
                  </div>
                  <div className="bg-slate-950 border border-cyan-500/40 rounded-2xl p-4">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-cyan-400">Booking Token</span>
                    <p className="text-2xl font-mono font-black text-white mt-0.5 tracking-wider">{confirmedAppt.token}</p>
                  </div>
                  <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-4 text-left text-xs space-y-2">
                    <div className="flex justify-between"><span className="text-slate-400">Doctor:</span><span className="text-white font-semibold">{confirmedAppt.doctorName} ({confirmedAppt.specialty})</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">Date & Slot:</span><span className="text-cyan-300 font-semibold">{formatDateDisplay(confirmedAppt.date)} at {confirmedAppt.slot}</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">Patient:</span><span className="text-white font-semibold">{confirmedAppt.patientName}</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">Consultation Fee:</span><span className="text-emerald-400 font-bold">{formatINR(confirmedAppt.fee)}</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">Location:</span><span className="text-slate-300">PulseCare Clinic, Jayanagar</span></div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <button
                      type="button"
                      onClick={handleDownloadCalendar}
                      aria-label="Add appointment to calendar"
                      className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-600 flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5 text-cyan-400" /> Add to Calendar (.ics)
                    </button>
                    <a
                      href={getWhatsAppUrl(`PulseCare Clinic Booking Summary:\nToken: ${confirmedAppt.token}\nDoctor: ${confirmedAppt.doctorName}\nDate: ${confirmedAppt.date} (${confirmedAppt.slot})\nPatient: ${confirmedAppt.patientName}\nFee: ₹${confirmedAppt.fee}`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Share appointment on WhatsApp"
                      className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      Share on WhatsApp
                    </a>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between">
              {wizardStep === 1 && (
                <>
                  <button type="button" onClick={() => setIsWizardOpen(false)} aria-label="Cancel booking" className="text-xs text-slate-400 hover:text-white">Cancel</button>
                  <button type="button" onClick={() => setWizardStep(2)} aria-label="Next step" className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1 transition-all">
                    Next: Choose Slot <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}
              {wizardStep === 2 && (
                <>
                  <button type="button" onClick={() => setWizardStep(1)} aria-label="Back to doctor selection" className="text-xs text-slate-400 hover:text-white flex items-center gap-1"><ArrowLeft className="w-3.5 h-3.5" /> Back</button>
                  <button
                    type="button"
                    disabled={!bookingSlot || isSunday(bookingDate)}
                    onClick={() => setWizardStep(3)}
                    aria-label="Next to patient details"
                    className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 font-bold text-xs flex items-center gap-1 transition-all"
                  >
                    Next: Patient Details <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}
              {wizardStep === 3 && (
                <>
                  <button type="button" onClick={() => setWizardStep(2)} aria-label="Back to slot selection" className="text-xs text-slate-400 hover:text-white flex items-center gap-1"><ArrowLeft className="w-3.5 h-3.5" /> Back</button>
                  <button type="submit" form="booking-patient-form" aria-label="Confirm booking" className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:brightness-110 text-white font-bold text-xs shadow-lg shadow-cyan-500/25 transition-all">
                    Confirm Booking
                  </button>
                </>
              )}
              {wizardStep === 4 && (
                <button type="button" onClick={() => setIsWizardOpen(false)} aria-label="Done and close dialog" className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all">
                  Done
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 7. Footer */}
      <footer className="mt-16 border-t border-slate-800 bg-slate-950 text-slate-400 text-xs py-10 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-cyan-400" />
              <span className="font-bold text-white text-base">PulseCare Multi-Specialty Clinic</span>
            </div>
            <p className="text-[11px] leading-relaxed text-slate-400">Comprehensive outpatient consultations, modern diagnostics, and round-the-clock emergency support.</p>
            <p className="text-[10px] text-slate-400 font-mono pt-1">Clinic Demo Created by Nexora Technologies</p>
          </div>
          <div className="space-y-2 text-[11px]">
            <p className="font-semibold text-white uppercase text-[10px] tracking-wider">Working Hours</p>
            <p className="text-slate-300 flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-cyan-400" /> Mon - Sat: 9:00 AM - 8:00 PM</p>
            <p className="text-slate-400">Sunday: Closed for routine OPD · 24/7 Trauma Care</p>
            <p className="text-slate-400 flex items-center gap-1.5 pt-1"><MapPin className="w-3.5 h-3.5 text-cyan-400" /> Medical Hub, 4th Block, Jayanagar, Bengaluru - 560011</p>
          </div>
          <div className="space-y-2 text-[11px]">
            <p className="font-semibold text-white uppercase text-[10px] tracking-wider">Emergency Notice</p>
            <p className="text-slate-300">For acute cardiac events, severe trauma, or life-threatening emergencies, please call <strong className="text-rose-400">108</strong> or visit our 24/7 trauma desk immediately.</p>
            <p className="text-[10px] text-slate-400 italic">Emergency Hotline: 1800-123-4567 | WhatsApp: +91 79 7597 6491</p>
          </div>
        </div>
      </footer>

      {/* Shared Mobile Bottom Action Bar (Phone only: < 768px) */}
      <DemoMobileBottomBar
        primaryAction={{
          label: 'Book Appointment',
          onClick: () => { setWizardStep(1); setIsWizardOpen(true); },
          icon: CalendarIcon,
          accentColorClass: 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:brightness-110 text-white font-bold shadow-cyan-500/25'
        }}
        secondaryAction={{
          label: 'Emergency',
          href: 'tel:18001234567',
          icon: PhoneCall,
          accentColorClass: 'border-rose-500/30 text-rose-300 bg-rose-500/10'
        }}
      />
    </div>
  );
};
