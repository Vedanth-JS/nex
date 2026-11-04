import React, { useState, useEffect } from 'react';
import { 
  Send, 
  MessageCircle, 
  Check, 
  Clock, 
  Mail, 
  ShieldCheck, 
  AlertCircle, 
  Loader2,
  Zap,
  User,
  Building2,
  Phone,
  ChevronDown,
  Sparkles,
  Copy,
  ArrowRight,
  CheckCircle2,
  Layers,
  Globe,
  ExternalLink,
  Code2,
  Flame,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { WHATSAPP_CONFIG, getWhatsAppUrl, formatLeadWhatsAppMessage } from '../utils/whatsapp';
import { dispatchLead } from '../utils/leadDispatcher';
import { Card3D } from './3d/Card3D';

interface ContactSectionProps {
  initialService?: string;
  initialIndustry?: string;
}

interface LeadFormData {
  fullName: string;
  businessName: string;
  phone: string;
  email: string;
  websiteType: string;
  businessCategory: string;
  budget: string;
  projectDescription: string;
}

const BUDGET_OPTIONS = [
  { 
    id: 'starter', 
    label: 'Starter', 
    price: '₹2,999', 
    tag: 'Single-page quick launch', 
    turnaround: '48 Hours',
    tagline: 'High-converting responsive landing page • Free domain & SSL • 1-Click WhatsApp lead capture',
    popular: false,
  },
  { 
    id: 'growth', 
    label: 'Growth', 
    price: '₹5,999', 
    tag: 'Multi-page + booking & menus', 
    turnaround: '72 Hours',
    tagline: 'Multi-page platform • Online booking / digital menu • Direct WhatsApp CRM • Google Maps 5★ reviews',
    popular: true,
  },
  { 
    id: 'pro', 
    label: 'Professional', 
    price: '₹9,999+', 
    tag: 'Full custom digital platform', 
    turnaround: '5–7 Days',
    tagline: 'Bespoke micro-interactions • Razorpay / UPI payment gateway • Lead analytics & priority support',
    popular: false,
  },
  { 
    id: 'enterprise', 
    label: 'Enterprise', 
    price: 'Custom', 
    tag: 'Tailored multi-location systems', 
    turnaround: 'Custom Sprint',
    tagline: 'Multi-branch portals • Custom web apps & APIs • Dedicated engineering sprint & 99.9% uptime SLA',
    popular: false,
  },
];

const QUICK_FEATURE_TAGS = [
  { id: 'booking', label: 'Online Booking', icon: '📅' },
  { id: 'whatsapp', label: 'WhatsApp Cart Flow', icon: '💬' },
  { id: 'menu', label: 'Digital Menu / Catalog', icon: '🍽️' },
  { id: 'reviews', label: 'Google 5★ Reviews', icon: '⭐' },
  { id: 'payment', label: 'Payment Gateway', icon: '💳' },
  { id: 'seo', label: 'Fast SEO & Domain', icon: '🚀' },
];

function playSoftChime() {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12);
    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.15);
  } catch {
    // Ignore audio permission or context restrictions
  }
}

