module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'prettier/react',
    'prettier/@typescript-eslint',
  ],
  settings: {
    react: {
      version: '16.8',
    },
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    // project: './tsconfig.json',
    // tsconfigRootDir: './',
    extraFileExtensions: ['ts', 'tsx'],
  },
  rules: {
    '@typescript-eslint/explicit-member-accessibility': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-parameter-properties': 'disabled',
    '@typescript-eslint/no-var-requires': 'disabled',
    '@typescript-eslint/explicit-function-return-type': 'disabled',
    'react/prop-types': 'disabled',
  },
};
