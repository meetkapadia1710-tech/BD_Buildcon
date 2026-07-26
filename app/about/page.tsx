import type { Metadata } from 'next'
import { PageTitleBand } from '@/components/layout/PageTitleBand'
import { CTABand } from '@/components/layout/CTABand'
import { RevealImage } from '@/components/motion/RevealImage'
import { SlideIn } from '@/components/motion/SlideIn'
import { StaggerReveal } from '@/components/motion/StaggerReveal'
import { CraneArtifact, SurveyMark, DimensionLines } from '@/components/ui/BlueprintArtifacts'
import { faqs } from '@/content/faqs'
import { FAQSection } from '@/components/ui/FAQSection'
import { breadcrumbJsonLd, faqJsonLd } from '@/lib/jsonld'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'About BD Buildcon',
  description:
    'Learn about BD Buildcon LLP — a turnkey industrial EPC contractor with 35+ years, ISO 9001:2015 certified, specialised in Civil, Mechanical, PEB, piling and piping.',
  alternates: { canonical: 'https://bdbuildcon.com/about' },
  openGraph: {
    url: 'https://bdbuildcon.com/about',
    title: 'About BD Buildcon LLP',
    description: 'Turnkey industrial EPC contractor since 1995. ISO 9001:2015 certified, 35+ years of delivery.',
  },
}

const milestones = [
  {
    year: '1995',
    title: 'Founded as Bhumi Developers',
    body: 'Civil contracting firm established in Bharuch, Gujarat.',
  },
  {
    year: '2005',
    title: 'Industrial EPC expansion',
    body: 'Entered structural steel, PEB and mechanical works for chemical plants.',
  },
  {
    year: '2015',
    title: 'ISO 9001:2015 certified',
    body: 'Formalised quality management systems across all project execution.',
  },
  {
    year: '2021',
    title: 'BD Buildcon LLP',
    body: 'Reorganised as an LLP; full turnkey EPC capability under one roof.',
  },
]

const peopleCare = [
  {
    title: 'Labour Colony',
    body: 'Our labour force is our biggest asset, and their well-being is our top priority. We provide clean and well-maintained labour colonies with water, electricity, cooking areas, and comfortable accommodation — with play areas for children so families can live in a safe and pleasant environment. A healthy, motivated workforce gives its best every day.',
    image: '/brochurephotos/LABOUR COLONY/IMG-20191012-WA0006.webp',
  },
  {
    title: 'Our Site Team',
    body: 'Our site team is the backbone of every project. Many of our engineers and staff live away from their families to deliver projects on time. To support their commitment, we provide company accommodation with comfortable living, four nutritious meals a day, laundry, housekeeping, and other essential facilities — so the team stays focused, productive, and committed to quality.',
    image: '/brochurephotos/site photos/technical photos/our-site-team.webp',
  },
]

