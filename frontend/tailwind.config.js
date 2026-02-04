/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#B89B5E",
        surface: "#141821",
        elevated: "#1A1F2B",
        muted: "#8B8F97",
        background: "#0E1116",
        border: "#232836",
        textPrimary: "#EDEEF0",
        textSecondary: "#B6BAC3",
      },
    },
  },
  plugins: [],
};
