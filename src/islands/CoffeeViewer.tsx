import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { menuItems, type MenuItem } from '../data/menuItems'
import { useCafeStore } from '../store/useCafeStore'

// ─── Colour utilities ─────────────────────────────────────────────────────────

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '')
  return [
    parseInt(h.substring(0, 2), 16),
    parseInt(h.substring(2, 4), 16),
    parseInt(h.substring(4, 6), 16),
  ]
}

function clampByte(v: number) { return Math.min(255, Math.max(0, Math.round(v))) }

function adjustHex(hex: string, amount: number): string {
  const [r, g, b] = hexToRgb(hex)
  return `rgb(${clampByte(r + amount)}, ${clampByte(g + amount)}, ${clampByte(b + amount)})`
}

function hexWithAlpha(hex: string, alpha: number): string {
  const [r, g, b] = hexToRgb(hex)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

// ─── Floater positions (relative to 420 × 300 stage) ─────────────────────────

type Pos = React.CSSProperties
const ORBITAL: Pos[] = [
  { top: '16px',  right: '16px'  },
  { top: '50%',   right: '4px',  transform: 'translateY(-50%)' },
  { bottom: '22px', right: '20px' },
  { top: '16px',  left:  '16px'  },
  { top: '50%',   left:  '4px',  transform: 'translateY(-50%)' },
  { bottom: '22px', left:  '20px' },
]

// ─── CeramicCup ──────────────────────────────────────────────────────────────

interface CupProps { item: MenuItem; reduced: boolean }

function CeramicCup({ item, reduced }: CupProps) {
  const { cupColor, accentColor, category } = item

  // Ceramic surface shading from the cup's base colour
  const hiLight = adjustHex(cupColor, 42)
  const midTone = cupColor
  const shadow  = adjustHex(cupColor, -32)

  // Coffee surface colour: cold brews are lighter (cream on top), espresso is dark
  const surfaceBase =
    category === 'cold'
      ? adjustHex(accentColor,  28)
      : adjustHex(accentColor, -12)

  // Constant geometry (px)
  const CW = 134   // cup body width
  const CH = 112   // cup body height
  const SW = 182   // saucer width
  const SH = 18    // saucer height
  const SB = 0     // saucer bottom offset

  return (
    <div
      role="img"
      aria-label={`Ceramic cup of ${item.name}`}
      style={{ position: 'relative', width: `${SW + 16}px`, height: '210px', flexShrink: 0 }}
    >
      {/* ── Saucer drop shadow ── */}
      <div style={{
        position: 'absolute',
        bottom: SB - 6,
        left: '50%', transform: 'translateX(-50%)',
        width: SW * 0.84, height: 12,
        borderRadius: '50%',
        background: 'rgba(36,26,20,0.11)',
        filter: 'blur(8px)',
      }} />

      {/* ── Saucer ── */}
      <div style={{
        position: 'absolute',
        bottom: SB, left: '50%', transform: 'translateX(-50%)',
        width: SW, height: SH,
        borderRadius: '50%',
        background: `linear-gradient(175deg, ${hiLight} 0%, ${midTone} 55%, ${shadow} 100%)`,
        boxShadow: `0 2px 14px rgba(36,26,20,0.12), inset 0 -2px 4px rgba(0,0,0,0.07)`,
      }} />

      {/* ── Cup body ── */}
      <div style={{
        position: 'absolute',
        bottom: SB + SH - 5,
        left: '50%', transform: 'translateX(-50%)',
        width: CW, height: CH,
        borderRadius: '4px 4px 17px 17px',
        background: `linear-gradient(148deg, ${hiLight} 0%, ${midTone} 44%, ${shadow} 100%)`,
        boxShadow: [
          '0 14px 42px rgba(36,26,20,0.16)',
          'inset 0 1px 0 rgba(255,255,255,0.16)',
          'inset -4px 0 14px rgba(0,0,0,0.09)',
        ].join(', '),
        overflow: 'hidden',
      }}>
        {/* Gloss highlight strip (ceramic sheen) */}
        <div style={{
          position: 'absolute',
          left: 10, top: 14,
          width: 7, bottom: 22,
          borderRadius: 4,
          background: 'linear-gradient(180deg, rgba(255,255,255,0.34) 0%, rgba(255,255,255,0.02) 100%)',
        }} />
        {/* Bottom curve reflection */}
        <div style={{
          position: 'absolute',
          bottom: 10, left: '28%', right: '28%',
          height: 3, borderRadius: 2,
          background: 'rgba(255,255,255,0.11)',
        }} />

        {/* ── Rim ring (top edge of cup) ── */}
        <div style={{
          position: 'absolute',
          top: -6, left: -1, right: -1,
          height: 14,
          borderRadius: '50%',
          background: `linear-gradient(180deg, ${hiLight} 0%, ${midTone} 100%)`,
          boxShadow: '0 1px 0 rgba(0,0,0,0.06)',
          zIndex: 3,
        }} />

        {/* ── Coffee / drink surface ── */}
        <div style={{
          position: 'absolute',
          top: 0, left: 3, right: 3,
          height: 28,
          borderRadius: '50%',
          background: `radial-gradient(ellipse 55% 44% at 40% 38%, ${adjustHex(surfaceBase, 26)} 0%, ${surfaceBase} 52%, ${adjustHex(surfaceBase, -20)} 100%)`,
          boxShadow: 'inset 0 5px 12px rgba(0,0,0,0.24)',
          zIndex: 2,
        }} />

        {/* ── Handle ── */}
        <div style={{
          position: 'absolute',
          right: -30, top: 22,
          width: 30, height: 46,
          border: `3px solid ${adjustHex(cupColor, 22)}`,
          borderLeft: 'none',
          borderRadius: '0 22px 22px 0',
          boxShadow: '2px 2px 6px rgba(0,0,0,0.07)',
        }} />
      </div>

    </div>
  )
}

// ─── FloatingIngredient ───────────────────────────────────────────────────────

interface FloatProps {
  label: string
  index: number
  accentColor: string
  reduced: boolean
}

function FloatingIngredient({ label, index, accentColor, reduced }: FloatProps) {
  const pos = ORBITAL[index % ORBITAL.length]

  return (
    // Outer: entry animation
    <motion.div
      style={{ position: 'absolute', ...pos }}
      initial={reduced ? false : { opacity: 0, scale: 0.65 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.32, delay: 0.22 + index * 0.07, ease: 'easeOut' }}
    >
      {/* Inner: float loop */}
      <motion.div
        animate={reduced ? {} : { y: [0, -8, 0] }}
        transition={{
          duration: 3.2 + index * 0.38,
          ease: 'easeInOut',
          repeat: Infinity,
          delay: index * 0.28,
        }}
      >
        <span style={{
          display: 'block',
          fontFamily: 'var(--font-accent)',
          fontSize: '0.8rem',
          color: hexWithAlpha(accentColor, 0.72),
          backgroundColor: 'rgba(245, 239, 230, 0.88)',
          border: `1px solid ${hexWithAlpha(accentColor, 0.22)}`,
          borderRadius: '20px',
          padding: '0.22rem 0.7rem',
          whiteSpace: 'nowrap',
          backdropFilter: 'blur(6px)',
          boxShadow: '0 2px 10px rgba(36,26,20,0.07)',
        }}>
          {label}
        </span>
      </motion.div>
    </motion.div>
  )
}

// ─── EmptyState ───────────────────────────────────────────────────────────────

function EmptyState() {
  // A default neutral-coloured cup with a prompt
  const neutral: MenuItem = {
    id: '__empty__',
    name: '',
    category: 'espresso',
    shortDescription: '',
    longDescription: '',
    price: '',
    ingredients: [],
    visualTheme: { mood: '', season: 'autumn', palette: ['#D8C3A5'] },
    cupColor: '#D8C3A5',
    accentColor: '#A88060',
    floatingElements: [],
    splineSceneKey: '',
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '2.5rem',
      padding: '3rem 1.5rem',
      minHeight: '340px',
      justifyContent: 'center',
    }}>
      <div style={{ opacity: 0.55 }}>
        <CeramicCup item={neutral} reduced={false} />
      </div>
      <div style={{ textAlign: 'center' }}>
        <p style={{
          fontFamily: 'var(--font-serif)',
          fontStyle: 'italic',
          fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
          color: 'rgba(90, 62, 43, 0.55)',
          marginBottom: '0.5rem',
        }}>
          Select a coffee to explore.
        </p>
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.7rem',
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: 'rgba(36, 26, 20, 0.28)',
        }}>
          3D scene · Spline · coming soon
        </p>
      </div>
    </div>
  )
}

