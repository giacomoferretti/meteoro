import { type Config } from "tailwindcss";
import colors from "tailwindcss/colors";
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", ...defaultTheme.fontFamily.sans],
      },

      colors: {
        primary: colors.yellow,
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
} satisfies Config;
