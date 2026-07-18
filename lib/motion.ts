/** Cubic-bezier easing curves — use with GSAP (pass as array) or CSS (use string form). */
export const EASE = {
  out: [0.16, 1, 0.3, 1] as [number, number, number, number],
  inOut: [0.65, 0, 0.35, 1] as [number, number, number, number],
  soft: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
  /** GSAP named shorthand for components that take a string */
  outStr: 'power3.out',
  inOutStr: 'power2.inOut',
  softStr: 'power2.out',
} as const

/** Duration tiers in seconds */
export const DUR = {
  micro: 0.25,
  base: 0.6,
  slow: 0.9,
  cine: 1.2,
} as const

/** Stagger delay tiers in seconds */
export const STAGGER = {
  tight: 0.06,
  base: 0.1,
  loose: 0.16,
} as const
