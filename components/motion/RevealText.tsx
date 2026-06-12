'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type Props = {
  children: React.ReactNode
  as?: keyof JSX.IntrinsicElements
  className?: string
  delay?: number
  stagger?: number
  scrub?: boolean
}

export function RevealText({
  children,
  as: Tag = 'div',
  className = '',
  delay = 0,
  stagger = 0.06,
  scrub = false,
}: Props) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const lines = el.querySelectorAll<HTMLElement>('[data-line]')
    if (!lines.length) return

    gsap.set(lines, { y: '100%', opacity: 0 })

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(lines, {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
          stagger,
          delay,
        })
      },
    })

    return () => trigger.kill()
  }, [delay, stagger, scrub])

  return (
    // @ts-expect-error dynamic tag
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}

export function RevealLine({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <span className={`block overflow-hidden ${className}`}>
      <span className="block" data-line>
        {children}
      </span>
    </span>
  )
}
