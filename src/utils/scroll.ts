import type Lenis from 'lenis';

let activeLenisInstance: Lenis | null = null;

/**
 * Register global Lenis smooth scroll instance
 */
export function registerLenisInstance(instance: Lenis | null): void {
  activeLenisInstance = instance;
  if (typeof window !== 'undefined') {
    (window as unknown as { __lenis?: Lenis | null }).__lenis = instance;
  }
}

/**
 * Retrieve active Lenis smooth scroll instance
 */
export function getLenisInstance(): Lenis | null {
  if (activeLenisInstance) return activeLenisInstance;
  if (typeof window !== 'undefined') {
    return (window as unknown as { __lenis?: Lenis | null }).__lenis || null;
  }
  return null;
}

/**
 * Universally reliable smooth scrolling that works seamlessly with Lenis
 * on desktop (>=768px) and native smooth scroll on mobile devices (<768px).
 */
export function scrollToSection(target: string | HTMLElement, offset: number = -50): void {
  const lenis = getLenisInstance();

  if (lenis) {
    try {
      lenis.scrollTo(target, { offset, immediate: false });
      return;
    } catch {
      // Fall through to native calculation if Lenis threw an error
    }
  }

  if (typeof document === 'undefined' || typeof window === 'undefined') return;

  const el = typeof target === 'string'
    ? (target.startsWith('#') ? document.querySelector(target) : document.getElementById(target))
    : target;

  if (el) {
    const rect = el.getBoundingClientRect();
    const targetY = rect.top + window.scrollY + offset;
    window.scrollTo({
      top: Math.max(0, targetY),
      behavior: 'smooth',
    });
  }
}
