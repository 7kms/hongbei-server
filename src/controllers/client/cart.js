
import Cart from '../../models/client/cart';
import User from '../../models/client/user';

export let insert = async (ctx)=>{
    let user = await User.findById(ctx._id)
    let {info} = ctx.request.body;
    let cart = new Cart({user:user._id,info})
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

export let remove = async (ctx)=>{
    let user = await User.findById(ctx._id)
    let { cart_ids } = ctx.request.body
    let list =  await Cart.find({_id:{$in:cart_ids}})
    let flag = true
    list.forEach(item=>{
        if(item.user != user._id){
            flag = false
        }
    })
    if(!flag){
        ctx.status = 403
        ctx.body={
            code:403,
            msg:'not authorized'
        }
    }else{
        let data = await Cart.remove({_id:{$in:cart_ids}})
        ctx.body={
            code:200,
            data
        }
    }
}

export let getList = async (ctx)=>{
    let user = await User.findById(ctx._id)
    try{
        let list = await Cart.find({user: user._id})
        ctx.body={
            code:200,
            data:list
        }
    }catch(e){
        ctx.status = 500
        ctx.body = {
            code:500,
            msg:e
        }
    }
}
