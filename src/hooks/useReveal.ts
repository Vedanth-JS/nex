import { useEffect, useRef, useState } from 'react';

export interface UseRevealOptions {
  threshold?: number;
  rootMargin?: string;
  delay?: number;
  staggerChildren?: boolean;
}

/**
 * Custom hook for smooth scroll-reveal animations using IntersectionObserver.
 * Automatically respects prefers-reduced-motion.
 */
export function useReveal(options: UseRevealOptions = {}) {
  const {
    threshold = 0.15,
    rootMargin = '0px 0px -50px 0px',
    delay = 0,
  } = options;

  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(() => {
    if (typeof window !== 'undefined' && (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !('IntersectionObserver' in window)
    )) {
      return true;
    }
    return false;
  });

  useEffect(() => {
    if (isVisible) return;

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay > 0) {
            setTimeout(() => {
              setIsVisible(true);
            }, delay);
          } else {
            setIsVisible(true);
          }
          // Once revealed, unobserve to avoid re-triggering and preserve CPU
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, delay, isVisible]);

  const revealClasses = isVisible
    ? 'opacity-100 translate-y-0 scale-100 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]'
    : 'opacity-0 translate-y-6 scale-[0.98] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]';

  return { ref, isVisible, revealClasses };
}

export default useReveal;
