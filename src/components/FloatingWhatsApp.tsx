import React, { useState } from 'react';
import { MessageCircle, X, Sparkles } from 'lucide-react';
import { getWhatsAppUrl, WHATSAPP_CONFIG } from '../utils/whatsapp';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  const whatsappUrl = getWhatsAppUrl(WHATSAPP_CONFIG.defaultHeroMessage);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-end gap-3 pointer-events-auto">
      {/* Tooltip Popup */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-[#090e22] text-white border border-emerald-500/40 px-3.5 py-2 rounded-2xl shadow-2xl animate-bounce-subtle text-xs">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-medium text-slate-200">
            Need a website? Chat directly on WhatsApp
          </span>
          <button 
            onClick={() => setShowTooltip(false)}
            className="text-slate-400 hover:text-white p-0.5"
            aria-label="Dismiss tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp with Nexora Technologies"
        className="w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-400 text-white flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:shadow-[0_0_40px_rgba(16,185,129,0.8)] hover:scale-110 active:scale-95 transition-all duration-300 relative group"
      >
        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 border-2 border-[#050510] flex items-center justify-center text-[9px] font-bold">
          1
        </span>
        <MessageCircle className="w-7 h-7 fill-white text-emerald-600 group-hover:scale-110 transition-transform" />
      </a>
    </div>
  );
};
