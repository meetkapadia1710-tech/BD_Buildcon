'use client'

import { useEffect, useMemo } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import {
  EffectComposer,
  RenderPass,
  NormalPass,
  EffectPass,
  BloomEffect,
  VignetteEffect,
  SMAAEffect,
  SSAOEffect,
  ToneMappingEffect,
  ToneMappingMode,
  KernelSize,
} from 'postprocessing'

interface EffectsProps {
  /** add the SSAO pass (desktop-class tier only) */
  ao?: boolean
}

/**
 * Cinematic postprocessing (Scene gates whether this mounts at all).
 *
 * Driven by the vanilla `postprocessing` composer rather than
 * @react-three/postprocessing (whose bundled effects statically import a class
 * three r172+ removed). Passes, in order:
 *   - RenderPass (+ NormalPass when AO is on)
 *   - SSAO   — darkens junctions so geometry reads solid (the single biggest
 *              "is this a render or a toy" lever for architectural scenes)
 *   - Bloom  — disciplined; only the crane beacon + hot sun glints cross threshold
 *   - AgX tone mapping — handles bright white scenes with less highlight skew
 *              than ACES and reads more editorial
 *   - Vignette + SMAA
 *
 * While the composer is active the scene renders to a linear HDR target, so tone
 * mapping moves off the renderer (NoToneMapping) and onto the ToneMappingEffect.
 */
export function Effects({ ao = false }: EffectsProps) {
  const gl = useThree((s) => s.gl)
  const scene = useThree((s) => s.scene)
  const camera = useThree((s) => s.camera)
  const size = useThree((s) => s.size)

  const composer = useMemo(() => {
    const c = new EffectComposer(gl, { frameBufferType: THREE.HalfFloatType, multisampling: 0 })
    c.addPass(new RenderPass(scene, camera))

    const effects = []

    if (ao) {
      try {
        const normalPass = new NormalPass(scene, camera)
        c.addPass(normalPass)
        const ssao = new SSAOEffect(camera, normalPass.texture, {
          samples: 16,
          rings: 4,
          luminanceInfluence: 0.55,
          radius: 0.09,
          intensity: 2.0,
          bias: 0.03,
          fade: 0.02,
          resolutionScale: 0.75,
          color: new THREE.Color('#20252c'),
          worldDistanceThreshold: 40,
          worldDistanceFalloff: 6,
          worldProximityThreshold: 0.5,
          worldProximityFalloff: 0.2,
        })
        effects.push(ssao)
      } catch {
        // SSAO construction can be version-sensitive; degrade to no-AO rather than
        // taking the whole scene down.
      }
    }

    const bloom = new BloomEffect({
      intensity: 0.6,
      luminanceThreshold: 1.0,
      luminanceSmoothing: 0.25,
      mipmapBlur: true,
      kernelSize: KernelSize.LARGE,
    })
    const tone = new ToneMappingEffect({ mode: ToneMappingMode.AGX })
    const vignette = new VignetteEffect({ offset: 0.3, darkness: 0.4 })
    const smaa = new SMAAEffect()

    effects.push(bloom, tone, vignette, smaa)
    c.addPass(new EffectPass(camera, ...effects))
    return c
  }, [gl, scene, camera, ao])

  useEffect(() => {
    composer.setSize(size.width, size.height)
  }, [composer, size])

  useEffect(() => {
    const prev = gl.toneMapping
    gl.toneMapping = THREE.NoToneMapping
    return () => {
      gl.toneMapping = prev
      composer.dispose()
    }
  }, [gl, composer])

  // Render priority > 0 hands us the loop; building/crane useFrame (priority 0)
  // still update meshes first.
  useFrame(() => {
    composer.render()
  }, 1)

  return null
}
