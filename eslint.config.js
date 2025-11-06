import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
      tseslint.configs.recommended,
      async () => ({
        plugins: {
          prettier: (await import('eslint-plugin-prettier')).default,
          'jsx-a11y': (await import('eslint-plugin-jsx-a11y')).default,
        },
        rules: {
          'prettier/prettier': 'error',
          'jsx-a11y/aria-role': 'warn',
          'jsx-a11y/aria-props': 'warn',
          'jsx-a11y/alt-text': 'warn',
          'jsx-a11y/no-autofocus': 'warn',
        },
      }),
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      // General best practices
      'no-unused-vars': 'off', // Disable for TS files
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'eqeqeq': 'error',
      'curly': 'error',
      'no-implicit-coercion': 'error',
      // Typescript
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-function-return-type': [
        'warn',
        {
          allowExpressions: true,
          allowConciseArrowFunctionExpressionsStartingWithVoid: true,
          allowTypedFunctionExpressions: true,
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-inferrable-types': 'warn',
      // React
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
])
