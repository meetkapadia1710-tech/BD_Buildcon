'use client'

import React, { useRef, useCallback } from 'react'

type BaseProps = {
  children: React.ReactNode
  className?: string
  strength?: number
  onClick?: () => void
  'aria-label'?: string
}

type ButtonVariant = BaseProps & {
  as?: 'button'
  href?: never
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

type AnchorVariant = BaseProps & {
  as: 'a'
  href: string
  type?: never
  disabled?: never
}

type Props = ButtonVariant | AnchorVariant

export function MagneticButton(props: Props) {
  const { children, className = '', strength = 0.3, as: Tag = 'button', onClick, 'aria-label': ariaLabel } = props

  const ref = useRef<HTMLElement>(null)

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
    [strength],
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

  const sharedProps = {
    className,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    onMouseEnter: handleMouseEnter,
    onClick,
    'aria-label': ariaLabel,
  }

  if (Tag === 'a') {
    return (
      <a ref={ref as React.Ref<HTMLAnchorElement>} href={(props as AnchorVariant).href} {...sharedProps}>
        {children}
      </a>
    )
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={(props as ButtonVariant).type ?? 'button'}
      disabled={(props as ButtonVariant).disabled}
      {...sharedProps}
    >
      {children}
    </button>
  )
}
