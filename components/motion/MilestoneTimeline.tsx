'use client'

/**
 * MilestoneTimeline — scroll-driven stock-chart timeline.
 *
 * Desktop (lg+): zigzag climbing line from bottom-left to top-right.
 * Mobile (<lg): vertical climbing line (top to bottom).
 *
 * Animation: strokeDashoffset scrubbed to scroll (scrub: true).
 */

import { useRef, useEffect, useId } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { EASE } from '@/lib/motion'

gsap.registerPlugin(ScrollTrigger)

export interface Milestone {
  year: string
  title: string
  body: string
}

interface Props {
  milestones: Milestone[]
}

const H = {
  canvasW: 1000,
  canvasH: 260,
  nodeR: 9,
  nodeRInner: 4,
  lineWidth: 3,
} as const

const V = {
  canvasW: 80,
  nodeR: 9,
  nodeRInner: 4,
  lineWidth: 3,
  xTrack: 40,
} as const

// Builds the jagged stock-chart path for desktop
function buildHPath(n: number): { d: string; nodes: { x: number; y: number }[] } {
  const colW = H.canvasW / n
  const nodes = Array.from({ length: n }, (_, i) => ({
    x: colW * i + colW / 2,
    // Ascending heights: start lower, end higher (lower Y value = higher on screen)
    // Range from H=220 down to H=40
    y: 220 - (180 / (n - 1 || 1)) * i,
  }))

  const parts: string[] = []

  // Start point bottom left
  parts.push(`M 0 250`)

  // First segment to Node 0
  const n0 = nodes[0]
  parts.push(`L ${n0.x - 40} 240`) // mini dip
  parts.push(`L ${n0.x} ${n0.y}`)

  for (let i = 1; i < n; i++) {
    const prev = nodes[i - 1]
    const curr = nodes[i]

    // Dip point halfway between
    const dipX = (prev.x + curr.x) / 2
    const dipY = prev.y + 15 // dip goes down (higher Y) from previous node

    parts.push(`L ${dipX} ${dipY}`)
    parts.push(`L ${curr.x} ${curr.y}`)
  }

  // Arrow at the end
  const last = nodes[n - 1]
  parts.push(`L ${last.x + colW * 0.4} ${last.y - 30}`)

  return { d: parts.join(' '), nodes }
}

// Builds the jagged stock-chart path for mobile (vertical)
function buildVPath(n: number, totalH: number): { d: string; nodes: { x: number; y: number }[] } {
  const pad = 40
  const step = (totalH - pad * 2) / (n - 1 || 1)
  const nodes = Array.from({ length: n }, (_, i) => ({
    // Zig-zag left and right of center track
    x: V.xTrack + (i % 2 === 0 ? 15 : -15),
    y: pad + step * i,
  }))

  const parts: string[] = []
  parts.push(`M ${V.xTrack} 0`)

  for (let i = 0; i < n; i++) {
    const curr = nodes[i]
    if (i > 0) {
      const prev = nodes[i - 1]
      const dipY = (prev.y + curr.y) / 2
      const dipX = V.xTrack + (i % 2 === 0 ? -25 : 25)
      parts.push(`L ${dipX} ${dipY}`)
    }
    parts.push(`L ${curr.x} ${curr.y}`)
  }

  // Tail
  parts.push(`L ${V.xTrack} ${totalH}`)

  return { d: parts.join(' '), nodes }
}

