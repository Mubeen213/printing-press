import type { ReactNode } from 'react';
import { SearchX, ShoppingCart, FileQuestion } from 'lucide-react';
import { Button } from '@/components/ui/Button';

type EmptyType = 'cart' | 'search' | 'not-found' | 'default';

interface EmptyStateProps {
  type?: EmptyType;
  title?: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

const defaults: Record<EmptyType, { icon: ReactNode; title: string; description: string }> = {
  cart: {
    icon: <ShoppingCart className="w-16 h-16 text-muted" />,
    title: 'Your cart is empty',
    description: 'Browse our products and add items to get a quote on WhatsApp.',
  },
  search: {
    icon: <SearchX className="w-16 h-16 text-muted" />,
    title: 'No results found',
    description: 'Try different keywords or browse our categories.',
  },
  'not-found': {
    icon: <FileQuestion className="w-16 h-16 text-muted" />,
    title: 'Page not found',
    description: 'The page you\'re looking for doesn\'t exist or has been moved.',
  },
  default: {
    icon: <FileQuestion className="w-16 h-16 text-muted" />,
    title: 'Nothing here yet',
    description: 'Check back later for updates.',
  },
};

export function EmptyState({
  type = 'default',
  title,
  description,
  action,
  className = '',
}: EmptyStateProps) {
  const config = defaults[type];

  return (
    <div className={`flex flex-col items-center justify-center py-16 text-center ${className}`}>
      <div className="mb-6">{config.icon}</div>
      <h2 className="text-xl font-semibold text-text mb-2">{title || config.title}</h2>
      <p className="text-text-secondary max-w-md mb-6">{description || config.description}</p>
      {action || (
        <Button to="/" variant="primary">
          Go to Home
        </Button>
      )}
    </div>
  );
}
