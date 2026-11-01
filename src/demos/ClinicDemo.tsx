import React, { useState } from 'react';
import { 
  Stethoscope, 
  PhoneCall, 
  Calendar, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  ShieldCheck, 
  UserCheck, 
  Sparkles,
  Award
} from 'lucide-react';
import { getWhatsAppUrl } from '../utils/whatsapp';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  qualifications: string;
  availability: string;
  image: string;
}

const DOCTORS: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Wendy Yonas, MD',
    specialty: 'Internal Medicine & Cardiology',
    experience: '16+ Years Experience',
    qualifications: 'MBBS, MD (Gold Medalist), FACC',
    availability: 'Mon - Fri (10 AM - 4 PM)',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: '2',
    name: 'Dr. Indra Miracle, MS',
    specialty: 'Orthopedics & Joint Replacement',
    experience: '14+ Years Experience',
    qualifications: 'MBBS, MS (Ortho), Fellowship UK',
    availability: 'Mon - Sat (2 PM - 8 PM)',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: '3',
    name: 'Dr. Sarah Chen, MD',
    specialty: 'Pediatrics & Child Wellness',
    experience: '12+ Years Experience',
    qualifications: 'MBBS, DCH, DNB (Pediatrics)',
    availability: 'Daily (9 AM - 2 PM)',
    image: 'https://images.unsplash.com/photo-1594824813583-e18e38520ec7?auto=format&fit=crop&w=600&q=80'
  }
];

