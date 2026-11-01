import React, { useState } from 'react';
import { X, PhoneCall, MessageCircle, CheckCircle2, Sparkles, Loader2 } from 'lucide-react';
import { getWhatsAppUrl, WHATSAPP_CONFIG } from '../utils/whatsapp';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [businessType, setBusinessType] = useState('Restaurant / Cafe');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 700);
  };

  const handleWhatsAppInstant = () => {
    const text = `Hello Nexora Technologies! I would like to book a free 10-minute consultation for my business (${businessType}). My name is ${name || 'a business owner'}.`;
    window.open(getWhatsAppUrl(text), '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg glass-card rounded-3xl p-6 sm:p-8 border border-purple-500/30 bg-[#090d1e] shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center text-emerald-200">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-white mb-2">Free Consultation Booked!</h3>
            <p className="text-xs text-slate-300 max-w-sm mx-auto mb-6">
              Thank you {name}. Our senior web consultant will call you at {phone} within 2 hours.
            </p>
            <button
              onClick={handleWhatsAppInstant}
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 mx-auto shadow-lg"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Connect Immediately on WhatsApp</span>
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="p-2 rounded-xl bg-purple-500/20 text-purple-400">
                <PhoneCall className="w-4 h-4" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-purple-300 font-mono">
                Zero Pressure • 100% Free
              </span>
            </div>
            <h3 className="font-display text-2xl font-bold text-white mb-1">
              Book a Free Website Consultation
            </h3>
            <p className="text-xs text-slate-300 mb-6 leading-relaxed">
              Not sure which website package suits your budget? Tell us your business and we’ll guide you honestly.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Anand Murthy"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#050814] border border-white/10 focus:border-purple-500 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">WhatsApp / Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#050814] border border-white/10 focus:border-purple-500 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Business Niche</label>
                <select
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                  className="w-full bg-[#050814] border border-white/10 focus:border-purple-500 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none"
                >
                  <option value="Restaurant / Cafe">Restaurant / Cafe</option>
                  <option value="Clinic / Hospital">Clinic / Hospital</option>
                  <option value="Hotel / Resort">Hotel / Resort</option>
                  <option value="Coaching / Education">Coaching / Education</option>
                  <option value="Gym / Fitness">Gym / Fitness</option>
                  <option value="Real Estate">Real Estate</option>
                  <option value="Retail / Boutique">Retail / Boutique</option>
                  <option value="Other Business">Other Business</option>
                </select>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3 rounded-xl gradient-button text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-purple-600/30"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Request Call Back</span>}
                </button>
                <button
                  type="button"
                  onClick={handleWhatsAppInstant}
                  className="py-3 px-4 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 font-bold text-xs flex items-center justify-center gap-1.5"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Now</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
