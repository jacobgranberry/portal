module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    jest: true,
  },
  extends: [
    "airbnb",
    "prettier",
    "prettier/react",
    "prettier/@typescript-eslint",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  plugins: ["@typescript-eslint", "react-hooks", "prettier"],
  rules: {},
  settings: {
    "import/resolver": {
      node: {
        moduleDirectory: ["node_modules", "src"],
      },
    },
  },
};
