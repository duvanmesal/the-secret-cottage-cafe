# Spline Scenes — The Secret Cottage Café

Documentation for all Spline 3D scenes used on the landing page.

---

## Overview

Spline is used for:
1. The main hero environment scene (forest path + cottage)
2. The 3D coffee viewer (individual cup and drink models)

React Three Fiber handles supplementary effects layered on top of Spline (steam, petals, particles). These are kept separate to preserve Spline's rendering context.

---

## Scene 1 — Hero: The Forest Path

**File name:** `hero-forest-path.spline`  
**Used in:** `src/components/SplineScene.tsx` → `src/sections/Hero.astro`  
**Trigger:** Loads on page mount. Scroll interaction begins on first user scroll.

### Description

A cinematic top-down or wide-angle view of a narrow garden path cutting through dense forest foliage. At the end of the path: the cottage, its window glowing warm amber. Morning mist sits low between the trees.

### Scene Objects

| Object             | Description                                              |
|--------------------|----------------------------------------------------------|
| `ForestGround`     | Mossy ground plane with texture — dark green             |
| `PathStones`       | Row of irregular stone pavers, slightly sunken           |
| `LeftHedge`        | Dense rounded hedge rows, dark muted green               |
| `RightHedge`       | Mirror of left hedge                                     |
| `ForegroundFlowers`| Small wildflowers at path edges, rose and cream          |
| `TreeLine`         | Background trees — tall, soft blur, Forest Green         |
| `CottageBuilding`  | Simplified cottage form — warm stone, thatch roof        |
| `CottageWindow`    | Window glowing amber — emissive material                 |
| `MistLayer`        | Semi-transparent plane with volumetric texture, low      |
| `SkyDome`          | Gradient sky — pale blue-grey at top, warm peach horizon |
| `SunLight`         | Directional light, warm 3200K, slight angle from right   |
| `AmbientFill`      | Soft fill light, cool, low intensity                     |

### Scroll Behavior

- **Scroll 0–20%:** Camera at original position, slight idle sway (Spline animation loop)
- **Scroll 20–60%:** Camera dolly forward along the path toward the cottage
- **Scroll 60–85%:** Camera approaches the cottage door — perspective narrows
- **Scroll 85–100%:** Camera arrives at door — triggers Section 3 door-open animation

### Camera Settings

- Type: Perspective
- FOV: 55°
- Near clip: 0.1
- Far clip: 200
- Initial position: Z = 80, Y = 12 (slightly elevated, looking down the path)
- Target position: Z = 5, Y = 2 (close to the cottage door)

### Materials

| Material       | Type     | Notes                                              |
|----------------|----------|----------------------------------------------------|
| Ground         | Standard | Dark mossy green, slight roughness                |
| Stone path     | Standard | Warm grey, high roughness, subtle bump             |
| Hedge          | Standard | Deep green, matte                                  |
| Cottage stone  | Standard | Warm cream-grey, high roughness                    |
| Window glass   | Emissive | Amber `#D4813A`, opacity 0.85, emissive intensity 1.5 |
| Mist           | Custom   | White, opacity 0.2, additive blend                 |
| Sky            | Custom   | Gradient from `#C8D8E8` to `#F0D8C0`               |

### Spline Animations (internal)

| Name          | Type        | Description                                     |
|---------------|-------------|-------------------------------------------------|
| `idleSway`    | Loop        | Camera slow sway ±2° over 8s                   |
| `mistDrift`   | Loop        | Mist layer drifts slowly left, wraps            |
| `windowFlicker`| Loop       | Window emissive intensity pulses 1.4–1.6 slowly |

---

## Scene 2 — Coffee Viewer: The Signature Cup

**File name:** `coffee-cup-viewer.spline`  
**Used in:** `src/components/SplineScene.tsx` → `src/sections/CoffeeViewer.tsx`  
**Trigger:** Mounts when Section 7 becomes visible. Responds to menu item selection via Spline events.

### Description

A single ceramic cup on a subtle linen surface. The cup is the star. The environment is minimal — the camera floats around it in a slow continuous orbit. The user can click and drag to take over the rotation.

### Scene Objects

