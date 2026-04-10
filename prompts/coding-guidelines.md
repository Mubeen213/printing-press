==================================================
1 FRONTEND ARCHITECTURE RULES
==================================================

The frontend must be structured like a production-ready application, not a prototype.

Architecture goals:
- high reusability
- low coupling
- predictable data flow
- strong TypeScript safety
- easy future extension
- easy rebranding
- maintainable folder structure
- scalable component system

Use a layered architecture:
- `app/` or root setup for providers, router, app shell
- `pages/` for route-level pages only
- `components/` for reusable presentational UI
- `features/` for domain-specific logic such as cart, products, search, faq
- `layouts/` for page wrappers and shared layout structures
- `config/` for theme, brand, SEO defaults, routes
- `data/` for local JSON/TS content
- `hooks/` for reusable custom hooks
- `utils/` for pure helper functions
- `types/` for shared TypeScript contracts
- `lib/` for framework-independent utilities if needed

Rules:
- route pages must stay thin and compose feature modules
- business logic must not be deeply embedded inside JSX
- utility functions must be pure wherever possible
- avoid duplicated logic across pages
- avoid hardcoding repeated product/category content inside components
- all content should come from typed local data files
- use composition over inheritance
- shared UI primitives must be generic and reusable
- domain components must be separated from generic UI components

Non-negotiable:
- no giant monolithic page files
- no giant component files mixing layout, data, state, and helpers
- no deeply nested conditional JSX when it can be extracted
- no copy-paste product sections with minor changes


==================================================
2 STATE MANAGEMENT RULES
==================================================

State management must be simple, explicit, and scalable.

Use these principles:
- local UI state stays local
- shared app state should be lifted only when necessary
- inquiry cart state should be centralized
- derived state should be computed, not duplicated
- persisted state should be version-aware where practical

Recommended shared state areas:
- inquiry cart
- search query
- active filters
- theme selection if future themes are enabled

Cart requirements:
- implement cart with a dedicated provider or feature-level state module
- persist cart to localStorage
- restore cart safely on reload
- handle malformed localStorage gracefully
- include utility functions for add/update/remove/clear
- avoid duplicate cart logic across page and drawer views

Rules:
- do not store redundant derived values if they can be computed
- do not mutate state directly
- use stable identifiers for products and cart items
- keep state transitions predictable
- keep cart logic isolated from presentational UI

Optional:
- use reducer-based state for cart if it improves clarity


==================================================
3 TYPESCRIPT QUALITY RULES
==================================================

The codebase must be strongly typed and avoid weak TypeScript patterns.

Rules:
- use strict TypeScript
- define shared domain types centrally
- prefer explicit interfaces/types for domain models
- avoid `any`
- avoid broad `Record<string, any>` where real types are possible
- type all component props
- type all utility function inputs and outputs
- type all hooks
- type all config objects
- use discriminated unions where useful for state or variant handling
- define reusable enums or literal unions for category keys, badges, lead types, CTA variants, themes

Examples of shared types:
- Product
- Category
- CartItem
- FAQ
- BlogPost
- Testimonial
- ThemeConfig
- SiteConfig
- WhatsAppPayload
- FilterOption
- NavItem

Data integrity:
- product/category relations must be validated through stable keys
- relatedProductIds must reference known products
- slug values must be unique
- category keys must be consistent across routes, filters, and data

Goal:
- data and component contracts should be self-documenting through types


==================================================
4 ROUTING AND URL DESIGN RULES
==================================================

Routing must be clean, SEO-friendly, and predictable.

Rules:
- use human-readable slugs
- keep URLs lowercase and hyphenated
- define routes centrally in a route config if helpful
- use consistent route patterns across categories and products
- ensure breadcrumbs match routing structure
- support graceful 404 page
- route-level metadata must be configurable

