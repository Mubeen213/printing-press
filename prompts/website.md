Build a production-quality, mobile-first, fully responsive website for a Hyderabad-based custom printing and merchandise business using React + TypeScript + Tailwind CSS only. There is no backend. No login, no payments, no subscriptions, no admin panel. The site must be structured to maximize WhatsApp inquiries and local conversion for Hyderabad  in Telangana.

The website must NOT copy printsouq.ae directly. Instead, it should take inspiration from high-conversion print websites: broad category browsing, strong trust signals, best sellers, clean product cards, FAQ-driven content, blog/SEO support, Instagram-friendly visual sections, and repeated quote/WhatsApp CTA patterns. The result should feel more modern, cleaner, more localized, and easier to maintain than the reference.

==================================================
1. BUSINESS POSITIONING
==================================================

Brand:
- Use placeholder brand name: "Printaze"
- Make brand name, logo, colors, and theme fully configurable from a single theme/config file
- The logo must be replaceable later without touching layout code
- English only for now

Target customers:
- Local stores
- Startups
- Schools
- Colleges
- Hotels
- Travel agencies
- Tech companies
- Event organizers
- Wedding customers
- Small businesses in Hyderabad 

Primary business goal:
- Generate WhatsApp inquiries
- Encourage inquiry-cart usage
- Make it easy for users to browse many categories quickly
- Convert local, bulk, and repeat business

Core business model:
- Users browse products
- Users can add products to inquiry cart
- Users can choose quantity
- Users can open WhatsApp directly from product page or cart
- WhatsApp message should be prefilled with selected products and product details
- No direct online payment
- No checkout payment flow
- No account system

==================================================
2. DESIGN DIRECTION
==================================================

Overall style:
- Premium, trustworthy, modern, locally relevant
- Clean enough for corporate buyers
- Warm enough for wedding buyers
- Visual enough for apparel and event solutions
- Avoid cheap marketplace feeling
- Avoid clutter
- Avoid copycat feel

Design language:
- Use a 12-column responsive grid
- Soft rounded corners
- Balanced whitespace
- Consistent section spacing
- Strong visual hierarchy
- Sticky mobile CTA behavior where useful
- Cards should feel modular and reusable
- Subtle shadows
- Clean hover states
- Microinteractions should support usability, not distract

Theme system:
Create a single config-driven theme architecture, e.g.
- src/config/theme.ts
- src/config/site.ts

All colors, typography scale, radii, shadows, spacing tokens, CTA styles, badges, and logo references must come from config/tokens.

Example theme object:
- brand.name
- brand.tagline
- brand.logo
- colors.primary
- colors.secondary
- colors.accent
- colors.surface
- colors.text
- colors.muted
- colors.success
- colors.warning
- colors.whatsapp
- radii.sm/md/lg/xl
- shadows.card/button/focus
- typography.display/h1/h2/h3/body/small
- layout.containerMax
- cta.primaryLabel
- cta.secondaryLabel
- whatsapp.number
- seo.defaultTitle
- seo.defaultDescription

Components must not hardcode colors directly if avoidable; they should consume semantic tokens.

Animation:
- Subtle, premium, and meaningful
- Fade-up section reveals
- Gentle hover lift on cards
- Smooth CTA transitions
- Optional marquee or logo slider only if tasteful
- No excessive motion
- Motion must be reduced when prefers-reduced-motion is enabled

==================================================
2.5 THEME SYSTEM IMPLEMENTATION RULES
==================================================

The website must use a reusable, replaceable, config-driven theming system that works properly with Tailwind CSS.

Important constraint:
- Do not rely on dynamically constructed Tailwind class names like `bg-${color}-500` or `text-${theme}-600`
- Tailwind classes must remain statically usable and predictable
- The theme must be implemented using CSS variables mapped into Tailwind semantic tokens

Implementation rules:
- Define brand/theme values using CSS custom properties in a global stylesheet
- Map those CSS variables into Tailwind config using semantic names
- Components must use semantic Tailwind utility classes such as:
  - bg-primary
  - text-text
  - bg-surface
  - border-border
  - text-muted
  - bg-accent
- Avoid hardcoding brand hex values directly inside component files unless absolutely necessary
- Avoid product/category-specific one-off styling that breaks consistency
- The goal is that brand color, radii, spacing feel, and visual identity can be replaced from one central place without rewriting components

Required structure:
- `src/config/site.ts` for brand/site-level metadata
- `src/config/theme.ts` for theme metadata and semantic tokens
- `src/styles/globals.css` or equivalent for CSS variables
- `tailwind.config.ts` must map CSS variables into semantic Tailwind tokens