| Object          | Description                                             |
|-----------------|---------------------------------------------------------|
| `Cup`           | Hand-thrown ceramic mug form, slightly asymmetric       |
| `Saucer`        | Matching ceramic saucer below the cup                   |
| `CoffeeSurface` | Dark liquid surface inside the cup, slight reflection   |
| `LinenPlane`    | Subtle flat surface with linen texture                  |
| `ShadowPlane`   | Receives soft shadow from cup                           |
| `KeyLight`      | Warm directional light from upper-left, 4000K           |
| `FillLight`     | Cool soft fill from lower-right, low intensity          |
| `RimLight`      | Subtle back rim light to separate cup from background   |
| `BackgroundFog` | Very subtle depth fog, Cream color                      |

### Cup Models (Swappable)

Each menu item has a corresponding cup variant. Swapping is handled via Spline event variables.

| Model ID         | Menu Item                | Cup/Drink Visual Change                       |
|------------------|--------------------------|-----------------------------------------------|
| `cup-espresso`   | Espresso                 | Demitasse, deep brown crema surface           |
| `cup-cortado`    | Cortado                  | Small glass, layered brown + cream            |
| `cup-flatwhite`  | Flat White               | Standard mug, latte art surface               |
| `cup-cappuccino` | Cappuccino               | Wide bowl mug, dry foam texture on top        |
| `cup-yirgacheffe`| Ethiopian Yirgacheffe    | Pour-over glass carafe, bright amber liquid   |
| `cup-huila`      | Colombian Huila          | Standard mug, dark caramel-toned surface      |
| `cup-kenyan`     | Kenyan AA                | Standard mug, deep ruby-brown surface         |
| `cup-rose-latte` | Rose Latte               | Tall glass, pink-tinted cream, dried petals   |
| `cup-forest-fog` | Forest Fog               | Matte mug, pale green liquid, light foam      |
| `cup-autumn`     | Autumn Spice             | Wide mug, cinnamon-dusted cream surface       |

### Camera Settings

- Type: Perspective
- FOV: 45°
- Orbit: enabled (Spline built-in orbit control)
- Auto-rotate: Y-axis, 0.6°/frame
- Min/max polar angle: 20°–80° (prevents top/bottom view)
- Zoom: disabled

### Materials

| Material         | Type      | Notes                                              |
|------------------|-----------|----------------------------------------------------|
| Cup body         | Standard  | Matte off-white, slight warm tint, high roughness  |
| Cup interior     | Standard  | Slightly darker, same roughness                    |
| Coffee liquid    | Standard  | Dark brown, low roughness (slight reflection)      |
| Linen surface    | Standard  | Warm cream, noise texture, high roughness          |
| Shadow plane     | Shadow    | Transparent, receives shadow only                  |

### Spline Variables (for model swap)

```
Variable: selectedCup (string)
Values: "espresso" | "cortado" | "flatwhite" | etc.
```

React reads the menu Zustand store and calls the Spline `setVariable('selectedCup', value)` on item selection.

### Spline Animations (internal)

| Name           | Type  | Description                                       |
|----------------|-------|---------------------------------------------------|
| `idleRotate`   | Loop  | Cup slow Y-axis spin, 12s per revolution          |
| `cupSwapFade`  | Event | On `selectedCup` change — fade out, swap, fade in |

---

## Integration Notes

### React Component: `SplineScene.tsx`

```tsx
// Props interface (reference — do not implement yet)
interface SplineSceneProps {
  scene: string          // URL to the .spline file
  onLoad?: () => void
  className?: string
}
```

- Use `@splinetool/react-spline`'s `<Spline>` component
- Pass `ref` to access the Spline application instance for variable setting
- Wrap in a `Suspense` boundary with a warm gradient fallback
- Lazy-load the Spline runtime to avoid blocking initial paint

### Performance Notes

- Hero scene: lazy-load after initial hero text renders (LCP protection)
- Coffee viewer scene: mount only when section scrolls into view (`IntersectionObserver`)
- Both scenes should be unloaded / suspended when fully scrolled out of viewport on low-end devices
- Spline `.spline` files are fetched from Spline CDN — no local bundling needed

### Fallback Behavior

If Spline fails to load (network error, WebGL unavailable):
- Hero fallback: high-quality static image of the cottage at dawn (Cream/Forest Green palette)
- Viewer fallback: static photography of the signature cup from three angles

---

## Asset Checklist

- [ ] `hero-forest-path.spline` — scene built and published to Spline CDN
- [ ] `coffee-cup-viewer.spline` — scene built with all cup models and swap logic
- [ ] All 10 cup model variants designed and linked
- [ ] Hero scroll-driven camera path tested at 60fps
- [ ] Both scenes tested in Chrome, Safari, Firefox, Edge
- [ ] WebGL fallback images exported at 1440×900 and 375×812 (mobile)
