import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
    // lenis ships with main → .mjs; Vite SSR dev mode resolves via `main`
    // and tries require(), which throws ERR_REQUIRE_ESM. Force-bundle it.
    ssr: {
      noExternal: ['lenis'],
    },
    optimizeDeps: {
      include: ['lenis'],
    },
  },
})