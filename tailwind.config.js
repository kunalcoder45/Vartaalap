module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // if using app directory
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        varta: ['var(--font-varta)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
