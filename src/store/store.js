import { createStore, combineReducers, applyMiddleware } from "redux"
import createSagaMiddleware from 'redux-saga'
import {call,put} from "redux-saga/effects"

import reducers from "./reducers"
import rootSaga from "./middleWare/saga"

const sagaMiddleware = createSagaMiddleware()

const store =  createStore(
    combineReducers(reducers),
    applyMiddleware(sagaMiddleware)
);
const newRootReducer = (state,action)=>{
    console.log(state,action);
    return {...state}
}
// store.replaceReducer(newRootReducer); //这个是 替换 原有的 reducer 了，所以 需要 留住 已有 的 reducer
// 测试 run 方法 会不会 覆盖 已有 的 effects 
const newEffects = function*(){
    yield put({type:"test/test",payload:{abab:3}})
}

// sagaMiddleware.run(rootSaga); //这个是 saga 用于 动态 绑定 saga 的方法，这里可以在 路由 发生变化的 接入 新的 saga
sagaMiddleware.run(rootSaga);
// sagaMiddleware.run(newEffects); //这里的 run 是 push 的意思 不是 替换
console.log(reducers);
console.log(store.getState());

export {sagaMiddleware};
export default store;







// 简单的 实现方法 ，合并 reducer的 实现
/*
    这里 就告诉 了一个 问题，可以 按照 key 值 对 不同的 reducer 进行 区分 state

    这里 引用 哈 dva 在 这里 的实现 上，
        用 namespace 来 作为 key 的 分层，里面 的 reducer 方法 是 实际  调用 的 reducer 层，因为 到 这一层 已经 不能 对 state 进行 删除
*/
/* 这里先 测试 store 的 state 变化 让页面 也 跟着 变化，不带路由的 ，再做 带 路由 */
/* const combineReducers = reducers => {
    return (state = {}, action) => {
        return Object.keys(reducers).reduce(
            (nextState, key) => {
                nextState[key] = reducers[key](state[key], action);
                return nextState;
            },
            {}
        );
    };
}; */