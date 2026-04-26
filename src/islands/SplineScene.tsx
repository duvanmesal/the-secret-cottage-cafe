import {
  Component,
  Suspense,
  lazy,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react'
import type { FallbackTheme } from '../data/splineScenes'

// ─── Lazy Spline ─────────────────────────────────────────────────────────────
// The factory is only invoked when React first renders the lazy component.
// We gate that on `mounted && inViewport && hasUrl`, so Spline never loads on
// the server and never blocks LCP.
const SplineLazy = lazy(() => import('@splinetool/react-spline'))

// ─── Inline noise SVG (matches global .noise-overlay) ────────────────────────
const NOISE_DATA_URL =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")"

// ─── Error boundary ──────────────────────────────────────────────────────────
// Class component because hooks cannot catch render errors.
// Notifies parent so the placeholder can switch into its error state.
interface ErrBoundaryProps {
  children: ReactNode
  onError: () => void
}
class SplineErrorBoundary extends Component<ErrBoundaryProps, { hasError: boolean }> {
  state = { hasError: false }

  static getDerivedStateFromError(): { hasError: true } {
    return { hasError: true }
  }

  componentDidCatch(): void {
    this.props.onError()
  }

  render(): ReactNode {
    return this.state.hasError ? null : this.props.children
  }
}

// ─── Premium fallback placeholder ────────────────────────────────────────────
// Always rendered. Fades out smoothly once Spline is loaded and error-free.

type PlaceholderState = 'idle' | 'loading' | 'error'

interface FallbackProps {
  title: string
  description?: string
  theme: FallbackTheme
  state: PlaceholderState
}

function FallbackPlaceholder({ title, description, theme, state }: FallbackProps) {
  const isDark =
    theme.mood === 'warm-dark' ||
    theme.mood === 'rich-dark' ||
    theme.mood === 'forest'

  const textPrimary = isDark ? 'rgba(245, 239, 230, 0.92)' : 'rgba(36, 26, 20, 0.85)'
  const textMuted   = isDark ? 'rgba(245, 239, 230, 0.55)' : 'rgba(36, 26, 20, 0.50)'
  const textFaint   = isDark ? 'rgba(245, 239, 230, 0.32)' : 'rgba(36, 26, 20, 0.30)'
  const cornerStroke = isDark ? 'rgba(245, 239, 230, 0.22)' : 'rgba(90, 62, 43, 0.28)'
  const dividerColor = isDark ? 'rgba(245, 239, 230, 0.30)' : 'rgba(90, 62, 43, 0.30)'

  return (
    <div
      role="img"
      aria-label={`${title} — scene placeholder`}
      style={{
        position: 'absolute',
        inset: 0,
        background: theme.background,
        overflow: 'hidden',
      }}
    >
      {/* Primary atmospheric glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse 55% 45% at 50% 50%, ${theme.glow} 0%, transparent 65%)`,
          opacity: 0.40,
          pointerEvents: 'none',
        }}
      />

      {/* Secondary accent — off-centre rim light */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse 35% 30% at 72% 28%, ${theme.accent} 0%, transparent 70%)`,
          opacity: 0.20,
          pointerEvents: 'none',
        }}
      />

      {/* Vignette */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 55%, rgba(10, 8, 6, 0.35) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Grain */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: NOISE_DATA_URL,
          opacity: 0.030,
          pointerEvents: 'none',
        }}
      />

      {/* Corner marks */}
      <span aria-hidden="true" style={cornerStyle('top-left',     cornerStroke)} />
      <span aria-hidden="true" style={cornerStyle('top-right',    cornerStroke)} />
      <span aria-hidden="true" style={cornerStyle('bottom-left',  cornerStroke)} />
      <span aria-hidden="true" style={cornerStyle('bottom-right', cornerStroke)} />

      {/* Title card */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: 'clamp(1.5rem, 5vw, 3rem)',
          gap: '0.85rem',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.65rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: textFaint,
            margin: 0,
          }}
        >
          3D Scene · Spline
        </p>

        <h3
          style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 'clamp(1.4rem, 3.4vw, 2.2rem)',
            lineHeight: 1.15,
            color: textPrimary,
            margin: 0,
            maxWidth: '420px',
          }}
        >
          {title}
        </h3>

        {description && (
          <>
            <span
              aria-hidden="true"
              style={{
                display: 'block',
                width: '28px',
                height: '1px',
                background: dividerColor,
                margin: '0.4rem 0',
              }}
            />
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 300,
                fontSize: 'clamp(0.85rem, 1.6vw, 0.95rem)',
                lineHeight: 1.65,
                color: textMuted,
                maxWidth: '340px',
                margin: 0,
              }}
            >
              {description}
            </p>
          </>
        )}

        {state !== 'idle' && (
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.62rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: textFaint,
              marginTop: '0.6rem',
            }}
          >
            {state === 'loading' ? 'Loading scene…' : 'Scene unavailable · showing preview'}
          </p>
        )}
      </div>
    </div>
  )
}

function cornerStyle(
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right',
  stroke: string,
): CSSProperties {
  const base: CSSProperties = {
    position: 'absolute',
    width: 14,
    height: 14,
    pointerEvents: 'none',
  }
  const v = position.startsWith('top') ? 'top' : 'bottom'
  const h = position.endsWith('left')  ? 'left' : 'right'
  const borderV = `1px solid ${stroke}`
  return {
    ...base,
    [v]: 16,
    [h]: 16,
    [`border${v[0].toUpperCase()}${v.slice(1)}`]: borderV,
    [`border${h[0].toUpperCase()}${h.slice(1)}`]: borderV,
  } as CSSProperties
}

// ─── Main component ──────────────────────────────────────────────────────────

export interface SplineSceneProps {
  /** Spline `.splinecode` URL. If null/empty, the placeholder is shown. */
  sceneUrl: string | null
  /** Title shown on the placeholder */
  title: string
  /** Optional description shown on the placeholder */
  description?: string
  /** Optional className applied to the outer container */
  className?: string
  /** Visual theme for the placeholder */
  fallbackTheme: FallbackTheme
}

export default function SplineScene({
  sceneUrl,
  title,
  description,
  className,
  fallbackTheme,
}: SplineSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted]         = useState(false)
  const [inViewport, setInViewport]   = useState(false)
  const [splineReady, setSplineReady] = useState(false)
  const [errored, setErrored]         = useState(false)

  const hasUrl = typeof sceneUrl === 'string' && sceneUrl.length > 0
  const shouldMountSpline = mounted && inViewport && hasUrl && !errored

  // Mark as mounted after first client render — keeps SSR output identical
  useEffect(() => {
    setMounted(true)
  }, [])

  // Defer Spline mount until container enters the viewport (perf rule #1, #2)
  useEffect(() => {
    if (!hasUrl) return
    const node = containerRef.current
    if (!node) return

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInViewport(true)
          io.disconnect()
        }
      },
      { rootMargin: '200px 0px' },
    )
    io.observe(node)
    return () => io.disconnect()
  }, [hasUrl])

  const placeholderState: PlaceholderState = errored
    ? 'error'
    : shouldMountSpline && !splineReady
      ? 'loading'
      : 'idle'

  // Hide placeholder once Spline is ready (and no error)
  const hidePlaceholder = splineReady && !errored

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: '320px',
        overflow: 'hidden',
        borderRadius: '3px',
      }}
    >
      {/* Fallback layer — always rendered, fades out when Spline is ready */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: hidePlaceholder ? 0 : 1,
          transition: 'opacity 0.7s ease-out',
          pointerEvents: hidePlaceholder ? 'none' : 'auto',
        }}
      >
        <FallbackPlaceholder
          title={title}
          description={description}
          theme={fallbackTheme}
          state={placeholderState}
        />
      </div>

      {/* Spline layer — mounted only when in viewport and URL is present */}
      {shouldMountSpline && sceneUrl && (
        <SplineErrorBoundary onError={() => setErrored(true)}>
          <Suspense fallback={null}>
            <SplineLazy
              scene={sceneUrl}
              onLoad={() => setSplineReady(true)}
              style={{ position: 'absolute', inset: 0 }}
            />
          </Suspense>
        </SplineErrorBoundary>
      )}
    </div>
  )
}
