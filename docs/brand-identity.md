# Brand Identity — The Secret Cottage Café

## Name

**The Secret Cottage Café**

The word "secret" is the emotional core of the brand. It implies discovery, intimacy, and the pleasure of knowing about something rare. The café is a place you find — not a place you stumble upon by accident.

---

## Color Palette

| Name           | Hex       | Use                                                              |
|----------------|-----------|------------------------------------------------------------------|
| Cream          | `#F5EFE6` | Primary background, page canvas, lightest surfaces              |
| Warm Beige     | `#D8C3A5` | Secondary backgrounds, cards, dividers, subtle texture overlays |
| Coffee Brown   | `#5A3E2B` | Primary headings, key UI elements, strong accents               |
| Forest Green   | `#3F5D45` | Garden section backgrounds, nature accents, nav hover states    |
| Soft Sage      | `#A7B89A` | Subtle plant details, secondary text on dark backgrounds        |
| Rose Clay      | `#C98F7A` | Warm highlight accents, CTA buttons, hovered states             |
| Dark Espresso  | `#241A14` | Body text, darkest shadows, footer background                   |

### Usage Rules

- Never use pure white (`#FFFFFF`) or pure black (`#000000`) anywhere
- Cream is the default page background
- Dark Espresso is the default text color
- Rose Clay is reserved for moments of warmth and action — do not overuse
- Forest Green appears only in garden-related and footer sections
- Gradients should always blend between adjacent palette colors (e.g., Cream → Warm Beige)

---

## Typography

### Headings — Playfair Display
- Weight: 400 (regular) and 700 (bold)
- Used for all section titles, hero text, product names
- Character: literary, refined, slightly nostalgic
- Load via Google Fonts: `Playfair+Display:ital,wght@0,400;0,700;1,400`

### Body — Inter
- Weight: 300 (light) and 400 (regular)
- Used for all paragraphs, descriptions, UI labels, navigation
- Character: clean, neutral, highly legible
- Load via Google Fonts: `Inter:wght@300;400`

### Accent — Caveat
- Weight: 400 only
- Used **sparingly** for handwritten details: labels on menu items, small asides, signature moments
- Never use for primary navigation or body paragraphs
- Load via Google Fonts: `Caveat:wght@400`

### Type Scale (base 16px)

| Token      | Size    | Font              | Use                          |
|------------|---------|-------------------|------------------------------|
| `display`  | 72–96px | Playfair Display  | Hero headline                |
| `h1`       | 56px    | Playfair Display  | Section titles               |
| `h2`       | 40px    | Playfair Display  | Subsection headings          |
| `h3`       | 28px    | Playfair Display  | Card titles, menu items      |
| `body-lg`  | 18px    | Inter 300         | Lead paragraphs              |
| `body`     | 16px    | Inter 400         | General body text            |
| `small`    | 13px    | Inter 400         | Captions, labels             |
| `accent`   | 20px    | Caveat 400        | Handwritten accent details   |

---

## Logo

- Wordmark: "The Secret Cottage Café" in Playfair Display italic
- Optional icon: a simplified cottage silhouette with a steaming cup integrated into the chimney
- Color: Coffee Brown on Cream, or Cream on Coffee Brown
- Never stretch, rotate, or apply drop shadows to the logo

---

## Iconography

- Style: thin-line, hand-drawn aesthetic (not geometric or flat)
- Stroke weight: 1–1.5px
- Color: Coffee Brown or Soft Sage depending on background
- Sources: custom SVGs preferred; Phosphor Icons (thin variant) as fallback

---

## Texture & Surface Language

- Linen: subtle noise overlays on background sections (opacity 3–6%)
- Wood grain: used as dividers or card backgrounds in Story and Ritual sections
- Ceramic: smooth, matte gradients for cup and menu item renders
- Paper: slight warm tint on any "card" or "note" UI element
- All textures should feel aged and handmade, never digital or sterile

---

## Motion Personality

- Easing: always ease-out or custom organic curves — never linear
- Speed: slightly slower than expected (comfort, not urgency)
- Reveals: fade + subtle upward drift (12–20px), never bounce
- Hover states: gentle scale (1.02–1.04x) + soft shadow deepening
- No sudden cuts, no aggressive transitions
- Lenis handles all scroll smoothness globally
