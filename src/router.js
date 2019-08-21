import React from "react"
import { HashRouter as Router, Route, Link, Redirect, Switch, Fade } from "react-router-dom";
/* 
    BrowserRouter 和 HashRouter
    对于 BrowserRouter 在 前端 渲染不在 后端渲染的 时候，在 初始化 页面 直接 加载 http://localhost:8777/third 时候 会找不到 路由，因为 还未加载
    而 HashRouter 就没有 这个问题
*/

import A from "./routes/a"

const Second = (props) => {
    return (
        <div>second page</div>
    )
}
const Third = (props) => {
    return (
        <div>third page</div>
    )
}
const RouterCom = (props) => {
    return (

        <Router>
            <div>
                <ul>
                    <li><Link to="/">frist route</Link></li>
                    <li><Link to="/second">second route</Link></li>
                    <li><Link to="/third">third route</Link></li>
                </ul>
                <Switch>
                    <Route exact path="/" component={Second}></Route>
                    <Route path="/second" component={A}></Route>
                    <Route path="/third" component={Third}></Route>
                    <Redirect to="/" />
                </Switch>
            </div>
        </Router>
    )
}

export default RouterCom;