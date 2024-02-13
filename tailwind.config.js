/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: "600px",
        md: "900px",
        xs: "400px",
        lg: "1150px",
        xl: "1500px",
      },
    },
  },
  plugins: [],
};
