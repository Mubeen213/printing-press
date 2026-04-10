import type { ReactNode } from 'react';
import { Container } from '@/components/ui/Container';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  bgImage?: string;
  bgColor?: 'primary' | 'secondary' | 'gradient';
  compact?: boolean;
}

const bgClasses = {
  primary: 'bg-primary-light',
  secondary: 'bg-secondary text-white',
  gradient: 'bg-gradient-to-br from-primary to-primary-hover text-white',
};

export function PageHero({
  title,
  subtitle,
  children,
  bgImage,
  bgColor = 'primary',
  compact = false,
}: PageHeroProps) {
  const paddingClass = compact ? 'py-12 md:py-16' : 'py-16 md:py-24';

  return (
    <section className={`relative ${paddingClass} ${bgClasses[bgColor]} overflow-hidden`}>
      {bgImage && (
        <>
          <img
            src={bgImage}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-black/50" />
        </>
      )}
      <Container className="relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display mb-4">
            {title}
          </h1>
          {subtitle && (
            <p className={`text-base md:text-lg leading-relaxed max-w-2xl ${bgColor === 'primary' ? 'text-text-secondary' : 'text-white/80'}`}>
              {subtitle}
            </p>
          )}
          {children && <div className="mt-6">{children}</div>}
        </div>
      </Container>
    </section>
  );
}
