/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
export default {
  plugins: [
    "prettier-plugin-tailwindcss",
    "@trivago/prettier-plugin-sort-imports",
  ],
  importOrder: ["^react", "<THIRD_PARTY_MODULES>", "^@/.*", "^[./]"],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
