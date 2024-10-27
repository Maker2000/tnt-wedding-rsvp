import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary-color)",
        accent: "var(--accent-color)",
        panel: "var(--panel-background)",
        "primary-hover": "var(--primary-color-hover)",
        "primary-faded": "var(--primary-color-faded)",
        "primary-faded-50": "var(--panel-background-50)",
      },
    },
  },
  plugins: [],
};
export default config;
