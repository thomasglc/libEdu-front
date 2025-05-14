/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#646CFF',
        secondary: '#42B883',
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [{
      light: {
        ...require("daisyui/src/theming/themes")["light"],
        primary: "#646CFF",
        secondary: "#42B883",
        "base-100": "#ffffff",
        "base-200": "#f6f6f7",
        "base-300": "#e2e2e4",
      },
    }],
  },
} 