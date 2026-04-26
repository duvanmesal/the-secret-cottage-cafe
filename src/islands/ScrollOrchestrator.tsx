import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// ─── ScrollOrchestrator ───────────────────────────────────────────────────────
// Owns: Lenis smooth scroll + GSAP ScrollTrigger sync + all section reveals.
// Renders nothing — purely behavioral. Mounted with client:load.

export default function ScrollOrchestrator() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // ── Lenis ─────────────────────────────────────────────────────────────────
    const lenis = new Lenis({
      lerp: 0.09,
      smoothWheel: true,
    })

    // Sync Lenis → ScrollTrigger on every scroll event
    lenis.on('scroll', ScrollTrigger.update)

    // Drive Lenis from GSAP's ticker so they share the same frame budget
    const rafCallback = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(rafCallback)
    gsap.ticker.lagSmoothing(0)

    // Refresh ScrollTrigger positions once fonts have settled
    document.fonts.ready.then(() => ScrollTrigger.refresh())

    // ── Guard: no animations when prefers-reduced-motion is set ───────────────
    if (prefersReduced) {
      return () => {
        gsap.ticker.remove(rafCallback)
        ScrollTrigger.getAll().forEach((t) => t.kill())
        lenis.destroy()
      }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // HERO — scroll-out parallax
    // CSS animations (.animate-fade-up-*) handle the load-in independently.
    // This only fires as the user scrolls past the hero.
    // ─────────────────────────────────────────────────────────────────────────
    gsap.to('[data-hero-content]', {
      y: -48,
      opacity: 0.28,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: '65% top',
        scrub: 1.4,
      },
    })

    // ─────────────────────────────────────────────────────────────────────────
    // GARDEN PATH — depth parallax on scene layers + soft text reveal
    // ─────────────────────────────────────────────────────────────────────────
    const parallaxLayers: [string, number][] = [
      ['.garden-treeline',   -55],
      ['.garden-hedges',     -30],
      ['.garden-path-strip', -13],
    ]
    parallaxLayers.forEach(([selector, yEnd]) => {
      gsap.to(selector, {
        y: yEnd,
        ease: 'none',
        scrollTrigger: {
          trigger: '#garden-path',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    })

    gsap.from('#garden-path h2', {
      opacity: 0,
      y: 20,
      duration: 0.9,
      ease: 'power2.out',
      scrollTrigger: { trigger: '#garden-path h2', start: 'top 82%' },
    })
    gsap.from('#garden-path .max-w-2xl p', {
      opacity: 0,
      y: 16,
      duration: 0.85,
      ease: 'power2.out',
      scrollTrigger: { trigger: '#garden-path .max-w-2xl p', start: 'top 84%' },
    })

    // ─────────────────────────────────────────────────────────────────────────
    // COTTAGE ENTRANCE — door emerges, then text arrives
    // ─────────────────────────────────────────────────────────────────────────
    gsap.from('[data-entrance-door]', {
      opacity: 0,
      scale: 0.93,
      y: 20,
      duration: 1.15,
      ease: 'power2.out',
      scrollTrigger: { trigger: '#cottage-entrance', start: 'top 72%' },
    })
    gsap.from('[data-entrance-text] > *', {
      opacity: 0,
      y: 14,
      duration: 0.85,
      ease: 'power2.out',
      stagger: 0.14,
      scrollTrigger: { trigger: '#cottage-entrance', start: 'top 68%' },
    })

    // ─────────────────────────────────────────────────────────────────────────
    // STORY — left image column rises, right text column staggers in
    // ─────────────────────────────────────────────────────────────────────────
    gsap.from('[data-story-left]', {
      opacity: 0,
      y: 26,
      duration: 1.05,
      ease: 'power2.out',
      scrollTrigger: { trigger: '#story', start: 'top 76%' },
    })
    gsap.from('[data-story-right] > *', {
      opacity: 0,
      y: 16,
      duration: 0.82,
      ease: 'power2.out',
      stagger: 0.11,
      scrollTrigger: { trigger: '#story', start: 'top 76%' },
    })

    // ─────────────────────────────────────────────────────────────────────────
    // COFFEE RITUAL — header → steps (sequential) → steam → closing quote
    // ─────────────────────────────────────────────────────────────────────────
    gsap.from('[data-ritual-header] > *', {
      opacity: 0,
      y: 18,
      duration: 0.9,
      ease: 'power2.out',
      stagger: 0.13,
      scrollTrigger: { trigger: '#coffee-ritual', start: 'top 78%' },
    })
    gsap.from('.ritual-step', {
      opacity: 0,
      y: 18,
      duration: 0.78,
      ease: 'power2.out',
      stagger: 0.13,
      scrollTrigger: { trigger: '.ritual-step', start: 'top 80%' },
    })
    gsap.from('.steam-placeholder', {
      opacity: 0,
      y: 16,
      duration: 0.85,
      ease: 'power2.out',
      scrollTrigger: { trigger: '.steam-placeholder', start: 'top 84%' },
    })
    gsap.from('[data-ritual-closing] > *', {
      opacity: 0,
      y: 14,
      duration: 0.88,
      ease: 'power2.out',
      stagger: 0.12,
      scrollTrigger: { trigger: '[data-ritual-closing]', start: 'top 85%' },
    })

    // ─────────────────────────────────────────────────────────────────────────
    // MENU — section header reveal (Motion handles card microinteractions)
    // ─────────────────────────────────────────────────────────────────────────
    gsap.from('[data-menu-header] > *', {
      opacity: 0,
      y: 18,
      duration: 0.9,
      ease: 'power2.out',
      stagger: 0.1,
      scrollTrigger: { trigger: '#menu', start: 'top 78%' },
    })

    // ─────────────────────────────────────────────────────────────────────────
    // COFFEE VIEWER — header reveal, subtle section entrance
    // ─────────────────────────────────────────────────────────────────────────
    gsap.from('[data-viewer-header] > *', {
      opacity: 0,
      y: 18,
      duration: 0.9,
      ease: 'power2.out',
      stagger: 0.1,
      scrollTrigger: { trigger: '#coffee-viewer', start: 'top 80%' },
    })

    // ─────────────────────────────────────────────────────────────────────────
    // SEASONAL GARDEN — left text staggers, right card lifts in
    // ─────────────────────────────────────────────────────────────────────────
    gsap.from('[data-seasonal-left] > *', {
      opacity: 0,
      y: 20,
      duration: 0.88,
      ease: 'power2.out',
      stagger: 0.1,
      scrollTrigger: { trigger: '#seasonal-garden', start: 'top 76%' },
    })
    gsap.from('[data-seasonal-right]', {
      opacity: 0,
      y: 22,
      duration: 0.95,
      ease: 'power2.out',
      scrollTrigger: { trigger: '#seasonal-garden', start: 'top 76%' },
    })

    // ─────────────────────────────────────────────────────────────────────────
    // GALLERY — postcard stagger: each tile appears left→right, top→bottom
    // ─────────────────────────────────────────────────────────────────────────
    gsap.from('.gallery-item', {
      opacity: 0,
      y: 22,
      duration: 0.72,
      ease: 'power2.out',
      stagger: { amount: 0.58, from: 'start' },
      scrollTrigger: { trigger: '.gallery-grid', start: 'top 80%' },
    })

    // ─────────────────────────────────────────────────────────────────────────
    // RESERVATION — warm final sequence: label → title → sub → fields → CTA
    // ─────────────────────────────────────────────────────────────────────────
    gsap.from('[data-reservation-label]', {
      opacity: 0,
      y: 14,
      duration: 0.85,
      ease: 'power2.out',
      scrollTrigger: { trigger: '#reservation', start: 'top 78%' },
    })
    gsap.from('#reservation h2', {
      opacity: 0,
      y: 20,
      duration: 1.0,
      ease: 'power2.out',
      scrollTrigger: { trigger: '#reservation', start: 'top 76%' },
    })
    gsap.from('[data-reservation-sub]', {
      opacity: 0,
      y: 14,
      duration: 0.85,
      ease: 'power2.out',
      scrollTrigger: { trigger: '#reservation h2', start: 'top 80%' },
    })
    gsap.from('.reservation-field', {
      opacity: 0,
      y: 13,
      duration: 0.75,
      ease: 'power2.out',
      stagger: 0.09,
      scrollTrigger: { trigger: '#reservation form', start: 'top 82%' },
    })
    gsap.from('#reservation button[type="submit"]', {
      opacity: 0,
      y: 10,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '#reservation button[type="submit"]',
        start: 'top 90%',
      },
    })

    // ─────────────────────────────────────────────────────────────────────────
    // Cleanup: remove ticker, kill all triggers, destroy Lenis
    // ─────────────────────────────────────────────────────────────────────────
    return () => {
      gsap.ticker.remove(rafCallback)
      ScrollTrigger.getAll().forEach((t) => t.kill())
      lenis.destroy()
    }
  }, [])

  return null
}
