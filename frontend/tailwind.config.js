/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Ensure Tailwind looks in .tsx files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
