import React, { Component } from "react"
import models from "../models/modelsApp"

/**
 * 最后 暴露 的 方法，所有 的 异步 加载 reducer，effects以及 component 都在这
 * @param {*} param0 //app 里 直接 保存对应的 内部 所有的 信息，oldState，oldReducer，store 等信息
 * @param {*} renderFaild 
 */
const asyncLoadComponent = ({app,component:loadComponent,store}, renderFaild = "组件未加载成功") => {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                Child: null,
            }
            this.unmount = false;
            asyncReducers(app,store);
        }
        componentWillUnmount() {
            this.unmount = true;
        }
        async componentDidMount() {
            const { default: Child } = await loadComponent();
            console.log(Child);
            if (this.unmount) return;
            this.setState({ Child })
        }
        render() {
            const { Child } = this.state;
            return (
                Child ? <Child {...this.props} /> : renderFaild
            )
        }
    }
}

/**
 *  异步 加入 reducers 
 *  这个 需要 保存 以前 reducers 的 数据，因为 这个 加载 是 替换
 * @param {*} app 需要 加入的 app,初始 所有 需要 的 数据
 * @param {*} loadStore 动态的 store 的 值
 * @param {*} oldReducers 原始的 reducers,需要 把 所有的 state 重新 附上值
 */

const asyncReducers = async (app,loadStore, oldReducers) => {
    console.log("执行");
    // let { namespace, reducers: _reducers } = app;
    const { default: stroe } = await loadStore();
    // console.log(models, stroe.getState());//用过这个 去时时  获取 store 中的 state 值，去动态 初始化 对应的 现在的 state
}

export { asyncLoadComponent, asyncReducers }