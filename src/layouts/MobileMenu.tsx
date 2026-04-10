import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { ChevronDown, MessageCircle, X } from 'lucide-react';
import { mainNavItems } from '@/config/site';
import { buildDefaultWhatsAppUrl } from '@/utils/whatsapp';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const toggleExpanded = (label: string) => {
    setExpandedItems((prev) => {
      const next = new Set(prev);
      if (next.has(label)) {
        next.delete(label);
      } else {
        next.add(label);
      }
      return next;
    });
  };

  const [mounted, setMounted] = useState(false);
  const portalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] lg:hidden" ref={portalRef}>
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden
      />

      {/* Menu Panel */}
      <nav
        className="absolute top-0 left-0 bottom-0 w-[280px] bg-surface animate-slide-in-left overflow-y-auto shadow-xl flex flex-col"
        aria-label="Mobile navigation"
      >
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <span className="font-bold text-lg text-text">PrintNest</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 -mr-2 text-text-secondary hover:bg-surface-alt rounded-lg"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-2 flex-1 overflow-y-auto">
          {mainNavItems.map((item) => (
            <div key={item.label}>
              {item.children ? (
                <>
                  <button
                    onClick={() => toggleExpanded(item.label)}
                    className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-text hover:bg-surface-alt transition-colors cursor-pointer"
                  >
                    {item.label}
                    <ChevronDown
                      className={`w-4 h-4 text-muted transition-transform duration-200 ${
                        expandedItems.has(item.label) ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {expandedItems.has(item.label) && (
                    <div className="bg-surface-alt">
                      {item.children.map((child) => (
                        <Link
                          key={child.path}
                          to={child.path}
                          onClick={onClose}
                          className="block px-8 py-2.5 text-sm text-text-secondary hover:text-primary transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  to={item.path}
                  onClick={onClose}
                  className="block px-4 py-3 text-sm font-medium text-text hover:bg-surface-alt transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* WhatsApp CTA */}
        <div className="p-4 border-t border-border mt-auto">
          <a
            href={buildDefaultWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 bg-whatsapp text-white rounded-lg font-semibold text-sm hover:bg-whatsapp-hover transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            Chat on WhatsApp
          </a>
        </div>
      </nav>
    </div>,
    document.body
  );
}
