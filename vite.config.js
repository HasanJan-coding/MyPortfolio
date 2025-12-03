import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// IMPORTANT: this file MUST be pure ESM, no module.exports, no require()
export default defineConfig({
  plugins: [react()],
})
