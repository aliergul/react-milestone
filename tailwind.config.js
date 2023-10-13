/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        backdrop: "#1F1F1F",
        active: "#282828",
        main: "#D17F14",
        weather: "#456104",
        bottom: "#141111",
        content: "#D1CECE",
        sidebar: "#363535",
        title: "#222222",
        forecast: "#363535",
      },
    },
  },
  plugins: [],
};
