import { Heart, Zap, Shield, MessageCircle } from 'lucide-react';
import { SectionWrapper } from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import { PageHero } from '@/components/PageHero';
import { aboutContent } from '@/data/siteContent';
import { buildDefaultWhatsAppUrl } from '@/utils/whatsapp';
import { useSEO } from '@/utils/seo';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Heart, Zap, Shield, MessageCircle,
};

export function AboutPage() {
  useSEO({
    title: 'About Us',
    description: 'Learn about Printaze — your local partner for custom printing, apparel, and gifting.',
  });

  return (
    <div>
      <PageHero
        title="About Printaze"
        subtitle="Your local partner for custom printing, apparel, and gifting in Hyderabad."
        bgColor="gradient"
      />

      <SectionWrapper>
        <div className="max-w-3xl mx-auto space-y-8">
          <div>
            <h2 className="text-2xl font-bold font-display mb-4">Our Mission</h2>
            <p className="text-text-secondary leading-relaxed">{aboutContent.mission}</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold font-display mb-4">Who We Serve</h2>
            <p className="text-text-secondary leading-relaxed">{aboutContent.whoWeServe}</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold font-display mb-4">Why WhatsApp-First?</h2>
            <p className="text-text-secondary leading-relaxed">{aboutContent.whyWhatsApp}</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold font-display mb-4">Our Service Philosophy</h2>
            <p className="text-text-secondary leading-relaxed">{aboutContent.servicePhilosophy}</p>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper bgColor="alt">
        <SectionHeader title="What We Stand For" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {aboutContent.values.map((v) => {
            const Icon = iconMap[v.icon] || Heart;
            return (
              <div key={v.title} className="text-center">
                <div className="w-14 h-14 bg-primary-light rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold text-text mb-2">{v.title}</h3>
                <p className="text-sm text-text-secondary">{v.description}</p>
              </div>
            );
          })}
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <div className="text-center max-w-2xl mx-auto">
          <SectionHeader
            title="Built for Hyderabad"
            subtitle="Startups, local businesses, schools, events, and weddings — we serve them all with care and quality."
          />
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {['Startups', 'Local Businesses', 'Schools & Colleges', 'Hotels & Cafés', 'Events', 'Weddings', 'Corporate Teams'].map((tag) => (
              <span key={tag} className="px-4 py-2 bg-surface-alt rounded-full text-sm text-text-secondary border border-border-light">
                {tag}
              </span>
            ))}
          </div>
          <Button
            href={buildDefaultWhatsAppUrl()}
            external
            variant="whatsapp"
            size="lg"
            icon={<MessageCircle className="w-5 h-5" />}
          >
            Start a Conversation on WhatsApp
          </Button>
        </div>
      </SectionWrapper>
    </div>
  );
}
