'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export function SmoothCursor() {
  const dotRef      = useRef<HTMLDivElement>(null)
  const ringRef     = useRef<HTMLDivElement>(null)
  const hoveredRef  = useRef(false)
  const [visible, setVisible]   = useState(false)
  const [hovered, setHovered]   = useState(false)
  const [isInput,  setIsInput]  = useState(false)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return

    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    gsap.set(dot,  { xPercent: -50, yPercent: -50, x: -100, y: -100 })
    gsap.set(ring, { xPercent: -50, yPercent: -50, x: -100, y: -100 })

    const setDotX  = gsap.quickTo(dot,  'x', { duration: 0.02, ease: 'none' })
    const setDotY  = gsap.quickTo(dot,  'y', { duration: 0.02, ease: 'none' })
    const setRingX = gsap.quickTo(ring, 'x', { duration: 0.15, ease: 'power2.out' })
    const setRingY = gsap.quickTo(ring, 'y', { duration: 0.15, ease: 'power2.out' })

    const onMouseMove = (e: MouseEvent) => {
      setVisible(true)
      setDotX(e.clientX)
      setDotY(e.clientY)
      setRingX(e.clientX)
      setRingY(e.clientY)
    }

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target) return

      const isText = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' ||
        target.isContentEditable || !!target.closest('input, textarea, [contenteditable="true"]')

      if (isText) { setIsInput(true); return }

      if (target.closest('a, button, select, option, [role="button"], .clickable')) {
        hoveredRef.current = true
        setHovered(true)
        setIsInput(false)
      }
    }

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target) return

      const isText = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' ||
        target.isContentEditable || !!target.closest('input, textarea, [contenteditable="true"]')

      if (isText) setIsInput(false)

      if (target.closest('a, button, select, option, [role="button"], .clickable')) {
        hoveredRef.current = false
        setHovered(false)
      }
    }

    // Use ref so these handlers don't need hovered in their closure
    const onMouseDown = () => gsap.to(ring, { scale: 0.75, duration: 0.15 })
    const onMouseUp   = () => gsap.to(ring, { scale: hoveredRef.current ? 1.8 : 1, duration: 0.2 })

    window.addEventListener('mousemove',  onMouseMove,        { passive: true })
    document.addEventListener('mouseover',  onMouseOver)
    document.addEventListener('mouseout',   onMouseOut)
    window.addEventListener('mousedown',  onMouseDown)
    window.addEventListener('mouseup',    onMouseUp)
    document.addEventListener('mouseleave', () => setVisible(false))
    document.addEventListener('mouseenter', () => setVisible(true))

    return () => {
      window.removeEventListener('mousemove',  onMouseMove)
      document.removeEventListener('mouseover',  onMouseOver)
      document.removeEventListener('mouseout',   onMouseOut)
      window.removeEventListener('mousedown',  onMouseDown)
      window.removeEventListener('mouseup',    onMouseUp)
    }
  }, []) // runs once — hoveredRef keeps mouseup handler in sync without re-subscribing

  return (
    <>
      {/*
        Both elements use mix-blend-mode: difference with white color.
        Result = |white − background| — so the cursor always inverts
        whatever is beneath it and is never camouflaged.
        White bg  → black cursor
        Dark bg   → white cursor
        Teal bg   → orange/amber cursor
      */}

      {/* Outer ring — teal border + white shadow halo so it separates from teal backgrounds */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none rounded-full z-[600]"
        style={{
          width: 32,
          height: 32,
          border: '1.5px solid #16A8B8',
          boxShadow: '0 0 0 1.5px white',
          opacity: visible && !isInput ? 0.85 : 0,
          backgroundColor: hovered ? 'rgba(22,168,184,0.12)' : 'transparent',
          transform: hovered ? 'scale(1.8)' : 'scale(1)',
          transition: 'opacity 0.25s, background-color 0.25s, transform 0.25s ease-out',
          willChange: 'transform',
        }}
      />

      {/* Center dot — teal fill + white halo */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none rounded-full z-[601]"
        style={{
          width: 6,
          height: 6,
          backgroundColor: '#16A8B8',
          boxShadow: '0 0 0 1.5px white, 0 0 8px rgba(22,168,184,0.7)',
          opacity: visible && !isInput && !hovered ? 1 : 0,
          transition: 'opacity 0.25s',
          willChange: 'transform',
        }}
      />
    </>
  )
}
