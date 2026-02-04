/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#C9A227",
        surface: "#111827",
        muted: "#9CA3AF",
        background: "#0B0F19",
        border: "#1F2937",
        textPrimary: "#E5E7EB",
      },
    },
  },
  plugins: [],
};
