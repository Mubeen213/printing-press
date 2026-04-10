import type { FAQ } from '@/types';

export const faqs: FAQ[] = [
  /* ===================================================
     GLOBAL FAQs
     =================================================== */
  {
    id: 'faq-delivery',
    question: 'Do you deliver in Hyderabad?',
    answer:
      'Yes! We serve all of Hyderabad including Secunderabad, Gachibowli, HITEC City, Banjara Hills, Jubilee Hills, Madhapur, Kukatpally, and surrounding areas. We also ship across India for bulk orders.',
    global: true,
  },
  {
    id: 'faq-bulk',
    question: 'Can I place bulk orders?',
    answer:
      'Absolutely! We specialize in bulk orders for businesses, events, and organizations. The more you order, the better the pricing. Share your requirements on WhatsApp and we will provide a custom quote.',
    global: true,
  },
  {
    id: 'faq-design',
    question: 'Do you help with design?',
    answer:
      'Yes, we offer design support for all our products. If you have your own design ready, great! If not, our team can help you create one. Just share your ideas and brand guidelines on WhatsApp.',
    global: true,
  },
  {
    id: 'faq-whatsapp',
    question: 'Can I order via WhatsApp?',
    answer:
      'Yes! WhatsApp is our primary ordering channel. Simply browse our products, add items to your inquiry cart, and send your inquiry directly on WhatsApp. We will respond quickly with pricing and timeline.',
    global: true,
  },
  {
    id: 'faq-branding',
    question: 'Do you offer custom branding?',
    answer:
      'Yes, all our products can be customized with your logo, artwork, and brand colors. We support full-color printing, embossing, foil stamping, embroidery, and more depending on the product.',
    global: true,
  },
  {
    id: 'faq-mix-products',
    question: 'Can I mix multiple products in one inquiry?',
    answer:
      'Of course! You can add different products to your inquiry cart and send everything together on WhatsApp. We will provide consolidated pricing for your complete order.',
    global: true,
  },
  {
    id: 'faq-startup',
    question: 'Do you support startup and event requirements?',
    answer:
      'Absolutely! We love working with startups and event organizers. From business cards and T-shirts to banners and welcome kits, we offer flexible quantities and competitive pricing for growing businesses.',
    global: true,
  },
  {
    id: 'faq-response-time',
    question: 'How fast do you respond?',
    answer:
      'We typically respond within 1-2 hours during business hours. For urgent requirements, mention "URGENT" in your WhatsApp message and we will prioritize your inquiry.',
    global: true,
  },

  /* ===================================================
     WEDDING FAQs
     =================================================== */
  {
    id: 'faq-wedding-digital',
    question: 'Can I order digital and printed invites?',
    answer:
      'Yes! We offer both digital invitation designs (for WhatsApp/email sharing) and premium printed invitations. You can order both formats for the same design.',
    categoryKeys: ['wedding-parties'],
  },
  {
    id: 'faq-wedding-acrylic',
    question: 'Do you support acrylic invitation requests?',
    answer:
      'Yes, we create beautiful acrylic invitations including clear, frosted, and tinted options. These are our premium offering and make a stunning statement for luxury weddings.',
    categoryKeys: ['wedding-parties'],
  },
  {
    id: 'faq-wedding-wording',
    question: 'Can you help with wording and formats?',
    answer:
      'Absolutely! Our team can help you with traditional, modern, and bilingual invitation wording. Just share your preferences and we will suggest formats that work best for your ceremony.',
    categoryKeys: ['wedding-parties'],
  },

  /* ===================================================
     CORPORATE FAQs
     =================================================== */
  {
    id: 'faq-corporate-kits',
    question: 'Can you handle employee kits and gifting?',
    answer:
      'Yes, we specialize in corporate welcoming kits and employee gifting. We can curate custom gift sets combining mugs, notebooks, pens, T-shirts, and more. All packed in branded boxes.',
    categoryKeys: ['corporate-gifts', 'office-stationery'],
  },
  {
    id: 'faq-corporate-recurring',
    question: 'Can I place recurring business orders?',
    answer:
      'Yes! We welcome ongoing business relationships. For recurring orders, we offer special pricing and priority fulfillment. Let us know your requirements on WhatsApp.',
    categoryKeys: ['corporate-gifts', 'office-stationery'],
  },
  {
    id: 'faq-corporate-multi',
    question: 'Can I request branding across multiple products?',
    answer:
      'Yes, we can apply consistent branding across all product types — stationery, apparel, gifts, and signage. Share your brand guidelines once and we will maintain consistency across everything.',
    categoryKeys: ['corporate-gifts', 'office-stationery', 'clothing-apparels'],
  },

  /* ===================================================
     APPAREL FAQs
     =================================================== */
  {
    id: 'faq-apparel-sizes',
    question: 'What sizes are available for apparel?',
    answer:
      'We offer standard sizes from XS to 3XL across our apparel range. Custom sizing is also available for bulk orders. Share your size distribution on WhatsApp for accurate quoting.',
    categoryKeys: ['clothing-apparels', 'kids-apparels'],
  },
  {
    id: 'faq-apparel-printing',
    question: 'What printing methods do you use for apparel?',
    answer:
      'We offer screen printing, DTG (Direct to Garment), heat transfer, and embroidery depending on the design complexity and order quantity. We will recommend the best option for your needs.',
    categoryKeys: ['clothing-apparels', 'kids-apparels'],
  },

  /* ===================================================
     EVENT FAQs
     =================================================== */
  {
    id: 'faq-event-outdoor',
    question: 'Are your banners suitable for outdoor use?',
    answer:
      'Yes, we offer weather-resistant banners and signage suitable for outdoor events, storefronts, and exhibitions. Our materials are UV-protected and water-resistant.',
    categoryKeys: ['event-solutions'],
  },
  {
    id: 'faq-event-installation',
    question: 'Do you provide installation support?',
    answer:
      'For large-format signage and wallpaper, we can arrange installation support in the Hyderabad area. Ask us about this on WhatsApp when you place your inquiry.',
    categoryKeys: ['event-solutions'],
  },

  /* ===================================================
     BAG FAQs
     =================================================== */
  {
    id: 'faq-bags-eco',
    question: 'Are your bags eco-friendly?',
    answer:
      'Yes! We offer multiple eco-friendly options including jute bags, recycled cotton bags, and non-woven bags. All our cotton bags are reusable and sustainable.',
    categoryKeys: ['bags'],
  },
];

export function getGlobalFAQs(): FAQ[] {
  return faqs.filter((f) => f.global === true);
}

export function getFAQsByCategory(categoryKey: string): FAQ[] {
  return faqs.filter(
    (f) => f.global === true || (f.categoryKeys && f.categoryKeys.includes(categoryKey as never))
  );
}

export function getFAQsByIds(ids: string[]): FAQ[] {
  return faqs.filter((f) => ids.includes(f.id));
}
