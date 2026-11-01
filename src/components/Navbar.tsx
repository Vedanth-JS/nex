import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  ArrowRight, 
  MessageCircle
} from 'lucide-react';
import { getWhatsAppUrl, WHATSAPP_CONFIG } from '../utils/whatsapp';

interface NavbarProps {
  onOpenDemo?: (demoId: 'restaurant' | 'clinic' | 'hotel' | 'coaching' | 'gym' | 'real-estate') => void;
  onOpenConsultation?: () => void;
}

export const Navbar: React.FC<NavbarProps> = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Exact clean center nav links per Section 2 specification
  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'Services', href: '#services', id: 'services' },
    { name: 'Industries', href: '#industries', id: 'industries' },
    { name: 'Our Work', href: '#portfolio', id: 'portfolio' },
    { name: 'Pricing', href: '#pricing', id: 'pricing' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  // Track scroll position for background blur and active section
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Detect active section
      const sections = navLinks.map(link => document.querySelector(link.href) as HTMLElement | null);
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navLinks[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, id: string) => {
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
          ? 'bg-[#050510]/85 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.6)] py-3' 
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <a 
            href="#home" 
            onClick={(e) => handleNavClick(e, '#home', 'home')}
            className="flex items-center gap-3 group focus:outline-none shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#8B5CF6] via-[#2563EB] to-[#22D3EE] p-[1.5px] shadow-lg shadow-purple-500/25 group-hover:shadow-purple-500/40 transition-all">
              <div className="w-full h-full bg-[#050510] rounded-[10px] flex items-center justify-center">
                <span className="font-display font-black text-lg text-transparent bg-clip-text bg-gradient-to-tr from-purple-400 via-blue-400 to-cyan-300">
                  N
                </span>
              </div>
            </div>
            <div>
              <span className="font-display font-extrabold text-base sm:text-lg tracking-tight text-white flex items-center gap-1.5">
                NEXORA <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">TECHNOLOGIES</span>
              </span>
              <span className="block text-[10px] tracking-wider uppercase text-slate-400 font-medium">
                Building Digital Experiences.
              </span>
            </div>
          </a>

          {/* Clean Desktop Navigation Bar */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 bg-white/[0.03] border border-white/10 rounded-full px-3 py-1.5 shadow-inner">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href, link.id)}
                  className={`px-3 py-1.5 rounded-full text-xs xl:text-sm transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap ${
                    isActive
                      ? 'bg-white/15 text-white font-semibold shadow-sm border border-white/15'
                      : 'text-slate-300 hover:text-white hover:bg-white/5 font-medium'
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
              className="px-3.5 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition-all text-xs font-semibold flex items-center gap-1.5 shadow-sm"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp</span>
            </a>

            {/* Primary Action Button */}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact', 'contact')}
              className="px-4.5 py-2.5 rounded-xl gradient-button text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-[0_0_20px_rgba(139,92,246,0.35)] hover:shadow-[0_0_25px_rgba(139,92,246,0.55)] hover:scale-105 active:scale-95 transition-all group"
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
              className="px-3 py-1.5 rounded-lg gradient-button text-white font-bold text-[11px] uppercase tracking-wider sm:hidden"
            >
              Get Website
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-white/5 text-slate-300 hover:text-white border border-white/10 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#050510]/95 backdrop-blur-2xl border-b border-white/10 px-4 pt-4 pb-6 animate-in slide-in-from-top-4 duration-200">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href, link.id)}
                  className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm transition-colors ${
                    isActive
                      ? 'bg-purple-600/20 text-white font-semibold border border-purple-500/30'
                      : 'text-slate-200 hover:text-white hover:bg-white/5'
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
              className="w-full py-2.5 rounded-xl bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 font-semibold text-xs flex items-center justify-center gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact', 'contact')}
              className="w-full py-2.5 rounded-xl gradient-button text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-lg shadow-purple-600/30"
            >
              <span>Get Website</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
