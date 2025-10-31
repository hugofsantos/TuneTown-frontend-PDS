/** @type {import('tailwindcss').Config} */

export default {
  darkMode: ["selector", '[data-mode="dark"]'],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      colors: {
        base: "var(--base)",
        theme: "var(--theme)",
        fume: "var(--fume)",
        stroke: "var(--stroke)",
        contrast: "var(--contrast)",
        post: "var(--post)",
        puro: "var(--puro)",
        copacity_25: "var(--copacity-25)",
        copacity_theme: "var(--copacity-theme)",
      },
      textColor: {
        theme: "var(--theme)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideInFromRight: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        slideOutToRight: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "slow-spin": "spin 5s linear 1 ",
        "slide-in-from-right": "slideInFromRight 0.5s ease-in-out ",
        "slide-out-to-right": "slideOutToRight 0.3s ease-in-out ",
      },
    },
  },
  plugins: [],
};
