import React, { Component } from "react"
import ReactDOM from "react-dom"

import models from "../models/modelsApp"
import { isString, isFunction, isArray,isObject } from "./judgeValueType"
console.log(isString);

/**
 * 最后 暴露 的 方法，所有 的 异步 加载 reducer，effects以及 component 都在这
 * @param {*} param0 //app 里 直接 保存对应的 内部 所有的 信息，oldReducer，store 等信息
 * @param {*} renderFaild 
 */
const asyncLoadComponent = ({ app: loadApp, component: loadComponent, models }, renderFaild = "组件未加载成功") => {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                Child: null,
            }
            this.unmount = false;
            asyncLoadData(loadApp, models);
        }
        async componentWillUnmount() {
            this.unmount = true;
        }
        async componentDidMount() {
            const { default: Child } = await loadComponent();
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
 * 异步加载 reducer 和 affects
 */
const asyncLoadData = async (loadApp, models) => {
    let { _reducers, _store, _sagaMiddleware } = await (await loadApp()).default;
    _reducers = isArray(_reducers) ? _reducers : [];
    _store = isObject(_store) ? _store : {};

    if(isArray(models)){
        models.forEach(async (m)=>{
            let {effects,namespace,reducers} = (await m()).default;
            console.log(model);
            if(isObject(effects)){
                _loadEffects(effects)
            }
        })
    }else if(isFunction(models)){
        
    }else{
        models = null;
    }

    if(!models)return;
    console.log(models);
    /* 异步加载 effects */
    function _loadEffects(sagaMiddleware, effects){
        Object.keys(effects).forEach(sagaMiddleware.run)
    }
    _loadEffects = _loadEffects.bind(null,_sagaMiddleware);
    /* 异步加载 reducers */
    const _loadReducers = (store, reducers) => {

    }
}

/**
 *  异步 加入 reducers
 *  这个 需要 保存 以前 reducers 的 数据，因为 这个 加载 是 替换
 * @param {*} app 需要 加入的 app,初始 所有 需要 的 数据
 * @param {*} loadStore 动态的 store 的 值
 * @param {*} oldReducers 原始的 reducers,需要 把 所有的 state 重新 附上值
 */

const _getReducers = async (app, models) => {
    console.log("执行", app, models);
    // let { namespace, reducers: _reducers } = app;
    // const { default: stroe } = await loadStore();
    // console.log(models, stroe.getState());//用过这个 去时时  获取 store 中的 state 值，去动态 初始化 对应的 现在的 state
}
/**
 * 这里 要 统一 存储 和 初始化 项目
 * 
 */
const initApp = async function (Component, root) {
    let { default: _reducers } = await import("../store/reducers"),
        { default: _store, sagaMiddleware: _sagaMiddleware } = await import("../store/store");
    const renderRootDom = isString(root) ? document.getElementById(root) : root;

    const _render = (Component, mountEle) => {
        if (isFunction(Component)) {
            ReactDOM.render(<Component />, mountEle);
        } else {
            ReactDOM.render(<div>没有加载的根节点</div>, mountEle)
        }

    }
    if (renderRootDom) {
        _render(Component, renderRootDom)
    }
    return {
        _reducers, _store, _sagaMiddleware
    }
}
export { asyncLoadComponent, initApp }

