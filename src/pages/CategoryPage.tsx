import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionWrapper } from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Accordion } from '@/components/ui/Accordion';
import { Button } from '@/components/ui/Button';
import { ProductCard } from '@/components/ProductCard';
import { FilterChips } from '@/components/FilterChips';
import { PageHero } from '@/components/PageHero';
import { EmptyState } from '@/components/EmptyState';
import { ScrollRevealCard } from '@/components/ScrollRevealCard';
import { getCategoryBySlug } from '@/data/categories';
import { getFAQsByCategory } from '@/data/faqs';
import { getProductsByCategory } from '@/utils/products';
import { buildDefaultWhatsAppUrl } from '@/utils/whatsapp';
import { useSEO } from '@/utils/seo';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import type { CategoryKey } from '@/types';

export function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const category = slug ? getCategoryBySlug(slug) : undefined;
  const [activeFilter, setActiveFilter] = useState('all');
  const containerRef = useScrollReveal<HTMLDivElement>();

  // Reset filter to 'all' every time the category changes
  useEffect(() => {
    setActiveFilter('all');
  }, [slug]);

  if (!category) {
    return <EmptyState type="not-found" />;
  }

  const products = getProductsByCategory(category.key as CategoryKey);
  const categoryFAQs = getFAQsByCategory(category.key);

  useSEO({
    title: category.seoTitle,
    description: category.seoDescription,
  });

  const filterOptions = [
    { key: 'all', label: 'All', count: products.length },
    { key: 'bestseller', label: 'Bestsellers', count: products.filter((p) => p.bestseller).length },
    { key: 'new', label: 'New Arrivals', count: products.filter((p) => p.newArrival).length },
    { key: 'offer', label: 'With Offers', count: products.filter((p) => p.discountLabel || p.firstTimeOffer).length },
  ].filter((f) => f.count > 0);

  const filteredProducts = products.filter((p) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'bestseller') return p.bestseller;
    if (activeFilter === 'new') return p.newArrival;
    if (activeFilter === 'offer') return p.discountLabel || p.firstTimeOffer;
    return true;
  });

  return (
    <div ref={containerRef}>
      <PageHero
        title={category.name}
        subtitle={category.description}
        bgColor="gradient"
      >
        <Button
          variant="whatsapp"
          size="lg"
          href={buildDefaultWhatsAppUrl()}
          external
          icon={<MessageCircle className="w-5 h-5" />}
          className="bg-white !text-primary hover:bg-white/90"
        >
          Get a Quote
        </Button>
      </PageHero>

      {/* Trust Strip */}
      <div className="bg-surface-alt py-4 border-b border-border-light">
        <Container>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-sm text-text-secondary">
            <span>✓ Local Hyderabad Service</span>
            <span>✓ Bulk Friendly</span>
            <span>✓ Design Support</span>
            <span>✓ WhatsApp Ordering</span>
          </div>
        </Container>
      </div>

      {/* Products */}
      <SectionWrapper>
        {filterOptions.length > 1 && (
          <FilterChips
            options={filterOptions}
            activeKey={activeFilter}
            onChange={setActiveFilter}
            className="mb-8"
          />
        )}

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredProducts.map((product, index) => (
              <ScrollRevealCard key={product.id} delay={index * 65}>
                <ProductCard product={product} />
              </ScrollRevealCard>
            ))}
          </div>
        ) : (
          <EmptyState
            type="search"
            title="No products match this filter"
            description="Try selecting a different filter."
            action={
              <Button variant="primary" onClick={() => setActiveFilter('all')}>
                Show All Products
              </Button>
            }
          />
        )}
      </SectionWrapper>

      {/* FAQ */}
      {categoryFAQs.length > 0 && (
        <SectionWrapper bgColor="alt">
          <SectionHeader
            title={`${category.name} — FAQs`}
            subtitle="Common questions about this category."
            action={
              <Button to="/faq" variant="ghost" iconRight={<ArrowRight className="w-4 h-4" />}>
                View All FAQs
              </Button>
            }
          />
          <div className="max-w-3xl mx-auto">
            <Accordion
              items={categoryFAQs.map((f) => ({
                id: f.id,
                title: f.question,
                content: f.answer,
              }))}
            />
          </div>
        </SectionWrapper>
      )}

      {/* CTA */}
      <section className="py-12 bg-primary-light">
        <Container>
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold font-display text-text mb-3">
              Need {category.name.toLowerCase()} for your business?
            </h2>
            <p className="text-text-secondary mb-6 max-w-md mx-auto">
              Share your requirements on WhatsApp and get a custom quote in minutes.
            </p>
            <Button
              href={buildDefaultWhatsAppUrl()}
              external
              variant="whatsapp"
              size="lg"
              icon={<MessageCircle className="w-5 h-5" />}
            >
              Get Quote on WhatsApp
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
