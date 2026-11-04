// Single Source of Truth for Nexora Technologies Contact & WhatsApp Delivery

// Fallback constants (edit if env vars are not set)
export const YOUR_NUMBER_HERE = '917975976491';
export const YOUR_EMAIL_HERE = 'contact.nexoratecnologies@gmail.com';
export const PLACEHOLDER_NUMBER = '919876543210';

function cleanDigits(val?: string | null): string {
  if (!val) return '';
  return val.replace(/[^0-9]/g, '');
}

// Read env variables if present, otherwise fall back to editable constants
const envNumber = typeof import.meta !== 'undefined' && import.meta.env?.VITE_WHATSAPP_NUMBER;
const envEmail = typeof import.meta !== 'undefined' && import.meta.env?.VITE_CONTACT_EMAIL;

export const CONFIGURED_PHONE_NUMBER = cleanDigits(envNumber) || cleanDigits(YOUR_NUMBER_HERE);
export const CONFIGURED_EMAIL = (envEmail || YOUR_EMAIL_HERE || '').trim();

/**
 * Validate that a WhatsApp phone number has 10-15 digits and is not the default placeholder
 */
export function isValidWhatsAppNumber(num: string = CONFIGURED_PHONE_NUMBER): boolean {
  const digits = cleanDigits(num);
  if (!digits) return false;
  if (digits === PLACEHOLDER_NUMBER) return false;
  return /^[1-9]\d{9,14}$/.test(digits);
}

/**
 * Format phone number into standard human-readable display string
 */
export function formatDisplayPhoneNumber(num: string = CONFIGURED_PHONE_NUMBER): string {
  const digits = cleanDigits(num);
  if (!digits) return '+91 79 7597 6491';
  // 12-digit Indian number: 91XXXXXXXXXX -> +91 XX XXXX XXXX
  if (digits.length === 12 && digits.startsWith('91')) {
    const p = digits.slice(2);
    return `+91 ${p.slice(0, 2)} ${p.slice(2, 6)} ${p.slice(6)}`;
  }
  // 10-digit Indian number: XXXXXXXXXX -> +91 XXXXX XXXXX
  if (digits.length === 10) {
    return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`;
  }
  return `+${digits}`;
}

export const WHATSAPP_CONFIG = {
  phoneNumber: CONFIGURED_PHONE_NUMBER,
  agencyPhoneFormatted: formatDisplayPhoneNumber(CONFIGURED_PHONE_NUMBER),
  agencyEmail: CONFIGURED_EMAIL,
  telHref: `tel:+${CONFIGURED_PHONE_NUMBER}`,
  instagramHandle: 'nexora__technologies',
  instagramUrl: 'https://instagram.com/nexora__technologies',
  defaultHeroMessage: "Hello Nexora Technologies, I'm interested in creating a website for my business. Please share the details.",
};

export const TEL_HREF = WHATSAPP_CONFIG.telHref;

// Helper to show dev-only warning banner if number is invalid/placeholder
function showDevAlertBanner(msg: string) {
  if (typeof document === 'undefined') return;
  if (document.getElementById('nexora-dev-whatsapp-banner')) return;
  const banner = document.createElement('div');
  banner.id = 'nexora-dev-whatsapp-banner';
  banner.style.cssText =
    'position:fixed;top:0;left:0;right:0;z-index:999999;background:#ef4444;color:#ffffff;' +
    'padding:8px 16px;font-size:12px;font-family:system-ui,-apple-system,sans-serif;font-weight:700;' +
    'text-align:center;box-shadow:0 4px 12px rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;gap:12px;';
  banner.innerHTML = `<span>⚠️ ${msg}</span><button style="background:rgba(255,255,255,0.25);border:none;color:#fff;border-radius:4px;padding:2px 8px;font-size:11px;cursor:pointer;" onclick="this.parentElement.remove()">Dismiss</button>`;
  document.body.prepend(banner);
}

// Dev validation check
if (typeof window !== 'undefined') {
  const isValid = isValidWhatsAppNumber(CONFIGURED_PHONE_NUMBER);
  if (!isValid) {
    console.error(
      `[Nexora WhatsApp Alert] WhatsApp number is invalid or set to placeholder "${CONFIGURED_PHONE_NUMBER}". ` +
      `Please set VITE_WHATSAPP_NUMBER in .env or update YOUR_NUMBER_HERE in src/utils/whatsapp.ts.`
    );
    if (import.meta.env.DEV) {
      if (document.readyState === 'loading') {
        window.addEventListener('DOMContentLoaded', () => {
          showDevAlertBanner(`[DEV ONLY] WhatsApp number is invalid or set to placeholder (${CONFIGURED_PHONE_NUMBER || 'missing'}). Set VITE_WHATSAPP_NUMBER in .env`);
        });
      } else {
        showDevAlertBanner(`[DEV ONLY] WhatsApp number is invalid or set to placeholder (${CONFIGURED_PHONE_NUMBER || 'missing'}). Set VITE_WHATSAPP_NUMBER in .env`);
      }
    }
  }
}

/**
 * Detect in-app browsers (Instagram, Facebook, WhatsApp, etc.)
 */
export function isInAppBrowser(): boolean {
  if (typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent || '';
  return /Instagram|FBAN|FBAV|WhatsApp|Line|Twitter|Snapchat|MicroMessenger|musical_ly|BytedanceWebview/i.test(ua);
}

/**
 * Detect mobile or tablet devices
 */
export function isMobileOrTablet(): boolean {
  if (typeof window === 'undefined') return false;
  const ua = navigator.userAgent || '';
  const isMobileUA = /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
  const isCoarsePointer = typeof window.matchMedia === 'function' && window.matchMedia('(pointer: coarse)').matches;
  return isMobileUA || isCoarsePointer;
}

/**
 * Generate a safe WhatsApp click-to-chat URL:
 * - Sanitizes message: trims, strips lone surrogates (preventing URIError)
 * - Limits length to ~1500 chars
 * - Uses clean configured phone number
 */
export function getWhatsAppUrl(message?: string): string {
  const num = CONFIGURED_PHONE_NUMBER;
  if (!message || !message.trim()) {
    return `https://wa.me/${num}`;
  }

  // Strip lone surrogates to avoid URIError: URI malformed
  const safeMsg = message
    .trim()
    .replace(/[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?<![\uD800-\uDBFF])[\uDC00-\uDFFF]/g, '');

  const truncated = safeMsg.length > 1500 ? safeMsg.slice(0, 1497) + '...' : safeMsg;
  return `https://wa.me/${num}?text=${encodeURIComponent(truncated)}`;
}