Example expectation:
- `--color-primary`
- `--color-secondary`
- `--color-accent`
- `--color-surface`
- `--color-background`
- `--color-text`
- `--color-muted`
- `--color-border`
- `--radius-sm`
- `--radius-md`
- `--radius-lg`
- `--shadow-card`
- `--shadow-button`

Tailwind config should expose semantic utilities such as:
- colors.primary
- colors.secondary
- colors.accent
- colors.surface
- colors.background
- colors.text
- colors.muted
- colors.border

Theme replacement requirement:
- A future brand/theme update should be possible by changing centralized config/CSS variable values only
- Core components, layouts, and pages should not require rewrites when the brand changes
- The design system must remain reusable and scalable across all pages and categories

Optional advanced support:
- Support multiple preset themes using `data-theme` on the root element
- Example future presets:
  - default
  - festive
  - wedding
  - corporate
- Even if only one theme is active now, architecture should support future expansion

Component rules:
- Buttons, cards, badges, section wrappers, inputs, FAQ accordions, nav items, and CTA strips must consume semantic design tokens rather than raw colors
- Shared UI primitives must be reusable across all categories
- Styling decisions should flow from theme tokens, not scattered component-level overrides

Non-negotiable goal:
- The codebase must be easy to rebrand later
- Theme must be centrally controlled
- Components must stay visually consistent and maintainable and CSS must work with tailwind

==================================================
3. INFORMATION ARCHITECTURE
==================================================

Top navigation:
- Home
- Stationery
- Wedding & Parties
- Clothing & Apparels
- Kids Apparels
- Bags
- Corporate Gifts
- Office & Stationery
- Event Solutions
- About
- Contact / WhatsApp
- Get Quote

Navigation behavior:
- Desktop: sticky header with dropdown-capable category navigation
- Mobile: slide-in menu with category accordions
- Header must include:
  - logo
  - search icon/input
  - category access
  - inquiry cart icon with item count
  - WhatsApp CTA button
- Search can be client-side only, searching local product JSON

Footer:
- brand summary
- category links
- quick links
- FAQs
- blog links
- WhatsApp CTA
- social links placeholders
- legal placeholders
- no physical address required
- mention Hyderabad service area
- no fake office address

==================================================
4. REQUIRED PRODUCT CATEGORIES
==================================================

Only include these exact categories and products. Do not invent additional categories beyond these.

A) Stationery
- Business cards
- Flyers
- Brochures
- Letterheads
- Thank you cards
- Name tags
- Notepads
- Photo book
- Label stickers
- Calendars
- Certificates
- Desk planner
- Presentation folders

B) Wedding / Parties
- Wedding invites (digital & screen printed)
- Acrylic invites
- Save the date cards
- Wedding announcement
- Anniversary cards
- Blessing cards

C) Clothing & Apparels
- T-shirts
- Polo Shirts
- Hoodies
- Sweat shirts
- Safety jackets
- Aprons

D) Kids Apparels
- Polo shirt
- T shirts
- Baby onesies

E) Bags
- Tote Bags
- Jute bags
- Non woven bags
- Recycled cotton bags
- Promotional cotton bags
- Tote beach bags
- Backpacks

F) Corporate Gifts
- Mugs
- Water bottles
- Travel mugs
- Gift sets
- Coasters

G) Office & Stationery
- Pens
- Notebooks and diaries
- Office accessories
- Coaster
- Employee welcome kit

H) Event Solutions
- Roll ups
- Banners
- Standees
- Flags
- Vinyl Stickers
- Wallpaper

Do not add payments, subscriptions, order tracking, or extra categories.

==================================================
5. DATA ARCHITECTURE
==================================================

Store all content locally as JSON or TypeScript data objects.
The entire site must be data-driven.

Create data files like:
- src/data/categories.ts
- src/data/products.ts
- src/data/faqs.ts
- src/data/testimonials.ts
- src/data/blogs.ts
- src/data/instagramFeed.ts
- src/data/siteContent.ts

Each product should support extensible optional fields.
Start with a minimal schema now, but structure it for future growth.

