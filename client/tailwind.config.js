/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "light-bg" : "#f9f6f6",
        "primary": "#00133f",
        "primary-bg": "#ffffff",
      }
    },
  },
  plugins: [],
}

