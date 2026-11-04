import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['react', 'react-dom', 'lenis', 'three', 'lucide-react', 'framer-motion', 'canvas-confetti'],
  },
  server: {
    port: 5173,
    host: true,
  },
})
