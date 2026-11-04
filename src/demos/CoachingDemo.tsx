import React, { useState, useEffect, useRef } from 'react';
import { 
  GraduationCap, 
  Award, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Users, 
  ShieldCheck, 
  HelpCircle, 
  Calculator, 
  ArrowRight, 
  RotateCcw, 
  Sparkles, 
  ArrowLeft,
  PhoneCall
} from 'lucide-react';
import { 
  formatINR, 
  isValidPhone, 
  todayStr, 
  addDays,
  useToast, 
  useCountdown,
  useDemoState,
  DemoBadge, 
  ToastContainer, 
  WhatsAppButton, 
  SkeletonImage, 
  DemoFormNote, 
  FieldError, 
  EmptyState, 
  AccordionItem 
} from './shared';

// --- DATA DEFINITIONS ---

interface Course {
  id: string;
  title: string;
  exam: 'UPSC' | 'NEET' | 'KPSC';
  mode: 'Online' | 'Offline' | 'Hybrid';
  duration: string;
  durationMonths: number;
  fee: number;
  badge?: string;
  batch: string;
  timings: string[];
  syllabus: { subject: string; topics: string[] }[];
}

const COURSES: Course[] = [
  { 
    id: '1', 
    title: 'UPSC Civil Services 2027', 
    exam: 'UPSC', 
    mode: 'Offline', 
    duration: '14M', 
    durationMonths: 14,
    fee: 48000, 
    badge: 'Flagship', 
    batch: 'Nov 15 Batch', 
    timings: ['Morning 6-9 AM', 'Evening 6-9 PM'],
    syllabus: [
      { subject: 'GS 1: History & Heritage', topics: ['Ancient & Medieval India', 'Modern Freedom Movement', 'Indian Art & Culture'] },
      { subject: 'GS 2: Polity & Governance', topics: ['Constitution & Rights', 'Parliament & Judiciary', 'Governance & Public Schemes'] },
      { subject: 'GS 3: Economy & Science', topics: ['Macroeconomics', 'Environment & Biodiversity', 'Defense & Space Tech'] },
    ]
  },
  { 
    id: '2', 
    title: 'NEET Super-50 Intensive', 
    exam: 'NEET', 
    mode: 'Online', 
    duration: '9M', 
    durationMonths: 9,
    fee: 36000, 
    badge: 'Popular', 
    batch: 'Rolling Admissions', 
    timings: ['Morning 7-11 AM', 'Weekend 8AM-2PM'],
    syllabus: [
      { subject: 'Physics Core', topics: ['Kinematics & Dynamics', 'Thermodynamics & Waves', 'Electrostatics & Modern Physics'] },
      { subject: 'Chemistry Core', topics: ['Organic Mechanisms', 'Physical Equilibrium', 'Coordination Compounds'] },
      { subject: 'Biology Special', topics: ['Genetics & Evolution', 'Human Physiology', 'Cell Biology & Plant Ecology'] },
    ]
  },
  { 
    id: '3', 
    title: 'KPSC Gazetted Probationary', 
    exam: 'KPSC', 
    mode: 'Hybrid', 
    duration: '8M', 
    durationMonths: 8,
    fee: 28000, 
    badge: 'State Focus',
    batch: 'Weekend Batch', 
    timings: ['Sat-Sun 8AM-2PM'],
    syllabus: [
      { subject: 'Karnataka Heritage', topics: ['Chalukya & Mysore Dynasties', 'Karnataka Freedom Struggle', 'State Cultural Assets'] },
      { subject: 'General Studies Paper', topics: ['Indian & State Polity', 'Karnataka Economic Geography', 'Rural Governance Schemes'] },
      { subject: 'Mental Ability & CSAT', topics: ['Quantitative Aptitude', 'Logical Reasoning', 'Administrative Decision Making'] },
    ]
  },
];

interface QuizItem {
  q: string;
  opts: string[];
  ans: number;
  topic: string;
}

const QUIZ: QuizItem[] = [
  { q: 'Which planet is called the Red Planet? (Sample)', opts: ['Venus', 'Mars', 'Saturn', 'Jupiter'], ans: 1, topic: 'Science & Tech' },
  { q: 'How many members in Rajya Sabha (max)? (Sample)', opts: ['250', '245', '252', '260'], ans: 0, topic: 'Polity & Governance' },
  { q: 'The SI unit of electric current is? (Sample)', opts: ['Volt', 'Watt', 'Ampere', 'Ohm'], ans: 2, topic: 'Science & Tech' },
  { q: 'Which gas do plants absorb during photosynthesis? (Sample)', opts: ['O2', 'N2', 'CO2', 'H2'], ans: 2, topic: 'Science & Tech' },
  { q: 'Where is the Headquarters of ISRO? (Sample)', opts: ['Mumbai', 'Delhi', 'Bengaluru', 'Chennai'], ans: 2, topic: 'Science & Tech' },
  { q: 'Who wrote "Discovery of India"? (Sample)', opts: ['Gandhi', 'Nehru', 'Ambedkar', 'Tagore'], ans: 1, topic: 'History & Culture' },
  { q: 'The chemical formula of water is? (Sample)', opts: ['H2O', 'HO', 'H2O2', 'OH'], ans: 0, topic: 'Science & Tech' },
  { q: 'Which year did India become Republic? (Sample)', opts: ['1947', '1948', '1950', '1952'], ans: 2, topic: 'History & Culture' },
  { q: 'The largest ocean on Earth is? (Sample)', opts: ['Atlantic', 'Arctic', 'Indian', 'Pacific'], ans: 3, topic: 'Geography' },
  { q: 'Normal human body temperature (°F)? (Sample)', opts: ['98.6', '96.8', '100.4', '97.5'], ans: 0, topic: 'Science & Tech' },
];

const FACULTY = [
  { 
    name: 'Mr. Rajesh K. (Sample)', 
    sub: 'History & Polity', 
    yrs: '8 Yrs Teaching',
    bio: 'Ex-Civil Services Aspirant, special focus on Indian Constitution and Modern History.'
  },
  { 
    name: 'Ms. Priya S. (Sample)', 
    sub: 'Science & Technology', 
    yrs: '6 Yrs Teaching',
    bio: 'M.Sc Gold Medalist, mentoring NEET toppers in physical chemistry and medical biology.'
  },
  { 
    name: 'Mr. Arun M. (Sample)', 
    sub: 'Mathematics & Reasoning', 
    yrs: '10 Yrs Teaching',
    bio: 'Author of CSAT Quantitative manuals, guided 5,000+ candidates in analytical reasoning.'
  },
];

