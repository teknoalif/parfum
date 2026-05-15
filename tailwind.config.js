/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // Ini akan memindai SEMUA file di dalam src
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'wpu-navy': '#0f172a',
        'wpu-blue': '#0284c7',
      }
    },
  },
  plugins: [],
} 
