import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/EmptyState';
import { useSEO } from '@/utils/seo';

export function NotFoundPage() {
  useSEO({ title: 'Page Not Found', noindex: true });

  return (
    <section className="py-16">
      <EmptyState
        type="not-found"
        action={
          <div className="flex gap-3">
            <Button to="/" variant="primary">
              Go to Home
            </Button>
            <Button to="/category/stationery" variant="outline">
              Browse Products
            </Button>
          </div>
        }
      />
    </section>
  );
}
