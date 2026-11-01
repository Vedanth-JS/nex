export interface PortfolioProject {
  id: string;
  title: string;
  category: 'Restaurants' | 'Healthcare' | 'Education' | 'Retail' | 'Hospitality' | 'Corporate';
  clientType: string;
  description: string;
  technologies: string[];
  demoId: 'restaurant' | 'clinic' | 'hotel' | 'coaching' | 'gym' | 'real-estate';
  isConcept: boolean;
  image: string;
  highlights: string[];
}

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'savoria-bistro',
    title: 'Savoria Fine Dining & Bistro',
    category: 'Restaurants',
    clientType: 'Luxury Dining & Cafe',
    description: 'An elegant dark-themed dining website with interactive digital menu, dish pricing, online reservation system, and direct WhatsApp ordering.',
    technologies: ['React', 'Tailwind CSS', 'Framer Motion', 'WhatsApp API'],
    demoId: 'restaurant',
    isConcept: true,
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Table Booking Form', 'Filterable Food Menu', 'Chef Specialties']
  },
  {
    id: 'pulsecare-clinic',
    title: 'PulseCare Multi-Specialty Clinic',
    category: 'Healthcare',
    clientType: 'Medical Clinic & Diagnostic Center',
    description: 'A modern, reassuring healthcare portal featuring specialist doctor profiles, department directories, emergency hotline, and slot booking.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Form Validation'],
    demoId: 'clinic',
    isConcept: true,
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Doctor Directory', 'Appointment Scheduler', 'Emergency Hotline']
  },
  {
    id: 'grand-oberoi',
    title: 'The Grand Heritage Palace & Resort',
    category: 'Hospitality',
    clientType: 'Boutique Luxury Resort',
    description: 'A high-end resort website showcasing private villas, luxury amenities, tariff calculator, photo gallery, and direct zero-commission inquiries.',
    technologies: ['React', 'Vite', 'Tailwind CSS', 'Interactive Carousel'],
    demoId: 'hotel',
    isConcept: true,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Suite Showcase', 'Availability Calendar', 'Luxury Amenities']
  },
  {
    id: 'apex-academy',
    title: 'Apex IAS & Competitive Academy',
    category: 'Education',
    clientType: 'Coaching & Academic Institute',
    description: 'A high-converting educational portal for competitive exam coaching featuring course syllabus download, mentor profiles, and admission inquiries.',
    technologies: ['React', 'Tailwind CSS', 'Lead Generation System'],
    demoId: 'coaching',
    isConcept: true,
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Course Fee Calculator', 'Syllabus PDF Request', 'Toppers Hall of Fame']
  },
  {
    id: 'ironcore-fitness',
    title: 'IronCore Elite Gym & Crossfit',
    category: 'Retail', // Gym & Fitness / Retail health
    clientType: 'Fitness Studio & Gym',
    description: 'High-energy fitness website featuring training programs, coach credentials, membership tier cards, and instant 1-day free trial pass requests.',
    technologies: ['React', 'Framer Motion', 'Tailwind CSS'],
    demoId: 'gym',
    isConcept: true,
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Membership Pricing', 'Trainer Profiles', '1-Day Free Trial Pass']
  },
  {
    id: 'aura-prime-realty',
    title: 'Aura Prime Realty & Living',
    category: 'Corporate',
    clientType: 'Real Estate Developer',
    description: 'A clean, prestigious real estate website featuring luxury 2BHK/3BHK residential listings, virtual tours, floor plans, and site visit booking.',
    technologies: ['React', 'Tailwind CSS', 'Interactive Maps'],
    demoId: 'real-estate',
    isConcept: true,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Interactive Listings', 'Virtual Tour CTA', 'Schedule Site Visit']
  }
];
