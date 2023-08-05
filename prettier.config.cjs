/** @type {import("@ianvs/prettier-plugin-sort-imports").PrettierConfig} */
const config = {
  plugins: [
    "@ianvs/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],
  bracketSameLine: true,
  importOrder: [
    "<TYPES>",
    "^next/(.*)$",
    "^react$",
    "<THIRD_PARTY_MODULES>",
    "",
    "<TYPES>^~/(.*)$",
    "^~/(.*)$",
    "<TYPES>^[./]",
    "^[./]",
  ],
  importOrderTypeScriptVersion: "5.1.6",
};

module.exports = config;
