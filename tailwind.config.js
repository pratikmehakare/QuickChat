/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: "#007FFF",
        secondary: "#0bcbd4"
      }
    },
  },
  plugins: [],
}