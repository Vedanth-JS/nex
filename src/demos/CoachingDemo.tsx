import React, { useState } from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  Phone, 
  Users, 
  Award, 
  FileText, 
  CheckCircle2, 
  Sparkles, 
  Download,
  Calendar
} from 'lucide-react';
import { getWhatsAppUrl } from '../utils/whatsapp';

interface Course {
  id: string;
  title: string;
  batch: string;
  duration: string;
  fee: string;
  seatsLeft: number;
  features: string[];
  badge?: string;
}

const COURSES: Course[] = [
  {
    id: '1',
    title: 'UPSC Civil Services Foundation 2027',
    batch: 'Batch Starts Nov 15',
    duration: '14 Months Comprehensive',
    fee: '₹48,000',
    seatsLeft: 8,
    badge: 'Flagship Program',
    features: ['GS Paper 1 to 4 + CSAT', 'Daily Answer Writing Evaluation', '1-on-1 Retired IAS Mentorship', 'Complete Printed Study Material']
  },
  {
    id: '2',
    title: 'NEET Super-50 Droppers Intensive',
    batch: 'Morning & Evening Batches',
    duration: '9 Months Intensive',
    fee: '₹36,000',
    seatsLeft: 5,
    badge: 'High Selection Rate',
    features: ['NCERT-Line-By-Line Mastery', 'Weekly All-India Mock Tests', 'Personalized Doubt Counters', 'AIIMS Faculty Seminars']
  },
  {
    id: '3',
    title: 'KPSC Gazetted Probationary (KAS)',
    batch: 'Weekend Hybrid Batch',
    duration: '8 Months Weekend',
    fee: '₹28,000',
    seatsLeft: 12,
    features: ['Karnataka Specific Syllabus Focus', 'Kannada & English Medium Batches', 'Previous 10-Yr Papers Analysis', 'Interview Guidance Program']
  }
];

