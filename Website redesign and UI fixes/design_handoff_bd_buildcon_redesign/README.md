# Handoff: BD Buildcon Website Redesign

## Overview
A full redesign of the BD Buildcon LLP marketing website (Next.js app in `internship 2/BD_Buildcon`). It polishes the existing teal brand into a production-ready, corporate engineering look: 7 desktop pages plus mobile mockups of Home and Contact. Content (clients, projects, contact info, employee links) is drawn from the existing `content/*.ts` files.

## About the Design Files
The `.dc.html` files in this bundle are **design references created in HTML** — prototypes showing intended look and behavior, not production code to copy directly. The task is to **recreate these designs in the existing Next.js + Tailwind codebase** (`app/`, `components/`, Tailwind config, framer-motion), using its established patterns: `PageTitleBand`, `CTABand`, `SectionHeading`, `Header`, `Footer`, and the `content/*.ts` data files. Map the inline-styled values below into Tailwind theme tokens.

## Fidelity
**High-fidelity.** Colors, typography, spacing and interaction states are final and should be recreated pixel-perfectly, using existing components/libraries where they fit.

## Design Tokens

Colors:
- Primary teal: `#16A8B8` (hover darken: `#0E8C9B`, deep: `#0C7A88`, light accent on dark: `#5BD6E2`)
- Ink / headings: `#2E353B`; secondary text: `#6B7177`; nav idle: `#4d545a`
- Dark section bg: `#2a3137`; footer bg: `#1F2124`
- Light section bg: `#F6F8F8`; borders: `#E5E7E8`; hairline: `#EFF1F2`
- Logo: bars `#009FDF` / `#FDB913` / `#E32322`, wordmark `#005579`
- Error/required: `#E23A2E`; success text: `#0C7A88`
- Teal tints: `rgba(22,168,184,0.09–0.12)` icon chips, `rgba(22,168,184,0.3–0.5)` hover borders

Typography:
- Headings: **Hanken Grotesk** (400/600/700/800), letter-spacing −0.01 to −0.02em
- Body/UI: **Inter** (400/500/600/700)
- Scale: h1 48px/800 (hero 60px), h2 42px/700 (split-section 38px), card titles 19–22px/700, body 15–18px lh 1.6–1.75, labels/nav 11–13px uppercase 600 with 0.07–0.14em tracking

Spacing & shape:
- Content max-width 1280px, 24px side padding; section padding 96px vertical (bands 72–88px)
- Radii: cards/images 12px, inputs 8px, buttons/pills 999px
- Section heading pattern: centered h2 + 56×3px teal rule + optional 18px subhead
- Card shadow on hover: `0 4–8px 16–28px rgba(0,0,0,0.06–0.08)`; form card: `0 1px 4px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.06)`

Buttons:
- Primary: teal pill, white uppercase 13px/600, 15px×32px padding, hover `#0E8C9B` + teal glow shadow
- Secondary (dark bg): 2px white border pill, hover inverts to white bg / dark text
- Secondary (light bg): 2px teal border, teal text, hover fills teal
- Focus visible: `2px solid #16A8B8` outline, 2px offset

## Screens / Views

### Shared: Header (sticky)
72px tall, `rgba(255,255,255,0.96)` + `backdrop-filter: blur(8px)`, 1px bottom border. Left: 3-bar logo + "BD BUILDCON LLP" wordmark + "Formerly Bhumi Developers" tagline. Center: 7 uppercase nav links (12.5px/600), active = teal text + 2px teal bottom border. Right: phone with teal icon chip + primary pill "Start Your Project". Mobile: logo + 44px hamburger.

### Shared: Page title band (all inner pages)
Bg `#2a3137` with teal radial glow top-right, 72px/64px padding. Breadcrumb (13px, current in `#5BD6E2`), h1 48px/800 white, 18px lead in `rgba(255,255,255,0.7)` max-width 640px.

### Shared: CTA band
Teal bg, 72px padding. Left: h2 32px white + one-line sub. Right: white pill button with arrow icon.

### Shared: Footer
`#1F2124`, 3px teal top border. 3 columns (5/3/4 fr): About blurb, Company Links, Contact Info; each heading has a 44×3px teal rule. Bottom bar: copyright + "Back to top ↑" in `#5BD6E2`.

