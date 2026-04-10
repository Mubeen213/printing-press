import type { ReactNode } from 'react';

type BadgeVariant = 'bestseller' | 'new' | 'offer' | 'bulk' | 'first-order' | 'default';

interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
  size?: 'sm' | 'md';
}

const variantClasses: Record<BadgeVariant, string> = {
  bestseller: 'bg-amber-100 text-amber-800 border-amber-200',
  new: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  offer: 'bg-rose-100 text-rose-800 border-rose-200',
  bulk: 'bg-blue-100 text-blue-800 border-blue-200',
  'first-order': 'bg-purple-100 text-purple-800 border-purple-200',
  default: 'bg-surface-alt text-text-secondary border-border',
};

const badgeLabels: Record<string, string> = {
  bestseller: '🏆 Bestseller',
  new: '✨ New',
  offer: '🎉 Offer',
  bulk: '📦 Bulk Friendly',
  'first-order': '🎁 First Order Offer',
};

export function Badge({ variant = 'default', children, className = '', size = 'sm' }: BadgeProps) {
  const sizeClass = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm';

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border ${sizeClass} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

/**
 * Convenience component that auto-maps badge type to label.
 */
export function ProductBadge({ type, className = '' }: { type: string; className?: string }) {
  const label = badgeLabels[type] || type;
  const variant = (type in variantClasses ? type : 'default') as BadgeVariant;

  return (
    <Badge variant={variant} className={className}>
      {label}
    </Badge>
  );
}
