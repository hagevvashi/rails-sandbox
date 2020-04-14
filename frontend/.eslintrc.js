module.exports = {
  root: true,
  env: {
    browser: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
  },
  extends: [
    "airbnb",
    "prettier",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended",
    "prettier/@typescript-eslint",
  ],
  plugins: ["prettier", "@typescript-eslint", "jest"],
  settings: {
    "import/resolver": {
      typescript: {
        directory: "./tsconfig.json",
      },
    },
  },
  rules: {
    "react/jsx-filename-extension": [1, { extensions: [".ts", ".tsx"] }],
    "react/prop-types": 0,
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: ["**/*.test.ts", "**/*.stories.ts"],
        optionalDependencies: false,
      },
    ],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        ts: "never",
        tsx: "never",
      },
    ],
    "@typescript-eslint/consistent-type-definitions": ["error", "type"],
    "import/prefer-default-export": 0,
  },
  overrides: [
    {
      files: ["src/stories/**/*"],
      rules: {
        "import/no-extraneous-dependencies": "off",
      },
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    {
      files: ["webpack.*.ts"],
      env: {
        browser: false,
        node: true,
      },
      parserOptions: {
        project: "./tsconfig.json",
      },
      rules: {
        "import/no-extraneous-dependencies": "off",
        "no-restricted-imports": "off",
      },
      settings: {
        "import/resolver": {
          node: {
            extensions: [".ts", ".js"],
          },
        },
      },
    },
    {
      files: ["tests/**/*"],
      env: {
        browser: false,
        node: true,
        "jest/globals": true,
      },
      rules: {
        "import/no-extraneous-dependencies": "off",
      },
      parserOptions: {
        project: "./tsconfig.json",
      },
      settings: {
        "import/resolver": {
          typescript: {
            directory: "./tsconfig.json",
          },
        },
      },
    },
  ],
};
