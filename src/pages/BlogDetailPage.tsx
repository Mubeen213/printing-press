import { useParams } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, MessageCircle } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionWrapper } from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Button } from '@/components/ui/Button';
import { BlogCard } from '@/components/BlogCard';
import { EmptyState } from '@/components/EmptyState';
import { getBlogBySlug } from '@/data/blogs';
import { blogPosts } from '@/data/blogs';
import { buildDefaultWhatsAppUrl } from '@/utils/whatsapp';
import { useSEO } from '@/utils/seo';

export function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogBySlug(slug) : undefined;

  if (!post) {
    return <EmptyState type="not-found" />;
  }

  useSEO({ title: post.seoTitle, description: post.seoDescription, ogImage: post.image });

  const relatedPosts = blogPosts.filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <div>
      <section className="py-8 md:py-12">
        <Container>
          <Breadcrumbs items={[{ label: 'Blog', path: '/blog' }, { label: post.title }]} />

          <article className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <span className="inline-block px-3 py-1 bg-primary-light text-primary text-sm font-medium rounded-lg mb-4">
                {post.category}
              </span>
              <h1 className="text-2xl md:text-4xl font-bold font-display text-text mb-4 leading-tight">
                {post.title}
              </h1>
              <div className="flex items-center gap-4 text-sm text-muted">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.date).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </span>
                <span>By {post.author}</span>
              </div>
            </div>

            {/* Featured Image */}
            <div className="aspect-[16/9] rounded-xl overflow-hidden mb-8">
              <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none text-text-secondary leading-relaxed space-y-4">
              {post.content.split('\n\n').map((paragraph, i) => {
                if (paragraph.startsWith('## ')) {
                  return (
                    <h2 key={i} className="text-xl font-bold text-text mt-8 mb-4 font-display">
                      {paragraph.replace('## ', '')}
                    </h2>
                  );
                }
                if (paragraph.startsWith('### ')) {
                  return (
                    <h3 key={i} className="text-lg font-semibold text-text mt-6 mb-3">
                      {paragraph.replace('### ', '')}
                    </h3>
                  );
                }
                if (paragraph.startsWith('- ') || paragraph.startsWith('1. ')) {
                  const items = paragraph.split('\n').filter(Boolean);
                  return (
                    <ul key={i} className="list-disc pl-5 space-y-1">
                      {items.map((item, j) => (
                        <li key={j}>{item.replace(/^[-\d.]\s*/, '')}</li>
                      ))}
                    </ul>
                  );
                }
                if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                  return (
                    <p key={i} className="font-semibold text-text">
                      {paragraph.replace(/\*\*/g, '')}
                    </p>
                  );
                }
                return <p key={i}>{paragraph}</p>;
              })}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-8 pt-8 border-t border-border">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-surface-alt rounded-full text-xs text-text-secondary border border-border-light"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-8 p-6 bg-primary-light rounded-xl text-center">
              <p className="font-semibold text-text mb-3">Interested in this service?</p>
              <Button
                href={buildDefaultWhatsAppUrl()}
                external
                variant="whatsapp"
                icon={<MessageCircle className="w-4 h-4" />}
              >
                Chat with us on WhatsApp
              </Button>
            </div>

            <div className="mt-8">
              <Button to="/blog" variant="ghost" icon={<ArrowLeft className="w-4 h-4" />}>
                Back to Blog
              </Button>
            </div>
          </article>
        </Container>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <SectionWrapper bgColor="alt">
          <SectionHeader title="More from the Blog" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedPosts.map((p) => (
              <BlogCard key={p.id} post={p} />
            ))}
          </div>
        </SectionWrapper>
      )}
    </div>
  );
}
