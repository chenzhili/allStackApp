/* 
    对于 happyPack 创建 多个 子线程 来进行 项目打包，其实在 小项目中 反而 会 拖慢 打包速率，因为在 构建的时候 需要 打开子线程，并且相互通信，损耗的时间比 实际 还多，
    官网中说了，当 模块 大于 300 个 时 才 获取到 真正的 好处，所以看情况而用
*/
const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
exports.plugins = [
    new HappyPack({
        //用id来标识 happypack处理那里类文件
        id: 'happyBabel',
        //如何处理  用法和loader 的配置一样
        loaders: [{
            loader: 'babel-loader?cacheDirectory=true',
        }],
        //共享进程池threadPool: HappyThreadPool 代表共享进程池，即多个 HappyPack 实例都使用同一个共享进程池中的子进程去处理任务，以防止资源占用过多。
        threadPool: happyThreadPool,
        //允许 HappyPack 输出日志
        verbose: true,
    }),
];

exports.module.rules = [
    {
        test: /\.js|jsx$/i,
        exclude: /node_modules/,
        use: [
            "happypack/loader?id=happyBabel"
        ]
    },
]