'use client'

import { useMotionValue } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { PerformanceMonitor } from '@react-three/drei'
import * as THREE from 'three'
import { Building } from './Building'
import { TowerCrane } from './TowerCrane'
import { GroundMachines } from './GroundMachines'
import { FoundationWorks } from './FoundationWorks'
import { Lighting } from './Lighting'
import { Ground } from './Ground'
import { Effects } from './Effects'
import { CameraRig } from './CameraRig'
import { BUILDINGS } from './constants'
import { disposeTextures } from './textures'
import { useQuality } from './useQuality'
import { reportSceneEvent } from './analytics'
import type { QualitySettings, SceneProps } from './types'

interface BuildingSceneProps extends SceneProps {
  /** section is in the viewport — drives the render loop on/off */
  active?: boolean
  /** the WebGL context was lost — parent swaps to the poster */
  onContextLost?: () => void
  debug?: boolean
}

/** Reads renderer stats each frame and reports them up (throttled) for the HUD. */
function DebugSampler({ onSample }: { onSample: (s: { fps: number; calls: number; tris: number }) => void }) {
  const gl = useThree((s) => s.gl)
  const acc = useRef({ frames: 0, t: 0, last: 0 })
  useFrame((_, delta) => {
    const a = acc.current
    a.frames++
    a.t += delta
    if (a.t >= 0.5) {
      onSample({
        fps: Math.round(a.frames / a.t),
        calls: gl.info.render.calls,
        tris: gl.info.render.triangles,
      })
      a.frames = 0
      a.t = 0
    }
  })
  return null
}

/** Frees the shared singleton textures when the scene is torn down for good. */
function TextureCleanup() {
  useEffect(() => () => disposeTextures(), [])
  return null
}

/**
 * Drives the render loop from the `active` flag via the reliable imperative API
 * (toggling the Canvas `frameloop` prop alone doesn't restart r3f's loop). While
 * on-screen: render continuously (idle crane/beacon/machine motion + camera damp).
 * Off-screen: 'never' → zero GPU work.
 */
function FrameloopController({ active }: { active: boolean }) {
  const setFrameloop = useThree((s) => s.setFrameloop)
  const invalidate = useThree((s) => s.invalidate)
  useEffect(() => {
    setFrameloop(active ? 'always' : 'never')
    if (active) invalidate()
  }, [active, setFrameloop, invalidate])
  return null
}

export default function BuildingScene({
  progress,
  isMobile,
  paused,
  active = true,
  onContextLost,
  debug = false,
}: BuildingSceneProps) {
  const staticProgress = useMotionValue(1)
  const animatedProgress = paused ? staticProgress : progress
  const baseQuality = useQuality(isMobile)

  // Adaptive degradation: PerformanceMonitor steps this down live under load.
  const [quality, setQuality] = useState<QualitySettings>(baseQuality)
  useEffect(() => setQuality(baseQuality), [baseQuality])

  // Report the tier each device actually resolves to.
  useEffect(() => {
    reportSceneEvent({ event: 'scene_tier_selected', tier: baseQuality.tier, dpr: baseQuality.dpr })
  }, [baseQuality.tier, baseQuality.dpr])

  const [hud, setHud] = useState({ fps: 0, calls: 0, tris: 0 })

  const dropTier = () => {
    setQuality((q) => {
      if (q.tier === 'high') {
        reportSceneEvent({ event: 'scene_tier_degraded', from: 'high', to: 'mid' })
        return { ...q, tier: 'mid', ao: false, softShadows: false, dpr: Math.min(q.dpr, 1.5) }
      }
      if (q.tier === 'mid') {
        reportSceneEvent({ event: 'scene_tier_degraded', from: 'mid', to: 'low' })
        return { ...q, tier: 'low', postprocessing: false, shadows: false, dpr: 1 }
      }
      return q
    })
  }

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Canvas
        shadows={quality.shadows}
        dpr={quality.dpr}
        camera={{ position: [56, 40, 53], fov: isMobile ? 40 : 32, near: 0.5, far: 400 }}
        gl={{ antialias: !quality.postprocessing, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.0 }}
        onCreated={({ gl }) => {
          const canvas = gl.domElement
          canvas.addEventListener(
            'webglcontextlost',
            (e) => {
              e.preventDefault()
              reportSceneEvent({ event: 'scene_context_lost' })
              onContextLost?.()
            },
            { once: true },
          )
        }}
      >
        <FrameloopController active={active} />
        <PerformanceMonitor onDecline={dropTier} flipflops={3} onFallback={dropTier} />

        <CameraRig isMobile={isMobile} progress={animatedProgress} paused={paused} />

        <Lighting quality={quality} />
        {/* warm paper-white fog matched to the page so far edges melt away (no horizon) */}
        <fog attach="fog" args={['#fdfcfa', 90, 300]} />

        <Ground quality={quality} />

        <group>
          {BUILDINGS.map((b) => (
            <Building
              key={b.id}
              position={b.position}
              config={b.config}
              progress={animatedProgress}
              progressStart={b.progressStart}
              progressEnd={b.progressEnd}
              glassTint={b.glassTint}
              quality={quality}
            />
          ))}
        </group>

        <FoundationWorks progress={animatedProgress} />

        <TowerCrane progress={animatedProgress} position={[-16, 0, 2]} baseYaw={0.23} detail={quality.craneDetail} />

        <GroundMachines progress={animatedProgress} full={quality.fullMachines} />

        {quality.postprocessing && <Effects ao={quality.ao} />}

        {debug && <DebugSampler onSample={setHud} />}
        <TextureCleanup />
      </Canvas>

      {debug && (
        <div
          style={{
            position: 'absolute',
            top: 8,
            left: 8,
            padding: '6px 9px',
            font: '11px/1.4 ui-monospace, monospace',
            color: '#0c7a88',
            background: 'rgba(255,255,255,0.86)',
            border: '1px solid rgba(22,168,184,0.3)',
            borderRadius: 6,
            pointerEvents: 'none',
            whiteSpace: 'pre',
          }}
        >
          {`tier  ${quality.tier}\nfps   ${hud.fps}\ncalls ${hud.calls}\ntris  ${hud.tris.toLocaleString()}\npost  ${quality.postprocessing ? (quality.ao ? 'bloom+ssao' : 'bloom') : 'off'}`}
        </div>
      )}
    </div>
  )
}
