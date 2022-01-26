const path = require("path");
const config = require("./config");
const plugins = require("./plugins");

module.exports = {
    entry: config.entryPath,
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'swc-loader',
                    },
                ],
            },
            {
                test: /\.(s[ac]|c)ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    "postcss-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                // present by default in webpack so no plugins or loaders needed 
                type: 'asset/resource',
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                // present by default in webpack so no plugins or loaders needed 
                type: 'asset/inline',
            },
        ],
    },
    output: {
        filename: '/dist',
        path: config.buildPath
    },
    plugins: plugins.common,
    stats: 'errors-only',
}