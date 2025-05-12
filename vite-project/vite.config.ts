import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy: {
      '/api': {
        target: 'https://6z5hc53b-3000.uks1.devtunnels.ms',
        changeOrigin: true,
      }
    }
  }
})
