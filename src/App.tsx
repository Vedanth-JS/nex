import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import Lenis from 'lenis';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustAndValue } from './components/TrustAndValue';
import { ScrollShowcase3D } from './components/3d/ScrollShowcase3D';
import { BusinessProblem } from './components/BusinessProblem';
import { Services } from './components/Services';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { Industries } from './components/Industries';
import { DemosSection } from './components/DemosSection';
import { Portfolio } from './components/Portfolio';
import { Pricing } from './components/Pricing';
import { WhyChooseUs } from './components/WhyChooseUs';
import { HowWeWork } from './components/HowWeWork';
import { ExpectationsSection } from './components/ExpectationsSection';
import { About } from './components/About';
import { FinalCTA } from './components/FinalCTA';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { DemoViewerModal } from './demos/DemoViewerModal';
import { ConsultationModal } from './components/ConsultationModal';
import { DemoId } from './types';

// Lazy-load single persistent 3D world
const World3D = lazy(() => import('./components/3d/World3D'));

export function App() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [activeDemoId, setActiveDemoId] = useState<DemoId>('restaurant');
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [selectedDetailServiceId, setSelectedDetailServiceId] = useState<string | null>(null);
  const [isServiceDetailOpen, setIsServiceDetailOpen] = useState(false);
  
  // State to prepopulate contact form when user clicks specific service/plan/demo
  const [targetService, setTargetService] = useState<string>('Business Website');
  const [targetIndustry, setTargetIndustry] = useState<string>('Restaurant / Cafe');

  const cursorGlowRef = useRef<HTMLDivElement | null>(null);

  // Initialize Lenis smooth scroll and desktop cursor glow
  useEffect(() => {
    let lenis: Lenis | null = null;
    let rafId: number;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion && window.innerWidth >= 768) {
      lenis = new Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
      });

      const raf = (time: number) => {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (cursorGlowRef.current) {
        cursorGlowRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      lenis?.destroy();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Trigger demo viewer modal
  const handleOpenDemo = (demoId: DemoId) => {
    setActiveDemoId(demoId);
    setIsDemoModalOpen(true);
  };

  const handleOpenServiceDetail = (serviceId: string) => {
    setSelectedDetailServiceId(serviceId);
    setIsServiceDetailOpen(true);
  };

  // When user is viewing a demo or clicking order on a demo card, scroll to contact and prefill
  const handleOrderThisWebsite = (demoId: DemoId) => {
    setIsDemoModalOpen(false);
    
    // Map demo ID to contact form website dropdown
    const demoTypeMap: Record<DemoId, string> = {
      restaurant: 'Restaurant Website',
      clinic: 'Clinic Website',
      hotel: 'Hotel Website',
      coaching: 'Educational Website',
      gym: 'Business Website',
      'real-estate': 'Business Website',
    };

    const industryMap: Record<DemoId, string> = {
      restaurant: 'Restaurant / Cafe',
      clinic: 'Hospital / Clinic',
      hotel: 'Hotel / Resort',
      coaching: 'Educational Institution',
      gym: 'Gym & Fitness Centre',
      'real-estate': 'Real Estate',
    };

    setTargetService(demoTypeMap[demoId] || 'Business Website');
    setTargetIndustry(industryMap[demoId] || 'Restaurant / Cafe');

    // Smooth scroll to contact
    setTimeout(() => {
      const contactEl = document.getElementById('contact');
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  // From Services section
  const handleSelectService = (serviceTitle: string) => {
    if (serviceTitle.toLowerCase().includes('restaurant')) {
      setTargetService('Restaurant Website');
    } else if (serviceTitle.toLowerCase().includes('clinic') || serviceTitle.toLowerCase().includes('hospital')) {
      setTargetService('Clinic Website');
    } else if (serviceTitle.toLowerCase().includes('hotel') || serviceTitle.toLowerCase().includes('travel')) {
      setTargetService('Hotel Website');
    } else if (serviceTitle.toLowerCase().includes('commerce')) {
      setTargetService('E-commerce Website');
    } else if (serviceTitle.toLowerCase().includes('education')) {
      setTargetService('Educational Website');
    } else {
      setTargetService('Business Website');
    }

    const contactEl = document.getElementById('contact');
    if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
  };

  // From Industries section
  const handleSelectIndustry = (industryName: string) => {
    setTargetIndustry(industryName);
    const contactEl = document.getElementById('contact');
    if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
  };

  // From Pricing section
  const handleSelectPlan = (planPackage: string) => {
    setTargetService(`Package: ${planPackage}`);
    const contactEl = document.getElementById('contact');
    if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-[#07070D] text-aurora-text min-h-screen selection:bg-aurora-violet/40 selection:text-white relative overflow-x-hidden">
      {/* Subtle grain overlay (<3% opacity) */}
      <div className="aurora-grain pointer-events-none" />

      {/* Desktop soft cursor-glow */}
      <div 
        ref={cursorGlowRef}
        className="hidden lg:block fixed pointer-events-none z-30 w-80 h-80 rounded-full blur-[100px] bg-gradient-to-tr from-aurora-violet/15 via-aurora-magenta/10 to-aurora-amber/15 -translate-x-1/2 -translate-y-1/2"
        style={{ left: 0, top: 0, willChange: 'transform' }}
      />

      {/* Persistent 3D World (single WebGL canvas behind entire page) */}
      <Suspense fallback={null}>
        <World3D />
      </Suspense>

      {/* Navigation Bar */}
      <Navbar 
        onOpenDemo={handleOpenDemo}
        onOpenConsultation={() => setIsConsultationOpen(true)}
      />

      {/* Main Content */}
      <main>
        {/* 3. Hero Section: Two-Column with Animated Website Mockups */}
        <Hero onOpenDemo={handleOpenDemo} />

        {/* 4. Trust and Value Section (4 Benefits) */}
        <TrustAndValue />

        {/* 3D Scrolling Image Showcase & Real-Time Motion Gallery */}
        <div id="showcase">
          <ScrollShowcase3D 
            onOpenDemo={handleOpenDemo}
            onOrderThisWebsite={handleOrderThisWebsite}
          />
        </div>

        {/* 5. Business Problem Section: "Your Customers Are Online. Is Your Business?" */}
        <BusinessProblem 
          onBuildWebsite={() => {
            const contactEl = document.getElementById('contact');
            if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
          }} 
        />

        {/* 6. Services Preview with 3D Tilt Cards */}
        <Services 
          onSelectService={handleSelectService}
          onOpenServiceDetail={handleOpenServiceDetail}
        />

        {/* Industries We Serve (12 Industries Interactive Grid with 3D Tilt) */}
        <Industries 
          onOpenDemo={handleOpenDemo}
          onSelectIndustry={handleSelectIndustry}
        />

        {/* 7. Live Website Showcase (6 Live Working Demos) */}
        <DemosSection 
          onOpenDemo={handleOpenDemo}
          onOrderThisWebsite={handleOrderThisWebsite}
        />

        {/* 8. Our Portfolio Showcase with Category Filters */}
        <Portfolio 
          onOpenDemo={handleOpenDemo}
          onSelectProject={(title) => {
            setTargetService(`Similar to ${title}`);
            const contactEl = document.getElementById('contact');
            if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 8. Why Nexora: Bento Grid Layout */}
        <WhyChooseUs />

        {/* 9. Pricing Preview (STARTER ₹2,999, GROWTH ₹5,999, PROFESSIONAL ₹9,999+) */}
        <Pricing 
          onSelectPlan={handleSelectPlan}
          onOpenConsultation={() => setIsConsultationOpen(true)}
        />

        {/* Working Process (5-Step Timeline) */}
        <HowWeWork />

        {/* What You Can Expect From Nexora (Transparent Trust & Quality Pillars) */}
        <ExpectationsSection 
          onStartProject={() => {
            const contactEl = document.getElementById('contact');
            if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* About Nexora */}
        <About />

        {/* 10. Final Call to Action */}
        <FinalCTA 
          onStartProject={() => {
            const contactEl = document.getElementById('contact');
            if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Contact & Lead Generation Section with 3D Budget Tiles */}
        <ContactSection 
          initialService={targetService}
          initialIndustry={targetIndustry}
        />
      </main>

      {/* 15. Footer */}
      <Footer />

      {/* 14. Floating WhatsApp Action Button */}
      <FloatingWhatsApp />

      {/* Interactive Device Viewport & Live Demo Modal */}
      <DemoViewerModal 
        isOpen={isDemoModalOpen}
        activeDemoId={activeDemoId}
        onClose={() => setIsDemoModalOpen(false)}
        onSelectDemo={(id) => setActiveDemoId(id)}
        onOrderThisWebsite={handleOrderThisWebsite}
      />

      {/* Quick Consultation Modal */}
      <ConsultationModal 
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />

      {/* Service Detail Modal */}
      <ServiceDetailModal
        isOpen={isServiceDetailOpen}
        serviceId={selectedDetailServiceId}
        onClose={() => setIsServiceDetailOpen(false)}
        onGetQuote={handleSelectService}
        onViewDemo={handleOpenDemo}
      />
    </div>
  );
}

export default App;
