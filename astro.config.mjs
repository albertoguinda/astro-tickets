// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],

  vite: {
    plugins: [tailwindcss()],
    build: {
      // Minificación agresiva con Terser
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.trace'],
          passes: 2,
        },
        mangle: {
          safari10: true,
        },
        format: {
          comments: false,
        },
      },
      // CSS minificación optimizada
      cssMinify: 'lightningcss',
      // Code splitting manual para librerías grandes
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            // Recharts (414 KB) - Solo se carga en /admin/dashboard
            if (id.includes('recharts')) {
              return 'recharts';
            }
            // Leaflet (154 KB) - Solo se carga en /location
            if (id.includes('leaflet') || id.includes('react-leaflet')) {
              return 'leaflet';
            }
            // GSAP + Lenis (114 KB) - Animaciones
            if (id.includes('gsap') || id.includes('lenis')) {
              return 'gsap-animations';
            }
            // SweetAlert2 + Confetti - Modals y celebraciones
            if (id.includes('sweetalert2') || id.includes('canvas-confetti')) {
              return 'sweetalert';
            }
            // React core - Compartido por todos los islands
            if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
              return 'react-vendor';
            }
            // Nano stores - State management
            if (id.includes('@nanostores')) {
              return 'nanostores';
            }
          },
        },
      },
    },
  },

  image: {
    domains: ['images.unsplash.com', 'randomuser.me'],
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        limitInputPixels: false,
      },
    },
    formats: ['webp'], // Force WebP for better iOS Safari compatibility
    quality: 55, // Balanced compression for quality and performance
  },

  adapter: cloudflare()
});
