const path = require('path');
const config = require('./config');

module.exports = {
    mode: 'development',
    devtool: 'cheap-module-source-map',   // another option can be 'inline-source map'
    entry: config.entryPath,
    output: {
        filename: '/dist',
        path: config.buildPath
    },
    devServer: {  
        static: config.buildPath,  // change is needed
        port: 3000,
        open: true,
        hot: true
    }
}