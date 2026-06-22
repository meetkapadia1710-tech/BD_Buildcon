import type { Metadata } from 'next'
import Image from 'next/image'
import { PageTitleBand } from '@/components/layout/PageTitleBand'
import { SectionHeading } from '@/components/layout/SectionHeading'
import { CTABand } from '@/components/layout/CTABand'
import { FadeRise, FadeRiseItem } from '@/components/motion/FadeRise'
import { RevealImage } from '@/components/motion/RevealImage'
import { DataTable } from '@/components/ui/DataTable'
import { CertificationGallery } from '@/components/ui/CertificationGallery'
import { machinery } from '@/content/machinery'
import { equipment } from '@/content/equipment'

export const metadata: Metadata = {
  title: 'About BD Buildcon',
  description: 'Learn about BD Buildcon LLP — a turnkey industrial EPC contractor with 35+ years, ISO 9001:2015 certified, specialised in Civil, Mechanical, PEB, piling and piping.',
}

const bentoCards = [
  {
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
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
      <svg className="w-8 h-8 text-teal" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Zero Accidents',
    body: 'A mishap-free track record across 50+ projects. Safety is a non-negotiable at BD Buildcon.',
    dark: false,
  },
  {
    icon: (
      <svg className="w-8 h-8 text-teal" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
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

export default function AboutPage() {
  return (
    <>
      <PageTitleBand
        title="About BD Buildcon"
        breadcrumbs={[{ label: 'About Us' }]}
      />

      {/* 1. Overview Section */}
      <section id="overview" className="section-pad bg-white pt-16">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Photo gallery */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <RevealImage
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=900&auto=format&fit=crop"
                alt="BD Buildcon on-site construction team reviewing plans at an active industrial site"
                fill
                wrapperClassName="col-span-2 aspect-[16/9] rounded-card overflow-hidden"
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 42vw"
                priority
              />
              <RevealImage
                src="https://images.unsplash.com/photo-1621619856624-42fd193a0661?q=80&w=600&auto=format&fit=crop"
                alt="Engineer inspecting industrial steel structure and pipework"
                fill
                wrapperClassName="aspect-[4/3] rounded-card overflow-hidden"
                className="object-cover"
                delay={0.1}
                sizes="(max-width: 1024px) 50vw, 21vw"
              />
              <RevealImage
                src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=600&auto=format&fit=crop"
                alt="Heavy construction machinery in operation at an industrial greenfield plant"
                fill
                wrapperClassName="aspect-[4/3] rounded-card overflow-hidden"
                className="object-cover"
                delay={0.2}
                sizes="(max-width: 1024px) 50vw, 21vw"
              />
            </div>

            {/* Right: Copy */}
            <div className="lg:col-span-7 lg:pl-6">
              <FadeRiseItem>
                <h2 className="font-display text-headline-md text-teal mb-6">
                  Do it right the first time.
                </h2>
                <p className="font-body text-body-lg text-body mb-5 leading-relaxed">
                  BD Buildcon LLP (formerly Bhumi Developers) is a professional turnkey EPC and civil
                  construction company with a customer-centric, quality-first approach. Safety-led,
                  mishap-free execution and a track record of timely completion ensure a smooth plant
                  start-up for our clients — every time.
                </p>
                <p className="font-body text-body-md text-body mb-5 leading-relaxed">
                  We have professional human resources commensurate with the required expertise, and
                  state-of-the-art construction quality testing equipment required for successful
                  execution of any project we undertake. We are active in Civil &amp; Structural
                  works, Mechanical erection, PEB structures, piling, piping, roads, earthwork and
                  turnkey industrial construction. ISO 9001:2015 certified and CRISIL SME 3 rated.
                </p>
                <p className="font-body text-body-md text-body leading-relaxed">
                  Since 1995, we have delivered 50+ projects across chemical, pharma, petroleum,
                  fertiliser, glass, tyre, food and infrastructure sectors — for clients including
                  GNFC, GACL, GFL, Tagros, Birla Cellulose, Navin Fluorine, Pidilite, Thermax and
                  more. Over 70% of our clients return for additional projects — a record built
                  project by project, without exception.
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
        </div>
      </section>

      {/* Bento: What sets us apart */}
      <section className="section-pad bg-surface border-t border-hairline pt-20">
        <div className="container-max">
          <SectionHeading title="What Sets Us Apart" subtitle="Engineering excellence driven by safety, technology and genuine repeat partnerships." />
          <FadeRise className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {bentoCards.map((card) => (
              <div
                key={card.title}
                className={`rounded-card p-8 flex flex-col gap-4 transition-transform duration-300 hover:-translate-y-1 ${
                  card.dark
                    ? 'bg-teal text-white'
                    : 'bg-white border border-hairline shadow-card text-ink'
                }`}
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center ${card.dark ? 'bg-white/20' : 'bg-teal/10'}`}>
                  {card.icon}
                </div>
                <h3 className="font-display text-headline-sm">{card.title}</h3>
                <p className={`font-body text-body-md leading-relaxed ${card.dark ? 'text-white/80' : 'text-body'}`}>
                  {card.body}
                </p>
              </div>
            ))}
          </FadeRise>
        </div>
      </section>

      {/* 2. Ideology Section */}
      <section id="ideology" className="section-pad bg-white">
        <div className="container-max max-w-3xl">
          <SectionHeading title="Our Ideology" subtitle="The principles that guide every decision we make on every project." />

          <div className="space-y-8">
            {/* Vision */}
            <FadeRiseItem>
              <div className="flex gap-6 p-8 bg-surface rounded-card border border-hairline">
                <div className="shrink-0 w-16 h-16 rounded-full bg-teal flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M20.188 10.934c.4.586.6 1.307.6 2.066s-.2 1.48-.6 2.066m-16.376 0A6.004 6.004 0 013 12c0-.759.2-1.48.6-2.066M12 4a8 8 0 100 16A8 8 0 0012 4z" />
                  </svg>
                </div>
                <div>
                  <h2 className="font-display text-headline-sm text-teal mb-3 uppercase tracking-wide">Vision</h2>
                  <p className="font-body text-body-lg text-body leading-relaxed">
                    To satisfy clients with a strong, proactive workforce and professional technocrats,
                    producing the highest quality standards in a timely manner while keeping the budget
                    in mind.
                  </p>
                </div>
              </div>
            </FadeRiseItem>

            {/* Mission */}
            <FadeRiseItem delay={0.1}>
              <div className="flex gap-6 p-8 bg-teal text-white rounded-card">
                <div className="shrink-0 w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                  </svg>
                </div>
                <div>
                  <h2 className="font-display text-headline-sm text-white mb-3 uppercase tracking-wide">Mission</h2>
                  <p className="font-body text-body-lg text-white/90 leading-relaxed">
                    To make BD Buildcon (formerly Bhumi Developers) one of the leading construction
                    companies of Western India in customers' choice.
                  </p>
                </div>
              </div>
            </FadeRiseItem>
          </div>
        </div>
      </section>

      {/* Values grid */}
      <section className="section-pad bg-surface border-t border-hairline">
        <div className="container-max">
          <SectionHeading title="Our Core Values" />
          <FadeRise className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {values.map((v, i) => (
              <div
                key={v.title}
                className="card p-8 flex flex-col gap-4"
              >
                <div className="w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center">
                  <span className="font-display font-bold text-teal text-body-md">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="font-display text-headline-sm text-ink">{v.title}</h3>
                <p className="font-body text-body-md text-body leading-relaxed">{v.body}</p>
              </div>
            ))}
          </FadeRise>
        </div>
      </section>

      {/* 3. Certification Section */}
      <section id="certification" className="section-pad bg-white">
        <div className="container-max">
          <SectionHeading
            title="Client Recommendations"
            subtitle="Letters of appreciation received from clients across chemical, petroleum and industrial sectors."
          />
          <CertificationGallery />
        </div>
      </section>

      {/* 4. Infrastructure & Equipment Section */}
      <section id="infrastructure" className="section-pad bg-surface border-t border-hairline">
        <div className="container-max">
          <SectionHeading
            title="Plant, Machinery & Equipment"
            subtitle="Our owned fleet of heavy construction plant and machinery — enabling on-schedule delivery without third-party dependencies."
          />
          
          <div className="space-y-16">
            <div>
              <DataTable data={machinery} caption="Plant and Machinery Inventory" />
            </div>
            
            <div>
              <h3 className="font-display text-headline-sm text-ink mb-6">Equipments and Accessories</h3>
              <DataTable data={equipment} caption="Equipment and Accessories Inventory" />
            </div>
          </div>
        </div>
      </section>

      <CTABand />
    </>
  )
}
