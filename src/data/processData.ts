export interface ProcessStep {
  step: string;
  title: string;
  tagline: string;
  description: string;
  icon: string;
  deliverables: string[];
}

export const WORK_PROCESS_STEPS: ProcessStep[] = [
  {
    step: '01',
    title: 'Understand Your Business',
    tagline: 'Discovery & Consultation',
    description: 'We listen to your business goals, target customers, local competition, and unique value proposition to tailor the perfect digital strategy.',
    icon: 'Compass',
    deliverables: ['Requirement analysis', 'Feature checklist', 'Competitive brief']
  },
  {
    step: '02',
    title: 'Plan Your Website',
    tagline: 'Architecture & Content Flow',
    description: 'We map out your site structure, user journeys, navigation flow, and call-to-action triggers to ensure maximum visitor-to-lead conversion.',
    icon: 'Layers',
    deliverables: ['Sitemap architecture', 'Wireframe layout', 'Content placement plan']
  },
  {
    step: '03',
    title: 'Design & Development',
    tagline: 'Modern Aesthetics & Code',
    description: 'We craft a stunning, futuristic visual design aligned with your brand identity and build clean, responsive, high-speed code with modern technologies.',
    icon: 'Code2',
    deliverables: ['Custom UI design', 'Mobile-first development', 'WhatsApp integration']
  },
  {
    step: '04',
    title: 'Testing & Launch',
    tagline: 'Rigorous Quality Checks',
    description: 'We test across multiple mobile devices, tablets, and desktop browsers, verify form submissions and load speed, and connect your live domain.',
    icon: 'Rocket',
    deliverables: ['Cross-device testing', 'Speed optimization', 'Domain & SSL setup']
  },
  {
    step: '05',
    title: 'Support & Maintenance',
    tagline: 'Long-term Partnership',
    description: 'We hand over your website with full guidance and remain available for technical updates, minor edits, backups, and ongoing peace of mind.',
    icon: 'Headphones',
    deliverables: ['Walkthrough handover', 'Ongoing bug-fix support', 'Growth consulting']
  }
];

export interface WhyChooseItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  highlight: string;
}

export const WHY_CHOOSE_ITEMS: WhyChooseItem[] = [
  {
    id: 'affordable',
    title: 'Affordable Website Development',
    description: 'Transparent, upfront pricing starting at just ₹2,999. No hidden charges, enterprise agency markups, or unexpected surprises.',
    icon: 'IndianRupee',
    highlight: 'Starts at ₹2,999'
  },
  {
    id: 'modern',
    title: 'Modern Professional Designs',
    description: 'Bespoke, world-class UI/UX with sleek dark aesthetics, subtle micro-animations, and glassmorphism that look like a 7-figure tech firm.',
    icon: 'Sparkles',
    highlight: 'Award-winning look'
  },
  {
    id: 'mobile',
    title: 'Mobile-First Development',
    description: 'Over 80% of local customers browse on phones. Our websites load instantaneously and look flawless on every smartphone and tablet.',
    icon: 'Smartphone',
    highlight: '100% responsive'
  },
  {
    id: 'delivery',
    title: 'Fast & Predictable Delivery',
    description: 'No endless multi-month delays. We deliver fully operational starter websites in as little as 2-4 business days.',
    icon: 'Zap',
    highlight: '2-4 days turnaround'
  },
  {
    id: 'communication',
    title: 'Direct Communication',
    description: 'Speak directly with your actual designer and developer over WhatsApp or phone call. No confusing bureaucratic account managers.',
    icon: 'MessageSquare',
    highlight: 'Direct founder access'
  },
  {
    id: 'customized',
    title: 'Customized Solutions',
    description: 'Every local business has distinct needs—from digital QR menus for restaurants to appointment schedulers for clinics.',
    icon: 'SlidersHorizontal',
    highlight: 'Tailored for your niche'
  },
  {
    id: 'seo',
    title: 'SEO-Friendly Websites',
    description: 'Built with clean semantic markup, fast load times, and on-page metadata so potential customers searching locally discover you.',
    icon: 'SearchCheck',
    highlight: 'Google-ready foundation'
  },
  {
    id: 'support',
    title: 'Ongoing Support & Care',
    description: 'We don’t abandon you after launch. We provide reliable technical assistance, content updates, and maintenance support.',
    icon: 'ShieldCheck',
    highlight: 'Reliable long-term partner'
  }
];
