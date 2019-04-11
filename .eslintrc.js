module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  // plugins: [
  //   'react/recommended',
  //   '@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
  //   'prettier/recommended',
  // ],
  extends: [
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
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
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    // project: './tsconfig.json',
    // tsconfigRootDir: './',
    extraFileExtensions: ['ts', 'tsx'],
  },
  rules: {
    // '@typescript-eslint/indent': 'disabled',
    '@typescript-eslint/explicit-member-accessibility': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-parameter-properties': 'disabled',
    '@typescript-eslint/no-var-requires': 'disabled',
    '@typescript-eslint/explicit-function-return-type': 'disabled',
    'react/prop-types': 'disabled',
    // '@typescript-eslint/camelcase': 'disabled',
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",
  },
};