export const ContactSection: React.FC<ContactSectionProps> = ({ 
  initialService = 'Business Website', 
  initialIndustry = 'Restaurant / Cafe' 
}) => {
  const [formData, setFormData] = useState<LeadFormData>({
    fullName: '',
    businessName: '',
    phone: '',
    email: '',
    websiteType: initialService,
    businessCategory: initialIndustry,
    budget: 'Growth (₹5,999)',
    projectDescription: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Synchronize external prop changes safely
  useEffect(() => {
    if (initialService) {
      const timer = setTimeout(() => {
        setFormData(prev => (prev.websiteType !== initialService ? { ...prev, websiteType: initialService } : prev));
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [initialService]);

  useEffect(() => {
    if (initialIndustry) {
      const timer = setTimeout(() => {
        setFormData(prev => (prev.businessCategory !== initialIndustry ? { ...prev, businessCategory: initialIndustry } : prev));
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [initialIndustry]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow clean digits and hyphens without duplicate prefix collisions
    const sanitized = e.target.value.replace(/[^\d\s-]/g, '');
    setFormData(prev => ({ ...prev, phone: sanitized }));
  };

  const handleSelectBudget = (opt: typeof BUDGET_OPTIONS[0]) => {
    playSoftChime();
    setFormData(prev => ({ ...prev, budget: `${opt.label} (${opt.price})` }));
  };

  const handleToggleTag = (tagLabel: string) => {
    playSoftChime();
    setFormData(prev => {
      const current = prev.projectDescription;
      const tagText = `• ${tagLabel}`;
      if (current.includes(tagLabel)) {
        const updated = current
          .split('\n')
          .filter(line => !line.includes(tagLabel))
          .join('\n')
          .trim();
        return { ...prev, projectDescription: updated };
      } else {
        const updated = current ? `${current}\n${tagText}` : tagText;
        return { ...prev, projectDescription: updated };
      }
    });
  };

  const handleCopyPhone = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    playSoftChime();
    navigator.clipboard.writeText(WHATSAPP_CONFIG.phoneNumber);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    playSoftChime();
    navigator.clipboard.writeText(WHATSAPP_CONFIG.agencyEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  // Active budget tier
  const activeBudgetOption = BUDGET_OPTIONS.find(opt => formData.budget.includes(opt.label)) || BUDGET_OPTIONS[1];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    if (!formData.fullName.trim() || !formData.phone.trim() || !formData.businessName.trim()) {
      setErrorMessage('Please provide your name, business name, and WhatsApp phone number.');
      setLoading(false);
      return;
    }

    try {
      // Dispatch simultaneously across Email (Web3Forms), Google Sheets CRM, and localStorage
      await dispatchLead({
        ...formData,
        submittedAt: new Date().toISOString()
      });

      setLoading(false);
      setSubmitted(true);
      try {
        confetti({
          particleCount: 100,
          spread: 75,
          origin: { y: 0.6 },
          colors: ['#FFB547', '#7C5CFF', '#E14BFF', '#10B981'],
        });
      } catch {
        // Silently continue
      }
    } catch {
      setLoading(false);
      setErrorMessage('Something went wrong submitting your enquiry. Please use WhatsApp directly.');
    }
  };

  const handleWhatsAppDirect = () => {
    const message = formatLeadWhatsAppMessage(formData);
    window.open(getWhatsAppUrl(message), '_blank');
  };

  return (
    <section 
      id="contact" 
      className="relative py-14 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-[#06070D] overflow-x-hidden border-t border-white/[0.08] w-full max-w-full pb-28 sm:pb-32 selection:bg-aurora-violet/30 selection:text-white"
    >
      {/* ============================================================ */}
      {/* SPATIAL ATMOSPHERE: Multi-Layer Antigravity Depth Meshes     */}
      {/* ============================================================ */}
      <div className="absolute inset-0 aurora-grid opacity-20 pointer-events-none" />
      <div className="cyber-grid-3d opacity-25 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(124,92,255,0.15),rgba(255,255,255,0))] pointer-events-none" />

      {/* Floating Weightless Light Orbs (Confined to eliminate horizontal overflow) */}
      <div className="absolute top-1/4 -left-12 sm:-left-24 w-60 h-60 sm:w-[480px] sm:h-[480px] bg-aurora-violet/15 rounded-full blur-[90px] sm:blur-[160px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 -right-12 sm:-right-24 w-60 h-60 sm:w-[480px] sm:h-[480px] bg-aurora-amber/12 rounded-full blur-[90px] sm:blur-[160px] pointer-events-none -z-10" />
      <div className="absolute bottom-16 left-1/4 w-48 h-48 sm:w-[380px] sm:h-[380px] bg-emerald-500/10 rounded-full blur-[80px] sm:blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        
        {/* ============================================================ */}
        {/* SECTION HEADER: Kinetic Editorial Fluid Typography Scale      */}
        {/* ============================================================ */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 lg:mb-16">
          
          {/* Antigravity Telemetry Micro-Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 shadow-[0_4px_20px_rgba(124,92,255,0.18)] backdrop-blur-xl mb-4 max-w-full">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span className="font-mono text-emerald-400 font-semibold tracking-wider text-[10px] sm:text-[11px] uppercase truncate">
              STUDIO DISPATCH ACTIVE
            </span>
            <span className="text-white/20">•</span>
            <span className="text-slate-300 text-[10px] sm:text-[11px] truncate">
              Direct Technical Review
            </span>
          </div>

          {/* Fluid Typography Heading (Fluid clamp prevents awkward line breaks) */}
          <h2 className="font-display text-[clamp(1.75rem,7vw,3.25rem)] font-extrabold text-white tracking-tight leading-[1.12]">
            Turn Your Business Into a <br className="hidden sm:inline" />
            <span className="headline-shimmer">
              Dominant Digital Flagship.
            </span>
          </h2>
          
          <p className="text-slate-400 text-sm sm:text-base mt-3 leading-relaxed max-w-xl mx-auto font-normal">
            Configure your technical scope below. Receive a transparent milestone blueprint, 
            fixed pricing, and direct technical review within hours.
          </p>
        </div>

        {/* ============================================================ */}
        {/* ASYMMETRIC BENTO GRID: Stacks on mobile, splits on lg        */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start w-full">
          
          {/* ========================================================= */}
          {/* LEFT CONSOLE: Executive Direct Connect (Bento Depth)      */}
          {/* ========================================================= */}
          <div className="w-full lg:col-span-5 h-full">
            <Card3D intensity={4} glareOpacity={0.08} className="h-full">
              <div className="relative rounded-3xl p-4 sm:p-6 lg:p-7 bg-gradient-to-b from-[#111224]/90 via-[#0B0C18]/90 to-[#06070D]/95 border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.85)] backdrop-blur-2xl overflow-hidden h-full flex flex-col justify-between group">
                
                {/* Luminous Spatial Rim Light */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-aurora-violet via-aurora-magenta to-aurora-amber" />
                
                <div>
                  {/* Console Header */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono tracking-widest uppercase px-2.5 py-1 rounded-full bg-aurora-violet/15 text-aurora-violet border border-aurora-violet/30 font-semibold">
                      DIRECT CONNECT
                    </span>
                    <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Live: &lt; 15 mins
                    </span>
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                    Get In Touch Directly
                  </h3>
                  
                  <p className="text-aurora-muted text-xs sm:text-sm leading-relaxed mt-1.5 mb-4 sm:mb-5">
                    Skip the junior sales agents. Talk directly to our technical founders for instant advice, feasibility, and customized quotes.
                  </p>

                  {/* Asymmetrical Channel Cards with Spatial Hover & Spring Physics */}
                  <div className="space-y-2.5 sm:space-y-3">
                    
                    {/* CHANNEL 1: INSTANT WHATSAPP (Hero Suspended Capsule) */}
                    <a 
                      href={getWhatsAppUrl(WHATSAPP_CONFIG.defaultHeroMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/channel relative flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-emerald-950/45 via-emerald-900/20 to-[#0e0f1c]/90 border border-emerald-500/40 hover:border-emerald-400/80 active:scale-[0.98] transition-all duration-200 shadow-[0_4px_24px_rgba(16,185,129,0.14)] min-h-[58px]"
                    >
                      <div className="flex items-center gap-3 min-w-0 pr-2">
                        <div className="w-11 h-11 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30 group-hover/channel:scale-105 transition-transform shadow-[0_0_15px_rgba(16,185,129,0.25)]">
                          <MessageCircle className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                              Instant WhatsApp
                            </span>
                            <span className="text-[8px] px-1 py-0.2 rounded bg-emerald-400/10 text-emerald-300 font-mono border border-emerald-400/20">
                              RECOMMENDED
                            </span>
                          </div>
                          <p className="text-sm font-bold text-white tracking-tight group-hover/channel:text-emerald-300 transition-colors truncate">
                            {WHATSAPP_CONFIG.agencyPhoneFormatted}
                          </p>
                          <p className="text-[10.5px] text-slate-400 truncate">
                            Fastest replies • 9 AM – 9 PM IST
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={handleCopyPhone}
                          title="Copy phone number"
                          className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl bg-emerald-500/10 hover:bg-emerald-500/25 active:scale-90 text-emerald-300 transition-colors border border-emerald-500/20"
                        >
                          {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                        </button>
                        <div className="min-w-[38px] min-h-[38px] rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover/channel:bg-emerald-500 group-hover/channel:text-black transition-all">
                          <ExternalLink className="w-4 h-4" />
                        </div>
                      </div>
                    </a>

                    {/* CHANNEL 2: OFFICIAL EMAIL */}
                    <div 
                      className="group/channel relative flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-indigo-950/35 via-purple-900/15 to-[#0e0f1c]/80 border border-aurora-violet/30 hover:border-aurora-violet/70 active:scale-[0.98] transition-all duration-200 shadow-[0_4px_20px_rgba(124,92,255,0.08)] min-h-[58px]"
                    >
                      <div className="flex items-center gap-3 min-w-0 pr-2">
                        <div className="w-11 h-11 rounded-xl bg-aurora-violet/20 text-aurora-violet flex items-center justify-center shrink-0 border border-aurora-violet/30 group-hover/channel:scale-105 transition-transform shadow-[0_0_15px_rgba(124,92,255,0.2)]">
                          <Mail className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-aurora-violet block">
                            Official Email
                          </span>
                          <p className="text-xs sm:text-sm font-bold text-white tracking-tight truncate group-hover/channel:text-aurora-violet transition-colors">
                            {WHATSAPP_CONFIG.agencyEmail}
                          </p>
                          <p className="text-[10.5px] text-aurora-muted truncate">
                            For detailed RFPs & project briefs
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={handleCopyEmail}
                          title="Copy email address"
                          className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl bg-aurora-violet/10 hover:bg-aurora-violet/25 active:scale-90 text-aurora-violet transition-colors border border-aurora-violet/20"
                        >
                          {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                        </button>
                        <a
                          href={`mailto:${WHATSAPP_CONFIG.agencyEmail}?subject=Website%20Inquiry%20-%20Nexora%20Technologies`}
                          title="Send Email"
                          className="min-w-[38px] min-h-[38px] rounded-xl bg-aurora-violet/10 flex items-center justify-center text-aurora-violet group-hover/channel:bg-aurora-violet group-hover/channel:text-white transition-all"
                        >
                          <ArrowRight className="w-4 h-4" />
                        </a>
                      </div>
                    </div>

                    {/* CHANNEL 3: WORKING HOURS */}
                    <div 
                      className="relative flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-amber-950/20 via-[#151629] to-[#0e0f1c]/80 border border-white/10 min-h-[58px]"
                    >
                      <div className="flex items-center gap-3 min-w-0 pr-2">
                        <div className="w-11 h-11 rounded-xl bg-aurora-amber/15 text-aurora-amber flex items-center justify-center shrink-0 border border-aurora-amber/25 shadow-inner">
                          <Clock className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-aurora-amber block">
                            Studio Operations
                          </span>
                          <p className="text-xs sm:text-sm font-bold text-white mt-0.5 truncate">
                            Mon – Sat: 9:00 AM – 8:00 PM IST
                          </p>
                          <p className="text-[10.5px] text-aurora-muted truncate">
                            Emergency support active 24/7
                          </p>
                        </div>
                      </div>
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#10B981] shrink-0" title="System operational" />
                    </div>

                  </div>
                </div>

                {/* Asymmetrical Bento Matrix (The Nexora Commitment) */}
                <div className="mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-white/10">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-aurora-muted mb-2.5 flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-aurora-amber" />
                    <span>THE NEXORA COMMITMENT</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
                    <div className="p-2.5 sm:p-3 rounded-xl bg-white/[0.03] border border-white/10 hover:border-aurora-amber/40 transition-colors flex items-start gap-2.5">
                      <div className="p-1 rounded-md bg-aurora-amber/10 text-aurora-amber shrink-0 mt-0.5">
                        <Zap className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11px] font-bold text-white truncate">48–72h Turnaround</p>
                        <p className="text-[9.5px] text-aurora-muted truncate">Rapid MVP deployment</p>
                      </div>
                    </div>

                    <div className="p-2.5 sm:p-3 rounded-xl bg-white/[0.03] border border-white/10 hover:border-emerald-500/40 transition-colors flex items-start gap-2.5">
                      <div className="p-1 rounded-md bg-emerald-500/10 text-emerald-400 shrink-0 mt-0.5">
                        <ShieldCheck className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11px] font-bold text-white truncate">Domain & SSL Free</p>
                        <p className="text-[9.5px] text-aurora-muted truncate">Zero setup hassle</p>
                      </div>
                    </div>

                    <div className="p-2.5 sm:p-3 rounded-xl bg-white/[0.03] border border-white/10 hover:border-aurora-violet/40 transition-colors flex items-start gap-2.5">
                      <div className="p-1 rounded-md bg-aurora-violet/10 text-aurora-violet shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11px] font-bold text-white truncate">100% WhatsApp Ready</p>
                        <p className="text-[9.5px] text-aurora-muted truncate">Direct lead capture</p>
                      </div>
                    </div>

                    <div className="p-2.5 sm:p-3 rounded-xl bg-white/[0.03] border border-white/10 hover:border-pink-500/40 transition-colors flex items-start gap-2.5">
                      <div className="p-1 rounded-md bg-pink-500/10 text-pink-400 shrink-0 mt-0.5">
                        <Sparkles className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11px] font-bold text-white truncate">From ₹2,999</p>
                        <p className="text-[9.5px] text-aurora-muted truncate">Fixed transparent price</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 p-2.5 rounded-xl bg-gradient-to-r from-aurora-violet/10 via-white/[0.02] to-transparent border border-aurora-violet/20 flex flex-col xs:flex-row xs:items-center justify-between gap-1 text-[10px] text-aurora-muted">
                    <span className="flex items-center gap-1.5 text-slate-200">
                      <Code2 className="w-3.5 h-3.5 text-aurora-violet shrink-0" />
                      <span>Direct Developer Consultation • No Middlemen</span>
                    </span>
                    <span className="text-aurora-amber font-mono font-bold text-[9px] self-start xs:self-auto">
                      100% FREE REVIEW
                    </span>
                  </div>
                </div>

              </div>
            </Card3D>
          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: Project Enquiry Form (Spatial Configurator) */}
          {/* ========================================================= */}
          <div className="w-full lg:col-span-7">
            <div className="relative rounded-3xl p-4 sm:p-6 lg:p-8 bg-gradient-to-b from-[#111224]/90 via-[#0B0C18]/90 to-[#06070D]/95 border border-white/15 shadow-[0_20px_70px_rgba(0,0,0,0.9)] backdrop-blur-2xl">
              
              {/* Luminous Spatial Accent Line */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-aurora-amber via-aurora-magenta to-aurora-violet" />

              {submitted ? (
                /* Post-Submission Interactive Receipt */
                <div className="py-6 sm:py-8 px-2 sm:px-4 text-center animate-in fade-in zoom-in-95 duration-500">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-5">
                    <div className="absolute inset-0 bg-emerald-500/20 rounded-3xl blur-xl animate-pulse" />
                    <div className="relative w-full h-full rounded-2xl sm:rounded-3xl bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-400 text-white flex items-center justify-center shadow-[0_15px_35px_rgba(16,185,129,0.4)] border border-emerald-300/30">
                      <ShieldCheck className="w-8 h-8 sm:w-10 sm:h-10" />
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-3">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span>Email Dispatched</span>
                    </span>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-500/15 text-blue-300 border border-blue-500/30 flex items-center gap-1">
                      <Check className="w-3 h-3 text-blue-400" />
                      <span>Google CRM Synced</span>
                    </span>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                      <span>WhatsApp Ready</span>
                    </span>
                  </div>

                  <h3 className="font-display text-xl sm:text-3xl font-extrabold text-white tracking-tight">
                    Enquiry Logged Successfully!
                  </h3>
                  
                  <p className="text-aurora-muted text-xs sm:text-sm max-w-lg mx-auto mt-2 mb-5 sm:mb-6 leading-relaxed">
                    Thank you, <strong className="text-white font-semibold">{formData.fullName}</strong>. We have received your project requirements for <strong className="text-white font-semibold">{formData.businessName || 'your business'}</strong>. Our technical engineering team is preparing your custom proposal.
                  </p>

                  {/* Summary Spec Sheet */}
                  <div className="bg-[#151629]/90 border border-white/10 rounded-2xl p-3.5 sm:p-5 max-w-lg mx-auto mb-5 sm:mb-6 text-left text-xs space-y-2 text-aurora-text shadow-inner">
                    <div className="flex items-center justify-between pb-2 border-b border-white/10">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-aurora-muted">SPECIFICATION SUMMARY</span>
                      <span className="text-emerald-400 font-mono text-[10px] font-bold flex items-center gap-1">
                        <Check className="w-3 h-3" /> READY FOR REVIEW
                      </span>
                    </div>
                    <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 pt-1 text-slate-300 text-[11px]">
                      <p><span className="text-aurora-muted">Client:</span> <span className="text-white font-medium">{formData.fullName}</span></p>
                      <p><span className="text-aurora-muted">WhatsApp:</span> <span className="text-white font-medium">+91 {formData.phone}</span></p>
                      <p><span className="text-aurora-muted">Website Scope:</span> <span className="text-white font-medium">{formData.websiteType}</span></p>
                      <p><span className="text-aurora-muted">Selected Tier:</span> <span className="text-aurora-amber font-medium">{formData.budget}</span></p>
                    </div>
                    {formData.projectDescription && (
                      <div className="pt-2 border-t border-white/5">
                        <span className="text-aurora-muted block text-[10px]">Requested Scope / Features:</span>
                        <p className="text-slate-200 mt-1 whitespace-pre-line text-[11px] font-mono bg-black/30 p-2 rounded-lg border border-white/5 break-words">
                          {formData.projectDescription}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons: Min 48px Tap Height */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      onClick={handleWhatsAppDirect}
                      className="w-full sm:w-auto min-h-[48px] px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 hover:brightness-110 active:scale-[0.98] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_10px_25px_rgba(16,185,129,0.3)] transition-all cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Continue on WhatsApp</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="w-full sm:w-auto min-h-[48px] px-5 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 active:scale-[0.98] text-slate-300 hover:text-white font-semibold text-xs transition-all border border-white/10 cursor-pointer"
                    >
                      Configure Another Project
                    </button>
                  </div>
                </div>
              ) : (
                /* Active Form */
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-4.5">
                  
                  {/* Top Bar Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <div>
                      <h3 className="font-display text-base sm:text-xl font-bold text-white tracking-tight flex items-center gap-2">
                        Project Enquiry Form
                      </h3>
                      <p className="text-xs text-aurora-muted mt-0.5">
                        Configure your requirements for a customized proposal & fixed pricing.
                      </p>
                    </div>
                    
                    <span className="text-[10px] font-mono tracking-wider uppercase px-2.5 py-1 rounded-full bg-aurora-amber/10 text-aurora-amber border border-aurora-amber/30 font-semibold shrink-0">
                      STEP 1 OF 1
                    </span>
                  </div>

                  {errorMessage && (
                    <div className="p-3 rounded-xl bg-rose-950/70 border border-rose-500/50 text-rose-200 text-xs flex items-center gap-2 shadow-lg animate-in fade-in">
                      <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* ROW 1: Name and Business Name (16px Input Font Prevents iOS Auto-Zoom) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-200">
                        Your Name <span className="text-aurora-amber">*</span>
                      </label>
                      <div className="flex rounded-xl bg-[#080914]/90 border border-white/10 focus-within:border-aurora-amber/80 focus-within:ring-2 focus-within:ring-aurora-amber/20 shadow-inner transition-all overflow-hidden min-h-[48px]">
                        <div className="flex items-center pl-3 text-aurora-muted">
                          <User className="w-4 h-4" />
                        </div>
                        <input
                          type="text"
                          name="fullName"
                          required
                          placeholder="e.g. Ramesh Kumar"
                          value={formData.fullName}
                          onChange={handleChange}
                          className="w-full bg-transparent px-3 py-3 text-base sm:text-sm text-white placeholder:text-slate-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-200">
                        Business Name <span className="text-aurora-amber">*</span>
                      </label>
                      <div className="flex rounded-xl bg-[#080914]/90 border border-white/10 focus-within:border-aurora-amber/80 focus-within:ring-2 focus-within:ring-aurora-amber/20 shadow-inner transition-all overflow-hidden min-h-[48px]">
                        <div className="flex items-center pl-3 text-aurora-muted">
                          <Building2 className="w-4 h-4" />
                        </div>
                        <input
                          type="text"
                          name="businessName"
                          required
                          placeholder="e.g. Spice Route Cafe"
                          value={formData.businessName}
                          onChange={handleChange}
                          className="w-full bg-transparent px-3 py-3 text-base sm:text-sm text-white placeholder:text-slate-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* ROW 2: Phone with +91 block & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                    
                    {/* Phone Input with separated country code */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-200 flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-emerald-400" />
                          <span>WhatsApp Phone <span className="text-aurora-amber">*</span></span>
                        </span>
                      </label>
                      <div className="flex rounded-xl bg-[#080914]/90 border border-white/10 focus-within:border-emerald-400/80 focus-within:ring-2 focus-within:ring-emerald-400/20 shadow-inner transition-all overflow-hidden min-h-[48px]">
                        <div className="flex items-center gap-1 px-3 bg-white/[0.04] border-r border-white/10 text-slate-300 font-mono text-xs select-none shrink-0 min-h-[48px]">
                          <span>🇮🇳</span>
                          <span className="font-bold text-emerald-400">+91</span>
                        </div>
                        <input
                          type="tel"
                          name="phone"
                          required
                          placeholder="98765 43210"
                          value={formData.phone}
                          onChange={handlePhoneChange}
                          className="w-full bg-transparent px-3 py-3 text-base sm:text-sm text-white placeholder:text-slate-500 focus:outline-none font-mono"
                        />
                      </div>
                    </div>

                    {/* Email Input */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-200">
                        Email Address <span className="text-aurora-amber">*</span>
                      </label>
                      <div className="flex rounded-xl bg-[#080914]/90 border border-white/10 focus-within:border-aurora-violet/80 focus-within:ring-2 focus-within:ring-aurora-violet/20 shadow-inner transition-all overflow-hidden min-h-[48px]">
                        <div className="flex items-center pl-3 text-aurora-muted">
                          <Mail className="w-4 h-4" />
                        </div>
                        <input
                          type="email"
                          name="email"
                          required
                          placeholder="ramesh@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full bg-transparent px-3 py-3 text-base sm:text-sm text-white placeholder:text-slate-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* ROW 3: Business Category & Website Required */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-aurora-violet" />
                        <span>Business Category</span>
                      </label>
                      <div className="relative min-h-[48px]">
                        <select
                          name="businessCategory"
                          value={formData.businessCategory}
                          onChange={handleChange}
                          className="w-full min-h-[48px] bg-[#080914]/90 border border-white/10 focus:border-aurora-amber/80 rounded-xl px-3.5 py-3 text-base sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-aurora-amber/20 transition-all appearance-none cursor-pointer pr-10 shadow-inner"
                        >
                          <option value="Restaurant / Cafe" className="bg-[#0e0f1c] text-white">Restaurants & Cafes</option>
                          <option value="Hospital / Clinic" className="bg-[#0e0f1c] text-white">Hospitals & Clinics</option>
                          <option value="Hotel / Resort" className="bg-[#0e0f1c] text-white">Hotels & Resorts</option>
                          <option value="Educational Institution" className="bg-[#0e0f1c] text-white">Educational & Coaching</option>
                          <option value="Gym & Fitness Centre" className="bg-[#0e0f1c] text-white">Gyms & Fitness Centres</option>
                          <option value="Real Estate" className="bg-[#0e0f1c] text-white">Real Estate & Developers</option>
                          <option value="Retail Shop" className="bg-[#0e0f1c] text-white">Retail & E-commerce</option>
                          <option value="Beauty Salon / Spa" className="bg-[#0e0f1c] text-white">Beauty Salons & Spas</option>
                          <option value="Travel Agency" className="bg-[#0e0f1c] text-white">Travel & Tours</option>
                          <option value="Professional Services" className="bg-[#0e0f1c] text-white">Lawyers, CA & Consultancies</option>
                          <option value="Other Business" className="bg-[#0e0f1c] text-white">Other Business Category</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-aurora-muted absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                        <Globe className="w-3.5 h-3.5 text-aurora-amber" />
                        <span>Website Scope <span className="text-aurora-amber">*</span></span>
                      </label>
                      <div className="relative min-h-[48px]">
                        <select
                          name="websiteType"
                          value={formData.websiteType}
                          onChange={handleChange}
                          className="w-full min-h-[48px] bg-[#080914]/90 border border-white/10 focus:border-aurora-amber/80 rounded-xl px-3.5 py-3 text-base sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-aurora-amber/20 transition-all appearance-none cursor-pointer pr-10 shadow-inner"
                        >
                          <option value="Business Website" className="bg-[#0e0f1c] text-white">Business Website</option>
                          <option value="Restaurant Website" className="bg-[#0e0f1c] text-white">Restaurant Online Ordering</option>
                          <option value="Clinic Website" className="bg-[#0e0f1c] text-white">Clinic Appointment Booking</option>
                          <option value="Hotel Website" className="bg-[#0e0f1c] text-white">Hotel & Resort Booking Engine</option>
                          <option value="Educational Website" className="bg-[#0e0f1c] text-white">Coaching & Institute Portal</option>
                          <option value="Gym Website" className="bg-[#0e0f1c] text-white">Gym Membership & Classes</option>
                          <option value="Real Estate Website" className="bg-[#0e0f1c] text-white">Real Estate & Site Visits</option>
                          <option value="E-commerce Website" className="bg-[#0e0f1c] text-white">E-commerce / Storefront</option>
                          <option value="Landing Page" className="bg-[#0e0f1c] text-white">Single-Page Landing Page</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-aurora-muted absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* ROW 4: Asymmetric Editorial Tier Horizon (Hero Card Elevation) */}
                  <div className="space-y-2 pt-1">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-aurora-amber" />
                        <span>Target Investment Budget</span>
                      </label>
                      <span className="text-[10px] font-mono text-emerald-400 font-medium">Click to select scope</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {BUDGET_OPTIONS.map((opt) => {
                        const isSelected = formData.budget.includes(opt.label);
                        return (
                          <button
                            type="button"
                            key={opt.id}
                            onClick={() => handleSelectBudget(opt)}
                            className={`group relative p-2.5 sm:p-3 rounded-xl text-left transition-all duration-200 border cursor-pointer overflow-hidden min-h-[74px] sm:min-h-[78px] active:scale-[0.98] ${
                              isSelected
                                ? 'bg-gradient-to-b from-aurora-amber/30 via-[#1c1d36] to-[#0e0f1c] border-aurora-amber shadow-[0_0_24px_rgba(255,181,71,0.3)] ring-1 ring-aurora-amber/80 scale-[1.01]'
                                : 'bg-[#080914]/90 hover:bg-[#151629] border-white/10 hover:border-aurora-violet/40 text-aurora-muted hover:text-white'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-1 mb-0.5">
                              <span className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                                {opt.label}
                              </span>
                              {isSelected ? (
                                <CheckCircle2 className="w-3.5 h-3.5 text-aurora-amber shrink-0 animate-in zoom-in-50" />
                              ) : opt.popular ? (
                                <span className="text-[7.5px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-aurora-amber/20 text-aurora-amber border border-aurora-amber/30 flex items-center gap-0.5 shadow-sm">
                                  <Flame className="w-2.5 h-2.5 text-aurora-amber" />
                                  POPULAR
                                </span>
                              ) : null}
                            </div>

                            <p className={`text-xs sm:text-sm font-extrabold font-mono tracking-tight ${
                              isSelected ? 'text-aurora-amber' : 'text-white'
                            }`}>
                              {opt.price}
                            </p>

                            <p className={`text-[9.5px] mt-0.5 leading-tight truncate ${
                              isSelected ? 'text-slate-300' : 'text-aurora-muted'
                            }`}>
                              {opt.tag}
                            </p>
                          </button>
                        );
                      })}
                    </div>

                    {/* Dynamic 1-Line Deliverables Ticker */}
                    <div className="px-3 py-2 sm:py-2.5 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-xs animate-in fade-in duration-200">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <Sparkles className="w-3 h-3 text-aurora-amber shrink-0" />
                        <span className="text-white font-semibold text-[11px] shrink-0">
                          {activeBudgetOption.label}:
                        </span>
                        <span className="text-slate-300 text-[11px] truncate">
                          {activeBudgetOption.tagline}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono font-bold text-emerald-400 shrink-0 self-start sm:self-auto flex items-center gap-1">
                        <Zap className="w-3 h-3" />
                        Turnaround: {activeBudgetOption.turnaround}
                      </span>
                    </div>
                  </div>

                  {/* ROW 5: Quick-Add Feature Tags Strip (Touch-Friendly Min 40px) */}
                  <div className="space-y-1.5 pt-0.5">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-semibold text-slate-300">
                        Quick-Add Desired Features:
                      </label>
                      <span className="text-[9.5px] text-aurora-muted font-mono">1-Click Insert</span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {QUICK_FEATURE_TAGS.map((tag) => {
                        const isSelected = formData.projectDescription.includes(tag.label);
                        return (
                          <button
                            type="button"
                            key={tag.id}
                            onClick={() => handleToggleTag(tag.label)}
                            className={`min-h-[38px] sm:min-h-[36px] px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-150 border cursor-pointer flex items-center gap-1.5 active:scale-95 ${
                              isSelected
                                ? 'bg-aurora-violet/25 text-white border-aurora-violet shadow-[0_0_12px_rgba(124,92,255,0.3)] ring-1 ring-aurora-violet/50'
                                : 'bg-[#080914]/70 text-slate-300 border-white/10 hover:border-white/20 hover:text-white hover:bg-[#151629]'
                            }`}
                          >
                            <span className="text-[11px]">{tag.icon}</span>
                            <span className="text-[11px]">{tag.label}</span>
                            {isSelected ? (
                              <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                            ) : (
                              <span className="text-aurora-muted text-[11px] shrink-0">+</span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* ROW 6: Project Requirements Textarea */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-200">
                      Project Requirements
                    </label>
                    <textarea
                      name="projectDescription"
                      rows={2}
                      placeholder="Tell us about the features you need (e.g. food menu, appointment booking, online payments, gallery, etc.)"
                      value={formData.projectDescription}
                      onChange={handleChange}
                      className="w-full bg-[#080914]/90 border border-white/10 focus:border-aurora-amber/80 rounded-xl px-3.5 py-3 text-base sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-aurora-amber/20 shadow-inner transition-all resize-none font-sans min-h-[76px]"
                    />
                  </div>

                  {/* ROW 7: Kinetic Action CTAs (Stacked on Mobile, 48px Touch Height) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    
                    {/* Primary Button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full min-h-[48px] relative overflow-hidden group/btn py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:brightness-110 active:scale-[0.98] text-[#07070D] font-extrabold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(255,181,71,0.35)] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {/* Animated Shimmer Sweep */}
                      <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 -translate-x-full group-hover/btn:animate-shimmer-sweep pointer-events-none" />

                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-black" />
                          <span>SENDING ENQUIRY...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-black group-hover/btn:translate-x-1 transition-transform" />
                          <span>SEND MY ENQUIRY</span>
                        </>
                      )}
                    </button>

                    {/* Secondary WhatsApp Button */}
                    <button
                      type="button"
                      onClick={handleWhatsAppDirect}
                      className="w-full min-h-[48px] group/wa py-3.5 px-4 rounded-xl bg-[#0f241a] hover:bg-[#133224] active:scale-[0.98] text-emerald-300 border border-emerald-500/40 hover:border-emerald-400 font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.12)] transition-all cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4 text-emerald-400 group-hover/wa:scale-110 transition-transform" />
                      <span>CHAT ON WHATSAPP</span>
                    </button>
                  </div>

                  {/* ROW 8: SLA & Trust Footnote (Stacked on mobile with safe alignment) */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between text-[11px] sm:text-[10px] text-aurora-muted border-t border-white/5 gap-1 text-center sm:text-left">
                    <span className="flex items-center gap-1 text-slate-400">
                      <ShieldCheck className="w-3 h-3 text-emerald-400" />
                      Zero spam policy • 100% NDA Protected
                    </span>
                    <span className="text-slate-400 flex items-center gap-1">
                      <Zap className="w-3 h-3 text-aurora-amber" />
                      Initial architectural review is 100% free
                    </span>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ContactSection;
