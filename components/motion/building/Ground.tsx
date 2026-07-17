'use client'

import { useMemo, useEffect } from 'react'
import { ContactShadows } from '@react-three/drei'
import * as THREE from 'three'
import { sitePlanTexture } from './textures'
import type { QualitySettings } from './types'

interface GroundProps {
  quality: QualitySettings
}

/**
 * Grounds the model on a radial "site-plan" mat (faint survey grid, access road,
 * teal setting-out marks) that fades to fully transparent at the rim — so the set
 * sits on something without introducing a hard horizon seam against the page white.
 * Soft contact shadows sit on top and do the close-range seating.
 */
export function Ground({ quality }: GroundProps) {
  const siteTex = useMemo(() => sitePlanTexture(), [])
  const siteMat = useMemo(
    () =>
      siteTex
        ? new THREE.MeshBasicMaterial({ map: siteTex, transparent: true, depthWrite: false, toneMapped: false })
        : null,
    [siteTex],
  )
  const siteGeo = useMemo(() => new THREE.CircleGeometry(70, 64), [])

  useEffect(() => {
    return () => {
      siteMat?.dispose()
      siteGeo.dispose()
    }
  }, [siteMat, siteGeo])

  return (
    <>
      {siteMat && (
        <mesh
          geometry={siteGeo}
          material={siteMat}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[2, -0.475, -1]}
          renderOrder={-1}
        />
      )}

      {quality.contactShadows && (
        <ContactShadows
          position={[0, -0.46, 0]}
          scale={62}
          resolution={quality.tier === 'high' ? 1024 : 512}
          blur={2.4}
          opacity={0.36}
          far={9}
          color="#3a3f45"
        />
      )}
    </>
  )
}
