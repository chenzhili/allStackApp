
const path = require("path");
const webpack = require("webpack")
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: ["react-hot-loader/patch", path.join(__dirname, "src/index.js"),],
    devtool: "cheap-module-eval-source-map",// 开发环境配置
    // devtool: "cheap-module-source-map",   // 线上生成配置
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        // open: true,
        hot: true,
        port: 8777
    },
    mode: "development",
    output: {
        // chunkFilename: "[name].boudle.js",//这个是用于 出了 entry 以外的 模块引入，包括 动态 导入的 模块的配置
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
                    // "style-loader",
                    MiniCssExtractPlugin.loader,//简单版本
                    // {
                    //     loader: MiniCssExtractPlugin.loader,
                    //     options: {
                    //         // only enable hot in development
                    //         hmr: process.env.NODE_ENV === 'development',
                    //         // if hmr does not work, this is a forceful method.
                    //         reloadAll: true,
                    //     },
                    // },
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
                test: /\.(png|jpg|jpeg|gif|svg)/,
                use: {
                    loader: "url-loader",
                    options: {
                        // publicPath: 'images/',
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
                            // publicPath: 'fonts/',
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
            template: path.join(__dirname, "public/index.html")
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].css',
            chunkFilename: '[id].css',
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
            //alias 就是给 对应的 值 取别名，简化引用的作用，这里 的意思 就是  把 @hot-loader/react-dom 的别名叫做 react-dom 去替换 react自带的react-dom
            'react-dom': '@hot-loader/react-dom'
        }
    },
    optimization: {
        splitChunks: {
            /* 这个 代码 切分 然后 异步加载，现在还没 有 实现，因为 代码量 太小了，默认不会 切分 */
            /* 对于 代码 chunk 能够 独立 分割成 cache 文件 的 条件
                New chunk can be shared OR modules are from the node_modules folder //同时 有两个以上的 文件引用
                New chunk would be bigger than 30kb (before min+gz) //大小 一定 超过 30kb
                Maximum number of parallel requests when loading chunks on demand would be lower or equal to 5 //并行加载的数量 <=5
                Maximum number of parallel requests at initial page load would be lower or equal to 3   //初始 加载文件 <=3
            */
            cacheGroups: {
                commons: {
                    name: "commons",
                    chunks: "all",
                    minChunks: 2
                }
            }
        },
    },
    performance:false

}