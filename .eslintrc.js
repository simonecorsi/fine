module.exports = {
  env: {
    es6: true,
    node: true,
    commonjs: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:prettier/recommended",
    "plugin:node/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  rules: {
    "no-new": "error",
    "no-process-exit": "off",
    "node/no-unpublished-require": "off",
    "node/no-unpublished-import": "off",
    "node/no-unsupported-features/es-syntax": "off",
  },
};
