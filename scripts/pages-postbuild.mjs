/**
 * GitHub Pages SPA fallback: serve index.html for unknown routes.
 * https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-custom-404-page-for-your-github-pages-site
 */
import { copyFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const docsDir = 'docs'
const indexHtml = join(docsDir, 'index.html')
const notFoundHtml = join(docsDir, '404.html')

if (!existsSync(indexHtml)) {
  console.error('pages-postbuild: docs/index.html not found — run vite build --mode pages first')
  process.exit(1)
}

copyFileSync(indexHtml, notFoundHtml)
console.log('pages-postbuild: created docs/404.html for client-side routing')