Recommended product schema:
{
  id: string,
  slug: string,
  categoryKey: string,
  subcategory?: string,
  title: string,
  subtitle: string,
  shortDescription: string,
  description: string,
  image: string,
  gallery: string[],
  relatedProductIds: string[],
  featured?: boolean,
  bestseller?: boolean,
  newArrival?: boolean,
  localSEOKeyword?: string,
  price?: number | null,
  originalPrice?: number | null,
  discountLabel?: string | null,
  firstTimeOffer?: string | null,
  badge?: string | null,
  minQty?: number,
  maxQty?: number,
  defaultQty?: number,
  faqIds?: string[],
  tags?: string[],
  whatsappMeta?: {
    inquiryLabel?: string,
    recommendedFor?: string[],
    leadType?: "wedding" | "corporate" | "retail" | "events" | "apparel" | "general"
  }
}

Do not force unnecessary product fields such as:
- material
- size options
- print sides
- printing method
- paper/fabric GSM
- finish

Keep architecture ready so these can be added later without changing components.

==================================================
6. PRODUCT CARD + PRODUCT PAGE STRATEGY
==================================================

Product card must include:
- product image
- title
- short subtitle
- short price placeholder or starting price placeholder
- optional badge: Bestseller / New / First Order Offer / Bulk Friendly
- quantity quick selector or CTA leading to PDP
- Add to Inquiry Cart button
- WhatsApp button
- consistent CTA layout

Product detail page must include:
- breadcrumb
- gallery
- title
- subtitle
- concise description
- optional placeholder price
- discount / first-time offer badge if present
- quantity selector
- Add to Inquiry Cart
- WhatsApp Inquiry
- why this product works section
- related products carousel/grid
- FAQ accordion
- sticky mobile bottom CTA with quantity + WhatsApp
- trust strip below primary CTA area

Do not build complex customizers yet.
Keep product pages conversion-focused and simple.

==================================================
7. WHATSAPP-FIRST CONVERSION LOGIC
==================================================

This site is not checkout-first. It is WhatsApp-first.

Global rules:
- Floating WhatsApp button on all pages
- Product-level WhatsApp CTA
- Cart-level WhatsApp CTA
- Quote CTA sections route to WhatsApp
- Contact section routes to WhatsApp
- No fake contact form submission backend
- If a form is shown, it should format message and open WhatsApp

Use placeholder WhatsApp number in config:
- whatsapp.number = "919999999999"

Create helper utility:
- buildWhatsAppUrl(payload)

Product WhatsApp message format:
Hello, I’m interested in this product:

Product: {title}
Category: {category}
Quantity: {quantity}
Offer: {discountLabel or firstTimeOffer if available}
Product URL: {current page url if available}
Notes: I would like more details.

Please share pricing, timeline, and available options.

Cart WhatsApp message format:
Hello, I’d like a quote for the following items:

1. {product title} — Qty: {qty}
2. {product title} — Qty: {qty}
3. {product title} — Qty: {qty}

Service Area: Hyderabad 
Request: Please share pricing, production timeline, and next steps.

Optional UX:
Before opening WhatsApp from cart, show a lightweight client-side modal with optional fields:
- Name
- Phone
- Business/Event Type
- Notes

If user fills them, append to message.
If not, still allow direct WhatsApp.

==================================================
8. CART / INQUIRY CART
==================================================

Build a lightweight inquiry cart using local state + localStorage persistence.

Cart rules:
- Add product with quantity
- Increase/decrease quantity
- Remove item
- Empty cart
- Persist on refresh
- Show cart count in header
- Cart drawer on desktop
- Full-page cart on mobile or dedicated cart page
- Primary CTA = "Send Inquiry on WhatsApp"
- Secondary CTA = "Continue Browsing"

Cart item display:
- thumbnail
- title
- category
- quantity controls
- offer badge if applicable
- remove button

No taxation
No shipping calculation
No checkout billing forms
No payment methods

==================================================
9. PAGES TO BUILD
==================================================

Build these pages:

1. Home
2. Category listing pages for every category
3. Product detail pages for every product
4. Inquiry Cart page
5. About page
6. Contact / WhatsApp page
7. Get Quote page
8. FAQ page
9. Blog listing page
10. Blog detail page
11. Privacy Policy placeholder
12. Terms placeholder
13. Turnaround / ordering info page
14. File preparation guide placeholder

==================================================
10. HOMEPAGE STRUCTURE
==================================================

The homepage must be highly thought through and conversion-focused.

Suggested section order:

A. Announcement bar
- Hyderabad focused message
- Sample text:
  "Custom printing, apparel, gifting & event branding for Hyderabad "
- secondary rotating message:
  "Bulk orders, startup kits, wedding invites, corporate gifts"

