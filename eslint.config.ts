// eslint.config.ts
import type { Linter } from 'eslint';
import next from 'eslint-config-next';

export default [
  {
    ignores: [".next/", "eslint.config.ts"],
  },
  ...next,
  {
    rules: {
      "semi": [
        "error",
        "always"
      ],
      "semi-spacing": [
        "error",
        {
          "after": true,
          "before": false
        }
      ],
      "semi-style": [
        "error",
        "last"
      ],
      "no-extra-semi": "error",
      "no-unexpected-multiline": "error",
      "no-unreachable": "error",
      "indent": [
        "error",
        2
      ],
      "quotes": [
        "error",
        "single"
      ],
      "linebreak-style": [
        "error",
        "unix"
      ],
      "no-console": [
        "warn",
        {
          "allow": [
            "warn",
            "error"
          ]
        }
      ]
    }
  }
] satisfies Linter.FlatConfig[];
