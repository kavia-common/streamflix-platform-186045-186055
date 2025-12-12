import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#3b82f6",
          success: "#06b6d4"
        }
      }
    }
  },
  plugins: []
};

export default config;
