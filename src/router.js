import React from "react"
import { HashRouter as Router, Route, Link, Redirect, Switch, Fade } from "react-router-dom";
import { connect } from "react-redux"

import routeRenderConfig from "./enum/routeRenderConfig"
import { mapRoutes } from "./utils/routeCommon"
import { asyncLoadComponent } from "./utils/initApp"
/* 
    BrowserRouter 和 HashRouter
    对于 BrowserRouter 在 前端 渲染不在 后端渲染的 时候，在 初始化 页面 直接 加载 http://localhost:8777/third 时候 会找不到 路由，因为 还未加载
    而 HashRouter 就没有 这个问题
*/

import A from "./routes/a"
import styles from "./index.scss"

const Second = (props) => {
    return (
        <div className={styles.testBorder}>second page</div>
    )
}
const Third = (props) => {
    return (
        <div>third page</div>
    )
}
const NoCom = (props) => {
    return (
        <div>没找到页面</div>
    )
}
const B = (props) => {
    return (
        <div>B 子页面</div>
    )
}

/* 这里 配置 对应的 所有 路由 ，由于 由组件 形式 呈现，所以 这里 相当于是一个 树形结构 */
const configRoutes = [
    {
        render: routeRenderConfig.route,
        path: "/",
        exact: true,
        component: Second,
        // params:"",//路由上不用 : 这种 方式 传参，用 ? 所以不需要 定义这个
        routes: []
    },
    {
        render: routeRenderConfig.route,
        path: "/second",
        component: asyncLoadComponent({
            app: () => import("./index"),
            component: () => import("./routes/a"),
            models:[()=>(import("./models/dynamicModels/example"))]
        }),
        routes: [
            {
                render: routeRenderConfig.route,
                path: "/second/child",
                component: B
            },
            {
                render: routeRenderConfig.route,
                path: false,
                component: NoCom
            },
        ]
    },
    {
        render: routeRenderConfig.route,
        path: "/third",
        component: Third,
        routes: []
    },
    {
        render: routeRenderConfig.route,
        path: false,//path不写，放到 最后的 route 代表如果前面都不匹配就匹配他，用 switch 来做
        component: NoCom
    },
];
const RouterCom = (props) => {
    console.log(props);
    return (
        <Router>
            <div>
                <ul>
                    <li><Link to="/">frist route</Link></li>
                    <li><Link to="/second">second route</Link></li>
                    <li><Link to="/third">third route</Link></li>
                </ul>
                {
                    // routes 的 渲染 都用 这个
                    mapRoutes(configRoutes)
                }
            </div>
        </Router>
    )
}

export default connect(state => state)(RouterCom);




