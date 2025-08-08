import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/', // GitHub Pages 사용자 페이지는 루트 도메인 사용
  plugins: [react()],
})
