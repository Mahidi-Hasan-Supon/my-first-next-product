module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {},
  plugins: [require("daisyui")],
  
  daisyui: {
    themes: false, // 🔥 all themes disabled
  },
};
