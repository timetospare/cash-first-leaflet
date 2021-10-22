module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: { pacifico: "Pacifico" },
    extend: {
      colors: {
        primary: "#7587a7",
        secondary: "#ccded7",
        ifangreen: "#C3D8D0",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
