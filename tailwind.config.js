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
    },
  },
  plugins: [],
};