'use client'

import { useEffect, useMemo, useRef } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { MotionValue } from 'framer-motion'
import * as THREE from 'three'

interface CameraRigProps {
  isMobile: boolean
  progress: MotionValue<number>
  /** reduced-motion / paused: hold the final wide framing, no dolly */
  paused?: boolean
}

interface Key {
  p: number
  pos: [number, number, number]
  target: [number, number, number]
}

// Desktop cinematic path: low hero at the dig → orbit up through the structure →
// pull back and rise to the wide reveal at handover.
const DESKTOP_KEYS: Key[] = [
  { p: 0.0, pos: [40, 20, 46], target: [0, 5, -2] },
  { p: 0.4, pos: [50, 32, 41], target: [2, 13, -1] },
  { p: 0.75, pos: [58, 43, 50], target: [2, 17, -1] },
  { p: 1.0, pos: [56, 46, 56], target: [2, 16, -1] },
]

const smoothstep = (t: number) => {
  const x = t < 0 ? 0 : t > 1 ? 1 : t
  return x * x * (3 - 2 * x)
}

function sampleKeys(keys: Key[], p: number, outPos: THREE.Vector3, outTgt: THREE.Vector3) {
  if (p <= keys[0].p) {
    outPos.set(...keys[0].pos)
    outTgt.set(...keys[0].target)
    return
  }
  const last = keys[keys.length - 1]
  if (p >= last.p) {
    outPos.set(...last.pos)
    outTgt.set(...last.target)
    return
  }
  for (let i = 0; i < keys.length - 1; i++) {
    const a = keys[i]
    const b = keys[i + 1]
    if (p >= a.p && p <= b.p) {
      const t = smoothstep((p - a.p) / (b.p - a.p))
      outPos.set(
        THREE.MathUtils.lerp(a.pos[0], b.pos[0], t),
        THREE.MathUtils.lerp(a.pos[1], b.pos[1], t),
        THREE.MathUtils.lerp(a.pos[2], b.pos[2], t),
      )
      outTgt.set(
        THREE.MathUtils.lerp(a.target[0], b.target[0], t),
        THREE.MathUtils.lerp(a.target[1], b.target[1], t),
        THREE.MathUtils.lerp(a.target[2], b.target[2], t),
      )
      return
    }
  }
}

/**
 * Scroll-linked cinematic dolly. Keyframed camera positions are interpolated by
 * scroll progress and reached through a critically-damped follow so fast scrubbing
 * never snaps. Reduced-motion / paused holds the final wide framing.
 */
export function CameraRig({ isMobile, progress, paused = false }: CameraRigProps) {
  const { camera, size } = useThree()
  const targetPos = useMemo(() => new THREE.Vector3(), [])
  const targetLook = useMemo(() => new THREE.Vector3(), [])
  const curLook = useRef(new THREE.Vector3(2, 14, -1))

  // Mobile framing: pull back so the cluster stays in frame; mild progress rise.
  const mobileFrame = useMemo(() => {
    const multiplier = Math.max(1.06, Math.min(1.35, 0.86 + (768 - size.width) * 0.00055))
    return { multiplier }
  }, [size.width])

  // Seed a sensible starting pose so frame 1 isn't wild.
  useEffect(() => {
    const p = paused ? 1 : progress.get()
    if (isMobile) {
      const m = mobileFrame.multiplier
      const lookY = 14 + (m - 1) * 22
      camera.position.set(2 + 54 * m, lookY + 26 * m, -1 + 54 * m)
      curLook.current.set(2, lookY, -1)
    } else {
      sampleKeys(DESKTOP_KEYS, p, targetPos, targetLook)
      camera.position.copy(targetPos)
      curLook.current.copy(targetLook)
    }
    camera.lookAt(curLook.current)
    camera.updateProjectionMatrix()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [camera, isMobile, mobileFrame.multiplier])

  useFrame((_, delta) => {
    if (isMobile) {
      // Mobile: gentle scroll rise only (keeps cost trivial, avoids motion sickness).
      const m = mobileFrame.multiplier
      const p = paused ? 1 : progress.get()
      const lookY = 14 + (m - 1) * 22 + p * 3
      targetPos.set(2 + 54 * m, lookY + 26 * m, -1 + 54 * m)
      targetLook.set(2, lookY, -1)
    } else {
      const p = paused ? 1 : progress.get()
      sampleKeys(DESKTOP_KEYS, p, targetPos, targetLook)
    }

    // Critically-damped follow (frame-rate independent).
    const lambda = paused ? 0 : 3.2
    if (lambda > 0) {
      camera.position.x = THREE.MathUtils.damp(camera.position.x, targetPos.x, lambda, delta)
      camera.position.y = THREE.MathUtils.damp(camera.position.y, targetPos.y, lambda, delta)
      camera.position.z = THREE.MathUtils.damp(camera.position.z, targetPos.z, lambda, delta)
      curLook.current.x = THREE.MathUtils.damp(curLook.current.x, targetLook.x, lambda, delta)
      curLook.current.y = THREE.MathUtils.damp(curLook.current.y, targetLook.y, lambda, delta)
      curLook.current.z = THREE.MathUtils.damp(curLook.current.z, targetLook.z, lambda, delta)
    } else {
      camera.position.copy(targetPos)
      curLook.current.copy(targetLook)
    }
    camera.lookAt(curLook.current)
  })

  return null
}
