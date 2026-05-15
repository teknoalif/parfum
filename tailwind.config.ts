/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'wpu-navy': '#0f172a',
        'wpu-blue': '#0284c7',
        'wpu-bg': '#f0f9ff',
      },
    },
  },
  plugins: [],
};
