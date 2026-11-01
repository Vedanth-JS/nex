import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
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
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { DemoViewerModal } from './demos/DemoViewerModal';
import { ConsultationModal } from './components/ConsultationModal';
import { DemoId } from './types';

export function App() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [activeDemoId, setActiveDemoId] = useState<DemoId>('restaurant');
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [selectedDetailServiceId, setSelectedDetailServiceId] = useState<string | null>(null);
  const [isServiceDetailOpen, setIsServiceDetailOpen] = useState(false);
  
  // State to prepopulate contact form when user clicks specific service/plan/demo
  const [targetService, setTargetService] = useState<string>('Business Website');
  const [targetIndustry, setTargetIndustry] = useState<string>('Restaurant / Cafe');

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
    <div className="bg-[#050510] text-slate-100 min-h-screen selection:bg-purple-500 selection:text-white">
      {/* Navigation Bar */}
      <Navbar 
        onOpenDemo={handleOpenDemo}
        onOpenConsultation={() => setIsConsultationOpen(true)}
      />

      {/* Main Content */}
      <main>
        {/* 4. Hero Section with 3D Three.js Background & Mockup Preview */}
        <Hero onOpenDemo={handleOpenDemo} />

        {/* 3D Scrolling Image Showcase & Real-Time Motion Gallery */}
        <div id="showcase">
          <ScrollShowcase3D 
            onOpenDemo={handleOpenDemo}
            onOrderThisWebsite={handleOrderThisWebsite}
          />
        </div>

        {/* Business Problem Section: "Your Customers Are Online. Is Your Business?" */}
        <BusinessProblem 
          onBuildWebsite={() => {
            const contactEl = document.getElementById('contact');
            if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
          }} 
        />

        {/* 5. Services Section with 3D Tilt Cards */}
        <Services 
          onSelectService={handleSelectService}
          onOpenServiceDetail={handleOpenServiceDetail}
        />

        {/* 6. Industries We Serve (12 Industries Interactive Grid with 3D Tilt) */}
        <Industries 
          onOpenDemo={handleOpenDemo}
          onSelectIndustry={handleSelectIndustry}
        />

        {/* 7. Working Website Demonstrations (6 Live Demos with 3D Tilt) */}
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

        {/* 9. Pricing Packages (STARTER ₹2,999, GROWTH ₹5,999, PROFESSIONAL ₹9,999+ with 3D Tilt) */}
        <Pricing 
          onSelectPlan={handleSelectPlan}
          onOpenConsultation={() => setIsConsultationOpen(true)}
        />

        {/* 10. Why Choose Nexora (8 Points) */}
        <WhyChooseUs />

        {/* 11. How We Work (5-Step Process) */}
        <HowWeWork />

        {/* What You Can Expect From Nexora (Transparent Trust & Quality Pillars) */}
        <ExpectationsSection 
          onStartProject={() => {
            const contactEl = document.getElementById('contact');
            if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 12. About Nexora (Honest Mission & Vision) */}
        <About />

        {/* 13. Contact & Lead Generation Section with 3D Budget Tiles */}
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
