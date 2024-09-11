module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: { pacifico: "Pacifico" },
    extend: {
      colors: {
        primary: "#3c4c8c",
        secondary: "#c3cae6",
        ifangreen: "#C3D8D0",
        bannerText: "#0d1f6e",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
