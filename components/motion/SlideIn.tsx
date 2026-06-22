'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type Props = {
  children: React.ReactNode
  className?: string
  /** Which side to enter from */
  from?: 'left' | 'right' | 'bottom' | 'top'
  delay?: number
  distance?: number
}

/**
 * Animates a single element sliding in from the specified direction when it
 * enters the viewport. Perfect for headings, images, and feature panels.
 */
export function SlideIn({
  children,
  className = '',
  from = 'bottom',
  delay = 0,
  distance = 56,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const fromVars: gsap.TweenVars = { opacity: 0 }
    if (from === 'left')   fromVars.x = -distance
    if (from === 'right')  fromVars.x = distance
    if (from === 'bottom') fromVars.y = distance
    if (from === 'top')    fromVars.y = -distance

    gsap.set(el, fromVars)

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      onEnter: () => {
        gsap.to(el, {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 1.1,
          ease: 'expo.out',
          delay,
        })
      },
    })

    return () => trigger.kill()
  }, [from, delay, distance])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
