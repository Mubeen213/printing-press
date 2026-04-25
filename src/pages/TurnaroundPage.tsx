import {
  Search,
  MessageCircle,
  FileText,
  CheckCircle,
  Truck,
  Package,
  type LucideIcon,
} from 'lucide-react';
import { SectionWrapper } from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import { PageHero } from '@/components/PageHero';
import { turnaroundContent } from '@/data/siteContent';
import { buildDefaultWhatsAppUrl } from '@/utils/whatsapp';
import { useSEO } from '@/utils/seo';

const iconMap: Record<string, LucideIcon> = {
  Search,
  MessageCircle,
  FileText,
  CheckCircle,
  Truck,
  Package,
};

export function TurnaroundPage() {
  useSEO({
    title: 'Turnaround & Ordering Info',
    description: 'Learn how ordering works at Printaze. Simple WhatsApp-driven process.',
  });

  return (
    <div>
      <PageHero
        title={turnaroundContent.title}
        subtitle={turnaroundContent.description}
        bgColor="gradient"
        compact
      />

      <SectionWrapper>
        <SectionHeader title="How It Works" subtitle="Simple, transparent, and WhatsApp-driven." />
        <div className="max-w-3xl mx-auto space-y-6">
          {turnaroundContent.steps.map((step, index) => {
            const Icon = iconMap[step.icon] || Package;
            return (
              <div key={index} className="flex gap-4 items-start">
                <div className="w-12 h-12 bg-primary-light rounded-xl flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-text mb-1">
                    {index + 1}. {step.title}
                  </h3>
                  <p className="text-text-secondary text-sm">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </SectionWrapper>

      <SectionWrapper bgColor="alt">
        <div className="text-center max-w-lg mx-auto">
          <SectionHeader title="Ready to Start?" subtitle="Send your first inquiry on WhatsApp." />
          <Button
            href={buildDefaultWhatsAppUrl()}
            external
            variant="whatsapp"
            size="lg"
            icon={<MessageCircle className="w-5 h-5" />}
          >
            Start on WhatsApp
          </Button>
        </div>
      </SectionWrapper>
    </div>
  );
}
