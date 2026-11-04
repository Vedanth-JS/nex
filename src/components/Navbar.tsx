import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  ArrowRight, 
  MessageCircle,
} from 'lucide-react';
import { WHATSAPP_CONFIG, getWhatsAppUrl } from '../utils/whatsapp';
import { DemoId } from '../types';

interface NavbarProps {
  onOpenDemo: (id: DemoId) => void;
  onOpenConsultation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenDemo: _onOpenDemo, onOpenConsultation: _onOpenConsultation }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Simple active link spy
      const sections = ['home', 'services', 'industries', 'demos', 'pricing', 'process', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'Services', href: '#services', id: 'services' },
    { name: 'Industries', href: '#industries', id: 'industries' },
    { name: 'Demos', href: '#demos', id: 'demos' },
    { name: 'Pricing', href: '#pricing', id: 'pricing' },
    { name: 'Process', href: '#process', id: 'process' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (e: React.MouseEvent, href: string, id: string) => {
    e.preventDefault();
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#07070D]/85 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.8)] py-3' 
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* Brand Logo with Official Emblem */}
          <a 
            href="#home" 
            onClick={(e) => handleNavClick(e, '#home', 'home')}
            className="flex items-center gap-3 group focus:outline-none shrink-0"
          >
            <div className="relative w-11 h-11 flex items-center justify-center rounded-xl bg-aurora-surface/80 border border-white/10 p-1.5 shadow-lg shadow-aurora-violet/25 group-hover:border-aurora-amber/40 group-hover:shadow-aurora-amber/30 transition-all duration-300">
              <img 
                src="/logo.png" 
                alt="Nexora Technologies Logo" 
                className="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(124,92,255,0.45)] group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div>
              <span className="font-display font-extrabold text-base sm:text-lg tracking-tight text-white flex items-center gap-1.5">
                NEXORA <span className="headline-shimmer">TECHNOLOGIES</span>
              </span>
              <span className="block text-[10px] tracking-wider uppercase text-aurora-muted font-medium">
                Building Digital Experiences.
              </span>
            </div>
          </a>

          {/* Clean Desktop Navigation Bar */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 bg-aurora-surface/70 border border-white/10 rounded-full px-3 py-1.5 shadow-inner backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href, link.id)}
                  className={`px-3 py-1.5 rounded-full text-xs xl:text-sm transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-aurora-violet/25 text-white font-semibold shadow-sm border border-aurora-violet/40'
                      : 'text-aurora-muted hover:text-white hover:bg-white/5 font-medium'
                  }`}
                >
                  <span>{link.name}</span>
                </a>
              );
            })}
          </nav>

          {/* Right Action CTAs */}
          <div className="hidden sm:flex items-center gap-2.5 shrink-0">
            {/* Direct WhatsApp Action */}
            <a
              href={getWhatsAppUrl(WHATSAPP_CONFIG.defaultHeroMessage)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp with Nexora Technologies"
              className="min-h-[44px] px-3.5 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 active:scale-95 text-emerald-400 border border-emerald-500/30 transition-all text-xs font-semibold flex items-center gap-1.5 shadow-sm"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp</span>
            </a>

            {/* Primary Action Button (Amber CTA) */}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact', 'contact')}
              className="px-5 py-2.5 rounded-xl btn-amber-cta text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer group"
            >
              <span>GET YOUR WEBSITE</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact', 'contact')}
              className="px-3 py-1.5 rounded-lg btn-amber-cta font-bold text-[11px] uppercase tracking-wider sm:hidden"
            >
              Get Website
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-white/5 text-aurora-muted hover:text-white border border-white/10 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#07070D]/95 backdrop-blur-2xl border-b border-white/10 px-4 pt-4 pb-6 animate-in slide-in-from-top-4 duration-200">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href, link.id)}
                  className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-aurora-violet/20 text-white font-semibold border border-aurora-violet/30'
                      : 'text-aurora-text hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{link.name}</span>
                </a>
              );
            })}
          </div>

          <div className="mt-5 pt-4 border-t border-white/10 grid grid-cols-2 gap-2">
            <a
              href={getWhatsAppUrl(WHATSAPP_CONFIG.defaultHeroMessage)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp with Nexora Technologies"
              className="w-full min-h-[44px] py-2.5 rounded-xl bg-emerald-600/20 active:scale-95 text-emerald-300 border border-emerald-500/30 font-semibold text-xs flex items-center justify-center gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact', 'contact')}
              className="w-full py-2.5 rounded-xl btn-amber-cta text-xs uppercase tracking-wider flex items-center justify-center gap-1.5"
            >
              <span>Get Website</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
