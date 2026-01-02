// import { defineConfig } from "astro/config";
// import preact from "@astrojs/preact";
// import tailwind from "@astrojs/tailwind";
// import node from "@astrojs/node";
// import criticalCSS from 'astro-critical-css'

// export default defineConfig({
//   integrations: [preact(), tailwind(), criticalCSS()],
//   output: "server",
//   adapter: node({ mode: "standalone" }),
//   vite: {
//     resolve: {
//       alias: {
//         "@": new URL("./src", import.meta.url), // <--- aquí definimos el alias
//       },
//     },
//   },
// });


import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import tailwind from '@astrojs/tailwind';
import node from '@astrojs/node';
import criticalCSS from 'astro-critical-css';  // ← Este import era el que faltaba

export default defineConfig({
  integrations: [
    preact(),
    tailwind(),
    criticalCSS({ 
      silent: true,   // Opcional: quita logs innecesarios en build
      // Si quieres limitar a páginas específicas (ej: solo home)
      // include: ['index.html', 'otras-paginas.html']
    }),
  ],
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  vite: {
    resolve: {
      alias: {
        '@': new URL('./src', import.meta.url)
      }
    }
  },

});