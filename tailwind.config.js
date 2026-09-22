/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#100C22',
        surface: 'rgba(255, 255, 255, 0.04)',
        surfaceBorder: 'rgba(255, 255, 255, 0.12)',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        script: ['Dancing Script', 'cursive'],
      },
      letterSpacing: {
        widestLuxury: '0.22em',
      },
    },
  },
  plugins: [],
}
