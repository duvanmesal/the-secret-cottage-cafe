# Secret Cottage Café — Motion Design Skill

You are working on **The Secret Cottage Café**, a premium scroll-driven 3D landing page. Read and internalize everything below before writing a single line of code.

---

## Project Concept

A cinematic, single-page experience where the user *enters* a hidden cottage café in the forest. Scrolling is walking. Each section is a room, a moment, a sensory layer. The experience ends at a reservation — an invitation to continue the story in real life.

---

## Stack & Tool Ownership

| Tool | Owns |
|---|---|
| Astro | Static structure, layouts, mostly-static sections |
| React Islands | Interactive areas only (menu, viewer, reservation, Lenis provider) |
| Tailwind CSS v4 | All styling — utility classes, no custom CSS unless unavoidable |
| GSAP + ScrollTrigger | All scroll-driven narrative animations |
| Lenis | Global smooth scroll — always active, wraps the entire page |
| Spline | Main 3D scenes (hero forest, coffee cup viewer) |
| React Three Fiber | Custom effects only: steam, petals, particles, floating ingredients |
| Motion | UI microinteractions only: hover, focus, click, form states |
| Zustand | Shared state: selectedMenuItem, scroll progress |

**Strict rules:**
- Never use GSAP for what Motion should own, and vice versa.
- Never use R3F for a scene that Spline should own.
- Never add a new library. The stack is final.
- Never write `client:only` unless `client:visible` or `client:load` is truly insufficient.

---

## Visual Direction

### Feeling
Warm · Elegant · Handcrafted · Natural · Cinematic · Cozy · Premium

### Inspiration
English countryside cottage cafés · ceramic cups · warm wood · linen textures · garden mornings · soft golden-hour light · dried flowers · coffee steam · forest paths

### Color Palette

| Token | Hex | Use |
|---|---|---|
| `cream` | `#F5EFE6` | Primary background |
| `warm-beige` | `#D8C3A5` | Secondary surfaces, cards |
| `coffee-brown` | `#5A3E2B` | Primary headings, strong accents |
| `forest-green` | `#3F5D45` | Garden sections, nav hover |
| `soft-sage` | `#A7B89A` | Plant details, secondary text on dark |
| `rose-clay` | `#C98F7A` | CTAs, warm highlights |
| `dark-espresso` | `#241A14` | Body text, footer, darkest shadows |

Never use pure `#FFFFFF` or `#000000`.

### Typography

| Role | Font | Weight | Use |
|---|---|---|---|
| Headings | Playfair Display | 400, 700 | All section titles, hero, product names |
| Body | Inter | 300, 400 | Paragraphs, labels, navigation |
| Accent | Caveat | 400 | Handwritten details only — use sparingly |

### Motion Personality
- Easing: always `power2.out` (GSAP) or `easeOut` (Motion) — never linear
- Speed: slightly slower than expected — comfort, not urgency
- Reveals: fade + subtle upward drift (12–20px) — never bounce
- Hover: gentle scale (1.02–1.04×) + soft shadow deepening
- No sudden cuts, no aggressive transitions

---

## Page Sections

| # | Section | File | Type |
|---|---|---|---|
| 1 | Hero — The Hidden Cottage | `src/sections/Hero.astro` | Astro + Spline |
| 2 | Garden Path | `src/sections/GardenPath.astro` | Astro + GSAP |
| 3 | Cottage Entrance | `src/sections/CottageEntrance.astro` | Astro + GSAP |
| 4 | Story | `src/sections/Story.astro` | Astro (static) |
| 5 | Coffee Ritual | `src/sections/CoffeeRitual.astro` | Astro + GSAP + R3F steam |
| 6 | Interactive Menu | `src/sections/Menu.tsx` | React island |
| 7 | 3D Coffee Viewer | `src/sections/CoffeeViewer.tsx` | React island + Spline |
| 8 | Seasonal Garden | `src/sections/SeasonalGarden.astro` | Astro + GSAP + R3F petals |
| 9 | Gallery | `src/sections/Gallery.astro` | Astro + GSAP horizontal scroll |
| 10 | Reservation | `src/sections/Reservation.tsx` | React island + Motion |
| 11 | Footer | `src/sections/Footer.astro` | Astro (static) |

---

## Code Standards

### Astro sections
```astro
---
// No client-side logic here. GSAP animations go in a <script> tag below.
---
<section id="hero" class="relative min-h-screen bg-[#F5EFE6]">
  <!-- markup -->
</section>

<script>
  import gsap from 'gsap'
  import { ScrollTrigger } from 'gsap/ScrollTrigger'
  gsap.registerPlugin(ScrollTrigger)
  // animation logic here
</script>
```

### React islands
```tsx
// Always typed. Always named exports for testability.
// Use client:visible for below-fold sections.
// Use client:load only for above-fold interactive elements.
```

