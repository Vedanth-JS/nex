export interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  startingPrice: string;
  priceNote: string;
  badge?: string;
  isPopular?: boolean;
  idealFor: string;
  deliveryTime: string;
  features: string[];
  additionalHighlights: string[];
  ctaText: string;
  packageType: string;
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter Package',
    tagline: 'Perfect for small local businesses, solo consultants, and new shops taking their first step online.',
    startingPrice: '₹2,999',
    priceNote: 'Starting price • One-time development',
    badge: 'Budget Friendly',
    isPopular: false,
    idealFor: 'Small local shops, freelance professionals, solo clinics',
    deliveryTime: '2-4 Days Delivery',
    features: [
      '1 Single-Page High-Converting Website',
      '100% Mobile & Tablet Responsive',
      'Business Overview & About Section',
      'Complete Contact & Hours Display',
      'Floating WhatsApp Direct Chat Button',
      'Basic On-Page SEO & Google Indexing',
      'Free Hosting Setup Assistance'
    ],
    additionalHighlights: [
      'Clean modern aesthetic',
      'Fast loading speed'
    ],
    ctaText: 'Choose Starter Package',
    packageType: 'Starter (₹2,999)'
  },
  {
    id: 'growth',
    name: 'Growth Package',
    tagline: 'Our most popular choice for growing businesses that need dedicated pages and professional lead capture.',
    startingPrice: '₹5,999',
    priceNote: 'Starting price • One-time development',
    badge: 'Most Popular',
    isPopular: true,
    idealFor: 'Restaurants, established clinics, service firms, academies',
    deliveryTime: '5-7 Days Delivery',
    features: [
      'Up to 5 Custom-Designed Pages',
      'Premium Bespoke UI/UX Design',
      '100% Mobile & Tablet Responsive',
      'Detailed Service / Product Listings',
      'Interactive Lead & Contact Form',
      'Custom WhatsApp Enquiry Integration',
      'Google Maps Directions Integration',
      'Search Engine Optimization (SEO)',
      'Social Media Profiles Linking'
    ],
    additionalHighlights: [
      'Lead capture sent straight to your email & WhatsApp',
      'Fast CDN deployment'
    ],
    ctaText: 'Choose Growth Package',
    packageType: 'Growth (₹5,999)'
  },
  {
    id: 'professional',
    name: 'Professional Package',
    tagline: 'Comprehensive, high-performance web solution with advanced capabilities for serious industry leaders.',
    startingPrice: '₹9,999',
    priceNote: 'Starting price onwards • Custom scope',
    badge: 'Full Power',
    isPopular: false,
    idealFor: 'Hotels, e-commerce, multi-branch hospitals, real estate',
    deliveryTime: '7-14 Days Delivery',
    features: [
      'Up to 10 Pages or Custom Dynamic Scope',
      'Bespoke Futuristic UI/UX & Brand System',
      'Advanced Functionality (Booking / Catalog / Filter)',
      'Comprehensive Lead & Enquiry Management',
      'Custom WhatsApp Workflows & Automated Routing',
      'Advanced SEO & Structured Data Markup',
      'Speed & Performance Optimization (90+ Score)',
      'Admin Functionality / Dashboard (where required)',
      'Priority Post-Launch Support & Warranty'
    ],
    additionalHighlights: [
      'Tailored to your exact business workflow',
      'Complete scalability for future growth'
    ],
    ctaText: 'Choose Professional Package',
    packageType: 'Professional (₹9,999 onwards)'
  }
];

export const PRICING_DISCLAIMERS = [
  'All prices displayed are base starting prices for frontend design & development.',
  'Domain registration fees (e.g. .com, .in) and commercial cloud hosting plans are billed directly by registrars at actual cost.',
  'Third-party paid services (SMS gateways, specialized paid APIs, custom payment gateways) are not included in base development.',
  'Custom features outside the included scope are quoted transparently before project kick-off.'
];
