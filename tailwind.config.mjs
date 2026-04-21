import { join } from "path";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    join(__dirname, "src/**/*.{js,ts,jsx,tsx}"),
    join(__dirname, "src/app/**/*.{js,ts,jsx,tsx}"),
    join(__dirname, "src/components/**/*.{js,ts,jsx,tsx}"),
  ],
  theme: {
    extend: {
      colors: {
        'wedding-primary': 'var(--wedding-primary)',
        'wedding-secondary': 'var(--wedding-secondary)',
        'wedding-bg': 'var(--wedding-bg)',
        'wedding-white': 'var(--wedding-white)',
      },
    },
  },
  plugins: [],
};

export default config;
