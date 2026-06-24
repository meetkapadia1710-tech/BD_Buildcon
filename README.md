# BD Buildcon LLP — Website

Production-ready Next.js marketing website for BD Buildcon LLP (formerly Bhumi Developers),
a turnkey industrial EPC contractor based in Bharuch, Gujarat, India.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3002](http://localhost:3002).

## Project Structure

```
bd-buildcon/
├── app/                    # Next.js App Router pages and API routes
│   ├── page.tsx            # Home
│   ├── about/              # Single tabbed page: Overview · Ideology · Certifications · Plant & Equipment
│   ├── why-us/             # Why choose BD Buildcon
│   ├── projects/           # Filterable project gallery + detail pages
│   ├── employee-area/      # Staff portal links
│   ├── contact/            # Contact form + map
│   ├── thank-you/          # Form success page
│   ├── not-found.tsx       # 404 page
│   └── api/contact/        # Contact form API handler (stub — wire email here)
├── components/
│   ├── layout/             # Header, Footer, PageTitleBand, SectionHeading, CTABand
│   ├── motion/             # LenisProvider, RevealText, RevealImage, FadeRise, CountUp, MagneticButton
│   └── ui/                 # DataTable, ProjectCard, TestimonialCard, Lightbox
├── content/                # Typed data files (edit these to update site content)
│   ├── company.ts          # Headline stats (years, projects, repeat %) — single source of truth
│   ├── projects.ts         # Project portfolio data
│   ├── machinery.ts        # Plant & machinery inventory
│   ├── equipment.ts        # Equipment & accessories inventory
│   ├── testimonials.ts     # Client testimonials
│   ├── clients.ts          # Client logos / names
│   ├── certifications.ts   # Recommendation letters + accreditations
│   ├── services.ts         # Core services
│   └── links.ts            # Contact info, social links, employee portal URLs
├── lib/
│   └── utils.ts            # Helper functions
└── public/images/          # Drop real project photos here
```

## How to Add or Update Content

### Adding a Project

Edit `content/projects.ts` — add a new entry to the `projects` array:

```typescript
{
  slug: 'my-new-project',        // URL-safe identifier
  name: 'Project Name',
  client: 'Client Company',
  sector: 'Chemical',            // Used for filtering on /projects
  location: 'City, Gujarat',
  scope: 'Civil, Mechanical',
  duration: '12 months',
  year: '2024',
  safetyRecord: 'Zero accidents',
  image: '/images/my-project.jpg',  // Drop photo in /public/images/
  images: ['/images/my-project.jpg'],
  excerpt: 'Short description shown on card hover.',
  challenge: 'The challenge paragraph...',
  whatWeBuilt: 'What we built paragraph...',
  outcome: 'The outcome paragraph...',
  quote: 'Optional client quote text.',
  quoteName: 'Job Title',
  quoteTitle: 'Company Name',
}
```

### Adding Real Photos

1. Drop `.jpg` / `.webp` files into `/public/images/`.
2. Update the `image` and `images` fields in `content/projects.ts` (and `content/certifications.ts` for cert docs) to use `/images/filename.jpg`.
3. For large hero images, ensure they are optimised (max ~300–500 KB for above-fold, ~150 KB for thumbnails). Use next/image's built-in optimisation.

### Updating the Machinery / Equipment Tables

Edit `content/machinery.ts` or `content/equipment.ts`. Category rows have `isCategory: true`. Sub-items have a dotted `no` like `'1.1'`.

### Updating Contact Info / Links

Edit `content/links.ts` — update phone, email, address, social links, and employee portal URLs.

### Updating Testimonials

Edit `content/testimonials.ts`.

## Wiring the Contact Form Email

Open `app/api/contact/route.ts` and follow the TODO comment. The recommended provider is **Resend**:

```bash
npm install resend
```

Add to `.env.local`:

```
RESEND_API_KEY=re_xxxxxxxxxxxxxxxx
```

Uncomment and adapt the Resend block in the route handler.

## Deployment

### Vercel (recommended)

```bash
npx vercel
```

Set the environment variable `RESEND_API_KEY` (or your email provider key) in the Vercel dashboard.

### Other platforms

```bash
npm run build
npm start
```

## Design Tokens

Key CSS variables are defined in `app/globals.css` and mirrored in `tailwind.config.ts`:

| Token          | Value     | Usage                |
| -------------- | --------- | -------------------- |
| `--teal`       | `#16A8B8` | CTAs, links, accents |
| `--teal-hover` | `#0E8C9B` | Button hover         |
| `--ink`        | `#2E353B` | Headings             |
| `--body`       | `#6B7177` | Body text            |
| `--surface`    | `#F6F8F8` | Section backgrounds  |
| `--footer`     | `#1F2124` | Footer background    |

## Tech Stack

- **Next.js 14** (App Router) + TypeScript
- **Tailwind CSS 3** — utility-first styling
- **Framer Motion** — page transitions, animated components
- **Lenis** — smooth scroll
- **GSAP + ScrollTrigger** — scroll-choreographed reveals, parallax, count-up
- **React Hook Form + Zod** — form validation
- **next/font** — Hanken Grotesk (display) + Inter (body)
- **next/image** — optimised images with lazy loading
