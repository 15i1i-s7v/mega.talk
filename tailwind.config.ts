import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--color-bg)",
        foreground: "var(--color-text)",
        accent: "var(--color-accent)",
        "accent-hover": "var(--color-accent-hover)",
        muted: "var(--color-text-muted)",
        border: "var(--color-border)",
        "border-dark": "var(--color-border-dark)",
        success: "var(--color-success)",
        warning: "var(--color-warning)",
        error: "var(--color-error)",
        card: "var(--color-bg-elevated)",
        mega: {
          bg: "#0A0A0A",
          dark: "#111111",
          surface: "#171717",
          gold: "#D4A72C",
          "gold-bright": "#F4D271",
          "gold-deep": "#8A6516",
          muted: "#B9B19F",
        },
      },
      fontFamily: {
        display: ["var(--font-russo)", "Impact", "sans-serif"],
        body: ["var(--font-raleway)", "system-ui", "sans-serif"],
        decor: ["var(--font-syne)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
