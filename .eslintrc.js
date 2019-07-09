// ES Lint config file

module.exports = {
  "plugins": [ "react" ],
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  "parser": "babel-eslint",  
  env: {
    browser: true,
    node: true,
  },
  rules: { // 0 = off; 1 = warn; 2 = error
    'no-console': 0,
  }
};