export function MilestoneTimeline({ milestones }: Props) {
  const uid = useId()
  const n = milestones.length

  const sectionRef = useRef<HTMLDivElement>(null)

  const hPathRef = useRef<SVGPathElement>(null)
  const hNodeRefs = useRef<(SVGCircleElement | null)[]>([])
  const hInnerRefs = useRef<(SVGCircleElement | null)[]>([])
  const hCardRefs = useRef<(HTMLDivElement | null)[]>([])

  const vPathRef = useRef<SVGPathElement>(null)
  const vNodeRefs = useRef<(SVGCircleElement | null)[]>([])
  const vInnerRefs = useRef<(SVGCircleElement | null)[]>([])
  const vCardRefs = useRef<(HTMLDivElement | null)[]>([])

  const CARD_ROW_H = 160
  const vCanvasH = CARD_ROW_H * n

  const { d: hPathD, nodes: hNodes } = buildHPath(n)
  const { d: vPathD, nodes: vNodes } = buildVPath(n, vCanvasH)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      const show = (el: SVGElement | HTMLElement | null) => {
        if (!el) return
        el.style.opacity = '1'
        ;(el as HTMLElement).style.transform = 'none'
      }
      if (hPathRef.current) hPathRef.current.style.strokeDashoffset = '0'
      if (vPathRef.current) vPathRef.current.style.strokeDashoffset = '0'
      hNodeRefs.current.forEach(show)
      hInnerRefs.current.forEach(show)
      hCardRefs.current.forEach(show)
      vNodeRefs.current.forEach(show)
      vInnerRefs.current.forEach(show)
      vCardRefs.current.forEach(show)
      return
    }

    const ctx = gsap.context(() => {
      // ── Desktop ─────────────────────────────────────────────────────────────
      const hPath = hPathRef.current
      if (hPath) {
        const len = hPath.getTotalLength()
        gsap.set(hPath, { strokeDasharray: len, strokeDashoffset: len })
        gsap.set([hNodeRefs.current, hInnerRefs.current], {
          scale: 0,
          opacity: 0,
          transformOrigin: 'center center',
        })
        gsap.set(hCardRefs.current, { opacity: 0, y: 30 })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 25%',
            scrub: 0.5,
          },
        })

        // Draw path over the full duration of 1, so it aligns with the (i + 0.5)/n percentages
        tl.to(hPath, { strokeDashoffset: 0, ease: 'none', duration: 1 }, 0)

        milestones.forEach((_, i) => {
          const p = (i + 0.5) / n
          // Trigger exactly when the line reaches the node
          const startP = p
          tl.to(hNodeRefs.current[i], { scale: 1, opacity: 1, duration: 0.06, ease: EASE.outStr }, startP)
          tl.to(hInnerRefs.current[i], { opacity: 1, duration: 0.04 }, startP + 0.02)
          tl.to(hCardRefs.current[i], { opacity: 1, y: 0, duration: 0.1, ease: EASE.outStr }, startP)
        })
      }

      // ── Mobile ───────────────────────────────────────────────────────────────
      const vPath = vPathRef.current
      if (vPath) {
        const len = vPath.getTotalLength()
        gsap.set(vPath, { strokeDasharray: len, strokeDashoffset: len })
        gsap.set([vNodeRefs.current, vInnerRefs.current], {
          scale: 0,
          opacity: 0,
          transformOrigin: 'center center',
        })
        gsap.set(vCardRefs.current, { opacity: 0, x: 20 })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'bottom 80%',
            scrub: 0.5,
          },
        })

        // Draw path over full duration of 1
        tl.to(vPath, { strokeDashoffset: 0, ease: 'none', duration: 1 }, 0)

        milestones.forEach((_, i) => {
          const p = (i + 0.5) / n
          const startP = p
          tl.to(vNodeRefs.current[i], { scale: 1, opacity: 1, duration: 0.06, ease: EASE.outStr }, startP)
          tl.to(vInnerRefs.current[i], { opacity: 1, duration: 0.04 }, startP + 0.02)
          tl.to(vCardRefs.current[i], { opacity: 1, x: 0, duration: 0.1, ease: EASE.outStr }, startP)
        })
      }

      // Refresh ScrollTrigger after a tick to handle image loading or layout layout shifts
      ScrollTrigger.refresh()
    }, section)

    return () => ctx.revert()
  }, [milestones, n, vCanvasH])

  return (
    <div ref={sectionRef} className="w-full">
      {/* ══ DESKTOP (lg+) ══════════════════════════════════════════════════════ */}
      <div className="hidden lg:block" aria-hidden="false">
        <div className="w-full relative" aria-hidden="true">
          <svg
            viewBox={`0 0 ${H.canvasW} ${H.canvasH}`}
            preserveAspectRatio="none"
            className="w-full"
            style={{ height: `${H.canvasH * 0.6}px`, overflow: 'visible' }}
          >
            <defs>
              <filter id={`${uid}-glow`} x="-20%" y="-50%" width="140%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              {/* Arrow head marker */}
              <marker
                id={`${uid}-arrow`}
                viewBox="0 0 10 10"
                refX="5"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#16A8B8" />
              </marker>
            </defs>

            {/* Faint background grid line to emphasize growth */}
            <line
              x1="0"
              y1="240"
              x2="1000"
              y2="240"
              stroke="#16A8B8"
              strokeOpacity="0.1"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
            <line
              x1="0"
              y1="140"
              x2="1000"
              y2="140"
              stroke="#16A8B8"
              strokeOpacity="0.1"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
            <line
              x1="0"
              y1="40"
              x2="1000"
              y2="40"
              stroke="#16A8B8"
              strokeOpacity="0.1"
              strokeWidth="1"
              strokeDasharray="4 4"
            />

            <path
              ref={hPathRef}
              d={hPathD}
              fill="none"
              stroke="#16A8B8"
              strokeWidth={H.lineWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
              filter={`url(#${uid}-glow)`}
              markerEnd={`url(#${uid}-arrow)`}
            />

            {hNodes.map((node, i) => (
              <g key={i}>
                <circle
                  ref={(el) => {
                    hNodeRefs.current[i] = el
                  }}
                  cx={node.x}
                  cy={node.y}
                  r={H.nodeR}
                  fill="white"
                  stroke="#16A8B8"
                  strokeWidth={2}
                  style={{ opacity: 0 }}
                />
                <circle
                  ref={(el) => {
                    hInnerRefs.current[i] = el
                  }}
                  cx={node.x}
                  cy={node.y}
                  r={H.nodeRInner}
                  fill="#16A8B8"
                  style={{ opacity: 0 }}
                />
              </g>
            ))}
          </svg>
        </div>

        <div className="grid gap-[20px] mt-[16px]" style={{ gridTemplateColumns: `repeat(${n}, 1fr)` }}>
          {milestones.map((m, i) => (
            <div
              key={i}
              ref={(el) => {
                hCardRefs.current[i] = el
              }}
              style={{ opacity: 0 }}
            >
              <MilestoneCard m={m} />
            </div>
          ))}
        </div>
      </div>

      {/* ══ MOBILE (<lg) ═══════════════════════════════════════════════════════ */}
      <div className="lg:hidden flex flex-row gap-[12px]">
        <div className="shrink-0 self-stretch" style={{ width: `${V.canvasW}px` }} aria-hidden="true">
          <svg
            viewBox={`0 0 ${V.canvasW} ${vCanvasH}`}
            preserveAspectRatio="none"
            width={V.canvasW}
            style={{ height: '100%', minHeight: `${vCanvasH}px` }}
          >
            <defs>
              <filter id={`${uid}-glow-v`} x="-100%" y="-5%" width="300%" height="110%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <path
              ref={vPathRef}
              d={vPathD}
              fill="none"
              stroke="#16A8B8"
              strokeWidth={V.lineWidth}
              strokeLinejoin="round"
              filter={`url(#${uid}-glow-v)`}
            />

            {vNodes.map((node, i) => (
              <g key={i}>
                <circle
                  ref={(el) => {
                    vNodeRefs.current[i] = el
                  }}
                  cx={node.x}
                  cy={node.y}
                  r={V.nodeR}
                  fill="white"
                  stroke="#16A8B8"
                  strokeWidth={2}
                  style={{ opacity: 0 }}
                />
                <circle
                  ref={(el) => {
                    vInnerRefs.current[i] = el
                  }}
                  cx={node.x}
                  cy={node.y}
                  r={V.nodeRInner}
                  fill="#16A8B8"
                  style={{ opacity: 0 }}
                />
              </g>
            ))}
          </svg>
        </div>

        <div className="flex-1 flex flex-col justify-around py-[20px] gap-[16px]">
          {milestones.map((m, i) => (
            <div
              key={i}
              ref={(el) => {
                vCardRefs.current[i] = el
              }}
              style={{ opacity: 0, minHeight: `${CARD_ROW_H - 20}px` }}
            >
              <MilestoneCard m={m} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function MilestoneCard({ m }: { m: Milestone }) {
  return (
    <div className="group relative overflow-hidden bg-white border border-hairline rounded-card p-[28px] flex flex-col gap-[10px] h-full transition-all duration-300 hover:border-teal/40 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(0,0,0,0.10)]">
      <span className="absolute top-0 left-0 h-[3px] w-[36px] bg-teal rounded-br-full transition-all duration-500 group-hover:w-full" />
      <span
        className="pointer-events-none absolute -right-2 -bottom-6 font-display font-[800] text-[92px] leading-none text-teal/[0.06] select-none"
        aria-hidden="true"
      >
        {m.year}
      </span>
      <span className="relative font-display font-[800] text-[28px] text-teal">{m.year}</span>
      <span className="relative font-display font-bold text-[17px] text-ink">{m.title}</span>
      <span className="relative text-[14.5px] leading-[1.6] text-body">{m.body}</span>
    </div>
  )
}
