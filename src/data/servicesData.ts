export interface ServiceDetail {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  features: string[];
  gradient: string;
  demoId?: string;
}

export const MAIN_SERVICES: ServiceDetail[] = [
  {
    id: 'business',
    number: '01',
    title: 'Business Website Development',
    subtitle: 'Corporate & Service Websites',
    badge: 'High Conversion',
    description: 'Custom, high-performing websites engineered to establish authority, generate inquiries, and turn visitors into paying clients.',
    features: [
      'Professional business & corporate branding',
      'High-converting landing pages',
      'Service showcase & portfolio integration',
      'Ultra-fast 100% responsive design',
      'Built-in inquiry capture & WhatsApp forms'
    ],
    gradient: 'from-purple-500/20 via-blue-500/10 to-transparent',
    demoId: 'real-estate'
  },
  {
    id: 'restaurant',
    number: '02',
    title: 'Restaurant & Cafe Websites',
    subtitle: 'Food Menus & Table Reservations',
    badge: 'Popular',
    description: 'Mouth-watering digital experiences for dining establishments, cafes, and cloud kitchens that boost direct orders and table reservations.',
    features: [
      'Interactive visual digital food menus',
      'High-resolution food galleries & chef highlights',
      'Instant table reservation inquiry forms',
      'Direct WhatsApp food ordering integration',
      'Location map & opening hours display'
    ],
    gradient: 'from-amber-500/20 via-orange-500/10 to-transparent',
    demoId: 'restaurant'
  },
  {
    id: 'clinic',
    number: '03',
    title: 'Clinic & Hospital Websites',
    subtitle: 'Doctor Profiles & Appointments',
    badge: 'Trusted',
    description: 'Clean, trustworthy healthcare platforms designed for doctors, dental clinics, specialty hospitals, and diagnostic labs.',
    features: [
      'Doctor qualifications & department profiles',
      'Medical services & specialized treatments guide',
      'Online appointment inquiry forms',
      'Emergency helpline & quick WhatsApp contact',
      'Google Maps & patient consultation guidance'
    ],
    gradient: 'from-cyan-500/20 via-blue-500/10 to-transparent',
    demoId: 'clinic'
  },
  {
    id: 'hotel',
    number: '04',
    title: 'Hotel & Travel Websites',
    subtitle: 'Room Showcases & Tour Packages',
    badge: 'Luxury',
    description: 'Immersive resort, homestay, and travel portal websites that showcase luxury amenities and drive zero-commission direct bookings.',
    features: [
      'Interactive room & suite luxury showcases',
      '360° photo galleries & amenities list',
      'Direct booking inquiry & tariff calculators',
      'Tour itinerary & sightseeing packages',
      'Instant WhatsApp booking assistance'
    ],
    gradient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
    demoId: 'hotel'
  },
  {
    id: 'ecommerce',
    number: '05',
    title: 'E-Commerce Websites',
    subtitle: 'Catalogs, Carts & Payments',
    badge: 'Sales Engine',
    description: 'Complete online store solutions for retail shops, fashion boutiques, and manufacturers with automated order collection.',
    features: [
      'Organized product catalogs with category filters',
      'Seamless shopping cart & checkout flow',
      'Payment gateway setup (Razorpay/UPI/Cards)',
      'WhatsApp order notification integration',
      'Simple product management & inventory tracking'
    ],
    gradient: 'from-pink-500/20 via-purple-500/10 to-transparent',
  },
  {
    id: 'education',
    number: '06',
    title: 'Educational Websites',
    subtitle: 'Coaching, Schools & Colleges',
    badge: 'Growth',
    description: 'Inspiring digital portals for coaching institutes, competitive exam academies, tutoring centers, and schools to maximize admissions.',
    features: [
      'Comprehensive course & syllabus information',
      'Experienced faculty & mentor showcases',
      'Admission inquiry & lead capture forms',
      'Student testimonials & exam rankers wall',
      'Syllabus PDF download & WhatsApp counseling'
    ],
    gradient: 'from-blue-500/20 via-indigo-500/10 to-transparent',
    demoId: 'coaching'
  }
];

export const ADDITIONAL_SERVICES = [
  {
    title: 'Website Redesign',
    description: 'Modernize slow, outdated websites into futuristic high-converting digital storefronts.',
    icon: 'RefreshCw'
  },
  {
    title: 'Website Maintenance & Care',
    description: 'Regular security updates, bug fixes, backups, and content updates so you can focus on business.',
    icon: 'ShieldCheck'
  },
  {
    title: 'Domain & DNS Assistance',
    description: 'Complete guidance on acquiring your .com / .in domain and connecting professional DNS.',
    icon: 'Globe'
  },
  {
    title: 'Cloud Hosting Setup',
    description: 'High-speed, affordable cloud hosting configuration on modern CDN networks with 99.9% uptime.',
    icon: 'Server'
  },
  {
    title: 'Local SEO & Optimization',
    description: 'On-page SEO, speed optimization, and search engine submission so local customers find you first.',
    icon: 'Search'
  },
  {
    title: 'Google Maps Business Integration',
    description: 'Embed interactive Google Maps with click-to-navigate directions for physical foot traffic.',
    icon: 'MapPin'
  },
  {
    title: 'WhatsApp Business Integration',
    description: 'Direct click-to-chat widgets, prefilled customer messages, and catalog connection.',
    icon: 'MessageCircle'
  }
];
