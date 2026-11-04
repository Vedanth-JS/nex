import React, { createContext, useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, X, MessageSquare, Smartphone } from 'lucide-react';

export interface ToastItem {
  id: string;
  type: 'success' | 'error' | 'info';
  title?: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}

export interface DispatchNotification {
  type: 'sms' | 'whatsapp';
  recipient: string;
  title: string;
  token: string;
}

interface DemoStateContextType {
  toasts: ToastItem[];
  toast: {
    success: (message: string, title?: string, action?: { label: string; onClick: () => void }) => void;
    error: (message: string, title?: string) => void;
    info: (message: string, title?: string) => void;
    dismiss: (id: string) => void;
  };
  playChime: (type?: 'success' | 'alert' | 'pop') => void;
  activeModal: string | null;
  modalData: unknown;
  openModal: (name: string, data?: unknown) => void;
  closeModal: () => void;
  activeDispatch: DispatchNotification | null;
  triggerSimulatedDispatch: (type: 'sms' | 'whatsapp', payload: { recipient: string; title: string; token: string }) => void;
}

export const DemoStateContext = createContext<DemoStateContextType | null>(null);

function playAudioChime(type: 'success' | 'alert' | 'pop' = 'success') {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'success') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } else if (type === 'pop') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(660, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } else {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    }
  } catch {
    // Graceful fallback if audio context is blocked
  }
}

export const DemoStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [modalData, setModalData] = useState<unknown>(null);
  const [activeDispatch, setActiveDispatch] = useState<DispatchNotification | null>(null);

  const dismiss = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const addToast = useCallback((type: ToastItem['type'], message: string, title?: string, action?: { label: string; onClick: () => void }) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    playAudioChime(type === 'error' ? 'alert' : 'success');
    setToasts(prev => [...prev.slice(-3), {
      id,
      type,
      message,
      title,
      actionLabel: action?.label,
      onAction: action?.onClick
    }]);

    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  }, []);

  const toast = useMemo(() => ({
    success: (message: string, title?: string, action?: { label: string; onClick: () => void }) => 
      addToast('success', message, title, action),
    error: (message: string, title?: string) => 
      addToast('error', message, title),
    info: (message: string, title?: string) => 
      addToast('info', message, title),
    dismiss
  }), [addToast, dismiss]);

  const openModal = useCallback((name: string, data?: unknown) => {
    setActiveModal(name);
    setModalData(data || null);
  }, []);

  const closeModal = useCallback(() => {
    setActiveModal(null);
    setModalData(null);
  }, []);

  const triggerSimulatedDispatch = useCallback((type: 'sms' | 'whatsapp', payload: { recipient: string; title: string; token: string }) => {
    setActiveDispatch({ type, ...payload });
    playAudioChime('pop');
    toast.success(
      `Simulated ${type.toUpperCase()} sent to ${payload.recipient} with Token #${payload.token}`,
      `${payload.title} Confirmed`
    );
    setTimeout(() => {
      setActiveDispatch(null);
    }, 4000);
  }, [toast]);

  const value = useMemo(() => ({
    toasts,
    toast,
    playChime: playAudioChime,
    activeModal,
    modalData,
    openModal,
    closeModal,
    activeDispatch,
    triggerSimulatedDispatch
  }), [toasts, toast, activeModal, modalData, openModal, closeModal, activeDispatch, triggerSimulatedDispatch]);

  return (
    <DemoStateContext.Provider value={value}>
      {children}

      {/* Floating Animated Toast Stack */}
      <div 
        role="region" 
        aria-label="Notifications" 
        className="fixed top-4 right-4 z-[99999] pointer-events-none flex flex-col gap-2.5 max-w-sm w-full px-3"
      >
        <AnimatePresence mode="popLayout">
          {toasts.map(t => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className={`pointer-events-auto p-4 rounded-2xl backdrop-blur-xl border shadow-2xl flex items-start gap-3 text-left ${
                t.type === 'success'
                  ? 'bg-[#061e14]/95 border-emerald-500/40 text-emerald-100 shadow-emerald-950/50'
                  : t.type === 'error'
                  ? 'bg-[#260a0f]/95 border-rose-500/40 text-rose-100 shadow-rose-950/50'
                  : 'bg-[#0f172a]/95 border-blue-500/40 text-blue-100 shadow-slate-950/50'
              }`}
            >
              <div className="shrink-0 mt-0.5">
                {t.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                {t.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-400" />}
                {t.type === 'info' && <Info className="w-5 h-5 text-blue-400" />}
              </div>

              <div className="flex-1 min-w-0 pr-1">
                {t.title && <h4 className="text-xs font-bold text-white mb-0.5">{t.title}</h4>}
                <p className="text-xs text-slate-300 leading-relaxed break-words">{t.message}</p>
                {t.actionLabel && t.onAction && (
                  <button
                    onClick={() => {
                      t.onAction?.();
                      dismiss(t.id);
                    }}
                    className="mt-2 text-xs font-bold text-emerald-400 hover:text-emerald-300 underline underline-offset-2 flex items-center gap-1 cursor-pointer"
                  >
                    {t.actionLabel}
                  </button>
                )}
              </div>

              <button
                onClick={() => dismiss(t.id)}
                className="text-white/40 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors shrink-0"
                aria-label="Dismiss notification"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Live Simulated Dispatch Pill */}
        <AnimatePresence>
          {activeDispatch && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: -10 }}
              className="pointer-events-auto p-3 rounded-xl bg-gradient-to-r from-emerald-950/90 to-teal-950/90 border border-emerald-500/40 text-emerald-200 shadow-xl flex items-center gap-2.5 text-xs font-medium backdrop-blur-md"
            >
              {activeDispatch.type === 'whatsapp' ? (
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0 animate-bounce" />
              ) : (
                <Smartphone className="w-4 h-4 text-teal-400 shrink-0 animate-pulse" />
              )}
              <span className="truncate">
                Simulated {activeDispatch.type.toUpperCase()} confirmation sent to <strong className="text-white">{activeDispatch.recipient}</strong>
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DemoStateContext.Provider>
  );
};

export { useDemoState } from './useDemoState';
