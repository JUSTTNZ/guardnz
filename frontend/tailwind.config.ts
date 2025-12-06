import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          green: "#00FF88",
          blue: "#00C8FF",
        },
        dark: {
          DEFAULT: "#0A0F0F",
          light: "#111818",
        },
      },
    },
  },
  plugins: [],
};

export default config;
