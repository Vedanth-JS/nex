import React from 'react';
import { 
  ArrowUp, 
  MessageCircle, 
  Mail, 
  Phone, 
  MapPin, 
  Sparkles
} from 'lucide-react';
import { getWhatsAppUrl, WHATSAPP_CONFIG } from '../utils/whatsapp';

// Clean brand SVG components
const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const FacebookIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const LinkedinIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GithubIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const companyLinks = [
    { name: 'About Us', href: '#about' },
    { name: 'Our Services', href: '#services' },
    { name: 'Industries', href: '#industries' },
    { name: 'Our Work', href: '#portfolio' },
    { name: 'Contact', href: '#contact' },
  ];

  const serviceLinks = [
    { name: 'Business Websites', href: '#services' },
    { name: 'Restaurant Websites', href: '#services' },
    { name: 'Clinic Websites', href: '#services' },
    { name: 'E-commerce Websites', href: '#services' },
    { name: 'Hotel Websites', href: '#services' },
    { name: 'Website Maintenance', href: '#services' },
  ];

  const connectLinks = [
    { name: 'Instagram', href: 'https://instagram.com', icon: InstagramIcon, color: 'hover:text-pink-400' },
    { name: 'Facebook', href: 'https://facebook.com', icon: FacebookIcon, color: 'hover:text-blue-500' },
    { name: 'LinkedIn', href: 'https://linkedin.com', icon: LinkedinIcon, color: 'hover:text-blue-400' },
    { name: 'GitHub', href: 'https://github.com/Vedanth-JS/nex', icon: GithubIcon, color: 'hover:text-purple-400' },
    { name: 'WhatsApp', href: getWhatsAppUrl(WHATSAPP_CONFIG.defaultHeroMessage), icon: MessageCircle, color: 'hover:text-emerald-400' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#030308] border-t border-white/10 pt-16 pb-12 px-4 sm:px-6 lg:px-8 text-slate-400 text-xs relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Multi-column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Column (NEXORA TECHNOLOGIES / Building Digital Experiences) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#8B5CF6] via-[#2563EB] to-[#22D3EE] p-[1.5px] shadow-lg shadow-purple-500/20">
                <div className="w-full h-full bg-[#050510] rounded-[10px] flex items-center justify-center font-display font-black text-lg text-white">
                  N
                </div>
              </div>
              <div>
                <span className="font-display font-black text-lg tracking-tight text-white">
                  NEXORA <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">TECHNOLOGIES</span>
                </span>
                <span className="block text-[10px] tracking-wider uppercase text-slate-400 font-medium">
                  Building Digital Experiences.
                </span>
              </div>
            </div>

            <p className="text-slate-300 text-xs leading-relaxed max-w-sm pt-2">
              Professional website development agency specializing in modern, high-performance, and conversion-focused websites for local businesses and entrepreneurs.
            </p>

            <div className="pt-2 text-slate-400 space-y-2">
              <p className="flex items-center gap-2 text-xs">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="text-slate-300 font-medium">{WHATSAPP_CONFIG.agencyPhoneFormatted}</span>
              </p>
              <p className="flex items-center gap-2 text-xs">
                <Mail className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span className="text-slate-300">{WHATSAPP_CONFIG.agencyEmail}</span>
              </p>
              <p className="flex items-center gap-2 text-xs">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Karnataka, India</span>
              </p>
            </div>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-white mb-4">
              Company
            </h4>
            <ul className="space-y-2.5">
              {companyLinks.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="hover:text-cyan-400 transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-white mb-4">
              Services
            </h4>
            <ul className="space-y-2.5">
              {serviceLinks.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="hover:text-cyan-400 transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Column */}
          <div>
            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-white mb-4">
              Connect
            </h4>
            <ul className="space-y-2.5 mb-6">
              {connectLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-2.5 text-slate-300 ${item.color} transition-colors group`}
                    >
                      <Icon className="w-4 h-4 text-slate-400 group-hover:scale-110 transition-transform" />
                      <span>{item.name}</span>
                    </a>
                  </li>
                );
              })}
            </ul>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors text-[11px]"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Back to Top</span>
            </button>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-[11px]">
          <p>© 2026 Nexora Technologies. All Rights Reserved.</p>
          <p className="flex items-center gap-1 text-slate-400">
            <span>Building Digital Experiences for Growing Businesses</span>
          </p>
        </div>

      </div>
    </footer>
  );
};
