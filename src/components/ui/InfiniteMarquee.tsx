import React from 'react';

interface InfiniteMarqueeProps {
  children: React.ReactNode;
  direction?: 'left' | 'right';
  speed?: number; // seconds for one full loop
  pauseOnHover?: boolean;
  className?: string;
}

export function InfiniteMarquee({
  children,
  direction = 'left',
  speed = 30,
  pauseOnHover = true,
  className = '',
}: InfiniteMarqueeProps) {
  return (
    <div className={`group flex overflow-hidden select-none gap-4 ${className}`}>
      <div
        className={`flex shrink-0 justify-around gap-4 min-w-full animate-marquee ${
          direction === 'right' ? 'animate-direction-reverse' : ''
        } ${pauseOnHover ? 'group-hover:[animation-play-state:paused]' : ''}`}
        style={{ animationDuration: `${speed}s` }}
      >
        {children}
        {children}
      </div>
      <div
        aria-hidden="true"
        className={`flex shrink-0 justify-around gap-4 min-w-full animate-marquee ${
          direction === 'right' ? 'animate-direction-reverse' : ''
        } ${pauseOnHover ? 'group-hover:[animation-play-state:paused]' : ''}`}
        style={{ animationDuration: `${speed}s` }}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
