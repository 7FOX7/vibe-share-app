import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "users": {
        target: "http://localhost:8080/users", 
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/users/, ''),
      }
    }
  }
})
