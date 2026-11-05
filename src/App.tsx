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
import { registerLenisInstance, scrollToSection } from './utils/scroll';

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

      registerLenisInstance(lenis);

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
      registerLenisInstance(null);
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
      scrollToSection('#contact');
    }, 150);
  };

  // From Services section (Get Quote)
  const handleSelectService = (serviceTitle: string) => {
    let service = 'Business Website';
    let industry = 'Other Business';

    const s = serviceTitle.toLowerCase();
    if (s.includes('restaurant') || s.includes('cafe') || s.includes('food')) {
      service = 'Restaurant Website';
      industry = 'Restaurant / Cafe';
    } else if (s.includes('clinic') || s.includes('hospital') || s.includes('doctor')) {
      service = 'Clinic Website';
      industry = 'Hospital / Clinic';
    } else if (s.includes('hotel') || s.includes('resort')) {
      service = 'Hotel Website';
      industry = 'Hotel / Resort';
    } else if (s.includes('travel')) {
      service = 'Hotel Website';
      industry = 'Travel Agency';
    } else if (s.includes('commerce') || s.includes('store')) {
      service = 'E-commerce Website';
      industry = 'Retail Shop';
    } else if (s.includes('education') || s.includes('coaching') || s.includes('institute')) {
      service = 'Educational Website';
      industry = 'Educational Institution';
    } else if (s.includes('gym') || s.includes('fitness')) {
      service = 'Gym Website';
      industry = 'Gym & Fitness Centre';
    } else if (s.includes('real estate') || s.includes('property')) {
      service = 'Real Estate Website';
      industry = 'Real Estate';
    } else {
      service = 'Business Website';
      industry = 'Professional Services';
    }

    setTargetService(service);
    setTargetIndustry(industry);

    // Reliable smooth scroll to contact section
    scrollToSection('#contact');

    // Gently focus the first form field
    setTimeout(() => {
      const input = document.querySelector<HTMLInputElement>('#contact input[name="fullName"]');
      if (input) input.focus();
    }, 700);
  };

  // From Industries section
  const handleSelectIndustry = (industryName: string) => {
    setTargetIndustry(industryName);
    scrollToSection('#contact');
  };

  // From Pricing section
  const handleSelectPlan = (planPackage: string) => {
    setTargetService(`Package: ${planPackage}`);
    scrollToSection('#contact');
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
          onBuildWebsite={() => scrollToSection('#contact')} 
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
            scrollToSection('#contact');
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
          onStartProject={() => scrollToSection('#contact')}
        />

        {/* About Nexora */}
        <About />

        {/* 10. Final Call to Action */}
        <FinalCTA 
          onStartProject={() => scrollToSection('#contact')}
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
