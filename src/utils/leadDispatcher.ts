// Lead Transmission Service for Nexora Technologies
// Handles multi-channel dispatch: Email (Web3Forms), Google Sheets (Apps Script Webhook), Local Backup

export interface LeadPayload {
  fullName: string;
  businessName: string;
  phone: string;
  email: string;
  websiteType: string;
  businessCategory: string;
  budget: string;
  projectDescription?: string;
  submittedAt?: string;
}

export const LEAD_CONFIG = {
  // Web3Forms: Free form-to-email service (delivers directly to agencyEmail)
  web3FormsKey: (import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined) || 'cb611cdb-c534-49e2-825a-45b09416c466',
  
  // Google Sheets Apps Script Webhook URL
  googleSheetsUrl: (import.meta.env.VITE_GOOGLE_SHEETS_WEBHOOK_URL as string | undefined) || 
    'https://script.google.com/macros/s/AKfycbx8UG9ZOQkN-iRk2cuAIBg1F1TWlBW2tTCLo41FU5uLlbeiW_LGDbnExTKx5OHDRxDLbQ/exec',
  
  // Default recipient agency email
  recipientEmail: 'contact.nexoratecnologies@gmail.com',
};

/**
 * Dispatch lead to Web3Forms -> delivers directly to contact.nexoratecnologies@gmail.com
 */
export async function sendLeadToEmail(lead: LeadPayload): Promise<{ success: boolean; message?: string }> {
  const accessKey = LEAD_CONFIG.web3FormsKey;
  if (!accessKey) {
    console.info('[Nexora Leads] VITE_WEB3FORMS_ACCESS_KEY is not set. Add it to .env to receive email leads.');
    return { success: false, message: 'Web3Forms access key not configured' };
  }

  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `🚀 New Lead: ${lead.fullName} (${lead.businessName || 'Business'}) - ${lead.budget}`,
        from_name: `${lead.fullName} (via Nexora Web)`,
        to_email: LEAD_CONFIG.recipientEmail,
        client_name: lead.fullName,
        business_name: lead.businessName,
        phone: lead.phone,
        email: lead.email || 'Not provided',
        website_scope: lead.websiteType,
        business_category: lead.businessCategory,
        selected_tier: lead.budget,
        project_description: lead.projectDescription || 'No additional notes provided.',
        submitted_at: lead.submittedAt || new Date().toISOString(),
      }),
    });

    const data = await res.json();
    return { success: Boolean(data.success), message: data.message };
  } catch (err) {
    console.warn('[Nexora Leads] Failed to dispatch email via Web3Forms:', err);
    return { success: false, message: (err as Error).message };
  }
}

/**
 * Dispatch lead to Google Sheets via Google Apps Script Webhook
 */
export async function sendLeadToGoogleSheets(lead: LeadPayload): Promise<{ success: boolean; message?: string }> {
  const webhookUrl = LEAD_CONFIG.googleSheetsUrl;
  if (!webhookUrl) {
    console.info('[Nexora Leads] VITE_GOOGLE_SHEETS_WEBHOOK_URL is not set. Add it to .env to sync leads with Google Sheets.');
    return { success: false, message: 'Google Sheets webhook URL not configured' };
  }

  try {
    // Google Apps Script Web App endpoints accept text/plain with JSON body in no-cors mode seamlessly
    await fetch(webhookUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify({
        fullName: lead.fullName,
        businessName: lead.businessName,
        phone: lead.phone,
        email: lead.email || 'N/A',
        websiteType: lead.websiteType,
        businessCategory: lead.businessCategory,
        budget: lead.budget,
        projectDescription: lead.projectDescription || 'None',
        submittedAt: lead.submittedAt || new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      }),
    });

    return { success: true };
  } catch (err) {
    console.warn('[Nexora Leads] Failed to dispatch lead to Google Sheets:', err);
    return { success: false, message: (err as Error).message };
  }
}

/**
 * Master dispatch handler: dispatches to Email, Google Sheets, and saves local backup
 */
export async function dispatchLead(lead: LeadPayload): Promise<{
  emailDispatched: boolean;
  sheetsDispatched: boolean;
}> {
  // Always persist local backup in visitor's localStorage
  try {
    const existing = JSON.parse(localStorage.getItem('nexora_leads') || '[]');
    existing.push({
      ...lead,
      submittedAt: lead.submittedAt || new Date().toISOString(),
    });
    localStorage.setItem('nexora_leads', JSON.stringify(existing));
  } catch {
    // Ignore storage quota
  }

  // Concurrently dispatch to email and Google Sheets
  const [emailRes, sheetsRes] = await Promise.allSettled([
    sendLeadToEmail(lead),
    sendLeadToGoogleSheets(lead),
  ]);

  return {
    emailDispatched: emailRes.status === 'fulfilled' && emailRes.value.success,
    sheetsDispatched: sheetsRes.status === 'fulfilled' && sheetsRes.value.success,
  };
}