B. Hero section
- strong headline
- local trust-oriented subheadline
- primary CTA: Get Quote on WhatsApp
- secondary CTA: Browse Categories
- hero visual should be a collage/mockup showing business cards, wedding cards, apparel, mugs, bags, banners
- include compact trust chips:
  - Local Service
  - Bulk Orders Welcome
  - Startup Friendly
  - Wedding & Event Ready

C. Quick category grid
- 8 large category cards
- each card visually distinct but uniform
- image, icon, title, short descriptor, CTA
- mobile-first 2-column grid

D. Why choose us
- 4 to 6 icon-based reasons
- e.g. Local service, Design support, Bulk-friendly, WhatsApp ordering, Flexible quantities, Fast response

E. Best sellers
- dynamic from JSON
- horizontally scrollable on mobile
- clean grid on desktop

F. Offers / first order banner
- e.g. "Launching soon offers available"
- placeholder discount messaging from config
- should be easy to disable globally

G. Solutions by audience
- cards for:
  - Startups
  - Schools & Colleges
  - Hotels & Cafes
  - Weddings
  - Events & Exhibitions
  - Corporate Teams
- clicking should filter or route into relevant products/categories

H. Wedding inspiration section
- image-led
- elegant typography
- promote wedding invites, acrylic invites, save the date cards

I. Corporate gifting + office essentials block
- mugs, bottles, gift sets, notebooks, pens, joining kits

J. Apparel & uniforms section
- highlight T-shirts, polos, hoodies, safety jackets, aprons, kids apparel
- include "for teams, schools, promotions, cafés"

K. Event branding section
- rollups, banners, standees, flags, vinyl stickers, wallpaper
- strong visual presentation
- emphasize promotions/exhibitions/store launches

L. Instagram-style gallery / inspiration grid
- 6 to 12 placeholders
- should look highly shareable
- can double as social proof / portfolio preview

M. Testimonials
- placeholder but realistic structure
- separate by use case:
  - startup client
  - wedding client
  - school/admin client
  - local business owner

N. FAQ teaser
- top 5 common questions
- link to full FAQ

O. Blog / SEO section
- show 3 to 6 blog cards
- topics should target local search and social shareability

P. Final CTA band
- bold local message
- "Need printing for your business, event, or wedding in Hyderabad?"
- WhatsApp CTA
- Browse categories CTA

==================================================
11. CATEGORY PAGE STRUCTURE
==================================================

Each category page should include:
- category hero
- short category intro targeting local SEO
- featured products
- full product grid
- filter chips if helpful (subcategories / use cases / bestseller / budget / bulk)
- short trust strip
- FAQ related to category
- final CTA band

Examples:
- Stationery page should feel clean, corporate, startup-friendly
- Wedding page should feel emotional and elegant
- Clothing/Apparel page should feel energetic and practical
- Event Solutions page should feel bold and campaign-driven

==================================================
12. ABOUT PAGE
==================================================

About page tone:
- early-stage but trustworthy
- no fake legacy claims
- no fake address
- no exaggerated claims

Include:
- brand mission
- who we serve in Hyderabad 
- the kinds of businesses/events supported
- why WhatsApp-first ordering is convenient
- service philosophy: simple, responsive, custom, practical
- section: "Built for startups, local businesses, schools, events, and weddings"
- final CTA to WhatsApp

==================================================
13. CONTACT / GET QUOTE
==================================================

Contact page:
- no address block
- no map
- no fake office timings unless configurable
- centered around WhatsApp and simple inquiry

Include:
- WhatsApp CTA
- simple lightweight form
  - name
  - phone
  - requirement type
  - notes
- form should convert to WhatsApp message, not submit to server
- reassure users that they can ask for pricing, timeline, and recommendations

Get Quote page:
- similar to contact, but more structured
- allow selection of category and product
- quantity field
- notes
- optional timeline field
- button formats everything and opens WhatsApp

==================================================
14. FAQ STRATEGY
==================================================

Create reusable FAQ data and category-specific FAQs.

Global FAQ examples:
- Do you deliver in Hyderabad ?
- Can I place bulk orders?
- Do you help with design?
- Can I order via WhatsApp?
- Do you offer custom branding?
- Can I mix multiple products in one inquiry?
- Do you support startup and event requirements?
- How fast do you respond?

Wedding FAQ examples:
- Can I order digital and printed invites?
- Do you support acrylic invitation requests?
- Can you help with wording and formats?

Corporate FAQ examples:
- Can you handle employee kits and gifting?
- Can I place recurring business orders?
- Can I request branding across multiple products?

