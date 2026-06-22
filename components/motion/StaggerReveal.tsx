'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type Props = {
  children: React.ReactNode
  className?: string
  /** Direction from which child cards enter */
  direction?: 'up' | 'down' | 'left' | 'right'
  /** Stagger delay between each child */
  stagger?: number
  /** Y distance to travel (for up/down) */
  distance?: number
  delay?: number
}

/**
 * Wraps a grid/list of children and staggers them in with a cinematic entrance.
 * Uses GSAP ScrollTrigger — plays once when the container enters the viewport.
 */
export function StaggerReveal({
  children,
  className = '',
  direction = 'up',
  stagger = 0.1,
  distance = 48,
  delay = 0,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = ref.current
    if (!container) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const items = Array.from(container.children) as HTMLElement[]
    if (!items.length) return

    const fromVars: gsap.TweenVars = { opacity: 0 }
    if (direction === 'up')    { fromVars.y = distance }
    if (direction === 'down')  { fromVars.y = -distance }
    if (direction === 'left')  { fromVars.x = distance }
    if (direction === 'right') { fromVars.x = -distance }

    gsap.set(items, { ...fromVars, scale: 0.97 })

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: 'top 82%',
      onEnter: () => {
        gsap.to(items, {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: 'expo.out',
          stagger,
          delay,
        })
      },
    })

    return () => trigger.kill()
  }, [direction, stagger, distance, delay])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
