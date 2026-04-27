// ─── 3D model asset catalogue ─────────────────────────────────────────────────
// Typed registry for every glTF / glb model the cottage uses. Paths are
// relative to /public so they resolve at runtime via the static file server.

export interface ModelAsset {
  /** Stable identifier — matches the registry key */
  id: string
  /** Human-readable name for debug / UI labels */
  name: string
  /** Public path to the .gltf or .glb file */
  path: string
  /** One-line description of the asset's visual content */
  description: string
}

export const modelAssets = {
  roundWoodenTable: {
    id: 'roundWoodenTable',
    name: 'Round Wooden Table',
    path: '/models/round-wooden-table/round_wooden_table_01_2k.gltf',
    description:
      'A weathered round wooden table with 2K PBR textures (diffuse, normal, ARM). Poly Haven — CC0.',
  },
} as const satisfies Record<string, ModelAsset>

export type ModelAssetKey = keyof typeof modelAssets
