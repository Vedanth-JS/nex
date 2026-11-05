import React from 'react';
import { 
  ArrowUp, 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle,
} from 'lucide-react';
import { WHATSAPP_CONFIG, getWhatsAppUrl } from '../utils/whatsapp';
import { scrollToSection } from '../utils/scroll';

const InstagramIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const LinkedinIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const GithubIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const companyLinks = [
    { name: 'About Us', href: '#about' },
    { name: 'Why Nexora', href: '#services' },
    { name: 'Working Process', href: '#process' },
    { name: 'Pricing Packages', href: '#pricing' },
    { name: 'Direct Contact', href: '#contact' },
  ];

  const serviceLinks = [
    { name: 'Business Websites', href: '#services' },
    { name: 'Restaurant & Cafe Portals', href: '#services' },
    { name: 'Healthcare & Clinic Sites', href: '#services' },
    { name: 'Resort & Hotel Showcases', href: '#services' },
    { name: 'E-commerce Platforms', href: '#services' },
  ];

  const connectLinks = [
    { 
      name: 'Direct WhatsApp', 
      href: getWhatsAppUrl(WHATSAPP_CONFIG.defaultHeroMessage), 
      icon: MessageCircle,
      color: 'hover:text-emerald-400'
    },
    { 
      name: 'Instagram (@nexora__technologies)', 
      href: WHATSAPP_CONFIG.instagramUrl, 
      icon: InstagramIcon,
      color: 'hover:text-aurora-magenta'
    },
    { 
      name: 'LinkedIn', 
      href: 'https://linkedin.com', 
      icon: LinkedinIcon,
      color: 'hover:text-aurora-amber'
    },
    { 
      name: 'GitHub', 
      href: 'https://github.com', 
      icon: GithubIcon,
      color: 'hover:text-white'
    },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    scrollToSection(href);
  };

  return (
    <footer className="bg-[#07070D] border-t border-white/10 pt-16 pb-12 px-4 sm:px-6 lg:px-8 text-aurora-muted text-xs relative overflow-hidden">
      {/* Gentle rising particle zone in sync with World3D module 5 */}
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Top Multi-column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 flex items-center justify-center rounded-xl bg-aurora-surface/80 border border-white/10 p-1.5 shadow-lg shadow-aurora-violet/25">
                <img 
                  src="/logo.png" 
                  alt="Nexora Technologies Logo" 
                  className="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(124,92,255,0.45)]"
                />
              </div>
              <div>
                <span className="font-display font-black text-lg tracking-tight text-white">
                  NEXORA <span className="headline-shimmer">TECHNOLOGIES</span>
                </span>
                <span className="block text-[10px] tracking-wider uppercase text-aurora-muted font-medium">
                  Building Digital Experiences.
                </span>
              </div>
            </div>

            <p className="text-aurora-text text-xs leading-relaxed max-w-sm pt-2">
              Professional website development agency specializing in modern, high-performance, and conversion-focused websites for local businesses and entrepreneurs.
            </p>

            <div className="pt-2 text-aurora-muted space-y-2">
              <p className="flex items-center gap-2 text-xs">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a href={WHATSAPP_CONFIG.telHref} className="text-aurora-text font-medium hover:text-emerald-300 transition-colors" aria-label="Call Nexora Technologies">
                  {WHATSAPP_CONFIG.agencyPhoneFormatted}
                </a>
              </p>
              <p className="flex items-center gap-2 text-xs">
                <Mail className="w-3.5 h-3.5 text-aurora-violet shrink-0" />
                <a href={`mailto:${WHATSAPP_CONFIG.agencyEmail}`} className="text-aurora-text hover:text-aurora-violet transition-colors" aria-label="Email Nexora Technologies">
                  {WHATSAPP_CONFIG.agencyEmail}
                </a>
              </p>
              <p className="flex items-center gap-2 text-xs">
                <MapPin className="w-3.5 h-3.5 text-aurora-amber shrink-0" />
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
                    className="hover:text-aurora-amber transition-colors"
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
                    className="hover:text-aurora-amber transition-colors"
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
                      className={`flex items-center gap-2.5 text-aurora-muted ${item.color} transition-colors group`}
                    >
                      <Icon className="w-4 h-4 text-aurora-muted group-hover:scale-110 transition-transform" />
                      <span>{item.name}</span>
                    </a>
                  </li>
                );
              })}
            </ul>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-aurora-muted hover:text-white border border-white/10 transition-colors text-[11px] cursor-pointer"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Back to Top</span>
            </button>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-aurora-muted text-[11px]">
          <p>© 2026 Nexora Technologies. All Rights Reserved.</p>
          <p className="flex items-center gap-1 text-aurora-muted">
            <span>Building Digital Experiences for Growing Businesses</span>
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
