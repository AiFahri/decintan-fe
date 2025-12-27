/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary": "#2b3d9d",
        "primary-50": "#f0f3ff",
        "primary-100": "#dce3ff",
        "primary-200": "#b8c7ff",
        "primary-300": "#8fa4ff",
        "primary-400": "#6681ff",
        "primary-500": "#3d5eff",
        "primary-600": "#2b3d9d",
        "primary-700": "#1f2d73",
        "primary-800": "#141e4d",
        "primary-900": "#0a0f26",
      },
    },
  },
  plugins: [],
};
