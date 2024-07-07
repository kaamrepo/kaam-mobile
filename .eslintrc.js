module.exports = {
  root: true,
  extends: '@react-native-community',
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    'no-inline-comments': 'error',
    'no-unused-vars': 'error',
    'prefer-const': ['error', {ignoreReadBeforeAssign: true}],
  },
};
