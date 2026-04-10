import { products } from '@/data/products';
import type { Product, CategoryKey } from '@/types';

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(categoryKey: CategoryKey): Product[] {
  return products.filter((p) => p.categoryKey === categoryKey);
}

export function getBestsellers(): Product[] {
  return products.filter((p) => p.bestseller === true);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured === true);
}

export function getNewArrivals(): Product[] {
  return products.filter((p) => p.newArrival === true);
}

export function getRelatedProducts(productIds: string[]): Product[] {
  return products.filter((p) => productIds.includes(p.id));
}

export function searchProducts(query: string): Product[] {
  const lower = query.toLowerCase().trim();
  if (!lower) return [];

  return products.filter(
    (p) =>
      p.title.toLowerCase().includes(lower) ||
      p.subtitle.toLowerCase().includes(lower) ||
      p.shortDescription.toLowerCase().includes(lower) ||
      (p.tags && p.tags.some((t) => t.toLowerCase().includes(lower))) ||
      p.categoryKey.toLowerCase().includes(lower)
  );
}

export function getProductsWithBadge(badge: string): Product[] {
  return products.filter((p) => p.badge === badge);
}
