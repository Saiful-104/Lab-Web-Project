/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        lime: {
          400: "#a3e635",
          500: "#84cc16",
          600: "#65a30d",
        },
        emerald: {
          500: "#10b981",
          600: "#059669",
        },
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark"],
    darkMode: "class",
    base: true,
    styled: true,
    utils: true,
  },
};
