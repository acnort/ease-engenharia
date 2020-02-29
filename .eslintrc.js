module.exports = {
  root: true,
  parser: 'babel-eslint',
  extends: 'airbnb',
  rules: {
    'react/jsx-filename-extension': [1, { 'extensions': ['.js', '.jsx'] }],
    'react/prefer-stateless-function': 'off',
    'react/require-default-props': 'off',
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': 'off',
    'jsx-quotes': 'off',
    'comma-dangle': 'off',
    'semi': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/forbid-prop-types': 'off',
    'react/state-in-constructor': 'off',
    'global-require': 'off'
  },
  'settings': {
    'import/resolver': {
      'babel-plugin-root-import': {
        'rootPathPrefix': '~',
        'rootPathSuffix': 'src'
      }
    }
  }
};
