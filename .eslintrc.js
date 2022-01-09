module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 13,
  },
  rules: {
    semi: [2, 'never'],
    strict: 0,
    quotes: [1, 'single', { allowTemplateLiterals: true }],
    'no-unused-vars': 2,
    'no-multi-spaces': 1,
    camelcase: 1,
    'no-use-before-define': [2, 'nofunc'],
    'no-underscore-dangle': 0,
    'no-unused-expressions': 1,
    'comma-dangle': 0,
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'linebreak-style': ['error', process.platform === 'win32' ? 'windows' : 'unix'],
  },
}
