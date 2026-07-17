'use client'

// Entry point for the scroll-linked WebGL construction scene. Owns the guards
// that keep it cheap and safe at 1M-user scale:
//   - lazy-mounts three.js only when the section nears the viewport,
//   - runs the render loop only while the section is actually on screen,
//   - falls back to a static poster on no-WebGL / context-loss / kill-switch.

import { useEffect, useRef, useState } from 'react'
import { Scene } from './building/lazyScene'
import { ScenePoster } from './building/ScenePoster'
import type { SceneProps } from './building/types'

export type { SceneProps as BuildingTowerWebGLProps } from './building/types'

function webglSupported(): boolean {
  if (typeof document === 'undefined') return false
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl') || c.getContext('experimental-webgl'))
  } catch {
    return false
  }
}

function useDebugFlag(): boolean {
  const [on, setOn] = useState(false)
  useEffect(() => {
    setOn(new URLSearchParams(window.location.search).has('debug3d'))
  }, [])
  return on
}

// Ops kill-switch: set NEXT_PUBLIC_SCENE_V2=0 to serve the poster everywhere.
const SCENE_ENABLED = process.env.NEXT_PUBLIC_SCENE_V2 !== '0' && process.env.NEXT_PUBLIC_SCENE_V2 !== 'false'

export default function BuildingTowerWebGL(props: SceneProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false) // three.js loaded in
  const [active, setActive] = useState(false) // section on screen → render loop on
  const [crashed, setCrashed] = useState(false)
  const [supported, setSupported] = useState(true)
  const debug = useDebugFlag()

  useEffect(() => {
    setSupported(webglSupported())
  }, [])

  useEffect(() => {
    if (!SCENE_ENABLED) return
    const el = containerRef.current
    if (!el) return

    // Mount once the section is within ~1 viewport; keep it mounted thereafter.
    const mountObs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setMounted(true)
          mountObs.disconnect()
        }
      },
      { rootMargin: '100% 0px' },
    )
    // Drive the render loop only while any part is actually visible.
    const activeObs = new IntersectionObserver((entries) => setActive(entries.some((e) => e.isIntersecting)), {
      threshold: 0,
    })
    mountObs.observe(el)
    activeObs.observe(el)
    return () => {
      mountObs.disconnect()
      activeObs.disconnect()
    }
  }, [])

  const showPoster = !SCENE_ENABLED || !supported || crashed || !mounted

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'relative' }}>
      {SCENE_ENABLED && supported && !crashed && mounted && (
        <Scene {...props} active={active} debug={debug} onContextLost={() => setCrashed(true)} />
      )}
      {showPoster && (
        <div style={{ position: 'absolute', inset: 0 }}>
          <ScenePoster dim={SCENE_ENABLED && supported && !crashed} />
        </div>
      )}
    </div>
  )
}
