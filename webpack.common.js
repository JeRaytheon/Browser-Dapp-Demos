const path = require('path');
module.exports = {
    entry: ['babel-polyfill', './src/main.ts'],
    resolve:
        {
            extensions: ['.ts', '.js', '.json']
        },
};