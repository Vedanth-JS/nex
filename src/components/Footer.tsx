import React from 'react';
import { 
  ArrowUp, 
  MessageCircle, 
  Mail, 
  Phone, 
  MapPin, 
  Globe
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

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Industries', href: '#industries' },
    { name: 'Our Work', href: '#portfolio' },
    { name: 'Live Demos', href: '#demos' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  const serviceLinks = [
    'Business Websites',
    'Restaurant Websites',
    'Clinic Websites',
    'E-commerce Websites',
    'Hotel Websites',
    'Website Maintenance',
  ];

  const socialLinks = [
    { name: 'WhatsApp', href: getWhatsAppUrl(WHATSAPP_CONFIG.defaultHeroMessage), icon: MessageCircle, color: 'hover:text-emerald-400' },
    { name: 'LinkedIn', href: 'https://linkedin.com', icon: LinkedinIcon, color: 'hover:text-blue-400' },
    { name: 'Instagram', href: 'https://instagram.com', icon: InstagramIcon, color: 'hover:text-pink-400' },
    { name: 'GitHub', href: 'https://github.com', icon: GithubIcon, color: 'hover:text-purple-400' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#030308] border-t border-white/10 pt-16 pb-12 px-4 sm:px-6 lg:px-8 text-slate-400 text-xs relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#8B5CF6] via-[#2563EB] to-[#22D3EE] p-[1.5px] shadow-lg shadow-purple-500/20">
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
              We design and develop modern, affordable, high-converting websites for local businesses, shops, clinics, restaurants, and educational institutions.
            </p>

            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    className={`w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 ${s.color} hover:bg-white/10 transition-all`}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((item) => (
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

          {/* Services */}
          <div>
            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-white mb-4">
              Services
            </h4>
            <ul className="space-y-2.5">
              {serviceLinks.map((item) => (
                <li key={item}>
                  <a
                    href="#contact"
                    onClick={(e) => handleNavClick(e, '#contact')}
                    className="hover:text-cyan-400 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-white mb-4">
              Connect With Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{WHATSAPP_CONFIG.agencyPhoneFormatted}</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <span className="break-all">{WHATSAPP_CONFIG.agencyEmail}</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>Karnataka, India</span>
              </li>
            </ul>

            <div className="mt-5">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors text-[11px]"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>Back to Top</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-[11px]">
          <p>© 2026 Nexora Technologies. All Rights Reserved.</p>
          <p className="flex items-center gap-1">
            <span>Engineered with passion for local business success</span>
          </p>
        </div>

      </div>
    </footer>
  );
};
