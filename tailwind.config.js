/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: [
    "./App.tsx", 
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./presentation/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors:{
        primary:"#271080",
        secondary:"#ed4712",
        tertiary:"#CAD226"
      },
      fontFamily:{
        'work-black':['WorkSans-Black', 'sans-serif'],
        'work-light':['WorkSans-Light', 'sans-serif'],
        'work-medium':['WorkSans-Medium', 'sans-serif'],
      }
    },
  },
  plugins: [],
}