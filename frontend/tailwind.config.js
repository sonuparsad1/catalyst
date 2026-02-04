/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#C6A86B",
        secondary: "#A78F5A",
        surface: "#121318",
        elevated: "#191B22",
        muted: "#6E6E73",
        background: "#0B0C0F",
        border: "#23242A",
        textPrimary: "#F5F5F7",
        textSecondary: "#C7C7CC",
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #C6A86B 0%, #A78F5A 100%)",
        "card-gradient": "linear-gradient(180deg, #14151B 0%, #0B0C0F 100%)",
      },
      boxShadow: {
        "accent-glow":
          "0 0 0 1px rgba(198,168,107,0.35), 0 8px 30px rgba(198,168,107,0.18)",
        "card-ambient":
          "inset 0 1px 0 rgba(255,255,255,0.04), 0 20px 60px rgba(0,0,0,0.6)",
      },
    },
  },
  plugins: [],
};
