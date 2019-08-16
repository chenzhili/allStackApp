import { createStore } from "redux"

// export default const store = createStore();


// 简单的 实现方法 ，合并 reducer的 实现
/* 
    这里 就告诉 了一个 问题，可以 按照 key 值 对 不同的 reducer 进行 区分 state

    这里 引用 哈 dva 在 这里 的实现 上，
        用 namespace 来 作为 key 的 分层，里面 的 reducer 方法 是 实际  调用 的 reducer 层，因为 到 这一层 已经 不能 对 state 进行 删除
*/
/* 这里先 测试 store 的 state 变化 让页面 也 跟着 变化，不带路由的 ，再做 带 路由 */
const combineReducers = reducers => {
    return (state = {}, action) => {
        return Object.keys(reducers).reduce(
            (nextState, key) => {
                nextState[key] = reducers[key](state[key], action);
                return nextState;
            },
            {}
        );
    };
};