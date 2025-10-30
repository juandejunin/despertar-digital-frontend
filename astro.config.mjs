import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import tailwind from '@astrojs/tailwind';
import node from '@astrojs/node';

export default defineConfig({
  integrations: [preact(), tailwind()],
  output: 'server',
  adapter: node({ mode: 'standalone' }),
});
