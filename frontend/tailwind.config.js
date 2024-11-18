/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        'primary': '#00113f',
        'primary-bg' : '#faf9f9'
      }
    },
  },
  plugins: [],
}