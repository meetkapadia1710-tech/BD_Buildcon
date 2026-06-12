import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { FadeRise, FadeRiseItem } from '@/components/motion/FadeRise'
import { RevealImage } from '@/components/motion/RevealImage'
import { CountUp } from '@/components/motion/CountUp'
import { SectionHeading } from '@/components/layout/SectionHeading'
import { CTABand } from '@/components/layout/CTABand'
import { TestimonialCard } from '@/components/ui/TestimonialCard'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { projects } from '@/content/projects'
import { testimonials } from '@/content/testimonials'
import { clients } from '@/content/clients'
import { services } from '@/content/services'
import { BlueprintReveal } from '@/components/motion/BlueprintReveal'
import { ConstructionDraw } from '@/components/motion/ConstructionDraw'
import { RisingFloors, type StatFloor } from '@/components/motion/RisingFloors'

export const metadata: Metadata = {
  title: 'BD Buildcon LLP | Industrial EPC Contractor, Bharuch, Gujarat',
  description:
    'Turnkey industrial EPC contractor since 1995. All projects completed on deadline with zero accidents. ISO 9001:2015 · NSIC · ₹200+ Cr delivered.',
}

const sectors = [
  'Chemicals', 'Pharma', 'Petroleum', 'Fertiliser',
  'Glass', 'Tyre', 'Food', 'Industrial Gases',
  'Chemicals', 'Pharma', 'Petroleum', 'Fertiliser',
  'Glass', 'Tyre', 'Food', 'Industrial Gases',
]

