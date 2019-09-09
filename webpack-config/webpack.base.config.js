/**
 * 通用的 配置
 */

const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: ["./src/index.js"],
    output: {
        // 输出目录
        path: path.resolve(__dirname, "../dist")
    },
    resolve:{
        extensions: ['.js', '.jsx'],//在 不写 jsx，js 后缀 ，在 import 中时 也能识别
    },
    module: {
        rules: [
            {
                test: /\.js|jsx$/i,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                }
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
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, "../public/index.html"),
            minify: {
                collapseWhitespace: true // 去除空白
            }
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
    ],
    performance:false
}