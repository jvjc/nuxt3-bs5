import * as fs from 'fs';

import { defineNuxtConfig } from 'nuxt3';

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  ssr: false,
  target: 'static',
  dir: {
    layouts: 'application/layouts',
    pages: 'application/pages',
    public: 'application/public',
  },
  css: [
    '@/assets/scss/app.scss',
    '@fortawesome/fontawesome-svg-core/styles.css',
    'sweetalert2/src/sweetalert2.scss'
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/scss/_variables.scss";',
        },
      },
    },
  },
  publicRuntimeConfig: fs.existsSync('application/setup.js') ? require('./application/setup') : {},
});