export const CoachingDemo: React.FC<{ onOrderThisWebsite?: () => void }> = ({ onOrderThisWebsite }) => {
  const [studentName, setStudentName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(COURSES[0].title);
  const [educationLevel, setEducationLevel] = useState('College Graduate');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName || !phone) return;
    setIsSubmitted(true);
  };

  const handleDownloadSyllabus = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 4000);
  };

  const handleWhatsAppCounseling = () => {
    window.open(getWhatsAppUrl(`Hello Apex Academy! I'm interested in admissions counseling for ${selectedCourse}. Please share brochure.`), '_blank');
  };

  return (
    <div className="bg-[#0b0b18] text-slate-100 font-sans min-h-screen selection:bg-purple-600 selection:text-white">
      {/* Top Banner */}
      <div className="bg-purple-950/60 border-b border-purple-800/40 px-6 py-2.5 text-xs flex justify-between items-center text-purple-200">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>Demo preview: High-converting Coaching & EdTech portal by Nexora Technologies</span>
        </div>
        {onOrderThisWebsite && (
          <button 
            onClick={onOrderThisWebsite}
            className="text-purple-300 hover:text-white font-semibold underline text-xs hidden sm:block"
          >
            Order Educational Website Design →
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="bg-[#0c0d1c]/90 backdrop-blur-md border-b border-purple-900/30 px-6 py-4 sticky top-0 z-20 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-purple-600/30 font-bold">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <span className="font-extrabold text-lg text-white tracking-tight">DREAM<span className="text-purple-400">IAS</span></span>
            <span className="block text-[10px] text-purple-300 tracking-wider uppercase font-semibold">Apex Career Institute</span>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-8 text-xs font-semibold text-slate-300">
          <a href="#courses" className="hover:text-purple-400 transition-colors">Courses & Fees</a>
          <a href="#results" className="hover:text-purple-400 transition-colors">Toppers</a>
          <a href="#faculty" className="hover:text-purple-400 transition-colors">Mentors</a>
          <a href="#admission" className="hover:text-purple-400 transition-colors">Admission Enquiry</a>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={handleWhatsAppCounseling}
            className="text-xs px-3 py-2 rounded-lg bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-600/30 font-semibold hidden sm:flex items-center gap-1.5"
          >
            WhatsApp Counselor
          </button>
          <a 
            href="#admission"
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs hover:brightness-110 transition-all shadow-lg shadow-purple-600/30"
          >
            Request a Call
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-16 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-purple-950/40 via-[#0b0b18] to-[#0b0b18] -z-10" />
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/40 border border-purple-600/40 text-purple-300 text-xs font-semibold mb-6">
              <Award className="w-3.5 h-3.5 text-purple-400" />
              <span>India’s Leading Academy for Competitive Exams</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-6">
              Join India’s Best Coaching for <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-300">IAS & NEET Exams.</span>
            </h1>
            <p className="text-slate-300 text-base leading-relaxed mb-8 max-w-xl">
              Learn directly from retired civil servants and top rankers. Structured curriculum, personalized daily answer feedback, and interactive live doubt-clearing sessions.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-8">
              <a 
                href="#admission"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-sm hover:brightness-110 transition-all shadow-xl shadow-purple-600/30 flex items-center gap-2"
              >
                <span>Start Learning</span>
                <span>→</span>
              </a>
              <button 
                onClick={handleDownloadSyllabus}
                className="px-6 py-3.5 rounded-xl border border-purple-800/60 bg-purple-950/30 text-purple-200 hover:bg-purple-900/40 font-semibold text-sm transition-all flex items-center gap-2"
              >
                <Download className="w-4 h-4 text-purple-400" />
                <span>Download 2026-27 Syllabus</span>
              </button>
            </div>

            {downloadSuccess && (
              <div className="p-3 mb-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Complete Examination Syllabus PDF downloaded successfully!</span>
              </div>
            )}

            <div className="flex items-center gap-6 pt-6 border-t border-purple-900/40 text-xs text-slate-300">
              <div>
                <span className="block text-xl font-bold text-white">450+</span>
                <span className="text-purple-300">Selections in UPSC</span>
              </div>
              <div className="h-8 w-px bg-purple-900/60" />
              <div>
                <span className="block text-xl font-bold text-white">1,800+</span>
                <span className="text-purple-300">NEET MBBS Qualifiers</span>
              </div>
              <div className="h-8 w-px bg-purple-900/60" />
              <div>
                <span className="block text-xl font-bold text-white">14+</span>
                <span className="text-purple-300">Years of Mentorship</span>
              </div>
            </div>
          </div>

          {/* Right Hero Student Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto rounded-3xl overflow-hidden border border-purple-500/30 shadow-2xl shadow-purple-900/30 bg-[#12122b]">
              <img 
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=700&q=80" 
                alt="Student smiling with study folder"
                className="w-full h-[400px] object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b18] via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 bg-purple-950/90 backdrop-blur-md border border-purple-700/50 p-4 rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center font-bold text-white text-sm">
                    AIR 12
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Ananya Deshmukh, IAS</p>
                    <p className="text-[11px] text-purple-300">Classroom Batch • UPSC CSE 2025</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </header>

      {/* Courses Grid */}
      <section id="courses" className="py-16 px-6 max-w-6xl mx-auto border-t border-purple-900/40">
        <div className="text-center mb-12">
          <span className="text-purple-400 text-xs uppercase tracking-widest font-semibold">Academic Programs</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Upcoming Batches & Fee Structure</h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-2 max-w-lg mx-auto">
            Early bird registration discounts available for limited seats.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {COURSES.map(course => (
            <div 
              key={course.id}
              className="bg-[#12122a] border border-purple-900/50 rounded-2xl p-6 hover:border-purple-500/60 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-purple-900/60 text-purple-300 border border-purple-700/50">
                    {course.batch}
                  </span>
                  {course.badge && (
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      {course.badge}
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{course.title}</h3>
                <p className="text-xs text-purple-300 mb-4">{course.duration}</p>
                <div className="mb-4 pb-4 border-b border-purple-900/40">
                  <span className="text-2xl font-black text-white">{course.fee}</span>
                  <span className="text-xs text-slate-400 ml-1.5">all-inclusive</span>
                </div>
                <ul className="space-y-2 mb-6">
                  {course.features.map((f, i) => (
                    <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <a 
                  href="#admission"
                  onClick={() => setSelectedCourse(course.title)}
                  className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-lg shadow-purple-600/25"
                >
                  Apply For Batch ({course.seatsLeft} Seats Left)
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Admission Enquiry Form */}
      <section id="admission" className="py-16 px-6 max-w-4xl mx-auto border-t border-purple-900/40">
        <div className="bg-[#12122c] border border-purple-700/40 rounded-3xl p-6 sm:p-10 shadow-2xl">
          <div className="text-center mb-8">
            <span className="text-purple-400 text-xs uppercase tracking-widest font-semibold">Counselling & Seat Booking</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Book Free Mentorship Session</h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1">
              Speak with our senior academic counselor to plan your preparation roadmap.
            </p>
          </div>

          {isSubmitted ? (
            <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-2xl p-8 text-center text-emerald-200">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
              <h3 className="text-xl font-bold text-white mb-1">Enquiry Successfully Submitted!</h3>
              <p className="text-xs text-slate-300 max-w-md mx-auto mb-4">
                Thank you, {studentName}. Our senior academic mentor will call you at {phone} within 2 business hours regarding {selectedCourse}.
              </p>
              <button 
                onClick={() => setIsSubmitted(false)}
                className="text-xs text-purple-400 underline font-semibold"
              >
                Submit another request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Student Name *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Priya Sharma"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="w-full bg-[#181838] border border-purple-900 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-purple-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Phone Number *</label>
                  <input 
                    type="tel" 
                    required
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#181838] border border-purple-900 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-purple-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Select Target Program</label>
                  <select 
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    className="w-full bg-[#181838] border border-purple-900 rounded-xl px-3 py-3 text-xs text-white focus:outline-none focus:border-purple-400"
                  >
                    {COURSES.map(c => (
                      <option key={c.id} value={c.title}>{c.title}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Current Education</label>
                  <select 
                    value={educationLevel}
                    onChange={(e) => setEducationLevel(e.target.value)}
                    className="w-full bg-[#181838] border border-purple-900 rounded-xl px-3 py-3 text-xs text-white focus:outline-none focus:border-purple-400"
                  >
                    <option value="Class 11 / 12">Class 11 / 12</option>
                    <option value="College Graduate">College Graduate</option>
                    <option value="Working Professional">Working Professional</option>
                  </select>
                </div>
              </div>

              <button 
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-sm tracking-wide hover:brightness-110 transition-all shadow-xl shadow-purple-600/30 mt-3"
              >
                Schedule Free Counseling Call
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-purple-950 bg-[#070712] text-center text-xs text-slate-400">
        <p className="font-bold text-white mb-1">DREAMIAS & APEX CAREER ACADEMY</p>
        <p className="text-[11px]">Vijayanagar Main Road, Near Metro Station, Bengaluru</p>
        <p className="text-[10px] text-slate-400 mt-2">Education Demo Website Designed & Developed by Nexora Technologies</p>
      </footer>
    </div>
  );
};
