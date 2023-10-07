import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const { nextui } = require("@nextui-org/react");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [
    nextui(),
    plugin(({ addVariant }) => {
      addVariant("child", "& > *");
      addVariant("child-hover", "& > *:hover");
      addVariant("first-child", "& > *:first-child");
      addVariant("last-child", "& > *:last-child");
    }),
    plugin(({ addComponents }) => {
      addComponents({
        ".no-scrollbar": {
          "&::-webkit-scrollbar": {
            display: "none",
          },
          msOverflowStyle: "none",
          scrollbarWidth: "0px",
        },
      });
      addComponents({
        ".direction-rtl": {
          "&": {
            direction: "rtl",
          },
        },
      });
      addComponents({
        ".direction-ltr": {
          "&": {
            direction: "ltr",
          },
        },
      });
    }),
  ],
};

export default config;
