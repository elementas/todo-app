module.exports = {
    env: {
        node: true,
        commonjs: true,
        es2021: true
    },
    extends: ['airbnb-base', 'prettier'],
    plugins: ['prettier'],
    parserOptions: {
        ecmaVersion: 'latest'
    },
    rules: {
        'consistent-return': 'off'
    }
};
