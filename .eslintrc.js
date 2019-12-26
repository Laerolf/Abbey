module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "@vue/prettier"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-undef": "off",
    "htmlWhitespaceSensitivity": 'ignore',
    "vue/no-use-v-if-with-v-for":
      process.env.NODE_ENV === "production" ? "error" : "off",
    'prettier/prettier': [
      'warn',
      {
        printWidth : 100
      },
    ],
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};
