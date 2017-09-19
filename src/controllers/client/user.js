import {jscode2session,WXBizDataCrypt} from '../../lib/wechat-api'
import User from '../../models/client/user';
export let onLogin = async (ctx) => {
    let { code,encryptedData,iv } = ctx.request.body
    let { session_key } = await jscode2session(code)
    let wxCrypt = new WXBizDataCrypt(session_key)
    let data = wxCrypt.decryptData(encryptedData, iv)
    delete data.watermark
    let user = await new User({wechatInfo:data}).save()
    ctx.body = {
        data: user
    }
}

export let loginout = async (ctx)=>{
    ctx.session = null
    ctx.status = 200;
    ctx.body = {
        msg: 'login out'
    }
}

export let profile = async (ctx)=>{
    // let userId = ctx.userId;
    let user = ctx.session.user
    ctx.status = 200;
    ctx.body = {
        data: user
    }
}