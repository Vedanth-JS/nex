export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  iconName: string;
  features: string[];
  gradient: string;
  popular?: boolean;
}

export interface IndustryItem {
  id: string;
  name: string;
  description: string;
  iconName: string;
  image: string;
  keyFeatures: string[];
  demoId?: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'Restaurants' | 'Healthcare' | 'Education' | 'Retail' | 'Hospitality' | 'Corporate';
  description: string;
  image: string;
  tags: string[];
  demoId: string;
  isConcept: boolean;
  metrics?: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  badge?: string;
  startingPrice: string;
  priceNumber: number;
  description: string;
  features: string[];
  notIncluded?: string[];
  highlight?: boolean;
  ctaText: string;
}

export interface LeadFormData {
  fullName: string;
  businessName: string;
  phone: string;
  email: string;
  businessCategory: string;
  websiteType: string;
  budget: string;
  projectDescription: string;
}

export type DemoId = 'restaurant' | 'clinic' | 'hotel' | 'coaching' | 'gym' | 'real-estate';

export interface DemoConfig {
  id: DemoId;
  name: string;
  category: string;
  tagline: string;
  accentColor: string;
  thumbnail: string;
}
