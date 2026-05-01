/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        aura: {
          primary: '#8A2BE2',
          secondary: '#FFD700',
          accent: '#00FFFF',
          dark: '#0B0E14',
          glass: 'rgba(255, 255, 255, 0.05)',
        }
      },
      backgroundImage: {
        'aura-gradient': 'radial-gradient(circle at center, #1a1a2e 0%, #0b0e14 100%)',
      }
    },
  },
  plugins: [],
}

