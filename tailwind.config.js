/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        "max-720": { max: "720px" },
        "721-1024": { min: "721px", max: "1024px" },
      },
    },
  },
  plugins: [],
};
