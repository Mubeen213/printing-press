import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MessageCircle,
  MapPin,
  Package,
  Rocket,
  PartyPopper,
  Palette,
  Sliders,
  Zap,
  ArrowRight,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { SectionWrapper } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Accordion } from '@/components/ui/Accordion';
import { ProductCard } from '@/components/ProductCard';
// import { CategoryCard } from '@/components/CategoryCard';
import { TestimonialCard } from '@/components/TestimonialCard';
import { BlogCard } from '@/components/BlogCard';
import { categories } from '@/data/categories';
import { testimonials } from '@/data/testimonials';
import { blogPosts } from '@/data/blogs';
import { getGlobalFAQs } from '@/data/faqs';
import {
  whyChooseUs,
  audienceSolutions,
  offerBanner,
} from '@/data/siteContent';
import { getProductsByCategory } from '@/utils/products';
import { buildDefaultWhatsAppUrl } from '@/utils/whatsapp';
import { useSEO } from '@/utils/seo';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { ScrollRevealCard } from '@/components/ScrollRevealCard';
import { ProcessSection } from '@/components/home/ProcessSection';
import { HeroCarousel } from '@/components/home/HeroCarousel';
import { InfiniteMarquee } from '@/components/ui/InfiniteMarquee';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  MapPin, Package, Rocket, PartyPopper, Palette, MessageCircle, Sliders, Zap,
};

