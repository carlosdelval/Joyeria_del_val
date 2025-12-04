/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      animation: {
        shimmer: "shimmer 2s infinite",
      },
      keyframes: {
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      fontWeight: {
        light: "300", // Peso por defecto
        normal: "400",
        medium: "500",
      },
      letterSpacing: {
        wide: "0.05em",
        wider: "0.05em",
        widest: "0.1em",
      },
    },
  },
  plugins: [],
};
