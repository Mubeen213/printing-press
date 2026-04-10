import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { MessageCircle, ShoppingCart, Check, Shield, Truck, Clock } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionWrapper } from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Accordion } from '@/components/ui/Accordion';
import { Button } from '@/components/ui/Button';
import { ProductBadge } from '@/components/ui/Badge';
import { ProductCard } from '@/components/ProductCard';
import { QuantitySelector } from '@/components/QuantitySelector';
import { EmptyState } from '@/components/EmptyState';
import { useCart } from '@/hooks/useCart';
import { getProductBySlug, getRelatedProducts } from '@/utils/products';
import { getCategoryByKey } from '@/data/categories';
import { getFAQsByIds } from '@/data/faqs';
import { buildProductWhatsAppUrl } from '@/utils/whatsapp';
import { useSEO } from '@/utils/seo';

export function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const product = slug ? getProductBySlug(slug) : undefined;
  const { addItem, isInCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(product?.defaultQty || 1);
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    return <EmptyState type="not-found" />;
  }

  const category = getCategoryByKey(product.categoryKey);
  const related = getRelatedProducts(product.relatedProductIds);
  const productFAQs = product.faqIds ? getFAQsByIds(product.faqIds) : [];
  const allImages = [product.image, ...product.gallery];
  const inCart = isInCart(product.id);

  useSEO({
    title: `${product.title} — ${category?.name || ''}`,
    description: product.shortDescription,
    ogImage: product.image,
  });

  const handleAddToCart = () => {
    addItem(product.id, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleWhatsApp = () => {
    const url = buildProductWhatsAppUrl({
      title: product.title,
      category: category?.name || product.categoryKey,
      quantity,
      offer: product.discountLabel || product.firstTimeOffer,
      productUrl: window.location.href,
    });
    window.open(url, '_blank');
  };

  return (
    <div>
      <section className="py-8 md:py-12">
        <Container>
          <Breadcrumbs
            items={[
              { label: category?.name || 'Products', path: `/category/${category?.slug}` },
              { label: product.title },
            ]}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Gallery */}
            <div>
              <div className="aspect-[4/3] rounded-xl overflow-hidden bg-surface-alt mb-4">
                <img
                  src={allImages[selectedImage]}
                  alt={product.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://placehold.co/800x600/e2e8f0/94a3b8?text=Image';
                  }}
                />
              </div>
              {allImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {allImages.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors cursor-pointer ${
                        selectedImage === i ? 'border-primary' : 'border-border-light'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div>
              {product.badge && (
                <div className="mb-3">
                  <ProductBadge type={product.badge} />
                </div>
              )}

              <h1 className="text-2xl md:text-3xl font-bold font-display text-text mb-2">
                {product.title}
              </h1>
              <p className="text-lg text-text-secondary mb-4">{product.subtitle}</p>
              <p className="text-text-secondary leading-relaxed mb-6">{product.description}</p>

              {/* Price */}
              {product.price != null && (
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl font-bold text-text">₹{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-lg text-muted line-through">
                      ₹{product.originalPrice}
                    </span>
                  )}
                </div>
              )}
              {product.discountLabel && (
                <p className="text-sm text-primary font-medium mb-2">{product.discountLabel}</p>
              )}
              {product.firstTimeOffer && (
                <p className="text-sm text-success font-medium mb-4">🎁 {product.firstTimeOffer}</p>
              )}
              {product.minQty && (
                <p className="text-xs text-muted mb-6">Minimum order: {product.minQty} units</p>
              )}

              {/* Quantity */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-text mb-2">Quantity</label>
                <QuantitySelector
                  value={quantity}
                  onChange={setQuantity}
                  min={product.minQty || 1}
                  max={product.maxQty || 99999}
                />
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <Button
                  variant={addedToCart || inCart ? 'secondary' : 'primary'}
                  size="lg"
                  fullWidth
                  icon={
                    addedToCart ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <ShoppingCart className="w-5 h-5" />
                    )
                  }
                  onClick={handleAddToCart}
                  className={addedToCart ? 'bg-success hover:bg-success' : ''}
                >
                  {addedToCart ? 'Added to Inquiry!' : inCart ? 'Update Inquiry' : 'Add to Inquiry Cart'}
                </Button>
                <Button
                  variant="whatsapp"
                  size="lg"
                  fullWidth
                  icon={<MessageCircle className="w-5 h-5" />}
                  onClick={handleWhatsApp}
                >
                  Inquire on WhatsApp
                </Button>
              </div>

              {/* Trust strip */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Shield, label: 'Quality Guaranteed' },
                  { icon: Truck, label: 'Hyderabad Delivery' },
                  { icon: Clock, label: 'Quick Response' },
                  { icon: MessageCircle, label: 'WhatsApp Support' },
                ].map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2 text-sm text-text-secondary"
                  >
                    <Icon className="w-4 h-4 text-primary shrink-0" />
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Recommended */}
      {product.whatsappMeta?.recommendedFor && (
        <div className="bg-surface-alt py-6">
          <Container>
            <div className="flex flex-wrap items-center gap-2 justify-center text-sm">
              <span className="text-text-secondary font-medium">Recommended for:</span>
              {product.whatsappMeta.recommendedFor.map((r) => (
                <span
                  key={r}
                  className="px-3 py-1 bg-surface rounded-full text-text-secondary border border-border-light text-xs"
                >
                  {r}
                </span>
              ))}
            </div>
          </Container>
        </div>
      )}

      {/* Related Products */}
      {related.length > 0 && (
        <SectionWrapper>
          <SectionHeader title="You Might Also Like" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </SectionWrapper>
      )}

      {/* FAQ */}
      {productFAQs.length > 0 && (
        <SectionWrapper bgColor="alt">
          <SectionHeader title="Frequently Asked Questions" />
          <div className="max-w-3xl mx-auto">
            <Accordion
              items={productFAQs.map((f) => ({
                id: f.id,
                title: f.question,
                content: f.answer,
              }))}
            />
          </div>
        </SectionWrapper>
      )}

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-surface border-t border-border p-3 flex gap-2 md:hidden z-30">
        <Button variant="primary" fullWidth icon={<ShoppingCart className="w-4 h-4" />} onClick={handleAddToCart} size="sm">
          {inCart ? 'Update' : 'Add'}
        </Button>
        <Button variant="whatsapp" fullWidth icon={<MessageCircle className="w-4 h-4" />} onClick={handleWhatsApp} size="sm">
          WhatsApp
        </Button>
      </div>
    </div>
  );
}
