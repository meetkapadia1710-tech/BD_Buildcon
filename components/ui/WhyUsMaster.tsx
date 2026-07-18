import { SlideIn } from '@/components/motion/SlideIn'
import { StaggerReveal } from '@/components/motion/StaggerReveal'

type Standard = {
  title: string
  us: string
  them: string
  proof: string
  points?: string[]
  icon: React.ReactNode
}

type Props = {
  standards: Standard[]
}

function CheckDot() {
  return (
    <span className="shrink-0 w-[18px] h-[18px] rounded-full bg-teal/10 flex items-center justify-center mt-[2px]">
      <svg
        width="10"
        height="10"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-teal"
        aria-hidden="true"
      >
        <path d="M20 6L9 17l-5-5"></path>
      </svg>
    </span>
  )
}

function DashDot() {
  return (
    <span className="shrink-0 w-[18px] h-[18px] rounded-full bg-ink/5 flex items-center justify-center mt-[2px]">
      <svg
        width="9"
        height="9"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        className="text-body/50"
        aria-hidden="true"
      >
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
    </span>
  )
}

function ProofChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-[6px] bg-teal/10 text-teal text-[12px] font-semibold uppercase tracking-[0.06em] px-[12px] py-[5px] rounded-full whitespace-nowrap">
      <svg
        width="11"
        height="11"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M20 6L9 17l-5-5"></path>
      </svg>
      {children}
    </span>
  )
}

/**
 * "The BD Buildcon Standard" — one deduplicated comparison ledger merging the
 * former Competitive Edge, comparison table, and Workmanship sections.
 */
export function WhyUsMaster({ standards }: Props) {
  return (
    <section
      aria-label="The BD Buildcon Standard"
      className="relative overflow-hidden bg-dark-bg border-y border-white/[0.06] py-[96px]"
    >
      <div className="texture-dots pointer-events-none absolute inset-0 text-teal/[0.06]" aria-hidden="true" />

      <div className="relative max-w-container mx-auto px-gutter">
        {/* Header */}
        <SlideIn from="bottom">
          <div className="text-center mb-[56px]">
            <span className="block text-[13px] font-semibold uppercase tracking-[0.12em] text-teal mb-[16px]">
              Why BD Buildcon
            </span>
            <h2 className="font-display font-bold text-[34px] sm:text-[42px] tracking-[-0.01em] text-white mb-[16px]">
              The BD Buildcon Standard
            </h2>
            <div className="w-[56px] h-[3px] bg-teal rounded-full mx-auto mb-[24px]" />
            <p className="text-[16px] sm:text-[17px] leading-[1.7] text-white/60 max-w-[640px] mx-auto m-0">
              Our edge, our workmanship, and how it compares to a typical contractor — every claim, in one ledger.
            </p>
          </div>
        </SlideIn>

        {/* Ledger */}
        <div className="bg-[#0D1418] rounded-card border border-white/[0.08] shadow-[0_4px_32px_rgba(0,0,0,0.4)] overflow-hidden">
          {/* Column labels — desktop only */}
          <div className="hidden sm:grid grid-cols-[0.9fr_1.5fr_1fr] gap-[24px] bg-white/[0.04] border-b border-white/[0.08] px-[28px] py-[16px]">
            <span className="text-[12px] font-semibold uppercase tracking-[0.1em] text-white/40">Criteria</span>
            <span className="text-[12px] font-semibold uppercase tracking-[0.1em] text-teal">
              The BD Buildcon Standard
            </span>
            <span className="text-[12px] font-semibold uppercase tracking-[0.1em] text-white/40">
              Typical Contractor
            </span>
          </div>

          <StaggerReveal direction="left" stagger={0.07} className="flex flex-col divide-y divide-white/[0.06]">
            {standards.map((s, i) => (
              <div key={i} className="group transition-colors duration-300 hover:bg-teal/[0.06]">
                {/* Desktop / tablet row */}
                <div className="hidden sm:grid grid-cols-[0.9fr_1.5fr_1fr] gap-[24px] px-[28px] py-[26px]">
                  {/* Criteria */}
                  <div className="flex items-start gap-[14px]">
                    <span className="shrink-0 w-[44px] h-[44px] rounded-full bg-teal/10 flex items-center justify-center text-teal transition-colors duration-300 group-hover:bg-teal group-hover:text-white">
                      {s.icon}
                    </span>
                    <h3 className="font-display font-bold text-[16.5px] leading-[1.3] text-white m-0 mt-[10px]">
                      {s.title}
                    </h3>
                  </div>

                  {/* Our standard */}
                  <div className="flex flex-col gap-[12px]">
                    <p className="text-[14.5px] leading-[1.65] text-white/70 m-0">{s.us}</p>
                    {s.points && (
                      <ul className="flex flex-col gap-[8px] m-0 p-0 list-none">
                        {s.points.map((pt, pi) => (
                          <li
                            key={pi}
                            className="flex items-start gap-[10px] text-[13.5px] leading-[1.5] text-white/60"
                          >
                            <CheckDot />
                            {pt}
                          </li>
                        ))}
                      </ul>
                    )}
                    <div>
                      <ProofChip>{s.proof}</ProofChip>
                    </div>
                  </div>

                  {/* Typical contractor */}
                  <div className="flex items-start gap-[10px]">
                    <DashDot />
                    <span className="text-[14px] leading-[1.5] text-white/30">{s.them}</span>
                  </div>
                </div>

                {/* Mobile stacked card */}
                <div className="sm:hidden flex flex-col gap-[14px] px-[20px] py-[22px]">
                  <div className="flex items-center gap-[12px]">
                    <span className="shrink-0 w-[40px] h-[40px] rounded-full bg-teal/10 flex items-center justify-center text-teal">
                      {s.icon}
                    </span>
                    <h3 className="font-display font-bold text-[16.5px] text-white m-0">{s.title}</h3>
                  </div>
                  <p className="text-[14px] leading-[1.65] text-white/70 m-0">{s.us}</p>
                  {s.points && (
                    <ul className="flex flex-col gap-[8px] m-0 p-0 list-none">
                      {s.points.map((pt, pi) => (
                        <li key={pi} className="flex items-start gap-[10px] text-[13px] leading-[1.5] text-white/60">
                          <CheckDot />
                          {pt}
                        </li>
                      ))}
                    </ul>
                  )}
                  <div>
                    <ProofChip>{s.proof}</ProofChip>
                  </div>
                  <div className="flex items-start gap-[10px] pt-[10px] border-t border-white/[0.08]">
                    <DashDot />
                    <span className="text-[13px] leading-[1.5] text-white/30">Typical contractor: {s.them}</span>
                  </div>
                </div>
              </div>
            ))}
          </StaggerReveal>
        </div>
      </div>
    </section>
  )
}
