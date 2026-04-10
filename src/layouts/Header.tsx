import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Search,
  ShoppingCart,
  Menu,
  X,
  MessageCircle,
  ChevronDown,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { siteConfig, mainNavItems } from '@/config/site';
import { useCart } from '@/hooks/useCart';
import { buildDefaultWhatsAppUrl } from '@/utils/whatsapp';
import { searchProducts } from '@/utils/products';
import { MobileMenu } from './MobileMenu';

export function Header() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { cartCount } = useCart();
  const location = useLocation();
  const searchRef = useRef<HTMLDivElement>(null);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout>>(undefined);

  const searchResults = searchQuery.trim() ? searchProducts(searchQuery).slice(0, 6) : [];

  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
    setSearchQuery('');
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDropdownEnter = (label: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setActiveDropdown(label);
  };

  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  return (
    <header
      className={`sticky top-0 z-40 bg-surface/95 backdrop-blur-md border-b transition-shadow duration-200 ${
        isScrolled ? 'shadow-lg border-border' : 'border-transparent'
      }`}
    >
      <Container>
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <span className="font-bold text-lg text-text hidden sm:block">
              {siteConfig.brand.name}
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-4" aria-label="Main navigation">
            {mainNavItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && handleDropdownEnter(item.label)}
                onMouseLeave={handleDropdownLeave}
              >
                <Link
                  to={item.path}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-1 ${
                    location.pathname === item.path
                      ? 'text-primary bg-primary-light'
                      : 'text-text-secondary hover:text-text hover:bg-surface-alt'
                  }`}
                >
                  {item.label}
                  {item.children && <ChevronDown className="w-3 h-3" />}
                </Link>

                {/* Dropdown */}
                {item.children && activeDropdown === item.label && (
                  <div className="absolute top-full left-0 pt-1 z-50">
                    <div className="bg-surface rounded-xl shadow-xl border border-border py-2 min-w-[200px] animate-fade-in">
                      {item.children.map((child) => (
                        <Link
                          key={child.path}
                          to={child.path}
                          className="block px-4 py-2 text-sm text-text-secondary hover:text-text hover:bg-surface-alt transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="relative" ref={searchRef}>
              <button
                onClick={() => setSearchOpen(!isSearchOpen)}
                className="p-2 rounded-lg text-text-secondary hover:text-text hover:bg-surface-alt transition-colors cursor-pointer"
                aria-label="Search products"
              >
                {isSearchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
              </button>

              {isSearchOpen && (
                <div className="fixed sm:absolute top-[72px] sm:top-full left-4 sm:left-auto right-4 sm:right-0 sm:mt-2 w-auto sm:w-80 bg-surface rounded-xl shadow-xl border border-border overflow-hidden animate-fade-in z-50">
                  <div className="p-3">
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-border bg-surface-alt text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent style-override-focus"
                      style={{ outline: 'none' }}
                      autoFocus
                    />
                  </div>
                  {searchResults.length > 0 && (
                    <div className="border-t border-border max-h-64 overflow-y-auto">
                      {searchResults.map((product) => (
                        <Link
                          key={product.id}
                          to={`/product/${product.slug}`}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-surface-alt transition-colors"
                        >
                          <img
                            src={product.image}
                            alt={product.title}
                            className="w-10 h-10 rounded-md object-cover"
                          />
                          <div>
                            <p className="text-sm font-medium text-text">{product.title}</p>
                            <p className="text-xs text-muted">{product.subtitle}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                  {searchQuery.trim() && searchResults.length === 0 && (
                    <div className="px-4 py-6 text-center text-sm text-muted border-t border-border">
                      No products found
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2 rounded-lg text-text-secondary hover:text-text hover:bg-surface-alt transition-colors"
              aria-label={`Inquiry cart — ${cartCount} items`}
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-primary text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </Link>

            {/* WhatsApp CTA - Desktop */}
            <a
              href={buildDefaultWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 bg-whatsapp text-white text-sm font-semibold rounded-lg hover:bg-whatsapp-hover transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-text-secondary hover:text-text hover:bg-surface-alt transition-colors cursor-pointer"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </header>
  );
}
