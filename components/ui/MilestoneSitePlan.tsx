import { StaggerReveal } from '@/components/motion/StaggerReveal'

export interface Milestone {
  year: string
  title: string
  body: string
}

/**
 * Milestones as numbered survey benchmarks scattered across a blueprint site
 * plan — ties into the crane/survey-mark motifs already used elsewhere on
 * this page (see components/ui/BlueprintArtifacts.tsx).
 *
 * Deliberately NOT built like the previous two attempts: every position here
 * is plain arithmetic computed from `milestones.length` at render time, not
 * something measured off the DOM at runtime. That removes the entire class
 * of bugs (distorted nodes, mis-drawn lines, stray markers) those attempts
 * ran into — there's nothing here to get out of sync. This is a server
 * component; the only client-side JS involved is the existing, already-proven
 * StaggerReveal entrance animation.
 */

const PIN_SIZE = 40 // px — benchmark icon is always square, so it can never be squashed into an oval
const LABEL_H = 16 // px — space reserved for the "BM-0X" tag above each pin
const BASELINE_GAP = 26 // px — distance from the canvas bottom to the reference line
const TOP_PAD = 34 // px — headroom above the tallest pin for the corner labels

const RISE = 16 // px — general upward drift per milestone, so later pins read as "higher"
// Hand-tuned jitter so pins read as scattered survey markers rather than a rigid staircase.
// Cycles if there are more than 8 milestones.
const JITTER = [14, -18, 10, -14, 16, -10, 12, -16]

function pinOffsets(count: number): number[] {
  const raw = Array.from({ length: count }, (_, i) => i * RISE + JITTER[i % JITTER.length])
  const min = Math.min(...raw)
  return raw.map((v) => v - min) // shift so the lowest pin sits exactly on the baseline
}

function BenchmarkPin() {
  return (
    <svg width={PIN_SIZE} height={PIN_SIZE} viewBox="0 0 80 80" fill="none" className="text-teal" aria-hidden="true">
      <circle cx="40" cy="40" r="30" stroke="currentColor" strokeWidth="1.5" opacity="0.55" />
      <circle cx="40" cy="40" r="16" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <circle cx="40" cy="40" r="3" fill="currentColor" />
      <path d="M40 4 V18 M40 62 V76" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      <path d="M4 40 H18 M62 40 H76" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
    </svg>
  )
}

export function MilestoneSitePlan({ milestones }: { milestones: Milestone[] }) {
  const offsets = pinOffsets(milestones.length)
  const canvasHeight = BASELINE_GAP + Math.max(...offsets, 0) + PIN_SIZE + LABEL_H + TOP_PAD

  return (
    <div className="relative">
      {/* Blueprint site-plan canvas — desktop/tablet only; mobile gets the card stack alone below */}
      <div
        className="relative hidden lg:block mb-[30px] rounded-card overflow-hidden border border-hairline bg-white"
        style={{ height: canvasHeight }}
      >
        <div className="texture-grid pointer-events-none absolute inset-0 text-teal/[0.08]" aria-hidden="true" />

        {/* Corner plan labels — decorative, ties the canvas to the real project location */}
        <span
          className="absolute top-[10px] left-[14px] font-mono text-[9px] tracking-[0.12em] uppercase text-teal/50 select-none"
          aria-hidden="true"
        >
          Site Plan — Milestones
        </span>
        <span
          className="absolute top-[10px] right-[14px] font-mono text-[9px] tracking-[0.05em] text-teal/40 select-none"
          aria-hidden="true"
        >
          21.7051°N · 72.9959°E
        </span>

        {/* Reference baseline */}
        <div
          className="absolute left-[6%] right-[6%] border-t border-dashed border-teal/30"
          style={{ bottom: BASELINE_GAP }}
          aria-hidden="true"
        />

        <StaggerReveal
          className="absolute inset-x-[6%] top-0 grid grid-cols-4 gap-[20px]"
          style={{ bottom: BASELINE_GAP }}
          stagger={0.08}
          distance={20}
        >
          {milestones.map((m, i) => (
            <div key={m.year} className="relative h-full">
              {/* Stem — connects the pin down to the baseline */}
              <div
                className="absolute left-1/2 -translate-x-1/2 border-l border-dashed border-teal/35"
                style={{ bottom: 0, height: offsets[i] }}
                aria-hidden="true"
              />
              {/* Benchmark pin — label sits above, crosshair sits right on the stem */}
              <div
                className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-[4px]"
                style={{ bottom: offsets[i] }}
              >
                <span
                  className="font-mono text-[9px] tracking-[0.05em] text-teal/70 whitespace-nowrap select-none"
                  aria-hidden="true"
                >
                  BM-{String(i + 1).padStart(2, '0')}
                </span>
                <BenchmarkPin />
              </div>
            </div>
          ))}
        </StaggerReveal>
      </div>

      {/* Milestone cards */}
      <StaggerReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[20px]" stagger={0.1}>
        {milestones.map((m) => (
          <div key={m.year} className="group flex flex-col">
            <div className="relative flex-1 overflow-hidden bg-white border border-hairline rounded-card p-[28px] flex flex-col gap-[10px] transition-all duration-300 hover:border-teal/40 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(0,0,0,0.10)]">
              <span className="absolute top-0 left-0 h-[3px] w-[36px] bg-teal rounded-br-full transition-all duration-500 group-hover:w-full" />
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
  )
}
