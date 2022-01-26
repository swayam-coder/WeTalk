const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const HtmlWebpackPlugin  = require('html-webpack-plugin');

module.exports = {
    prod: [
        new webpack.DefinePlugin({
            'process.env.name': JSON.stringify('Swayam'),
        }),
        new BundleAnalyzerPlugin({
            analyzerHost: '127.0.0.1',
            analyzerPort: '3001',
            openAnalyzer: false,
            generateStatsFile: true,
            analyzerMode: process.env.STATS ?? 'disabled' // env options: 'server', 'static', 'disabled'
        })
    ],
    common: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '..', './src/index.html'),
        }),
    ],
    dev: []
}