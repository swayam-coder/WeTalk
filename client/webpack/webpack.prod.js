const plugins = require("./plugins") 

module.exports = {
    mode: 'production',
    devtool: 'source-map',
    plugins: plugins.prod,
}