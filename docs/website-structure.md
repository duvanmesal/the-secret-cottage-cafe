# Website Structure — The Secret Cottage Café

## Single-Page Architecture

The entire experience lives on one scrollable page (`/`). There are no subpages. The URL never changes. Navigation anchors link to sections within the same scroll journey.

---

## Section Map

### 1. Hero — The Hidden Cottage
**File:** `src/sections/Hero.astro`  
**Type:** Astro + Spline (React island)

- Full-viewport scene: a forest path at dawn leading to a cottage
- Spline 3D scene fills the background — mist, soft bokeh, warm window light
- Foreground: the wordmark fades in over 1.2s on load
- Subtitle appears with a subtle handwritten Caveat line below
- Scroll indicator: a single animated leaf or feather drifting downward
- On first scroll: Spline scene transitions — camera slowly pulls forward toward the cottage door

---

### 2. Garden Path
**File:** `src/sections/GardenPath.astro`  
**Type:** Astro + GSAP ScrollTrigger

- Horizontal parallax layers: foreground flowers, mid-ground hedges, background cottage
- As the user scrolls, they visually "walk" the garden path
- Seasonal flowers at edge of path (SVG or image assets)
- Ambient text overlay: a short prose line about the morning garden
- Background color transitions from Cream toward Soft Sage

---

### 3. Cottage Entrance
**File:** `src/sections/CottageEntrance.astro`  
**Type:** Astro + GSAP ScrollTrigger

- Close-up of the cottage door: wooden, slightly ajar, warm light inside
- Scroll zooms into the door — it opens as the user enters
- Sound cue (optional, unmuted only on interaction): door creak + distant coffee sounds
- Transition: the screen "fills" with warm interior light, dissolving into the next section

---

### 4. Story
**File:** `src/sections/Story.astro`  
**Type:** Astro (static)

- Two-column layout: left — editorial photography or illustrated scene, right — founder story text
- Typography-forward: large Playfair Display quote pulled from copy.md
- Handwritten Caveat accent: a small "since 2019" or "hidden in the forest" note
- Subtle noise texture overlay on the entire section background

---

### 5. Coffee Ritual
**File:** `src/sections/CoffeeRitual.astro`  
**Type:** Astro + GSAP ScrollTrigger + React Three Fiber (steam effect)

- Cinematic, step-by-step reveal of the coffee-making process
- Each step scrolls into view: grinding beans, pour-over, first steam rise, ceramic cup placed on saucer
- Steam above the cup is a React Three Fiber particle system
- Steps use staggered text reveals via GSAP
- Background: very dark (Dark Espresso), providing contrast and depth

---

### 6. Interactive Menu
**File:** `src/sections/Menu.tsx` (React island)  
**Type:** React + Motion + Zustand

- Grid or masonry layout of menu categories: Espresso Drinks, Pour-Overs, Seasonal Specials, Pastries
- Hovering a menu item triggers a Motion microinteraction: card lifts, name appears in Playfair Display
- Clicking a menu item sets the selected item in Zustand store
- Selected item triggers the 3D Coffee Viewer (section 7) to update
- Price and description shown in a side panel on selection

---

### 7. 3D Coffee Viewer
**File:** `src/sections/CoffeeViewer.tsx` (React island)  
**Type:** React + Spline

- A single, centered Spline scene: the signature ceramic cup
- Cup automatically rotates slowly
- When a menu item is selected (via Zustand), the Spline scene swaps to the matching coffee model
- The user can click-and-drag to rotate the cup manually
- Ambient steam effect via React Three Fiber layered on top of the Spline canvas
- Background: Cream, cup casts a soft shadow on a warm linen plane

---

### 8. Seasonal Garden
**File:** `src/sections/SeasonalGarden.astro`  
**Type:** Astro + GSAP ScrollTrigger

- A visually lush interlude section with seasonal photography or illustration
- Content rotates by season: Spring (cherry blossoms), Summer (lavender), Autumn (leaves), Winter (frost on glass)
- For MVP, use the current season's assets
- Floating petals or leaves are a React Three Fiber effect layered over
- Copy: short seasonal special — a featured drink or pastry

---

### 9. Gallery
**File:** `src/sections/Gallery.astro`  
**Type:** Astro + GSAP ScrollTrigger

- Horizontal scroll strip: a curated set of 8–12 editorial photographs
- Photos scroll at a different speed from the page (parallax within the strip)
- No captions — the images speak on their own
- Subtle vignette on left/right edges of the strip
- Photographs: café interior, cups, pastries, garden, hands preparing coffee

---

### 10. Reservation
**File:** `src/sections/Reservation.tsx` (React island)  
**Type:** React + Motion

- Centered section with a warm, editorial aesthetic
- Headline: large Playfair Display italic — from copy.md
- A minimal form: Name, Date, Party Size, Special Note
- Form fields styled as underline-only inputs on Cream background
- Submit button: Rose Clay, expands on hover
- Motion handles field focus animations and submit confirmation
- On submit: a small animated confirmation — a steaming cup illustration appears

---

### 11. Footer
**File:** `src/sections/Footer.astro`  
**Type:** Astro (static)

- Background: Dark Espresso
- Three columns: Logo + tagline | Navigation links | Address + hours
- Social icons (thin line, custom SVGs)
- A Caveat accent line at the bottom: "Brewed with love in the forest."
- Copyright line in small Inter

---

## Navigation

- Fixed top nav: transparent on Hero, transitions to semi-opaque Cream on scroll
- Nav items: Our Story | The Menu | Gallery | Reserve a Table
- All nav items scroll to their respective section anchor
- Mobile nav: full-screen overlay with Forest Green background

---

## Routing

| Path  | Description          |
|-------|----------------------|
| `/`   | Full landing page    |

No additional routes needed for MVP.

---

## Component Inventory

| Component              | Type   | Section         |
|------------------------|--------|-----------------|
| `Layout.astro`         | Astro  | Global wrapper  |
| `Nav.astro`            | Astro  | All             |
| `Hero.astro`           | Astro  | 1               |
| `SplineScene.tsx`      | React  | 1, 7            |
| `GardenPath.astro`     | Astro  | 2               |
| `CottageEntrance.astro`| Astro  | 3               |
| `Story.astro`          | Astro  | 4               |
| `CoffeeRitual.astro`   | Astro  | 5               |
| `SteamEffect.tsx`      | React  | 5, 7            |
| `Menu.tsx`             | React  | 6               |
| `CoffeeViewer.tsx`     | React  | 7               |
| `SeasonalGarden.astro` | Astro  | 8               |
| `PetalEffect.tsx`      | React  | 8               |
| `Gallery.astro`        | Astro  | 9               |
| `Reservation.tsx`      | React  | 10              |
| `Footer.astro`         | Astro  | 11              |
