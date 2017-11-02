import Entity from '../models/activity';

export let itemList = async (ctx)=>{
    console.log(ctx.query)
    let { limit=10, skip=0 } = ctx.query;
    try{
        let arr = await Entity.find().select().limit(parseInt(limit)).skip(parseInt(skip)).exec();
        ctx.body = {
            data: arr
        }
       
    }catch(err){
        ctx.throw(err)
    }
}

export let itemInsert = async (ctx)=>{
    let obj = {
        name: ''
    }
    obj = Object.assign(obj, ctx.request.body)
    try{
        let result = await Entity.findOne(obj)
        if(result){
            ctx.status = 417;
            ctx.body = {
                msg: '名称重复'
            }
            return false;
        }
        let data = await new Entity(obj).save()
        ctx.body = {
            data
        }
    }catch(err){
        console.log(err.toJSON())
        ctx.throw(err)
    }
}

export let itemUpdate = async (ctx)=>{
    let obj = ctx.request.body;
    delete obj._id
    try{
        let result = await Entity.update({ _id: ctx.params.id }, { $set: obj});
        if(result.ok){
            ctx.status = 200;
            ctx.body = {
                result
            }
        }else{
            ctx.status = 400;
            ctx.body = {
                result
            }
        }
    }catch(err){
        ctx.throw(err)
    }
}

export let itemDelete = async (ctx)=>{
    try{
        let arr = await Entity.remove({_id: ctx.params.id})
        ctx.status = 200
        ctx.body = {
            data: arr
        }
    }catch(err){
        ctx.throw(err)
    }
}