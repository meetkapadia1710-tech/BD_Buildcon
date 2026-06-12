'use client'

import { useRef, useEffect, Children, cloneElement, isValidElement } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type FadeRiseProps = {
  children: React.ReactNode
  className?: string
  stagger?: number
  delay?: number
  y?: number
  as?: keyof JSX.IntrinsicElements
}

export function FadeRise({
  children,
  className = '',
  stagger = 0.12,
  delay = 0,
  y = 24,
  as: Tag = 'div',
}: FadeRiseProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const container = ref.current
    if (!container) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const items = container.children
    if (!items.length) return

    gsap.set(items, { opacity: 0, y })

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(items, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
          stagger,
          delay,
        })
      },
    })

    return () => trigger.kill()
  }, [stagger, delay, y])

  return (
    // @ts-expect-error dynamic tag
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}

type FadeRiseItemProps = {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function FadeRiseItem({ children, className = '', delay = 0 }: FadeRiseItemProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    gsap.set(el, { opacity: 0, y: 24 })

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      onEnter: () => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
          delay,
        })
      },
    })

    return () => trigger.kill()
  }, [delay])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
