/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        roboto:['"Roboto"', 'sans-serif'],
        logo:['"Inspiration"', 'cursive'],
        sublogo:['"Julius Sans One"', 'sans-serif'],
      },
      backgroundImage:{
        'signin':"url('./imgs/background.jpg')",
      },
     colors:{
        'background-signup':'#F9D0BE',
        'logo-color':'#F92C2C',
        'sub-logo-color':'#C10000',
        'textcolor':'#FABFA5',
        'link':'#F2AF92',
        'facebook':'#0776e8',
     }
    },
  },
  plugins: [],
}
