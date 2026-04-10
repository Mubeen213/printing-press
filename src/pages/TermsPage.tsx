import { SectionWrapper } from '@/components/ui/Container';
import { PageHero } from '@/components/PageHero';
import { siteConfig } from '@/config/site';
import { useSEO } from '@/utils/seo';

export function TermsPage() {
  useSEO({ title: 'Terms & Conditions', noindex: true });

  return (
    <div>
      <PageHero title="Terms & Conditions" bgColor="secondary" compact />

      <SectionWrapper>
        <div className="max-w-3xl mx-auto space-y-6 text-text-secondary leading-relaxed">
          <p>
            <strong className="text-text">Last updated:</strong> April 2026
          </p>
          <p>
            By using the {siteConfig.brand.name} website, you agree to the following terms.
          </p>

          <h2 className="text-xl font-bold text-text font-display mt-8">Service</h2>
          <p>
            {siteConfig.brand.name} provides custom printing and branding services. All orders are
            processed through WhatsApp. This website is an informational and inquiry tool — it does
            not process payments or orders directly.
          </p>

          <h2 className="text-xl font-bold text-text font-display mt-8">Pricing</h2>
          <p>
            Prices shown on the website are indicative starting prices and may vary based on
            specifications, quantity, and customization. Final pricing is confirmed via WhatsApp.
          </p>

          <h2 className="text-xl font-bold text-text font-display mt-8">Intellectual Property</h2>
          <p>
            All content, images, and designs on this website are the property of {siteConfig.brand.name}
            unless otherwise stated. Placeholder images are used for demonstration purposes.
          </p>

          <h2 className="text-xl font-bold text-text font-display mt-8">Contact</h2>
          <p>
            For questions about these terms, contact us on WhatsApp.
          </p>
        </div>
      </SectionWrapper>
    </div>
  );
}
