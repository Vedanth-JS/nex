export interface IndustryItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  demoId?: 'restaurant' | 'clinic' | 'hotel' | 'coaching' | 'gym' | 'real-estate';
  features: string[];
  gradient: string;
}

export const INDUSTRIES_DATA: IndustryItem[] = [
  {
    id: 'restaurants',
    name: 'Restaurants & Cafes',
    tagline: 'Mouth-watering digital experiences',
    description: 'Interactive digital food menus, table reservations, WhatsApp instant ordering, and Google Maps integration.',
    icon: 'UtensilsCrossed',
    demoId: 'restaurant',
    features: ['Digital QR & Web Menus', 'Table Reservation Form', 'WhatsApp Ordering'],
    gradient: 'from-amber-500/20 to-orange-500/10'
  },
  {
    id: 'hospitals',
    name: 'Hospitals & Clinics',
    tagline: 'Patient trust & easy appointments',
    description: 'Doctor credentials, department directories, online consultation inquiry forms, and emergency contact hotlines.',
    icon: 'Stethoscope',
    demoId: 'clinic',
    features: ['Doctor Directory', 'Appointment Booking', 'Emergency Helpline'],
    gradient: 'from-cyan-500/20 to-blue-500/10'
  },
  {
    id: 'hotels',
    name: 'Hotels & Resorts',
    tagline: 'Luxury showcases that drive direct bookings',
    description: 'Immersive room showcases, virtual tours, tariff guides, seasonal package promotions, and zero-commission booking.',
    icon: 'Building2',
    demoId: 'hotel',
    features: ['Suite Virtual Previews', 'Direct Booking Form', 'Amenities Showcase'],
    gradient: 'from-emerald-500/20 to-teal-500/10'
  },
  {
    id: 'education',
    name: 'Educational Institutions',
    tagline: 'Drive admissions for schools & coaching',
    description: 'Course catalogs, topper testimonials, syllabus downloads, faculty profiles, and student admission inquiry forms.',
    icon: 'GraduationCap',
    demoId: 'coaching',
    features: ['Course Catalog & Fees', 'Admission Enquiry Form', 'Faculty Directory'],
    gradient: 'from-indigo-500/20 to-purple-500/10'
  },
  {
    id: 'gyms',
    name: 'Gyms & Fitness Centres',
    tagline: 'Turn casual visitors into active members',
    description: 'Membership packages, trainer biographies, class timetables, transformation galleries, and 1-day free pass booking.',
    icon: 'Dumbbell',
    demoId: 'gym',
    features: ['Membership Tiers', 'Free Trial Pass Form', 'Trainer Showcase'],
    gradient: 'from-rose-500/20 to-red-500/10'
  },
  {
    id: 'salons',
    name: 'Beauty Salons & Spas',
    tagline: 'Showcase luxury beauty services',
    description: 'Bridal packages, service rate cards, aesthetic portfolio gallery, stylist profiles, and WhatsApp appointment booking.',
    icon: 'Sparkles',
    features: ['Service Rate Cards', 'Bridal Package Inquiries', 'Stylist Portfolios'],
    gradient: 'from-pink-500/20 to-rose-500/10'
  },
  {
    id: 'realestate',
    name: 'Real Estate & Builders',
    tagline: 'High-value property leads and inquiries',
    description: 'Verified residential & commercial listings, floor plans, pricing calculators, and site-visit scheduling forms.',
    icon: 'Home',
    demoId: 'real-estate',
    features: ['Property Showcase', 'Floor Plans & Amenities', 'Schedule Site Visit'],
    gradient: 'from-blue-500/20 to-cyan-500/10'
  },
  {
    id: 'retail',
    name: 'Retail Shops & Boutiques',
    tagline: 'Take local retail inventory online',
    description: 'New arrival showcases, product catalogs, discount campaign banners, store location, and WhatsApp order inquiry.',
    icon: 'ShoppingBag',
    features: ['Digital Product Catalog', 'Special Offers Banner', 'Store Direction Maps'],
    gradient: 'from-violet-500/20 to-purple-500/10'
  },
  {
    id: 'travel',
    name: 'Travel Agencies & Tours',
    tagline: 'Inspire wanderlust & vacation bookings',
    description: 'Holiday packages, honeymoon tours, cab rental services, traveler reviews, and customized itinerary request forms.',
    icon: 'Compass',
    features: ['Custom Tour Packages', 'Itinerary Inquiry Form', 'WhatsApp Travel Desk'],
    gradient: 'from-amber-500/20 to-yellow-500/10'
  },
  {
    id: 'automobile',
    name: 'Automobile Services & Garages',
    tagline: 'Reliable car & bike repair bookings',
    description: 'Service packages, breakdown emergency hotline, periodic maintenance rates, and online service appointment booking.',
    icon: 'Wrench',
    features: ['Service Rate Calculator', 'Online Slot Booking', 'Breakdown Assistance'],
    gradient: 'from-orange-500/20 to-red-500/10'
  },
  {
    id: 'events',
    name: 'Event Management & Weddings',
    tagline: 'Memorable weddings, corporate & parties',
    description: 'High-definition event galleries, decor themes, package estimates, client testimonials, and date availability inquiry.',
    icon: 'PartyPopper',
    features: ['Event Decor Gallery', 'Date Availability Check', 'Custom Quote Generator'],
    gradient: 'from-fuchsia-500/20 to-pink-500/10'
  },
  {
    id: 'professional',
    name: 'Professional Services',
    tagline: 'Lawyers, CAs, Architects & Consultants',
    description: 'Credential verification, case studies, service offerings, consult booking forms, and professional credibility builders.',
    icon: 'Briefcase',
    features: ['Consultation Booking', 'Case Studies & Expertise', 'Client Review Badges'],
    gradient: 'from-blue-600/20 to-indigo-500/10'
  }
];
