/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],

  theme: {
    extend: {
      backgroundSize: {
        'custom': '50% 50%', 
      },
    },
  },
  plugins: [require("daisyui")],
}

