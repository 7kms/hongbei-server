
import Order from '../../models/client/order';
import User from '../../models/client/user';
// import {changeSales} from '../cakes'
import {remove as cartRemove} from './cart';
import {prepay} from './pay';

export let insert = async (ctx)=>{
    let user = await User.findById(ctx._id)
    let { address, goods, cart_ids, totalPrice } = ctx.request.body;
    let order = new Order({user:user._id,address,goods,totalPrice});
    try{
        let newOrder = await order.save();
        let {openId} = user.wechatInfo;
        let {_id,totalPrice} = newOrder;
        let obj = {
            openid:openId,
            orderId:String(_id),
            desc:'卷趣烘焙',
            totalPrice,
            spbill_create_ip: ctx.request.ip
        }
        let {clientConfig} = await prepay(obj);
        // await Order.update({ _id: _id }, { $set: {sign}});
        ctx.body = {
            code:200,
            data:{
                _id,
                config: clientConfig
            }
        }
        cartRemove(user,cart_ids)
    }catch(e){
        console.log(e)
        global.__logger__.error(e);
        ctx.status = 500
        ctx.body={
            code:500,
            data:e
        }
    }
}

/**
 * 重新支付未支付的订单
 * @param {} ctx 
 */
export let repay = async (ctx)=>{
    let user = await User.findById(ctx._id)
    let { _id } = ctx.params;
    console.log(_id,user)
    let newOrder = await Order.findOne({user:user._id,_id});
    if(!newOrder){
        ctx.status = 500
        ctx.body={
            code:500,
            err_msg:'订单错误'
        }
        return false;
    }
    try{
        let {openId} = user.wechatInfo;
        let {_id,totalPrice} = newOrder;
        let obj = {
            openid: openId,
            orderId:String(_id),
            desc:'卷趣烘焙',
            totalPrice,
            spbill_create_ip: ctx.request.ip
        }
        let {clientConfig} = await prepay(obj);
        // await Order.update({ _id: _id }, { $set: {sign}});
        ctx.body = {
            code:200,
            data:clientConfig
        }
    }catch(e){
        console.log(e)
        global.__logger__.error(e);
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

export let getDetail = async (ctx)=>{
    let user = await User.findById(ctx._id)
    console.log(ctx.params.id)
    try{
        let res = await Order.findOne({_id: ctx.params.id,user:user._id,$or:[{isRemoved:false},{isRemoved:{$exists:false}}]})
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