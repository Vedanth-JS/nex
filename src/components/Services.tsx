import React from 'react';
import { 
  Building, 
  UtensilsCrossed, 
  Stethoscope, 
  Hotel, 
  ShoppingBag, 
  GraduationCap, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  RefreshCw, 
  ShieldCheck, 
  Globe, 
  Server, 
  Search, 
  MapPin, 
  MessageCircle, 
  Info 
} from 'lucide-react';
import { MAIN_SERVICES, ADDITIONAL_SERVICES } from '../data/servicesData';
import { Card3D } from './3d/Card3D';

interface ServicesProps {
  onSelectService: (serviceName: string) => void;
  onOpenServiceDetail: (serviceId: string) => void;
}

const SERVICE_ICONS: Record<string, React.ElementType> = {
  business: Building,
  restaurant: UtensilsCrossed,
  clinic: Stethoscope,
  hotel: Hotel,
  ecommerce: ShoppingBag,
  education: GraduationCap,
};

const ADDITIONAL_ICONS: Record<string, React.ElementType> = {
  RefreshCw,
  ShieldCheck,
  Globe,
  Server,
  Search,
  MapPin,
  MessageCircle,
};

export const Services: React.FC<ServicesProps> = ({ 
  onSelectService, 
  onOpenServiceDetail 
}) => {
  return (
    <section id="services" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-[#050510]">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-semibold mb-4 shadow-[0_0_20px_rgba(139,92,246,0.25)]">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>High-Impact Web Solutions</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Specialized Website Services <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-300">
              Engineered for Your Business Model
            </span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed">
            Every business has distinct customer conversion pathways. We engineer websites tailored around your booking requirements, menu displays, product catalogs, and WhatsApp inquiries.
          </p>
        </div>

        {/* 6 Primary Services Grid with 3D Tilt */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {MAIN_SERVICES.map((srv) => {
            const Icon = SERVICE_ICONS[srv.id] || Building;
            return (
              <Card3D key={srv.id} intensity={10} glareOpacity={0.16}>
                <div
                  className="glass-card-3d rounded-3xl p-8 border border-white/10 hover:border-purple-500/50 transition-all duration-300 flex flex-col justify-between group h-full relative overflow-hidden bg-[#090d1e]/90"
                >
                  {/* Background Corner Glow */}
                  <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${srv.gradient} rounded-bl-full pointer-events-none transition-all group-hover:scale-150 group-hover:opacity-100 opacity-50`} />

                  <div style={{ transform: 'translateZ(20px)' }}>
                    {/* Top Bar with Number & Badge */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-13 h-13 p-3.5 rounded-2xl bg-white/5 border border-white/15 flex items-center justify-center text-purple-400 group-hover:bg-gradient-to-tr group-hover:from-purple-600 group-hover:to-cyan-500 group-hover:text-white transition-all shadow-md">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-slate-400">{srv.number}</span>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                          {srv.badge}
                        </span>
                      </div>
                    </div>

                    <h3 className="font-display text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {srv.title}
                    </h3>
                    <p className="text-xs font-semibold text-purple-400 uppercase tracking-wider mt-1 mb-3">
                      {srv.subtitle}
                    </p>
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                      {srv.description}
                    </p>

                    {/* Features List */}
                    <ul className="space-y-2.5 mb-8 border-t border-white/10 pt-5">
                      {srv.features.map((feature, i) => (
                        <li key={i} className="text-xs text-slate-300 flex items-start gap-2.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Card Actions: Learn More & Get a Quote per requirements */}
                  <div style={{ transform: 'translateZ(30px)' }} className="grid grid-cols-2 gap-2.5 pt-4 border-t border-white/10 mt-auto">
                    <button
                      onClick={() => onOpenServiceDetail(srv.id)}
                      className="py-3 rounded-xl bg-white/5 hover:bg-white/15 text-slate-200 hover:text-white text-xs font-bold flex items-center justify-center gap-1.5 border border-white/10 transition-colors cursor-pointer"
                    >
                      <Info className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Learn More</span>
                    </button>

                    <button
                      onClick={() => onSelectService(srv.title)}
                      className="py-3 rounded-xl gradient-button text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-purple-600/30 cursor-pointer"
                    >
                      <span>Get a Quote</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              </Card3D>
            );
          })}
        </div>

        {/* Additional Services Bar */}
        <div className="glass-card-3d rounded-3xl p-8 sm:p-10 border border-white/10 bg-[#090e20]/90">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Complete Digital Ecosystem</span>
            <h3 className="font-display text-2xl font-bold text-white mt-1">
              Essential Add-On Services For 360° Online Growth
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              From hosting and domain assistance to Google Business Profile verification, we handle the entire tech setup.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {ADDITIONAL_SERVICES.map((add, idx) => {
              const AddIcon = ADDITIONAL_ICONS[add.icon] || Sparkles;
              return (
                <div 
                  key={idx}
                  className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/40 rounded-2xl p-4 transition-all hover:scale-[1.02] shadow-sm"
                >
                  <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-3 shadow-inner">
                    <AddIcon className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">{add.title}</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{add.description}</p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
