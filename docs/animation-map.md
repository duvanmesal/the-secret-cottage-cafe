# Animation Map — The Secret Cottage Café

Defines every animation on the page: what triggers it, what library owns it, timing, and easing.

---

## Global Rules

- **Scroll smoothing:** Lenis — always active, wraps the entire page
- **GSAP ScrollTrigger:** all scroll-driven narrative animations
- **Motion:** UI microinteractions only (hover, focus, click, form states)
- **Spline:** internal 3D scene animations driven by scroll events or clicks
- **React Three Fiber:** particle/steam/petal effects, not page-level scroll
- Default easing: `power2.out` for GSAP, `easeOut` for Motion
- Minimum animation duration: 0.4s — never feel rushed
- All scroll-triggered reveals use `start: "top 80%"` unless specified otherwise

---

## Section 1 — Hero

| Element              | Trigger         | Library | Animation                                   | Duration | Easing        |
|----------------------|-----------------|---------|---------------------------------------------|----------|---------------|
| Page load overlay    | On mount        | GSAP    | Fade out from black, scale 1.02 → 1         | 1.4s     | power2.out    |
| Wordmark             | After overlay   | GSAP    | Opacity 0 → 1, Y +20px → 0                 | 1.0s     | power3.out    |
| Subheadline          | 0.3s after wordmark | GSAP | Opacity 0 → 1, Y +16px → 0               | 0.8s     | power2.out    |
| Caveat accent        | 0.6s after subheadline | GSAP | Opacity 0 → 1, X −10px → 0            | 0.7s     | power2.out    |
| Scroll prompt        | 2.0s after load | GSAP    | Opacity 0 → 1, float loop Y ±6px           | 0.6s in, ∞ loop | power1.inOut |
| Spline scene         | First scroll    | Spline  | Camera pulls forward toward cottage door    | —        | Spline internal |
| Mist particles       | On mount        | Spline  | Continuous slow drift, opacity 0.3          | ∞        | Spline internal |

---

## Section 2 — Garden Path

| Element              | Trigger         | Library | Animation                                   | Duration | Easing        |
|----------------------|-----------------|---------|---------------------------------------------|----------|---------------|
| Foreground flowers   | Scroll through  | GSAP    | Parallax X: move left at 1.4× scroll speed  | scrub    | none (scrub)  |
| Mid-ground hedges    | Scroll through  | GSAP    | Parallax X: move left at 1.0× scroll speed  | scrub    | none (scrub)  |
| Background cottage   | Scroll through  | GSAP    | Parallax X: move left at 0.6× scroll speed  | scrub    | none (scrub)  |
| Ambient text         | top 70%         | GSAP    | Opacity 0 → 1, Y +24px → 0                 | 0.9s     | power2.out    |
| Body copy            | 0.2s stagger    | GSAP    | Opacity 0 → 1, Y +16px → 0                 | 0.8s     | power2.out    |
| Background color     | Scroll through  | GSAP    | Cream `#F5EFE6` → Soft Sage `#A7B89A`       | scrub    | none (scrub)  |

---

## Section 3 — Cottage Entrance

| Element              | Trigger         | Library | Animation                                   | Duration | Easing        |
|----------------------|-----------------|---------|---------------------------------------------|----------|---------------|
| Door image           | Scroll to 60%   | GSAP    | Scale 1 → 1.15 (slow zoom into door)        | scrub    | none (scrub)  |
| Door opening         | Scroll to 80%   | GSAP    | Door rotates open (3D perspective skew)     | scrub    | none (scrub)  |
| Light flood          | Door fully open | GSAP    | Warm overlay fades in, opacity 0 → 0.85     | 0.8s     | power3.out    |
| "Come inside." text  | top 50%         | GSAP    | Opacity 0 → 1, scale 0.95 → 1              | 1.0s     | power2.out    |
| Sub-text             | 0.4s after title| GSAP    | Opacity 0 → 1, Y +12px → 0                 | 0.7s     | power2.out    |
| Section exit         | Scroll out      | GSAP    | Entire section fades to Dark Espresso bg    | scrub    | none (scrub)  |

---

## Section 4 — Story