const pillars = [
  {
    icon: (
      <svg className="w-7 h-7 text-teal" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Zero Accidents',
    body: 'Safety is engineered into every protocol, every day on site.',
  },
  {
    icon: (
      <svg className="w-7 h-7 text-teal" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: 'On-Time Delivery',
    body: 'Predictable timelines backed by rigorous project planning and owned plant.',
  },
  {
    icon: (
      <svg className="w-7 h-7 text-teal" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    title: '70% Repeat Clients',
    body: 'More than two-thirds of our clients return — the strongest endorsement in the industry.',
  },
  {
    icon: (
      <svg className="w-7 h-7 text-teal" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    title: 'Technology Under One Roof',
    body: 'Owned fleet, testing lab and specialist teams — no third-party dependency.',
  },
]

const floorStats: StatFloor[] = [
  { value: 50,  suffix: '+', label: 'Projects Completed', heightPct: 72 },
  { value: 35,  suffix: '+', label: 'Years Experience',   heightPct: 58 },
  { value: 0,   suffix: '',  label: 'Accidents Recorded', heightPct: 88 },
  { value: 70,  suffix: '%', label: 'Repeat Client Ratio',heightPct: 80 },
]

export default function HomePage() {
  const featuredProjects = projects.slice(0, 4)

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-dark-bg" aria-label="Hero">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070&auto=format&fit=crop"
            alt="Large industrial plant construction site at twilight with steel structures and piping"
            fill
            className="object-cover animate-ken-burns"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/60" />
          {/* Teal swoosh bottom */}
          <svg
            className="absolute bottom-0 left-0 w-full text-white/5"
            viewBox="0 0 1440 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path d="M0,60 C360,100 1080,0 1440,60 L1440,100 L0,100 Z" fill="currentColor" />
          </svg>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <FadeRiseItem delay={0.1}>
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-white/80 font-body text-label-md uppercase tracking-widest mb-8">
              <span className="w-2 h-2 bg-teal rounded-full animate-pulse" />
              ISO 9001:2015 Certified · NSIC Rated
            </div>
          </FadeRiseItem>

          <FadeRiseItem delay={0.2}>
            <h1 className="font-display text-display-lg text-white leading-[1.05] tracking-tight mb-6">
              All our projects,{' '}
              <span className="block">completed on deadline —</span>
              <span className="text-teal">with zero accidents.</span>
            </h1>
          </FadeRiseItem>

          <FadeRiseItem delay={0.35}>
            <p className="font-body text-body-lg text-white/70 max-w-2xl mx-auto mb-10">
              35+ years · ISO 9001:2015 · NSIC · ₹200+ Cr turnover
            </p>
          </FadeRiseItem>

          <FadeRiseItem delay={0.45}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary text-sm">
                Start your project
              </Link>
              <Link href="/projects" className="btn-ghost-white text-sm">
                See the work
              </Link>
            </div>
          </FadeRiseItem>
        </div>
      </section>

      {/* ── Sector Marquee ── */}
      <section
        className="bg-surface border-b border-hairline py-4 overflow-hidden"
        aria-label="Sectors we serve"
      >
        <div className="flex">
          <div className="flex gap-10 animate-marquee whitespace-nowrap pr-10">
            {sectors.map((s, i) => (
              <span key={i} className="flex items-center gap-10 font-body text-label-md text-body uppercase tracking-widest">
                {s}
                {i < sectors.length - 1 && (
                  <span className="text-teal text-xl" aria-hidden="true">·</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── What We Build ── */}
      <BlueprintReveal>
      <section className="section-pad bg-white" aria-label="Services overview">
        <div className="container-max">
          <SectionHeading
            title="What We Build"
            subtitle="Precision engineering and robust construction across specialised industrial disciplines."
          />
          <FadeRise className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((svc) => (
              <div
                key={svc.id}
                className="group relative aspect-[4/5] overflow-hidden rounded-card bg-dark-bg cursor-pointer"
              >
                <Image
                  src={svc.image}
                  alt={svc.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="font-display text-headline-sm text-white mb-2">{svc.shortTitle}</h3>
                  <p className="font-body text-body-md text-white/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                    {svc.description.slice(0, 80)}…
                  </p>
                </div>
              </div>
            ))}
          </FadeRise>
        </div>
      </section>
      </BlueprintReveal>

      {/* ── Pillars Band ── */}
      <section className="bg-surface border-y border-hairline py-20" aria-label="Company pillars">
        <div className="container-max">
          <FadeRise className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {pillars.map((p) => (
              <div key={p.title} className="flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 rounded-full bg-teal/10 flex items-center justify-center">
                  {p.icon}
                </div>
                <h3 className="font-display text-headline-sm text-ink">{p.title}</h3>
                <p className="font-body text-body-md text-body">{p.body}</p>
              </div>
            ))}
          </FadeRise>
        </div>
      </section>

      {/* ── Construction Draw ── */}
      <section className="bg-dark-bg py-20 lg:py-28 overflow-hidden" aria-label="Our construction process">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* SVG structural frame */}
            <FadeRiseItem>
              <ConstructionDraw className="w-full max-w-lg mx-auto text-teal opacity-90" />
            </FadeRiseItem>

            {/* Text */}
            <div>
              <FadeRiseItem>
                <span className="font-body text-label-md text-teal uppercase tracking-widest block mb-4">
                  How We Build
                </span>
                <h2 className="font-display text-headline-lg text-white leading-snug mb-6">
                  Every structure starts with a precise drawing.
                </h2>
              </FadeRiseItem>
              <FadeRiseItem delay={0.1}>
                <div className="space-y-4 font-body text-body-lg text-white/60 leading-relaxed mb-8">
                  <p>
                    From foundation to roof, each phase of an EPC project follows a
                    carefully engineered sequence — structural steel, floor slabs, bracing
                    systems and crane logistics planned before a single bolt is tightened.
                  </p>
                  <p>
                    Our in-house design and execution teams work from the same drawing set,
                    eliminating the coordination gaps that delay lesser contractors.
                  </p>
                </div>
              </FadeRiseItem>
              <FadeRiseItem delay={0.15}>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { phase: '01', title: 'Design & Plan' },
                    { phase: '02', title: 'Fabricate & Build' },
                    { phase: '03', title: 'Commission' },
                  ].map((step) => (
                    <div key={step.phase} className="border border-teal/20 rounded-card p-4 hover:border-teal/50 transition-colors">
                      <div className="font-body text-teal text-[10px] uppercase tracking-widest mb-1">{step.phase}</div>
                      <div className="font-display text-white text-body-md font-semibold">{step.title}</div>
                    </div>
                  ))}
                </div>
              </FadeRiseItem>
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Projects ── */}
      <section className="section-pad bg-white" aria-label="Featured projects">
        <div className="container-max">
          <div className="flex items-end justify-between mb-12">
            <SectionHeading title="Featured Projects" centered={false} className="mb-0" />
            <Link href="/projects" className="hidden sm:flex items-center gap-2 font-body text-label-md text-teal uppercase tracking-wider hover:gap-3 transition-all">
              See all projects
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <FadeRise className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredProjects.map((project, i) => (
              <ProjectCard key={project.slug} project={project} priority={i === 0} featured={i === 0} />
            ))}
          </FadeRise>

          <div className="mt-8 text-center sm:hidden">
            <Link href="/projects" className="btn-ghost text-sm">
              See all projects
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats Band — rising floors ── */}
      <section className="bg-teal text-white py-20 overflow-hidden" aria-label="Key statistics">
        <div className="container-max">
          <SectionHeading
            title="Our Track Record"
            subtitle="Numbers that have been earned on site — not in a brochure."
            className="[&_h2]:text-white [&_p]:text-white/70 mb-14"
          />
          <RisingFloors stats={floorStats} />
        </div>
      </section>

      {/* ── Desk of Directors ── */}
      <section className="section-pad bg-footer" aria-label="Message from the Director">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Director photo */}
            <RevealImage
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=900&auto=format&fit=crop"
              alt="Director of BD Buildcon LLP"
              fill
              wrapperClassName="aspect-[3/4] rounded-card overflow-hidden"
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 50vw"
              parallax
            />

            {/* Message */}
            <div>
              <FadeRiseItem>
                <span className="font-body text-label-md text-teal uppercase tracking-widest block mb-4">
                  Desk of Directors
                </span>
                <div className="text-[72px] leading-none text-teal/20 font-display select-none mb-2" aria-hidden="true">
                  &ldquo;
                </div>
                <blockquote className="font-display text-headline-sm text-white leading-snug mb-6">
                  Every project we undertake must be delivered safely, on time, and to the highest quality standards.
                  There are no shortcuts when people&apos;s lives and industrial operations depend on what we build.
                </blockquote>
                <p className="font-body text-body-lg text-white/55 leading-relaxed mb-8">
                  Over 35 years, we have grown from a regional civil contractor into a full-service turnkey EPC
                  partner recognised across Gujarat and beyond — earned project by project through transparent
                  communication, technical depth and the resilience to deliver under pressure.
                </p>
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-px w-10 bg-teal shrink-0" aria-hidden="true" />
                  <div>
                    <p className="font-display font-bold text-white text-body-lg">Director</p>
                    <p className="font-body text-body-md text-white/45">BD Buildcon LLP · Est. 1995</p>
                  </div>
                </div>
                <Link href="/about/directors" className="btn-ghost-white text-sm">
                  Read the full message
                </Link>
              </FadeRiseItem>
            </div>
          </div>
        </div>
      </section>

      {/* ── Safety Band ── */}
      <section className="relative overflow-hidden bg-footer py-20 lg:py-28" aria-label="Safety commitment">
        <Image
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop"
          alt="Workers in high-visibility gear on an industrial construction site"
          fill
          className="object-cover opacity-20"
          sizes="100vw"
        />
        <div className="relative z-10 container-max text-center">
          <FadeRiseItem>
            <h2 className="font-display text-headline-lg text-white mb-4">
              A zero-accident standard.
            </h2>
          </FadeRiseItem>
          <FadeRiseItem delay={0.1}>
            <p className="font-body text-body-lg text-white/70 max-w-2xl mx-auto mb-8">
              &ldquo;Safety is not a department — it's the culture we build every morning before the first concrete is poured.&rdquo;
            </p>
          </FadeRiseItem>
          <FadeRiseItem delay={0.2}>
            <Link href="/why-us" className="btn-ghost-white text-sm">
              Our safety approach
            </Link>
          </FadeRiseItem>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="section-pad bg-surface" aria-label="Client testimonials">
        <div className="container-max">
          <SectionHeading
            title="What Our Clients Say"
            subtitle="Trusted by leading names across chemical, pharma, petroleum and industrial sectors."
          />
          <FadeRise className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.slice(0, 3).map((t) => (
              <TestimonialCard key={t.id} testimonial={t} />
            ))}
          </FadeRise>
        </div>
      </section>

      {/* ── Clients Logo Grid ── */}
      <section className="section-pad bg-white border-y border-hairline" aria-label="Our clients">
        <div className="container-max">
          <SectionHeading title="Trusted By" subtitle="Industry leaders who partner with BD Buildcon for mission-critical construction." />
          <FadeRise className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {clients.map((client) => (
              <div
                key={client.id}
                className="flex flex-col items-center justify-center p-6 rounded-card border border-hairline bg-surface hover:border-teal/30 hover:bg-teal/5 transition-all duration-300 text-center gap-2"
              >
                <div className="w-12 h-12 rounded-full bg-teal/10 flex items-center justify-center">
                  <span className="font-display font-bold text-teal text-sm">
                    {client.name.slice(0, 2).toUpperCase()}
                  </span>
                </div>
                <span className="font-body text-body-md text-ink font-semibold leading-tight">{client.name}</span>
                <span className="font-body text-xs text-body">{client.sector}</span>
              </div>
            ))}
          </FadeRise>
        </div>
      </section>

      {/* ── Home Enquiry Form ── */}
      <section className="section-pad bg-surface" id="enquiry" aria-label="Quick enquiry form">
        <div className="container-max">
          <SectionHeading
            title="Start a Conversation"
            subtitle="Tell us about your project — we respond within one business day."
          />
          <div className="max-w-2xl mx-auto">
            <HomeEnquiryForm />
          </div>
        </div>
      </section>

      <CTABand />
    </>
  )
}

