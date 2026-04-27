import { Component, Suspense, useMemo, type ReactNode } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

// ─── Props ────────────────────────────────────────────────────────────────────

export interface GLTFModelProps {
  /** Public path to the .gltf / .glb file */
  path: string
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: number | [number, number, number]
  castShadow?: boolean
  receiveShadow?: boolean
}

// ─── Inner loader ─────────────────────────────────────────────────────────────
// Suspends while the asset loads — must be under a <Suspense> boundary.

function GLTFModelInner({
  path,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  castShadow = false,
  receiveShadow = false,
}: GLTFModelProps) {
  const { scene } = useGLTF(path)

  // Clone so multiple instances or prop changes never mutate the cached scene.
  const cloned = useMemo(() => {
    const clone = scene.clone(true)
    clone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = castShadow
        child.receiveShadow = receiveShadow
      }
    })
    return clone
  }, [scene, castShadow, receiveShadow])

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <primitive object={cloned} />
    </group>
  )
}

// ─── Error fallback ───────────────────────────────────────────────────────────
// Renders a minimal coffee-brown cylinder so the 3D scene never has a void.

function FallbackMesh({ position = [0, 0, 0] as [number, number, number] }) {
  return (
    <mesh position={position} castShadow receiveShadow>
      <cylinderGeometry args={[0.55, 0.55, 0.72, 20]} />
      <meshStandardMaterial color="#5A3E2B" roughness={0.82} metalness={0.04} />
    </mesh>
  )
}

// ─── Error boundary ───────────────────────────────────────────────────────────

interface ErrBoundaryProps {
  children: ReactNode
  fallback: ReactNode
}

class ModelErrorBoundary extends Component<
  ErrBoundaryProps,
  { hasError: boolean }
> {
  state = { hasError: false }

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true }
  }

  render(): ReactNode {
    return this.state.hasError ? this.props.fallback : this.props.children
  }
}

// ─── Public export ────────────────────────────────────────────────────────────

/**
 * Drop a Poly Haven (or any standard) glTF / glb model into an R3F canvas.
 * Handles its own Suspense + error boundary; callers only provide props.
 *
 * @example
 * <GLTFModel
 *   path={modelAssets.roundWoodenTable.path}
 *   position={[0, -1, 0]}
 *   scale={1.4}
 *   castShadow
 *   receiveShadow
 * />
 */
export function GLTFModel(props: GLTFModelProps) {
  return (
    <ModelErrorBoundary fallback={<FallbackMesh position={props.position} />}>
      <Suspense fallback={null}>
        <GLTFModelInner {...props} />
      </Suspense>
    </ModelErrorBoundary>
  )
}

/** Call before mounting to warm the asset cache (optional, non-blocking). */
export const preloadGLTFModel = (path: string) => useGLTF.preload(path)
