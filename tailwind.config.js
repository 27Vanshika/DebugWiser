/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom color palette
        'background': '#FFFFFF',
        'primary-text': '#000000',
        'secondary-text': '#6B7280',
        'tag-blue': '#CFFAFE', // pastel cyan-100
        'tag-red': '#FECACA',
        'tag-yellow': '#FEF3C7',
        'tag-green': '#D1FAE5',
        'tag-violet': '#EDE9FE',
        'search-bg': '#F9FAFB',
        'border-card': '#E5E7EB',
        'button-hover': '#22d3ee', // cyan-400
        'accent-cyan': '#06b6d4', // cyan-500
        'accent-cyan-dark': '#0891b2', // cyan-600
      },
      borderRadius: {
        'soft': '8px',
      }
    },
  },
  plugins: [],
} 