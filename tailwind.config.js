/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./app/**/*.{js,jsx}", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "Noto Sans Thai",
          "Leelawadee UI",
          "Tahoma",
          "sans-serif"
        ]
      },
      boxShadow: {
        aura: "0 0 42px rgba(168, 85, 247, 0.24)",
        gold: "0 0 32px rgba(245, 180, 70, 0.24)",
        cyan: "0 0 32px rgba(34, 211, 238, 0.2)"
      }
    }
  },
  plugins: []
};
