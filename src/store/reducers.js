/* 
    reducer 的 放置 之处
*/
/* 需要 写一个 方法 递归 获取 models 下 所有 js 文件 来 用他的 namespace 去 生成 reducer */
/* 
    这种 不行，在 web 端 不存在 fs 模块的，用 一个 js 文件手动 管理 所有 的 model ，这样 就可以 用这个 文件 作为  入口
*/
/* (function () {
    const path = require("path");
    const fs = require("fs");
    const travelSync = (() => {
        const reg = /\.js$/i;
        return function (dir, callback) {
            fs.readdirSync(dir).forEach(function (file) {
                let pathname = path.join(dir, file);

                if (fs.statSync(pathname).isDirectory()) {
                    travelSync(pathname, callback);
                } else if (reg.test(file)) {
                    callback(pathname);
                }
            });
        }
    })()
    const getJsMess = (pathname) => {
        const data = require(pathname);
        console.log(data, data.namespace, data.reducers);
    }
    travelSync(path.resolve(__dirname, "../models"), getJsMess);
    
})() */

/* 手动 配置 model 的 所有 文件 */
import models from "../models/staticModels/allModels"

/** 
 * 对于 判断 是 effects 还是 reducers 需要 判断
 * 现在 先 简单 的判断 ，由于 在 dva 中，在 一个 model 中 需要 保留 对应 的 namespace 去 判断是 属于 reducer 的 action还是 中间件的 action
*/
const isReducerAction = (model,type)=>{
    return model["reducers"] instanceof Object && (type in model["reducers"]);
}

// dva 模式 的  reducer 的 集成 ，对于 effects 没有进行 集成
const combineModels = (models) => { 
    return Object.keys(models).reduce((prev, next) => {
        prev[next] = (state = models[next]["state"] ? models[next]["state"] : {}, action) => {
            const actionType = action.type.split("/");//accountBook/setHeader
            console.log(state,action,models);
            if (!models[next]["namespace"] || !isReducerAction(models[next],actionType[1])) return {...state};
            switch (actionType[0]) {
                case models[next]["namespace"]:
                    return models[next]["reducers"][actionType[1]] ? models[next]["reducers"][actionType[1]](state, action) : { ...state };
                default:
                    return { ...state };
            }
        }
        return prev;
    }, {});
}
export {combineModels}
export default combineModels(models)


/* function testReducer(state = {}, action) {
    console.log(state, action);
    switch (action.type) {
        case "testReducer":
            return { ...state, ...action.payload }
        default:
            return { ...state };
    }
    return { ...state, ...action.payload }
}
function testReducer2(state = {}, action) {
    console.log(state, action);
    switch (action.type) {
        case "testReducer2":
            return { ...state, ...action.payload }
        default:
            return { ...state };
    }
} */












