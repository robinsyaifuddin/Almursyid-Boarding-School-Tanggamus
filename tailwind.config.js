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
          950: '#06372b', // Deep forest canvas (sampled)
          900: '#0a4637', // Deep forest header/footer
          850: '#0e5644', // Refined deep forest
          800: '#146954', // Forest card/accent
          700: '#1d7d65', // Interactive forest
          600: '#28594d', // Mid forest tone
          500: '#3a7566', // Soft forest tint
          50: '#f0fdf4',  // Light tint
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