### Lenis + ScrollTrigger sync
Always sync Lenis with GSAP ScrollTrigger. Without this, scroll animations will stutter.
```ts
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time) => lenis.raf(time * 1000))
gsap.ticker.lagSmoothing(0)
```

### Spline integration
```tsx
import Spline from '@splinetool/react-spline'
// Always wrap in Suspense with a warm gradient fallback
// Always lazy-load — never block LCP
// Mount only when in viewport (IntersectionObserver for below-fold scenes)
```

### R3F effects
```tsx
// Always on a separate <canvas> layered via position: absolute
// Never share canvas with Spline
// Keep particle counts low: steam ≤ 80 particles, petals ≤ 40
```

### prefers-reduced-motion
Every GSAP animation must be guarded:
```ts
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
if (!prefersReduced) {
  // animate
}
```

---

## Animation Reference

### GSAP scroll reveal (standard)
```ts
gsap.from(element, {
  opacity: 0,
  y: 20,
  duration: 0.9,
  ease: 'power2.out',
  scrollTrigger: {
    trigger: element,
    start: 'top 80%',
  },
})
```

### GSAP stagger reveal
```ts
gsap.from(elements, {
  opacity: 0,
  y: 16,
  duration: 0.7,
  ease: 'power2.out',
  stagger: 0.1,
  scrollTrigger: { trigger: container, start: 'top 75%' },
})
```

### GSAP scrub parallax
```ts
gsap.to(layer, {
  y: -80,
  ease: 'none',
  scrollTrigger: {
    trigger: section,
    start: 'top bottom',
    end: 'bottom top',
    scrub: true,
  },
})
```

### Motion hover (card)
```tsx
<motion.div
  whileHover={{ scale: 1.03 }}
  transition={{ duration: 0.25, ease: 'easeOut' }}
>
```

### Motion field focus
```tsx
<motion.span
  animate={{ scaleX: isFocused ? 1 : 0 }}
  transition={{ duration: 0.25, ease: 'easeOut' }}
  style={{ transformOrigin: 'left' }}
/>
```

---

## Zustand Store Shape

```ts
// src/store/useCafeStore.ts
interface CafeStore {
  selectedMenuItem: string | null
  setSelectedMenuItem: (id: string | null) => void
  scrollProgress: number
  setScrollProgress: (p: number) => void
}
```

---

## Performance Rules

1. Spline hero scene: defer load until after hero text renders (protect LCP)
2. Spline viewer scene: mount only on IntersectionObserver trigger
3. R3F canvases: unmount when section is fully out of viewport
4. Detect low-end devices (`navigator.hardwareConcurrency < 4`): disable R3F effects, show static fallback
5. Gallery images: use Astro's `<Image />` with `loading="lazy"` for off-screen photos
6. Never import GSAP plugins globally — register per file

---

## Anti-Patterns — Never Do These

- Do not use `@apply` in Tailwind unless building a reusable utility that appears 5+ times
- Do not animate `width`, `height`, or `top/left` — always use `transform` and `opacity`
- Do not put scroll animation logic inside React render cycles — use `useEffect` with cleanup
- Do not use `ScrollTrigger.refresh()` in loops — call it once after layout settles
- Do not let Spline and R3F share the same `<canvas>` element
- Do not add `overflow: hidden` to the `<body>` — Lenis needs the native scroll container
- Do not skip `ScrollTrigger.kill()` and `lenis.destroy()` in cleanup — memory leaks
- Do not generate placeholder filler text like "Lorem ipsum" — use copy from `docs/copy.md`
- Do not produce generic, AI-looking UI — every element must feel handcrafted and specific

---

## Working Method

1. Read the relevant section in `docs/website-structure.md` before starting any section
2. Read the animation spec in `docs/animation-map.md` for the section being built
3. Pull final copy from `docs/copy.md` — never invent placeholder text
4. Build layout first, animate second
5. After each section or significant change: `npm run build` — fix all errors before continuing
6. Do not touch other sections while building the current one unless there is a direct dependency
7. Work in small, safe steps — never rewrite the project unless explicitly asked

---

## Activation Context

This skill activates when working on:
- Landing page sections for The Secret Cottage Café
- Premium frontend design with cinematic scroll storytelling
- Astro + React island architecture decisions
- GSAP ScrollTrigger scroll-driven animation
- Lenis smooth scroll setup and GSAP sync
- Spline 3D scene integration
- React Three Fiber particle / steam / petal effects
- Coffee menu hover and selection interactions
- 3D coffee cup viewer with Zustand-driven model swapping
- Visual polish, spacing, typography refinement
- Responsive layout review (mobile / tablet / desktop)
- Performance audit of animation-heavy sections
