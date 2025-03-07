/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Light Mode
        primary: "#2c6ca3",
        background: "#f2f7fd",
        accent: "#4b9cd3",
        textPrimary: "#333333",
        textSecondary: "#666666",
        // Dark Mode
        darkPrimary: "#2c6ca3",
        darkBackground: "#102a43",
        darkAccent: "#4b9cd3",
        darkTextPrimary: "#f8f9fa",
        darkTextSecondary: "#ced4da",
      },
      keyframes: {
        'float-1': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'float-2': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        'float-3': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-25px)' },
        },
        textReveal: {
          '0%': { 
            opacity: '0',
            transform: 'translateY(100%)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        typewriter: {
          '0%': { width: '0' },
          '100%': { width: '100%' }
        },
        'blink-caret': {
          '0%, 100%': { borderColor: 'transparent' },
          '50%': { borderColor: 'white' }
        },
        fadeUp: {
          '0%': { 
            opacity: '0',
            transform: 'translateY(20px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        }
      },
      animation: {
        'float-1': 'float-1 6s ease-in-out infinite',
        'float-2': 'float-2 8s ease-in-out infinite',
        'float-3': 'float-3 7s ease-in-out infinite',
      }
    },
  },
  plugins: [],
};