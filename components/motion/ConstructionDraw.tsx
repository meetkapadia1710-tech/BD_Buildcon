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

    const lines = Array.from(svg.querySelectorAll<SVGPathElement>('.draw'))
    
    // Dynamically set dash array based on actual path length for perfect drawing
    lines.forEach(line => {
      const length = line.getTotalLength()
      gsap.set(line, { strokeDasharray: length, strokeDashoffset: length })
    })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: svg,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    })

    tl.to(lines, {
      strokeDashoffset: 0,
      duration: 1.2,
      stagger: 0.01,
      ease: 'power2.out',
    })
    
    tl.to(svg.querySelectorAll('.fade-text'), {
      opacity: 0.8,
      duration: 0.5,
      ease: 'power2.out',
    }, '-=0.5')

    return () => { tl.kill() }
  }, [])

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 800 520"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      {/* --- Foundations --- */}
      <path className="draw" d="M40 450 H760" stroke="currentColor" strokeWidth="3" />
      <path className="draw" d="M40 460 H760" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      {/* Pilings */}
      <path className="draw" d="M100 460 v30 M120 460 v30 M110 490 h-10 h20" stroke="currentColor" strokeWidth="2" opacity="0.5"/>
      <path className="draw" d="M245 460 v30 M265 460 v30 M255 490 h-10 h20" stroke="currentColor" strokeWidth="2" opacity="0.5"/>
      <path className="draw" d="M400 460 v30 M420 460 v30 M410 490 h-10 h20" stroke="currentColor" strokeWidth="2" opacity="0.5"/>
      <path className="draw" d="M520 460 v30 M540 460 v30 M530 490 h-10 h20" stroke="currentColor" strokeWidth="2" opacity="0.5"/>
      <path className="draw" d="M680 460 v30 M700 460 v30 M690 490 h-10 h20" stroke="currentColor" strokeWidth="2" opacity="0.5"/>

      {/* --- Main Factory Building --- */}
      {/* Columns */}
      <path className="draw" d="M90 450 v-250 h10 v250" stroke="currentColor" strokeWidth="2" />
      <path className="draw" d="M245 450 v-250 h10 v250" stroke="currentColor" strokeWidth="2" />
      <path className="draw" d="M400 450 v-250 h10 v250" stroke="currentColor" strokeWidth="2" />
      
      {/* Floors / Mezzanines */}
      <path className="draw" d="M100 350 H400 M100 270 H400" stroke="currentColor" strokeWidth="2" />
      
      {/* X-Bracing */}
      <path className="draw" d="M100 450 L245 350 M100 350 L245 450" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <path className="draw" d="M100 350 L245 270 M100 270 L245 350" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <path className="draw" d="M100 270 L245 200 M100 200 L245 270" stroke="currentColor" strokeWidth="1" opacity="0.4" />

      <path className="draw" d="M255 450 L400 350 M255 350 L400 450" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <path className="draw" d="M255 350 L400 270 M255 270 L400 350" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <path className="draw" d="M255 270 L400 200 M255 200 L400 270" stroke="currentColor" strokeWidth="1" opacity="0.4" />

      {/* Pitched Roof & Trusses */}
      <path className="draw" d="M80 200 L250 120 L420 200" stroke="currentColor" strokeWidth="3" />
      <path className="draw" d="M90 200 L250 135 L410 200" stroke="currentColor" strokeWidth="2" />
      <path className="draw" d="M100 200 L130 180 v20 L160 165 v35 L190 150 v50 L220 135 v65 L250 120 v80" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <path className="draw" d="M400 200 L370 180 v20 L340 165 v35 L310 150 v50 L280 135 v65 L250 120" stroke="currentColor" strokeWidth="1" opacity="0.5" />

      {/* --- Storage Silo --- */}
      <path className="draw" d="M520 450 V250" stroke="currentColor" strokeWidth="2.5" />
      <path className="draw" d="M600 450 V250" stroke="currentColor" strokeWidth="2.5" />
      <path className="draw" d="M520 250 A 40 30 0 0 1 600 250" stroke="currentColor" strokeWidth="2.5" />
      
      {/* Pipe connecting factory to silo */}
      <path className="draw" d="M410 300 H480 V220 H560 V250 M410 305 H475 V215 H565 V250" stroke="currentColor" strokeWidth="2" />
      <path className="draw" d="M440 297 L445 290 H435 Z" stroke="currentColor" strokeWidth="1" />
      
      {/* Safety Ladder on Silo */}
      <path className="draw" d="M610 450 V250 M620 450 V250" stroke="currentColor" strokeWidth="1" opacity="0.6" />
      <path className="draw" d="M610 440 h10 M610 430 h10 M610 420 h10 M610 410 h10 M610 400 h10 M610 390 h10 M610 380 h10 M610 370 h10 M610 360 h10 M610 350 h10 M610 340 h10 M610 330 h10 M610 320 h10 M610 310 h10 M610 300 h10 M610 290 h10 M610 280 h10 M610 270 h10 M610 260 h10" stroke="currentColor" strokeWidth="1" opacity="0.6" />
      <path className="draw" d="M610 400 A 10 10 0 0 1 610 380 M610 360 A 10 10 0 0 1 610 340 M610 320 A 10 10 0 0 1 610 300 M610 280 A 10 10 0 0 1 610 260" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <path className="draw" d="M628 400 V260" stroke="currentColor" strokeWidth="1" opacity="0.4" />

      {/* --- Heavy Tower Crane --- */}
      {/* Mast */}
      <path className="draw" d="M680 450 V80 M695 450 V80" stroke="currentColor" strokeWidth="2.5" />
      {/* Mast Lattice */}
      <path className="draw" d="M680 440 L695 425 L680 410 L695 395 L680 380 L695 365 L680 350 L695 335 L680 320 L695 305 L680 290 L695 275 L680 260 L695 245 L680 230 L695 215 L680 200 L695 185 L680 170 L695 155 L680 140 L695 125 L680 110 L695 95 L680 80" stroke="currentColor" strokeWidth="1" opacity="0.7" />
      {/* Cabin & Apex */}
      <path className="draw" d="M665 80 h15 v20 h-15 z" stroke="currentColor" strokeWidth="2" />
      <path className="draw" d="M680 80 L687 40 L695 80" stroke="currentColor" strokeWidth="2" />
      
      {/* Main Jib & Lattice */}
      <path className="draw" d="M665 90 L200 90 L210 100 L680 100" stroke="currentColor" strokeWidth="2.5" />
      <path className="draw" d="M665 90 L650 100 L635 90 L620 100 L605 90 L590 100 L575 90 L560 100 L545 90 L530 100 L515 90 L500 100 L485 90 L470 100 L455 90 L440 100 L425 90 L410 100 L395 90 L380 100 L365 90 L350 100 L335 90 L320 100 L305 90 L290 100 L275 90 L260 100 L245 90 L230 100 L215 90 L210 100" stroke="currentColor" strokeWidth="1" opacity="0.7" />
      
      {/* Counter Jib & Lattice */}
      <path className="draw" d="M695 90 L760 90 L755 100 L695 100" stroke="currentColor" strokeWidth="2.5" />
      <path className="draw" d="M695 90 L710 100 L725 90 L740 100 L755 90" stroke="currentColor" strokeWidth="1" opacity="0.7" />
      
      {/* Tie rods (Pendants) */}
      <path className="draw" d="M687 40 L350 90 M687 40 L500 90 M687 40 L760 90" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      
      {/* Trolley, Hoist, Load */}
      <path className="draw" d="M300 90 H320 V102 H300 Z" stroke="currentColor" strokeWidth="1.5" />
      <path className="draw" d="M310 102 V220" stroke="currentColor" strokeWidth="1" strokeDasharray="4 2" />
      <path className="draw" d="M305 220 A 5 5 0 1 0 315 220" stroke="currentColor" strokeWidth="1.5" />
      {/* Load: Heavy Steel Beam */}
      <path className="draw" d="M250 225 H370 V235 H250 Z" stroke="currentColor" strokeWidth="2" />
      <path className="draw" d="M260 225 V235 M360 225 V235 M310 225 V235" stroke="currentColor" strokeWidth="1" />

      {/* --- Architectural Dimensions & Gridlines --- */}
      <path className="draw" d="M40 470 V100" stroke="currentColor" strokeWidth="0.5" strokeDasharray="10 5" opacity="0.4" />
      <path className="draw" d="M40 450 A 2 2 0 1 1 39.9 450" stroke="currentColor" strokeWidth="1.5" />
      <path className="draw" d="M40 350 A 2 2 0 1 1 39.9 350" stroke="currentColor" strokeWidth="1.5" />
      <path className="draw" d="M40 200 A 2 2 0 1 1 39.9 200" stroke="currentColor" strokeWidth="1.5" />
      <path className="draw" d="M40 120 A 2 2 0 1 1 39.9 120" stroke="currentColor" strokeWidth="1.5" />
      
      {/* Horizontal Dimension lines */}
      <path className="draw" d="M90 480 H410" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
      <path className="draw" d="M90 475 V485 M245 475 V485 M400 475 V485" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
      
      {/* Blueprint Box */}
      <path className="draw" d="M650 470 H750 V495 H650 Z" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />

      {/* Text Elements */}
      <g className="fade-text" fill="currentColor" fontFamily="monospace" opacity="0">
        <text x="10" y="445" fontSize="10">EL +0.0</text>
        <text x="10" y="345" fontSize="10">EL +10.0</text>
        <text x="10" y="195" fontSize="10">EL +25.0</text>
        <text x="10" y="115" fontSize="10">EL +33.0</text>
        
        <text x="145" y="495" fontSize="10">BAY 1: 15500</text>
        <text x="300" y="495" fontSize="10">BAY 2: 15500</text>
        
        <text x="660" y="482" fontSize="8">DWG: STR-001</text>
        <text x="660" y="492" fontSize="8">REV: A1</text>
      </g>
    </svg>
  )
}
