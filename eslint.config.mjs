import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'
import stylistic from '@stylistic/eslint-plugin'
import { defineConfig, globalIgnores } from 'eslint/config'
import tailwindPlugin from 'eslint-plugin-tailwindcss'

const __dirname = dirname(fileURLToPath(import.meta.url))
const compat = new FlatCompat({ baseDirectory: __dirname })

export default defineConfig([
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    'src/app/global.css',
    'src/components/ui/**',
    'src/components/magicui/**',
  ]),
  ...compat.extends('next/core-web-vitals', 'plugin:@typescript-eslint/recommended'),
  stylistic.configs.recommended,
  ...tailwindPlugin.configs['flat/recommended'],
  {
    settings: {
      'import/resolver': {
        typescript: true,
        node: true,
      },
      tailwindcss: {
        config: `${__dirname}/src/app/global.css`,
        callees: ['classnames', 'clsx', 'cn'],
      },
    },
    rules: {
      '@next/next/no-img-element': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      'prefer-template': 'error',
      'func-style': ['error', 'declaration', { allowArrowFunctions: true }],
      'arrow-body-style': ['error', 'as-needed'],
      'prefer-arrow-callback': ['error'],
      'padded-blocks': ['error', { blocks: 'never', classes: 'never', switches: 'never' }],

      'tailwindcss/no-custom-classname': 'off',

      'import/no-named-as-default': 'off',
      'import/order': [
        'warn',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          pathGroups: [{ pattern: 'react', group: 'external', position: 'before' }],
          pathGroupsExcludedImportTypes: ['react'],
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],

      '@stylistic/semi': ['error', 'never'],
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/quote-props': ['error', 'consistent'],
      '@stylistic/jsx-quotes': ['error', 'prefer-double'],
      '@stylistic/indent': ['error', 2],
      '@stylistic/max-len': [
        'error',
        {
          code: 120,
          ignorePattern: '^import\\s.+from\\s.+',
          ignoreTemplateLiterals: true,
          ignoreStrings: true,
        },
      ],
      '@stylistic/arrow-parens': ['error', 'always'],
      '@stylistic/comma-spacing': ['error', { before: false, after: true }],
      '@stylistic/key-spacing': ['error', { beforeColon: false, afterColon: true }],
      '@stylistic/object-curly-spacing': ['error', 'always'],
      '@stylistic/array-bracket-spacing': ['error', 'never'],
      '@stylistic/function-call-spacing': ['error', 'never'],
      '@stylistic/brace-style': 'off',
      '@stylistic/operator-linebreak': 'off',
      '@stylistic/jsx-one-expression-per-line': 'off',
      '@stylistic/multiline-ternary': 'off',
    },
  },
])
