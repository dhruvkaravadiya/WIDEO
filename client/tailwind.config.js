/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        darkblue1: "#02142e",
        darkblue2: "#101b31",
        lightblue1: "#24324b",
        lightblue2: "#30415e"
      }
    },
  },
  plugins: [],
}