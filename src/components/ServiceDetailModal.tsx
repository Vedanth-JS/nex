import React from 'react';
import { 
  X, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  Clock, 
  ShieldCheck, 
  Layers, 
  ExternalLink 
} from 'lucide-react';
import { MAIN_SERVICES } from '../data/servicesData';
import { DemoId } from '../types';

interface ServiceDetailModalProps {
  isOpen: boolean;
  serviceId: string | null;
  onClose: () => void;
  onGetQuote: (serviceTitle: string) => void;
  onViewDemo?: (demoId: DemoId) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  isOpen,
  serviceId,
  onClose,
  onGetQuote,
  onViewDemo
}) => {
  if (!isOpen || !serviceId) return null;

  const service = MAIN_SERVICES.find(s => s.id === serviceId) || MAIN_SERVICES[0];

  const handleGetQuote = () => {
    onClose();
    onGetQuote(service.title);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#07070D]/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl glass-card-3d rounded-3xl p-6 sm:p-10 border border-aurora-violet/40 bg-aurora-elevated shadow-[0_25px_70px_rgba(0,0,0,0.9)] max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-aurora-muted hover:text-white transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Badges */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-aurora-violet/20 text-aurora-amber border border-aurora-violet/40 font-mono">
            Service {service.number}
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-aurora-amber/15 text-aurora-amber border border-aurora-amber/30">
            {service.badge}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-1">
          {service.title}
        </h3>
        <p className="text-xs font-semibold uppercase tracking-wider text-aurora-violet mb-4">
          {service.subtitle}
        </p>

        {/* Detailed Description */}
        <p className="text-aurora-muted text-sm leading-relaxed mb-6">
          {service.description}
        </p>

        {/* Deliverables List */}
        <div className="bg-aurora-surface/80 border border-white/10 rounded-2xl p-5 mb-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-aurora-text mb-3 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-aurora-amber" />
            <span>What's Included in This Solution:</span>
          </h4>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {service.features.map((feat, i) => (
              <li key={i} className="text-xs text-aurora-muted flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Production Guarantees */}
        <div className="grid grid-cols-3 gap-3 mb-8 text-center text-xs">
          <div className="bg-aurora-surface p-3 rounded-xl border border-white/5">
            <Clock className="w-4 h-4 text-aurora-amber mx-auto mb-1" />
            <p className="font-bold text-white">3-7 Days</p>
            <p className="text-[10px] text-aurora-muted">Typical Delivery</p>
          </div>
          <div className="bg-aurora-surface p-3 rounded-xl border border-white/5">
            <ShieldCheck className="w-4 h-4 text-aurora-violet mx-auto mb-1" />
            <p className="font-bold text-white">100% Responsive</p>
            <p className="text-[10px] text-aurora-muted">iOS & Android</p>
          </div>
          <div className="bg-aurora-surface p-3 rounded-xl border border-white/5">
            <Layers className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
            <p className="font-bold text-white">SEO & WhatsApp</p>
            <p className="text-[10px] text-aurora-muted">Integrated</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {service.demoId && onViewDemo && (
            <button
              onClick={() => {
                onClose();
                onViewDemo(service.demoId as DemoId);
              }}
              className="w-full sm:w-auto flex-1 py-3.5 rounded-xl btn-glass-secondary text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Explore Live Working Demo</span>
              <ExternalLink className="w-3.5 h-3.5 text-aurora-amber" />
            </button>
          )}
          <button
            onClick={handleGetQuote}
            className="w-full sm:w-auto flex-1 py-3.5 rounded-xl btn-amber-cta text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Get Quote for {service.title.split(' ')[0]}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};

export default ServiceDetailModal;
