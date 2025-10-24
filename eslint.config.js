import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'
import path from "path";

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
      settings: {
        'import/resolver': {
            typescript: {
                project: './tsconfig.json',
            },
            alias: {
                map: [['@', path.resolve(__dirname, './src')]],
                extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
            },
        },
      },
    rules: {
        '@typescript-eslint/no-explicit-any': 'off',
    }
  },
])
