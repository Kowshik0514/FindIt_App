// tailwind.config.js

module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#FFFFFF',  // white
        secondary: {
          DEFAULT: "#3B5ED5",   // light blue
          1000: "#1F316F",   // Dark navy blue
        },
        black: "#000000",   //black
      },
      fontFamily: {
        header: ["AlmendraSC-Regular", "SpaceMono-Regular"],
        tagline: ['AllertaStencil-Regular', "SpaceMono-Regular"],
      },
    },
  },
  plugins: [],
}