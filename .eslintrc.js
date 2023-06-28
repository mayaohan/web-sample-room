module.exports = {
  extends: ['eslint-config-ali/vue', 'prettier'],
  rules: {
    'no-console': 0,
    'no-param-reassign': [
      2,
      {
        props: false,
      },
    ],
    'no-unused-vars': 0,
  },
};
