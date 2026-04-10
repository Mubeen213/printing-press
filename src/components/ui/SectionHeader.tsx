import type { ReactNode } from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
  action?: ReactNode;
  tag?: 'h1' | 'h2' | 'h3';
}

export function SectionHeader({
  title,
  subtitle,
  align = 'center',
  className = '',
  action,
  tag: Tag = 'h2',
}: SectionHeaderProps) {
  const alignClass = align === 'center' ? 'text-center' : 'text-left';

  return (
    <div className={`mb-10 md:mb-12 ${alignClass} ${className}`}>
      <Tag className="text-2xl md:text-3xl lg:text-4xl font-bold text-text font-display">
        {title}
      </Tag>
      {subtitle && (
        <p className="mt-3 text-base md:text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
