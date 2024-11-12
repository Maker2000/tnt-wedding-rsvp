import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        "shadows-into-light": ['"Shadows Into Light"', "cursive"],
      },
      colors: {
        background: "rgb(from var(--background) r g b / 1)",
        foreground: "rgb(from var(--foreground) r g b / 1)",
        primary: "rgb(from var(--primary-color) r g b / 1)",
        accent: "rgb(from var(--accent-color) r g b / 1)",
        panel: "rgb(from var(--panel-background) r g b / 1)",
        "primary-hover": "rgb(from var(--primary-color-hover) r g b / 1)",
        "primary-faded": "rgb(from var(--primary-color-faded) r g b / 1)",
        "primary-faded-50": "rgb(from var(--panel-background-50) r g b / 1)",
      },
    },
  },
  plugins: [],
};
export default config;
