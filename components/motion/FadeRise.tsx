'use client'

import { useRef, useEffect } from 'react'
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
  stagger = 0.06,
  delay = 0,
  y = 20,
  as: Tag = 'div',
}: FadeRiseProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const container = ref.current
    if (!container) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const items = Array.from(container.children)
    if (!items.length) return

    gsap.set(items, { opacity: 0, y })

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: 'top 90%',
      onEnter: () => {
        gsap.to(items, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
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

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    gsap.set(el, { opacity: 0, y: 20 })

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      onEnter: () => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
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
