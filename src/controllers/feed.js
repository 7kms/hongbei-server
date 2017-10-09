
import Feed from '../models/client/feed';
import User from '../models/client/user';

export let insert = async (ctx)=>{
    let user = await User.findById(ctx._id)
    let {message} = ctx.request.body;
    let cart = new Feed({user:user._id,message})
    try{
        await cart.save()
        ctx.body={
            code:200,
            data:'success'
        }
    }catch(e){
        ctx.status = 500
        ctx.body={
            code:500,
            data:e
        }
    }
}

export let remove = async (user,cart_ids)=>{
    let list =  await Feed.find({_id:{$in:cart_ids}})
    let flag = true;
    list.forEach(item=>{
        if(String(item.user) != String(user._id)){
            flag = false
        }
    })
    if(flag){
        let res = await Feed.remove({_id:{$in:cart_ids}})
        console.log(res)
    }
}

export let getList = async (ctx)=>{
    console.log(ctx.request.query)
    let { limit=10, skip=0, options={},projections={}} = ctx.request.query;
    console.log(options);
    let total = await Feed.find({$and:[options,{$or:[{isRemoved:false},{isRemoved:{$exists:false}}]}]},projections).count()
    let arr = await Feed.find({$and:[options,{$or:[{isRemoved:false},{isRemoved:{$exists:false}}]}]},projections)
    .populate('user','wechatInfo')
    .limit(parseInt(limit))
    .skip(parseInt(skip))
    .sort({updatedAt:-1});
    ctx.body = {
        data: arr,
        total
    }
}
