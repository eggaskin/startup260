import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    proxy: {
      '/note': 'http://localhost:3000',
      '/ws': {
        target: 'ws://localhost:3000',
        ws: true,
      },
    },
  },
});
