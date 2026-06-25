/** Smooth Hermite ramp between two edges, clamped to 0..1. */
export function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)))
  return t * t * (3 - 2 * t)
}

/**
 * Presence of a staged element across scroll progress `p`.
 * Ramps 0→1 over [appear, full], holds at 1, then ramps 1→0 over [fadeStart, gone].
 * Returns 0 outside the band so the element can be hidden entirely.
 */
export function stageFactor(p: number, appear: number, full: number, fadeStart: number, gone: number): number {
  if (p <= appear || p >= gone) return 0
  const up = smoothstep(appear, full, p)
  const down = 1 - smoothstep(fadeStart, gone, p)
  return Math.min(up, down)
}

/** A machine's active scroll window: [appear, full, fadeStart, gone]. */
export type StageBand = [number, number, number, number]
