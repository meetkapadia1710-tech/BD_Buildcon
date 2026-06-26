'use client'

import { useEffect } from 'react'
import { useThree } from '@react-three/fiber'

interface CameraRigProps {
  isMobile: boolean
}

/**
 * Frames the construction cluster. Mobile pulls back and lifts the look-at so the
 * full set of towers stays in frame on a narrow viewport.
 * (Phase 5 will turn this into a scroll-driven cinematic dolly.)
 */
export function CameraRig({ isMobile }: CameraRigProps) {
  const { camera, size } = useThree()
  useEffect(() => {
    if (isMobile) {
      const multiplier = Math.max(1.06, Math.min(1.35, 0.86 + (768 - size.width) * 0.00055))
      const lookAtY = 14 + (multiplier - 1) * 22.0

      const x = 2 + 54 * multiplier
      const y = lookAtY + 26 * multiplier
      const z = -1 + 54 * multiplier

      camera.position.set(x, y, z)
      camera.lookAt(2, lookAtY, -1)
    } else {
      camera.position.set(56, 40, 53)
      camera.lookAt(2, 14, -1)
    }
    camera.updateProjectionMatrix()
  }, [camera, size.width, size.height, isMobile])
  return null
}