const SAMPLE_RESULTS = [
  { rank: 'AIR 12 (Sample)', exam: 'UPSC CSE 2025', name: 'Ananya Deshmukh', program: 'Classroom Foundation' },
  { rank: 'AIR 34 (Sample)', exam: 'NEET UG 2025', name: 'Rohan Verma', program: 'Super-50 Intensive' },
  { rank: 'Rank 4 (Sample)', exam: 'KPSC KAS 2024', name: 'Sneha Patil', program: 'Weekend Hybrid' },
  { rank: 'AIR 108 (Sample)', exam: 'UPSC CSE 2024', name: 'Karthik Iyer', program: 'Prelims Test Series' },
];

// --- MOCK TEST RUNNER SUBCOMPONENT ---

const MockTestRunner: React.FC<{
  onFinish: (answers: Record<number, number>) => void;
  onExit: () => void;
}> = ({ onFinish, onExit }) => {
  const [currQ, setCurrQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const { remaining } = useCountdown(600); // 10 minutes timed
  const answersRef = useRef(answers);
  useEffect(() => {
    answersRef.current = answers;
  }, [answers]);

  useEffect(() => {
    if (remaining === 0) {
      onFinish(answersRef.current);
    }
  }, [remaining, onFinish]);

  const mins = Math.floor(remaining / 60);
  const secs = remaining % 60;
  const timeFormatted = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  const isUrgent = remaining < 60;

  const qData = QUIZ[currQ];
  const selectedOption = answers[currQ];
  const answeredCount = Object.keys(answers).length;

  const handleSelectOption = (idx: number) => {
    setAnswers(prev => ({ ...prev, [currQ]: idx }));
  };

  return (
    <div className="bg-[#12122c] border border-purple-800/40 rounded-3xl p-6 sm:p-8 shadow-2xl">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-purple-900/40">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-wider text-purple-400 font-bold block">
            General Studies Mock Assessment
          </span>
          <span className="text-xs text-amber-400 font-medium">
            Sample Demo Questions Only — Not for actual exam prep
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono font-bold ${
            isUrgent ? 'bg-rose-950/80 border-rose-500/60 text-rose-300 animate-pulse' : 'bg-purple-950/80 border-purple-600/40 text-purple-200'
          }`}>
            <Clock className="w-3.5 h-3.5" />
            <span>Time Left: {timeFormatted}</span>
          </div>
          <button
            onClick={onExit}
            className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-white/5"
          >
            Quit
          </button>
        </div>
      </div>

      {/* Progress */}
      <div className="mt-4 mb-6">
        <div className="flex justify-between text-xs text-slate-300 mb-1.5">
          <span>Question {currQ + 1} of {QUIZ.length}</span>
          <span>{answeredCount} of {QUIZ.length} Answered</span>
        </div>
        <div className="w-full h-2 rounded-full bg-purple-950 border border-purple-900/60 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-purple-500 to-violet-400 transition-all duration-300"
            style={{ width: `${((currQ + 1) / QUIZ.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="mb-6">
        <div className="inline-block px-2.5 py-0.5 rounded text-[10px] uppercase font-bold bg-purple-900/60 text-purple-300 border border-purple-700/50 mb-3">
          {qData.topic}
        </div>
        <h3 className="text-base sm:text-lg font-bold text-white leading-relaxed">
          {currQ + 1}. {qData.q}
        </h3>
      </div>

      {/* Options */}
      <div className="space-y-3 mb-8">
        {qData.opts.map((opt, idx) => {
          const isSelected = selectedOption === idx;
          return (
            <label
              key={idx}
              onClick={() => handleSelectOption(idx)}
              className={`flex items-center gap-3.5 p-3.5 rounded-xl border cursor-pointer transition-all ${
                isSelected 
                  ? 'bg-purple-600/25 border-purple-500 text-white shadow-lg shadow-purple-900/30' 
                  : 'bg-[#181838] border-purple-900/40 text-slate-300 hover:border-purple-700/60 hover:bg-[#1e1e44]'
              }`}
            >
              <input
                type="radio"
                name={`question-${currQ}`}
                checked={isSelected}
                onChange={() => handleSelectOption(idx)}
                className="w-4 h-4 accent-purple-500"
              />
              <span className="text-xs sm:text-sm font-medium">{opt}</span>
            </label>
          );
        })}
      </div>

      {/* Question navigation grid */}
      <div className="flex flex-wrap gap-2 mb-6 pt-4 border-t border-purple-900/30">
        {QUIZ.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrQ(idx)}
            className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
              currQ === idx 
                ? 'bg-purple-500 text-white ring-2 ring-purple-300' 
                : answers[idx] !== undefined 
                  ? 'bg-emerald-950/80 border border-emerald-500/50 text-emerald-300' 
                  : 'bg-white/5 text-slate-400 hover:bg-white/10'
            }`}
          >
            {idx + 1}
          </button>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() => setCurrQ(q => Math.max(0, q - 1))}
          disabled={currQ === 0}
          className="px-4 py-2.5 rounded-xl border border-purple-900/60 text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 disabled:opacity-30 disabled:pointer-events-none"
        >
          Previous
        </button>
        
        {currQ < QUIZ.length - 1 ? (
          <button
            onClick={() => setCurrQ(q => Math.min(QUIZ.length - 1, q + 1))}
            className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-bold text-white transition-all shadow-lg shadow-purple-600/30"
          >
            Next Question →
          </button>
        ) : (
          <button
            onClick={() => onFinish(answers)}
            className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white transition-all shadow-lg shadow-emerald-700/30"
          >
            Submit Test ({answeredCount}/{QUIZ.length})
          </button>
        )}
      </div>
    </div>
  );
};

// --- MOCK TEST REVIEW SUBCOMPONENT ---

const MockTestReview: React.FC<{
  answers: Record<number, number>;
  onRetake: () => void;
  onBookCounselling: () => void;
}> = ({ answers, onRetake, onBookCounselling }) => {
  let score = 0;
  const topicStats: Record<string, { total: number; correct: number }> = {};

  QUIZ.forEach((q, idx) => {
    if (!topicStats[q.topic]) {
      topicStats[q.topic] = { total: 0, correct: 0 };
    }
    topicStats[q.topic].total += 1;
    if (answers[idx] === q.ans) {
      score += 1;
      topicStats[q.topic].correct += 1;
    }
  });

  const percentage = Math.round((score / QUIZ.length) * 100);

  return (
    <div className="bg-[#12122c] border border-purple-800/40 rounded-3xl p-6 sm:p-8 shadow-2xl">
      {/* Top Banner */}
      <div className="text-center pb-6 border-b border-purple-900/40">
        <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-amber-300 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full mb-3">
          Sample Demo Questions Only — Not for actual exam prep
        </span>
        <h3 className="text-2xl font-black text-white">Diagnostic Scorecard</h3>
        <p className="text-xs text-slate-400 mt-1">Instant performance analysis and syllabus readiness review</p>
        
        <div className="mt-6 flex flex-wrap justify-center items-center gap-6">
          <div className="text-center px-6 py-4 rounded-2xl bg-purple-950/60 border border-purple-700/40">
            <span className="text-3xl font-black text-white">{score} / {QUIZ.length}</span>
            <span className="block text-[11px] text-purple-300 mt-0.5">Overall Score</span>
          </div>
          <div className="text-center px-6 py-4 rounded-2xl bg-purple-950/60 border border-purple-700/40">
            <span className="text-3xl font-black text-purple-300">{percentage}%</span>
            <span className="block text-[11px] text-purple-300 mt-0.5">Accuracy Rate</span>
          </div>
        </div>
      </div>

      {/* Topic-wise Breakdown */}
      <div className="my-8">
        <h4 className="text-xs uppercase tracking-wider text-purple-300 font-bold mb-4">Topic Performance Breakdown</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {Object.entries(topicStats).map(([topic, stats]) => (
            <div key={topic} className="p-3.5 rounded-xl bg-[#181838] border border-purple-900/40">
              <div className="flex justify-between text-xs font-semibold text-white mb-1">
                <span>{topic}</span>
                <span className="text-purple-300">{stats.correct}/{stats.total}</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-purple-950 overflow-hidden">
                <div 
                  className="h-full bg-purple-500" 
                  style={{ width: `${(stats.correct / stats.total) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Question review list */}
      <div className="space-y-4 mb-8">
        <h4 className="text-xs uppercase tracking-wider text-purple-300 font-bold">Answer Review</h4>
        {QUIZ.map((q, idx) => {
          const userChoice = answers[idx];
          const isCorrect = userChoice === q.ans;
          return (
            <div 
              key={idx}
              className={`p-4 rounded-2xl border ${
                isCorrect ? 'bg-emerald-950/20 border-emerald-500/30' : 'bg-rose-950/20 border-rose-500/30'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <span className="text-xs sm:text-sm font-semibold text-white">
                  {idx + 1}. {q.q}
                </span>
                {isCorrect ? (
                  <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30 shrink-0">
                    <CheckCircle2 className="w-3 h-3" /> Correct
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-[11px] font-bold text-rose-400 bg-rose-950/60 px-2 py-0.5 rounded border border-rose-500/30 shrink-0">
                    <XCircle className="w-3 h-3" /> Incorrect
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                {q.opts.map((opt, optIdx) => {
                  const isAnswer = optIdx === q.ans;
                  const isUserSelection = optIdx === userChoice;
                  return (
                    <div 
                      key={optIdx}
                      className={`px-3 py-2 rounded-xl text-xs flex items-center justify-between border ${
                        isAnswer 
                          ? 'bg-emerald-950/80 border-emerald-500/60 text-emerald-200 font-semibold' 
                          : isUserSelection 
                            ? 'bg-rose-950/80 border-rose-500/60 text-rose-200' 
                            : 'bg-[#181838] border-purple-900/30 text-slate-400'
                      }`}
                    >
                      <span>{opt}</span>
                      {isAnswer && <span className="text-[10px] text-emerald-300 font-bold ml-1">✓ Correct</span>}
                      {isUserSelection && !isAnswer && <span className="text-[10px] text-rose-300 font-bold ml-1">✗ Your choice</span>}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-purple-900/40">
        <button
          onClick={onRetake}
          className="px-5 py-2.5 rounded-xl border border-purple-700/50 text-xs font-semibold text-purple-200 hover:bg-purple-950/60 flex items-center gap-1.5 transition-all"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Retake Mock Test
        </button>

        <button
          onClick={onBookCounselling}
          className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-bold text-white transition-all shadow-lg shadow-purple-600/30"
        >
          Book Academic Counseling Session →
        </button>
      </div>
    </div>
  );
};

// --- FEE CALCULATOR SUBCOMPONENT ---

const TRACK_OPTIONS = [
  { id: 'optional', name: 'Optional Subject Specialization', fee: 18000, desc: 'PSIR / Sociology / Geography Paper 1 & 2' },
  { id: 'testseries', name: 'All-India Test Series with Model Answers', fee: 9500, desc: '32 full mocks with 24h evaluation' },
  { id: 'csat', name: 'CSAT & Analytical Aptitude Workshop', fee: 6000, desc: 'Quantitative & logical reasoning modules' }
];

const FeeCalculatorSection: React.FC<{
  selectedCourseId: string;
  onSelectCourse: (id: string) => void;
  onProceedAdmission: (courseTitle: string) => void;
}> = ({ selectedCourseId, onSelectCourse, onProceedAdmission }) => {
  const [batchTime, setBatchTime] = useState<'morning' | 'evening' | 'weekend'>('morning');
  const [installmentPlan, setInstallmentPlan] = useState<'full' | '2inst' | '3inst'>('full');
  const [selectedTracks, setSelectedTracks] = useState<string[]>(['optional']);
  const [earlyBirdScholarship, setEarlyBirdScholarship] = useState(true);

  const course = COURSES.find(c => c.id === selectedCourseId) || COURSES[0];
  const tracksAddition = selectedTracks.reduce((sum, tId) => {
    const opt = TRACK_OPTIONS.find(o => o.id === tId);
    return sum + (opt ? opt.fee : 0);
  }, 0);

  const baseFee = course.fee + tracksAddition;

  // Scholarship rules: Full Pay -> 5%, Early bird -> 10%, Weekend -> 3%
  const fullPayDiscountPct = installmentPlan === 'full' ? 5 : 0;
  const earlyBirdDiscountPct = earlyBirdScholarship ? 10 : 0;
  const weekendDiscountPct = batchTime === 'weekend' ? 3 : 0;
  const totalDiscountPct = fullPayDiscountPct + earlyBirdDiscountPct + weekendDiscountPct;

  const discountAmount = Math.round(baseFee * (totalDiscountPct / 100));
  const finalFee = baseFee - discountAmount;

  const installmentAmount = installmentPlan === 'full' 
    ? finalFee 
    : installmentPlan === '2inst' 
      ? Math.round(finalFee / 2) 
      : Math.round(finalFee / 3);

  const toggleTrack = (tId: string) => {
    setSelectedTracks(prev =>
      prev.includes(tId) ? prev.filter(x => x !== tId) : [...prev, tId]
    );
  };

  return (
    <div id="calculator" className="bg-[#12122c] border border-purple-800/40 rounded-3xl p-6 sm:p-10 shadow-2xl">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-700/50 text-[11px] font-semibold text-purple-300 uppercase tracking-wider mb-2">
          <Calculator className="w-3.5 h-3.5 text-purple-400" />
          <span>Interactive Fee & Scholarship Estimator</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-white">Transparent Tuition Calculator</h3>
        <p className="text-slate-400 text-xs sm:text-sm mt-1.5 max-w-md mx-auto">
          Configure academic tracks, installment schedules, and early-bird merit scholarships.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls */}
        <div className="lg:col-span-7 space-y-5">
          {/* Select Course */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Primary Academic Foundation Track</label>
            <select
              value={selectedCourseId}
              onChange={e => onSelectCourse(e.target.value)}
              className="w-full bg-[#181838] border border-purple-900 rounded-xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-purple-400 cursor-pointer"
            >
              {COURSES.map(c => (
                <option key={c.id} value={c.id}>
                  {c.title} — {formatINR(c.fee)} ({c.duration})
                </option>
              ))}
            </select>
          </div>

          {/* Modular Tracks Selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Select Modular Tracks & Electives
            </label>
            <div className="space-y-2">
              {TRACK_OPTIONS.map(opt => {
                const isSelected = selectedTracks.includes(opt.id);
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => toggleTrack(opt.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-purple-600/20 border-purple-400 text-white'
                        : 'bg-[#181838] border-purple-950 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`w-4 h-4 rounded flex items-center justify-center text-[10px] font-bold border ${isSelected ? 'bg-purple-500 border-purple-400 text-white' : 'border-slate-700'}`}>
                          {isSelected && '✓'}
                        </span>
                        <span className="text-xs font-bold text-white">{opt.name}</span>
                      </div>
                      <span className="text-[10px] text-purple-300/80 block mt-0.5 ml-6">{opt.desc}</span>
                    </div>
                    <span className="font-mono text-xs font-bold text-emerald-400 shrink-0">+{formatINR(opt.fee)}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Select Batch Timing */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Select Batch Timing
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => setBatchTime('morning')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  batchTime === 'morning'
                    ? 'bg-purple-600/30 border-purple-400 text-white shadow-md'
                    : 'bg-[#181838] border-purple-900/50 text-slate-400 hover:text-white'
                }`}
              >
                <div className="font-bold text-xs">Morning Batch</div>
                <div className="text-[11px] text-purple-300 mt-0.5">6:00 AM – 9:00 AM</div>
              </button>
              <button
                type="button"
                onClick={() => setBatchTime('evening')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  batchTime === 'evening'
                    ? 'bg-purple-600/30 border-purple-400 text-white shadow-md'
                    : 'bg-[#181838] border-purple-900/50 text-slate-400 hover:text-white'
                }`}
              >
                <div className="font-bold text-xs">Evening Batch</div>
                <div className="text-[11px] text-purple-300 mt-0.5">6:00 PM – 9:00 PM</div>
              </button>
              <button
                type="button"
                onClick={() => setBatchTime('weekend')}
                className={`p-3 rounded-xl border text-left transition-all relative cursor-pointer ${
                  batchTime === 'weekend'
                    ? 'bg-purple-600/30 border-purple-400 text-white shadow-md'
                    : 'bg-[#181838] border-purple-900/50 text-slate-400 hover:text-white'
                }`}
              >
                <div className="font-bold text-xs">Weekend Batch</div>
                <div className="text-[11px] text-emerald-400 mt-0.5">3% Weekend Rebate</div>
              </button>
            </div>
          </div>

          {/* Payment & Installment Options */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Payment & Installment Options
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => setInstallmentPlan('full')}
                className={`p-3 rounded-xl border text-left transition-all relative cursor-pointer ${
                  installmentPlan === 'full'
                    ? 'bg-purple-600/30 border-purple-400 text-white shadow-md'
                    : 'bg-[#181838] border-purple-900/50 text-slate-400 hover:text-white'
                }`}
              >
                <div className="font-bold text-xs">Full Payment</div>
                <div className="text-[11px] text-emerald-400 mt-0.5">5% Lumpsum Discount</div>
              </button>
              <button
                type="button"
                onClick={() => setInstallmentPlan('2inst')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  installmentPlan === '2inst'
                    ? 'bg-purple-600/30 border-purple-400 text-white shadow-md'
                    : 'bg-[#181838] border-purple-900/50 text-slate-400 hover:text-white'
                }`}
              >
                <div className="font-bold text-xs">2 Installments</div>
                <div className="text-[11px] text-purple-300 mt-0.5">50% now, 50% in 30 days</div>
              </button>
              <button
                type="button"
                onClick={() => setInstallmentPlan('3inst')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  installmentPlan === '3inst'
                    ? 'bg-purple-600/30 border-purple-400 text-white shadow-md'
                    : 'bg-[#181838] border-purple-900/50 text-slate-400 hover:text-white'
                }`}
              >
                <div className="font-bold text-xs">3 Installments</div>
                <div className="text-[11px] text-purple-300 mt-0.5">3 Monthly EMIs</div>
              </button>
            </div>
          </div>

          {/* Early-Bird Scholarship Toggle */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setEarlyBirdScholarship(v => !v)}
              className="flex items-center gap-2.5 text-xs text-slate-300 cursor-pointer select-none"
            >
              <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${earlyBirdScholarship ? 'bg-emerald-500 border-emerald-400 text-slate-950 font-bold' : 'border-slate-700 bg-white/5'}`}>
                {earlyBirdScholarship && '✓'}
              </div>
              <span>Apply 10% Early-Bird Merit Scholarship Deduction</span>
            </button>
          </div>
        </div>

        {/* Calculation Summary Card */}
        <div className="lg:col-span-5 bg-[#181838] border border-purple-800/50 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-purple-400 block mb-1">
              Fee Estimate Summary
            </span>
            <h4 className="text-base font-bold text-white mb-4">{course.title}</h4>

            <div className="space-y-3 pb-4 border-b border-purple-900/40 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Standard Tuition:</span>
                <span className="font-semibold text-white">{formatINR(baseFee)}</span>
              </div>
              
              {fullPayDiscountPct > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Full Pay Discount (5%):</span>
                  <span>− {formatINR(Math.round(baseFee * 0.05))}</span>
                </div>
              )}

              {weekendDiscountPct > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Weekend Batch Rebate (3%):</span>
                  <span>− {formatINR(Math.round(baseFee * 0.03))}</span>
                </div>
              )}

              <div className="flex justify-between text-slate-300">
                <span>Total Discount Applied:</span>
                <span className="font-bold text-emerald-400">
                  {totalDiscountPct > 0 ? `${totalDiscountPct}% (−${formatINR(discountAmount)})` : 'None'}
                </span>
              </div>
            </div>

            <div className="pt-4">
              <span className="text-xs text-slate-400 block">Net Payable Fee:</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl sm:text-3xl font-black text-white">{formatINR(finalFee)}</span>
                {totalDiscountPct > 0 && (
                  <span className="text-xs line-through text-slate-400">{formatINR(baseFee)}</span>
                )}
              </div>

              {installmentPlan !== 'full' && (
                <div className="mt-3 p-3 rounded-xl bg-purple-950/70 border border-purple-700/40">
                  <span className="text-[11px] text-purple-300 block font-medium">
                    {installmentPlan === '2inst' ? 'Per-Installment Amount (2x):' : 'Monthly Amount (3x):'}
                  </span>
                  <span className="text-lg font-bold text-emerald-300">{formatINR(installmentAmount)}</span>
                  <span className="text-[10px] text-slate-400 ml-1">
                    {installmentPlan === '2inst' ? '/ 2 payments' : '/ month for 3 months'}
                  </span>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={() => onProceedAdmission(course.title)}
            className="w-full mt-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2"
          >
            <span>Proceed With This Plan</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

// --- MAIN COACHING DEMO COMPONENT ---

export const CoachingDemo: React.FC<{
  onOrderThisWebsite?: () => void;
  onBackToMain?: () => void;
}> = ({ onOrderThisWebsite, onBackToMain }) => {
  const { toasts, dismiss } = useToast();
  const { toast, triggerSimulatedDispatch, playChime } = useDemoState();

  // Filters state
  const [examFilter, setExamFilter] = useState<'All' | 'UPSC' | 'NEET' | 'KPSC'>('All');
  const [modeFilter, setModeFilter] = useState<'All' | 'Online' | 'Offline' | 'Hybrid'>('All');
  const [durationFilter, setDurationFilter] = useState<'All' | '>6mo' | '<6mo'>('All');

  // Selected course for calculator and forms
  const [selectedCourseId, setSelectedCourseId] = useState<string>(COURSES[0].id);

  // Mock test flow state
  const [testState, setTestState] = useState<'intro' | 'running' | 'review'>('intro');
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [testSessionId, setTestSessionId] = useState<number>(1);

  // Admission form state
  const [studentName, setStudentName] = useState('');
  const [phone, setPhone] = useState('');
  const [targetCourse, setTargetCourse] = useState(COURSES[0].title);
  const [educationLevel, setEducationLevel] = useState('College Graduate');
  const [demoDate, setDemoDate] = useState(addDays(todayStr(), 1));
  const [demoSlot, setDemoSlot] = useState('Morning 10:00 AM');
  const [formErrors, setFormErrors] = useState<{ name?: string; phone?: string }>({});
  const [confirmation, setConfirmation] = useState<{
    token: string;
    name: string;
    phone: string;
    course: string;
    date: string;
    slot: string;
  } | null>(null);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Filter courses
  const filteredCourses = COURSES.filter(course => {
    if (examFilter !== 'All' && course.exam !== examFilter) return false;
    if (modeFilter !== 'All' && course.mode !== modeFilter) return false;
    if (durationFilter === '>6mo' && course.durationMonths <= 6) return false;
    if (durationFilter === '<6mo' && course.durationMonths > 6) return false;
    return true;
  });

  const handleFinishMockTest = (answers: Record<number, number>) => {
    setQuizAnswers(answers);
    setTestState('review');
    playChime('success');
    toast.success('Mock test evaluated! Review score & question explanations below.', 'Test Completed');
  };

  const handleRetakeMockTest = () => {
    setQuizAnswers({});
    setTestSessionId(prev => prev + 1);
    setTestState('running');
  };

  const handleAdmissionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { name?: string; phone?: string } = {};

    if (!studentName.trim()) {
      errors.name = 'Please provide the student or applicant full name.';
    }
    if (!isValidPhone(phone)) {
      errors.phone = 'Please enter a valid 10-digit Indian phone number.';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      toast.error('Please correct the highlighted fields in the admission form.');
      return;
    }

    setFormErrors({});
    const token = `NX-EDU-${Math.floor(1000 + Math.random() * 9000)}`;
    setConfirmation({
      token,
      name: studentName.trim(),
      phone: phone.trim(),
      course: targetCourse,
      date: demoDate,
      slot: demoSlot,
    });
    playChime('success');
    toast.success(`Demo counselling session scheduled! Reference #${token}`, 'Admissions Enquiry Sent');
    triggerSimulatedDispatch('whatsapp', {
      recipient: phone.trim(),
      title: `Free Demo Session for ${targetCourse}`,
      token
    });
  };

  return (
    <div className="bg-[#0b0b18] text-slate-100 font-sans min-h-screen selection:bg-purple-600 selection:text-white">
      <ToastContainer toasts={toasts} dismiss={dismiss} />
      <DemoBadge />

      {/* Top Banner */}
      <div className="bg-purple-950/70 border-b border-purple-800/40 px-4 sm:px-6 py-2.5 text-xs flex justify-between items-center text-purple-200">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-purple-400 shrink-0" />
          <span className="truncate">Demo preview: High-converting Coaching & EdTech portal by Nexora Technologies</span>
        </div>
        <div className="flex items-center gap-4 shrink-0">
          {onBackToMain && (
            <button
              onClick={onBackToMain}
              className="text-purple-300 hover:text-white text-xs flex items-center gap-1 transition-colors"
            >
              <ArrowLeft className="w-3 h-3" />
              <span>Back to Portfolio</span>
            </button>
          )}
          {onOrderThisWebsite && (
            <button 
              onClick={onOrderThisWebsite}
              className="text-amber-300 hover:text-white font-semibold underline text-xs hidden sm:block"
            >
              Order Educational Website Design →
            </button>
          )}
        </div>
      </div>

      {/* Sticky Nav */}
      <nav className="bg-[#0b0b18]/90 backdrop-blur-md border-b border-purple-900/30 px-6 py-4 sticky top-0 z-30 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-violet-500 flex items-center justify-center text-white shadow-lg shadow-purple-700/30">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-white block leading-none">
              Excel Academy
            </span>
            <span className="text-[10px] text-purple-400 font-medium">Premier Civil & Medical Coaching</span>
          </div>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-7 text-xs font-semibold text-slate-300">
          <a href="#courses" onClick={e => { e.preventDefault(); scrollTo('courses'); }} className="hover:text-purple-300 transition-colors">Courses</a>
          <a href="#calculator" onClick={e => { e.preventDefault(); scrollTo('calculator'); }} className="hover:text-purple-300 transition-colors">Fee Calculator</a>
          <a href="#mocktest" onClick={e => { e.preventDefault(); scrollTo('mocktest'); }} className="hover:text-purple-300 transition-colors">Mock Test</a>
          <a href="#faculty" onClick={e => { e.preventDefault(); scrollTo('faculty'); }} className="hover:text-purple-300 transition-colors">Faculty</a>
          <a href="#admissions" onClick={e => { e.preventDefault(); scrollTo('admissions'); }} className="hover:text-purple-300 transition-colors">Admissions</a>
        </div>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => scrollTo('admissions')}
            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-all shadow-md shadow-purple-600/30"
          >
            Book Free Demo
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-12 pb-20 px-6 max-w-6xl mx-auto overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-700/50 text-purple-300 text-xs font-medium mb-4">
              <Award className="w-3.5 h-3.5 text-purple-400" />
              <span>Admissions Open for 2026-27 Academic Batches</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight tracking-tight">
              Master UPSC, NEET & KPSC with{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-300 to-indigo-300">
                Top Ranks & Mentorship
              </span>
            </h1>

            <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
              Rigorous classroom instruction, curated test series, 1-on-1 retired civil servant mentorship, and AI-driven weak-area tracking to elevate your exam preparations.
            </p>

            <div className="mt-8 flex flex-wrap gap-4 items-center">
              <button
                onClick={() => scrollTo('courses')}
                className="px-6 py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-purple-600/30"
              >
                Explore Courses & Fees
              </button>
              <button
                onClick={() => {
                  scrollTo('mocktest');
                  if (testState === 'intro') {
                    setTestState('running');
                  }
                }}
                className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-semibold text-xs transition-all flex items-center gap-2"
              >
                <Clock className="w-4 h-4 text-purple-400" />
                <span>Take 10-Min Mock Test</span>
              </button>
            </div>

            {/* Hero Stats - Clearly labeled Sample Results */}
            <div className="mt-10 pt-6 border-t border-purple-900/40">
              <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold block mb-3">
                Sample Results · Illustrative Metrics Only
              </span>
              <div className="grid grid-cols-3 gap-4 text-slate-300">
                <div>
                  <span className="block text-2xl font-black text-white">450+</span>
                  <span className="text-xs text-purple-300">UPSC Selections (Sample)</span>
                </div>
                <div>
                  <span className="block text-2xl font-black text-white">99.4%</span>
                  <span className="text-xs text-purple-300">Top NEET Score (Sample)</span>
                </div>
                <div>
                  <span className="block text-2xl font-black text-white">14+ Yrs</span>
                  <span className="text-xs text-purple-300">Mentorship Legacy (Sample)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Visual Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto rounded-3xl overflow-hidden border border-purple-500/30 shadow-2xl shadow-purple-900/30 bg-[#12122b]">
              <SkeletonImage
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=700&q=80"
                alt="Student studying with focus"
                className="w-full h-[380px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b18] via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 bg-purple-950/90 backdrop-blur-md border border-purple-700/50 p-4 rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center font-black text-white text-xs">
                    AIR 12
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Ananya Deshmukh, IAS</p>
                    <p className="text-[11px] text-purple-300">Classroom Foundation • UPSC CSE (Sample)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Course Finder Section */}
      <section id="courses" className="py-16 px-6 max-w-6xl mx-auto border-t border-purple-900/40">
        <div className="text-center mb-10">
          <span className="text-purple-400 text-xs uppercase tracking-widest font-semibold block mb-1">
            Program Finder & Syllabus
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Targeted Examination Batches
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-2 max-w-lg mx-auto">
            Choose your target competitive exam, filter by mode of delivery, and review syllabus outlines.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="bg-[#12122a] border border-purple-900/50 rounded-2xl p-4 sm:p-5 mb-8 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-4 items-center">
            {/* Exam Filter */}
            <div>
              <span className="text-[10px] text-slate-400 block mb-1 font-semibold uppercase">Exam</span>
              <div className="flex rounded-lg bg-black/40 p-0.5 border border-purple-900/60">
                {(['All', 'UPSC', 'NEET', 'KPSC'] as const).map(exam => (
                  <button
                    key={exam}
                    onClick={() => setExamFilter(exam)}
                    className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                      examFilter === exam ? 'bg-purple-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {exam}
                  </button>
                ))}
              </div>
            </div>

            {/* Mode Filter */}
            <div>
              <span className="text-[10px] text-slate-400 block mb-1 font-semibold uppercase">Mode</span>
              <div className="flex rounded-lg bg-black/40 p-0.5 border border-purple-900/60">
                {(['All', 'Offline', 'Online', 'Hybrid'] as const).map(mode => (
                  <button
                    key={mode}
                    onClick={() => setModeFilter(mode)}
                    className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                      modeFilter === mode ? 'bg-purple-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            {/* Duration Filter */}
            <div>
              <span className="text-[10px] text-slate-400 block mb-1 font-semibold uppercase">Duration</span>
              <div className="flex rounded-lg bg-black/40 p-0.5 border border-purple-900/60">
                {(['All', '>6mo', '<6mo'] as const).map(dur => (
                  <button
                    key={dur}
                    onClick={() => setDurationFilter(dur)}
                    className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                      durationFilter === dur ? 'bg-purple-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {dur === 'All' ? 'All' : dur === '>6mo' ? '> 6 Months' : '< 6 Months'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {(examFilter !== 'All' || modeFilter !== 'All' || durationFilter !== 'All') && (
            <button
              onClick={() => { setExamFilter('All'); setModeFilter('All'); setDurationFilter('All'); }}
              className="text-xs text-purple-400 hover:text-purple-300 underline font-medium"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Courses Grid */}
        {filteredCourses.length === 0 ? (
          <div>
            <EmptyState 
              icon="📚"
              title="No courses match the active filters"
              description="All current intensive programs run for 8 to 14 months. Adjust your duration or mode filters to view available batches."
            />
            <div className="text-center mt-3">
              <button 
                onClick={() => { setExamFilter('All'); setModeFilter('All'); setDurationFilter('All'); }}
                className="px-4 py-2 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 text-purple-200 border border-purple-500/40 text-xs font-semibold"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredCourses.map(course => (
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

                  <h3 className="text-lg font-bold text-white mb-1">{course.title}</h3>
                  <div className="flex items-center gap-2 text-xs text-purple-300 mb-4">
                    <span>{course.exam}</span>
                    <span>•</span>
                    <span>{course.mode}</span>
                    <span>•</span>
                    <span>{course.duration}</span>
                  </div>

                  <div className="mb-4 pb-4 border-b border-purple-900/40">
                    <span className="text-2xl font-black text-white">{formatINR(course.fee)}</span>
                    <span className="text-xs text-slate-400 ml-1.5">all-inclusive</span>
                  </div>

                  {/* Batch Timings */}
                  <div className="mb-4">
                    <span className="text-[11px] font-semibold text-slate-400 block mb-1.5">Available Timings:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {course.timings.map((t, idx) => (
                        <span key={idx} className="text-[10px] px-2 py-1 rounded bg-[#1a1a3a] text-purple-200 border border-purple-800/40 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-purple-400" />
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Syllabus Accordion */}
                  <div className="mb-6 space-y-2">
                    <span className="text-[11px] font-semibold text-purple-300 block mb-1">
                      Curriculum & Key Subjects:
                    </span>
                    {course.syllabus.map((s, idx) => (
                      <AccordionItem
                        key={idx}
                        question={s.subject}
                        answer={s.topics.join(' • ')}
                        accentColor="text-purple-400"
                      />
                    ))}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="space-y-2.5 pt-4 border-t border-purple-900/30">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        setSelectedCourseId(course.id);
                        scrollTo('calculator');
                      }}
                      className="w-full py-2.5 rounded-xl bg-purple-950 hover:bg-purple-900 text-purple-200 border border-purple-700/50 font-bold text-xs flex items-center justify-center gap-1 transition-all"
                    >
                      <Calculator className="w-3.5 h-3.5" />
                      Calculate Fee
                    </button>
                    
                    <button
                      onClick={() => {
                        setTargetCourse(course.title);
                        setSelectedCourseId(course.id);
                        scrollTo('admissions');
                      }}
                      className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center justify-center transition-all shadow-md shadow-purple-600/30"
                    >
                      Book Free Demo
                    </button>
                  </div>

                  <WhatsAppButton
                    message={`Hello Excel Academy! I would like to enquire about ${course.title} (${course.batch}). Please share syllabus and brochure.`}
                    label="Enquire on WhatsApp"
                    className="w-full justify-center"
                    size="sm"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Fee Calculator Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto border-t border-purple-900/40">
        <FeeCalculatorSection
          selectedCourseId={selectedCourseId}
          onSelectCourse={id => setSelectedCourseId(id)}
          onProceedAdmission={courseTitle => {
            setTargetCourse(courseTitle);
            scrollTo('admissions');
          }}
        />
      </section>

      {/* Free Mock Test Section */}
      <section id="mocktest" className="py-16 px-6 max-w-5xl mx-auto border-t border-purple-900/40">
        <div className="text-center mb-10">
          <span className="text-purple-400 text-xs uppercase tracking-widest font-semibold block mb-1">
            Free Evaluation
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            All-India Scholarship Mock Test
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-2 max-w-lg mx-auto">
            Test your baseline knowledge with 10 timed MCQs and receive immediate diagnostic feedback.
          </p>
        </div>

        {testState === 'intro' && (
          <div className="bg-[#12122c] border border-purple-800/40 rounded-3xl p-8 text-center max-w-2xl mx-auto shadow-2xl">
            <div className="w-14 h-14 rounded-2xl bg-purple-600/20 border border-purple-500/40 text-purple-300 flex items-center justify-center mx-auto mb-4">
              <HelpCircle className="w-7 h-7" />
            </div>
            <div className="inline-block px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-3">
              Sample Demo Questions Only — Not for actual exam prep
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              10 Questions • 10 Minutes Timed
            </h3>
            <p className="text-xs text-slate-300 max-w-md mx-auto mb-6 leading-relaxed">
              Experience the student assessment portal designed by Nexora. Instant score generation, topic-wise strengths breakdown, and full solution review.
            </p>
            <button
              onClick={() => setTestState('running')}
              className="px-8 py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-purple-600/30"
            >
              Start Free Mock Test Now →
            </button>
          </div>
        )}

        {testState === 'running' && (
          <MockTestRunner
            key={testSessionId}
            onFinish={handleFinishMockTest}
            onExit={() => setTestState('intro')}
          />
        )}

        {testState === 'review' && (
          <MockTestReview
            answers={quizAnswers}
            onRetake={handleRetakeMockTest}
            onBookCounselling={() => scrollTo('admissions')}
          />
        )}
      </section>

      {/* Faculty Section */}
      <section id="faculty" className="py-16 px-6 max-w-6xl mx-auto border-t border-purple-900/40">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/70 border border-purple-700/50 text-[11px] font-semibold text-purple-300 uppercase tracking-wider mb-2">
            <Users className="w-3.5 h-3.5 text-purple-400" />
            <span>Distinguished Mentors</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Learn From Renowned Educators</h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-md mx-auto">
            Experienced mentors with a track record of coaching aspirants to top civil and medical ranks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FACULTY.map((fac, idx) => (
            <div 
              key={idx} 
              className="bg-[#12122b] border border-purple-900/40 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between hover:border-purple-500/50 transition-all"
            >
              <div className="absolute top-4 right-4">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-900/60 border border-purple-700/40 text-purple-300">
                  (Sample)
                </span>
              </div>
              <div>
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-700 to-indigo-600 flex items-center justify-center text-white font-bold text-lg mb-4 shadow-lg shadow-purple-900/40">
                  {fac.name[4]}
                </div>
                <h3 className="text-base font-bold text-white">{fac.name}</h3>
                <p className="text-xs font-semibold text-purple-400 mt-0.5">{fac.sub}</p>
                <p className="text-[11px] text-slate-400 mt-1 font-mono">{fac.yrs}</p>
                <p className="text-xs text-slate-300 mt-3 leading-relaxed">{fac.bio}</p>
              </div>
              <div className="pt-4 mt-4 border-t border-purple-900/40 flex items-center gap-2 text-[11px] text-purple-300">
                <ShieldCheck className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span>Sample Mentor Profile</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sample Results Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto border-t border-purple-900/40">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-[11px] font-bold text-amber-300 uppercase tracking-widest mb-3">
            Sample / Illustrative Data Only
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Proven Record of Selections</h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-lg mx-auto">
            Illustrative showcase of student rankings, test percentiles, and hall-of-fame achievements.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SAMPLE_RESULTS.map((res, idx) => (
            <div key={idx} className="bg-[#12122b]/80 border border-purple-900/40 rounded-2xl p-5 hover:border-purple-600/50 transition-all text-center">
              <div className="inline-block px-2.5 py-1 rounded-full bg-purple-600/20 border border-purple-500/30 text-purple-300 font-bold text-xs mb-3">
                {res.rank}
              </div>
              <h4 className="text-white font-bold text-sm">{res.name}</h4>
              <p className="text-xs text-purple-400 font-medium mt-0.5">{res.exam}</p>
              <p className="text-[11px] text-slate-400 mt-1">{res.program}</p>
              <span className="inline-block mt-3 text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400">
                Illustrative Rank
              </span>
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 rounded-xl bg-purple-950/40 border border-purple-800/30 text-center">
          <p className="text-[11px] text-purple-300/80 italic">
            Disclaimer: All names, ranks, and numbers shown above are fictitious mock data strictly created for demonstration purposes.
          </p>
        </div>
      </section>

      {/* Admission Enquiry Form */}
      <section id="admissions" className="py-16 px-6 max-w-4xl mx-auto border-t border-purple-900/40">
        <div className="bg-[#12122c] border border-purple-700/40 rounded-3xl p-6 sm:p-10 shadow-2xl">
          <div className="text-center mb-8">
            <span className="text-purple-400 text-xs uppercase tracking-widest font-semibold block mb-1">
              Admissions & Counselling
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Book Free Demo Class</h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1">
              Attend a live classroom or online orientation lecture and consult with our academic dean.
            </p>
          </div>

          {confirmation ? (
            <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-2xl p-8 text-center text-emerald-200">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
              <div className="inline-block px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-500/50 text-emerald-300 font-mono text-xs font-bold mb-3">
                Registration Token: {confirmation.token}
              </div>
              <h3 className="text-xl font-bold text-white mb-1">Demo Class Reserved!</h3>
              <p className="text-xs text-slate-300 max-w-md mx-auto mb-4 leading-relaxed">
                Thank you, <strong className="text-white">{confirmation.name}</strong>. Your free demo seat for{' '}
                <strong className="text-white">{confirmation.course}</strong> is scheduled on{' '}
                <strong className="text-white">{confirmation.date}</strong> ({confirmation.slot}).
              </p>

              <div className="flex flex-wrap justify-center gap-3 mt-6">
                <WhatsAppButton
                  message={`Hello Excel Academy! I booked a demo class for ${confirmation.course} with Token ${confirmation.token}. Please confirm my seat.`}
                  label="Confirm on WhatsApp"
                  size="sm"
                />
                <button 
                  onClick={() => setConfirmation(null)}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs text-slate-200 transition-colors"
                >
                  Book Another Demo
                </button>
              </div>

              <div className="mt-6 pt-4 border-t border-emerald-900/40">
                <DemoFormNote />
              </div>
            </div>
          ) : (
            <form onSubmit={handleAdmissionSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Student Full Name *</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Priya Sharma"
                    value={studentName}
                    onChange={e => {
                      setStudentName(e.target.value);
                      if (formErrors.name) setFormErrors(p => ({ ...p, name: undefined }));
                    }}
                    className="w-full bg-[#181838] border border-purple-900 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-purple-400"
                  />
                  <FieldError error={formErrors.name} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Phone Number *</label>
                  <input 
                    type="tel" 
                    placeholder="e.g. 9876543210"
                    value={phone}
                    onChange={e => {
                      setPhone(e.target.value);
                      if (formErrors.phone) setFormErrors(p => ({ ...p, phone: undefined }));
                    }}
                    className="w-full bg-[#181838] border border-purple-900 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-purple-400"
                  />
                  <FieldError error={formErrors.phone} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Target Course</label>
                  <select 
                    value={targetCourse}
                    onChange={e => setTargetCourse(e.target.value)}
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
                    onChange={e => setEducationLevel(e.target.value)}
                    className="w-full bg-[#181838] border border-purple-900 rounded-xl px-3 py-3 text-xs text-white focus:outline-none focus:border-purple-400"
                  >
                    <option value="Class 11 / 12">Class 11 / 12</option>
                    <option value="College Graduate">College Graduate</option>
                    <option value="Working Professional">Working Professional</option>
                    <option value="Post Graduate">Post Graduate</option>
                  </select>
                </div>
              </div>

              {/* Slot Picker */}
              <div className="pt-2">
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Preferred Demo Date</label>
                <input
                  type="date"
                  min={todayStr()}
                  value={demoDate}
                  onChange={e => setDemoDate(e.target.value)}
                  className="w-full bg-[#181838] border border-purple-900 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-400 mb-3"
                />

                <span className="block text-xs font-medium text-slate-300 mb-1.5">Select Time Slot</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {(['Morning 10:00 AM', 'Afternoon 2:00 PM', 'Evening 6:00 PM'] as const).map(slot => (
                    <label
                      key={slot}
                      onClick={() => setDemoSlot(slot)}
                      className={`p-3 rounded-xl border cursor-pointer text-center text-xs font-semibold transition-all ${
                        demoSlot === slot
                          ? 'bg-purple-600/30 border-purple-400 text-white shadow-md'
                          : 'bg-[#181838] border-purple-900/50 text-slate-300 hover:text-white'
                      }`}
                    >
                      <input
                        type="radio"
                        name="demoSlot"
                        checked={demoSlot === slot}
                        onChange={() => setDemoSlot(slot)}
                        className="sr-only"
                      />
                      <span>{slot}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button 
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center transition-all shadow-lg shadow-purple-600/30 cursor-pointer"
                >
                  Reserve My Free Demo Slot Now
                </button>
                <DemoFormNote className="mt-3 text-center" />
              </div>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-purple-950 bg-[#070712] text-xs text-slate-400">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8 text-left">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <GraduationCap className="w-5 h-5 text-purple-400" />
              <span className="font-serif font-bold text-white text-base">Excel Academy</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Empowering civil services and healthcare aspirants with structured pedagogy, veteran faculty, and technology-driven test analytics.
            </p>
          </div>
          <div>
            <span className="font-bold text-white block mb-2">Campus Location</span>
            <p className="text-xs text-slate-400">Excel Tower, Vijayanagar Main Road</p>
            <p className="text-xs text-slate-400">Near Metro Station, Bengaluru, Karnataka</p>
            <p className="text-xs text-purple-400 mt-1 flex items-center gap-1">
              <PhoneCall className="w-3 h-3" /> +91 79 7597 6491
            </p>
          </div>
          <div>
            <span className="font-bold text-white block mb-2">Programs Offered</span>
            <ul className="space-y-1 text-xs text-slate-400">
              <li>• UPSC Civil Services (Prelims + Mains)</li>
              <li>• NEET Super-50 Droppers Intensive</li>
              <li>• KPSC Gazetted Probationary (KAS)</li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto px-6 pt-6 border-t border-purple-950/80 text-center text-[10px] text-slate-400">
          <p>© 2026-2027 Excel Academy Demo. Portfolio concept developed by Nexora Technologies.</p>
        </div>
      </footer>
    </div>
  );
};

export default CoachingDemo;
