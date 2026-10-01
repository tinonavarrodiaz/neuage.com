// @ts-check
import { defineConfig } from 'astro/config';

import { qrcode } from 'vite-plugin-qrcode';
import removeConsole from 'vite-plugin-remove-console';
import mkcert from 'vite-plugin-mkcert'

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [qrcode(), removeConsole(), mkcert()]
  },
});