export function HomePage() {
  useSEO();
  const [showAllCategories, setShowAllCategories] = useState(false);
  const containerRef = useScrollReveal<HTMLDivElement>([showAllCategories]);
  const topFAQs = getGlobalFAQs().slice(0, 5);

  const displayedCategories = showAllCategories ? categories : categories.slice(0, 4);

  return (
    <div ref={containerRef}>
      {/* =============== HERO =============== */}
      <HeroCarousel />

      {/* =============== CATEGORIES =============== */}
      {/* <SectionWrapper className="reveal">
        <SectionHeader
          title="What Are You Looking For?"
          subtitle="Browse our product categories and find exactly what your business, event, or celebration needs."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((cat, index) => (
            <ScrollRevealCard key={cat.key} delay={index * 60}>
              <CategoryCard category={cat} />
            </ScrollRevealCard>
          ))}
        </div>
      </SectionWrapper> */}


      {/* =============== PRODUCT CATEGORY CAROUSELS =============== */}
      <div className="bg-surface-alt py-12 md:py-24 space-y-16">
        {displayedCategories.map((category, index) => {
          const { key, name: title } = category;
          const catProducts = getProductsByCategory(key).slice(0, 6);
          if (catProducts.length === 0) return null;

          return (
            <div key={key} className="reveal">
              <Container>
                <SectionHeader
                  title={title}
                  align="left"
                  action={
                    <Button
                      to={`/category/${key}`}
                      variant="ghost"
                      iconRight={<ArrowRight className="w-4 h-4" />}
                    >
                      View All
                    </Button>
                  }
                />
                <InfiniteMarquee
                  speed={index % 2 === 0 ? 40 : 50}
                  direction={index % 2 === 0 ? 'left' : 'right'}
                  className="py-4"
                >
                  {catProducts.map((product) => (
                    <div
                      key={product.id}
                      className="w-[280px] sm:w-[320px] shrink-0"
                    >
                      <ProductCard product={product} />
                    </div>
                  ))}
                </InfiniteMarquee>
              </Container>
            </div>
          );
        })}

        {!showAllCategories && (
          <div className="flex justify-center pt-8">
            <Button 
              size="lg" 
              onClick={() => setShowAllCategories(true)}
              className="px-8 shadow-md"
            >
              See More Categories
            </Button>
          </div>
        )}
      </div>

      {/* =============== OUR PROCESS =============== */}
      <ProcessSection />
      {/* =============== OFFER BANNER =============== */}
      {offerBanner.enabled && (
        <section className="py-12 reveal">
          <Container>
            <div className="bg-gradient-to-r from-primary to-primary-hover rounded-2xl p-8 md:p-12 text-center text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PHBhdGggZD0iTTAgMGg2MHY2MEgweiIgZmlsbD0ibm9uZSIvPjxjaXJjbGUgY3g9IjMwIiBjeT0iMzAiIHI9IjEuNSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCBmaWxsPSJ1cmwoI2EpIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIi8+PC9zdmc+')] opacity-50" />
              <div className="relative z-10">
                <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm font-medium mb-4">
                  {offerBanner.badge}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold font-display mb-3">
                  {offerBanner.headline}
                </h2>
                <p className="text-white/80 mb-6 max-w-md mx-auto">{offerBanner.description}</p>
                <Button
                  href={buildDefaultWhatsAppUrl()}
                  external
                  variant="secondary"
                  size="lg"
                  className="bg-white !text-primary hover:bg-white/90"
                  icon={<MessageCircle className="w-5 h-5" />}
                >
                  {offerBanner.ctaLabel}
                </Button>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* =============== SOLUTIONS BY AUDIENCE =============== */}
      <SectionWrapper bgColor="alt" className="reveal">
        <SectionHeader
          title="Solutions for Every Need"
          subtitle="Whether you're a startup, school, hotel, or planning a wedding — we've got you covered."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {audienceSolutions.map((solution, index) => {
            const Icon = iconMap[solution.icon] || Package;
            return (
              <ScrollRevealCard key={solution.id} delay={index * 70}>
                <Link
                  to={`/category/${solution.categoryKeys[0]}`}
                  className="group bg-surface rounded-xl overflow-hidden border border-border-light shadow-card hover:shadow-card-hover transition-all block"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={solution.image}
                      alt={solution.title}
                      loading="lazy"
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 bg-white p-4"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="w-4 h-4 text-primary" />
                      <h3 className="font-semibold text-text group-hover:text-primary transition-colors">
                        {solution.title}
                      </h3>
                    </div>
                    <p className="text-sm text-text-secondary">{solution.description}</p>
                  </div>
                </Link>
              </ScrollRevealCard>
            );
          })}
        </div>
      </SectionWrapper>

      {/* =============== WHY CHOOSE US =============== */}
      <SectionWrapper bgColor="alt" className="reveal">
        <SectionHeader
          title="Why Choose PrintingFreaks?"
          subtitle="Here's what makes us Hyderabad's go-to printing partner."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {whyChooseUs.map((item) => {
            const Icon = iconMap[item.icon] || Package;
            return (
              <div
                key={item.title}
                className="bg-surface rounded-xl p-6 border border-border-light shadow-card hover:shadow-card-hover transition-all text-center"
              >
                <div className="w-12 h-12 bg-primary-light rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-text mb-2">{item.title}</h3>
                <p className="text-sm text-text-secondary">{item.description}</p>
              </div>
            );
          })}
        </div>
      </SectionWrapper>

      {/* =============== INSTAGRAM GALLERY =============== */}
      {/* <SectionWrapper className="reveal">
        <SectionHeader
          title="Inspiration Gallery"
          subtitle="A glimpse of what we create for our clients across Hyderabad."
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {instagramFeed.map((item, index) => (
            <ScrollRevealCard
              key={item.id}
              delay={index * 50}
              className="aspect-square rounded-xl overflow-hidden group cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.alt}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </ScrollRevealCard>
          ))}
        </div>
      </SectionWrapper> */}

      {/* =============== TESTIMONIALS =============== */}
      <SectionWrapper bgColor="alt" className="reveal">
        <SectionHeader
          title="What Our Clients Say"
          subtitle="Real feedback from startups, families, schools, and businesses in Hyderabad."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, index) => (
            <ScrollRevealCard key={t.id} delay={index * 80}>
              <TestimonialCard testimonial={t} />
            </ScrollRevealCard>
          ))}
        </div>
      </SectionWrapper>

      {/* =============== FAQ TEASER =============== */}
      <SectionWrapper className="reveal">
        <SectionHeader
          title="Frequently Asked Questions"
          subtitle="Quick answers to the most common questions."
          action={
            <Button to="/faq" variant="ghost" iconRight={<ArrowRight className="w-4 h-4" />}>
              View All FAQs
            </Button>
          }
        />
        <div className="max-w-3xl mx-auto">
          <Accordion
            items={topFAQs.map((f) => ({
              id: f.id,
              title: f.question,
              content: f.answer,
            }))}
          />
        </div>
      </SectionWrapper>

      {/* =============== BLOG =============== */}
      <SectionWrapper bgColor="alt" className="reveal">
        <SectionHeader
          title="From the Blog"
          subtitle="Tips, trends, and guides for printing, branding, and events in Hyderabad."
          action={
            <Button to="/blog" variant="ghost" iconRight={<ArrowRight className="w-4 h-4" />}>
              Read All Posts
            </Button>
          }
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.slice(0, 6).map((post, index) => (
            <ScrollRevealCard key={post.id} delay={index * 70}>
              <BlogCard post={post} />
            </ScrollRevealCard>
          ))}
        </div>
      </SectionWrapper>
    </div>
  );
}
