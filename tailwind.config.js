/** @type {import('tailwindcss').Config} */

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "1.25rem",
      },
      colors: {
        dark: "#121416",
      },
    },
  },
  plugins: [],
};
