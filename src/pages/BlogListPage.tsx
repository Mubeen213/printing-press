import { SectionWrapper } from '@/components/ui/Container';

import { BlogCard } from '@/components/BlogCard';
import { PageHero } from '@/components/PageHero';
import { blogPosts } from '@/data/blogs';
import { useSEO } from '@/utils/seo';

export function BlogListPage() {
  useSEO({
    title: 'Blog',
    description: 'Tips, trends, and guides for printing, branding, and events in Hyderabad. Read the Printaze blog.',
  });

  return (
    <div>
      <PageHero
        title="Printaze Blog"
        subtitle="Tips, trends, and guides for printing, branding, and events in Hyderabad."
        bgColor="gradient"
        compact
      />

      <SectionWrapper>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </SectionWrapper>
    </div>
  );
}
