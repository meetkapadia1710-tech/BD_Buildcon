/**
 * Minimal, dependency-free scene telemetry. Pushes to the standard GTM/GA
 * `window.dataLayer` when present and no-ops otherwise, so "1M users will see
 * this" becomes a measured claim: which tier they actually got, how often WebGL
 * was unavailable, and how often the context was lost mid-session.
 */
type SceneEvent =
  | { event: 'scene_tier_selected'; tier: string; dpr: number }
  | { event: 'scene_context_lost' }
  | { event: 'scene_fallback_served'; reason: 'no_webgl' | 'context_lost' | 'disabled' }
  | { event: 'scene_tier_degraded'; from: string; to: string }

export function reportSceneEvent(payload: SceneEvent) {
  if (typeof window === 'undefined') return
  const w = window as unknown as { dataLayer?: unknown[] }
  try {
    w.dataLayer = w.dataLayer || []
    w.dataLayer.push(payload)
  } catch {
    // telemetry must never break the scene
  }
}
