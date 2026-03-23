import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        babel: {
          bg: "#0a0e1a",
          surface: "#111827",
          border: "#1e2d45",
          science: "#3b82f6",
          "science-light": "#60a5fa",
          humanities: "#a855f7",
          "humanities-light": "#c084fc",
          learned: "#10b981",
          locked: "#374151",
          text: "#f1f5f9",
          "text-secondary": "#94a3b8",
        },
      },
      fontFamily: {
        heading: ["Playfair Display", "serif"],
        body: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
