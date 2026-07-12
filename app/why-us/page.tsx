import type { Metadata } from 'next'
import { PageTitleBand } from '@/components/layout/PageTitleBand'
import { CTABand } from '@/components/layout/CTABand'
import { PhotoStackGallery } from '@/components/ui/PhotoStackGallery'
import { testimonials } from '@/content/testimonials'
import { statsDisplay } from '@/content/company'

export const metadata: Metadata = {
  title: 'Why Us — BD Buildcon LLP',
  description:
    'Experience and expertise across diverse sectors — industrial, commercial, residential, and infrastructure.',
}

const reasons = [
  {
    num: '01',
    title: 'Custom Solutions',
    body: 'Tailored services to meet specific client requirements, ensuring flexibility at every stage of the project.',
  },
  {
    num: '02',
    title: 'Innovation & Technology',
    body: 'Use of the latest construction technology — BIM (Building Information Modelling), ERP systems, and digital project management tools — for precision, efficiency, and timely execution.',
  },
  {
    num: '03',
    title: 'On-Time Delivery',
    body: 'A proven track record of meeting project timelines without compromising on quality.',
  },
  {
    num: '04',
    title: 'Cost Efficiency',
    body: 'Value-engineered solutions for specific clients, ensuring cost-effective durability.',
  },
  {
    num: '05',
    title: 'Safety & Compliance',
    body: 'Adherence to stringent safety protocols, ISO certifications, and all statutory and environmental compliance.',
  },
]

const compareRows = [
  { label: 'Safety record', us: '35-year zero-accident journey', them: 'Incidents tolerated as "normal"' },
  { label: 'Schedule reliability', us: 'Deadline is contractual', them: 'Slippage passed to client' },
  { label: 'Scope coverage', us: 'Turnkey EPC in-house', them: 'Layers of subcontractors' },
  { label: 'Equipment', us: 'Owned fleet & testing lab', them: 'Rented, availability risk' },
  { label: 'Quality systems', us: 'ISO 9001:2015 certified', them: 'Informal QA' },
]

const featuredTestimonials = testimonials.slice(0, 6)

const machineryPhotos = [
  '/brochurephotos/plant and machinery/image17.webp',
  '/brochurephotos/plant and machinery/image44.webp',
  '/brochurephotos/plant and machinery/image45.webp',
  '/brochurephotos/plant and machinery/image46.webp',
  '/brochurephotos/plant and machinery/image48.webp',
  '/brochurephotos/plant and machinery/image6.webp',
  '/brochurephotos/plant and machinery/DocScanner Sep 9, 2025 5-45 PM_1(106).webp',
  '/brochurephotos/plant and machinery/DocScanner Sep 9, 2025 5-45 PM_1(125).webp',
  '/brochurephotos/plant and machinery/DocScanner Sep 9, 2025 5-45 PM_1(126).webp',
  '/brochurephotos/plant and machinery/DocScanner Sep 9, 2025 5-45 PM_1(155).webp',
  '/brochurephotos/plant and machinery/IMG-20150407-WA0003.webp',
  '/brochurephotos/plant and machinery/WhatsApp Image 2026-07-12 at 12.44.00 PM (1).webp',
  '/brochurephotos/plant and machinery/WhatsApp Image 2026-07-12 at 12.44.00 PM (2).webp',
  '/brochurephotos/plant and machinery/WhatsApp Image 2026-07-12 at 12.44.00 PM (3).webp',
  '/brochurephotos/plant and machinery/WhatsApp Image 2026-07-12 at 12.44.00 PM.webp',
  '/brochurephotos/plant and machinery/WhatsApp Image 2026-07-12 at 12.58.08 PM.webp',
]

