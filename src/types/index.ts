/* ===================================================
   CATEGORY KEY TYPES
   =================================================== */

export type CategoryKey =
  | 'stationery'
  | 'wedding-parties'
  | 'clothing-apparels'
  | 'kids-apparels'
  | 'bags'
  | 'corporate-gifts'
  | 'office-stationery'
  | 'event-solutions';

export type BadgeType = 'bestseller' | 'new' | 'offer' | 'bulk' | 'first-order';

export type LeadType = 'wedding' | 'corporate' | 'retail' | 'events' | 'apparel' | 'general';

export type CTAVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'whatsapp' | 'danger';

/* ===================================================
   PRODUCT
   =================================================== */

export interface WhatsAppMeta {
  inquiryLabel?: string;
  recommendedFor?: string[];
  leadType?: LeadType;
}

export interface Product {
  id: string;
  slug: string;
  categoryKey: CategoryKey;
  subcategory?: string;
  title: string;
  subtitle: string;
  shortDescription: string;
  description: string;
  image: string;
  gallery: string[];
  relatedProductIds: string[];
  featured?: boolean;
  bestseller?: boolean;
  newArrival?: boolean;
  localSEOKeyword?: string;
  price?: number | null;
  originalPrice?: number | null;
  discountLabel?: string | null;
  firstTimeOffer?: string | null;
  badge?: BadgeType | null;
  minQty?: number;
  maxQty?: number;
  defaultQty?: number;
  faqIds?: string[];
  tags?: string[];
  whatsappMeta?: WhatsAppMeta;
}

/* ===================================================
   CATEGORY
   =================================================== */

export interface Category {
  key: CategoryKey;
  slug: string;
  name: string;
  shortName: string;
  description: string;
  shortDescription: string;
  image: string;
  icon: string;
  seoTitle: string;
  seoDescription: string;
  productCount?: number;
}

/* ===================================================
   CART
   =================================================== */

export interface CartItem {
  productId: string;
  quantity: number;
}

/* ===================================================
   FAQ
   =================================================== */

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  categoryKeys?: CategoryKey[];
  global?: boolean;
}

/* ===================================================
   BLOG
   =================================================== */

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
  seoTitle: string;
  seoDescription: string;
}

/* ===================================================
   TESTIMONIAL
   =================================================== */

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  quote: string;
  useCase: string;
  rating: number;
  avatar?: string;
}

/* ===================================================
   NAVIGATION
   =================================================== */

export interface NavItem {
  label: string;
  path: string;
  children?: NavItem[];
  icon?: string;
}

/* ===================================================
   WHATSAPP
   =================================================== */

export interface WhatsAppProductPayload {
  title: string;
  category: string;
  quantity: number;
  offer?: string | null;
  productUrl?: string;
}

export interface WhatsAppCartPayload {
  items: Array<{
    title: string;
    quantity: number;
  }>;
  userName?: string;
  userPhone?: string;
  businessType?: string;
  notes?: string;
}

/* ===================================================
   FILTER
   =================================================== */

export interface FilterOption {
  key: string;
  label: string;
  count?: number;
}

/* ===================================================
   AUDIENCE SOLUTION
   =================================================== */

export interface AudienceSolution {
  id: string;
  title: string;
  description: string;
  image: string;
  icon: string;
  categoryKeys: CategoryKey[];
  tags: string[];
}

/* ===================================================
   SITE CONFIG
   =================================================== */

export interface SiteConfig {
  brand: {
    name: string;
    tagline: string;
    logo: string;
    shortDescription: string;
  };
  whatsapp: {
    number: string;
    defaultMessage: string;
  };
  seo: {
    defaultTitle: string;
    defaultDescription: string;
    titleTemplate: string;
  };
  cta: {
    primaryLabel: string;
    secondaryLabel: string;
    whatsappLabel: string;
    cartLabel: string;
  };
  social: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
    youtube?: string;
  };
}