/**
 * Show a small helper toast inside in-app browsers where direct redirects might be trapped
 */
function showInAppBrowserFallbackToast(url: string, message: string) {
  if (typeof document === 'undefined') return;
  const toastId = 'nexora-inapp-whatsapp-toast';
  const existing = document.getElementById(toastId);
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = toastId;
  toast.style.cssText =
    'position:fixed;bottom:24px;left:50%;transform:translateX(-50%);z-index:999999;' +
    'background:#0f172a;color:#fff;border:1px solid #10b981;padding:12px 16px;border-radius:16px;' +
    'box-shadow:0 10px 30px rgba(0,0,0,0.85);max-width:92vw;width:380px;font-family:system-ui,-apple-system,sans-serif;font-size:12px;' +
    'display:flex;flex-direction:column;gap:8px;animation:fade-in 0.2s ease-out;';

  toast.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;">
      <span style="font-weight:700;color:#34d399;font-size:12px;">WhatsApp Helper</span>
      <button style="background:transparent;border:none;color:#94a3b8;font-size:16px;line-height:1;cursor:pointer;padding:0 4px;" onclick="document.getElementById('${toastId}').remove()">✕</button>
    </div>
    <p style="margin:0;color:#cbd5e1;line-height:1.4;font-size:11.5px;">If WhatsApp did not open automatically in this app:</p>
    <div style="display:flex;gap:8px;margin-top:2px;">
      <a href="${url}" target="_blank" rel="noopener noreferrer" style="flex:1;text-align:center;background:#10b981;color:#000;font-weight:700;padding:8px 12px;border-radius:8px;text-decoration:none;font-size:11.5px;">Tap to Open WhatsApp</a>
      <button id="${toastId}-copy" style="background:#334155;color:#fff;border:none;padding:8px 12px;border-radius:8px;font-size:11.5px;font-weight:600;cursor:pointer;">Copy Message</button>
    </div>
  `;

  document.body.appendChild(toast);

  const copyBtn = document.getElementById(`${toastId}-copy`);
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      try {
        navigator.clipboard.writeText(message);
        copyBtn.innerText = 'Copied!';
        setTimeout(() => {
          if (copyBtn) copyBtn.innerText = 'Copy Message';
        }, 2000);
      } catch {
        // clipboard unavailable
      }
    });
  }

  setTimeout(() => {
    const el = document.getElementById(toastId);
    if (el) el.remove();
  }, 12000);
}

/**
 * Single reliable openWhatsApp helper:
 * - On phones/tablets: synchronous window.location.href (prevents iOS popup blocking)
 * - On desktop: window.open with fallback to location.href if blocked
 * - If in-app browser: also renders an in-app helper toast with direct link and copy button
 */
export function openWhatsApp(message: string): void {
  const url = getWhatsAppUrl(message);
  const inApp = isInAppBrowser();
  const mobile = isMobileOrTablet();

  if (inApp && typeof document !== 'undefined') {
    showInAppBrowserFallbackToast(url, message);
  }

  if (mobile) {
    // Synchronous execution avoids iOS Safari popup blocker
    window.location.href = url;
    return;
  }

  // Desktop flow
  try {
    const win = window.open(url, '_blank', 'noopener,noreferrer');
    if (!win || win.closed || typeof win.closed === 'undefined') {
      window.location.href = url;
    }
  } catch {
    window.location.href = url;
  }
}

/**
 * Format enquiry lead into an organized, WhatsApp-safe message:
 * - Plain text with short labels and line breaks (\n)
 * - No unstable emojis that render as missing boxes on older devices
 * - Under 12 lines
 * - Skips empty fields instead of showing 'undefined' or blank lines
 */
export function formatLeadWhatsAppMessage(data: {
  fullName?: string;
  businessName?: string;
  phone?: string;
  email?: string;
  businessCategory?: string;
  websiteType?: string;
  budget?: string;
  projectDescription?: string;
}): string {
  const lines: string[] = ['*New Website Enquiry - Nexora Technologies*'];

  if (data.fullName?.trim()) lines.push(`Name: ${data.fullName.trim()}`);
  if (data.businessName?.trim()) lines.push(`Business: ${data.businessName.trim()}`);
  if (data.phone?.trim()) lines.push(`Phone: ${data.phone.trim()}`);
  if (data.email?.trim()) lines.push(`Email: ${data.email.trim()}`);
  if (data.businessCategory?.trim()) lines.push(`Industry: ${data.businessCategory.trim()}`);
  if (data.websiteType?.trim()) lines.push(`Scope: ${data.websiteType.trim()}`);
  if (data.budget?.trim()) lines.push(`Budget: ${data.budget.trim()}`);
  if (data.projectDescription?.trim()) lines.push(`Notes: ${data.projectDescription.trim()}`);

  lines.push('Sent via Nexora Website');
  return lines.slice(0, 12).join('\n');
}

// Development Diagnostic Helper: window.__testWhatsApp()
if (typeof window !== 'undefined') {
  (window as unknown as { __testWhatsApp?: () => unknown }).__testWhatsApp = () => {
    const sampleMsg = "Hello Nexora Technologies! Diagnostic test message from window.__testWhatsApp().";
    const testUrl = getWhatsAppUrl(sampleMsg);
    console.info('[Nexora WhatsApp Diagnostic]');
    console.info('Configured WhatsApp Number:', CONFIGURED_PHONE_NUMBER);
    console.info('Display Formatted Phone:', formatDisplayPhoneNumber(CONFIGURED_PHONE_NUMBER));
    console.info('Is Valid Number:', isValidWhatsAppNumber(CONFIGURED_PHONE_NUMBER));
    console.info('Configured Email:', CONFIGURED_EMAIL);
    console.info('Sample Generated WhatsApp URL:', testUrl);
    return {
      number: CONFIGURED_PHONE_NUMBER,
      email: CONFIGURED_EMAIL,
      isValid: isValidWhatsAppNumber(CONFIGURED_PHONE_NUMBER),
      testUrl,
    };
  };
}
