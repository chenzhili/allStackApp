
const path = require("path");
const webpack = require("webpack")
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    entry: ["react-hot-loader/patch", path.join(__dirname, "src/index.js"),],
    devtool: "cheap-module-eval-source-map",
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
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(), /* 
            这个 对于 react 的 模块热加载，一定要 react-hot-loader 中用到 
            @hot-loader/react-dom 这个 包，在 webpack 的 resolve 中 进行 配置，dom元素 才会 更新
            url：https://github.com/gaearon/react-hot-loader#hot-loaderreact-dom 仔细看 对于 @hot-loader/react-dom的描述就可以了
        */
    ],
    resolve: {
        alias: {
            'react-dom': '@hot-loader/react-dom'
        }
    }
}