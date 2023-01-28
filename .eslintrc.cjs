module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  rules: {
    semi: ['warn', 'always'],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react'],
  ignorePatterns: ['src/**/*.scss', 'src/**/*.json', 'tsconfig.json', '**/*.cjs'],
};
