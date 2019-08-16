
const path = require("path");
const webpack = require("webpack")
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    entry: {
        "index": path.join(__dirname, "src/index.js")
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        // open: true,
        hot: true,
        port: 8777
    },
    mode: "development",
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].boudle.js"
    },
    module: {
        rules: [
            {
                test: /\.js|jsx$/i,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    /* options: {
                        presets: ['@babel/preset-env'],
                    } */
                }
            },
            // {
            //     test:/\.css$/i,
            //     use:["style-loader","css-loader"], //这里不改变 生成 的css
            // },
            {
                test: /\.scss|css$/i,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            modules: {
                                mode: 'local',
                                localIdentName: '[path][name]__[local]--[hash:base64:5]',
                            }
                        }

                    },
                    "sass-loader"
                ]
            },
            {
                test: /\.((png|jpg|gif))/i,
                loader: 'url-loader',
                options: {
                    limit: 8192
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, "public/index.html")
        }),
        new webpack.HotModuleReplacementPlugin(), //模块 热加载 没有 写完，在 初始 入口文件 还没 配置对应的 代码
    ]
}