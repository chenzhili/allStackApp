function judge(valueType){
    return (value)=>{
        valueType = `${valueType.slice(0,1).toUpperCase()}${valueType.slice(1)}`
        return (Object.prototype.toString.call(value) === `[object ${valueType}]`);
    }
}

export const isString = judge("String");
export const isNumber = judge("Number");
export const isBoolean = judge("Boolean");
export const isArray = judge("Array");
export const isObject = judge("Object");
export const isFunction = judge("Function");
export const isNull = judge("Null");
export const isUndefined = judge("Undefined");

// isString,isNumber,isBoolean,isArray,isObject,isNull,isUndefined,isFunction