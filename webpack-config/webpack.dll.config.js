/**
 * 静态资源的公共 提出，减少这块的重复打包 ，比如 react ，react-dom,antd等等 所有外部引用的资源都可提取出来
 * dll和 optimization.splitChunks的区别，这个是 单独 提取出出来不需要 重复打包，而 splitChunks 还是会每次去编译打包出公共的模块
 * 待做
 */

const webpack = require("webpack");
const path = require("path");

module.exports = {
    entry: ["react", "react-dom", "antd"],
    output: {
        path: path.resolve(__dirname, "..", "dll"),
        filename: "dll_[name].js",
        library: "[name]_[hash]"
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, "..", "dll/[name]-manifest.json"),
            name: "[name]_[hash]"
        })
    ]
}