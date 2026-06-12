'use client'

import React, { useRef, useCallback } from 'react'

type Props = {
  children: React.ReactNode
  className?: string
  strength?: number
  as?: 'button' | 'a'
  href?: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  'aria-label'?: string
}

export function MagneticButton({
  children,
  className = '',
  strength = 0.3,
  as: Tag = 'button',
  href,
  onClick,
  type = 'button',
  disabled,
  'aria-label': ariaLabel,
}: Props) {
  const ref = useRef<HTMLButtonElement & HTMLAnchorElement>(null)

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current
      if (!el) return

      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (prefersReduced) return

      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2

      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`
    },
    [strength]
  )

  const handleMouseLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    el.style.transform = 'translate(0, 0)'
    el.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
  }, [])

  const handleMouseEnter = useCallback(() => {
    const el = ref.current
    if (!el) return
    el.style.transition = 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
  }, [])

  const props = {
    ref,
    className,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    onMouseEnter: handleMouseEnter,
    onClick,
    'aria-label': ariaLabel,
    ...(Tag === 'button' ? { type, disabled } : { href }),
  }

  const AnyTag = Tag as 'button'
  return (
    <AnyTag {...(props as React.ComponentPropsWithRef<'button'>)}>{children}</AnyTag>
  )
}
