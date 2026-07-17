import type { Metadata } from 'next'
import { PageTitleBand } from '@/components/layout/PageTitleBand'
import { StaggerReveal } from '@/components/motion/StaggerReveal'
import { SlideIn } from '@/components/motion/SlideIn'

export const metadata: Metadata = {
  title: 'Employee Area — BD Buildcon LLP',
  description: 'Internal tools for BD Buildcon team members. Access requires company credentials.',
}

const portals = [
  {
    title: 'ERP System',
    body: 'Project management, procurement, timesheets and site reporting for all active projects.',
    href: 'http://bhumi.novasoftwares.com/',
    icon: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M3 3h18v18H3z"></path>
        <path d="M3 9h18"></path>
        <path d="M9 21V9"></path>
      </svg>
    ),
  },
  {
    title: 'Company Email',
    body: 'Web access to your BD Buildcon mailbox from any device.',
    href: 'https://mail.yandex.ru/',
    icon: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
        <path d="M22 6l-10 7L2 6"></path>
      </svg>
    ),
  },
]

export default function EmployeeAreaPage() {
  return (
    <>
      <PageTitleBand
        title="Employee Area"
        breadcrumbs={[{ label: 'Employee Area' }]}
        description="Internal tools for BD Buildcon team members. Access requires company credentials."
      />

      <section aria-label="Portals" className="bg-white py-[96px]">
        <div className="max-w-[980px] mx-auto px-gutter">
          <StaggerReveal className="grid grid-cols-1 sm:grid-cols-2 gap-[24px]" stagger={0.1}>
            {portals.map((p, i) => (
              <a
                key={i}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-hairline rounded-card p-[40px] flex flex-col gap-[16px] transition-all duration-300 hover:border-teal/50 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.1)] group"
              >
                <span className="w-[56px] h-[56px] rounded-[12px] bg-teal/10 flex items-center justify-center text-teal transition-colors duration-300 group-hover:bg-teal group-hover:text-white">
                  {p.icon}
                </span>
                <span className="font-display font-bold text-[22px] text-ink m-0">{p.title}</span>
                <span className="text-[15px] leading-[1.65] text-body flex-1">{p.body}</span>
                <span className="inline-flex items-center gap-[8px] text-[13px] font-semibold uppercase tracking-[0.08em] text-teal mt-[8px]">
                  Open portal
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                    className="transition-transform group-hover:translate-x-1"
                  >
                    <path d="M7 17L17 7M7 7h10v10"></path>
                  </svg>
                </span>
              </a>
            ))}
          </StaggerReveal>

          <SlideIn from="bottom" delay={0.2}>
            <div className="mt-[40px] bg-surface border border-hairline rounded-card px-[28px] py-[24px] flex gap-[14px] items-start">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-body shrink-0 mt-[2px]"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 16v-4M12 8h.01"></path>
              </svg>
              <p className="text-[14.5px] leading-[1.65] text-body m-0">
                These portals are for authorised BD Buildcon personnel only. If you have trouble signing in, contact the
                IT desk at{' '}
                <a
                  href="mailto:info@bdbuildcon.com"
                  className="text-teal font-semibold hover:text-teal/80 transition-colors"
                >
                  info@bdbuildcon.com
                </a>
                .
              </p>
            </div>
          </SlideIn>
        </div>
      </section>
    </>
  )
}
