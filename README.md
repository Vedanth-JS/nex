# Nexora Technologies | Building Digital Experiences

> **A premium, modern, conversion-focused digital agency website for Nexora Technologies.**
> Engineered for local businesses, restaurants, clinics, hotels, educational institutions, gyms, and real estate agencies.

---

## 🌟 Overview

**Nexora Technologies** specializes in designing and developing affordable, professional websites for local businesses, startups, shops, restaurants, clinics, hotels, educational institutions, and service providers.

* **Primary Objective**: Generate high-intent client inquiries and conversions for professional website development.
* **Brand Theme**: Midnight Aurora — Obsidian background (`#07070D`), Surface (`#0E0F1C`), Elevated (`#151629`), Aurora Violet (`#7C5CFF`), Aurora Magenta (`#E14BFF`), Aurora Amber (`#FFB547`), Aurora Text (`#F5F3FF`), and Muted (`#A9A7C2`). Primary gradient: Violet → Magenta → Amber. CTA buttons: Amber fill with dark text & soft amber glow. Single persistent 3D world canvas powered by Three.js & Lenis.

---

## 🚀 Key Features Built

1. **Sticky Responsive Navigation Bar**:
   - Modern brand logo with futuristic "N" gradient icon
   - Anchor links with highlight states (`Home`, `3D Showcase`, `Services`, `Industries`, `Live Demos`, `Our Work`, `Pricing`, `About`, `Contact`)
   - Direct WhatsApp quick chat button + "Get Your Website" CTA
   - Smooth slide-out mobile drawer menu

2. **Visually Stunning Hero Section with 3D Three.js WebGL Scene**:
   - **Main Heading**: *"Your Business Deserves More Than Just a Social Media Page."*
   - **Secondary Heading**: *"We build modern, professional websites that help local businesses attract customers, build trust, and grow online."*
   - Direct CTA buttons: `Get Your Website` and `View Our Work`
   - Value checkpoints: Mobile-Friendly Websites, Affordable Packages, Professional Designs, WhatsApp Integration
   - **Interactive Browser Mockup Preview**: Live switcher displaying Restaurant, Clinic, Hotel, and Real Estate templates in 3D isometric or frontal perspective.

3. **Interactive 3D Scrolling Image Showcase (`ScrollShowcase3D.tsx`)**:
   - Dual-tier 3D perspective infinite ribbons gliding in opposing directions with pause-on-hover.
   - Real-time website scroll inspector simulating page scrolling on modern displays.

4. **Industry-Tailored Services**:
   - 6 Primary Web Development Services:
     1. Business Website Development
     2. Restaurant & Cafe Websites
     3. Clinic & Hospital Websites
     4. Hotel & Travel Websites
     5. E-Commerce Websites
     6. Educational Websites
   - 7 Additional Core Capabilities (Website Redesign, Maintenance & Care, Domain/DNS assistance, Cloud Hosting setup, Local SEO, Google Maps integration, WhatsApp Business integration).

5. **12 Industries We Serve Interactive Grid with 3D Tilt**:
   - Restaurants & Cafes, Hospitals & Clinics, Hotels & Resorts, Educational Institutions, Gyms & Fitness Centres, Beauty Salons & Spas, Real Estate, Retail Shops, Travel Agencies, Automobile Services, Event Management, Professional Services.

6. **6 Actual Working Website Demonstrations (`/demos`)**:
   - 🍽️ **Restaurant Website** (*Savoria Fine Dining & Bistro*): Dark noir luxury aesthetic, categorized food menu with prices, table reservation booking form with confirmation, and WhatsApp ordering.
   - 🏥 **Hospital & Clinic Website** (*PulseCare Multi-Specialty Clinic*): Clean medical blue/white cards, doctor profiles with qualifications, 24/7 emergency hotline, and interactive OPD appointment booking.
   - 🏨 **Hotel & Resort Website** (*The Grand Oberoi Palace & Resort*): Royal luxury theme, pool villas & suites showcase with tariffs, amenities, and direct zero-commission booking enquiry.
   - 🎓 **Educational Institute Website** (*DreamIAS & Apex Career Academy*): Course catalog with fees, 1-click syllabus PDF download, toppers wall, and free counseling booking.
   - 🏋️ **Gym & Fitness Website** (*IronCore Elite Fitness & Crossfit*): High-energy dark athletic aesthetic, membership tiers (from ₹1,999), coach bios, and interactive 1-Day Free VIP Pass generator.
   - 🏢 **Real Estate Website** (*Aura Prime Living & Estates*): RERA compliant 2BHK/3BHK residential listings, carpet area & price breakdown, and complimentary cab site-visit booking.

