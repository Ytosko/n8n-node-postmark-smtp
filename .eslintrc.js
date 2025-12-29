/**
 * @type {import('@types/eslint').Linter.Config}
 */
module.exports = {
    root: true,
    env: {
        browser: true,
        es6: true,
        node: true,
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: './tsconfig.json',
        sourceType: 'module',
    },
    ignorePatterns: ['.eslintrc.js', 'jest.config.js'],
    plugins: ['@typescript-eslint'],
    extends: ['plugin:n8n-nodes-base/community'],
    rules: {
        // You can add your custom rules here
    },
};
