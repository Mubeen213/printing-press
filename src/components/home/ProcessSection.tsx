import { Container } from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ScrollRevealCard } from '@/components/ScrollRevealCard';

import flexPrintingVideo from '@/assets/mp4/flex_printing_5s.mp4';
import paperPrintVideo from '@/assets/mp4/paper_print.mp4';
import digitalPrintVideo from '@/assets/mp4/digital_print_1.mp4';

const PROCESSES = [
  {
    id: 'flex',
    video: flexPrintingVideo,
    title: 'High-Speed Flex Printing',
    description: 'State-of-the-art machines ensure pixel-perfect results for every banner and signage.',
    delay: 200,
  },
  {
    id: 'paper',
    video: paperPrintVideo,
    title: 'Precision Paper Printing',
    description: 'High-resolution offset and digital printing for premium marketing materials.',
    delay: 400,
  },
  {
    id: 'digital',
    video: digitalPrintVideo,
    title: 'Digital Printing Excellence',
    description: 'Quick turnaround and sharp details for all your custom digital needs.',
    delay: 600,
  },
];

export function ProcessSection() {
  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <Container>
        <SectionHeader
          title="See Our Precision"
          subtitle="Experience the high-speed, high-resolution printing process that brings your designs to life."
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {PROCESSES.map((process) => (
            <ScrollRevealCard key={process.id} delay={process.delay}>
              <div className="relative group">
                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl border border-border-light bg-surface-alt group-hover:shadow-2xl transition-shadow duration-500">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover"
                  >
                    <source src={process.video} type="video/mp4" />
                  </video>
                  
                  {/* Overlay Decoration */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                  
                  {/* Floating Badge (Desktop only) */}
                  <div className="hidden lg:block absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 text-white transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <h3 className="text-lg font-bold mb-1">{process.title}</h3>
                    <p className="text-xs text-white/80 line-clamp-2">{process.description}</p>
                  </div>
                </div>
                
                {/* Mobile & Tablet Description */}
                <div className="mt-4 lg:hidden px-1">
                  <h3 className="text-lg font-bold text-text mb-1">{process.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {process.description}
                  </p>
                </div>
              </div>
            </ScrollRevealCard>
          ))}
        </div>
        
        {/* Background decorative elements */}
        <div className="relative max-w-5xl mx-auto mt-12">
          <div className="absolute -top-60 -right-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl -z-10" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-accent/5 rounded-full blur-3xl -z-10" />
        </div>
      </Container>
    </section>
  );
}
