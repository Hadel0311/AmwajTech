import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isPages = mode === 'pages'
  // Project site: https://hadel0311.github.io/AmwajTech/
  const pagesBase = process.env.VITE_BASE_PATH || '/AmwajTech/'

  return {
    plugins: [vue()],
    base: isPages ? pagesBase : '/',
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true
        },
        '/uploads': {
          target: 'http://localhost:3000',
          changeOrigin: true
        }
      }
    },
    build: {
      outDir: isPages ? 'docs' : 'dist',
      emptyOutDir: true
    }
  }
})
