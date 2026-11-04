import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { getWhatsAppUrl, WHATSAPP_CONFIG } from '../utils/whatsapp';

export const FloatingWhatsApp: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(() => {
    if (typeof window === 'undefined') return false;
    try {
      const isDismissed = localStorage.getItem('nexora_whatsapp_tooltip_dismissed');
      return !isDismissed;
    } catch {
      return true;
    }
  });

  // Hide button whenever a full-screen modal (e.g. DemoViewerModal or ConsultationModal) is active
  useEffect(() => {
    const checkModalState = () => {
      if (typeof document === 'undefined') return;
      const isLocked =
        document.body.style.overflow === 'hidden' ||
        document.body.hasAttribute('data-modal-open') ||
        document.body.hasAttribute('data-demo-modal-open');
      setIsModalOpen(Boolean(isLocked));
    };

    checkModalState();
    const observer = new MutationObserver(checkModalState);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['style', 'data-modal-open', 'data-demo-modal-open'],
    });

    return () => observer.disconnect();
  }, []);

  const handleDismiss = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowTooltip(false);
    try {
      localStorage.setItem('nexora_whatsapp_tooltip_dismissed', 'true');
    } catch {
      // storage unavailable
    }
  };

  const whatsappUrl = getWhatsAppUrl(WHATSAPP_CONFIG.defaultHeroMessage);

  if (isModalOpen) return null;

  return (
    <div className="fixed bottom-[calc(1.5rem+env(safe-area-inset-bottom,0px))] right-4 sm:right-6 z-40 flex items-center gap-3 pointer-events-auto">
      {/* Merged Single Dismissible Tooltip */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2.5 bg-aurora-elevated/95 text-white border border-emerald-500/40 px-3.5 py-2 rounded-2xl shadow-2xl backdrop-blur-md text-xs animate-fade-in group">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat directly on WhatsApp"
            className="font-medium text-aurora-text hover:text-emerald-300 transition-colors"
          >
            Need a website? Chat directly on WhatsApp
          </a>
          <button 
            type="button"
            onClick={handleDismiss}
            className="text-aurora-muted hover:text-white p-1 rounded-md hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Dismiss tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Action Button with min 48px tap target */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp with Nexora Technologies"
        className="w-13 h-13 min-w-[48px] min-h-[48px] sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-400 text-white flex items-center justify-center shadow-[0_0_25px_rgba(16,185,129,0.45)] hover:shadow-[0_0_35px_rgba(16,185,129,0.7)] hover:scale-105 active:scale-95 transition-all duration-300 relative group cursor-pointer"
      >
        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 border-2 border-[#07070D] flex items-center justify-center text-[9px] font-bold">
          1
        </span>
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 fill-white text-emerald-600 group-hover:scale-110 transition-transform" />
      </a>
    </div>
  );
};

export default FloatingWhatsApp;
