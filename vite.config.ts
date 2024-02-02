import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
      '/api':{
        target:'https://testify-ten.vercel.app:5000',
        changeOrigin: true, 
        secure: false, 
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    }
  }
})