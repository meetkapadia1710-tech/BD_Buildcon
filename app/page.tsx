'use client'

import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useState } from 'react'

const BuildingScroll = dynamic(() => import('@/components/motion/BuildingScroll').then((mod) => mod.BuildingScroll), {
  ssr: false,
})
import { CTABand } from '@/components/layout/CTABand'
import { CustomSelect } from '@/components/ui/CustomSelect'
import { clients } from '@/content/clients'
import { stats, statsDisplay } from '@/content/company'
import { services } from '@/content/services'

const sectors = [
  'Chemicals',
  'Pharma',
  'Petroleum',
  'Fertiliser',
  'Glass',
  'Tyre',
  'Food Processing',
  'Industrial Gases',
  'Insulation',
  'Adhesives',
  'Natural Fibres',
  'Infrastructure',
  'Residential',
]

const pillars = [
  {
    icon: (
      <svg
        className="w-7 h-7 text-teal"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
    title: 'Zero Accidents',
    body: 'Safety is engineered into every protocol, every day on site.',
  },
  {
    icon: (
      <svg
        className="w-7 h-7 text-teal"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M12 2a10 10 0 100 20 10 10 0 000-20z M12 6v6l4 2" />
      </svg>
    ),
    title: 'On-Time Delivery',
    body: 'Predictable timelines backed by rigorous planning and owned plant.',
  },
  {
    icon: (
      <svg
        className="w-7 h-7 text-teal"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M9 3a4 4 0 100 8 4 4 0 000-8z M23 21v-2a4 4 0 00-3-3.87 M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    title: '70% Repeat Clients',
    body: 'More than two-thirds of our clients return — the strongest endorsement.',
  },
  {
    icon: (
      <svg
        className="w-7 h-7 text-teal"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M2 3h20v14H2z M8 21h8 M12 17v4" />
      </svg>
    ),
    title: 'Technology Under One Roof',
    body: 'Owned fleet, testing lab and specialist teams — no third-party dependency.',
  },
]

const trackStats = [
  { value: `${stats.projects}+`, label: 'Projects Completed' },
  { value: `${stats.yearsExperience}+`, label: 'Years Experience' },
  { value: `${stats.accidents}`, label: 'Accidents Recorded' },
  { value: `${stats.repeatClientPct}%`, label: 'Repeat Client Ratio' },
]

export default function HomePage() {
  return (
    <>
      {/* ── Hero ── */}
      <section
        aria-label="Hero"
        className="relative min-h-[620px] flex items-center justify-center overflow-hidden bg-dark-bg"
      >
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070&auto=format&fit=crop"
            alt="Industrial plant construction site at twilight"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f14179e] via-[#0f14178c] to-[#0f1417bf]" />

        <div className="relative z-10 text-center px-6 py-[96px] max-w-[960px] mx-auto">
          <div className="inline-flex items-center gap-[10px] bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-[18px] py-[8px] text-white/80 font-semibold text-[12px] uppercase tracking-[0.1em] mb-[32px]">
            <span className="w-[7px] h-[7px] bg-teal rounded-full" />
            ISO 9001:2015 Certified · CRISIL SME 3 Rated
          </div>

          <h1 className="font-display font-[800] text-[60px] leading-[1.06] tracking-[-0.02em] text-white mb-[28px]">
            All our projects, completed
            <br />
            on deadline — <span className="text-[#5BD6E2]">with zero accidents.</span>
          </h1>

          <p className="text-[18px] leading-[1.7] text-white/70 max-w-[620px] mx-auto mb-[40px]">
            {statsDisplay.yearsExperience} years · ISO 9001:2015 · CRISIL SME 3 · {statsDisplay.valueDelivered}{' '}
            delivered
          </p>

          <div className="flex gap-[16px] justify-center">
            <Link
              href="/contact"
              className="bg-teal text-white text-[13px] font-semibold uppercase tracking-[0.1em] px-[32px] py-[15px] rounded-full transition-all duration-200 hover:bg-[#0E8C9B] hover:shadow-[0_8px_32px_rgba(22,168,184,0.35)]"
            >
              Start your project
            </Link>
            <Link
              href="/projects"
              className="border-[2px] border-white/90 text-white text-[13px] font-semibold uppercase tracking-[0.1em] px-[32px] py-[13px] rounded-full transition-all duration-200 hover:bg-white hover:text-ink"
            >
              See the work
            </Link>
          </div>
        </div>
      </section>

      {/* ── Sector Marquee ── */}
      <section aria-label="Sectors we serve" className="bg-surface border-b border-hairline py-[16px] overflow-hidden">
        <div className="flex w-max animate-marquee">
          <div className="flex">
            {sectors.map((s, i) => (
              <span
                key={i}
                className="flex items-center text-[12.5px] font-semibold uppercase tracking-[0.12em] text-body px-[20px]"
              >
                {s}
                <span className="text-teal text-[16px] ml-[40px]" aria-hidden="true">
                  ·
                </span>
              </span>
            ))}
          </div>
          <div className="flex" aria-hidden="true">
            {sectors.map((s, i) => (
              <span
                key={i}
                className="flex items-center text-[12.5px] font-semibold uppercase tracking-[0.12em] text-body px-[20px]"
              >
                {s}
                <span className="text-teal text-[16px] ml-[40px]" aria-hidden="true">
                  ·
                </span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── What We Build ── */}
      <section aria-label="Services overview" className="py-[96px] bg-white">
        <div className="max-w-container mx-auto px-gutter">
          <div className="text-center mb-[56px]">
            <h2 className="font-display font-bold text-[42px] tracking-[-0.01em] text-ink mb-[16px]">What We Build</h2>
            <div className="w-[56px] h-[3px] bg-teal rounded-full mx-auto mb-[20px]" />
            <p className="text-[18px] leading-[1.7] text-body max-w-[640px] mx-auto">
              Precision engineering and robust construction across specialised industrial disciplines.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px]">
            {services.map((svc) => (
              <Link
                key={svc.id}
                href="/projects"
                className="group relative block aspect-[4/5] overflow-hidden rounded-card bg-dark-bg"
              >
                <Image
                  src={svc.image}
                  alt={svc.title}
                  fill
                  className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <span className="absolute bottom-0 left-0 right-0 p-[24px] block">
                  <span className="block font-display font-bold text-[21px] text-white mb-[6px]">
                    {svc.shortTitle || svc.title}
                  </span>
                  <span className="block text-[14px] leading-[1.5] text-white/70">
                    {svc.description.substring(0, 70)}...
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pillars ── */}
      <section aria-label="Company pillars" className="bg-surface border-y border-hairline py-[80px]">
        <div className="max-w-container mx-auto px-gutter grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[32px]">
          {pillars.map((p, i) => (
            <div key={i} className="flex flex-col items-center text-center gap-[14px]">
              <div className="w-[60px] h-[60px] rounded-full bg-teal/10 flex items-center justify-center text-teal">
                {p.icon}
              </div>
              <h3 className="font-display font-bold text-[19px] text-ink m-0">{p.title}</h3>
              <p className="text-[15px] leading-[1.6] text-body m-0">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── How we build ── */}
      <BuildingScroll />

      {/* ── Stats ── */}
      <section aria-label="Key statistics" className="bg-teal py-[88px]">
        <div className="max-w-container mx-auto px-gutter">
          <div className="text-center mb-[56px]">
            <h2 className="font-display font-bold text-[42px] tracking-[-0.01em] text-white mb-[16px]">
              Our Track Record
            </h2>
            <div className="w-[56px] h-[3px] bg-white/50 rounded-full mx-auto mb-[20px]" />
            <p className="text-[18px] text-white/75 m-0">Numbers that have been earned on site — not in a brochure.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-[32px] text-center">
            {trackStats.map((s, i) => (
              <div key={i}>
                <div className="font-display font-[800] text-[64px] leading-none text-white mb-[12px] font-variant-numeric tabular-nums">
                  {s.value}
                </div>
                <div className="text-[13px] font-semibold uppercase tracking-[0.1em] text-white/75">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Director ── */}
      <section aria-label="Message from the Director" className="bg-white py-[96px]">
        <div className="max-w-container mx-auto px-gutter grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-[72px] items-center">
          <div
            className="relative aspect-[3/4] rounded-card overflow-hidden bg-[#EFF3F4] flex items-center justify-center"
            style={{ backgroundImage: 'repeating-linear-gradient(45deg, #EFF3F4 0 14px, #E6ECEE 14px 28px)' }}
          >
            <span className="font-mono text-[13px] color-body bg-white border border-hairline rounded-[6px] px-[12px] py-[6px]">
              director portrait
            </span>
          </div>
          <div>
            <span className="block text-[13px] font-semibold uppercase tracking-[0.12em] text-teal mb-[20px]">
              Desk of Directors
            </span>
            <blockquote className="font-display font-semibold text-[26px] leading-[1.45] text-ink mb-[24px]">
              &ldquo;Every project we undertake must be delivered safely, on time, and to the highest quality standards.
              There are no shortcuts when people&apos;s lives and industrial operations depend on what we build.&rdquo;
            </blockquote>
            <p className="text-[17px] leading-[1.75] text-body mb-[32px]">
              Over {stats.yearsExperience} years, we have grown from a regional civil contractor into a full-service
              turnkey EPC partner recognised across Gujarat and beyond — earned project by project through transparent
              communication, technical depth and the resilience to deliver under pressure.
            </p>
            <div className="flex items-center gap-[16px] mb-[32px]">
              <span className="w-[40px] h-[2px] bg-teal block" />
              <div>
                <p className="font-display font-bold text-[17px] text-ink m-0">Kiran Majmudar</p>
                <p className="text-[14px] text-body mt-[2px] mb-0">Director, BD Buildcon LLP · Est. 1995</p>
              </div>
            </div>
            <Link
              href="/about"
              className="inline-block border-[2px] border-teal text-teal text-[13px] font-semibold uppercase tracking-[0.1em] px-[30px] py-[13px] rounded-full transition-colors duration-200 hover:bg-teal hover:text-white"
            >
              About BD Buildcon
            </Link>
          </div>
        </div>
      </section>

      {/* ── Trusted By ── */}
      <section aria-label="Our clients" className="bg-surface border-top border-hairline py-[96px]">
        <div className="max-w-container mx-auto px-gutter">
          <div className="text-center mb-[56px]">
            <h2 className="font-display font-bold text-[42px] tracking-[-0.01em] text-ink mb-[16px]">Trusted By</h2>
            <div className="w-[56px] h-[3px] bg-teal rounded-full mx-auto mb-[20px]" />
            <p className="text-[18px] text-body m-0">
              Industry leaders who partner with BD Buildcon for mission-critical construction.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-[20px]">
            {clients.slice(0, 16).map((c, i) => (
              <div
                key={i}
                className="bg-white border border-hairline rounded-card p-[24px] flex flex-col items-center justify-center gap-[6px] min-h-[104px] text-center transition-all duration-200 hover:border-teal/40 hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
              >
                <span className="font-display font-bold text-[16px] text-ink">{c.name}</span>
                <span className="text-[12px] text-body">{c.sector}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Enquiry form ── */}
      <section aria-label="Quick enquiry form" className="bg-white py-[96px]">
        <div className="max-w-[720px] mx-auto px-gutter">
          <div className="text-center mb-[48px]">
            <h2 className="font-display font-bold text-[42px] tracking-[-0.01em] text-ink mb-[16px]">
              Start a Conversation
            </h2>
            <div className="w-[56px] h-[3px] bg-teal rounded-full mx-auto mb-[20px]" />
            <p className="text-[18px] text-body m-0">
              Tell us about your project — we respond within one business day.
            </p>
          </div>

          <HomeEnquiryForm />
        </div>
      </section>

      {/* ── CTA band ── */}
      <CTABand />
    </>
  )
}

function HomeEnquiryForm() {
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSending(true)
    setSent(false)
    setTimeout(() => {
      setSending(false)
      setSent(true)
      ;(e.target as HTMLFormElement).reset()
    }, 800)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-hairline rounded-card shadow-[0_1px_4px_rgba(0,0,0,0.06),0_4px_16px_rgba(0,0,0,0.06)] p-[32px] flex flex-col gap-[20px]"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-[20px]">
        <div>
          <label
            htmlFor="hq-name"
            className="block text-[12px] font-semibold uppercase tracking-[0.08em] text-ink mb-[8px]"
          >
            Name <span className="text-error">*</span>
          </label>
          <input
            id="hq-name"
            name="name"
            type="text"
            required
            placeholder="Your full name"
            className="w-full bg-surface border border-hairline rounded-[8px] px-[16px] py-[12px] font-body text-[15px] text-ink focus:border-teal focus:shadow-[0_0_0_3px_rgba(22,168,184,0.12)] focus:outline-none"
          />
        </div>
        <div>
          <label
            htmlFor="hq-email"
            className="block text-[12px] font-semibold uppercase tracking-[0.08em] text-ink mb-[8px]"
          >
            Email <span className="text-error">*</span>
          </label>
          <input
            id="hq-email"
            name="email"
            type="email"
            required
            placeholder="your.email@example.com"
            className="w-full bg-surface border border-hairline rounded-[8px] px-[16px] py-[12px] font-body text-[15px] text-ink focus:border-teal focus:shadow-[0_0_0_3px_rgba(22,168,184,0.12)] focus:outline-none"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-[20px]">
        <div>
          <label
            htmlFor="hq-company"
            className="block text-[12px] font-semibold uppercase tracking-[0.08em] text-ink mb-[8px]"
          >
            Company
          </label>
          <input
            id="hq-company"
            name="company"
            type="text"
            placeholder="Your company name"
            className="w-full bg-surface border border-hairline rounded-[8px] px-[16px] py-[12px] font-body text-[15px] text-ink focus:border-teal focus:shadow-[0_0_0_3px_rgba(22,168,184,0.12)] focus:outline-none"
          />
        </div>
        <div>
          <label
            htmlFor="hq-phone"
            className="block text-[12px] font-semibold uppercase tracking-[0.08em] text-ink mb-[8px]"
          >
            Phone
          </label>
          <input
            id="hq-phone"
            name="phone"
            type="tel"
            placeholder="+91 XXX XXX XXXX"
            className="w-full bg-surface border border-hairline rounded-[8px] px-[16px] py-[12px] font-body text-[15px] text-ink focus:border-teal focus:shadow-[0_0_0_3px_rgba(22,168,184,0.12)] focus:outline-none"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-[20px]">
        <div>
          <label
            htmlFor="hq-sector"
            className="block text-[12px] font-semibold uppercase tracking-[0.08em] text-ink mb-[8px]"
          >
            Sector
          </label>
          <select
            id="hq-sector"
            name="sector"
            className="w-full bg-surface border border-hairline rounded-[8px] px-[16px] py-[12px] font-body text-[15px] text-ink appearance-auto focus:border-teal focus:shadow-[0_0_0_3px_rgba(22,168,184,0.12)] focus:outline-none"
          >
            <option>Select sector</option>
            <option>Chemicals</option>
            <option>Pharma</option>
            <option>Petroleum</option>
            <option>Fertiliser</option>
            <option>Glass</option>
            <option>Tyre</option>
            <option>Food Processing</option>
            <option>Residential</option>
            <option>Other</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="hq-type"
            className="block text-[12px] font-semibold uppercase tracking-[0.08em] text-ink mb-[8px]"
          >
            Project Type
          </label>
          <select
            id="hq-type"
            name="projectType"
            className="w-full bg-surface border border-hairline rounded-[8px] px-[16px] py-[12px] font-body text-[15px] text-ink appearance-auto focus:border-teal focus:shadow-[0_0_0_3px_rgba(22,168,184,0.12)] focus:outline-none"
          >
            <option>Select type</option>
            <option>Greenfield Plant</option>
            <option>Plant Expansion</option>
            <option>PEB Structure</option>
            <option>Piping &amp; Mechanical</option>
            <option>Civil Works</option>
            <option>Roads &amp; Earthwork</option>
            <option>Other</option>
          </select>
        </div>
      </div>
      <div>
        <label
          htmlFor="hq-message"
          className="block text-[12px] font-semibold uppercase tracking-[0.08em] text-ink mb-[8px]"
        >
          Message <span className="text-error">*</span>
        </label>
        <textarea
          id="hq-message"
          name="message"
          rows={4}
          required
          placeholder="Brief project description..."
          className="w-full bg-surface border border-hairline rounded-[8px] px-[16px] py-[12px] font-body text-[15px] text-ink resize-y focus:border-teal focus:shadow-[0_0_0_3px_rgba(22,168,184,0.12)] focus:outline-none"
        ></textarea>
      </div>
      <div className="flex items-center gap-[16px]">
        <button
          type="submit"
          disabled={sending}
          className="bg-teal text-white border-none cursor-pointer font-body text-[13px] font-semibold uppercase tracking-[0.1em] px-[36px] py-[15px] rounded-full transition-colors duration-200 hover:bg-[#0E8C9B] disabled:opacity-70"
        >
          {sending ? 'Sending...' : 'Send Enquiry'}
        </button>
        {sent && (
          <span className="text-[14px] text-success font-medium">
            ✓ Enquiry sent — we&apos;ll get back to you shortly.
          </span>
        )}
      </div>
    </form>
  )
}
