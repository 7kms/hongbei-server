import Order from '../models/client/order';

export let orderDetail = async (ctx)=>{
    console.log(ctx.params.id)
    try{
        let res = await Order.findOne({_id: ctx.params.id}).populate('user','wechatInfo')
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

export let orderList = async (ctx)=>{
    let { limit=10, skip=0, options={},projections={}} = ctx.request.query;
    console.log(options);
    let total = await Order.find({$and:[options,{$or:[{isRemoved:false},{isRemoved:{$exists:false}}]}]},projections).count()
    let arr = await Order.find({$and:[options,{$or:[{isRemoved:false},{isRemoved:{$exists:false}}]}]},projections)
    .populate('user','wechatInfo')
    .limit(parseInt(limit))
    .skip(parseInt(skip))
    .sort({updatedAt:-1});
    ctx.body = {
        data: arr,
        total
    }
}

export let orderUpdate = async (ctx)=>{

    let obj = ctx.request.body;
    delete obj._id
    delete obj.isRemoved
    let result = await Order.update({ _id: ctx.params.id }, { $set: obj});
    // let data = Cake.findById(ctx.params.id)
    // let cake = Cake.findById(ctx.request.body)
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
    
}