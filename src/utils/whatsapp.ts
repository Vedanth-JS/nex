// Nexora Technologies WhatsApp Configuration
export const WHATSAPP_CONFIG = {
  directChatUrl: 'https://wa.me/message/EXH65NF6VVGHN1',
  phoneNumber: '917975976491', // Configurable business WhatsApp number
  agencyPhoneFormatted: '+91 79 7597 6491',
  agencyEmail: 'contact.nexoratecnologies@gmail.com',
  instagramHandle: 'nexora__technologies',
  instagramUrl: 'https://instagram.com/nexora__technologies',
  defaultHeroMessage: "Hello Nexora Technologies, I'm interested in creating a website for my business. Please share the details.",
};

/**
 * Generate a WhatsApp click-to-chat URL with a prefilled, URL-encoded message
 */
export function getWhatsAppUrl(message?: string, target: string = WHATSAPP_CONFIG.directChatUrl): string {
  if (!message || !message.trim()) {
    return target.startsWith('http') ? target : `https://wa.me/${target.replace(/[^0-9]/g, '')}`;
  }
  const encodedMsg = encodeURIComponent(message.trim());
  if (target.startsWith('http')) {
    const separator = target.includes('?') ? '&' : '?';
    return `${target}${separator}text=${encodedMsg}`;
  }
  const cleanPhone = target.replace(/[^0-9]/g, '');
  return `https://wa.me/${cleanPhone}?text=${encodedMsg}`;
}

/**
 * Format enquiry lead into an organized WhatsApp message
 */
export function formatLeadWhatsAppMessage(data: {
  fullName: string;
  businessName: string;
  phone: string;
  email: string;
  businessCategory: string;
  websiteType: string;
  budget: string;
  projectDescription?: string;
}): string {
  return `*New Website Enquiry - Nexora Technologies*
---------------------------------------
👤 *Client Name:* ${data.fullName}
🏢 *Business Name:* ${data.businessName}
📞 *Phone:* ${data.phone}
✉️ *Email:* ${data.email}
🏷️ *Category:* ${data.businessCategory}
💻 *Website Required:* ${data.websiteType}
💰 *Budget Range:* ${data.budget}
📝 *Project Notes:* ${data.projectDescription || 'Need a modern, conversion-focused website for my business.'}
---------------------------------------
Sent via Nexora Technologies Website`;
}
