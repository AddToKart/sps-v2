/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0ea5e9',
        secondary: '#0284c7',
        tertiary: '#0369a1',
        background: '#f0f9ff',
        surface: '#ffffff',
        'surface-hover': '#f8fafc',
        'surface-active': '#f1f5f9',
      },
    },
  },
  plugins: [],
} 