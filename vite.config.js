import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 8080,
    strictPort: true,
    allowedHosts: [
      'a38323b582ea4849a45f17d0d845b16e.vfs.cloud9.ap-south-1.amazonaws.com',
    ],
  },
})
