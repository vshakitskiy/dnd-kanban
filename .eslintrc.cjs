// eslint-disable-next-line
module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        "eslint:recommended",
    ],
    ignorePatterns: [
        "dist",
        "node_modules"
    ],
    parser: "@typescript-eslint/parser",
    rules: {
        "indent": [
            "error",
            4
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "never"
        ],
        "no-unused-vars": "off",
    },
}
