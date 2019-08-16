描述：这个 项目 的 需求 就是 要求 从 前端 到后端 完全自己 构造 一个 项目，要求 简单的 交互需要有

1、使用 的 技术栈 初步 这样子 拟定：
    I、前端：
            js：react
                react这块：
                    react-router：做前端 路由
                    react-redux：做 数据 统一管理
                                redux的 中间件：react-saga
                后期 可能 会加入 ts 的 方式 增强 语言的 可控性
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
            
