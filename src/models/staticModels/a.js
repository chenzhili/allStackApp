export default {
    namespace: 'a',
    state: {
        cooperateArr:[], //存储 初始化的 操作 权限
    },
    effects: {
        *test(action,{call,put}){
            console.log(action);
            yield put({type:"a/test1",payload:{testData:11111}})
        }
    },
    reducers: {
        test1(state,action){
            console.log(state,action);
            return {...state,...action.payload}
        }
    }
}