// ─── FilledState ──────────────────────────────────────────────────────────────

interface FilledProps { item: MenuItem; reduced: boolean }

function FilledState({ item, reduced }: FilledProps) {
  const mood    = item.visualTheme.mood.split(',')[0].trim()
  const season  = item.visualTheme.season
  const palette = item.visualTheme.palette

  return (
    <div
      className="md:grid-cols-[1fr_auto]"
      style={{
        display: 'grid',
        gap: 'clamp(2rem, 5vw, 4rem)',
        alignItems: 'center',
        padding: 'clamp(2rem, 4vw, 3.5rem)',
      }}
    >
      {/* ── Left: metadata ── */}
      <div>
        {/* Season tag */}
        <motion.p
          key={`season-${item.id}`}
          initial={reduced ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.65rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#A7B89A',
            marginBottom: '1rem',
          }}
        >
          {season} · {item.category.replace('-', ' ')}
        </motion.p>

        {/* Name */}
        <motion.h3
          key={`name-${item.id}`}
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.38, delay: 0.05 }}
          style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            lineHeight: 1.1,
            color: '#5A3E2B',
            marginBottom: '1rem',
          }}
        >
          {item.name}
        </motion.h3>

        {/* Mood descriptor */}
        <motion.p
          key={`mood-${item.id}`}
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35, delay: 0.10 }}
          style={{
            fontFamily: 'var(--font-accent)',
            fontSize: '1.05rem',
            color: hexWithAlpha(item.accentColor, 0.65),
            marginBottom: '1.5rem',
          }}
        >
          {mood}
        </motion.p>

        {/* Colour palette swatches */}
        <motion.div
          key={`pal-${item.id}`}
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          style={{ display: 'flex', gap: '0.4rem', marginBottom: '1.75rem' }}
        >
          {palette.map((c, i) => (
            <span
              key={i}
              title={c}
              style={{
                display: 'block',
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                backgroundColor: c,
                border: '1px solid rgba(36,26,20,0.10)',
                boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
              }}
            />
          ))}
        </motion.div>

        {/* Floating elements list */}
        <motion.div
          key={`elements-${item.id}`}
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.18 }}
          style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '2rem' }}
        >
          {item.floatingElements.map((el) => (
            <span
              key={el}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.7rem',
                fontWeight: 300,
                color: 'rgba(36,26,20,0.48)',
                border: '1px solid rgba(216,195,165,0.65)',
                borderRadius: '20px',
                padding: '0.22rem 0.65rem',
                letterSpacing: '0.03em',
              }}
            >
              {el}
            </span>
          ))}
        </motion.div>

        {/* 3D viewer label */}
        <motion.div
          key={`hint-${item.id}`}
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.22 }}
          style={{
            borderTop: '1px solid rgba(216,195,165,0.55)',
            paddingTop: '1.25rem',
          }}
        >
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.65rem',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'rgba(36,26,20,0.22)',
          }}>
            Spline 3D scene · coming soon
          </p>
        </motion.div>
      </div>

      {/* ── Right: cup stage with floaters ── */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '420px',
          height: '300px',
          flexShrink: 0,
          justifySelf: 'center',
        }}
      >
        {/* Ambient glow behind cup */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse 65% 60% at 50% 55%, ${hexWithAlpha(item.cupColor, 0.22)} 0%, transparent 70%)`,
          pointerEvents: 'none',
        }} />

        {/* The ceramic cup — centred */}
        <motion.div
          key={`cup-${item.id}`}
          initial={reduced ? false : { opacity: 0, scale: 0.88, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'absolute',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -48%)',
          }}
        >
          <CeramicCup item={item} reduced={reduced} />
        </motion.div>

        {/* Floating ingredient labels */}
        {item.floatingElements.slice(0, 6).map((el, i) => (
          <FloatingIngredient
            key={`${item.id}-${el}`}
            label={el}
            index={i}
            accentColor={item.accentColor}
            reduced={reduced}
          />
        ))}
      </div>
    </div>
  )
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function CoffeeViewer() {
  const { selectedCoffeeId } = useCafeStore()
  const reduced = useReducedMotion() ?? false

  const selected = menuItems.find((i) => i.id === selectedCoffeeId) ?? null

  return (
    <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '3px' }}>

      {/* Ambient background wash — unique colour per coffee */}
      <AnimatePresence>
        {selected && (
          <motion.div
            key={`bg-${selected.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            style={{
              position: 'absolute', inset: 0,
              background: `radial-gradient(ellipse 90% 70% at 50% 30%, ${hexWithAlpha(selected.visualTheme.palette[0], 0.10)} 0%, transparent 65%)`,
              pointerEvents: 'none',
            }}
          />
        )}
      </AnimatePresence>

      {/* Content — AnimatePresence swaps empty ↔ filled states */}
      <AnimatePresence mode="wait">
        {selected ? (
          <motion.div
            key={selected.id}
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? {} : { opacity: 0 }}
            transition={{ duration: 0.32, ease: 'easeOut' }}
          >
            <FilledState item={selected} reduced={reduced} />
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? {} : { opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <EmptyState />
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}
