# Development Plan — The Secret Cottage Café

Ordered phases for building the landing page from foundation to full feature-complete state.

---

## Guiding Principles

- Each phase must leave the build in a passing state (`npm run build` = green)
- No phase introduces a library that isn't already in `package.json`
- Astro components are the default; React islands added only when interactivity is needed
- Spline scenes are mocked/placeholder until assets are ready — never block code progress on design assets
- Animation is applied after layout is stable — never animate broken layout

---

## Phase 0 — Foundation (Complete)

- [x] Astro project initialized
- [x] React integration (`@astrojs/react`)
- [x] Tailwind CSS v4 via Vite plugin
- [x] GSAP, Lenis, Motion, Spline, R3F, Zustand installed
- [x] `tsconfig.json` set to strict with React JSX
- [x] `global.css` importing Tailwind, base palette, and scroll-behavior
- [x] `Layout.astro` importing global CSS, correct page title
- [x] `docs/` folder created with all documentation files
- [x] `npm run build` passing clean

---

## Phase 1 — Global Infrastructure

**Goal:** Navigation, fonts, Lenis, and the Layout shell in place before any section content.

### Tasks

- [ ] Add Google Fonts to `Layout.astro` head: Playfair Display, Inter, Caveat
- [ ] Define Tailwind CSS custom tokens (colors, font families, type scale) in `global.css`
- [ ] Create `src/components/Nav.astro` — static markup, transparent background
- [ ] Add Nav to `Layout.astro`
- [ ] Create `src/components/LenisProvider.tsx` — React island, initializes Lenis on mount, exposes scroll context via Zustand
- [ ] Add LenisProvider to `Layout.astro` as a React island
- [ ] Create Zustand store: `src/store/useCafeStore.ts` — selectedMenuItem state, scroll progress state
- [ ] `npm run build` — confirm passing

---

## Phase 2 — Hero Section

**Goal:** Full-viewport hero with wordmark, subheadline, and Spline scene placeholder.

### Tasks

- [ ] Create `src/sections/Hero.astro` — full-viewport layout, text layers
- [ ] Create `src/components/SplineScene.tsx` — generic Spline wrapper component with Suspense + fallback
- [ ] Add Hero to `src/pages/index.astro`
- [ ] Implement hero text entry animations (GSAP, on mount)
- [ ] Add scroll prompt with float loop animation
- [ ] Add Spline hero scene (placeholder URL until asset is ready)
- [ ] Test on mobile viewport
- [ ] `npm run build` — confirm passing

---

## Phase 3 — Garden Path Section

**Goal:** Horizontal parallax layers driven by GSAP ScrollTrigger.

### Tasks

- [ ] Create `src/sections/GardenPath.astro`
- [ ] Set up GSAP ScrollTrigger parallax for three image layers
- [ ] Add ambient text overlay with scroll-triggered reveal
- [ ] Add background color transition (Cream → Soft Sage) on scroll
- [ ] `npm run build` — confirm passing

---

## Phase 4 — Cottage Entrance Section

**Goal:** Scroll-driven door zoom and open transition.

### Tasks

- [ ] Create `src/sections/CottageEntrance.astro`
- [ ] Implement door zoom (ScrollTrigger scrub, scale)
- [ ] Implement door open (3D perspective transform on scroll)
- [ ] Add warm light flood overlay
- [ ] Add "Come inside." text reveal
- [ ] `npm run build` — confirm passing

---

## Phase 5 — Story Section

**Goal:** Static editorial two-column layout with text reveals.

### Tasks

- [ ] Create `src/sections/Story.astro`
- [ ] Implement two-column layout (image + text)
- [ ] Add pull quote in Playfair Display italic
- [ ] Add body paragraphs with staggered GSAP reveal
- [ ] Add Caveat accent
- [ ] Add noise texture overlay
- [ ] `npm run build` — confirm passing

---

## Phase 6 — Coffee Ritual Section

**Goal:** Dark cinematic section with step-by-step scroll reveals and steam effect.

### Tasks

- [ ] Create `src/sections/CoffeeRitual.astro`
- [ ] Build step layout — four steps, full-width staggered
- [ ] Implement GSAP ScrollTrigger step reveals
- [ ] Create `src/components/SteamEffect.tsx` — R3F particle system
- [ ] Integrate SteamEffect into Ritual section above cup step
- [ ] Add dark background transition
- [ ] `npm run build` — confirm passing

---

## Phase 7 — Interactive Menu

**Goal:** Hoverable, selectable menu grid that updates Zustand state.

### Tasks

