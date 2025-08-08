import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/NGNS/', // GitHub Pages에서 사용할 base path
  plugins: [react()],
})
