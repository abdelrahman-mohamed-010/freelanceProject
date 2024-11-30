/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"], // Add Poppins font family
        inter: ["Inter", "sans-serif"], // Add Inter font family
      },
      colors: {
        primary: "rgba(244, 244, 244, 1)", // Light grayish color
        secondary: "rgba(0, 124, 204, 1)", // A blue color
        tertiary: "rgba(0, 155, 255, 1)", // A brighter blue
        blue: "rgba(0, 109, 180, 1)",
        second_blue: "rgba(15, 184, 206, 1)",
        light_blue: "rgba(230, 245, 255, 1)",
        main_gray: "rgba(236, 236, 236, 1)",
        test: "#0FB8CE",
      },
      borderColor: {
        "light-gray": "rgba(236, 236, 236, 1)", // Add custom border color
      },
    },
  },
};