export default function AboutPage() {
  const aboutFaqs = faqs.filter((f) => f.page.includes('about'))

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            breadcrumbJsonLd([{ name: 'About Us', url: 'https://bdbuildcon.com/about' }]),
            faqJsonLd(aboutFaqs),
          ]),
        }}
      />
      <PageTitleBand
        title="About BD Buildcon"
        breadcrumbs={[{ label: 'About Us' }]}
        description="Three decades of turnkey industrial construction — from Bhumi Developers to BD Buildcon LLP."
      />

      {/* ── Story ── */}
      <section aria-label="Our Story" className="relative overflow-hidden pt-[64px] pb-[96px] bg-white">
        {/* Blueprint artifact — CraneArtifact top-right, photo overlaps it */}
        <CraneArtifact className="pointer-events-none absolute -top-6 -right-6 w-[200px] h-auto text-teal/[0.10] hidden lg:block" />
        <div className="relative z-10 max-w-container mx-auto px-gutter grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-[72px] items-center">
          <SlideIn from="left">
            <div>
              <span className="block text-[13px] font-semibold uppercase tracking-[0.12em] text-teal mb-[16px]">
                Our Story
              </span>
              <h2 className="font-display font-bold text-[38px] leading-[1.25] tracking-[-0.01em] text-ink mb-[24px]">
                Built project by project since 1995.
              </h2>
              <p className="text-[17px] leading-[1.75] text-body mb-[16px]">
                BD Buildcon LLP (formerly Bhumi Developers) is an ISO 9001:2015–certified industrial EPC contractor
                headquartered in Bharuch, Gujarat, India, delivering civil engineering, mechanical services, and turnkey
                construction for industrial, chemical, pharmaceutical, and process industries since 1995. With over 35
                years of experience, a 35-year zero-accident record, and a 70% repeat client ratio, we have established
                ourselves as a trusted industrial contractor across Gujarat and India.
              </p>
              <p className="text-[17px] leading-[1.75] text-body mb-[16px]">
                We bring together a team of skilled engineers and professionals with expertise across civil, mechanical,
                structural, PEB (Pre-Engineered Buildings), infrastructure, and other engineering disciplines — a
                diverse knowledge base that enables us to provide comprehensive solutions tailored to each client&apos;s
                unique needs.
              </p>
              <p className="text-[17px] leading-[1.75] text-body m-0">
                As a turnkey contractor, we provide end-to-end services — project planning, procurement, construction,
                and project management — delivering projects within agreed timelines and budgets while maintaining the
                highest standards of quality.
              </p>
            </div>
          </SlideIn>
          <RevealImage
            src="/brochurephotos/site photos/city center/IMG_20200627_125547.webp"
            alt="Construction team reviewing drawings on site"
            fill
            wrapperClassName="relative rounded-card aspect-[4/3]"
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            parallax
          />
        </div>
      </section>

      {/* ── Timeline ── */}
      <section
        aria-label="Milestones"
        className="relative bg-surface border-y border-hairline py-[96px] overflow-hidden"
      >
        {/* Soft backdrop — faint blueprint dot grid + radial teal glow behind the heading */}
        <div className="texture-dots pointer-events-none absolute inset-0 text-teal/[0.06]" aria-hidden="true" />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[320px]"
          style={{
            background: 'radial-gradient(ellipse 55% 60% at 50% 0%, rgba(22,168,184,0.10) 0%, transparent 70%)',
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-container mx-auto px-gutter">
          <SlideIn from="bottom">
            <div className="text-center mb-[56px]">
              <h2 className="font-display font-bold text-[42px] tracking-[-0.01em] text-ink mb-[16px]">Milestones</h2>
              <div className="w-[56px] h-[3px] bg-teal rounded-full mx-auto" />
            </div>
          </SlideIn>

          {/* The timeline itself is the graphic: a connector track with a node above each year */}
          <div className="relative">
            {/* Horizontal track through the node centers — desktop only (cards stack below lg) */}
            <div
              className="pointer-events-none absolute top-[13px] left-[12.5%] right-[12.5%] hidden lg:block h-[2px] rounded-full bg-gradient-to-r from-teal/15 via-teal/45 to-teal/15"
              aria-hidden="true"
            />

            <StaggerReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[20px]" stagger={0.1}>
              {milestones.map((m, i) => (
                <div key={i} className="group flex flex-col">
                  {/* Timeline node — sits on the track, pulses teal on card hover */}
                  <div className="relative hidden lg:flex justify-center mb-[26px]" aria-hidden="true">
                    <span className="relative flex w-[28px] h-[28px] items-center justify-center rounded-full border-2 border-teal/50 bg-surface transition-all duration-300 group-hover:border-teal group-hover:shadow-[0_0_0_6px_rgba(22,168,184,0.12)]">
                      <span className="w-[10px] h-[10px] rounded-full bg-teal transition-transform duration-300 group-hover:scale-125" />
                    </span>
                  </div>

                  <div className="relative flex-1 overflow-hidden bg-white border border-hairline rounded-card p-[28px] flex flex-col gap-[10px] transition-all duration-300 hover:border-teal/40 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(0,0,0,0.10)]">
                    {/* Teal accent bar — grows on hover to highlight the active milestone */}
                    <span className="absolute top-0 left-0 h-[3px] w-[36px] bg-teal rounded-br-full transition-all duration-500 group-hover:w-full" />
                    {/* Giant watermark year behind the content */}
                    <span className="pointer-events-none absolute -right-2 -bottom-6 font-display font-[800] text-[92px] leading-none text-teal/[0.06] select-none">
                      {m.year}
                    </span>
                    <span className="relative font-display font-[800] text-[28px] text-teal">{m.year}</span>
                    <span className="relative font-display font-bold text-[17px] text-ink">{m.title}</span>
                    <span className="relative text-[14.5px] leading-[1.6] text-body">{m.body}</span>
                  </div>
                </div>
              ))}
            </StaggerReveal>
          </div>
        </div>
      </section>

      {/* ── Mission / Vision ── */}
      <section aria-label="Mission and Vision" className="py-[96px] bg-white">
        <div className="max-w-container mx-auto px-gutter grid grid-cols-1 md:grid-cols-2 gap-[24px] items-stretch">
          <SlideIn from="left" className="h-full">
            <div className="relative overflow-hidden bg-dark-bg rounded-card p-[48px] h-full">
              <div className="texture-dots pointer-events-none absolute inset-0 text-white/[0.05]" aria-hidden="true" />
              <span className="relative block text-[13px] font-semibold uppercase tracking-[0.12em] text-[#5BD6E2] mb-[16px]">
                Mission
              </span>
              <p className="relative font-display font-semibold text-[22px] leading-[1.5] text-white m-0">
                To transform complex industrial challenges into successful outcomes through client-focused service,
                uncompromising integrity, zero-compromise safety, engineering excellence, and an unwavering commitment
                to delivering every project successfully.
              </p>
            </div>
          </SlideIn>
          <SlideIn from="right" delay={0.1} className="h-full">
            <div className="relative overflow-hidden bg-teal rounded-card p-[48px] h-full">
              <div className="texture-dots pointer-events-none absolute inset-0 text-white/[0.08]" aria-hidden="true" />
              <span className="relative block text-[13px] font-semibold uppercase tracking-[0.12em] text-white/75 mb-[16px]">
                Vision
              </span>
              <p className="relative font-display font-semibold text-[22px] leading-[1.5] text-white m-0">
                To become a leading industrial turnkey contractor recognized for safe, innovative, and sustainable
                engineering solutions — delivering excellence, timely execution, and lasting client relationships across
                India and beyond.
              </p>
            </div>
          </SlideIn>
        </div>
      </section>

      {/* ── Our Team ── */}
      <section aria-label="Our Team" className="bg-surface border-t border-hairline py-[96px]">
        <div className="max-w-container mx-auto px-gutter grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-[64px] items-center">
          <SlideIn from="left">
            <div>
              <span className="block text-[13px] font-semibold uppercase tracking-[0.12em] text-teal mb-[16px]">
                Our People
              </span>
              <h2 className="font-display font-bold text-[38px] leading-[1.25] tracking-[-0.01em] text-ink mb-[24px]">
                Our Team
              </h2>
              <div className="w-[56px] h-[3px] bg-teal rounded-full mb-[32px]" />
              <p className="text-[17px] leading-[1.75] text-body mb-[16px]">
                The dedicated team at BD Buildcon LLP is the driving force behind our success. With a shared vision and
                unwavering commitment, our team works together like a family, supporting one another&apos;s growth and
                delivering excellence in every aspect of our work. Our long-standing staff members bring valuable
                expertise and experience, ensuring the highest levels of dedication and professional proficiency.
              </p>
              <p className="text-[17px] leading-[1.75] text-body mb-[16px]">
                The BD Buildcon LLP team is a diverse group, ranging in age from 20 to 70 years — bringing together
                fresh perspectives and decades of industry experience. We harness the energy and enthusiasm of our
                younger team members while valuing the wisdom of our senior professionals. This combination of youthful
                ambition and seasoned experience has become one of our greatest strengths.
              </p>
              <p className="text-[17px] leading-[1.75] text-body m-0">
                United by a common purpose of transforming ideas into enduring structures, our professionals approach
                every challenge with determination, precision, and an unwavering commitment to quality — fostering a
                dynamic, balanced workforce that drives innovation, efficiency, and excellence for our clients.
              </p>
            </div>
          </SlideIn>

          {/* Team Photo */}
          <RevealImage
            src="/brochurephotos/general photo/2I2A7705.webp"
            alt="The BD Buildcon Team"
            fill
            wrapperClassName="relative w-full aspect-[16/10] rounded-card shadow-card"
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 60vw"
            parallax
          />
        </div>
      </section>

      {/* ── People & Welfare ── */}
      <section
        aria-label="People and Welfare"
        className="relative overflow-hidden bg-white border-t border-hairline py-[96px]"
      >
        {/* Blueprint artifacts — SurveyMark + DimensionLines on right edge */}
        <SurveyMark className="pointer-events-none absolute top-8 right-8 w-14 h-14 text-teal/[0.12] hidden lg:block" />
        <DimensionLines className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 h-[70%] w-auto text-teal/[0.09] hidden lg:block" />
        <div className="relative z-10 max-w-container mx-auto px-gutter">
          <SlideIn from="bottom">
            <div className="text-center mb-[56px]">
              <h2 className="font-display font-bold text-[42px] tracking-[-0.01em] text-ink mb-[16px]">
                Caring for Our People
              </h2>
              <div className="w-[56px] h-[3px] bg-teal rounded-full mx-auto" />
            </div>
          </SlideIn>
          <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 gap-[24px] max-w-[980px] mx-auto" stagger={0.12}>
            {peopleCare.map((p, i) => (
              <div
                key={i}
                className="bg-surface border border-hairline rounded-card p-[36px] flex flex-col transition-all duration-300 hover:border-teal/40 hover:shadow-[0_12px_28px_rgba(0,0,0,0.08)]"
              >
                {p.image && (
                  <RevealImage
                    src={p.image}
                    alt={p.title}
                    fill
                    wrapperClassName="relative w-full aspect-[4/3] rounded-[8px] mb-[24px]"
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 490px"
                  />
                )}
                <h3 className="font-display font-bold text-[22px] text-ink mb-[14px]">{p.title}</h3>
                <p className="text-[15.5px] leading-[1.7] text-body m-0 flex-grow">{p.body}</p>
              </div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      <FAQSection faqs={aboutFaqs} />

      <CTABand />
    </>
  )
}