Recommended route patterns:
- `/`
- `/category/:categorySlug`
- `/product/:productSlug`
- `/cart`
- `/about`
- `/contact`
- `/get-quote`
- `/faq`
- `/blog`
- `/blog/:blogSlug`
- `/turnaround-info`
- `/file-preparation-guide`
- `/privacy-policy`
- `/terms`

Rules:
- avoid inconsistent pluralization in URLs
- avoid deeply nested routes unless needed
- keep internal linking strong between categories, products, and blogs
- route params must map cleanly to local typed data


==================================================
5 COMPONENT DESIGN SYSTEM RULES
==================================================

Components must follow a production-grade design system approach.

Component layers:
- primitive UI components
- shared composed components
- feature/domain components
- page sections
- route pages

Primitive UI examples:
- Button
- Input
- Textarea
- Select
- Badge
- Card
- Modal
- Drawer
- Accordion
- Breadcrumbs
- SectionHeader

Rules:
- primitives must have clear props and variants
- variant styling should be centralized and predictable
- shared components should not hardcode page-specific copy
- components must support loading, empty, and disabled states where relevant
- repeated layouts should be abstracted
- buttons and links must have consistent sizing and interaction behavior
- cards across the site must share a common visual grammar
- use semantic variants such as `primary`, `secondary`, `outline`, `ghost`, `whatsapp`, `danger` if needed
- avoid component APIs that are too clever or hard to understand

Goal:
- the design system should make adding new categories or pages easy without visual drift


==================================================
6 FORM UX AND VALIDATION RULES
==================================================

Even though there is no backend, forms must feel polished and production-ready.

Rules:
- validate required fields client-side
- show inline validation messages
- use accessible labels and error states
- preserve entered values until user intentionally resets
- trim whitespace before formatting WhatsApp message
- disable primary action only when input is clearly invalid
- provide helpful placeholder text
- show success handoff state before redirecting/opening WhatsApp if useful

Forms to support:
- contact inquiry form
- get quote form
- optional cart inquiry modal

Validation should be simple and practical:
- required name if configured
- required category or requirement type where applicable
- quantity should not go below minimum
- phone format should be lightly validated if collected
- notes field should allow free text

Do not overbuild:
- no backend submission
- no fake success states pretending data was saved
- all form completion should clearly result in WhatsApp handoff


==================================================
7 LOADING, EMPTY, AND ERROR STATE RULES
==================================================

The UI must gracefully handle edge cases.

Required states:
- empty cart state
- no search results state
- no matching filter state
- missing product fallback state
- 404 page
- missing image fallback
- optional skeleton states for slow-loading sections if simulated
- graceful handling for invalid or missing local data

Rules:
- empty states should be helpful and action-oriented
- missing product routes should redirect to 404 or show valid fallback
- product cards must not break if optional fields are absent
- image components should support fallback placeholders
- the app should fail gracefully if localStorage is unavailable or malformed


==================================================
8 SEO IMPLEMENTATION RULES
==================================================

SEO must be implemented at the page level with reusable patterns.

Rules:
- each route must support unique title and meta description
- include canonical-friendly route structure
- use semantic heading hierarchy
- avoid duplicate page titles
- category and product pages should derive metadata from local data
- blog posts should have metadata from blog data
- include Open Graph and social share metadata where practical
- support Twitter/X preview metadata where practical
- use descriptive alt text from content data
- include structured internal linking between categories, products, blogs, and FAQs

Content requirements:
- homepage targets Hyderabad / Secunderabad printing intent
- category pages target local commercial intent
- blog content supports discovery and education
- avoid thin duplicate copy across category pages

Optional:
- include structured data helpers if feasible for Organization, BreadcrumbList, Product-like entities, and FAQPage


==================================================
9 PERFORMANCE RULES
==================================================

The frontend should be reasonably optimized for real-world usage.

Rules:
- keep bundle size sensible
- avoid unnecessary dependencies
- lazy load route-level pages where practical
- optimize image rendering strategy
- use responsive image sizing where practical
- memoize only where helpful, not blindly
- avoid unnecessary rerenders from unstable props
- keep large data mappings efficient
- avoid oversized animation libraries unless justified
- use lightweight utilities over heavy frameworks when possible

