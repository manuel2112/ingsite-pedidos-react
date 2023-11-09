import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // base: "https://ingsite.cl/pedidos/test/",
  // build: {
  //   outDir: './dist'
  // }
})
