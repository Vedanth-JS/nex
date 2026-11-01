import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  ArrowRight, 
  MessageCircle
} from 'lucide-react';
import { getWhatsAppUrl, WHATSAPP_CONFIG } from '../utils/whatsapp';

interface NavbarProps {
  onOpenDemo: (demoId: 'restaurant' | 'clinic' | 'hotel' | 'coaching' | 'gym' | 'real-estate') => void;
  onOpenConsultation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenConsultation }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: '3D Showcase', href: '#showcase', badge: '3D Motion' },
    { name: 'Services', href: '#services' },
    { name: 'Industries', href: '#industries' },
    { name: 'Live Demos', href: '#demos', badge: '6 Working' },
    { name: 'Our Work', href: '#portfolio' },
    { name: 'Pricing', href: '#pricing', badge: 'From ₹2,999' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'glass-nav shadow-2xl py-3 border-b border-white/10' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <a 
            href="#home" 
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#8B5CF6] via-[#2563EB] to-[#22D3EE] p-[1.5px] shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/40 transition-all">
              <div className="w-full h-full bg-[#050510] rounded-[10px] flex items-center justify-center">
                <span className="font-display font-black text-xl text-transparent bg-clip-text bg-gradient-to-tr from-purple-400 via-blue-400 to-cyan-300">
                  N
                </span>
              </div>
            </div>
            <div>
              <span className="font-display font-extrabold text-lg sm:text-xl tracking-tight text-white flex items-center gap-1.5">
                NEXORA <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">TECHNOLOGIES</span>
              </span>
              <span className="block text-[10px] tracking-wider uppercase text-slate-400 font-medium">
                Building Digital Experiences
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-2.5 py-1.5 rounded-lg text-xs xl:text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-all relative group flex items-center gap-1.5"
              >
                <span>{link.name}</span>
                {link.badge && (
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                    link.badge.includes('₹')
                      ? 'bg-cyan-950 text-cyan-300 border border-cyan-800/40'
                      : link.badge.includes('3D')
                      ? 'bg-gradient-to-r from-purple-900 to-blue-900 text-cyan-300 border border-cyan-500/40'
                      : 'bg-purple-950 text-purple-300 border border-purple-800/40'
                  }`}>
                    {link.badge}
                  </span>
                )}
              </a>
            ))}
          </nav>

          {/* Right Action CTA & WhatsApp */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={getWhatsAppUrl(WHATSAPP_CONFIG.defaultHeroMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-white/5 hover:bg-emerald-500/20 text-slate-300 hover:text-emerald-400 border border-white/10 hover:border-emerald-500/30 transition-all text-xs font-semibold flex items-center gap-1.5"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span className="hidden xl:inline">WhatsApp</span>
            </a>

            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="px-4 py-2.5 rounded-xl gradient-button text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-lg shadow-purple-600/30 group"
            >
              <span>Get Your Website</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
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
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-slate-200 hover:text-white hover:bg-white/5"
              >
                <span>{link.name}</span>
                {link.badge && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider bg-purple-950 text-purple-300 border border-purple-800/40">
                    {link.badge}
                  </span>
                )}
              </a>
            ))}
          </div>

          <div className="mt-5 pt-4 border-t border-white/10 grid grid-cols-2 gap-2">
            <a
              href={getWhatsAppUrl(WHATSAPP_CONFIG.defaultHeroMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-xl bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 font-semibold text-xs flex items-center justify-center gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Chat</span>
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
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
