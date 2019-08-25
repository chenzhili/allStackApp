export default {
    namespace: 'dynamic',
    state: {
        cooperateArr:[], //存储 初始化的 操作 权限
    },
    effects: {
        *test(action,{call,put}){
            
        }
    },
    reducers: {
        test1(state,action){
            console.log("dynamic的test1",state,action);
            return {...state}
        }
    }
}