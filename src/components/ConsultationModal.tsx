import React, { useState, useEffect } from 'react';
import { X, PhoneCall, MessageCircle, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { getWhatsAppUrl, openWhatsApp, formatDisplayPhoneNumber, CONFIGURED_PHONE_NUMBER } from '../utils/whatsapp';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [businessType, setBusinessType] = useState('Restaurant / Cafe');
  const [botField, setBotField] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [fieldError, setFieldError] = useState('');

  // Lock body scroll and mark modal state for floating widgets
  useEffect(() => {
    if (isOpen) {
      document.body.setAttribute('data-modal-open', 'true');
    } else {
      document.body.removeAttribute('data-modal-open');
    }
    return () => {
      document.body.removeAttribute('data-modal-open');
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const consultationMessage = `Hello Nexora Technologies! I would like to book a free 10-minute consultation for my business (${businessType}). My name is ${name.trim() || 'a business owner'}. Phone: ${phone.trim() || 'Not provided'}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldError('');
    setErrorMessage('');

    // Honeypot check
    if (botField) return;

    if (!name.trim()) {
      setFieldError('Please enter your name');
      return;
    }

    const cleanPhone = phone.replace(/\D/g, '').replace(/^91/, '');
    if (!cleanPhone || cleanPhone.length !== 10 || !/^[6-9]\d{9}$/.test(cleanPhone)) {
      setFieldError('Please enter a valid 10-digit Indian phone number (e.g. 9876543210)');
      return;
    }

    setLoading(true);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          'form-name': 'consultation',
          'bot-field': botField,
          name: name.trim(),
          phone: cleanPhone,
          businessType,
        }).toString(),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }

      setLoading(false);
      setSubmitted(true);
    } catch {
      clearTimeout(timeoutId);
      setLoading(false);
      setErrorMessage("Couldn't send right now. Please tap Send on WhatsApp instead.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#07070D]/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg glass-card-3d rounded-3xl p-6 sm:p-8 border border-aurora-violet/40 bg-aurora-elevated shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close consultation modal"
          className="absolute top-4 right-4 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 active:scale-95 text-aurora-muted hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center text-emerald-200">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-white mb-2">Free Consultation Booked!</h3>
            <p className="text-xs text-aurora-muted max-w-sm mx-auto mb-6 leading-relaxed">
              Thank you <strong className="text-white">{name}</strong>. Our senior web consultant will call you at <strong className="text-white">{phone}</strong> within 2 hours.
            </p>
            <a
              href={getWhatsAppUrl(consultationMessage)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Connect immediately on WhatsApp"
              className="min-h-[48px] px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 mx-auto shadow-lg transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Connect Immediately on WhatsApp</span>
            </a>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="p-2 rounded-xl bg-aurora-violet/20 text-aurora-amber">
                <PhoneCall className="w-4 h-4" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-aurora-amber font-mono">
                Zero Pressure • 100% Free
              </span>
            </div>
            <h3 className="font-display text-2xl font-bold text-white mb-1">
              Book a Free Website Consultation
            </h3>
            <p className="text-xs text-aurora-muted mb-5 leading-relaxed">
              Not sure which website package suits your budget? Tell us your business and we’ll guide you honestly.
            </p>

            {errorMessage && (
              <div className="mb-4 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
                <a
                  href={getWhatsAppUrl(consultationMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Send consultation request on WhatsApp"
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-bold text-[11px] uppercase tracking-wider flex items-center gap-1.5 shrink-0 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Send on WhatsApp</span>
                </a>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Hidden Netlify honeypot */}
              <input
                type="text"
                name="bot-field"
                value={botField}
                onChange={(e) => setBotField(e.target.value)}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <div>
                <label className="block text-xs font-medium text-aurora-text mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Anand Murthy"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (fieldError) setFieldError('');
                  }}
                  className="w-full min-h-[44px] bg-aurora-surface border border-white/10 focus:border-aurora-amber rounded-xl px-4 py-2.5 text-base sm:text-xs text-white focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-aurora-text mb-1">WhatsApp / Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder={formatDisplayPhoneNumber(CONFIGURED_PHONE_NUMBER)}
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (fieldError) setFieldError('');
                  }}
                  className={`w-full min-h-[44px] bg-aurora-surface border rounded-xl px-4 py-2.5 text-base sm:text-xs text-white focus:outline-none transition-colors ${
                    fieldError ? 'border-rose-500' : 'border-white/10 focus:border-aurora-amber'
                  }`}
                />
                {fieldError && (
                  <p className="mt-1 text-[11px] text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{fieldError}</span>
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-aurora-text mb-1">Business Niche</label>
                <select
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                  className="w-full min-h-[44px] bg-aurora-surface border border-white/10 focus:border-aurora-amber rounded-xl px-3 py-2.5 text-base sm:text-xs text-white focus:outline-none transition-colors"
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
                  aria-label="Request consultation call back"
                  className="flex-1 min-h-[48px] py-3 rounded-xl btn-amber-cta text-xs uppercase tracking-wider flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Request Call Back</span>}
                </button>
                <button
                  type="button"
                  onClick={() => openWhatsApp(consultationMessage)}
                  aria-label="Open WhatsApp consultation directly"
                  className="min-h-[48px] py-3 px-4 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 active:scale-95 text-emerald-300 border border-emerald-500/30 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
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

export default ConsultationModal;
