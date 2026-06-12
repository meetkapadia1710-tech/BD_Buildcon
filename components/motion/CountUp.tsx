'use client'

import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type Props = {
  target: number
  prefix?: string
  suffix?: string
  duration?: number
  className?: string
  decimals?: number
}

export function CountUp({
  target,
  prefix = '',
  suffix = '',
  duration = 2.2,
  className = '',
  decimals = 0,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const obj = useRef({ val: 0 })

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      el.textContent = `${prefix}${target}${suffix}`
      return
    }

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        gsap.to(obj.current, {
          val: target,
          duration,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = `${prefix}${obj.current.val.toFixed(decimals)}${suffix}`
          },
        })
      },
    })

    return () => trigger.kill()
  }, [target, prefix, suffix, duration, decimals])

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  )
}
