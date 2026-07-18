/**
 * BlueprintArtifacts — static blueprint-style SVG decorative fragments.
 *
 * All exports are:
 *  – pure SVG (server-safe, zero JS cost)
 *  – aria-hidden, pointer-events-none by default
 *  – drawn in currentColor so colour is set by className (e.g. text-teal/[0.12])
 *  – sized by className (w-*, h-*); caller controls position with absolute + inset utilities
 *
 * Usage pattern (behind content):
 *   <section className="relative overflow-hidden">
 *     <CraneArtifact className="absolute top-0 right-0 w-64 h-64 text-teal/[0.12] hidden lg:block pointer-events-none" />
 *     <div className="relative z-10">...content...</div>
 *   </section>
 */

type ArtifactProps = {
  className?: string
}

/* ─────────────────────────────────────────────
   1. CraneArtifact
   Tower-crane mast + jib fragment with tie rods and hook
───────────────────────────────────────────── */
export function CraneArtifact({ className = '' }: ArtifactProps) {
  return (
    <svg viewBox="0 0 240 320" fill="none" className={className} aria-hidden="true">
      {/* Mast */}
      <path d="M110 310 V30 M125 310 V30" stroke="currentColor" strokeWidth="2.5" />
      {/* Mast lattice */}
      <path
        d="M110 300 L125 283 L110 266 L125 249 L110 232 L125 215 L110 198 L125 181 L110 164 L125 147 L110 130 L125 113 L110 96 L125 79 L110 62 L125 45 L110 30"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.65"
      />
      {/* Apex */}
      <path d="M110 30 L117 8 L125 30" stroke="currentColor" strokeWidth="2" />
      {/* Cabin */}
      <path d="M96 30 h14 v18 h-14 z" stroke="currentColor" strokeWidth="1.5" />
      {/* Main jib */}
      <path d="M96 38 L10 38 L18 48 L110 48" stroke="currentColor" strokeWidth="2" />
      {/* Jib lattice */}
      <path d="M96 38 L80 48 L64 38 L48 48 L32 38 L18 48" stroke="currentColor" strokeWidth="1" opacity="0.6" />
      {/* Counter jib */}
      <path d="M125 38 L200 38 L195 48 L125 48" stroke="currentColor" strokeWidth="2" />
      <path d="M125 38 L145 48 L165 38 L185 48 L195 38" stroke="currentColor" strokeWidth="1" opacity="0.6" />
      {/* Tie rods */}
      <path d="M117 8 L40 38 M117 8 L80 38 M117 8 L200 38" stroke="currentColor" strokeWidth="1" opacity="0.45" />
      {/* Trolley */}
      <path d="M52 38 H68 V50 H52 Z" stroke="currentColor" strokeWidth="1.5" />
      {/* Hoist rope */}
      <path d="M60 50 V160" stroke="currentColor" strokeWidth="1" strokeDasharray="4 2" />
      {/* Hook */}
      <path d="M55 160 A 5 5 0 1 0 65 160" stroke="currentColor" strokeWidth="1.5" />
      {/* Dimension tick at base */}
      <path d="M90 310 H145" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
      <path d="M90 305 V315 M145 305 V315" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
      {/* Label */}
      <text x="92" y="290" fontFamily="monospace" fontSize="9" fill="currentColor" opacity="0.55">
        CRANE-01
      </text>
    </svg>
  )
}

/* ─────────────────────────────────────────────
   2. SiloArtifact
   Storage silo + connecting pipe + safety ladder
───────────────────────────────────────────── */
export function SiloArtifact({ className = '' }: ArtifactProps) {
  return (
    <svg viewBox="0 0 180 320" fill="none" className={className} aria-hidden="true">
      {/* Silo walls */}
      <path d="M30 310 V120" stroke="currentColor" strokeWidth="2.5" />
      <path d="M130 310 V120" stroke="currentColor" strokeWidth="2.5" />
      {/* Dome top */}
      <path d="M30 120 A 50 38 0 0 1 130 120" stroke="currentColor" strokeWidth="2.5" />
      {/* Dome inner line */}
      <path d="M40 120 A 40 28 0 0 1 120 120" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      {/* Horizontal band rings */}
      <path d="M30 180 H130 M30 230 H130 M30 270 H130" stroke="currentColor" strokeWidth="1" opacity="0.35" />
      {/* Safety ladder (left side of silo) */}
      <path d="M12 310 V120 M22 310 V120" stroke="currentColor" strokeWidth="1" opacity="0.55" />
      <path
        d="M12 300 h10 M12 288 h10 M12 276 h10 M12 264 h10 M12 252 h10 M12 240 h10 M12 228 h10 M12 216 h10 M12 204 h10 M12 192 h10 M12 180 h10 M12 168 h10 M12 156 h10 M12 144 h10 M12 132 h10"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.55"
      />
      {/* Pipe outlet at base */}
      <path d="M130 270 H170 V295 M130 280 H165 V295" stroke="currentColor" strokeWidth="1.5" />
      {/* Pipe elbow */}
      <path d="M165 295 Q168 310 155 310 H130" stroke="currentColor" strokeWidth="1.5" />
      {/* Vent at top */}
      <path d="M75 90 V60 M70 60 H80" stroke="currentColor" strokeWidth="1.5" />
      {/* Elevation label */}
      <text x="135" y="125" fontFamily="monospace" fontSize="8" fill="currentColor" opacity="0.55">
        EL +12.5
      </text>
      <text x="135" y="195" fontFamily="monospace" fontSize="8" fill="currentColor" opacity="0.45">
        EL +6.0
      </text>
      <text x="135" y="315" fontFamily="monospace" fontSize="8" fill="currentColor" opacity="0.55">
        EL +0.0
      </text>
      {/* Vertical dimension line */}
      <path d="M155 120 V310" stroke="currentColor" strokeWidth="0.5" strokeDasharray="6 3" opacity="0.35" />
      <path d="M150 120 H160 M150 310 H160" stroke="currentColor" strokeWidth="0.5" opacity="0.35" />
    </svg>
  )
}

