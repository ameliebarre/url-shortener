import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';
import unusedImports from 'eslint-plugin-unused-imports';
import prettierConfig from 'eslint-config-prettier';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettierConfig,
  {
    plugins: {
      import: importPlugin,
      'unused-imports': unusedImports,
    },

    rules: {
      'unused-imports/no-unused-imports': 'error',
      'import/no-duplicates': 'error',
    },
  },
];
