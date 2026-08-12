import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050505",
        secondary: "#0A0A0A",
        foreground: "#ffffff",
        muted: "#858585",
        accent: {
          DEFAULT: "#00E5FF",
          secondary: "#00FFD5",
        },
        border: "rgba(255, 255, 255, 0.08)",
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
        display: ["var(--font-space-grotesk)"],
      },
    },
  },
  plugins: [],
};
export default config;