'use client'

/**
 * Zero-dependency placeholder / fallback for the WebGL scene. Used as:
 *  - the lazy-mount placeholder before three.js loads,
 *  - the no-WebGL / context-lost fallback,
 *  - the kill-switch target when NEXT_PUBLIC_SCENE_V2 is disabled.
 * Pure inline SVG + CSS — no assets, no layout shift, on-brand blueprint look.
 */
export function ScenePoster({ dim = false }: { dim?: boolean }) {
  return (
    <div
      aria-hidden
      style={{
        width: '100%',
        height: '100%',
        display: 'grid',
        placeItems: 'center',
        opacity: dim ? 0.55 : 1,
        transition: 'opacity 0.4s ease',
      }}
    >
      <svg viewBox="0 0 400 360" width="82%" height="82%" role="img" style={{ maxWidth: 520 }}>
        <defs>
          <linearGradient id="bpg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#16a8b8" stopOpacity="0.9" />
            <stop offset="1" stopColor="#16a8b8" stopOpacity="0.45" />
          </linearGradient>
        </defs>
        {/* survey grid */}
        <g stroke="#16a8b8" strokeOpacity="0.12" strokeWidth="1">
          {Array.from({ length: 11 }).map((_, i) => (
            <line key={`v${i}`} x1={i * 40} y1="0" x2={i * 40} y2="360" />
          ))}
          {Array.from({ length: 10 }).map((_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 40} x2="400" y2={i * 40} />
          ))}
        </g>
        {/* massing wireframes */}
        <g fill="none" stroke="url(#bpg)" strokeWidth="2" strokeLinejoin="round">
          <path d="M120 300 L120 120 L200 90 L200 270 Z" />
          <path d="M120 120 L170 140 L250 110 L200 90 Z" />
          <path d="M200 270 L250 290 L250 110 L200 90" />
          <path d="M210 300 L210 180 L270 160 L270 280 Z" />
          <path d="M270 280 L300 292 L300 172 L270 160" />
        </g>
        {/* crane glyph */}
        <g stroke="#2e353b" strokeOpacity="0.5" strokeWidth="2" fill="none">
          <path d="M90 300 L90 70" />
          <path d="M60 84 L150 60" />
          <path d="M90 70 L120 78" />
          <path d="M132 63 L132 90" />
        </g>
      </svg>
    </div>
  )
}