7. **Interactive Demo Viewer Modal (`DemoViewerModal.tsx`)**:
   - **Device Viewport Switcher**: Toggle between **Desktop (100%)**, **Tablet (768px frame)**, and **Mobile (390px phone frame)**!
   - Fullscreen mode support
   - Switch between all 6 demos on the fly with top pill tabs
   - **"Order This Website"** action that smoothly closes the modal and pre-fills the Contact Section.

8. **Portfolio Section**:
   - Category filters: All, Restaurants, Healthcare, Education, Retail, Hospitality, Corporate
   - Tech stack tags for each build & concept demo badges

9. **Transparent Pricing Packages**:
   - **Starter Package**: Suggested ₹2,999 (Single-page, mobile-first, WhatsApp button, basic SEO, free hosting setup assistance)
   - **Growth Package**: Suggested ₹5,999 (Up to 5 pages, premium UI/UX, service listings, WhatsApp integration, Google Maps, contact form)
   - **Professional Package**: Suggested ₹9,999 onwards (Up to 10 pages, custom scope, advanced booking/filtering, structured data, priority support)
   - Transparent price disclaimer notes (domain, paid hosting, 3rd party APIs)
   - "Get a Free Consultation" modal trigger

10. **Why Choose Nexora & How We Work**:
    - 8 Core advantages & 5-step animated process

11. **High-Conversion Contact & Lead Generation**:
    - Comprehensive fields: Your Name, Business Name, Phone, Email, Business Category, Website Required (dropdown), Budget, Project Description
    - 3D interactive budget selection tiles
    - Form validation, loading animation, celebratory confetti explosion, and backup localStorage retention
    - Direct **"Chat on WhatsApp"** button formatting the lead details into a pre-filled WhatsApp message

12. **Floating WhatsApp Widget**:
    - Bottom-right pulsing floating button with badge counter and tooltip

13. **Search Engine Optimization (SEO)**:
    - Pre-configured `robots.txt` and `sitemap.xml` in `public/`
    - Rich Open Graph & Twitter Cards meta tags
    - Schema.org `ProfessionalService` structured data in `index.html`

---

## 🛠️ Tech Stack

* **Frontend**: React 19, TypeScript, Vite
* **3D Graphics**: Three.js WebGL canvas, Custom 3D CSS matrix transforms
* **Styling**: Tailwind CSS, Vanilla CSS design tokens, Glassmorphism
* **Animations**: Canvas Confetti, Framer Motion
* **Icons**: Lucide React
* **WhatsApp Integration**: Native Click-to-Chat URL generation with prefilled schemas

---

## 📱 WhatsApp & Lead Delivery Configuration

The agency WhatsApp number and official contact email use a **single source of truth** in `src/utils/whatsapp.ts`, configured via environment variables or fallback constants:

### Environment Variables (.env & Netlify)
```env
# Digits only with international country code (no "+", no spaces, no dashes)
VITE_WHATSAPP_NUMBER=917975976491
VITE_CONTACT_EMAIL=contact.nexoratecnologies@gmail.com
```

### Lead Delivery (Netlify Forms & WhatsApp)
- **Netlify Forms**: Submissions from the Enquiry Form and Consultation Modal are pre-registered in `index.html` and POST to `/` with urlencoded parameters.
- **WhatsApp Direct**: If mobile visitors prefer instant chat or if a network error occurs, direct 1-tap WhatsApp buttons prefill the lead details into WhatsApp.
- **Dev Diagnostic**: In development mode, run `window.__testWhatsApp()` in browser console to inspect number validity and generated URLs.

---

## 💻 Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Build for production (Vercel / Netlify / Cloudflare Pages)
npm run build
```

---

## 🌐 Deploying to Vercel

1. Push this repository to GitHub.
2. Go to [vercel.com](https://vercel.com) and click **"New Project"**.
3. Import this repository.
4. Framework Preset: **Vite**.
5. Build Command: `npm run build`
6. Output Directory: `dist`
7. Click **Deploy**!