// Nexora Technologies WhatsApp Configuration
export const WHATSAPP_CONFIG = {
  phoneNumber: '919876543210', // Configurable business WhatsApp number
  agencyEmail: 'contact@nexoratechnologies.com',
  agencyPhoneFormatted: '+91 98765 43210',
  defaultHeroMessage: "Hello Nexora Technologies, I'm interested in creating a website for my business. Please share the details.",
};

/**
 * Generate a WhatsApp click-to-chat URL with a prefilled, URL-encoded message
 */
export function getWhatsAppUrl(message: string, phone: string = WHATSAPP_CONFIG.phoneNumber): string {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const encodedMsg = encodeURIComponent(message.trim());
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
