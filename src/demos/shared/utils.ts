// Shared utility functions for all Nexora demo sites

/** Format a number to INR currency string */
export function formatINR(amount: number): string {
  if (amount >= 10_000_000) return `₹${(amount / 10_000_000).toFixed(2)} Cr`;
  if (amount >= 100_000) return `₹${(amount / 100_000).toFixed(2)} L`;
  return `₹${amount.toLocaleString('en-IN')}`;
}

/** Parse INR string like "₹18,500" to number */
export function parseINR(str: string): number {
  return parseInt(str.replace(/[₹,]/g, '').trim(), 10) || 0;
}

/** Calculate nights between two date strings */
export function calcNights(checkIn: string, checkOut: string): number {
  const d1 = new Date(checkIn).getTime();
  const d2 = new Date(checkOut).getTime();
  const diff = d2 - d1;
  return diff > 0 ? Math.round(diff / (1000 * 60 * 60 * 24)) : 0;
}

/** Is the current real time between start and end HH:MM strings? */
export function isNowBetween(startHHMM: string, endHHMM: string): boolean {
  const now = new Date();
  const [sh, sm] = startHHMM.split(':').map(Number);
  const [eh, em] = endHHMM.split(':').map(Number);
  const nowMin = now.getHours() * 60 + now.getMinutes();
  const startMin = sh * 60 + sm;
  const endMin = eh * 60 + em;
  return nowMin >= startMin && nowMin < endMin;
}

/** Phone pattern validator (Indian) */
export function isValidPhone(phone: string): boolean {
  return /^[6-9]\d{9}$/.test(phone.replace(/[\s+\-()]/g, ''));
}

/** Generate a short booking token */
export function genToken(prefix: string): string {
  return `${prefix}-${Date.now().toString(36).toUpperCase().slice(-5)}`;
}

/** Debounce a function call */
export function debounce<T extends (...args: unknown[]) => unknown>(fn: T, delay: number) {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

/** Date string helpers */
export function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}
export function addDays(dateStr: string, days: number): string {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}
export function formatDateDisplay(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-IN', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
}

/** Generate ICS calendar file content */
export function generateICS(opts: {
  title: string;
  description: string;
  location: string;
  startDate: string; // YYYY-MM-DD
  startTime: string; // HH:MM
  durationMins: number;
}): string {
  const [y, mo, d] = opts.startDate.split('-');
  const [h, mi] = opts.startTime.split(':');
  const pad = (n: string | number) => String(n).padStart(2, '0');
  const start = `${y}${pad(mo)}${pad(d)}T${pad(h)}${pad(mi)}00`;
  const endDt = new Date(`${opts.startDate}T${opts.startTime}`);
  endDt.setMinutes(endDt.getMinutes() + opts.durationMins);
  const eh = pad(endDt.getHours()), em = pad(endDt.getMinutes());
  const end = `${y}${pad(mo)}${pad(d)}T${eh}${em}00`;
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'BEGIN:VEVENT',
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${opts.title}`,
    `DESCRIPTION:${opts.description}`,
    `LOCATION:${opts.location}`,
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');
}

export function downloadICS(filename: string, content: string) {
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

