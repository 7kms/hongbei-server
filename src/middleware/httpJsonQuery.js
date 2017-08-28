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
            ctx.request.query = paramsObj
        }
        await next();
    }
}
export default dev