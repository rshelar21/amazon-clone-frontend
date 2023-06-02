/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,html,css}"],
  theme: {
    extend: {
      colors: {
        amazon_blue: {
          light: "#232F3E",
          blue : "#007185",
          DEFAULT: "#131921",
        },
      },
    },
  },
  plugins: [],
}