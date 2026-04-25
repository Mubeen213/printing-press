import type { SiteConfig, NavItem } from '@/types';

export const siteConfig: SiteConfig = {
  brand: {
    name: 'Printaze',
    tagline: 'print that amazes',
    logo: '/logo.svg',
    shortDescription:
      'Your one-stop destination for custom printing, apparel, corporate gifting, wedding invites, and event branding in Hyderabad.',
  },
  whatsapp: {
    number: '917097008749',
    defaultMessage: 'Hello! I would like to know more about your printing services in Hyderabad.',
  },
  seo: {
    defaultTitle: 'Printaze | print that amazes — Custom Printing, Apparel & Gifting',
    defaultDescription:
      'Custom printing services in Hyderabad. Business cards, wedding invites, T-shirts, corporate gifts, banners & more. Get a quote on WhatsApp.',
    titleTemplate: '%s | Printaze',
    url: 'https://printaze.printaze.com',
  },
  cta: {
    primaryLabel: 'Get Quote on WhatsApp',
    secondaryLabel: 'Browse Categories',
    whatsappLabel: 'Chat on WhatsApp',
    cartLabel: 'Add to Inquiry',
  },
  social: {
    instagram: '#',
    facebook: '#',
    twitter: '#',
  },
};

export const mainNavItems: NavItem[] = [
  { label: 'Home', path: '/' },
  {
    label: 'Categories',
    path: '#',
    children: [
      { label: 'Stationery', path: '/category/stationery' },
      { label: 'Wedding & Parties', path: '/category/wedding-parties' },
      { label: 'Clothing & Apparels', path: '/category/clothing-apparels' },
      { label: 'Kids Apparels', path: '/category/kids-apparels' },
      { label: 'Bags', path: '/category/bags' },
      { label: 'Corporate Gifts', path: '/category/corporate-gifts' },
      { label: 'Office & Stationery', path: '/category/office-stationery' },
      { label: 'Event Solutions', path: '/category/event-solutions' },
    ],
  },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
  { label: 'Get Quote', path: '/get-quote' },
];

export const footerQuickLinks: NavItem[] = [
  { label: 'About Us', path: '/about' },
  { label: 'Contact / WhatsApp', path: '/contact' },
  { label: 'Get a Quote', path: '/get-quote' },
  { label: 'FAQs', path: '/faq' },
  { label: 'Blog', path: '/blog' },
  { label: 'Turnaround & Ordering', path: '/turnaround-info' },
  { label: 'File Preparation Guide', path: '/file-preparation-guide' },
];

export const footerLegalLinks: NavItem[] = [
  { label: 'Privacy Policy', path: '/privacy-policy' },
  { label: 'Terms & Conditions', path: '/terms' },
];
