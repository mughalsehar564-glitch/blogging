/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        luxury: {
          white: '#FFFFFF',
          orange: '#FF8C00',
          black: '#1A1A1A',
          beige: '#FFFFFF',
          pink: '#FF8C00',
          purple: '#FFA500',
          'soft-pink': '#FFDAB9',
          'soft-beige': '#FFFFFF',
        }
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        poppins: ['Poppins', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      backgroundImage: {
        'luxury-gradient': 'linear-gradient(135deg, #020617 0%, #1E293B 100%)',
      },
      boxShadow: {
        'luxury': '0 10px 30px -10px rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [],
}
