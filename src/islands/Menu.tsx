import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { menuItems, type MenuItem } from '../data/menuItems'
import { useCafeStore } from '../store/useCafeStore'

// ─── Constants ────────────────────────────────────────────────────────────────

const CATEGORY_LABELS: Record<string, string> = {
  'seasonal-special': 'Seasonal Special',
  'espresso':         'Espresso',
  'pour-over':        'Pour-Over',
  'cold':             'Cold Brew',
  'pastry':           'Pastry',
}

const SEASON_LABELS: Record<string, string> = {
  spring: 'Spring',
  summer: 'Summer',
  autumn: 'Autumn',
  winter: 'Winter',
}

// Palette literals so Motion can interpolate them correctly
const BORDER_DEFAULT  = 'rgba(216, 195, 165, 0.6)'
const BORDER_SELECTED = '#5A3E2B'
const SHADOW_DEFAULT  = '0 2px 10px rgba(90, 62, 43, 0.05)'
const SHADOW_SELECTED = '0 12px 44px rgba(90, 62, 43, 0.13)'
const SHADOW_HOVER    = '0 16px 52px rgba(90, 62, 43, 0.10)'

// ─── MenuCard ─────────────────────────────────────────────────────────────────

interface CardProps {
  item: MenuItem
  isSelected: boolean
  onSelect: (id: string) => void
  reduced: boolean
}

