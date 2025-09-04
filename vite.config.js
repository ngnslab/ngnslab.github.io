import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/ngnslab.github.io/', // GitHub Pages 조직 페이지는 /저장소명/ 경로 사용
  plugins: [react()],
})
