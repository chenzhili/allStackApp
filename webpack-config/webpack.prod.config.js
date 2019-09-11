const path = require("path");
const webpack = require("webpack");
const merge = require('webpack-merge')
const commonConfig = require('./webpack.base.config.js')
const PurgecssPlugin = require('purgecss-webpack-plugin')
const glob = require("glob-all");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

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
            chunks: "all", // 所有的 chunks 代码公共的部分分离出来成为一个单独的文件,包括 对应的 css 文件 也会对应的 生成
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors'
                },
            }
        },
    },
    plugins: [
        /* css-tree-shaking */
        new PurgecssPlugin({
            only: ['main'], //仅对于 这里包含的 css 文件 进行 tree-shaking
            paths: glob.sync([
                // 要做 CSS Tree Shaking 的路径文件
                path.resolve(__dirname, '..', 'public/*.*'),
                path.resolve(__dirname, '..', 'src/**/*.*'),
            ]),
        }),
        /* 提取 dll 中的公共库 动态加入 html 中，并且会 动态将 dll 中的js文件 拷贝一份到 dist文件 下 */
        new AddAssetHtmlPlugin({
            filepath: path.resolve(__dirname, "..", "dll/dll_main.js"),
        }),
        /* 引入公共库 */
        new webpack.DllReferencePlugin({
            manifest: require(path.resolve(__dirname, "../dll/main-manifest.json"))
        }),
        /* css单独文件的 压缩 */
        new OptimizeCssAssetsPlugin(),
    ],
});
