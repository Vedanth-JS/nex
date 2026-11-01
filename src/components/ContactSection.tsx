import React, { useState, useEffect } from 'react';
import { 
  Send, 
  MessageCircle, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Mail, 
  Clock, 
  Loader2,
  Check,
  ShieldCheck,
  Zap,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { getWhatsAppUrl, formatLeadWhatsAppMessage, WHATSAPP_CONFIG } from '../utils/whatsapp';
import { Card3D } from './3d/Card3D';
import { LeadFormData } from '../types';

interface ContactSectionProps {
  initialService?: string;
  initialIndustry?: string;
}

const BUDGET_OPTIONS = [
  { id: 'starter', label: 'Starter', price: '₹2,999 - ₹4,999', note: 'Single-page quick launch' },
  { id: 'growth', label: 'Growth', price: '₹5,000 - ₹9,999', note: 'Up to 5 pages + lead forms' },
  { id: 'pro', label: 'Professional', price: '₹10,000 - ₹25,000', note: 'Custom booking & filters' },
  { id: 'custom', label: 'Enterprise', price: '₹25,000+', note: 'Large custom portals' },
];

export const ContactSection: React.FC<ContactSectionProps> = ({ 
  initialService, 
  initialIndustry 
}) => {
  const [formData, setFormData] = useState<LeadFormData>({
    fullName: '',
    businessName: '',
    phone: '',
    email: '',
    businessCategory: initialIndustry || 'Restaurant / Cafe',
    websiteType: initialService || 'Business Website',
    budget: '₹5,000 - ₹9,999 (Growth)',
    projectDescription: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Update form if props change from other sections
  useEffect(() => {
    if (initialService) {
      setFormData(prev => ({ ...prev, websiteType: initialService }));
    }
  }, [initialService]);

  useEffect(() => {
    if (initialIndustry) {
      setFormData(prev => ({ ...prev, businessCategory: initialIndustry }));
    }
  }, [initialIndustry]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectBudget = (option: typeof BUDGET_OPTIONS[0]) => {
    setFormData(prev => ({ ...prev, budget: `${option.price} (${option.label})` }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.fullName.trim() || !formData.phone.trim() || !formData.email.trim()) {
      setErrorMessage('Please fill in your name, phone number, and email.');
      return;
    }

    setLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1100));

      const savedLeads = JSON.parse(localStorage.getItem('nexora_leads') || '[]');
      savedLeads.push({
        ...formData,
        submittedAt: new Date().toISOString()
      });
      localStorage.setItem('nexora_leads', JSON.stringify(savedLeads));

      // 3D Confetti bursts
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
      setTimeout(() => {
        confetti({
          particleCount: 60,
          angle: 60,
          spread: 55,
          origin: { x: 0 }
        });
        confetti({
          particleCount: 60,
          angle: 120,
          spread: 55,
          origin: { x: 1 }
        });
      }, 250);

      setSubmitted(true);
    } catch (err) {
      setErrorMessage('Something went wrong submitting your enquiry. Please use WhatsApp directly.');
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppDirect = () => {
    const message = formatLeadWhatsAppMessage(formData);
    window.open(getWhatsAppUrl(message), '_blank');
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-[#070b18] overflow-hidden" style={{ perspective: '1400px' }}>
      {/* 3D Horizon Grid Background */}
      <div className="cyber-grid-3d opacity-75" />

      {/* Background Glows */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-1/4 w-[450px] h-[450px] bg-cyan-500/15 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs font-semibold mb-4 shadow-[0_0_20px_rgba(34,211,238,0.3)]">
            <MessageCircle className="w-3.5 h-3.5 text-cyan-400" />
            <span>Fast Lead Response • Dedicated Team</span>
          </div>
          {/* Exact Heading from prompt */}
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Let's Build Something <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-300">
              Amazing for Your Business.
            </span>
          </h2>
          {/* Exact Description from prompt */}
          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed">
            Tell us about your business and the website you need. We'll help you choose the right solution.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Agency Contact Info with 3D Tilt Card */}
          <div className="lg:col-span-5 space-y-6">
            <Card3D intensity={10} glareOpacity={0.16}>
              <div className="glass-card-3d rounded-3xl p-8 border border-white/15 bg-[#090d1e]/95 shadow-[0_25px_60px_rgba(0,0,0,0.8)] h-full">
                <div style={{ transform: 'translateZ(20px)' }}>
                  <h3 className="font-display text-2xl font-bold text-white mb-2">
                    Get In Touch Directly
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-8">
                    Prefer talking to a real human immediately? Reach us on WhatsApp or phone for an instant consultation.
                  </p>

                  <div className="space-y-4">
                    <a 
                      href={getWhatsAppUrl(WHATSAPP_CONFIG.defaultHeroMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-4 p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 hover:bg-emerald-950/60 transition-all group shadow-lg shadow-emerald-950/30"
                    >
                      <div className="w-11 h-11 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-inner">
                        <MessageCircle className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                          <span>Instant WhatsApp</span>
                        </span>
                        <p className="text-sm font-bold text-white mt-0.5">{WHATSAPP_CONFIG.agencyPhoneFormatted}</p>
                        <p className="text-[11px] text-slate-300">Fastest response • Available 9 AM - 9 PM</p>
                      </div>
                    </a>

                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/30 transition-all">
                      <div className="w-11 h-11 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0 shadow-inner">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-purple-300">Official Email</span>
                        <p className="text-sm font-bold text-white mt-0.5">{WHATSAPP_CONFIG.agencyEmail}</p>
                        <p className="text-[11px] text-slate-300">For detailed RFPs and specifications</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-all">
                      <div className="w-11 h-11 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 shadow-inner">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">Working Hours</span>
                        <p className="text-sm font-bold text-white mt-0.5">Monday – Saturday: 9:00 AM – 8:00 PM</p>
                        <p className="text-[11px] text-slate-300">Emergency support active for hosted clients</p>
                      </div>
                    </div>
                  </div>

                  {/* 3D Guarantee Badges */}
                  <div className="mt-8 pt-6 border-t border-white/10 space-y-2.5 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Free domain & hosting setup assistance</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>Transparent starting prices from ₹2,999</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-purple-400 shrink-0" />
                      <span>100% Mobile & WhatsApp enabled</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card3D>
          </div>

          {/* Right Column: 3D Lead Form */}
          <div className="lg:col-span-7">
            <div className="glass-card-3d rounded-3xl p-8 sm:p-10 border border-white/15 bg-[#090d1e]/95 shadow-[0_30px_70px_rgba(0,0,0,0.85)] relative">
              
              {submitted ? (
                <div className="py-12 px-4 text-center">
                  <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-emerald-600 to-teal-400 text-white flex items-center justify-center mx-auto mb-6 shadow-[0_15px_35px_rgba(16,185,129,0.4)] animate-bounce-subtle">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white mb-2">
                    Enquiry Received Successfully!
                  </h3>
                  <p className="text-slate-300 text-sm max-w-md mx-auto mb-8 leading-relaxed">
                    Thank you, <strong>{formData.fullName}</strong>. We have logged your request for <strong>{formData.businessName || 'your business'}</strong>. Our team will contact you at <strong>{formData.phone}</strong> shortly.
                  </p>

                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 max-w-md mx-auto mb-8 text-left text-xs space-y-2 text-slate-300 shadow-inner">
                    <p><strong>Website Type:</strong> {formData.websiteType}</p>
                    <p><strong>Business Category:</strong> {formData.businessCategory}</p>
                    <p><strong>Budget Range:</strong> {formData.budget}</p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      onClick={handleWhatsAppDirect}
                      className="w-full sm:w-auto px-7 py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:brightness-110 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-2xl shadow-emerald-600/40 transition-all"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Continue Conversation on WhatsApp</span>
                    </button>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="w-full sm:w-auto px-6 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-all border border-white/10"
                    >
                      Submit Another Enquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <div>
                      <h3 className="font-display text-xl font-bold text-white">Project Enquiry Form</h3>
                      <p className="text-xs text-slate-400">Fill in the details below for a customized proposal.</p>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 font-mono">
                      Step 1 of 1
                    </span>
                  </div>

                  {errorMessage && (
                    <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-500/50 text-rose-300 text-xs flex items-center gap-2 shadow-lg">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Row 1: Name and Business Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        required
                        placeholder="e.g. Ramesh Kumar"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full bg-[#050814] border border-white/15 focus:border-purple-500 rounded-xl px-4 py-3.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-purple-500 shadow-inner transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Business Name *
                      </label>
                      <input
                        type="text"
                        name="businessName"
                        required
                        placeholder="e.g. Kumar Dental Clinic"
                        value={formData.businessName}
                        onChange={handleChange}
                        className="w-full bg-[#050814] border border-white/15 focus:border-purple-500 rounded-xl px-4 py-3.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-purple-500 shadow-inner transition-colors"
                      />
                    </div>
                  </div>

                  {/* Row 2: Phone and Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Phone Number (WhatsApp Preferred) *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-[#050814] border border-white/15 focus:border-purple-500 rounded-xl px-4 py-3.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-purple-500 shadow-inner transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="ramesh@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-[#050814] border border-white/15 focus:border-purple-500 rounded-xl px-4 py-3.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-purple-500 shadow-inner transition-colors"
                      />
                    </div>
                  </div>

                  {/* Row 3: Business Category & Website Required */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Business Category
                      </label>
                      <select
                        name="businessCategory"
                        value={formData.businessCategory}
                        onChange={handleChange}
                        className="w-full bg-[#050814] border border-white/15 focus:border-purple-500 rounded-xl px-3.5 py-3.5 text-xs text-white focus:outline-none transition-colors"
                      >
                        <option value="Restaurant / Cafe">Restaurants & Cafes</option>
                        <option value="Hospital / Clinic">Hospitals & Clinics</option>
                        <option value="Hotel / Resort">Hotels & Resorts</option>
                        <option value="Educational Institution">Educational Institutions</option>
                        <option value="Gym & Fitness Centre">Gyms & Fitness Centres</option>
                        <option value="Beauty Salon / Spa">Beauty Salons & Spas</option>
                        <option value="Real Estate">Real Estate</option>
                        <option value="Retail Shop">Retail Shops</option>
                        <option value="Travel Agency">Travel Agencies</option>
                        <option value="Automobile Services">Automobile Services</option>
                        <option value="Event Management">Event Management</option>
                        <option value="Professional Services">Professional Services</option>
                        <option value="Other Business">Other Business</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Website Required (Exact from prompt) *
                      </label>
                      <select
                        name="websiteType"
                        value={formData.websiteType}
                        onChange={handleChange}
                        className="w-full bg-[#050814] border border-white/15 focus:border-purple-500 rounded-xl px-3.5 py-3.5 text-xs text-white focus:outline-none transition-colors"
                      >
                        <option value="Business Website">Business Website</option>
                        <option value="Restaurant Website">Restaurant Website</option>
                        <option value="Clinic Website">Clinic Website</option>
                        <option value="Hotel Website">Hotel Website</option>
                        <option value="E-commerce Website">E-commerce Website</option>
                        <option value="Educational Website">Educational Website</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  {/* 3D Interactive Budget Tiles */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">
                      Select Budget Range
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {BUDGET_OPTIONS.map((opt) => {
                        const isSelected = formData.budget.includes(opt.label);
                        return (
                          <button
                            type="button"
                            key={opt.id}
                            onClick={() => handleSelectBudget(opt)}
                            className={`p-3 rounded-xl text-left transition-all border ${
                              isSelected
                                ? 'bg-purple-600/30 border-purple-500 text-white shadow-[0_0_15px_rgba(139,92,246,0.35)] scale-[1.02]'
                                : 'bg-[#050814] border-white/10 text-slate-400 hover:border-white/20 hover:text-slate-200'
                            }`}
                          >
                            <p className="text-xs font-bold text-white">{opt.label}</p>
                            <p className="text-[11px] font-mono text-cyan-400 mt-0.5">{opt.price}</p>
                            <p className="text-[10px] text-slate-400 mt-0.5 leading-tight">{opt.note}</p>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Project Requirements */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Project Requirements
                    </label>
                    <textarea
                      name="projectDescription"
                      rows={3}
                      placeholder="Tell us about the features you need (e.g. food menu, appointment booking, online payments, gallery, etc.)"
                      value={formData.projectDescription}
                      onChange={handleChange}
                      className="w-full bg-[#050814] border border-white/15 focus:border-purple-500 rounded-xl p-3.5 text-xs text-white placeholder:text-slate-500 focus:outline-none transition-colors resize-none shadow-inner"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="py-4 rounded-xl gradient-button text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_15px_30px_rgba(139,92,246,0.4)] hover:brightness-110 disabled:opacity-50 transition-all cursor-pointer"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>SENDING...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>SEND MY ENQUIRY</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleWhatsAppDirect}
                      className="py-4 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/20 transition-all cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4 text-emerald-400" />
                      <span>CHAT ON WHATSAPP</span>
                    </button>
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