==================================================
15. BLOG / SEO STRATEGY
==================================================

The website must be SEO-feasible even without backend.

Implement:
- SEO-friendly routes
- metadata per page
- title/description per category and product
- local intent copy
- internal linking between blogs, categories, and products

Blog topics should be data-driven placeholders such as:
- Best business card printing ideas for Hyderabad startups
- Wedding invitation trends in Hyderabad
- Custom T-shirts for events and college fests
- Corporate gifting ideas for tech companies in Hyderabad
- Roll-up banners vs standees for store promotions
- Welcome kits for new employees: what to include
- How to choose between flyers, brochures, and presentation folders
- Budget-friendly custom bags for local promotions

SEO rules:
- homepage optimized for Hyderabad custom printing / printing services
- category pages optimized around local buyer intent
- blog pages support discovery and social sharing
- avoid keyword stuffing
- maintain readable, human-first content

==================================================
16. SOCIAL MEDIA / INSTAGRAM READINESS
==================================================

The site should feel promotable on Instagram.

Include:
- visually strong mockup-based sections
- square and portrait-friendly image crops where helpful
- gallery/inspiration blocks
- high-contrast CTA strips
- shareable headline copy
- sections that can easily be screenshotted and reused for social creatives

==================================================
17. UNIFORMITY AND DESIGN CONSISTENCY
==================================================

This is critical:
- all section paddings must follow consistent spacing scale
- all cards must use common component primitives
- all buttons must come from reusable Button component variants
- all badges must come from reusable Badge component
- all sections should be built using reusable section wrapper primitives
- headings must follow a unified typography system
- product cards across all categories must align visually
- image ratios must be standardized
- CTA hierarchy must remain consistent sitewide

Create reusable components such as:
- Container
- SectionHeader
- Button
- Badge
- ProductCard
- CategoryCard
- TestimonialCard
- FAQAccordion
- WhatsAppButton
- FloatingWhatsApp
- QuantitySelector
- InquiryCartDrawer
- OfferPill
- Breadcrumbs
- PageHero
- SEOHead component
- EmptyState
- FilterChips

==================================================
18. PLACEHOLDER IMAGERY
==================================================

Use placeholder imagery everywhere for now.
Use mockup-style visuals that resemble a professional print catalog.
Ensure all images are swappable later from data files.
Use image sizes consistently.

Suggested visual types:
- stationery flat lays
- wedding invite mockups
- apparel on neutral backgrounds
- mugs and bottles mockups
- bags mockups
- banner/standee promotional mockups

Do not depend on a server.
Keep assets local or use placeholder URLs abstracted in data.

==================================================
19. ACCESSIBILITY + RESPONSIVENESS
==================================================

Must be fully responsive:
- mobile
- tablet
- laptop
- wide desktop

Accessibility requirements:
- semantic HTML
- keyboard accessible menus and accordions
- visible focus styles
- sufficient contrast
- descriptive alt text support via data
- reduced motion support
- buttons large enough for touch

==================================================
20. TECHNICAL IMPLEMENTATION
==================================================

Use:
- React
- TypeScript
- Tailwind CSS
- React Router
- local JSON or TS data files
- localStorage for inquiry cart persistence
- optional utility libraries only if justified

Suggested structure:
- src/components
- src/pages
- src/layouts
- src/data
- src/config
- src/hooks
- src/utils
- src/types

Create TypeScript types for:
- Product
- Category
- FAQ
- Testimonial
- BlogPost
- ThemeConfig
- CartItem

==================================================
21. DELIVERABLE EXPECTATIONS
==================================================

Provide:
1. Clean file/folder structure
2. Theme config
3. Site config
4. Product/category JSON or TS data
5. All reusable components
6. All required pages
7. Routing setup
8. Inquiry cart logic
9. WhatsApp utility formatting logic
10. SEO/meta handling
11. Sample placeholder data for every category and product listed in the JSON File of data folder separated by categories arrays.
12. Consistent polished UI

Populate every listed category and sub-product with placeholder content so the site feels complete from day one.

So, that in future the local json data file could be replaced with API response.

The final site should feel like:
- a serious local brand
- startup-friendly
- wedding-friendly
- corporate-capable
- easy to browse
- highly conversion-oriented
- maintainable and extensible

Most importantly:
Do not leave ambiguous gaps.
Use strong defaults.
Prefer reusable data-driven architecture over hardcoded pages.
Design for revenue, trust, and WhatsApp conversion.