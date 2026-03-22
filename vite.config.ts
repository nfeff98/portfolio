import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// GitHub project Pages serves at /<repo>/ — set VITE_BASE_PATH=/portfolio/ in CI (see .env.local.example).
// Local dev: omit → base is "/"
function basePath(): string {
  const raw = process.env.VITE_BASE_PATH?.trim()
  if (!raw || raw === '/') return '/'
  return raw.endsWith('/') ? raw : `${raw}/`
}

export default defineConfig({
  base: basePath(),
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
  },
})
