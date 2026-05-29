import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "opc-orange": "#e8522a",
        "opc-dark": "#080d14",
      },
      fontFamily: {
        serif: ["Georgia", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
