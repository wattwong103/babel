import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Wongkaew Research — deep-navy academic palette (dark, preferred mode).
        babel: {
          bg: "#06182e", // navy canvas
          surface: "#0e2742", // card / panel
          raised: "#143257", // raised / hover
          border: "#1f3f63", // hairline navy
          science: "#4f8dd6", // brand accent blue
          "science-light": "#6fa3d6",
          humanities: "#8e7cc3", // brand violet
          "humanities-light": "#a99fd6",
          learned: "#3fb985", // success green
          locked: "#33506f", // muted navy
          text: "#eef4fb", // text-strong
          "text-secondary": "#8fa3bc", // text-muted
        },
        // Brand semantic accents.
        brand: "#2563a8",
        accent: "#4f8dd6",
        coral: "#e0533d", // highlight: awards only
      },
      fontFamily: {
        // Roboto Slab (display/headings), Roboto (body/UI), Roboto Mono (metadata).
        display: ["Roboto Slab", "Georgia", "serif"],
        heading: ["Roboto Slab", "Georgia", "serif"],
        body: ["Roboto", "-apple-system", "Segoe UI", "sans-serif"],
        mono: ["Roboto Mono", "SF Mono", "Menlo", "monospace"],
      },
      boxShadow: {
        "brand-md": "0 4px 12px rgba(8, 26, 51, 0.1)",
        "brand-lg": "0 12px 32px rgba(8, 26, 51, 0.14)",
      },
      letterSpacing: {
        caps: "0.12em",
      },
    },
  },
  plugins: [],
};

export default config;