export default function WhyUsPage() {
  return (
    <>
      <PageTitleBand
        title="Why BD Buildcon"
        breadcrumbs={[{ label: 'Why Us' }]}
        description="Experience and expertise across diverse sectors — industrial, commercial, residential, and infrastructure."
      />

      {/* ── Competitive Edge ── */}
      <section aria-label="Competitive Edge" className="py-[96px] bg-white">
        <div className="max-w-container mx-auto px-gutter">
          <div className="text-center mb-[56px]">
            <h2 className="font-display font-bold text-[42px] tracking-[-0.01em] text-ink mb-[16px]">
              Our Competitive Edge
            </h2>
            <div className="w-[56px] h-[3px] bg-teal rounded-full mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px]">
            {reasons.map((r, i) => (
              <div
                key={i}
                className="border border-hairline rounded-card p-[32px] flex flex-col gap-[14px] transition-all duration-200 hover:border-teal/40 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
              >
                <span className="font-display font-[800] text-[15px] text-teal tracking-[0.08em]">{r.num}</span>
                <h3 className="font-display font-bold text-[20px] text-ink m-0">{r.title}</h3>
                <p className="text-[15px] leading-[1.65] text-body m-0">{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Comparison ── */}
      <section aria-label="Comparison" className="bg-dark-bg py-[96px]">
        <div className="max-w-[980px] mx-auto px-gutter">
          <div className="text-center mb-[56px]">
            <h2 className="font-display font-bold text-[42px] tracking-[-0.01em] text-white mb-[16px]">
              The BD Buildcon Standard
            </h2>
            <div className="w-[56px] h-[3px] bg-teal rounded-full mx-auto" />
          </div>

          <div className="flex flex-col gap-[2px] rounded-card overflow-hidden">
            <div className="grid grid-cols-[1.4fr_1fr_1fr] bg-white/5 p-[16px_28px]">
              <span className="text-[12px] font-semibold uppercase tracking-[0.1em] text-white/50">Criteria</span>
              <span className="text-[12px] font-semibold uppercase tracking-[0.1em] text-[#5BD6E2]">BD Buildcon</span>
              <span className="text-[12px] font-semibold uppercase tracking-[0.1em] text-white/50">
                Typical Contractor
              </span>
            </div>

            {compareRows.map((row, i) => (
              <div key={i} className="grid grid-cols-[1.4fr_1fr_1fr] bg-white/[0.03] p-[18px_28px] items-center">
                <span className="text-[15px] font-semibold text-white">{row.label}</span>
                <span className="text-[14.5px] text-[#5BD6E2]">{row.us}</span>
                <span className="text-[14.5px] text-white/50">{row.them}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Plant & Machinery ── */}
      <section aria-label="Plant and Machinery" className="bg-white py-[96px]">
        <div className="max-w-container mx-auto px-gutter grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-[72px] items-center">
          <div>
            <span className="block text-[13px] font-semibold uppercase tracking-[0.12em] text-teal mb-[16px]">
              Plant &amp; Machinery
            </span>
            <h2 className="font-display font-bold text-[38px] leading-[1.25] tracking-[-0.01em] text-ink mb-[24px]">
              {statsDisplay.machinesOwned} owned machines. Zero rental dependency.
            </h2>
            <p className="text-[17px] leading-[1.75] text-body mb-[16px]">
              We believe that investing in the latest technology and modern construction equipment is key to delivering
              superior productivity, precision, and project efficiency. Our modern and diverse fleet includes an RMC
              plant, a boom placer, excavators, vibratory rollers, transit mixers, and much more.
            </p>
            <p className="text-[17px] leading-[1.75] text-body mb-[16px]">
              With {statsDisplay.machinesOwned} owned construction machines and equipment, we maintain complete
              operational control without relying on rented machinery — ensuring higher equipment availability,
              minimizing project delays, and allowing us to respond quickly to changing site requirements.
            </p>
            <p className="text-[17px] leading-[1.75] text-body m-0">
              Regular maintenance and timely equipment upgrades ensure reliable performance, while advanced technology
              and automation help address labour challenges and keep every project on schedule.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-[20px]">
            {[
              { value: statsDisplay.machinesOwned, label: 'Owned Machines & Equipment' },
              { value: 'RMC', label: 'In-House Batching Plants' },
              { value: 'BIM', label: 'Digital Project Management' },
              { value: '24/7', label: 'Equipment Availability' },
            ].map((s, i) => (
              <div key={i} className="border border-hairline rounded-card p-[28px] text-center">
                <div className="font-display font-[800] text-[36px] leading-none text-teal mb-[10px]">{s.value}</div>
                <div className="text-[12.5px] font-semibold uppercase tracking-[0.08em] text-body">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Photo Gallery Stack ── */}
        <div className="max-w-container mx-auto px-gutter mt-[96px] pt-[72px] border-t border-hairline flex flex-col items-center">
          <div className="text-center mb-[48px]">
            <h3 className="font-display font-bold text-[32px] text-ink mb-[12px]">Explore</h3>
            <p className="text-[16px] text-body">Click the stack to view our extensive machinery gallery</p>
          </div>
          <PhotoStackGallery photos={machineryPhotos} />
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section aria-label="Testimonials" className="bg-surface py-[96px]">
        <div className="max-w-container mx-auto px-gutter">
          <div className="text-center mb-[56px]">
            <h2 className="font-display font-bold text-[42px] tracking-[-0.01em] text-ink mb-[16px]">
              What Clients Say
            </h2>
            <div className="w-[56px] h-[3px] bg-teal rounded-full mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px]">
            {featuredTestimonials.map((t) => (
              <figure
                key={t.id}
                className="bg-white border border-hairline rounded-card p-[32px] m-0 flex flex-col gap-[20px]"
              >
                <svg
                  width="28"
                  height="20"
                  viewBox="0 0 28 20"
                  fill="#16A8B8"
                  className="opacity-[0.35]"
                  aria-hidden="true"
                >
                  <path d="M0 20V12.4C0 5.9 3.6 1.6 10 0l1.6 3.2C7.4 4.6 5.4 7 5.2 10H11v10H0zm17 0V12.4C17 5.9 20.6 1.6 27 0l1 3.2c-4.2 1.4-6.2 3.8-6.4 6.8H27v10H17z" />
                </svg>
                <blockquote className="text-[15.5px] leading-[1.7] text-body m-0 flex-1">{t.quote}</blockquote>
                <figcaption>
                  <p className="font-display font-bold text-[15px] text-ink m-0">{t.name}</p>
                  <p className="text-[13px] text-body mt-[3px] mb-0">{t.companyShort}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </>
  )
}
