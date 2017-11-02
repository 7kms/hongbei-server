import Entity from '../../models/activity';

export let itemList = async (ctx,next)=>{
    console.log(ctx.query)
    let { limit=10, skip=0 } = ctx.query;
    try{
        let arr = await Entity.find({enable:true}).select().limit(parseInt(limit)).skip(parseInt(skip)).exec();
        if(arr.length){
            ctx.body = {
                data: arr
            }
            ctx.body.fromActivity = true;
        }else{
            await next();
            ctx.body.fromActivity = false;
        }
       
    }catch(err){
        ctx.throw(err)
    }
}