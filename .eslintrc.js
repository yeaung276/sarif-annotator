module.exports = {
    env: {
      commonjs: true,
      es6: true,
      node: true,
    },
    root: false,
    parser: '@typescript-eslint/parser',
    extends: [
      'prettier',
      'eslint:recommended',
      'plugin:@typescript-eslint/eslint-recommended',
      'plugin:@typescript-eslint/recommended',
    ],
    plugins: ['@typescript-eslint'],
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.ts'],
        },
      },
    },
    rules: {
      'no-var': 'off',
      'no-use-before-define': 'off',
      '@typescript-eslint/no-use-before-define': ['error'],
      '@typescript-eslint/no-explicit-any': 'off',
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
        },
      ],
      'no-console': 'off',
      'no-underscore-dangle': 'off',
      'import/no-unresolved': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          ts: 'never',
          tsx: 'never',
          js: 'never',
          jsx: 'never',
          mjs: 'never',
        },
      ],
      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': 'warn',
      'no-useless-escape': 'warn',
      'import/prefer-default-export': 'warn',
      'no-nested-ternary': 'warn',
      camelcase: 'warn',
      radix: 'warn',
      'no-param-reassign': [
        'error',
        { props: true, ignorePropertyModificationsFor: ['state'] },
      ],
      'class-methods-use-this': 'warn',
      'default-param-last': 'warn',
      'no-unsafe-optional-chaining': 'warn',
      'no-promise-executor-return': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: false,
          argsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
        },
      ],
    },
  };