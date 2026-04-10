import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { SectionWrapper } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Input, Textarea, Select } from '@/components/ui/FormElements';
import { QuantitySelector } from '@/components/QuantitySelector';
import { PageHero } from '@/components/PageHero';
import { categories } from '@/data/categories';
import { getProductsByCategory } from '@/utils/products';
import { buildWhatsAppUrl } from '@/utils/whatsapp';
import { useSEO } from '@/utils/seo';
import type { CategoryKey } from '@/types';

export function GetQuotePage() {
  useSEO({
    title: 'Get a Quote',
    description: 'Get a free quote for custom printing in Hyderabad. Select products, quantities, and send your inquiry on WhatsApp.',
  });

  const [form, setForm] = useState({
    name: '',
    phone: '',
    category: '',
    product: '',
    quantity: 100,
    timeline: '',
    notes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const categoryOptions = categories.map((c) => ({ value: c.key, label: c.name }));
  const productOptions = form.category
    ? getProductsByCategory(form.category as CategoryKey).map((p) => ({
        value: p.title,
        label: p.title,
      }))
    : [];

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.category) errs.category = 'Please select a category';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const selectedCategory = categories.find((c) => c.key === form.category);

    const message = [
      `Hello! I'd like a quote for the following:`,
      ``,
      `Category: ${selectedCategory?.name || form.category}`,
      form.product ? `Product: ${form.product}` : '',
      `Quantity: ${form.quantity}`,
      form.timeline ? `Timeline: ${form.timeline}` : '',
      form.name ? `Name: ${form.name.trim()}` : '',
      form.phone ? `Phone: ${form.phone.trim()}` : '',
      form.notes ? `Notes: ${form.notes.trim()}` : '',
      ``,
      `Service Area: Hyderabad`,
      `Please share pricing, production timeline, and available options.`,
    ]
      .filter(Boolean)
      .join('\n');

    window.open(buildWhatsAppUrl(message), '_blank');
  };

  return (
    <div>
      <PageHero
        title="Get a Free Quote"
        subtitle="Select what you need, tell us the quantity, and get an instant quote on WhatsApp."
        bgColor="gradient"
      />

      <SectionWrapper>
        <div className="max-w-xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-5">
            <Select
              label="Category"
              placeholder="Select a category"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value, product: '' })}
              options={categoryOptions}
              error={errors.category}
            />

            {productOptions.length > 0 && (
              <Select
                label="Product (optional)"
                placeholder="Select a product"
                value={form.product}
                onChange={(e) => setForm({ ...form, product: e.target.value })}
                options={productOptions}
              />
            )}

            <div>
              <label className="block text-sm font-medium text-text mb-2">Quantity</label>
              <QuantitySelector
                value={form.quantity}
                onChange={(qty) => setForm({ ...form, quantity: qty })}
                min={1}
                max={100000}
              />
            </div>

            <Select
              label="Timeline (optional)"
              placeholder="When do you need it?"
              value={form.timeline}
              onChange={(e) => setForm({ ...form, timeline: e.target.value })}
              options={[
                { value: 'Urgent (1-3 days)', label: 'Urgent (1-3 days)' },
                { value: 'Standard (5-7 days)', label: 'Standard (5-7 days)' },
                { value: 'Relaxed (2+ weeks)', label: 'Relaxed (2+ weeks)' },
                { value: 'No rush', label: 'No rush / Just exploring' },
              ]}
            />

            <Input
              label="Name (optional)"
              placeholder="Your name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <Input
              label="Phone (optional)"
              placeholder="Your phone number"
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
            <Textarea
              label="Additional Notes"
              placeholder="Design requirements, color preferences, special instructions..."
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
            />

            <Button
              type="submit"
              variant="whatsapp"
              size="lg"
              fullWidth
              icon={<MessageCircle className="w-5 h-5" />}
            >
              Get Quote on WhatsApp
            </Button>
          </form>
        </div>
      </SectionWrapper>
    </div>
  );
}
