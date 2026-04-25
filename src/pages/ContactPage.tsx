import { useState } from 'react';
import { MessageCircle, Phone, User } from 'lucide-react';
import { SectionWrapper } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Input, Textarea, Select } from '@/components/ui/FormElements';
import { PageHero } from '@/components/PageHero';
import { buildWhatsAppUrl } from '@/utils/whatsapp';
import { useSEO } from '@/utils/seo';

export function ContactPage() {
  useSEO({
    title: 'Contact Us',
    description: 'Get in touch with Printaze via WhatsApp. Quick response, no forms, no wait.',
  });

  const [form, setForm] = useState({
    name: '',
    phone: '',
    requirementType: '',
    notes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.requirementType) errs.requirementType = 'Please select a requirement type';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const message = [
      `Hello! I'd like to inquire about your services.`,
      ``,
      `Name: ${form.name.trim()}`,
      form.phone ? `Phone: ${form.phone.trim()}` : '',
      `Requirement: ${form.requirementType}`,
      form.notes ? `Notes: ${form.notes.trim()}` : '',
      ``,
      `Please share details and next steps.`,
    ]
      .filter(Boolean)
      .join('\n');

    window.open(buildWhatsAppUrl(message), '_blank');
  };

  return (
    <div>
      <PageHero
        title="Contact Us"
        subtitle="Have a requirement? Let's talk on WhatsApp. Quick response, no long forms."
        bgColor="gradient"
      />

      <SectionWrapper>
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-text-secondary">
              We're just a WhatsApp message away. Fill in the form below and we'll open WhatsApp with your inquiry pre-filled.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Your Name"
              placeholder="Enter your name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              error={errors.name}
              icon={<User className="w-4 h-4" />}
              required
            />
            <Input
              label="Phone Number (optional)"
              placeholder="Your phone number"
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              icon={<Phone className="w-4 h-4" />}
            />
            <Select
              label="Requirement Type"
              placeholder="What do you need?"
              value={form.requirementType}
              onChange={(e) => setForm({ ...form, requirementType: e.target.value })}
              error={errors.requirementType}
              options={[
                { value: 'Stationery', label: 'Stationery & Business Cards' },
                { value: 'Wedding Invites', label: 'Wedding & Party Invitations' },
                { value: 'Apparel & Uniforms', label: 'Clothing & Apparel' },
                { value: 'Bags', label: 'Custom Bags' },
                { value: 'Corporate Gifts', label: 'Corporate Gifts & Kits' },
                { value: 'Event Signage', label: 'Event Branding & Signage' },
                { value: 'Office Supplies', label: 'Office Stationery' },
                { value: 'Multiple Items', label: 'Multiple Products' },
                { value: 'Other', label: 'Other / Custom Request' },
              ]}
            />
            <Textarea
              label="Notes (optional)"
              placeholder="Tell us about your requirement, timeline, quantity..."
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
              Send Inquiry on WhatsApp
            </Button>
          </form>

          <p className="text-xs text-muted text-center mt-4">
            This form doesn't submit data. It formats your inquiry and opens WhatsApp directly.
          </p>
        </div>
      </SectionWrapper>
    </div>
  );
}
