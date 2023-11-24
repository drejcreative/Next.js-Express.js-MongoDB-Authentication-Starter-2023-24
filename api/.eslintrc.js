module.exports = {
  env: {
    node: true,
    es6: true,
  },
  plugins: ['jest'],
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
};
