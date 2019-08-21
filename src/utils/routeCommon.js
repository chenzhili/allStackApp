import React from "react"
import { Route, Redirect, Switch } from "react-router-dom";
import routeRenderConfig from "../enum/routeRenderConfig"

const RenderRoute = (route) => {
    console.log(route);
    switch (route.render) {
        case routeRenderConfig.route:
            let routeProps = {
                render: (props) => (<route.component {...props} routes={route.routes} />)
            }
            route.path && (routeProps.path = route.path);
            route.exact && (routeProps.exact = route.exact);
            return <Route {...routeProps} />
        case routeRenderConfig.redirect:
            return <Redirect to={route.path} />
        default:
            return "还未添加 对应的 渲染项"
    }
}

const mapRoutes = (routes) => {
    const routeArr = routes.filter(r => r.render === routeRenderConfig.route);
    const redirectArr = routes.filter(r => r.render === routeRenderConfig.redirect)
    return (
        [
            <Switch key="route">
                {
                    routeArr.map((route, i) => <RenderRoute key={i} {...route} />)
                    /* 这里 不能 route={route} 这种传参，一直 显示为 第一个 route值，没找到原因,看到 对应的 key 一直都没变 */
                }
            </Switch>,
            redirectArr.map((route, i) => <RenderRoute key={i} {...route} />)
        ]
    )
}

export {
    mapRoutes
}