import { SectionWrapper } from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Accordion } from '@/components/ui/Accordion';
import { PageHero } from '@/components/PageHero';
import { faqs } from '@/data/faqs';
import { categories } from '@/data/categories';
import { useSEO } from '@/utils/seo';

export function FAQPage() {
  useSEO({
    title: 'Frequently Asked Questions',
    description: 'Find answers to common questions about PrintNest Hyderabad — delivery, bulk orders, design support, and more.',
  });

  const globalFAQs = faqs.filter((f) => f.global);
  const categoryFAQGroups = categories
    .map((cat) => ({
      category: cat,
      faqs: faqs.filter((f) => f.categoryKeys?.includes(cat.key)),
    }))
    .filter((g) => g.faqs.length > 0);

  return (
    <div>
      <PageHero
        title="Frequently Asked Questions"
        subtitle="Find answers to the most common questions about our services."
        bgColor="gradient"
        compact
      />

      <SectionWrapper>
        <SectionHeader title="General Questions" align="left" />
        <div className="max-w-3xl">
          <Accordion
            items={globalFAQs.map((f) => ({
              id: f.id,
              title: f.question,
              content: f.answer,
            }))}
            allowMultiple
          />
        </div>
      </SectionWrapper>

      {categoryFAQGroups.map((group) => (
        <SectionWrapper key={group.category.key} bgColor="alt">
          <SectionHeader title={`${group.category.name} Questions`} align="left" />
          <div className="max-w-3xl">
            <Accordion
              items={group.faqs.map((f) => ({
                id: f.id,
                title: f.question,
                content: f.answer,
              }))}
              allowMultiple
            />
          </div>
        </SectionWrapper>
      ))}
    </div>
  );
}
