
import Order from '../../models/client/order';
import User from '../../models/client/user';
import {remove as cartRemove} from './cart'

export let insert = async (ctx)=>{
    let user = await User.findById(ctx._id)
    let { address, goods, cart_ids,totalPrice } = ctx.request.body;
    let order = new Order({user:user._id,address,goods,totalPrice})
    try{
        await order.save();
        ctx.body={
            code:200,
            data:'success'
        }
        cartRemove(user,cart_ids)
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
    let { ids } = ctx.request.body
    let list =  await Order.find({_id:{$in:ids}})
    let flag = true
    list.forEach(item=>{
        if(String(item.user) != String(user._id)){
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
        let data = await Order.remove({_id:{$in:ids}})
        ctx.body={
            code:200,
            data
        }
    }
}

export let getList = async (ctx)=>{
    let user = await User.findById(ctx._id)
    try{
        let list = await Order.find({user: user._id}).sort({createdAt:-1})
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
