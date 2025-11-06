/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{astro,html,js,jsx,ts,tsx}",
    // Opcional: si usás MDX, Markdown, etc.
    // "./src/**/*.mdx",
  ],

  theme: {
    extend: {
      fontFamily: {
        serifSystem: [
          "Georgia",
          "Cambria",
          '"Times New Roman"',
          "Times",
          "serif",
        ],
      },
    },
  },

  plugins: [],

  corePlugins: {
    preflight: true,
  },

  future: {
    hoverOnlyWhenSupported: true,
  },
};
