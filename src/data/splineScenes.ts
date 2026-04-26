// ─── Spline scene catalogue ──────────────────────────────────────────────────
// Typed registry of every Spline scene the cottage uses. `sceneUrl` stays null
// until the real `.splinecode` URL is published — until then, SplineScene
// renders the fallbackTheme placeholder.

export interface FallbackTheme {
  /** Deepest base colour — sets the dominant mood of the placeholder */
  background: string
  /** Primary glow — focal warm light or atmospheric centre */
  glow: string
  /** Secondary highlight — subtle rim accent */
  accent: string
  /** Lighting mood — drives placeholder text contrast */
  mood: 'warm-dark' | 'warm-light' | 'cool-light' | 'rich-dark' | 'forest'
}

export interface SplineSceneDefinition {
  /** Stable identifier — also the registry key */
  key: string
  /** Short human-readable name shown in the fallback */
  label: string
  /** One-line description of what the scene depicts */
  description: string
  /** URL to the published `.splinecode` file. `null` until ready */
  sceneUrl: string | null
  /** Visual theme used when no URL or scene errors */
  fallbackTheme: FallbackTheme
}

export const splineScenes = {
  cottageExterior: {
    key: 'cottageExterior',
    label: 'The Hidden Cottage',
    description:
      'A small thatched cottage glowing at the end of the forest path, just past sunset.',
    sceneUrl: null,
    fallbackTheme: {
      background: '#1a120d',
      glow: '#C8823C',
      accent: '#3F5D45',
      mood: 'warm-dark',
    },
  },

  cottageDoor: {
    key: 'cottageDoor',
    label: 'The Open Door',
    description:
      'Warm amber light spills from the cottage doorway. The coffee is ready.',
    sceneUrl: null,
    fallbackTheme: {
      background: '#241A14',
      glow: '#C98F7A',
      accent: '#D8C3A5',
      mood: 'warm-dark',
    },
  },

  coffeeRitual: {
    key: 'coffeeRitual',
    label: 'The Ritual',
    description:
      'A ceramic cup, slow steam rising into a single overhead spotlight.',
    sceneUrl: null,
    fallbackTheme: {
      background: '#241A14',
      glow: '#D8C3A5',
      accent: '#C98F7A',
      mood: 'rich-dark',
    },
  },

  honeyLavenderLatte: {
    key: 'honeyLavenderLatte',
    label: 'Honey Lavender Latte',
    description:
      'Wide-bowl cream cup with a lavender sprig and a honey drizzle, in soft morning light.',
    sceneUrl: null,
    fallbackTheme: {
      background: '#E8DDD0',
      glow: '#C98F7A',
      accent: '#A7B89A',
      mood: 'warm-light',
    },
  },

  forestMocha: {
    key: 'forestMocha',
    label: 'Forest Mocha',
    description:
      'Deep-brown ceramic, cacao dust, a single oak leaf — a walk through the woods.',
    sceneUrl: null,
    fallbackTheme: {
      background: '#241A14',
      glow: '#5A3E2B',
      accent: '#3F5D45',
      mood: 'rich-dark',
    },
  },

  roseVanillaCappuccino: {
    key: 'roseVanillaCappuccino',
    label: 'Rose Vanilla Cappuccino',
    description:
      'Pale ceramic cup, dense foam, a pressed rose petal — petal-soft and warm.',
    sceneUrl: null,
    fallbackTheme: {
      background: '#F0E8E0',
      glow: '#C98F7A',
      accent: '#D8C3A5',
      mood: 'warm-light',
    },
  },

  cinnamonHearthLatte: {
    key: 'cinnamonHearthLatte',
    label: 'Cinnamon Hearth Latte',
    description:
      'Amber ceramic, a cinnamon stick, star anise — the fireplace in a cup.',
    sceneUrl: null,
    fallbackTheme: {
      background: '#3a2a1e',
      glow: '#C8A882',
      accent: '#5A3E2B',
      mood: 'warm-dark',
    },
  },

  gardenCreamColdBrew: {
    key: 'gardenCreamColdBrew',
    label: 'Garden Cream Cold Brew',
    description:
      'Tall sage-tinted glass, a single ice cube, sweet herb cream, a sprig of rosemary.',
    sceneUrl: null,
    fallbackTheme: {
      background: '#2c3a28',
      glow: '#A7B89A',
      accent: '#D4E0D0',
      mood: 'forest',
    },
  },

  reservationTable: {
    key: 'reservationTable',
    label: 'A Table for Two',
    description:
      'A small wooden table set with linen, a single candle, two empty cups waiting.',
    sceneUrl: null,
    fallbackTheme: {
      background: '#241A14',
      glow: '#D8C3A5',
      accent: '#C98F7A',
      mood: 'warm-dark',
    },
  },
} as const satisfies Record<string, SplineSceneDefinition>

export type SplineSceneKey = keyof typeof splineScenes

/** Typed lookup helper. */
export function getSplineScene(key: SplineSceneKey): SplineSceneDefinition {
  return splineScenes[key]
}
