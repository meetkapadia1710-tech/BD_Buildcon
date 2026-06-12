'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function ConstructionDraw({ className = '' }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const svg = svgRef.current
    if (!svg || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lines = Array.from(svg.querySelectorAll<SVGElement>('.draw'))
    gsap.set(lines, { strokeDasharray: 2000, strokeDashoffset: 2000 })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: svg,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    })

    tl.to(lines, {
      strokeDashoffset: 0,
      duration: 0.45,
      stagger: 0.055,
      ease: 'power2.inOut',
    })

    return () => { tl.kill() }
  }, [])

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 560 360"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      {/* Foundation slab */}
      <line className="draw" x1="60" y1="320" x2="500" y2="320" stroke="#16A8B8" strokeWidth="3" />
      <line className="draw" x1="60" y1="330" x2="500" y2="330" stroke="#16A8B8" strokeWidth="1.5" opacity="0.3" />

      {/* Left column — double I-beam */}
      <line className="draw" x1="100" y1="320" x2="100" y2="60" stroke="#16A8B8" strokeWidth="3" />
      <line className="draw" x1="114" y1="320" x2="114" y2="60" stroke="#16A8B8" strokeWidth="1.5" opacity="0.4" />

      {/* Centre-left column */}
      <line className="draw" x1="220" y1="320" x2="220" y2="60" stroke="#16A8B8" strokeWidth="3" />
      <line className="draw" x1="234" y1="320" x2="234" y2="60" stroke="#16A8B8" strokeWidth="1.5" opacity="0.4" />

      {/* Centre-right column */}
      <line className="draw" x1="340" y1="320" x2="340" y2="60" stroke="#16A8B8" strokeWidth="3" />
      <line className="draw" x1="354" y1="320" x2="354" y2="60" stroke="#16A8B8" strokeWidth="1.5" opacity="0.4" />

      {/* Right column */}
      <line className="draw" x1="460" y1="320" x2="460" y2="60" stroke="#16A8B8" strokeWidth="3" />
      <line className="draw" x1="474" y1="320" x2="474" y2="60" stroke="#16A8B8" strokeWidth="1.5" opacity="0.4" />

      {/* Ground floor beam */}
      <line className="draw" x1="100" y1="260" x2="474" y2="260" stroke="#16A8B8" strokeWidth="3" />
      <line className="draw" x1="100" y1="272" x2="474" y2="272" stroke="#16A8B8" strokeWidth="1" opacity="0.3" />

      {/* First floor beam */}
      <line className="draw" x1="100" y1="185" x2="474" y2="185" stroke="#16A8B8" strokeWidth="3" />
      <line className="draw" x1="100" y1="197" x2="474" y2="197" stroke="#16A8B8" strokeWidth="1" opacity="0.3" />

      {/* Second floor beam */}
      <line className="draw" x1="100" y1="110" x2="474" y2="110" stroke="#16A8B8" strokeWidth="3" />
      <line className="draw" x1="100" y1="122" x2="474" y2="122" stroke="#16A8B8" strokeWidth="1" opacity="0.3" />

      {/* Roof */}
      <line className="draw" x1="100" y1="60" x2="474" y2="60" stroke="#16A8B8" strokeWidth="3.5" />

      {/* Diagonal wind bracing */}
      <line className="draw" x1="114" y1="320" x2="220" y2="185" stroke="#16A8B8" strokeWidth="1" opacity="0.2" />
      <line className="draw" x1="114" y1="185" x2="220" y2="60"  stroke="#16A8B8" strokeWidth="1" opacity="0.2" />
      <line className="draw" x1="354" y1="320" x2="460" y2="185" stroke="#16A8B8" strokeWidth="1" opacity="0.2" />
      <line className="draw" x1="354" y1="185" x2="460" y2="60"  stroke="#16A8B8" strokeWidth="1" opacity="0.2" />

      {/* Crane — mast */}
      <line className="draw" x1="500" y1="60" x2="500" y2="12" stroke="#16A8B8" strokeWidth="2.5" />
      {/* Crane — counter jib */}
      <line className="draw" x1="500" y1="16" x2="530" y2="16" stroke="#16A8B8" strokeWidth="2" opacity="0.45" />
      {/* Crane — main jib */}
      <line className="draw" x1="380" y1="16" x2="500" y2="16" stroke="#16A8B8" strokeWidth="2.5" />
      {/* Crane — stay wire */}
      <line className="draw" x1="500" y1="12" x2="420" y2="16" stroke="#16A8B8" strokeWidth="1" opacity="0.35" />
      {/* Crane — hoist cable */}
      <line className="draw" x1="420" y1="16" x2="420" y2="58" stroke="#16A8B8" strokeWidth="1" strokeDasharray="5 3" opacity="0.55" />
      {/* Hook */}
      <path className="draw" d="M414 58 Q420 66 426 58" stroke="#16A8B8" strokeWidth="1.5" />

      {/* Dimension tick lines */}
      <line className="draw" x1="50" y1="320" x2="50" y2="260" stroke="#16A8B8" strokeWidth="0.75" opacity="0.25" />
      <line className="draw" x1="44" y1="260" x2="56" y2="260" stroke="#16A8B8" strokeWidth="0.75" opacity="0.25" />
      <line className="draw" x1="50" y1="260" x2="50" y2="185" stroke="#16A8B8" strokeWidth="0.75" opacity="0.25" />
      <line className="draw" x1="44" y1="185" x2="56" y2="185" stroke="#16A8B8" strokeWidth="0.75" opacity="0.25" />
      <line className="draw" x1="50" y1="185" x2="50" y2="110" stroke="#16A8B8" strokeWidth="0.75" opacity="0.25" />
      <line className="draw" x1="44" y1="110" x2="56" y2="110" stroke="#16A8B8" strokeWidth="0.75" opacity="0.25" />
      <line className="draw" x1="50" y1="110" x2="50" y2="60"  stroke="#16A8B8" strokeWidth="0.75" opacity="0.25" />
      <line className="draw" x1="44" y1="60"  x2="56" y2="60"  stroke="#16A8B8" strokeWidth="0.75" opacity="0.25" />

      {/* Floor labels */}
      <text x="16" y="295" fill="#16A8B8" fontSize="8" opacity="0.35" fontFamily="monospace">G/F</text>
      <text x="16" y="218" fill="#16A8B8" fontSize="8" opacity="0.35" fontFamily="monospace">1/F</text>
      <text x="16" y="143" fill="#16A8B8" fontSize="8" opacity="0.35" fontFamily="monospace">2/F</text>
      <text x="16" y="80"  fill="#16A8B8" fontSize="8" opacity="0.35" fontFamily="monospace">ROOF</text>
    </svg>
  )
}
