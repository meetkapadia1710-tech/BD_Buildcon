'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { SectionHeading } from '@/components/layout/SectionHeading'
import { FadeRiseItem } from '@/components/motion/FadeRise'
import { SlideIn } from '@/components/motion/SlideIn'
import { StaggerReveal } from '@/components/motion/StaggerReveal'
import { ParallaxLayer } from '@/components/motion/ParallaxLayer'
import { RevealImage } from '@/components/motion/RevealImage'
import { DataTable } from '@/components/ui/DataTable'
import { CertificationGallery } from '@/components/ui/CertificationGallery'
import { machinery } from '@/content/machinery'
import { equipment } from '@/content/equipment'
import { motion, AnimatePresence } from 'framer-motion'

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'ideology', label: 'Ideology & Values' },
  { id: 'certification', label: 'Certifications' },
  { id: 'infrastructure', label: 'Plant & Equipment' },
]

const tabIndex: Record<string, number> = {
  overview: 0,
  ideology: 1,
  certification: 2,
  infrastructure: 3,
}

const bentoCards = [
  {
    icon: (
      <svg
        className="w-8 h-8 text-white"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    title: 'Technology Under One Roof',
    body: 'Owned plant, machinery and in-house testing lab — no third-party dependency on critical path.',
    dark: true,
  },
  {
    icon: (
      <svg
        className="w-8 h-8 text-teal"
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
    body: 'A mishap-free track record across 50+ projects. Safety is a non-negotiable at BD Buildcon.',
    dark: false,
  },
  {
    icon: (
      <svg
        className="w-8 h-8 text-teal"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    title: 'Quality-First Execution',
    body: '"Do it right the first time" — our philosophy ensures rework-free delivery and faster plant start-up.',
    dark: false,
  },
]

const values = [
  {
    title: 'Integrity',
    body: 'Hard work and integrity are instilled in every employee. We hold ourselves to the highest standards in the industry — in our workmanship, our communication and our commitments.',
  },
  {
    title: 'Trust',
    body: 'Trust is the foundation of every client relationship. Our 70% repeat client ratio is the most meaningful proof of the relationships we have built — one project at a time.',
  },
  {
    title: 'Caring',
    body: 'We value the health and safety of our employees, and the well-being of the communities where we work and the environment. This humanitarian mindset drives every decision on site.',
  },
  {
    title: 'Quality First',
    body: '"Do it right the first time" is not a slogan — it is our operating philosophy. ISO 9001:2015 certified processes and in-house testing ensure every deliverable meets specification.',
  },
  {
    title: 'Safety',
    body: 'Safety is our primary focus. Our zero-accident track record across 35+ years and 50+ projects reflects a culture where safety programmes, permit-to-work systems and daily toolbox talks are non-negotiable.',
  },
  {
    title: 'Continuous Improvement',
    body: 'Our service does not end at project handover. We listen to feedback, adopt better methods and invest in our people and machinery — so every project raises the bar for the next.',
  },
]

export default function AboutContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const tabParam = searchParams.get('tab')
  const [active, setActive] = useState(() => (tabParam && tabParam in tabIndex ? tabIndex[tabParam] : 0))

  useEffect(() => {
    const idx = tabParam && tabParam in tabIndex ? tabIndex[tabParam] : 0
    setActive(idx)
  }, [tabParam])

  function handleTabClick(i: number, tabId: string) {
    setActive(i)
    router.replace(`/about?tab=${tabId}`, { scroll: false })
  }

  return (
    <>
      {/* ── Tab navigation ── */}
      <div className="bg-white border-b border-hairline">
        <div className="container-max overflow-x-auto scrollbar-none">
          <div className="flex gap-0 min-w-max">
            {tabs.map((tab, i) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(i, tab.id)}
                className={`relative pb-4 pt-5 px-6 font-body text-[11px] font-semibold uppercase tracking-[0.12em] whitespace-nowrap transition-colors duration-200 ${
                  active === i ? 'text-teal' : 'text-body hover:text-ink'
                }`}
              >
                {tab.label}
                {active === i && (
                  <motion.span
                    layoutId="about-tab-line"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal"
                    transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Tab panels ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          {active === 0 && <OverviewPanel />}
          {active === 1 && <IdeologyPanel />}
          {active === 2 && <CertificationsPanel />}
          {active === 3 && <PlantPanel />}
        </motion.div>
      </AnimatePresence>
    </>
  )
}

/* ─── Overview ─────────────────────────────────────────────── */
function OverviewPanel() {
  return (
    <>
      <section className="section-pad bg-white" aria-label="Company overview">
        <div className="container-max grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Photo grid */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <SlideIn from="bottom">
              <RevealImage
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=900&auto=format&fit=crop"
                alt="BD Buildcon on-site construction team reviewing plans"
                fill
                wrapperClassName="col-span-2 aspect-[16/9] rounded-card overflow-hidden img-hover"
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 42vw"
                priority
              />
            </SlideIn>
            <SlideIn from="bottom" delay={0.1}>
              <ParallaxLayer yRange={10}>
                <RevealImage
                  src="https://images.unsplash.com/photo-1621619856624-42fd193a0661?q=80&w=600&auto=format&fit=crop"
                  alt="Engineer inspecting industrial steel structure"
                  fill
                  wrapperClassName="aspect-[4/3] rounded-card overflow-hidden img-hover"
                  className="object-cover"
                  delay={0.1}
                  sizes="(max-width: 1024px) 50vw, 21vw"
                />
              </ParallaxLayer>
            </SlideIn>
            <SlideIn from="bottom" delay={0.2}>
              <ParallaxLayer yRange={-10}>
                <RevealImage
                  src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=600&auto=format&fit=crop"
                  alt="Heavy construction machinery at an industrial greenfield plant"
                  fill
                  wrapperClassName="aspect-[4/3] rounded-card overflow-hidden img-hover"
                  className="object-cover"
                  delay={0.2}
                  sizes="(max-width: 1024px) 50vw, 21vw"
                />
              </ParallaxLayer>
            </SlideIn>
          </div>

          {/* Copy */}
          <div className="lg:col-span-7 lg:pl-6">
            <FadeRiseItem>
              <h2 className="font-display text-headline-md text-teal mb-6">Do it right the first time.</h2>
              <p className="font-body text-body-lg text-body mb-5 leading-relaxed">
                BD Buildcon LLP (formerly Bhumi Developers) is a professional turnkey EPC and civil construction company
                with a customer-centric, quality-first approach. Safety-led, mishap-free execution and a track record of
                timely completion ensure a smooth plant start-up for our clients — every time.
              </p>
              <p className="font-body text-body-md text-body mb-5 leading-relaxed">
                We have professional human resources commensurate with the required expertise, and state-of-the-art
                construction quality testing equipment required for successful execution of any project we undertake.
                Active in Civil &amp; Structural works, Mechanical erection, PEB structures, piling, piping, roads,
                earthwork and turnkey industrial construction. ISO 9001:2015 certified and CRISIL SME 3 rated.
              </p>
              <p className="font-body text-body-md text-body leading-relaxed">
                Since 1995, we have delivered 50+ projects across chemical, pharma, petroleum, fertiliser, glass, tyre,
                food and infrastructure sectors — for clients including GNFC, GACL, GFL, Tagros, Birla Cellulose, Navin
                Fluorine, Pidilite, Thermax and more. Over 70% return for additional projects — a record built project
                by project.
              </p>
            </FadeRiseItem>

            {/* Mini stats */}
            <FadeRiseItem delay={0.1}>
              <div className="mt-8 flex gap-6 pl-5 border-l-4 border-teal">
                {[
                  { num: '35+', label: 'Years Experience' },
                  { num: '50+', label: 'Projects Delivered' },
                  { num: '70%', label: 'Repeat Clients' },
                ].map((s) => (
                  <div key={s.label}>
                    <span className="block font-display font-bold text-headline-md text-ink">{s.num}</span>
                    <span className="font-body text-label-md text-body uppercase tracking-wider">{s.label}</span>
                  </div>
                ))}
              </div>
            </FadeRiseItem>
          </div>
        </div>
      </section>

      {/* What sets us apart */}
      <section className="section-pad bg-surface border-t border-hairline" aria-label="What sets us apart">
        <div className="container-max">
          <SlideIn from="bottom">
            <SectionHeading
              title="What Sets Us Apart"
              subtitle="Engineering excellence driven by safety, technology and genuine repeat partnerships."
            />
          </SlideIn>
          <StaggerReveal className="grid grid-cols-1 md:grid-cols-3 gap-5" direction="up" stagger={0.1}>
            {bentoCards.map((card) => (
              <div
                key={card.title}
                className={`card p-8 flex flex-col gap-4 ${
                  card.dark ? 'bg-teal text-white border-teal shadow-[0_8px_32px_rgba(22,168,184,0.3)]' : 'bg-white'
                }`}
              >
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center ${card.dark ? 'bg-white/20' : 'bg-teal/10'}`}
                >
                  {card.icon}
                </div>
                <h3 className="font-display text-headline-sm">{card.title}</h3>
                <p className={`font-body text-body-md leading-relaxed ${card.dark ? 'text-white/80' : 'text-body'}`}>
                  {card.body}
                </p>
              </div>
            ))}
          </StaggerReveal>
        </div>
      </section>
    </>
  )
}

/* ─── Ideology & Values ─────────────────────────────────────── */
function IdeologyPanel() {
  return (
    <>
      <section className="section-pad bg-white" aria-label="Vision and mission">
        <div className="container-max">
          <SlideIn from="bottom">
            <SectionHeading
              title="Our Ideology"
              subtitle="The principles that guide every decision we make on every project."
            />
          </SlideIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Vision */}
            <SlideIn from="left">
              <div className="flex gap-5 p-8 bg-surface rounded-card border border-hairline hover:border-teal/30 transition-colors shadow-sm h-full">
                <div className="shrink-0 w-14 h-14 rounded-full bg-teal flex items-center justify-center shadow-lg">
                  <svg
                    className="w-7 h-7 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="3" />
                    <path d="M20.188 10.934c.4.586.6 1.307.6 2.066s-.2 1.48-.6 2.066m-16.376 0A6.004 6.004 0 013 12c0-.759.2-1.48.6-2.066M12 4a8 8 0 100 16A8 8 0 0012 4z" />
                  </svg>
                </div>
                <div>
                  <h2 className="font-display text-headline-sm text-teal mb-3 uppercase tracking-wide">Vision</h2>
                  <p className="font-body text-body-lg text-body leading-relaxed">
                    To satisfy clients with a strong, proactive workforce and professional technocrats, producing the
                    highest quality standards in a timely manner while keeping the budget in mind.
                  </p>
                </div>
              </div>
            </SlideIn>

            {/* Mission */}
            <SlideIn from="right" delay={0.1}>
              <div className="flex gap-5 p-8 bg-teal text-white rounded-card shadow-[0_8px_32px_rgba(22,168,184,0.3)] h-full">
                <div className="shrink-0 w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
                  <svg
                    className="w-7 h-7 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                  </svg>
                </div>
                <div>
                  <h2 className="font-display text-headline-sm text-white mb-3 uppercase tracking-wide">Mission</h2>
                  <p className="font-body text-body-lg text-white/90 leading-relaxed">
                    To make BD Buildcon (formerly Bhumi Developers) one of the leading construction companies of Western
                    India in customers&apos; choice.
                  </p>
                </div>
              </div>
            </SlideIn>
          </div>
        </div>
      </section>

      {/* Values grid */}
      <section className="section-pad bg-surface border-t border-hairline" aria-label="Core values">
        <div className="container-max">
          <SlideIn from="bottom">
            <SectionHeading title="Our Core Values" />
          </SlideIn>
          <StaggerReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" direction="up" stagger={0.1}>
            {values.map((v, i) => (
              <div
                key={v.title}
                className="card bg-white p-8 flex flex-col gap-4 group hover:border-teal/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-teal">
                  <span className="font-display font-bold text-teal text-body-md group-hover:text-white">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="font-display text-headline-sm text-ink">{v.title}</h3>
                <p className="font-body text-body-md text-body leading-relaxed">{v.body}</p>
              </div>
            ))}
          </StaggerReveal>
        </div>
      </section>
    </>
  )
}

/* ─── Certifications ────────────────────────────────────────── */
function CertificationsPanel() {
  return (
    <section className="section-pad bg-white" aria-label="Client recommendations and certifications">
      <div className="container-max">
        <SlideIn from="bottom">
          <SectionHeading
            title="Client Recommendations"
            subtitle="Letters of appreciation received from clients across chemical, petroleum and industrial sectors."
          />
        </SlideIn>
        <CertificationGallery />
      </div>
    </section>
  )
}

/* ─── Plant & Equipment ─────────────────────────────────────── */
function PlantPanel() {
  const [activeTab, setActiveTab] = useState(0)

  const tabs = [
    { label: 'Plant & Machinery', count: 74 },
    { label: 'Equipment & Accessories', count: 51 },
  ]

  return (
    <section className="section-pad bg-surface" aria-label="Plant, machinery and equipment">
      <div className="container-max">
        <SlideIn from="bottom">
          <SectionHeading
            title="Plant, Machinery & Equipment"
            subtitle="Our owned fleet of heavy construction plant and machinery — enabling on-schedule delivery without third-party dependencies."
          />
        </SlideIn>

        {/* Summary stats */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {[
            {
              value: '74+',
              label: 'Plant & Machinery Items',
              icon: (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <rect x="1" y="3" width="15" height="13" rx="1" />
                  <path d="M16 8h4l3 5v3h-7V8z" />
                  <circle cx="5.5" cy="18.5" r="2.5" />
                  <circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
              ),
            },
            {
              value: '50+',
              label: 'Equipment & Accessories',
              icon: (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              ),
            },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-xl border border-hairline p-5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-teal/10 flex items-center justify-center text-teal shrink-0">
                {s.icon}
              </div>
              <div>
                <div className="font-display font-bold text-headline-md text-teal leading-none">{s.value}</div>
                <div className="font-body text-[11px] text-body uppercase tracking-wider mt-1">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Inner tab switcher */}
        <div className="flex gap-0 border-b border-hairline mb-6">
          {tabs.map((t, i) => (
            <button
              key={t.label}
              onClick={() => setActiveTab(i)}
              className={`relative pb-3 pt-1 px-4 font-body text-[12px] font-semibold uppercase tracking-[0.08em] whitespace-nowrap transition-colors duration-200 flex items-center gap-2 ${
                activeTab === i ? 'text-teal' : 'text-body hover:text-ink'
              }`}
            >
              {t.label}
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                  activeTab === i ? 'bg-teal text-white' : 'bg-surface text-body'
                }`}
              >
                {t.count}
              </span>
              {activeTab === i && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal rounded-full" />}
            </button>
          ))}
        </div>

        {/* Tables */}
        {activeTab === 0 && <DataTable data={machinery} caption="Plant and Machinery Inventory" />}
        {activeTab === 1 && <DataTable data={equipment} caption="Equipment and Accessories Inventory" />}
      </div>
    </section>
  )
}
