import { useState } from 'react';
import { MessageCircle, Trash2, ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Input, Textarea, Select } from '@/components/ui/FormElements';
import { QuantitySelector } from '@/components/QuantitySelector';
import { EmptyState } from '@/components/EmptyState';
import { useCart } from '@/hooks/useCart';
import { getProductById } from '@/utils/products';
import { getCategoryByKey } from '@/data/categories';
import { buildCartWhatsAppUrl } from '@/utils/whatsapp';
import { useSEO } from '@/utils/seo';

export function CartPage() {
  useSEO({ title: 'Inquiry Cart' });
  const { items, updateQuantity, removeItem, clearCart } = useCart();
  const [showModal, setShowModal] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: '',
    phone: '',
    businessType: '',
    notes: '',
  });

  const cartProducts = items
    .map((item) => {
      const product = getProductById(item.productId);
      return product ? { ...item, product } : null;
    })
    .filter(Boolean) as Array<{ productId: string; quantity: number; product: NonNullable<ReturnType<typeof getProductById>> }>;

  const handleSendInquiry = () => {
    const url = buildCartWhatsAppUrl({
      items: cartProducts.map((item) => ({
        title: item.product.title,
        quantity: item.quantity,
      })),
      userName: userInfo.name || undefined,
      userPhone: userInfo.phone || undefined,
      businessType: userInfo.businessType || undefined,
      notes: userInfo.notes || undefined,
    });
    window.open(url, '_blank');
  };

  if (cartProducts.length === 0) {
    return (
      <section className="py-16">
        <Container>
          <EmptyState
            type="cart"
            action={
              <Button to="/category/stationery" variant="primary" icon={<ArrowRight className="w-4 h-4" />}>
                Browse Products
              </Button>
            }
          />
        </Container>
      </section>
    );
  }

  return (
    <section className="py-8 md:py-12">
      <Container>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl md:text-3xl font-bold font-display text-text">
            Cart ({cartProducts.length})
          </h1>
          <Button variant="ghost" size="sm" onClick={clearCart} className="text-error hover:text-error">
            Clear All
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartProducts.map((item) => {
              const category = getCategoryByKey(item.product.categoryKey);
              return (
                <div
                  key={item.productId}
                  className="flex gap-4 p-4 bg-surface rounded-xl border border-border-light shadow-card"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg object-contain shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-xs text-muted">{category?.name}</p>
                        <h3 className="font-semibold text-text">{item.product.title}</h3>
                        <p className="text-sm text-text-secondary">{item.product.subtitle}</p>
                        {item.product.discountLabel && (
                          <p className="text-xs text-primary font-medium mt-1">{item.product.discountLabel}</p>
                        )}
                      </div>
                      <button
                        onClick={() => removeItem(item.productId)}
                        className="p-1.5 text-muted hover:text-error transition-colors shrink-0 cursor-pointer"
                        aria-label={`Remove ${item.product.title}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <QuantitySelector
                        value={item.quantity}
                        onChange={(qty) => updateQuantity(item.productId, qty)}
                        min={item.product.minQty || 1}
                        max={item.product.maxQty}
                      />
                      {item.product.price != null && (
                        <span className="text-sm font-medium text-text">₹{item.product.price}</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-surface rounded-xl border border-border-light shadow-card p-6 sticky top-20">
              <h2 className="font-semibold text-text mb-4">Send Inquiry</h2>
              <p className="text-sm text-text-secondary mb-6">
                Fill in optional details to help us serve you better, then send your inquiry on WhatsApp.
              </p>

              <div className="space-y-4 mb-6">
                <Input
                  label="Name (optional)"
                  placeholder="Your name"
                  value={userInfo.name}
                  onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                />
                <Input
                  label="Phone (optional)"
                  placeholder="Your phone number"
                  value={userInfo.phone}
                  onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                />
                <Select
                  label="Business/Event Type"
                  placeholder="Select type"
                  value={userInfo.businessType}
                  onChange={(e) => setUserInfo({ ...userInfo, businessType: e.target.value })}
                  options={[
                    { value: 'startup', label: 'Startup' },
                    { value: 'corporate', label: 'Corporate / Business' },
                    { value: 'wedding', label: 'Wedding' },
                    { value: 'event', label: 'Event / Exhibition' },
                    { value: 'school', label: 'School / College' },
                    { value: 'retail', label: 'Retail / Local Store' },
                    { value: 'personal', label: 'Personal' },
                    { value: 'other', label: 'Other' },
                  ]}
                />
                <Textarea
                  label="Notes (optional)"
                  placeholder="Any specific requirements..."
                  value={userInfo.notes}
                  onChange={(e) => setUserInfo({ ...userInfo, notes: e.target.value })}
                />
              </div>

              <Button
                variant="whatsapp"
                size="lg"
                fullWidth
                icon={<MessageCircle className="w-5 h-5" />}
                onClick={handleSendInquiry}
              >
                Send Inquiry on WhatsApp
              </Button>

              <div className="mt-4 text-center">
                <Button to="/" variant="ghost" size="sm">
                  Continue Browsing
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal placeholder */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
            <div className="bg-surface rounded-2xl p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
              <h2 className="text-lg font-semibold mb-4">Ready to send?</h2>
              <p className="text-text-secondary mb-4">Your inquiry will be sent to our WhatsApp.</p>
              <Button variant="whatsapp" fullWidth onClick={handleSendInquiry} icon={<MessageCircle className="w-5 h-5" />}>
                Open WhatsApp
              </Button>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
