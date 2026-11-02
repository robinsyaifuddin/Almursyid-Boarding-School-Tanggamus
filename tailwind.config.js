/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          950: '#022c22', // Deep emerald dark canvas
          900: '#064e3b', // Deep emerald header/footer
          850: '#065f46', // Refined deep emerald
          800: '#047857', // Vibrant emerald hero/card
          700: '#059669', // Bright emerald interactive
          600: '#10b981', // Fresh emerald tone
          500: '#34d399', // Fresh mint green
          50: '#f0fdf4',  // Light emerald wash
        },
        gold: {
          600: '#15803d', // Deep vibrant green
          500: '#10b981', // Fresh vibrant emerald
          400: '#34d399', // Bright mint
          300: '#a7f3d0', // Light mint
          50: '#ecfdf5',  // Subtle emerald tint
        },
        cream: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
