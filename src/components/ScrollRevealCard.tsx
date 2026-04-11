import { useEffect, useRef, type ReactNode } from 'react';

interface ScrollRevealCardProps {
  children: ReactNode;
  /** Stagger delay in milliseconds (default 0) */
  delay?: number;
  /** Extra classes on the wrapper div */
  className?: string;
}

/**
 * Wraps any card in a self-contained scroll-reveal animation.
 * Each instance owns its own IntersectionObserver, so there are
 * NO race conditions between navigations, filter changes, or re-renders.
 *
 * How it works:
 * - Card starts invisible (opacity 0 + translateY + scale via CSS .reveal-card)
 * - On mount, an IntersectionObserver is attached to the card's own DOM node
 * - When the card enters the viewport, 'revealed' class is toggled and the CSS
 *   transition plays the reveal animation
 * - Observer is disconnected immediately after to avoid repeat triggers
 * - On unmount (navigation / filter change), everything is cleaned up automatically
 */
export function ScrollRevealCard({
  children,
  delay = 0,
  className = '',
}: ScrollRevealCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced-motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('revealed');
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('revealed');
          observer.unobserve(el);
        }
      },
      {
        threshold: 0,
        // Slight negative bottom margin keeps cards from popping in too early
        rootMargin: '0px 0px -16px 0px',
      }
    );

    observer.observe(el);

    // Cleanup runs when the card unmounts (filter change, navigation, etc.)
    return () => observer.disconnect();
  }, []); // Empty deps: runs once per mount — exactly what we want

  return (
    <div
      ref={ref}
      className={`reveal-card ${className}`.trim()}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
