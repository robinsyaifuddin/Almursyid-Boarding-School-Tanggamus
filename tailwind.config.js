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
          950: '#03140e',
          900: '#072419',
          850: '#0a3123',
          800: '#0f3f2e',
          700: '#14553e',
          600: '#1a6f51',
          500: '#238a66',
        },
        gold: {
          600: '#b8811f',
          500: '#d4972c',
          400: '#e5ad45',
          300: '#f2c66d',
        },
        cream: {
          50: '#fbfbf7',
          100: '#f5f5ec',
          200: '#eae9db',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
