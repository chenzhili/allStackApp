const path = require("path");
const webpack = require("webpack");
const merge = require('webpack-merge')
const commonConfig = require('./webpack.base.config.js')

module.exports = merge(commonConfig, {
    mode: "production",
    output: {
        // 输出目录
        path: path.resolve(__dirname, "../dist"),
        // 文件名称
        filename: '[name].[contenthash].js',
        chunkFilename: '[name].[contenthash].js'
    },
    devtool: 'cheap-module-source-map',
    optimization: {
        usedExports: true,
        splitChunks: {
            chunks: "all", // 所有的 chunks 代码公共的部分分离出来成为一个单独的文件
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors'
                }
            }
        },
    },
    plugins: [
        
    ],
});
