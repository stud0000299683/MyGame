import globals from "globals";
import pluginJs from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname
});

const airbnbFlat = compat.extends("airbnb-base");

/** @type {import('eslint').Linter.Config[]} */
export default [
  {languageOptions: { globals: globals.browser }},
  { 
    ...pluginJs.configs.recommended,
    rules: {
      ...pluginJs.configs.recommended.rules,
      ...airbnbFlat[0].rules
    }
  },
  {
    ignores: [
      "dist/",
      "*.mjs",
      "webpack.config.js",
      "**/__tests__"
    ],
  }
];