Image rules:
- use consistent image aspect ratios
- support lazy loading for non-critical images
- prioritize hero image and key above-the-fold visuals
- use placeholders/fallbacks for missing images

Goal:
- fast first impression, especially on mobile


==================================================
10 ACCESSIBILITY RULES
==================================================

Accessibility must be treated as a core requirement.

Rules:
- use semantic HTML
- all interactive controls must be keyboard accessible
- visible focus states are required
- menus, accordions, drawers, and modals must be accessible
- icon-only buttons must have accessible labels
- image alt text must be supported through data
- color contrast must be sufficient
- forms must associate labels with fields
- error messages must be understandable
- touch targets must be reasonably sized
- reduced motion preferences must be respected

Important:
- accessibility should not be added as an afterthought
- reusable components should be accessible by default

==================================================
11 TESTABILITY AND CODE QUALITY RULES
==================================================

The code should be structured for easy testing and maintenance.

Rules:
- keep pure functions separate from UI
- isolate formatting helpers such as WhatsApp message builders
- keep route data lookup logic reusable
- avoid hidden side effects in components
- keep component props explicit
- prefer deterministic outputs from helpers
- use constants/config rather than magic strings
- keep repeated labels centralized where practical

Key utilities that should be easy to test:
- cart helpers
- quantity normalization
- WhatsApp URL/message formatting
- product lookup by slug
- related product resolution
- filter/search helpers
- SEO metadata builders


==================================================
12 CONTENT GOVERNANCE RULES
==================================================

Content should be easy to manage and extend from local data files.

Rules:
- product content should not be embedded directly in component files
- repeated category descriptions should be stored centrally
- CTA labels should be configurable
- trust badges and offer labels should be configurable
- FAQ entries should be reusable by page/category/product
- blog metadata and image references should come from structured content objects
- content should support future expansion without schema breakage

Goal:
- updating products, categories, offers, FAQs, and SEO copy should require minimal code changes

==================================================
13 FRONTEND SAFETY RULES
==================================================

Even though this is a frontend-only application, basic safety and robustness rules must be followed.

Rules:
- sanitize or safely handle user-entered text before interpolating into URLs
- properly encode WhatsApp message text
- avoid dangerous HTML injection
- do not use `dangerouslySetInnerHTML` unless clearly justified
- guard against malformed localStorage data
- use safe fallbacks for missing content
- keep external links secure and explicit where relevant


==================================================
14 DEVELOPER EXPERIENCE RULES
==================================================

The codebase should be pleasant to maintain.

Rules:
- use clear naming
- avoid ambiguous file names like `index.tsx` everywhere without context
- keep imports organized
- prefer small focused files over giant mixed-concern files
- use barrel exports only when they improve clarity
- add concise comments only where they provide real value
- avoid over-commenting obvious code
- use constants for repeated strings and route keys where useful
- keep folder structure intuitive
- aim for low cognitive load for future edits

==================================================
15 RESPONSIVE DESIGN RULES
==================================================

Responsive design must be deliberate, not incidental.

Rules:
- mobile-first implementation
- define layout behavior intentionally for mobile, tablet, laptop, and desktop
- navigation, hero, category grids, product cards, cart, and CTA bands must all be designed for small screens first
- sticky mobile CTA behavior should be used where it improves conversion
- horizontal scrolling sections must remain usable and visually polished
- avoid cramming desktop layouts into mobile
- touch interaction and spacing must feel natural on phones
- maintain visual consistency across breakpoints

Important mobile priorities:
- header should remain compact and usable
- CTA buttons should stay prominent
- product detail pages should keep inquiry actions near thumb reach
- cart interactions should feel smooth on mobile


IMPORTANT:
DO NOT ADD ANY TEST FILES OR ANY TESTING CODE.