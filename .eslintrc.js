module.exports = {
  env: {
    es6: true,
    browser: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["tsconfig.json"],
  },
  settings: {
    react: {
      version: "detect",
    },
    "import/resolver": {
      typescript: {
        project: "tsconfig.json",
        alwaysTryTypes: true,
      },
    },
    "import/ignore": ["node_modules"],
  },
  extends: [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:tailwindcss/recommended"
  ],
  plugins: ["unused-imports", "prettier"],
  rules: {
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-unsafe-member-access": "warn",
    "no-unused-vars": "off",
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "error",
      { vars: "all", args: "all", argsIgnorePattern: "^_" },
    ],
    "react/display-name": "off",
    "react/no-array-index-key": "error",
    "import/no-named-as-default": "off",
    "import/no-named-as-default-member": "off",
    "import/no-unresolved": [
      "error",
      {
        amd: true,
        commonjs: true,
      },
    ],
    "react/prop-types": "off",
    "react/jsx-curly-brace-presence": ["error", "never"],
    "curly": ["error", "all"],
    "import/named": 2,
    "import/namespace": 2,
    "import/default": 2,
    "import/export": 2,
    "import/newline-after-import": [
      "error",
      {
        count: 1,
      },
    ],
    "import/order": [
      "error",
      {
        // Always insert nl between groups
        "newlines-between": "always",
        alphabetize: {
          order: "asc" /* sort in ascending order */,
          caseInsensitive: true /* ignore case */,
        },
        // We want to import react before the other externals
        pathGroups: [
          {
            pattern: "react",
            group: "external",
            position: "before",
          },
          {
            pattern: "next",
            group: "external",
            position: "before",
          },
        ],
        pathGroupsExcludedImportTypes: ["internal"],
        groups: [
          // Built-in modules first (fs, path, etc)
          "builtin",
          // Externals are next (react, redux, etc)
          "external",
          // Internals are next (@/**/*, etc)
          "internal",
          // Parent directories imports are the next (../**/*)
          "parent",
          // Same directory imports are the next (./foo)
          "sibling",
          // And the index is the final one ('./')
          "index",
        ],
      },
    ],
    "padding-line-between-statements": [
      2,
      // Always require blank lines after import, except between imports
      {
        blankLine: "always",
        prev: "import",
        next: "*",
      },
      {
        blankLine: "any",
        prev: "import",
        next: "import",
      },
      // Always require blank lines before and after every sequence of variable declarations and export
      {
        blankLine: "always",
        prev: "*",
        next: ["const", "let", "var", "export"],
      },
      {
        blankLine: "always",
        prev: ["const", "let", "var", "export"],
        next: "*",
      },
      {
        blankLine: "any",
        prev: ["const", "let", "var", "export"],
        next: ["const", "let", "var", "export"],
      },
      // Always require blank lines before and after class declaration, if, do/while, switch, try
      {
        blankLine: "always",
        prev: "*",
        next: ["if", "class", "export", "for", "do", "while", "switch", "try"],
      },
      {
        blankLine: "always",
        prev: ["if", "class", "for", "do", "while", "switch", "try"],
        next: "*",
      },
      // Always require blank lines before return statements
      {
        blankLine: "always",
        prev: "*",
        next: "return",
      },
    ],
    // we want to avoid extraneous spaces
    "no-multi-spaces": "error",
    // we want to avoid trailing spaces
    "no-trailing-spaces": "error",
    "prettier/prettier": "error",
  },
};
