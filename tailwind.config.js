/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      /* ================= FONTS ================= */
      fontFamily: {
        inter: ["var(--font-inter)", "sans-serif"],
        sora: ["var(--font-sora)", "sans-serif"],
      },

      /* ================= FONT SIZES ================= */
      fontSize: {
        xs: ["12px", { lineHeight: "16px" }],
        sm: ["14px", { lineHeight: "20px" }],
        base: ["16px", { lineHeight: "24px" }],
        lg: ["18px", { lineHeight: "28px" }],
        xl: ["20px", { lineHeight: "28px" }],
        "2xl": ["24px", { lineHeight: "32px" }],
        "3xl": ["30px", { lineHeight: "38px" }],
        "4xl": ["36px", { lineHeight: "44px" }],
        "5xl": ["48px", { lineHeight: "56px" }],
      },

      /* ================= COLORS ================= */
      colors: {
        brand: {
          red: "#CE0323",
          black: "#0C0C0C",
          smoke:"#C4C4C4",
        },
        text: {
          primary: "#0C0C0C",
        },
      },
    },
  },
  plugins: [],
};
