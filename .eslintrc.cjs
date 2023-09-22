/* eslint-env node */
module.exports = {
  root: true,
  env: {
    es2022: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['tsconfig.json'],
    sourceType: 'module',
    tsconfigRootDir: __dirname
  },
  ignorePatterns: [
    '/lib/**/*',
  ],
  plugins: [
    '@typescript-eslint',
    'import',
  ],
  rules: {
    'quotes': ['error', 'single'],
    'import/no-unresolved': 0,
    'semi': ['error', 'never'],
    'indent': ['error', 2],
    'linebreak-style': ['error', 'unix'],
    'max-len': ['error', { code: 105, ignoreUrls: true }],
    'object-curly-spacing': ['error', 'always'],
    'arrow-parens': ['error', 'as-needed'],
    'comma-dangle': ['error', 'only-multiline'],
    'curly': ['error', 'multi-or-nest'],
    'quote-props': ['error', 'consistent-as-needed'],
  },
}