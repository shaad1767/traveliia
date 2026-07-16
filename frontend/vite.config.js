import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path';


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),  tailwindcss()],
  resolve: {
    alias: {
      react: path.resolve('./node_modules/react'),
      'react-dom': path.resolve('./node_modules/react-dom')
    } 
  },
  server: {
    proxy: {
      "/api": {
          target: isLocal ? "http://localhost:5000" : "https://traveliia.onrender.com",        changeOrigin: true,
        secure: false
      }
    }
  }
});
