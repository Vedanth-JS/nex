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
    name: 'STARTER',
    tagline: 'Single-page responsive website tailored for small shops, solo practices, and local business starters.',
    startingPrice: '₹2,999',
    priceNote: 'Base package • One-time development',
    badge: 'Starter Friendly',
    isPopular: false,
    idealFor: 'Small shops, clinics, freelancers, local entrepreneurs',
    deliveryTime: '2-4 Days Delivery',
    features: [
      'Single-page website',
      'Responsive design (Mobile, Tablet, Desktop)',
      'Business information & About section',
      'Contact details & Operating hours',
      'WhatsApp integration with direct chat',
      'Basic SEO & Search indexing setup',
      'Deployment assistance & Launch setup'
    ],
    additionalHighlights: [
      'Fast loading speed',
      'Clean modern layout'
    ],
    ctaText: 'CHOOSE STARTER – ₹2,999',
    packageType: 'Starter (₹2,999)'
  },
  {
    id: 'growth',
    name: 'GROWTH',
    tagline: 'Our most popular comprehensive multi-page solution for established local businesses wanting maximum leads.',
    startingPrice: '₹5,999',
    priceNote: 'Most popular • Recommended value',
    badge: 'RECOMMENDED',
    isPopular: true,
    idealFor: 'Restaurants, hotels, clinics, gyms, salons, coaching institutes',
    deliveryTime: '4-7 Days Delivery',
    features: [
      'Up to 5 custom-designed pages',
      'Premium UI/UX design & brand identity',
      'Dedicated services / menu / product section',
      'WhatsApp integration with prefilled enquiries',
      'Google Maps integration & directions',
      'Interactive contact & enquiry form',
      'Basic SEO optimization for local search'
    ],
    additionalHighlights: [
      'High-conversion layout engineered for inquiries',
      'Free hosting setup assistance'
    ],
    ctaText: 'CHOOSE GROWTH – ₹5,999',
    packageType: 'Growth (₹5,999)'
  },
  {
    id: 'professional',
    name: 'PROFESSIONAL',
    tagline: 'Full-scale tailored web platform with advanced workflows, filters, and dynamic lead management.',
    startingPrice: '₹9,999+',
    priceNote: 'Custom scope onwards',
    badge: 'Enterprise Grade',
    isPopular: false,
    idealFor: 'Hotels & resorts, multi-specialty clinics, e-commerce, real estate',
    deliveryTime: '7-14 Days Delivery',
    features: [
      'Up to 10 pages custom architecture',
      'Custom bespoke design & brand assets',
      'Advanced functionality (catalog / filters / booking)',
      'Enquiry management system integration',
      'Comprehensive SEO optimization',
      'Performance optimization (90+ Lighthouse score)',
      'Additional integrations (APIs, analytics, payment links)'
    ],
    additionalHighlights: [
      'Complete scalability for growing business',
      'Priority post-launch support'
    ],
    ctaText: 'CHOOSE PROFESSIONAL – ₹9,999+',
    packageType: 'Professional (₹9,999+)'
  }
];

export const PRICING_DISCLAIMERS = [
  'All prices displayed are base starting development prices for frontend design & development.',
  'Domain registration, paid hosting, third-party services, and additional features may cost extra based on registrar and provider pricing.',
  'Third-party paid services (SMS gateways, paid APIs, external payment gateways) are billed directly by their respective providers.',
  'Need something customized? We will provide a transparent, itemized quote before starting any work.'
];
