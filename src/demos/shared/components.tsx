// Shared UI components for all Nexora demo sites
import React from 'react';
import { CheckCircle2, XCircle, Info, X, MessageCircle } from 'lucide-react';
import type { Toast } from './hooks';
import { getWhatsAppUrl } from '../../utils/whatsapp';

/** Small branded demo badge */
export const DemoBadge: React.FC = () => (
  <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
    <span className="text-[10px] font-mono px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md text-white/50 border border-white/10">
      Demo concept by Nexora Technologies · Sample data only
    </span>
  </div>
);

/** Toast renderer */
export const ToastContainer: React.FC<{ toasts: Toast[]; dismiss: (id: string) => void }> = ({ toasts, dismiss }) => (
  <div
    role="status"
    aria-live="polite"
    className="fixed top-4 right-4 z-[9999] space-y-2 max-w-xs pointer-events-none"
  >
    {toasts.map(t => (
      <div
        key={t.id}
        className={`flex items-start gap-2 p-3 rounded-xl backdrop-blur-md shadow-2xl border pointer-events-auto transition-all ${
          t.type === 'success' ? 'bg-emerald-950/90 border-emerald-500/40 text-emerald-200' :
          t.type === 'error'   ? 'bg-rose-950/90 border-rose-500/40 text-rose-200' :
          'bg-slate-900/90 border-white/15 text-slate-200'
        }`}
      >
        {t.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" /> :
         t.type === 'error'   ? <XCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" /> :
         <Info className="w-4 h-4 shrink-0 text-blue-400 mt-0.5" />}
        <p className="text-xs flex-1 leading-snug">{t.message}</p>
        <button onClick={() => dismiss(t.id)} className="text-current opacity-50 hover:opacity-100 ml-1">
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    ))}
  </div>
);

/** Generic stepper button group */
export const Stepper: React.FC<{
  label: string;
  value: number;
  min?: number;
  max?: number;
  onChange: (v: number) => void;
  className?: string;
}> = ({ label, value, min = 1, max = 20, onChange, className = '' }) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <span className="text-xs text-slate-400 mr-1">{label}:</span>
    <button
      type="button"
      aria-label={`Decrease ${label}`}
      onClick={() => onChange(Math.max(min, value - 1))}
      disabled={value <= min}
      className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-40 flex items-center justify-center font-bold text-white transition-colors"
    >−</button>
    <span className="text-sm font-bold text-white w-6 text-center">{value}</span>
    <button
      type="button"
      aria-label={`Increase ${label}`}
      onClick={() => onChange(Math.min(max, value + 1))}
      disabled={value >= max}
      className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-40 flex items-center justify-center font-bold text-white transition-colors"
    >+</button>
  </div>
);

/** WhatsApp floating / inline CTA button */
export const WhatsAppButton: React.FC<{
  message: string;
  label?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}> = ({ message, label = 'Chat on WhatsApp', className = '', size = 'md' }) => {
  const sizeClass = size === 'sm' ? 'px-3 py-2 text-xs' : size === 'lg' ? 'px-6 py-4 text-sm' : 'px-4 py-2.5 text-xs';
  return (
    <a
      href={getWhatsAppUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-all shadow-lg shadow-emerald-900/30 focus:outline-none focus:ring-2 focus:ring-emerald-400 ${sizeClass} ${className}`}
    >
      <MessageCircle className="w-4 h-4" />
      {label}
    </a>
  );
};

/** Skeleton image with blur-up and gradient fallback */
export const SkeletonImage: React.FC<{
  src: string;
  alt: string;
  className?: string;
  fallbackGradient?: string;
  width?: number;
  height?: number;
}> = ({ src, alt, className = '', fallbackGradient = 'from-slate-800 to-slate-900', width, height }) => {
  const [status, setStatus] = React.useState<'loading' | 'loaded' | 'error'>('loading');
  return (
    <div className={`relative overflow-hidden bg-gradient-to-br ${fallbackGradient} ${className}`}>
      {status === 'loading' && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-[shimmer_1.5s_infinite]" />
      )}
      {status !== 'error' && (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('error')}
          className={`w-full h-full object-cover transition-opacity duration-500 ${status === 'loaded' ? 'opacity-100' : 'opacity-0'}`}
        />
      )}
      {status === 'error' && (
        <div className="absolute inset-0 flex items-center justify-center text-white/20 text-xs font-mono">
          {alt}
        </div>
      )}
    </div>
  );
};

/** Reveal-on-scroll wrapper */
export const Reveal: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
}> = ({ children, className = '', delay = 0 }) => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}
    >
      {children}
    </div>
  );
};

/** FAQ accordion item */
export const AccordionItem: React.FC<{
  question: string;
  answer: string;
  accentColor?: string;
}> = ({ question, answer, accentColor = 'text-amber-400' }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="border border-white/10 rounded-xl overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        className="w-full text-left p-4 flex items-center justify-between gap-3 hover:bg-white/5 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white/20"
      >
        <span className="text-sm font-semibold text-white">{question}</span>
        <span className={`text-lg font-bold transition-transform ${open ? 'rotate-45' : ''} ${accentColor}`}>+</span>
      </button>
      {open && (
        <div className="px-4 pb-4 text-sm text-slate-300 leading-relaxed border-t border-white/5 pt-3">
          {answer}
        </div>
      )}
    </div>
  );
};

/** Demo-only disclaimer note for forms */
export const DemoFormNote: React.FC<{ className?: string }> = ({ className = '' }) => (
  <p className={`text-[10px] text-slate-400 italic ${className}`}>
    Demo only — nothing is saved, sent, or submitted. All form data is cleared on page refresh.
  </p>
);

/** Inline validation error */
export const FieldError: React.FC<{ error?: string }> = ({ error }) =>
  error ? <p className="text-xs text-rose-400 mt-1" role="alert">{error}</p> : null;

/** Empty state component */
export const EmptyState: React.FC<{ icon?: string; title: string; description?: string; className?: string }> = ({
  icon = '🔍',
  title,
  description,
  className = ''
}) => (
  <div className={`py-12 text-center ${className}`}>
    <div className="text-4xl mb-3">{icon}</div>
    <p className="text-sm font-semibold text-white/70">{title}</p>
    {description && <p className="text-xs text-slate-400 mt-1">{description}</p>}
  </div>
);

