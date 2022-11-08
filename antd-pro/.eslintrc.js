module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true,
    REACT_APP_ENV: true,
  },
  rules: {
    // 你的自定义规则 https://pro.ant.design/zh-CN/docs/lint
    'no-nested-ternary': 1,
    'no-template-shadow': 'off',
  },
};
