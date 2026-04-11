import { useEffect, useRef } from 'react';

/**
 * Hook for scroll-triggered reveal animations on SECTION-LEVEL elements (.reveal).
 * Per-card animations are handled by <ScrollRevealCard> which owns its own observer.
 * Respects prefers-reduced-motion.
 * Returns a ref to attach to the page container element.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      container.querySelectorAll('.reveal').forEach((el) => el.classList.add('revealed'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    container.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return ref;
}
