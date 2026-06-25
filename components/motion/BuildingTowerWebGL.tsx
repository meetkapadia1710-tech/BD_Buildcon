'use client'

// The scroll-linked WebGL construction scene was refactored into ./building/*.
// This file is kept as the stable entry point so existing imports keep working.
export { default } from './building/Scene'
export type { SceneProps as BuildingTowerWebGLProps } from './building/types'
