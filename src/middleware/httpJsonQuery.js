'use strict';
let dev = () => {
    return async(ctx, next) => {
        let paramsStr = ctx.request.query.params;
        let paramsObj = {}
        if(paramsStr){
            paramsObj = JSON.parse(paramsStr)
            if(paramsObj.projection){
                ctx.projection = paramsObj.projection.split(',').reduce((prev,item)=>{
                    prev[item] = 1;
                    return prev
                },{})
                delete paramsObj.projection;
            }
            Object.assign(ctx.request.query, paramsObj)
            delete ctx.request.query.params
            console.log(paramsObj,ctx.request.query)
        }
        await next();
    }
}
export default dev