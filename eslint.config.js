import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: globals.node } },
  {
    ignores: ['dist/*', '.circleci/*', '.husky/*'],
  },
  {
    rules: {
      // --- General Best Practices ---
      'no-console': 'off', // Warn on console logs
      'no-debugger': 'error', // Disallow `debugger`
      eqeqeq: ['error', 'always'], // Enforce strict equality
      curly: 'error', // Require braces in control statements

      // --- Stylistic Rules (Prettier-Compatible) ---
      // 'prettier/prettier': 'warn', // Run Prettier checks as ESLint rules
      quotes: ['error', 'single', { avoidEscape: true }], // Enforce single quotes
      semi: ['error', 'always'], // Require semicolons
      'comma-dangle': ['error', 'always-multiline'], // Require trailing commas for multiline
      indent: ['warn', 2, { SwitchCase: 1 }], // Enforce 2-space indentation

      // --- ES6+ Rules ---
      'prefer-const': 'error', // Prefer `const` over `let` where possible
      'no-var': 'error', // Disallow `var` declarations
      'arrow-spacing': ['error', { before: true, after: true }], // Enforce spacing around arrows

      // --- Import Rules ---
      'no-duplicate-imports': 'error', // Disallow duplicate imports
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  eslintConfigPrettier,
  eslintPluginPrettierRecommended,
];