/* ─────────────────────────────────────────────
   3. TrussArtifact
   Pitched-roof truss with X-bracing web members
───────────────────────────────────────────── */
export function TrussArtifact({ className = '' }: ArtifactProps) {
  return (
    <svg viewBox="0 0 360 200" fill="none" className={className} aria-hidden="true">
      {/* Bottom chord */}
      <path d="M20 160 H340" stroke="currentColor" strokeWidth="2.5" />
      {/* Top chord (pitched) */}
      <path d="M20 160 L180 40 L340 160" stroke="currentColor" strokeWidth="2.5" />
      {/* Inner top chord */}
      <path d="M28 160 L180 52 L332 160" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      {/* Vertical web members */}
      <path
        d="M75 160 L101 117 M130 160 L153 96 M230 160 L207 96 M285 160 L259 117"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.7"
      />
      {/* Apex vertical */}
      <path d="M180 160 V40" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
      {/* Diagonal web members */}
      <path
        d="M20 160 L101 117 M75 160 L153 96 M130 160 L180 40 M180 40 L230 160 M207 96 L285 160 M259 117 L340 160"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.45"
      />
      {/* End verticals (columns) */}
      <path d="M20 160 V185 M340 160 V185" stroke="currentColor" strokeWidth="2" />
      {/* Base plates */}
      <path d="M10 185 H30 M330 185 H350" stroke="currentColor" strokeWidth="2" />
      {/* Node circles at key joints */}
      <circle cx="20" cy="160" r="3" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="180" cy="40" r="3" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="340" cy="160" r="3" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="180" cy="160" r="2.5" stroke="currentColor" strokeWidth="1" opacity="0.7" />
      {/* Span dimension */}
      <path d="M20 192 H340" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
      <path d="M20 187 V197 M340 187 V197" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
      <text x="155" y="200" fontFamily="monospace" fontSize="9" fill="currentColor" opacity="0.6">
        SPAN: 32 000
      </text>
    </svg>
  )
}

/* ─────────────────────────────────────────────
   4. DimensionLines
   Vertical dimension line with elevation ticks + monospace labels
───────────────────────────────────────────── */
export function DimensionLines({ className = '' }: ArtifactProps) {
  return (
    <svg viewBox="0 0 80 320" fill="none" className={className} aria-hidden="true">
      {/* Main vertical dimension shaft */}
      <path d="M40 20 V300" stroke="currentColor" strokeWidth="0.75" strokeDasharray="8 4" opacity="0.5" />
      {/* Elevation marks + horizontal ticks */}
      {/* EL +0.0 */}
      <path d="M28 300 H52" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="40" cy="300" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <text x="2" y="303" fontFamily="monospace" fontSize="9" fill="currentColor" opacity="0.65">
        EL +0.0
      </text>
      {/* EL +7.5 */}
      <path d="M32 228 H48" stroke="currentColor" strokeWidth="1" opacity="0.7" />
      <circle cx="40" cy="228" r="2" stroke="currentColor" strokeWidth="1" opacity="0.7" />
      <text x="2" y="231" fontFamily="monospace" fontSize="8" fill="currentColor" opacity="0.55">
        EL +7.5
      </text>
      {/* EL +15.0 */}
      <path d="M28 158 H52" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="40" cy="158" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <text x="2" y="161" fontFamily="monospace" fontSize="9" fill="currentColor" opacity="0.65">
        EL+15.0
      </text>
      {/* EL +22.5 */}
      <path d="M32 88 H48" stroke="currentColor" strokeWidth="1" opacity="0.7" />
      <circle cx="40" cy="88" r="2" stroke="currentColor" strokeWidth="1" opacity="0.7" />
      <text x="2" y="91" fontFamily="monospace" fontSize="8" fill="currentColor" opacity="0.55">
        EL+22.5
      </text>
      {/* EL +30.0 */}
      <path d="M28 20 H52" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="40" cy="20" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <text x="2" y="17" fontFamily="monospace" fontSize="9" fill="currentColor" opacity="0.65">
        EL+30.0
      </text>
      {/* Small sub-ticks */}
      <path d="M35 264 H45 M35 192 H45 M35 122 H45 M35 54 H45" stroke="currentColor" strokeWidth="0.75" opacity="0.4" />
    </svg>
  )
}

/* ─────────────────────────────────────────────
   5. SurveyMark
   Crosshair/target survey marker (⊙ motif)
───────────────────────────────────────────── */
export function SurveyMark({ className = '' }: ArtifactProps) {
  return (
    <svg viewBox="0 0 80 80" fill="none" className={className} aria-hidden="true">
      {/* Outer circle */}
      <circle cx="40" cy="40" r="30" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
      {/* Mid circle */}
      <circle cx="40" cy="40" r="18" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      {/* Centre dot */}
      <circle cx="40" cy="40" r="3" stroke="currentColor" strokeWidth="1.5" />
      {/* Cross hairs */}
      <path d="M40 4 V18 M40 62 V76" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M4 40 H18 M62 40 H76" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* Diagonal tick marks */}
      <path
        d="M18 18 L22 22 M58 18 L54 22 M18 62 L22 58 M58 62 L54 58"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.5"
      />
      {/* Label */}
      <text x="44" y="74" fontFamily="monospace" fontSize="7" fill="currentColor" opacity="0.6">
        BM-01
      </text>
    </svg>
  )
}
