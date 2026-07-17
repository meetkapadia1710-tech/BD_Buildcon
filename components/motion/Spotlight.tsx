'use client'

import React, { useRef, useCallback } from 'react'

type Props = {
  children: React.ReactNode
  className?: string
  /** Glow color — any valid CSS color/rgba string */
  color?: string
  /** Glow diameter in px */
  size?: number
}

/**
 * Wraps children in a card-like container with a soft radial glow that
 * follows the cursor. Uses direct DOM writes (not React state) on
 * mousemove so it stays cheap at 60fps.
 */
export function Spotlight({ children, className = '', color = 'rgba(22, 168, 184, 0.18)', size = 280 }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current
      const glow = glowRef.current
      if (!el || !glow) return
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      glow.style.transform = `translate(${x - size / 2}px, ${y - size / 2}px)`
    },
    [size],
  )

  const handleMouseEnter = useCallback(() => {
    if (glowRef.current) glowRef.current.style.opacity = '1'
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (glowRef.current) glowRef.current.style.opacity = '0'
  }, [])

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={glowRef}
        className="pointer-events-none absolute left-0 top-0 z-0 rounded-full opacity-0 transition-opacity duration-300"
        style={{
          width: size,
          height: size,
          background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
          filter: 'blur(20px)',
        }}
        aria-hidden="true"
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  )
}
