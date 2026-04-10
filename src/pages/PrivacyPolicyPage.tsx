import { SectionWrapper } from '@/components/ui/Container';
import { PageHero } from '@/components/PageHero';
import { siteConfig } from '@/config/site';
import { useSEO } from '@/utils/seo';

export function PrivacyPolicyPage() {
  useSEO({ title: 'Privacy Policy', noindex: true });

  return (
    <div>
      <PageHero title="Privacy Policy" bgColor="secondary" compact />

      <SectionWrapper>
        <div className="max-w-3xl mx-auto space-y-6 text-text-secondary leading-relaxed">
          <p>
            <strong className="text-text">Last updated:</strong> April 2026
          </p>
          <p>
            {siteConfig.brand.name} respects your privacy. This page outlines how we handle any
            information you share with us.
          </p>

          <h2 className="text-xl font-bold text-text font-display mt-8">Information We Collect</h2>
          <p>
            We do not collect personal information through this website. If you contact us via
            WhatsApp, any information you share is used solely to process your inquiry.
          </p>

          <h2 className="text-xl font-bold text-text font-display mt-8">Local Storage</h2>
          <p>
            This website uses browser localStorage to persist your inquiry cart. This data stays on
            your device and is never transmitted to any server.
          </p>

          <h2 className="text-xl font-bold text-text font-display mt-8">Third-Party Services</h2>
          <p>
            This website links to WhatsApp for communication and may use Google Fonts for typography.
            These services have their own privacy policies.
          </p>

          <h2 className="text-xl font-bold text-text font-display mt-8">Contact</h2>
          <p>
            If you have questions about this privacy policy, please reach out to us on WhatsApp.
          </p>
        </div>
      </SectionWrapper>
    </div>
  );
}
