描述：这个 项目 的 需求 就是 要求 从 前端 到后端 完全自己 构造 一个 项目，要求 简单的 交互需要有

1、使用 的 技术栈 初步 这样子 拟定：
    I、前端：
            js：react
                react这块：
                    react-router：做前端 路由
                    react-redux：做 数据 统一管理
                                redux的 中间件：react-saga
                后期 可能 会加入 ts 的 方式 增强 语言数据类型的 可控性
            ui：antd
            css：用 sass 
            项目搭建：用 webpack

    II、后端
            node 技术栈
            node的 框架：
                初定 为 KOA
        数据库：mysql
    III、单元测试 和 集成测试 先放放 ....
2、顺序
    先做 前端 比较熟悉，把 前端 的 架子 先搭出来 再说



开始

2019-8-16
"babel-runtime": "^6.26.0", // 一个编译后文件引用的公共库，可以有效减少编译后的文件体积
"dva-core": "^1.1.0", // dva 另一个核心，用于处理数据层
"global": "^4.3.2", // 用于提供全局函数的引用
"history": "^4.6.3", // browserHistory 或者 hashHistory
"invariant": "^2.2.2", // 一个有趣的断言库
"isomorphic-fetch": "^2.2.1", // 方便请求异步的函数，dva 中的 fetch 来源
"react-async-component": "^1.0.0-beta.3", // 组件懒加载
"react-redux": "^5.0.5", // 提供了一个高阶组件，方便在各处调用 store
"react-router-dom": "^4.1.2", // router4，终于可以像写组件一样写 router 了
"react-router-redux": "5.0.0-alpha.6",// redux 的中间件，在 provider 里可以嵌套 router
"redux": "^3.7.2" // 提供了 store、dispatch、reducer 
            
2019-8-18
    1、解决 react 在 dev 模式下 实现 热替换(hmr)，需要 详细 记录一下
        1、webpack 中 需要的 配置
            I、需要 devServer：就是 webpack-dev-server，并且 在 devServer:{hot:true}
            II、需要 
                    new webpack.NamedModulesPlugin(), //在 控制台 记录 是哪个 文件 发生了 热替换，这个只是 更清新 不是 必要
                    new webpack.HotModuleReplacementPlugin(), //热替换 必须的 插件
            III、在 .babelrc 中 需要 加入
                    plugin:["react-hot-loader/babel",]
            IV、对于 react 需要 下载 两个 插件
                    1）react-hot-loader 这个是 必须的 插件
                        在 根目录 文件 中 引入:
                            import { hot } from 'react-hot-loader/root';
                            hot：是一个 高阶 函数 App = hot(App) 或者 @hot App 这种 装饰器的 写法
                        ******
                            到这里，当你 修改 内容 后，控制台 确实 也监听 到了 内容的 变化，但是 页面 的 内容 并没有 更新，这里 个人 引入了 一个插件来 替换 原有  react-dom  就 成功了
                            
                            *这一点 特别重要：*******
                            加入步骤： 插件 ———— @hot-loader/react-dom
                            1、在 webpack 中 配置
                                resolve: {
                                    alias: {
                                        'react-dom': '@hot-loader/react-dom'
                                    }
                                }
                                对应 解释的 地址： https://github.com/gaearon/react-hot-loader#hot-loaderreact-dom
                        *****
2019-8-18
    1、完成 (react ，react-router(对于 路由 的 加入还没加)) 和 redux ，在 数据 和 试图 之间 进行 交互，并且 加入 中间件 (middleWare)
        为什么 有 router 时候 需要 去 单独处理，因为 在 router 发生 变化的 时候，shouldComponentUpdate 并没有 监测到 数据 的变化，所以 需要 加入 react-router-redux 将 history 当作 HOC 传入 组件，识别他的 变化
        
2019-8-20
    1、对于 redux-saga 的 深入理解，就是 对于 其中 原理以及 API 的理解
        注意点：
            I、所有的 saga 都是 构造器 函数，但是这里 需要 区分 自定义 执行 或者是 通过 action 触发的；
            II、这里 在 effects 上 分为 阻塞 和 非阻塞 试 的 ，对于 非阻塞 式 还可以 cancel ，可以 取消 ，并且 取消了的 状态 还能获取到
        继承 到 redux中 就是 在 applyMiddleware 中 加入 这个 中间件
        <!-- 
            简单 实现 对于 models  中 的 effects 中的 方法的 统一 集成，到时候 还需要 做 对于 reducer 和 effects 的 action 的 具体 区分，这里还没完成
         -->
2019-8-21
    1、集成 react-router 并且 用上 react-router-dom，同时 目前不需要 用 react-router-redux 去监听 路由 变化 更新组件，自己 内部 已经 实现了；
        react-router-dom 这个 增强 react-router 对于 dom 上 直接 控制 路由 的 跳转；不需要 下载 react-router

        比对 common.js  和 es6 的 模块化：
            require(): 这个是 同步 加载 模块；
            import(): 这个是 异步加载 模块，返回一个 Promise 对象；


    2、今天  需要 完成 路由文件的 数据结构 配置文件的 统一性，用统一 方法 返回 对应 生成 对应的 routes，异步 加载 component
        动态加载路由和异步加载component 需要 结合 webpack , url：https://blog.csdn.net/qq_35484341/article/details/80506297

        <!-- 这里就要 重新 封装 models 的 代码，一部分 为 静态 就初始化 的 models，一部分 为 动态 加载 的 models 文件 -->

        当天 完成 进度，只是在 对于 routes 的 统一封装，还没 实现 组件的 动态加载
        
        这需要 几天的事件，需要 完成 动态 加载 redux 的 reducer 和 middleWare (相当于 effects 和 reducer 进行 动态 加入)
        1、动态 加载 reducer url：https://blog.csdn.net/qq_27384769/article/details/78689086
        2、动态加载 saga 通过 const task = sagaMiddleware.run(dynamicSaga) url：https://dvajs.com/guide/source-code-explore.html#start-%E6%96%B9%E6%B3%95
2019-8-25
    1、完成 redux 以及 middleware 的 动态集成 到 路由
        reducer：主要通过  store.replaceReducer(reducers);//这里是吧 所有的 reducers 所有的要加入 是替换 原有的 reducers，但是 state 要用 更新过的
        effects:通过  sagaMiddleware.run(effects);//这个 是 追加的 意思 ，相当于 原有的 基础上 push 进去的；不需要 记住以前的 effects

2019-9-7
    完善 webpack 的配置，优化 对应模块
    参考：https://juejin.im/post/5cfe4b13f265da1bb13f26a8#heading-20
    1、mini-css-extract-plugin 单独 打包css，这个好处是可以 让 bundle 和 css  一起并行 加载
    2、对于 webpack 进行 环境不同的 分包处理 webpack-merge
    


