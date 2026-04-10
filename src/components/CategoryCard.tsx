import { Link } from 'react-router-dom';
import {
  FileText,
  Heart,
  Shirt,
  Baby,
  ShoppingBag,
  Gift,
  Briefcase,
  Flag,
  Package,
  type LucideIcon,
} from 'lucide-react';
import type { Category } from '@/types';

const iconMap: Record<string, LucideIcon> = {
  FileText,
  Heart,
  Shirt,
  Baby,
  ShoppingBag,
  Gift,
  Briefcase,
  Flag,
  Package,
};

interface CategoryCardProps {
  category: Category;
  className?: string;
}

export function CategoryCard({ category, className = '' }: CategoryCardProps) {
  const IconComponent = iconMap[category.icon] || Package;

  return (
    <Link
      to={`/category/${category.slug}`}
      className={`group block bg-surface rounded-xl border border-border-light shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden ${className}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-surface-alt">
        <img
          src={category.image}
          alt={category.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://placehold.co/800x500/e2e8f0/94a3b8?text=Category';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 p-4 text-white">
          <div className="flex items-center gap-2 mb-1">
            <IconComponent className="w-5 h-5" />
            <h3 className="font-bold text-lg">{category.name}</h3>
          </div>
          <p className="text-sm text-white/80">{category.shortDescription}</p>
        </div>
      </div>
    </Link>
  );
}
