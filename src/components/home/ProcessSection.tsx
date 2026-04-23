import { Container } from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ScrollRevealCard } from '@/components/ScrollRevealCard';

import flexPrintingVideo from '@/assets/mp4/flex_printing_5s.mp4';

export function ProcessSection() {
  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <Container>
        <SectionHeader
          title="See Our Precision"
          subtitle="Experience the high-speed, high-resolution printing process that brings your designs to life."
        />
        
        <ScrollRevealCard delay={200}>
          <div className="relative max-w-5xl mx-auto">
            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border border-border-light bg-surface-alt group">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              >
                <source src={flexPrintingVideo} type="video/mp4" />
              </video>
              
              {/* Overlay Decoration */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              
              {/* Floating Badge (Desktop only) */}
              <div className="hidden md:block absolute bottom-10 left-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-white max-w-xs transition-transform duration-500 group-hover:scale-105">
                <h3 className="text-xl font-bold mb-1">High-Speed Flex Printing</h3>
                <p className="text-sm text-white/70">State-of-the-art machines ensure pixel-perfect results for every banner and signage.</p>
              </div>
            </div>
            
            {/* Mobile Description (Visible only on mobile) */}
            <div className="mt-6 md:hidden px-2">
              <h3 className="text-xl font-bold text-text mb-2">High-Speed Flex Printing</h3>
              <p className="text-text-secondary leading-relaxed">
                State-of-the-art machines ensure pixel-perfect results for every banner and signage.
              </p>
            </div>
            
            {/* Background decorative elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-accent/10 rounded-full blur-3xl -z-10" />
          </div>
        </ScrollRevealCard>
      </Container>
    </section>
  );
}
