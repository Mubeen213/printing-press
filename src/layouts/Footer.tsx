import { Link } from 'react-router-dom';
import { MessageCircle, ArrowUp, Globe } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { siteConfig, footerQuickLinks, footerLegalLinks } from '@/config/site';
import { categories } from '@/data/categories';
import { buildDefaultWhatsAppUrl } from '@/utils/whatsapp';
import logo from '@/assets/white_logos/Logo_128x128.png';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-secondary text-white">
      {/* CTA Band */}
      <div className="bg-gradient-to-r from-primary to-primary-hover py-12">
        <Container>
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white font-display mb-3">
              Need printing for your business, event, or wedding?
            </h2>
            <p className="text-white/80 mb-6 max-w-xl mx-auto">
              We serve all of Hyderabad. Get a quick quote on WhatsApp — no forms, no wait.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={buildDefaultWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-white/90 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                Get Quote on WhatsApp
              </a>
              <Link
                to="/category/stationery"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
              >
                Browse Categories
              </Link>
            </div>
          </div>
        </Container>
      </div>

      {/* Footer Content */}
      <div className="py-12">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
               <div className="relative w-10 h-10 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <img 
                src={logo} 
                alt={siteConfig.brand.name} 
                className="w-full h-full object-contain"
              />
            </div>
                <span className="font-bold text-lg">{siteConfig.brand.name}</span>
              </div>
              <p className="text-sm text-white/60 leading-relaxed mb-4">
                {siteConfig.brand.shortDescription}
              </p>
              <p className="text-sm text-white/60">
                Serving Hyderabad & surrounding areas
              </p>
            </div>

            {/* Categories */}
            <div>
              <h3 className="font-semibold mb-4 text-white/90">Categories</h3>
              <ul className="space-y-2">
                {categories.map((cat) => (
                  <li key={cat.key}>
                    <Link
                      to={`/category/${cat.slug}`}
                      className="text-sm text-white/60 hover:text-white transition-colors"
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold mb-4 text-white/90">Quick Links</h3>
              <ul className="space-y-2">
                {footerQuickLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-sm text-white/60 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact & Social */}
            <div>
              <h3 className="font-semibold mb-4 text-white/90">Get in Touch</h3>
              <a
                href={buildDefaultWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-whatsapp/20 text-whatsapp rounded-lg text-sm font-medium hover:bg-whatsapp/30 transition-colors mb-4"
              >
                <MessageCircle className="w-4 h-4" />
                Chat on WhatsApp
              </a>

              <div className="flex gap-3 mt-4">
                {siteConfig.social.instagram && (
                  <a
                    href={siteConfig.social.instagram}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                    aria-label="Instagram"
                  >
                    <Globe className="w-4 h-4" />
                  </a>
                )}
                {siteConfig.social.facebook && (
                  <a
                    href={siteConfig.social.facebook}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                    aria-label="Facebook"
                  >
                    <Globe className="w-4 h-4" />
                  </a>
                )}
                {siteConfig.social.twitter && (
                  <a
                    href={siteConfig.social.twitter}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                    aria-label="Twitter"
                  >
                    <Globe className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-4">
        <Container>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-white/40">
              © {new Date().getFullYear()} {siteConfig.brand.name}. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              {footerLegalLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-xs text-white/40 hover:text-white/60 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <button
                onClick={scrollToTop}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
                aria-label="Scroll to top"
              >
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
