/* 
    reducer 的 放置 之处
*/
function testReducer(state,action){
    console.log(state,action);
    return {...state,a:1}
}


export {
    testReducer
}