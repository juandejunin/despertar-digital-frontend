
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{astro,html,js,jsx,ts,tsx}",
    // Opcional: si usás MDX, Markdown, etc.
    // "./src/**/*.mdx",
  ],

  theme: {
    extend: {
      // Puedes extender colores, fuentes, etc. aquí
    },
  },

  plugins: [],

  // ← CLAVE: Elimina -webkit-text-size-adjust
  corePlugins: {
    preflight: true, // Mantiene reset básico
  },

  // ← OPCIONAL: Mejora para Astro + Preact
  future: {
    hoverOnlyWhenSupported: true,
  },

  // ← OPCIONAL: Si querés prefijo (ej: tw-)
  // prefix: 'tw-',
};
