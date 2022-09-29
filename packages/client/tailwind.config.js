/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        body: "'Lato', sans-serif",
        header: "'Exo 2', sans-serif",
        banner: "'Niconne', cursive"
      },
      colors: {
        primary: {
          50: "#F7F5F3",
          100: "#EDE8E3",
          200: "#D6CCC2",
          300: "#BEAE9D",
          400: "#9B8369",
          500: "#4A3E31",
          600: "#40362B",
          700: "#372E25",
          800: "#2E271E",
          900: "#1F1A14"
        },
        accent: {
          50: "#F3F5FB",
          100: "#E4E9F6",
          200: "#C5CFEC",
          300: "#9FAFE0",
          400: "#6C85D0",
          500: "#2A4082",
          600: "#273B78",
          700: "#1E2E5D",
          800: "#182449",
          900: "#101932"
        },
        base: {
          50: "#F5F5F4",
          100: "#ECEBE9",
          200: "#D6D4D1",
          300: "#BFBAB6",
          400: "#A09992",
          500: "#746D66",
          600: "#67615B",
          700: "#5A544F",
          800: "#494540",
          900: "#34302D"
        },
        secondary: {
          50: "#FFFDFA",
          100: "#FFFAF5",
          200: "#FFF5EB",
          300: "#FFEEDB",
          400: "#FFE6CC",
          500: "#FFE1C1",
          600: "#FFC68A",
          700: "#FFA13D",
          800: "#EB7900",
          900: "#AD5A00"
        }
      }
    }
  },
  plugins: []
};
