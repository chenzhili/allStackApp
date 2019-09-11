/**
 * 通用的 配置
 */

const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const NODE_ENV = process.env.NODE_ENV;

module.exports = {
    entry: ["./src/index.js"],
    output: {
        // 输出目录
        path: path.resolve(__dirname, "../dist")
    },
    resolve: {
        extensions: ['.js', '.jsx'],//在 不写 jsx，js 后缀 ，在 import 中时 也能识别
    },
    module: {
        rules: [
            {
                test: /\.js|jsx$/i,
                exclude: /node_modules/,
                use: [
                    // "happypack/loader?id=happyBabel"
                    'babel-loader'
                ]
            },
            {
                test: /\.scss|css$/i,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,//简单版本
                    {
                        loader: "css-loader",
                        options: {
                            modules: {
                                mode: 'local',
                                localIdentName: '[path][name]__[local]--[hash:base64:5]',
                            }
                        }

                    },
                    // "postcss-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.css$/i,
                exclude: /(src|public)/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)/,
                use: {
                    loader: "url-loader",
                    options: {
                        publicPath: 'images/',
                        outputPath: "images/", // 图片输出的路径,默认也会给 publicPath加上 这个 
                        limit: 10 * 1024
                    }
                }
            },
            {
                test: /\.(eot|woff2?|ttf|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[name]-[hash:5].min.[ext]',
                            limit: 5000, // fonts file size <= 5KB, use 'base64'; else, output svg file
                            publicPath: 'fonts/',
                            outputPath: 'fonts/',//文件输出路径,默认也会给 publicPath加上 这个 
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['**/*', '!dll/**'],//这里的 !dll/** 把 dll 文件夹下的所有文件都不删除，目前把 dll 单独提出来了没放到 dist 下，所以 用不到
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, "../public/index.html"),
            minify: {
                collapseWhitespace: NODE_ENV === "production" ? true : false // 去除空白
            }
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
    ],
    performance: false
}