| Element              | Trigger         | Library | Animation                                   | Duration | Easing        |
|----------------------|-----------------|---------|---------------------------------------------|----------|---------------|
| Image panel          | top 75%         | GSAP    | Opacity 0 → 1, X −30px → 0 (slide from left) | 0.9s  | power2.out    |
| Pull quote           | top 70%         | GSAP    | Opacity 0 → 1, Y +20px → 0                 | 1.0s     | power3.out    |
| Body paragraphs      | top 75%, stagger 0.15s each | GSAP | Opacity 0 → 1, Y +16px → 0  | 0.7s     | power2.out    |
| Caveat accent        | After paragraphs| GSAP    | Opacity 0 → 1, X +10px → 0 (right drift)   | 0.6s     | power2.out    |
| Noise overlay        | Static          | CSS     | Always present, no animation                | —        | —             |

---

## Section 5 — Coffee Ritual

| Element              | Trigger         | Library | Animation                                   | Duration | Easing        |
|----------------------|-----------------|---------|---------------------------------------------|----------|---------------|
| Section background   | Scroll enter    | GSAP    | Fade from Cream → Dark Espresso             | scrub    | none (scrub)  |
| Step 1 (Beans)       | top 80%         | GSAP    | Opacity 0 → 1, Y +24px → 0                 | 0.8s     | power2.out    |
| Step 2 (Water)       | 0.2s after step 1 | GSAP  | Same reveal                                 | 0.8s     | power2.out    |
| Step 3 (Pour)        | 0.2s after step 2 | GSAP  | Same reveal                                 | 0.8s     | power2.out    |
| Step 4 (Cup)         | 0.2s after step 3 | GSAP  | Same reveal                                 | 0.8s     | power2.out    |
| Steam particles (R3F)| Cup step visible| R3F     | Particles rise from cup top, opacity 0→0.6→0| ∞ loop   | Custom ease   |
| Closing line         | After all steps | GSAP    | Opacity 0 → 1, scale 0.97 → 1              | 1.0s     | power3.out    |
| Step images          | Scroll through  | GSAP    | Parallax Y: each image drifts up at 0.3× speed | scrub | none (scrub) |

---

## Section 6 — Interactive Menu

| Element              | Trigger         | Library | Animation                                   | Duration | Easing        |
|----------------------|-----------------|---------|---------------------------------------------|----------|---------------|
| Section title        | top 80%         | GSAP    | Opacity 0 → 1, Y +20px → 0                 | 0.9s     | power3.out    |
| Menu cards (stagger) | top 75%         | GSAP    | Opacity 0 → 1, Y +16px → 0, 0.08s stagger  | 0.6s     | power2.out    |
| Card hover           | Mouse enter     | Motion  | Scale 1 → 1.03, shadow deepens             | 0.25s    | easeOut       |
| Card hover exit      | Mouse leave     | Motion  | Scale 1.03 → 1                              | 0.2s     | easeOut       |
| Card click / select  | Click           | Motion  | Scale → 0.97 → 1, ring border appears      | 0.15s    | easeOut       |
| Side panel open      | Item selected   | Motion  | X +40px → 0, opacity 0 → 1                 | 0.35s    | easeOut       |
| Side panel close     | Item deselected | Motion  | X 0 → 40px, opacity 1 → 0                  | 0.25s    | easeIn        |
| Category tabs        | Click           | Motion  | Underline slides to active tab              | 0.3s     | spring        |

---

## Section 7 — 3D Coffee Viewer

| Element              | Trigger         | Library | Animation                                   | Duration | Easing        |
|----------------------|-----------------|---------|---------------------------------------------|----------|---------------|
| Viewer mount         | Section visible | GSAP    | Opacity 0 → 1, scale 0.95 → 1              | 0.8s     | power2.out    |
| Cup idle rotation    | Continuous      | Spline  | Y-axis slow rotation, ~8s per revolution    | ∞        | Spline internal |
| Cup model swap       | Menu item select| Spline  | Cross-fade to new model                     | 0.4s     | Spline internal |
| Manual drag          | User drag       | Spline  | Spline handles drag-to-rotate               | —        | Spline internal |
| Steam overlay (R3F)  | Always on       | R3F     | Particles rise from cup rim                 | ∞ loop   | Custom ease   |
| "Turn me." label     | First mount     | Motion  | Opacity 0 → 1, 1.5s delay                  | 0.5s     | easeOut       |
| Label fade out       | After drag      | Motion  | Opacity 1 → 0                               | 0.4s     | easeIn        |
| Item name reveal     | Item selected   | Motion  | Opacity 0 → 1, Y +8px → 0                  | 0.4s     | easeOut       |

