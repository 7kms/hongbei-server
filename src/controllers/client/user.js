import {jscode2session,WXBizDataCrypt} from '../../lib/wechat-api'

import User from '../../models/client/user';
export let onLogin = async (ctx, next) => {
    let { code,encryptedData,iv } = ctx.request.body
    let { session_key } = await jscode2session(code)
    let wxCrypt = new WXBizDataCrypt(session_key)
    let data = wxCrypt.decryptData(encryptedData, iv)
    delete data.watermark
    let { openId } = data;
    let user = await User.findOneAndUpdate({'wechatInfo.openId': openId},{wechatInfo:data},{upsert: true})
    ctx._id = user._id
    ctx.body = {
       data: user
    }
    await next()
}


export let loginout = async (ctx)=>{
    ctx.session = null
    ctx.status = 200;
    ctx.body = {
        msg: 'login out'
    }
}

export let profile = async (ctx)=>{
    let { _id } = ctx
    if(!_id){
        ctx.status = 401
        ctx.body = {
            code: 401,
            msg: 'not login'
        }
    }else{
        let user = await User.findById(_id,{wechatInfo:1})
        ctx.body = {
            data: user.wechatInfo
        }
    }
}

export let getAddress = async (ctx)=>{
    let user = await User.findById(ctx._id)
    console.log(user)
    let list = user.address || [];
    ctx.body = {
        code: 200,
        data: {
            list
        }
    }
}

export let addAddress = async (ctx) => {
    let user = await User.findById(ctx._id)
    let address = ctx.request.body.address;
    if(!Array.isArray(address)){
        ctx.status = 417
        ctx.body = {
            err:'address must be array'
        }
    }
    user.address = address
    try{
        await user.save()
        ctx.body = {
            data: {
                code: 200,
                msg: 'success'
            }
        }
    }catch(err){
        ctx.status = 403
        ctx.body = {
            err
        }
    }
}