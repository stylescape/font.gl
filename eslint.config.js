import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import tseslint from "typescript-eslint";

export default tseslint.config(
    {
        ignores: ["dist/", "node_modules/", "**/*.min.js"],
    },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    prettier,
    {
        rules: {
            "no-var": "warn",
            "no-nested-ternary": "warn",
            "no-console": "warn",
            "no-template-curly-in-string": "warn",
            "no-self-compare": "warn",
            "arrow-body-style": "warn",
        },
    },
);