export const ClinicDemo: React.FC<{ onOrderThisWebsite?: () => void }> = ({ onOrderThisWebsite }) => {
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(DOCTORS[0].name);
  const [appointmentDate, setAppointmentDate] = useState('2026-11-04');
  const [department, setDepartment] = useState('General Consultation');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName || !patientPhone) return;
    setIsSubmitted(true);
  };

  const handleEmergencyCall = () => {
    window.location.href = 'tel:+918001234567';
  };

  const handleWhatsAppEnquiry = () => {
    window.open(getWhatsAppUrl('Hello PulseCare Clinic! I would like to book an appointment for consultation.'), '_blank');
  };

  return (
    <div className="bg-slate-900 text-slate-100 font-sans min-h-screen selection:bg-cyan-500 selection:text-white">
      {/* Top Emergency bar */}
      <div className="bg-gradient-to-r from-blue-900/60 via-cyan-900/40 to-slate-900 border-b border-cyan-800/30 px-6 py-2.5 text-xs flex flex-wrap justify-between items-center text-cyan-200">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 font-semibold text-cyan-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            24/7 Emergency & Trauma Care Available
          </span>
          <span className="hidden md:inline text-slate-400">|</span>
          <span className="hidden md:flex items-center gap-1 text-slate-300">
            <MapPin className="w-3.5 h-3.5 text-cyan-400" />
            Medical Hub, 4th Block, Jayanagar, Bengaluru
          </span>
        </div>
        <div className="flex items-center gap-3">
          {onOrderThisWebsite && (
            <button 
              onClick={onOrderThisWebsite}
              className="text-cyan-400 hover:text-cyan-300 font-semibold underline text-xs hidden sm:block"
            >
              Order Clinic Website Design →
            </button>
          )}
          <button 
            onClick={handleEmergencyCall}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-rose-600/30 text-rose-300 border border-rose-500/30 font-semibold text-[11px] hover:bg-rose-600/40"
          >
            <PhoneCall className="w-3 h-3" />
            Emergency: 1800-123-4567
          </button>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="bg-slate-950/80 backdrop-blur-md border-b border-slate-800 px-6 py-4 sticky top-0 z-20 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20">
            <Stethoscope className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-lg tracking-tight text-white flex items-center gap-1">
              PulseCare <span className="text-cyan-400 text-xs font-normal border border-cyan-500/30 px-1.5 py-0.5 rounded">CLINIC</span>
            </span>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-6 text-sm text-slate-300">
          <a href="#about" className="hover:text-cyan-400 transition-colors">About Us</a>
          <a href="#services" className="hover:text-cyan-400 transition-colors">Specialties</a>
          <a href="#doctors" className="hover:text-cyan-400 transition-colors">Doctors</a>
          <a href="#timing" className="hover:text-cyan-400 transition-colors">OPD Timings</a>
          <a href="#appointment" className="hover:text-cyan-400 transition-colors">Book Slot</a>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleWhatsAppEnquiry}
            className="text-xs px-3 py-2 rounded-lg bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-600/30 font-semibold hidden sm:flex items-center gap-1.5"
          >
            WhatsApp Help
          </button>
          <a 
            href="#appointment"
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-xs hover:brightness-110 transition-all shadow-lg shadow-cyan-500/25"
          >
            Book Appointment
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-12 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-900 to-slate-950 -z-10" />
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-medium mb-5">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>NABH Accredited Multi-Specialty Clinic & Diagnostics</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight mb-5 tracking-tight">
              We Are A Full Service Clinic With <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Modern Technology</span>
            </h1>
            <p className="text-slate-300 text-base leading-relaxed mb-6 max-w-xl">
              From advanced cardiac screening to pediatric care, our board-certified medical specialists ensure compassionate treatment with minimal wait times.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-8">
              <a 
                href="#appointment"
                className="px-6 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition-all shadow-xl shadow-cyan-500/20"
              >
                Book Appointment →
              </a>
              <button 
                onClick={handleEmergencyCall}
                className="px-6 py-3.5 rounded-xl border border-slate-700 bg-slate-800/60 hover:bg-slate-800 text-slate-200 font-semibold text-sm transition-all flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-cyan-400" />
                <span>Emergency: (080) 4920 1100</span>
              </button>
            </div>

            {/* Quick stats pills */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-slate-800/80">
              <div className="bg-slate-800/40 border border-slate-700/60 rounded-xl p-3">
                <p className="text-xl font-bold text-cyan-400">18,500+</p>
                <p className="text-[11px] text-slate-400">Treated Patients</p>
              </div>
              <div className="bg-slate-800/40 border border-slate-700/60 rounded-xl p-3">
                <p className="text-xl font-bold text-blue-400">15 Min</p>
                <p className="text-[11px] text-slate-400">Avg. Waiting Time</p>
              </div>
              <div className="bg-slate-800/40 border border-slate-700/60 rounded-xl p-3">
                <p className="text-xl font-bold text-emerald-400">4.9 / 5</p>
                <p className="text-[11px] text-slate-400">Patient Satisfaction</p>
              </div>
            </div>
          </div>

          {/* Right Hero Image Card with doctor */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl relative bg-slate-800/50">
              <img 
                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=700&q=80" 
                alt="Doctor with clipboard" 
                className="w-full h-[380px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md border border-slate-700 p-4 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-cyan-300 font-semibold">Opening Hours</p>
                    <p className="text-xs text-slate-200">Monday - Saturday: 8:00 AM - 8:30 PM</p>
                    <p className="text-[11px] text-slate-400">Sunday: 9:00 AM - 1:30 PM (Emergency 24x7)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </header>

      {/* Doctors Section */}
      <section id="doctors" className="py-16 px-6 max-w-6xl mx-auto border-t border-slate-800">
        <div className="text-center mb-12">
          <span className="text-cyan-400 text-xs uppercase tracking-widest font-semibold">Medical Staff</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">Expert Doctors & Specialists</h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-2 max-w-lg mx-auto">
            Book consultations directly with experienced specialists with verified clinical records.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {DOCTORS.map(doc => (
            <div 
              key={doc.id}
              className="bg-slate-800/40 border border-slate-700/80 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-all flex flex-col justify-between"
            >
              <div>
                <img 
                  src={doc.image} 
                  alt={doc.name} 
                  className="w-full h-52 object-cover object-top"
                />
                <div className="p-5">
                  <span className="text-[11px] font-semibold text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
                    {doc.specialty}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-2">{doc.name}</h3>
                  <p className="text-xs text-slate-300 mt-1">{doc.qualifications}</p>
                  <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    {doc.experience}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-2 flex items-center gap-1.5 pt-2 border-t border-slate-700/50">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    {doc.availability}
                  </p>
                </div>
              </div>
              <div className="p-5 pt-0">
                <a 
                  href="#appointment"
                  onClick={() => setSelectedDoctor(doc.name)}
                  className="w-full py-2.5 rounded-xl bg-slate-700/60 hover:bg-cyan-500 hover:text-slate-950 text-cyan-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  Select for Appointment
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Appointment Booking Section */}
      <section id="appointment" className="py-16 px-6 max-w-4xl mx-auto border-t border-slate-800">
        <div className="bg-slate-800/60 border border-slate-700 rounded-3xl p-6 sm:p-10 shadow-2xl relative">
          <div className="text-center mb-8">
            <span className="text-cyan-400 text-xs uppercase tracking-widest font-semibold">Priority OPD</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">Book An Appointment Online</h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1">
              Confirm your doctor consultation without waiting in crowded clinic queues.
            </p>
          </div>

          {isSubmitted ? (
            <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-2xl p-8 text-center text-emerald-200">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
              <h3 className="text-xl font-bold text-white mb-1">Appointment Slot Requested!</h3>
              <p className="text-xs text-slate-300 max-w-md mx-auto mb-4">
                Thank you {patientName}. Your appointment with <strong>{selectedDoctor}</strong> for <strong>{department}</strong> on {appointmentDate} is received. Our clinic desk will send an SMS to {patientPhone}.
              </p>
              <button 
                onClick={() => setIsSubmitted(false)}
                className="text-xs text-cyan-400 underline font-semibold"
              >
                Book another appointment
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Full Name *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Ramesh Kumar"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Phone Number *</label>
                  <input 
                    type="tel" 
                    required
                    placeholder="+91 98765 43210"
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Select Doctor</label>
                  <select 
                    value={selectedDoctor}
                    onChange={(e) => setSelectedDoctor(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-3 text-xs text-white focus:outline-none focus:border-cyan-500"
                  >
                    {DOCTORS.map(d => (
                      <option key={d.id} value={d.name}>{d.name} ({d.specialty.split(' ')[0]})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Department</label>
                  <select 
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-3 text-xs text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="General Consultation">General Consultation</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Orthopedics">Orthopedics</option>
                    <option value="Pediatrics">Pediatrics</option>
                    <option value="Diagnostic Blood Test">Diagnostic Blood Test</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Preferred Date</label>
                  <input 
                    type="date"
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-3 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-sm tracking-wide hover:brightness-110 transition-all shadow-xl shadow-cyan-500/20 mt-3"
              >
                Send Appointment Request
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-800 bg-slate-950 text-center text-xs text-slate-400">
        <p className="font-bold text-white mb-1">PulseCare Multi-Specialty Clinic & Diagnostics</p>
        <p className="text-[11px]">Emergency Hotline: (080) 4920 1100 • WhatsApp: +91 98765 43210</p>
        <p className="text-[10px] text-slate-400 mt-2">Clinic Website Demo Developed by Nexora Technologies</p>
      </footer>
    </div>
  );
};