### Home (`Home.dc.html`)
1. **Hero** — full-bleed industrial photo, dark gradient overlay, centered: glass badge pill (ISO/CRISIL), 60px h1 with teal-highlighted phrase, one-line stat sub, primary + outline CTAs. Min-height 620px.
2. **Sector marquee** — light strip, 36s infinite translateX loop of uppercase sector names separated by teal dots (duplicated row for seamless loop).
3. **What We Build** — 4-up grid of 4:5 image cards, bottom gradient + white title + 14px description. Whole card is a link.
4. **Pillars** — light band, 4 centered columns: 60px teal-tint icon circle, 19px title, 15px body.
5. **How We Build** — dark split: image left, kicker + 38px h2 + 2 paragraphs + 3 numbered step chips (01–03, teal-bordered translucent).
6. **Track Record** — teal band, 4 stats: 64px/800 white numerals + uppercase labels (50+, 30+, 0, 70%).
7. **Desk of Directors** — 3:4 portrait placeholder (diagonal-stripe pattern + label chip), teal kicker, 26px quote, attribution with 40×2px teal dash, outline button.
8. **Trusted By** — 4×4 grid of white cards: client name 16px/700 + sector 12px; teal border + shadow on hover.
9. **Enquiry form** — 720px card: Name*/Email*, Company/Phone, Sector/Type selects, Message*; inputs on `#F6F8F8` with teal focus ring `0 0 0 3px rgba(22,168,184,0.12)`; submit → "Sending…" → success line. Wire to existing `/api` contact route.

### About (`About.dc.html`)
Story split (text + photo) → Milestones: 4 cards (1995 / 2005 / 2015 / 2021, 28px teal year) → Mission (dark card) + Vision (teal card), 22px/600 white statements → Leadership: 3 portrait-placeholder cards → CTA band.

### Why Us (`Why-Us.dc.html`)
Six numbered reason cards (3×2, "01"-style teal numerals) → dark comparison table "The BD Buildcon Standard": header row + 5 rows, 3 cols (Criteria / BD Buildcon in `#5BD6E2` / Typical Contractor muted), rows are translucent white strips with 2px gaps → 3 testimonial cards with teal quote glyph → CTA band.

### Safety & Quality (`Safety-Quality.dc.html`)
4 stat cards (teal 48px values) → split: photo + 5 checklist protocols (teal check chips, bold title + body) → Quality Systems: 6 cards → dark band with two certification cards (ISO 9001:2015, CRISIL SME 3 in 28px `#5BD6E2`) → CTA band.

### Projects (`Projects.dc.html`)
Filter pill row (All / Civil & Structural / PEB / Piping & Mechanical / Roads & Earthwork); active = teal fill, idle = white with border. 3-col card grid from `content/projects.ts`: 16:10 image with dark glass category chip top-left, 19px title, teal client line, scope text, hairline-divided location/year footer. Filtering swaps the visible set (existing page already has this logic — keep URL-synced filter if present).

### Employee Area (`Employee-Area.dc.html`)
Two large portal cards (ERP → `http://bhumi.novasoftwares.com/`, Company Email → Yandex mail, from `content/links.ts`): 56px icon tile, 22px title, description, "Open portal ↗" link, open in new tab. Info note strip below with IT contact.

### Contact (`Contact.dc.html`)
Split 1 / 1.4: left stack of 4 info cards (Registered Office, Phone ×2, Email ×2, Office Hours) on `#F6F8F8`; right enquiry form card (same fields as Home + 24px "Send an Enquiry" heading). Below: 320px map strip (replace placeholder with embedded Google Map of Millenium Arcade, Bharuch).

### Mobile (`Mobile.dc.html`)
393px-wide references for Home and Contact inside iPhone frames: sticky compact header with hamburger (44px target), full-width stacked pill CTAs, 2-col service grid, 2×2 stats, single-column form with 14px+ inputs. Use as the responsive spec; all hit targets ≥ 44px.

## Interactions & Behavior
- Nav links: hover darkens text; active page underlined teal.
- All cards: 0.15–0.2s ease transitions on border-color/shadow; service images may scale ~1.05 on hover (0.6s ease-out).
- Marquee: CSS keyframe translateX(−50%) loop, 36s linear.
- Forms: HTML5 required validation; submit disables into "Sending…" ~0.8s then success message + reset (replace stub with real API call).
- Projects filter: client-side category filter, no reload.
- Respect `prefers-reduced-motion` for marquee/scroll animations (globals.css already has patterns for this).

## State Management
- Projects page: `filter` string state (default "All").
- Forms: `sending` / `sent` booleans; wire to existing `/app/api` route.
- Header: existing mobile-menu open state; keep scroll-aware sticky behavior.

## Assets
- `logo.svg` — existing brand logo (copied from `public/logo.svg`).
- Photos are Unsplash placeholders (industrial/construction) — replace with real site photography; director/leadership portraits and the map are deliberate placeholders.
- Icons: inline 24px stroke SVGs (2px stroke, round caps), teal `#16A8B8`.

## Files
- `Home.dc.html`, `About.dc.html`, `Why-Us.dc.html`, `Safety-Quality.dc.html`, `Projects.dc.html`, `Employee-Area.dc.html`, `Contact.dc.html` — desktop designs
- `Mobile.dc.html` (+ `ios-frame.jsx`, `support.js` viewer runtime) — mobile references
- `assets/logo.svg`

Open any `.dc.html` in a browser to inspect; all styles are inline on the elements.
