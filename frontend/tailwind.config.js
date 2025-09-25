/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gmu-green': '#006633',
        'gmu-gold': '#FFCC33',
        'gmu-dark-green': '#00563F',
        'gmu-gold-secondary': '#FFB81C',
        'gmu-gray': '#f5f5f5',
      }
    },
  },
  plugins: [],
}