function MenuCard({ item, isSelected, onSelect, reduced }: CardProps) {
  return (
    <motion.button
      onClick={() => onSelect(item.id)}
      className="menu-card"
      aria-pressed={isSelected}
      aria-label={`Select ${item.name}`}
      // Selection-driven spring transitions
      animate={{
        borderColor:  isSelected ? BORDER_SELECTED : BORDER_DEFAULT,
        boxShadow:    isSelected ? SHADOW_SELECTED : SHADOW_DEFAULT,
        backgroundColor: isSelected
          ? hexWithAlpha(item.cupColor, 0.13)
          : '#F5EFE6',
      }}
      whileHover={reduced ? {} : {
        y: -4,
        boxShadow: SHADOW_HOVER,
      }}
      whileTap={reduced ? {} : { scale: 0.985 }}
      transition={{ duration: 0.26, ease: 'easeOut' }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'left',
        padding: 'clamp(1.4rem, 3vw, 1.75rem)',
        borderWidth: '1.5px',
        borderStyle: 'solid',
        borderRadius: '3px',
        cursor: 'pointer',
        appearance: 'none',
        WebkitAppearance: 'none',
        width: '100%',
        minHeight: '200px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Selected rim — animated line along the top edge */}
      <motion.span
        aria-hidden="true"
        animate={{ scaleX: isSelected ? 1 : 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          backgroundColor: item.accentColor,
          transformOrigin: 'left',
        }}
      />

      {/* Category + season labels */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
        <span style={styles.label}>
          {CATEGORY_LABELS[item.category] ?? item.category}
        </span>
        <span style={{ ...styles.accent, color: 'rgba(201, 143, 122, 0.65)' }}>
          {SEASON_LABELS[item.visualTheme.season] ?? item.visualTheme.season}
        </span>
      </div>

      {/* Cup colour accent strip */}
      <span
        aria-hidden="true"
        style={{
          display: 'block',
          width: '28px',
          height: '3px',
          borderRadius: '2px',
          backgroundColor: item.cupColor,
          marginBottom: '1rem',
          opacity: 0.85,
        }}
      />

      {/* Item name */}
      <h3 style={styles.cardName}>{item.name}</h3>

      {/* Short description */}
      <p style={{ ...styles.bodyLight, flexGrow: 1, marginBottom: '1.4rem' }}>
        {item.shortDescription}
      </p>

      {/* Price row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={styles.price}>{item.price}</span>

        <AnimatePresence>
          {isSelected && (
            <motion.span
              initial={{ opacity: 0, x: 6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 6 }}
              transition={{ duration: 0.2 }}
              style={styles.selectedBadge}
            >
              Selected
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </motion.button>
  )
}

// ─── DrinkDetail ──────────────────────────────────────────────────────────────

function DrinkDetail({ item, reduced }: { item: MenuItem; reduced: boolean }) {
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduced ? {} : { opacity: 0, y: 10 }}
      transition={{ duration: 0.42, ease: 'easeOut' }}
      style={{
        marginTop: '2rem',
        border: '1px solid rgba(216, 195, 165, 0.6)',
        borderRadius: '3px',
        padding: 'clamp(1.75rem, 5vw, 3rem)',
        backgroundColor: '#F5EFE6',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Cup colour wash in the top-right corner */}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '220px',
          height: '220px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${hexWithAlpha(item.cupColor, 0.18)} 0%, transparent 70%)`,
          transform: 'translate(40%, -40%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ display: 'grid', gap: 'clamp(1.5rem, 4vw, 3rem)', position: 'relative' }}
           className="md:grid-cols-2">

        {/* Left — name + long description */}
        <div>
          <motion.h3
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.06 }}
            style={styles.detailName}
          >
            {item.name}
          </motion.h3>

          <span aria-hidden="true" style={styles.dividerLine} />

          <motion.p
            style={styles.bodyRelaxed}
            {...(!reduced && {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { duration: 0.4, delay: 0.12 },
            })}
          >
            {item.longDescription}
          </motion.p>
        </div>

        {/* Right — ingredients + 3D hint */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <p style={styles.label}>What goes in</p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginTop: '0.75rem', marginBottom: '2rem' }}>
            {item.ingredients.map((ing, i) => (
              <motion.span
                key={ing}
                style={styles.ingredientTag}
                {...(!reduced && {
                  initial: { opacity: 0, y: 6 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.28, delay: 0.14 + i * 0.055 },
                })}
              >
                {ing}
              </motion.span>
            ))}
          </div>

          {/* 3D viewer hook */}
          <div style={{
            marginTop: 'auto',
            borderTop: '1px solid rgba(216, 195, 165, 0.5)',
            paddingTop: '1.25rem',
          }}>
            <p style={{ ...styles.accent, color: 'rgba(201, 143, 122, 0.7)', fontSize: '1.05rem' }}>
              Explore this cup below ↓
            </p>
            <p style={{ ...styles.label, marginTop: '0.3rem', color: 'rgba(36, 26, 20, 0.2)' }}>
              3D Viewer · Spline
            </p>
          </div>
        </div>

      </div>
    </motion.div>
  )
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function Menu() {
  const { selectedCoffeeId, setSelectedCoffee } = useCafeStore()
  const reduced = useReducedMotion() ?? false

  const selectedItem = menuItems.find((i) => i.id === selectedCoffeeId) ?? null

  const handleSelect = (id: string) => {
    // Clicking the active card deselects it
    setSelectedCoffee(selectedCoffeeId === id ? null : id)
  }

  return (
    <div>
      {/* ─── Cards grid ─────────────────────────────────────────────────── */}
      <div style={{
        display: 'grid',
        gap: '0.9rem',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(260px, 100%), 1fr))',
      }}>
        {menuItems.map((item) => (
          <MenuCard
            key={item.id}
            item={item}
            isSelected={item.id === selectedCoffeeId}
            onSelect={handleSelect}
            reduced={reduced}
          />
        ))}
      </div>

      {/* ─── Expanded detail panel ──────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {selectedItem && (
          <DrinkDetail
            key={selectedItem.id}
            item={selectedItem}
            reduced={reduced}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Shared style tokens (avoids repetition without a CSS file) ───────────────

const styles = {
  label: {
    fontFamily: 'var(--font-sans)',
    fontSize: '0.65rem',
    letterSpacing: '0.18em',
    textTransform: 'uppercase' as const,
    color: '#A7B89A',
  },
  accent: {
    fontFamily: 'var(--font-accent)',
    fontSize: '0.95rem',
  },
  cardName: {
    fontFamily: 'var(--font-serif)',
    fontStyle: 'italic',
    fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
    fontWeight: 400,
    lineHeight: 1.22,
    color: '#5A3E2B',
    marginBottom: '0.55rem',
    marginTop: 0,
  },
  detailName: {
    fontFamily: 'var(--font-serif)',
    fontStyle: 'italic',
    fontSize: 'clamp(1.7rem, 3.5vw, 2.5rem)',
    fontWeight: 400,
    lineHeight: 1.12,
    color: '#5A3E2B',
    marginBottom: '1.2rem',
    marginTop: 0,
  },
  bodyLight: {
    fontFamily: 'var(--font-sans)',
    fontWeight: 300,
    fontSize: '0.85rem',
    lineHeight: 1.55,
    color: 'rgba(36, 26, 20, 0.55)',
    margin: 0,
  },
  bodyRelaxed: {
    fontFamily: 'var(--font-sans)',
    fontWeight: 300,
    fontSize: '1rem',
    lineHeight: 1.8,
    color: 'rgba(36, 26, 20, 0.7)',
    margin: 0,
  },
  price: {
    fontFamily: 'var(--font-sans)',
    fontSize: '0.8rem',
    letterSpacing: '0.04em',
    color: 'rgba(36, 26, 20, 0.38)',
  },
  selectedBadge: {
    fontFamily: 'var(--font-sans)',
    fontSize: '0.6rem',
    letterSpacing: '0.18em',
    textTransform: 'uppercase' as const,
    color: '#5A3E2B',
  },
  dividerLine: {
    display: 'block',
    width: '36px',
    height: '1px',
    backgroundColor: '#D8C3A5',
    marginBottom: '1.2rem',
  },
  ingredientTag: {
    fontFamily: 'var(--font-sans)',
    fontWeight: 300,
    fontSize: '0.72rem',
    color: 'rgba(36, 26, 20, 0.55)',
    letterSpacing: '0.03em',
    border: '1px solid rgba(216, 195, 165, 0.7)',
    borderRadius: '20px',
    padding: '0.28rem 0.75rem',
    display: 'inline-block',
  },
} as const

// ─── Utility ─────────────────────────────────────────────────────────────────

/** Convert a 6-digit hex colour to rgba with the given alpha (0–1). */
function hexWithAlpha(hex: string, alpha: number): string {
  const h = hex.replace('#', '')
  const r = parseInt(h.substring(0, 2), 16)
  const g = parseInt(h.substring(2, 4), 16)
  const b = parseInt(h.substring(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}
