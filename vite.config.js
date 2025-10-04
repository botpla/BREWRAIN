import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Ganti 'brewrain-order-form' dengan nama repo GitHub kamu persis
export default defineConfig({
  plugins: [react()],
  base: '/BREWRAIN/',
})
