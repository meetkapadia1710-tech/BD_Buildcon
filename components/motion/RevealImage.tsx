'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type Props = {
  src: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  className?: string
  wrapperClassName?: string
  priority?: boolean
  sizes?: string
  delay?: number
  parallax?: boolean
}

export function RevealImage({
  src,
  alt,
  width,
  height,
  fill = false,
  className = '',
  wrapperClassName = '',
  priority = false,
  sizes,
  delay = 0,
  parallax = false,
}: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrapper = wrapperRef.current
    const inner = imgRef.current
    if (!wrapper || !inner) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    gsap.set(wrapper, { clipPath: 'inset(100% 0 0 0)' })
    gsap.set(inner, { scale: 1.1, transformOrigin: 'center center' })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapper,
        start: 'top 85%',
      },
      delay,
    })

    tl.to(wrapper, {
      clipPath: 'inset(0% 0 0 0)',
      duration: 1.2,
      ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
    }).to(
      inner,
      {
        scale: 1,
        duration: 1.2,
        ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      '<'
    )

    if (parallax) {
      ScrollTrigger.create({
        trigger: wrapper,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          gsap.set(inner, { y: self.progress * -40 })
        },
      })
    }

    return () => { tl.kill() }
  }, [delay, parallax])

  return (
    <div ref={wrapperRef} className={`overflow-hidden ${wrapperClassName}`}>
      <div ref={imgRef} className="w-full h-full">
        <Image
          src={src}
          alt={alt}
          width={fill ? undefined : width}
          height={fill ? undefined : height}
          fill={fill}
          className={className}
          priority={priority}
          sizes={sizes}
        />
      </div>
    </div>
  )
}
