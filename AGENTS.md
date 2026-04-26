# AGENTS.md — The Secret Cottage Café

AI coding agent guide for this project. Read before touching any file.

---

## Project Goal

Single-page, scroll-driven 3D landing page for a premium cottage café. The user visually enters a hidden forest café — walking the garden path, entering the cottage, discovering the coffee ritual, exploring an interactive menu with 3D cup viewer, and reserving a table.

Feeling: warm · elegant · handcrafted · natural · cinematic · cozy · premium.

---

## Stack

| Package | Version range | Role |
|---|---|---|
| Astro | ^6 | Page framework, static sections |
| React | ^19 | Interactive islands only |
| TypeScript | strict | All files |
| Tailwind CSS | ^4 (Vite plugin) | All styling |
| GSAP + ScrollTrigger | ^3 | Scroll-driven animations |
| Lenis | ^1 | Global smooth scroll |
| Spline (`@splinetool/react-spline`) | ^4 | Main 3D scenes |
| React Three Fiber + Drei | ^9 / ^10 | Particles, steam, petals only |
| Motion | ^12 | UI microinteractions only |
| Zustand | ^5 | Shared state |

**Do not add any new packages.** The stack is final.

---

## Folder Structure

```
src/
  components/       # Reusable pieces (Nav, SplineScene, SteamEffect, etc.)
  sections/         # One file per page section
  layouts/          # Layout.astro — global shell
  pages/            # index.astro — assembles sections
  store/            # useCafeStore.ts — Zustand store
  styles/           # global.css — Tailwind import + base tokens
docs/               # Project documentation — do not modify unless updating docs
.claude/commands/   # Claude skills — do not modify
```

Sections map (in scroll order):

| File | Type | Section |
|---|---|---|
| `Hero.astro` | Astro + Spline | 1 — The Hidden Cottage |
| `GardenPath.astro` | Astro + GSAP | 2 — Garden Path |
| `CottageEntrance.astro` | Astro + GSAP | 3 — Cottage Entrance |
| `Story.astro` | Astro | 4 — Story |
| `CoffeeRitual.astro` | Astro + GSAP + R3F | 5 — Coffee Ritual |
| `Menu.tsx` | React island | 6 — Interactive Menu |
| `CoffeeViewer.tsx` | React island + Spline | 7 — 3D Coffee Viewer |
| `SeasonalGarden.astro` | Astro + GSAP + R3F | 8 — Seasonal Garden |
| `Gallery.astro` | Astro + GSAP | 9 — Gallery |
| `Reservation.tsx` | React island + Motion | 10 — Reservation |
| `Footer.astro` | Astro | 11 — Footer |

---

## Astro vs React Islands

**Use Astro** (`.astro`) when the section has no runtime interactivity — static markup, GSAP scroll animations in a `<script>` tag, images, copy.

**Use React** (`.tsx`) when the section needs:
- User input (forms, clicks that update state)
- Zustand reads/writes
- Motion microinteractions
- Spline with dynamic variable setting
- R3F canvas effects

**Hydration directives:**
- `client:load` — above-fold interactive elements (Nav if needed)
- `client:visible` — all below-fold islands (default choice)
- `client:only="react"` — only when SSR would break (Spline, R3F)

Never use `client:only` when `client:visible` works.

---

## Animation Ownership

| Concern | Owner | Never use |
|---|---|---|
| Scroll-driven narrative | GSAP ScrollTrigger | Motion for scroll |
| Smooth scroll | Lenis | CSS `scroll-behavior: smooth` |
| Hover / focus / click states | Motion | GSAP for hover |
| Page-load sequence | GSAP | Motion for load |
| 3D scene internals | Spline | GSAP inside Spline |
| Particle / steam / petals | R3F | Spline for particles |

**Always sync Lenis with ScrollTrigger:**

```ts
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time) => lenis.raf(time * 1000))
gsap.ticker.lagSmoothing(0)
```

**Always guard GSAP with `prefers-reduced-motion`:**

```ts
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
if (!reduced) { /* animate */ }
```

**Standard scroll reveal:**

```ts
gsap.from(el, {
  opacity: 0, y: 20, duration: 0.9, ease: 'power2.out',
  scrollTrigger: { trigger: el, start: 'top 80%' },
})
```

---

## Spline Rules

- Import via `@splinetool/react-spline` — always inside a React island
- Always wrap in `<Suspense>` with a warm gradient fallback
- Hero scene: defer load until hero text renders (LCP protection)
- Viewer scene: mount only after `IntersectionObserver` fires
- To swap cup models: call `splineRef.current.setVariable('selectedCup', id)` driven by Zustand
- Fallback if WebGL unavailable: static image at same dimensions

---

## Three.js / R3F Rules

- R3F is **only** for effects: steam, petals, particles, floating ingredients
- Always render on a separate `<canvas>` with `position: absolute` over the section
- Never share a canvas with Spline
- Particle budgets: steam ≤ 80, petals ≤ 40, others ≤ 60
- Unmount R3F canvas when section leaves viewport (cleanup memory)
- Detect low-end devices (`navigator.hardwareConcurrency < 4`): skip R3F, show nothing

---

## Performance Rules

1. Never animate `width`, `height`, `top`, `left` — use `transform` + `opacity` only
2. Register GSAP plugins per-file, not globally
3. Kill ScrollTrigger instances and destroy Lenis in cleanup functions
4. Use Astro's `<Image />` component for all photos — never raw `<img>` for content images
5. Lazy-load all below-fold images (`loading="lazy"`)
6. No `overflow: hidden` on `<body>` — Lenis needs native scroll container
7. No `@apply` in Tailwind unless a utility is repeated 5+ times across files

---

## Build Validation

After every significant change:

```bash
npm run build
```

**The build must pass before moving to the next task.** Fix all errors and TypeScript warnings immediately. Do not accumulate broken state.

---

## Commit Workflow

1. Work one section at a time
2. Build passes → stage only the files changed for that section
3. Commit message format: `feat(section-name): short description`
   - Examples: `feat(hero): add Spline scene with scroll trigger`
   - `feat(menu): add item selection with Zustand`
   - `fix(lenis): sync ScrollTrigger on raf tick`
4. Do not commit `dist/`, `.astro/`, or `node_modules/`
5. Do not amend published commits

---

## Copy & Content

All final copy lives in `docs/copy.md`. Never invent placeholder text — pull from that file.
All animation specs live in `docs/animation-map.md`. Follow durations and easings exactly.
All section layout intent lives in `docs/website-structure.md`.

---

## What Not To Do

- Do not rewrite the entire project unless explicitly asked
- Do not produce generic AI-looking UI — every detail must feel handcrafted
- Do not use pure `#FFFFFF` or `#000000` — use palette tokens from `docs/brand-identity.md`
- Do not add bounce easings, elastic springs, or aggressive motion
- Do not write Lorem ipsum anywhere
- Do not skip the build check
