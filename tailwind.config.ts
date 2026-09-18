import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FAF6F0",
        creamDark: "#F1E9DD",
        gold: "#C9A96E",
        goldDark: "#A98A54",
        softBlack: "#1A1A1A",
        line: "#E7DECD",
        petrol: {
          light: "#EAF0F2",
          soft: "#D4DFE3",
          DEFAULT: "#3B5560",
          dark: "#2A3D45",
          border: "#B9C9CF",
        },
      },
      fontFamily: {
        vazir: ["var(--font-vazir)", "sans-serif"],
        display: ["var(--font-playfair)", "serif"],
        cinzel: ["var(--font-cinzel)", "serif"],
      },
      borderRadius: {
        card: "14px",
        cardLg: "16px",
      },
      boxShadow: {
        soft: "0 8px 30px -12px rgba(26,26,26,0.12)",
        petrol: "0 8px 30px -12px rgba(59,85,96,0.2)",
      },
    },
  },
  plugins: [],
};
export default config;
