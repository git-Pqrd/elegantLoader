/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./includes/**/*.php", "./*.php"],
  theme: {
    extend: {
      keyframes: {
        "shadow-pulse": {
          "0%, 100%": { boxShadow: "0 0 0px rgba(108, 180, 180, 0.4)" },
          "50%": { boxShadow: "0 0 40px rgba(108, 180, 180, 0.9)" },
        },
      },
      animation: {
        "shadow-pulse": "shadow-pulse 1.5s infinite ease-in-out",
      },
      colors: {
        current: "currentColor",
        primary: "#6cb4b4",
        "primary-dark": "#006969",
        secondary: "#5f5f5f",
        "gray-dark": "#6b6b6b",
        "gray-light": "#d9d9d9",
        "light-red": "#d76d78",
        "almost-black": "#0F172A",
      },
    },
  },
  plugins: [],
};
