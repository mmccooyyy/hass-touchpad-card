import globals from "globals";
import pluginJs from "@eslint/js";


export default [
  {
    languageOptions: { globals: globals.browser },
    files: ['**/*.js'],
    rules: {
      'quotes': ['error', 'single'],
      'semi': ['error', 'never'],
      'no-unused-vars': 'warn',
    },
  },
  pluginJs.configs.recommended,
];