function HomeEnquiryForm() {
  return (
    <form
      action="/api/contact"
      method="POST"
      className="bg-white rounded-card border border-hairline shadow-card p-8 space-y-5"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="hq-name" className="block font-body text-label-md text-ink mb-2 uppercase tracking-wider">
            Name <span className="text-brand-red">*</span>
          </label>
          <input id="hq-name" name="name" type="text" required placeholder="Your full name" className="form-field" />
        </div>
        <div>
          <label htmlFor="hq-company" className="block font-body text-label-md text-ink mb-2 uppercase tracking-wider">
            Company
          </label>
          <input id="hq-company" name="company" type="text" placeholder="Your company name" className="form-field" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="hq-sector" className="block font-body text-label-md text-ink mb-2 uppercase tracking-wider">
            Sector
          </label>
          <select id="hq-sector" name="sector" className="form-field">
            <option value="">Select sector</option>
            {['Chemical', 'Pharma', 'Petroleum', 'Fertiliser', 'Glass', 'Tyre', 'Food', 'Residential', 'Other'].map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="hq-type" className="block font-body text-label-md text-ink mb-2 uppercase tracking-wider">
            Project Type
          </label>
          <select id="hq-type" name="projectType" className="form-field">
            <option value="">Select type</option>
            {['Greenfield Plant', 'Plant Expansion', 'PEB Structure', 'Piping & Mechanical', 'Civil Works', 'Roads & Earthwork', 'Other'].map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="hq-message" className="block font-body text-label-md text-ink mb-2 uppercase tracking-wider">
          Message
        </label>
        <textarea id="hq-message" name="message" rows={4} placeholder="Brief project description..." className="form-field" />
      </div>
      <button type="submit" className="btn-primary w-full sm:w-auto">
        Send Enquiry
      </button>
    </form>
  )
}
