import * as THREE from 'three'

/**
 * Procedural, runtime-generated textures — no network fetch, no asset files.
 * Everything here is drawn once onto an offscreen <canvas> and shared as a
 * singleton, so the whole scene pays for it exactly once. Guarded for SSR: the
 * scene only ever mounts client-side (dynamic import, ssr:false), but the guard
 * keeps module import safe if that ever changes.
 */

const hasDOM = typeof document !== 'undefined'

/** Small deterministic PRNG so textures are stable across reloads. */
function mulberry32(seed: number) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

let _concreteRoughness: THREE.Texture | null = null

/**
 * Subtle grey-noise roughness/albedo breakup for concrete surfaces. Tiling,
 * low-contrast — just enough to kill the flat "clay render" look on big faces.
 */
export function concreteRoughnessMap(): THREE.Texture | null {
  if (!hasDOM) return null
  if (_concreteRoughness) return _concreteRoughness

  const size = 256
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = size
  const ctx = canvas.getContext('2d')!
  const rand = mulberry32(1337)

  // base mid-grey
  ctx.fillStyle = '#808080'
  ctx.fillRect(0, 0, size, size)

  // fine speckle
  const img = ctx.getImageData(0, 0, size, size)
  const d = img.data
  for (let i = 0; i < d.length; i += 4) {
    const n = (rand() - 0.5) * 46
    d[i] = Math.max(0, Math.min(255, d[i] + n))
    d[i + 1] = d[i]
    d[i + 2] = d[i]
  }
  ctx.putImageData(img, 0, 0)

  // a few soft form-tie / pour-line streaks for structure
  ctx.globalAlpha = 0.06
  for (let i = 0; i < 8; i++) {
    ctx.strokeStyle = rand() > 0.5 ? '#ffffff' : '#404040'
    ctx.lineWidth = 1 + rand() * 2
    const y = rand() * size
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(size, y + (rand() - 0.5) * 12)
    ctx.stroke()
  }
  ctx.globalAlpha = 1

  const tex = new THREE.CanvasTexture(canvas)
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping
  tex.repeat.set(3, 3)
  tex.anisotropy = 4
  _concreteRoughness = tex
  return tex
}

let _sitePlan: THREE.Texture | null = null

/**
 * Radial "site plan" mat that seats the model on something without introducing a
 * hard horizon: a faint survey grid + access-road hint + teal setting-out marks,
 * fading to fully transparent at the rim so it melts into the page white.
 */
export function sitePlanTexture(): THREE.Texture | null {
  if (!hasDOM) return null
  if (_sitePlan) return _sitePlan

  const size = 1024
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = size
  const ctx = canvas.getContext('2d')!
  const c = size / 2

  ctx.clearRect(0, 0, size, size)

  // faint warm base disc
  const base = ctx.createRadialGradient(c, c, 0, c, c, c)
  base.addColorStop(0, 'rgba(222,216,206,0.55)')
  base.addColorStop(0.62, 'rgba(228,223,214,0.4)')
  base.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = base
  ctx.fillRect(0, 0, size, size)

  // survey grid
  ctx.strokeStyle = 'rgba(46,53,59,0.06)'
  ctx.lineWidth = 1
  const step = size / 26
  for (let i = 0; i <= 26; i++) {
    const p = i * step
    ctx.beginPath()
    ctx.moveTo(p, 0)
    ctx.lineTo(p, size)
    ctx.moveTo(0, p)
    ctx.lineTo(size, p)
    ctx.stroke()
  }

  // access road sweeping in from one edge
  ctx.strokeStyle = 'rgba(46,53,59,0.05)'
  ctx.lineWidth = 46
  ctx.beginPath()
  ctx.moveTo(size, c + 120)
  ctx.quadraticCurveTo(c + 130, c + 40, c + 10, c + 90)
  ctx.stroke()

  // teal setting-out markers (brand accent, sparse)
  ctx.fillStyle = 'rgba(22,168,184,0.5)'
  const rand = mulberry32(7)
  for (let i = 0; i < 10; i++) {
    const a = rand() * Math.PI * 2
    const r = 90 + rand() * (c * 0.62)
    const x = c + Math.cos(a) * r
    const y = c + Math.sin(a) * r
    ctx.beginPath()
    ctx.arc(x, y, 3.5, 0, Math.PI * 2)
    ctx.fill()
  }

  // rim vignette back to transparent (double-guard the grid against the edge)
  const rim = ctx.createRadialGradient(c, c, c * 0.55, c, c, c)
  rim.addColorStop(0, 'rgba(255,255,255,0)')
  rim.addColorStop(1, 'rgba(255,255,255,1)')
  ctx.globalCompositeOperation = 'destination-out'
  ctx.fillStyle = rim
  ctx.fillRect(0, 0, size, size)
  ctx.globalCompositeOperation = 'source-over'

  const tex = new THREE.CanvasTexture(canvas)
  tex.anisotropy = 4
  _sitePlan = tex
  return tex
}

/** Dispose the shared textures (called on final unmount by the Scene). */
export function disposeTextures() {
  _concreteRoughness?.dispose()
  _sitePlan?.dispose()
  _concreteRoughness = null
  _sitePlan = null
}
