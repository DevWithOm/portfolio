/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        poke: {
          blue: '#1B82E6',
          sky: '#30A7D7',
          darkBlue: '#0A285F',
          red: '#EE1515',
          gold: '#FFCB05',
          darkRed: '#CC0000',
          green: '#4DAD5B',
          dark: '#1E293B',
          panel: 'rgba(255, 255, 255, 0.78)',
          panelDark: 'rgba(15, 23, 42, 0.75)'
        }
      },
      fontFamily: {
        game: ['Outfit', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'hud': '0 8px 32px 0 rgba(0, 0, 0, 0.12)',
        'hud-hover': '0 12px 40px 0 rgba(0, 0, 0, 0.18)',
        'pokeball': '0 6px 18px rgba(220, 20, 60, 0.45)',
      }
    },
  },
  plugins: [],
}

