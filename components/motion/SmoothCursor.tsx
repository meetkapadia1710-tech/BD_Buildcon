'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export function SmoothCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [isInput, setIsInput] = useState(false)

  useEffect(() => {
    // Only run on mouse-capable devices
    if (!window.matchMedia('(pointer: fine)').matches) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    // Position setup
    gsap.set(dot, { xPercent: -50, yPercent: -50, x: -100, y: -100 })
    gsap.set(ring, { xPercent: -50, yPercent: -50, x: -100, y: -100 })

    // Quick setters for smooth animations
    const setDotX = gsap.quickTo(dot, 'x', { duration: 0.02, ease: 'none' })
    const setDotY = gsap.quickTo(dot, 'y', { duration: 0.02, ease: 'none' })
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

      // If hovering inputs, textareas, contenteditable elements, hide custom cursor and show browser text cursor
      const isText = 
        target.tagName === 'INPUT' || 
        target.tagName === 'TEXTAREA' || 
        target.isContentEditable || 
        target.closest('input, textarea, [contenteditable="true"]')

      if (isText) {
        setIsInput(true)
        return
      }

      // Check if hovering clickable/interactive elements
      const isClickable = target.closest('a, button, select, option, [role="button"], .clickable')
      if (isClickable) {
        setHovered(true)
        setIsInput(false)
      }
    }

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target) return

      const isText = 
        target.tagName === 'INPUT' || 
        target.tagName === 'TEXTAREA' || 
        target.isContentEditable || 
        target.closest('input, textarea, [contenteditable="true"]')

      if (isText) {
        setIsInput(false)
      }

      const isClickable = target.closest('a, button, select, option, [role="button"], .clickable')
      if (isClickable) {
        setHovered(false)
      }
    }

    const onMouseDown = () => {
      gsap.to(ring, { scale: 0.75, duration: 0.15 })
    }

    const onMouseUp = () => {
      gsap.to(ring, { scale: hovered ? 1.8 : 1, duration: 0.2 })
    }

    const onMouseLeaveWindow = () => {
      setVisible(false)
    }

    const onMouseEnterWindow = () => {
      setVisible(true)
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    document.addEventListener('mouseover', onMouseOver)
    document.addEventListener('mouseout', onMouseOut)
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)
    document.addEventListener('mouseleave', onMouseLeaveWindow)
    document.addEventListener('mouseenter', onMouseEnterWindow)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mouseout', onMouseOut)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      document.removeEventListener('mouseleave', onMouseLeaveWindow)
      document.removeEventListener('mouseenter', onMouseEnterWindow)
    }
  }, [hovered, isInput])

  return (
    <>
      {/* Outer Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none rounded-full border border-black z-[600]"
        style={{
          width: 32,
          height: 32,
          opacity: visible && !isInput ? 0.65 : 0,
          backgroundColor: hovered ? 'rgba(0, 0, 0, 0.08)' : 'transparent',
          transform: hovered ? 'scale(1.8)' : 'scale(1)',
          transition: 'opacity 0.25s, background-color 0.25s, transform 0.25s ease-out',
          willChange: 'transform',
        }}
      />

      {/* Center Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none rounded-full bg-black z-[601]"
        style={{
          width: 6,
          height: 6,
          opacity: visible && !isInput && !hovered ? 1 : 0,
          transition: 'opacity 0.25s',
          willChange: 'transform',
        }}
      />
    </>
  )
}
