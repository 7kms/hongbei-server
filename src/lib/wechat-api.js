import { $get } from './api.js';
import config from '../../config/index';
import crypto from 'crypto';
// console.log()

const SESSION_URL = 'https://api.weixin.qq.com/sns/jscode2session'
const grant_type = 'authorization_code'

export let jscode2session = async (js_code)=>{
    let {appid,secret} = config.wechat;
    try{
        return await $get(SESSION_URL,{appid,secret,js_code,grant_type})
    }catch(e){
        throw Error(e)
    }
}

export class WXBizDataCrypt{
    constructor(sessionKey){
        let { appid } = config.wechat;
        this.appId = appid
        this.sessionKey = sessionKey
    }
    decryptData(encryptedData, iv){
          // base64 decode
        var sessionKey = new Buffer(this.sessionKey, 'base64')
        encryptedData = new Buffer(encryptedData, 'base64')
        iv = new Buffer(iv, 'base64')
        try {
            // 解密
            var decipher = crypto.createDecipheriv('aes-128-cbc', sessionKey, iv)
            // 设置自动 padding 为 true，删除填充补位
            decipher.setAutoPadding(true)
            var decoded = decipher.update(encryptedData, 'binary', 'utf8')
            decoded += decipher.final('utf8')
            
            decoded = JSON.parse(decoded)

        } catch (err) {
            throw new Error('Illegal Buffer')
        }
        if (decoded.watermark.appid !== this.appId) {
            throw new Error('Illegal Buffer')
        }
        return decoded
    }
}