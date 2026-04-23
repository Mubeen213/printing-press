import React, { useState, useEffect } from 'react';
import { MessageCircle, Package, MapPin, Rocket, PartyPopper } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { heroSlides, heroContent } from '@/data/siteContent';
import { buildDefaultWhatsAppUrl } from '@/utils/whatsapp';

// Asset imports for Vite resolution
import bannerHoodies from '@/assets/hero/banner_hoodies.png';
import bannerSwag from '@/assets/hero/banner_swag.png';
import bannerEvents from '@/assets/hero/banner_events.png';

const slideImages: Record<number, string> = {
  1: bannerHoodies,
  2: bannerSwag,
  3: bannerEvents,
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  MapPin, Package, Rocket, PartyPopper
};

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-auto min-h-[600px] md:h-[700px] overflow-hidden bg-secondary">
      {/* Slides */}
      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Content Wrapper */}
          <div className="absolute inset-0 flex items-center py-12 md:py-0">
            <Container className="h-full flex flex-col-reverse md:flex-row items-center gap-6 md:gap-12">
              
              {/* Text Content (Bottom on Mobile, Left on Desktop) */}
              <div className="flex-1 text-white z-20 animate-fade-slide-in text-center md:text-left">
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold font-display leading-tight mb-4 md:mb-6 drop-shadow-lg">
                  {slide.headline}
                </h1>
                <p className="text-sm md:text-lg text-white/90 leading-relaxed mb-6 md:mb-8 max-w-xl drop-shadow-md mx-auto md:mx-0">
                  {slide.subheadline}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-8 md:mb-10 justify-center md:justify-start">
                  <Button
                    variant="whatsapp"
                    size="lg"
                    href={buildDefaultWhatsAppUrl()}
                    external
                    icon={<MessageCircle className="w-5 h-5" />}
                    className="shadow-xl"
                  >
                    {heroContent.primaryCTA}
                  </Button>
                </div>

                {/* Trust Chips - Hidden on small mobile to save space, or scaled down */}
                <div className="hidden sm:flex flex-wrap gap-2 md:gap-3 justify-center md:justify-start">
                  {heroContent.trustChips.map((chip) => {
                    const Icon = iconMap[chip.icon] || Package;
                    return (
                      <div
                        key={chip.label}
                        className="inline-flex items-center gap-1 px-2 py-1 md:px-3 md:py-1.5 bg-white/10 backdrop-blur-md rounded-full text-[10px] md:text-sm font-medium text-white border border-white/20 shadow-sm"
                      >
                        <Icon className="w-3 md:w-3.5 h-3 md:h-3.5 text-primary" />
                        {chip.label}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Image Content (Top on Mobile, Right on Desktop) */}
              <div className="flex-1 w-full relative flex items-center justify-center">
                <div className="relative w-full aspect-[4/3] sm:aspect-square md:aspect-auto md:h-[500px] rounded-xl md:rounded-2xl overflow-hidden shadow-2xl animate-fade-in">
                  <img
                    src={slideImages[slide.id] || slide.image}
                    alt={slide.headline}
                    className="w-full h-full object-contain bg-white/5 backdrop-blur-sm"
                  />
                  {/* Subtle overlay to blend */}
                  <div className="absolute inset-0 ring-1 ring-white/20 rounded-xl md:rounded-2xl pointer-events-none" />
                </div>
              </div>

            </Container>
          </div>
          
          {/* Subtle background gradient to tie everything together */}
          <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary/95 to-secondary-hover -z-10" />
        </div>
      ))}

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide ? 'bg-primary w-8' : 'bg-white/50 hover:bg-white'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
