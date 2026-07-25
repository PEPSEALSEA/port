import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

function spaFallback404() {
  return {
    name: 'spa-fallback-404',
    closeBundle() {
      const dist = resolve(process.cwd(), 'dist')
      const indexHtml = resolve(dist, 'index.html')
      const notFound = resolve(dist, '404.html')
      if (existsSync(indexHtml)) {
        copyFileSync(indexHtml, notFound)
      }
    },
  }
}

export default defineConfig({
  plugins: [react(), spaFallback404()],
  base: '/port/',
})