- [ ] Create `src/sections/Menu.tsx` (React island)
- [ ] Build menu category tabs with Motion underline animation
- [ ] Build menu item cards with Motion hover + select microinteractions
- [ ] Connect item selection to Zustand `selectedMenuItem`
- [ ] Build side panel for selected item detail
- [ ] Add section entry animations (GSAP)
- [ ] `npm run build` — confirm passing

---

## Phase 8 — 3D Coffee Viewer

**Goal:** Spline cup viewer that reacts to menu selection.

### Tasks

- [ ] Create `src/sections/CoffeeViewer.tsx` (React island)
- [ ] Load Spline cup viewer scene (placeholder until asset ready)
- [ ] Subscribe to Zustand `selectedMenuItem`
- [ ] On selection change, call Spline `setVariable` to swap model
- [ ] Layer SteamEffect on top of Spline canvas
- [ ] Add "Turn me." label with auto-hide on drag
- [ ] Mount section only when in viewport (IntersectionObserver)
- [ ] `npm run build` — confirm passing

---

## Phase 9 — Seasonal Garden & Gallery

**Goal:** Lush parallax interlude and horizontal scroll gallery strip.

### Tasks

- [ ] Create `src/sections/SeasonalGarden.astro`
- [ ] Add background parallax image
- [ ] Create `src/components/PetalEffect.tsx` — R3F falling petals/leaves
- [ ] Add seasonal copy and featured drink card
- [ ] Create `src/sections/Gallery.astro`
- [ ] Implement pinned horizontal scroll strip (GSAP ScrollTrigger)
- [ ] Add image parallax within strip
- [ ] Add edge vignette
- [ ] `npm run build` — confirm passing

---

## Phase 10 — Reservation & Footer

**Goal:** Form section and footer, completing the page.

### Tasks

- [ ] Create `src/sections/Reservation.tsx` (React island)
- [ ] Build minimal underline-style form inputs
- [ ] Add Motion field focus and label float animations
- [ ] Add Rose Clay submit button with hover/press animations
- [ ] Add submit confirmation animation (steaming cup)
- [ ] Create `src/sections/Footer.astro`
- [ ] Build three-column footer layout
- [ ] Add social icons (SVG), nav links, address
- [ ] Add Caveat sign-off and copyright
- [ ] `npm run build` — confirm passing

---

## Phase 11 — Polish & Performance

**Goal:** Final animation tuning, accessibility, performance audit.

### Tasks

- [ ] Add `prefers-reduced-motion` media query guards to all GSAP animations
- [ ] Audit Lighthouse scores — target 90+ Performance, 100 Accessibility
- [ ] Add `alt` text to all images
- [ ] Add keyboard navigation to Menu and Reservation
- [ ] Lazy-load Spline scenes behind IntersectionObserver
- [ ] Test on Chrome, Safari, Firefox, Edge
- [ ] Test on iOS Safari and Android Chrome
- [ ] Confirm `npm run build` passing — zero warnings if possible

---

## Phase 12 — Content Integration

**Goal:** Replace placeholder copy and assets with final content.

### Tasks

- [ ] Replace placeholder images with final editorial photography
- [ ] Replace placeholder Spline URLs with published scene CDN links
- [ ] Confirm all copy matches `docs/copy.md` exactly
- [ ] Final QA pass — scroll through entire page start to finish
- [ ] Final `npm run build` — production-ready

---

## File Creation Order

The order below respects dependencies — each file can be built without breaking what came before.

```
src/store/useCafeStore.ts
src/components/LenisProvider.tsx
src/components/Nav.astro
src/layouts/Layout.astro            (update)
src/components/SplineScene.tsx
src/sections/Hero.astro
src/sections/GardenPath.astro
src/sections/CottageEntrance.astro
src/sections/Story.astro
src/sections/CoffeeRitual.astro
src/components/SteamEffect.tsx
src/sections/Menu.tsx
src/sections/CoffeeViewer.tsx
src/sections/SeasonalGarden.astro
src/components/PetalEffect.tsx
src/sections/Gallery.astro
src/sections/Reservation.tsx
src/sections/Footer.astro
src/pages/index.astro               (final assembly)
```

---

## Risk Register

| Risk                                  | Mitigation                                                         |
|---------------------------------------|--------------------------------------------------------------------|
| Spline assets not ready               | Use placeholder gradient or static image; never block code phase  |
| R3F + Spline canvas conflicts         | Keep R3F on a separate canvas layered via `position: absolute`    |
| GSAP ScrollTrigger + Lenis conflict   | Use `ScrollTrigger.scrollerProxy` to sync Lenis with ScrollTrigger|
| React island hydration mismatch       | Ensure all React islands use `client:load` or `client:visible`    |
| Mobile performance on heavy 3D        | Detect low-end devices, disable R3F effects gracefully            |
| Build errors from unused imports      | Remove unused imports before committing each phase                |
