// Shared React hooks for all Nexora demo sites
import { useState, useEffect, useRef, useCallback } from 'react';

/** Safe localStorage hook with try/catch */
export function useLocalStorage<T>(key: string, defaultValue: T): [T, (v: T | ((prev: T) => T)) => void] {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored !== null ? (JSON.parse(stored) as T) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  const set = useCallback((newVal: T | ((prev: T) => T)) => {
    setValue(prev => {
      const resolved = typeof newVal === 'function' ? (newVal as (prev: T) => T)(prev) : newVal;
      try {
        localStorage.setItem(key, JSON.stringify(resolved));
      } catch { /* noop */ }
      return resolved;
    });
  }, [key]);

  return [value, set];
}

/** Count-up animation hook */
export function useCountUp(target: number, duration = 1200): number {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    if (target === 0) return;
    const step = target / (duration / 16);
    let val = 0;
    const id = setInterval(() => {
      val = Math.min(val + step, target);
      setCurrent(Math.round(val));
      if (val >= target) clearInterval(id);
    }, 16);
    return () => clearInterval(id);
  }, [target, duration]);
  return target === 0 ? 0 : current;
}

/** Intersection observer for reveal on scroll */
export function useInView(threshold = 0.15): [React.RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); obs.disconnect(); }
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/** Toast notification hook */
export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const show = useCallback((message: string, type: Toast['type'] = 'success') => {
    const id = crypto.randomUUID();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500);
  }, []);
  const dismiss = useCallback((id: string) => setToasts(prev => prev.filter(t => t.id !== id)), []);
  return { toasts, show, dismiss };
}

/** Reduces-motion detection */
export function usePrefersReducedMotion(): boolean {
  const [pref, setPref] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false
  );
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e: MediaQueryListEvent) => setPref(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return pref;
}

/** Countdown timer hook that ticks every second */
export function useCountdown(targetSeconds: number): { remaining: number; pct: number } {
  const [remaining, setRemaining] = useState(targetSeconds);
  useEffect(() => {
    const id = setInterval(() => {
      setRemaining(r => (r > 0 ? r - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return { remaining, pct: targetSeconds > 0 ? (remaining / targetSeconds) * 100 : 0 };
}

