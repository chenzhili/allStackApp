// import { call, put, takeEvery, all, fork, cancel, cancelled, take, takeLatest, actionChannel } from 'redux-saga/effects'
/* 
    在 saga 中 与 action 进行 通信的 方式，可以 通过 take, takeLatest，takeEvery
    但是 用的 最多的 还是 takeEvery ，这个 特点 是 action 触发 就会 执行
*/
import { all, take, takeEvery, call, put } from "redux-saga/effects"
import models from "../../models/staticModels/allModels"
/**
 * 生成 对于的 sagaAction 
 * 以 对应的 namespace 作为 action 的 头层
 */
const generalSagaAction = (models) => { 
    return Object.keys(models).reduce((prev, next) => {
        const effects = models[next]["effects"];
        prev = prev.concat(Object.keys(effects).reduce((result, effect) => {
            console.log(effect);
            result.push((function* () {
                yield takeEvery(`${models[next]["namespace"]}/${effect}`, function* (action) {
                    if (effects[effect]) {
                        yield call(effects[effect], action, require('redux-saga/effects'))
                    }
                });
            })());
            return result;
        }, []));
        return prev;
    }, []);
}

export default function* rootSaga() {
    yield all([...generalSagaAction(models)])
}

/*
    const watchLoginOrOut = function* () {
    yield takeEvery("a/test", function* (action) {
        console.log(action);
        yield call(models["a"]["effects"]["test"], action, require('redux-saga/effects'));
    })
}
*/