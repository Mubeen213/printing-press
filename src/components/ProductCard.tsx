import { Link } from 'react-router-dom';
import { MessageCircle, ShoppingCart } from 'lucide-react';
import { ProductBadge } from '@/components/ui/Badge';
import { useCart } from '@/hooks/useCart';
import { buildProductWhatsAppUrl } from '@/utils/whatsapp';
import { getCategoryByKey } from '@/data/categories';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className = '' }: ProductCardProps) {
  const { addItem, isInCart } = useCart();
  const category = getCategoryByKey(product.categoryKey);
  const inCart = isInCart(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product.id, product.defaultQty || 1);
  };

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const url = buildProductWhatsAppUrl({
      title: product.title,
      category: category?.name || product.categoryKey,
      quantity: product.defaultQty || 1,
      offer: product.discountLabel || product.firstTimeOffer,
    });
    window.open(url, '_blank');
  };

  return (
    <div
      className={`group bg-surface rounded-xl border border-border-light shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden flex flex-col h-full ${className}`}
    >
      <Link to={`/product/${product.slug}`} className="flex-1 flex flex-col">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-surface-alt p-4">
          <img
            src={product.image}
            alt={product.title}
            loading="lazy"
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://placehold.co/600x400/e2e8f0/94a3b8?text=Image+Not+Available';
            }}
          />
          {product.badge && (
            <div className="absolute top-3 left-3">
              <ProductBadge type={product.badge} />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col">
          <p className="text-xs text-muted mb-1">{category?.name}</p>
          <h3 className="font-semibold text-text text-base mb-1 group-hover:text-primary transition-colors">
            {product.title}
          </h3>
          <p className="text-sm text-text-secondary mb-3 line-clamp-2">
            {product.subtitle}
          </p>

          {/* Price */}
          <div className="mt-auto">
            {product.price != null && (
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg font-bold text-text">₹{product.price}</span>
                {product.originalPrice && (
                  <span className="text-sm text-muted line-through">
                    ₹{product.originalPrice}
                  </span>
                )}
                {product.minQty && (
                  <span className="text-xs text-muted">/ min {product.minQty}</span>
                )}
              </div>
            )}
            {product.discountLabel && (
              <p className="text-xs text-primary font-medium mb-3">{product.discountLabel}</p>
            )}
          </div>
        </div>
      </Link>

      {/* Actions */}
      <div className="px-4 pb-4 flex gap-2">
        <button
          onClick={handleAddToCart}
          className={`flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
            inCart
              ? 'bg-success/10 text-success border border-success/20'
              : 'bg-primary text-white hover:bg-primary-hover'
          }`}
        >
          <ShoppingCart className="w-4 h-4" />
          {inCart ? 'Added' : 'Add to Inquiry'}
        </button>
        <button
          onClick={handleWhatsApp}
          className="inline-flex items-center justify-center p-2 rounded-lg bg-whatsapp text-white hover:bg-whatsapp-hover transition-colors cursor-pointer"
          aria-label={`WhatsApp inquiry for ${product.title}`}
        >
          <MessageCircle className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
