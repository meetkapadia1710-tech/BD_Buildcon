type Props = {
  className?: string
}

// Deterministic skyline rhythm — varied heights read as a natural city silhouette.
const HEIGHTS = [34, 52, 72, 44, 60, 38, 56, 48, 78, 40, 64, 34, 58, 46, 68, 36, 50]
const BUILDING_W = 22
const GAP = 4
const STEP = BUILDING_W + GAP
const VIEW_W = HEIGHTS.length * STEP - GAP
const VIEW_H = 100
const CRANE_INDEX = HEIGHTS.indexOf(Math.max(...HEIGHTS))

/**
 * Abstract, geometric skyline — a stand-in for real estate / construction,
 * not a literal illustration. Pure SVG + CSS keyframes so it's safe to
 * render from a Server Component (loading.tsx) as well as client ones.
 */
export function AbstractSkyline({ className = '' }: Props) {
  const craneX = CRANE_INDEX * STEP
  const craneCenter = craneX + BUILDING_W / 2
  const craneTopY = VIEW_H - HEIGHTS[CRANE_INDEX] - 18

  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      className={className}
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {HEIGHTS.map((h, i) => (
        <rect
          key={i}
          x={i * STEP}
          y={VIEW_H - h}
          width={BUILDING_W}
          height={h}
          rx="1.5"
          fill="currentColor"
          opacity={0.35 + (i % 3) * 0.15}
          className="animate-skyline-rise"
          style={{ transformBox: 'fill-box', transformOrigin: 'bottom', animationDelay: `${(i % 6) * 0.15}s` }}
        />
      ))}

      {/* Tower crane accent on the tallest building */}
      <line
        x1={craneCenter}
        y1={VIEW_H - HEIGHTS[CRANE_INDEX]}
        x2={craneCenter}
        y2={craneTopY}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.55"
      />
      <path
        d={`M${craneCenter - 16},${craneTopY} H${craneCenter + 26}`}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.55"
        className="animate-crane-sway"
        style={{ transformBox: 'view-box', transformOrigin: `${craneCenter}px ${craneTopY}px` }}
      />
    </svg>
  )
}
