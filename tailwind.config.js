
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderColor: {
        "primary-color": "#EB455F"
      },
      fontFamily: {
        "primary": ["Poppins"]
      },
      colors: {
        "primary-color": "#EB455F"
      },
      gridTemplateColumns: {
        "card-mobile": "repeat(auto-fill, minmax(150px, 1fr))",
        "card-tablet": "repeat(auto-fill, minmax(180px, 1fr))",
        "card-desktop": "repeat(auto-fill, minmax(200px, 1fr))"
      },
      backgroundColor: {
        "primary": "#EB455F",
        "primary-transparent": "rgba(235, 69, 95, 0.7)"
      }
    },
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require("@tailwindcss/line-clamp"),
    // eslint-disable-next-line no-undef
    require("tailwind-scrollbar")
  ],
}