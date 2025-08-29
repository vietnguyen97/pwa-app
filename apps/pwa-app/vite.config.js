/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
export default defineConfig(() => ({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/pwa-app',
  server: {
    port: 4200,
    host: 'localhost',
  },
  preview: {
    port: 4200,
    host: 'localhost',
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'prompt',   // <-- quan trọng
      injectRegister: 'auto',
      immediate: true,
      devOptions: { enabled: true }
      // registerType: 'prompt',
      // injectRegister: 'auto',
      // workbox: {
      //   clientsClaim: true,
      //   skipWaiting: true,
      //   globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      // },
      // devOptions: {
      //   enabled: true
      // },
      // immediate: true,
    })
  ],
  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },
  build: {
    outDir: './dist',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
}));
