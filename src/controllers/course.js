import Entity from '../models/course';

export let itemListClient = async (ctx)=>{
    let { limit=0, skip=0 , options = {}} = ctx.query;
    options.isOnline = true;
    try{
        let arr = await Entity.find(options).select().limit(parseInt(limit)).skip(parseInt(skip)).sort({updatedAt:-1}).exec();
        ctx.body = {
            data: arr
        }
    }catch(err){
        ctx.throw(err)
    }
}

export let itemList = async (ctx)=>{
    let { limit=0, skip=0 , options = {}} = ctx.query;
    try{
        let arr = await Entity.find(options).select().limit(parseInt(limit)).skip(parseInt(skip)).sort({updatedAt:-1}).exec();
        ctx.body = {
            data: arr
        }
    }catch(err){
        ctx.throw(err)
    }
}

export let itemInsert = async (ctx)=>{
    let obj = ctx.request.body;
    let {title} = obj;
    try{
        let result = await Entity.findOne({title})
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
export let itemDetail = async (ctx)=>{
    console.log(ctx.params.id)
    try{
        let res = await Entity.findOne({_id: ctx.params.id,$or:[{isRemoved:false},{isRemoved:{$exists:false}}]})
        console.log(res)
        if(res){
            ctx.status = 200
            ctx.body = {
                data: res
            }
        }else{
            ctx.status = 417
            ctx.body = {
                err: "数据不存在"
            }
            console.log(ctx.body)
        }
    }catch(err){
        ctx.status = 500,
        ctx.body = {
            msg: err
        }
    }
    
}