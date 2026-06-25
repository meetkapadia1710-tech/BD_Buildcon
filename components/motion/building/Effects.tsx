'use client'

import { useEffect, useMemo } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import {
  EffectComposer,
  RenderPass,
  EffectPass,
  BloomEffect,
  VignetteEffect,
  SMAAEffect,
  ToneMappingEffect,
  ToneMappingMode,
  KernelSize,
} from 'postprocessing'

/**
 * Cinematic postprocessing (desktop only — Scene gates whether this mounts).
 *
 * Uses the vanilla `postprocessing` library directly rather than
 * @react-three/postprocessing: the React wrapper's bundled N8AO/SSR effects
 * statically import `WebGLMultipleRenderTargets`, which three r172+ removed, so
 * it won't build against three 0.184. Driving the composer by hand sidesteps that
 * and gives a real HDR bloom pass.
 *
 * Tone mapping: while the composer is active the scene renders to a linear HDR
 * target, so we move ACES off the renderer and onto a ToneMappingEffect to avoid
 * double tone mapping. The mobile path (no composer) keeps ACES on the renderer.
 */
export function Effects() {
  const gl = useThree((s) => s.gl)
  const scene = useThree((s) => s.scene)
  const camera = useThree((s) => s.camera)
  const size = useThree((s) => s.size)

  const composer = useMemo(() => {
    const c = new EffectComposer(gl, { frameBufferType: THREE.HalfFloatType, multisampling: 0 })
    c.addPass(new RenderPass(scene, camera))
    const bloom = new BloomEffect({
      intensity: 0.7,
      luminanceThreshold: 0.9,
      luminanceSmoothing: 0.25,
      mipmapBlur: true,
      kernelSize: KernelSize.LARGE,
    })
    const tone = new ToneMappingEffect({ mode: ToneMappingMode.ACES_FILMIC })
    const vignette = new VignetteEffect({ offset: 0.3, darkness: 0.42 })
    const smaa = new SMAAEffect()
    c.addPass(new EffectPass(camera, bloom, tone, vignette, smaa))
    return c
  }, [gl, scene, camera])

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

  // Render priority > 0 hands the render loop to us; building/crane useFrame
  // callbacks (priority 0) still run first to update the meshes.
  useFrame(() => {
    composer.render()
  }, 1)

  return null
}
