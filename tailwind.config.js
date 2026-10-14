/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/renderer/index.html', './src/renderer/src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        coddy: {
          dark: '#0f172a', // Primary background
          card: '#1e293b', // Card & panel surface
          surface: '#1e293b', // Surface alias
          border: '#334155', // Border and divider
          hover: '#283548', // Hover state background
          muted: '#64748b', // Muted / secondary text
          emerald: '#10b981', // Accent emerald
          cyan: '#06b6d4', // Accent cyan
          'emerald-hover': '#059669',
          'cyan-hover': '#0891b2'
        }
      }
    }
  },
  plugins: []
}