---

## Section 8 — Seasonal Garden

| Element              | Trigger         | Library | Animation                                   | Duration | Easing        |
|----------------------|-----------------|---------|---------------------------------------------|----------|---------------|
| Background image     | Scroll through  | GSAP    | Parallax Y: image moves up at 0.4× speed    | scrub    | none (scrub)  |
| Petal / leaf effect  | Section visible | R3F     | Particles spawn from top, drift diagonally  | ∞ loop   | Custom ease   |
| Season headline      | top 70%         | GSAP    | Opacity 0 → 1, Y +20px → 0                 | 1.0s     | power3.out    |
| Body copy            | 0.2s after title| GSAP    | Opacity 0 → 1, Y +16px → 0                 | 0.8s     | power2.out    |
| Featured drink card  | top 75%         | GSAP    | Opacity 0 → 1, X +20px → 0 (from right)    | 0.7s     | power2.out    |

---

## Section 9 — Gallery

| Element              | Trigger         | Library | Animation                                   | Duration | Easing        |
|----------------------|-----------------|---------|---------------------------------------------|----------|---------------|
| Gallery strip        | Scroll through  | GSAP    | Horizontal scroll pinned, driven by Y scroll | scrub   | none (scrub)  |
| Individual images    | As they enter   | GSAP    | Opacity 0 → 1 (subtle, within strip)        | 0.5s     | power2.out    |
| Vignette fade        | Always          | CSS     | Static vignette at strip edges              | —        | —             |
| Image hover (desktop)| Mouse enter     | Motion  | Scale 1 → 1.02                              | 0.3s     | easeOut       |

---

## Section 10 — Reservation

| Element              | Trigger         | Library | Animation                                   | Duration | Easing        |
|----------------------|-----------------|---------|---------------------------------------------|----------|---------------|
| Section title        | top 80%         | GSAP    | Opacity 0 → 1, Y +20px → 0                 | 1.0s     | power3.out    |
| Subtitle             | 0.2s after title| GSAP    | Opacity 0 → 1, Y +12px → 0                 | 0.7s     | power2.out    |
| Form fields (stagger)| top 75%         | GSAP    | Opacity 0 → 1, Y +10px → 0, 0.1s stagger   | 0.6s     | power2.out    |
| Field focus          | Focus           | Motion  | Underline scales X 0 → 1                   | 0.25s    | easeOut       |
| Field blur           | Blur            | Motion  | Label lifts Y 0 → −20px, scale → 0.85      | 0.2s     | easeOut       |
| Submit button hover  | Mouse enter     | Motion  | Width expands +12px, bg → Rose Clay        | 0.3s     | easeOut       |
| Submit button press  | Click           | Motion  | Scale 0.97, brief                           | 0.15s    | easeInOut     |
| Confirmation appear  | Submit success  | Motion  | Opacity 0 → 1, scale 0.9 → 1, cup appears  | 0.6s     | spring        |

---

## Section 11 — Footer

| Element              | Trigger         | Library | Animation                                   | Duration | Easing        |
|----------------------|-----------------|---------|---------------------------------------------|----------|---------------|
| Footer columns       | top 90%         | GSAP    | Opacity 0 → 1, Y +12px → 0, 0.1s stagger   | 0.6s     | power2.out    |
| Social icon hover    | Mouse enter     | Motion  | Scale 1 → 1.15, color → Rose Clay          | 0.2s     | easeOut       |
| Nav link hover       | Mouse enter     | Motion  | Underline slides in from left               | 0.25s    | easeOut       |

---

## Navigation

| Element              | Trigger         | Library | Animation                                   | Duration | Easing        |
|----------------------|-----------------|---------|---------------------------------------------|----------|---------------|
| Nav background       | Scroll past Hero| GSAP    | Transparent → semi-opaque Cream, blur       | scrub 0.3s | power2.out  |
| Nav links on load    | After hero in   | GSAP    | Opacity 0 → 1, Y −8px → 0, 0.1s stagger    | 0.5s     | power2.out    |
| Nav link hover       | Mouse enter     | Motion  | Letter-spacing subtle expand, underline in  | 0.2s     | easeOut       |
| Mobile menu open     | Click           | Motion  | Full-screen overlay scale from top-right    | 0.4s     | easeOut       |
| Mobile menu close    | Click           | Motion  | Reverse                                     | 0.3s     | easeIn        |
