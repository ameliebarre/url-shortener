import js from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import unusedImports from 'eslint-plugin-unused-imports';
import tseslint from 'typescript-eslint';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettierConfig,
  {
    plugins: {
      import: importPlugin,
      'unused-imports': unusedImports,
    },

    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },

    rules: {
      /**
       * ==========================================
       * Imports inutilisés
       * ==========================================
       */

      'unused-imports/no-unused-imports': 'error',

      'unused-imports/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
        },
      ],

      /**
       * ==========================================
       * Imports dupliqués
       * ==========================================
       */

      'import/no-duplicates': 'error',

      /**
       * ==========================================
       * Organisation des imports
       * ==========================================
       */

      'import/order': [
        'error',
        {
          groups: [
            'builtin', // node:fs, path...
            'external', // express, zod...
            'internal', // @/...
            'parent', // ../...
            'sibling', // ./...
            'index',
            'type',
          ],

          pathGroups: [
            {
              pattern: '@/**',
              group: 'internal',
              position: 'before',
            },
          ],

          pathGroupsExcludedImportTypes: ['builtin'],

          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },

          'newlines-between': 'always',
        },
      ],

      /**
       * ==========================================
       * Style des imports
       * ==========================================
       */

      'import/no-unresolved': 'error',

      'import/named': 'error',

      'import/default': 'error',

      'import/namespace': 'error',
    },
  },
];
