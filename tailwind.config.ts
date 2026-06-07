import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: { DEFAULT: "#2563EB", dark: "#1D4ED8" },
        success: "#10B981",
        warning: "#F59E0B",
        danger: "#EF4444"
      },
      boxShadow: {
        premium: "0 24px 70px rgba(15, 23, 42, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
