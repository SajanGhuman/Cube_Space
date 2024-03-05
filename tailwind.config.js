/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "custom-gray": "#020617",
        "custom-text": "#BB321C",
        "custom-off-white": "#94A3B8",
        "custom-off-black": "#1E293B",
        "custom-off-black-1": "#34445e",
        "custom-rose": "#e11d48",
        "custom-white": "#f1f5f9",
        "custom-purple": "#5146E3",
        "custom-grey": "#2B2B2B",
      },
      screens: {
        "no": "0px",
        "xx-sm": "320px",
        "x-sm": "375px",
        "400-sm": "400px",
        "420-sm": "420px",
        "450-sm": "450px",
        "470-sm": "470px",
        "500-sm": "500px",
        "550-sm": "550px",
        "600-sm": "600px",
        "700-sm": "700px",
        "790-sm": "790px",
        "900-lg": "900px",
        "1000-lg": "1000px",
        "1200-lg": "1200px",
        "1300-lg": "1300px",
        "1442-lg": "1442px",
      },
      maxHeight: {
        "700h": "max-height: 600px",
      },
      fontFamily: {
        general_sans: ["General Sans"],
      },
      boxShadow: {
        "button-shadow":
          "0 10px 20px rgba(225, 29, 72, 0.5), 0 6px 10px rgba(225, 29, 72, 0.5 ), 0 0 100px -10px #e11d48",
      },
    },
  },
  plugins: [],
};