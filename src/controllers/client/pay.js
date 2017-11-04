import request from 'request';
import config from '../../../config';
import {json2xml,parseXml,getSign} from '../../utils';
const {
    appid,
    key,
    mch_id
} = config.wechat;
const {server} = config;
const notify_url = `${server}/wechat/pay_notify`;
const prepay_url = 'https://api.mch.weixin.qq.com/pay/unifiedorder';

/**
 * 生成前端调启支付界面的必要参数
 * @param {String} prepay_id 
 */
const getClientPayConfig = (prepay_id)=>{
    let obj = {
        appId: appid,
        timeStamp: String(Math.floor(Date.now()/1000)),
        nonceStr: get_nonce_str(32),
        package: 'prepay_id=' + prepay_id,
        signType: 'MD5'
    }
    let arr = Object.keys(obj).sort().map(item => {
        return `${item}=${obj[item]}`;
    });
    // 拼接商户key并对齐进行签名
    let str = arr.join('&') + '&key=' + key;//appId=wxf8600b48303b5dfb&nonceStr=0x3jm47en8hy6zx9d3a6qqevhf8dzeqf&package=prepay_id=wx2017110411492613492815520529050900&signType=MD5&timeStamp=1509767366&key=Lzy12345678901112131415161718192
    obj.paySign = getSign(str);
    return obj;
}

/**
 * 统一下单 prepay_url = 'https://api.mch.weixin.qq.com/pay/unifiedorder';
 * @param {Object} obj 调用统一下单的必须参数
 */ 
const wechatPay = (obj)=>{
    // 将参数转成xml
    let xml = json2xml(obj);
    console.log(xml)
    return new Promise((resolve,reject)=>{
        request({method:'POST',url: prepay_url,body: xml},(err,res, body)=>{
            if(err){
                reject(err);
            }else{
                console.log(body);
                let obj = parseXml(body).xml;
                resolve(obj);
            }
        });
    });
}

/**
 * 
 * @param {*} param0 
 * 
 */
export const prepay = async ({openid,orderId,desc,totalPrice,spbill_create_ip})=> {
    // 通过查阅文档,调用统一下单有10个参数是必须的
    let obj = {
        appid,
        mch_id,
        nonce_str: get_nonce_str(32),
        body: desc,
        out_trade_no: orderId,
        total_fee: parseInt(totalPrice * 100),
        spbill_create_ip,
        notify_url,
        trade_type:'JSAPI',
        openid
    }
    // js的默认排序即为ASCII的从小到大进行排序(字典排序)
    let arr = Object.keys(obj).sort().map(item => {
        return `${item}=${obj[item]}`;
    });
    // 这里拼接签名字符串的时候一定要注意: 商户的key是要单独拿出来拼在最后面的
    let str = arr.join('&') + '&key=' + key;
    // appid=wxf8600b48303b5dfb&body=德胜村&mch_id=1490909372&nonce_str=plfbp2bhr0id1z6aktmndfot94hkewcv&notify_url=https://server.hddxyy.cn/wechat/pay_notify&openid=oFm4h0WvnQWB4ocFmdPzsWywlE8c&out_trade_no=20150806125346&spbill_create_ip=127.0.0.1&total_fee=56600&trade_type=JSAPI&key=Lzy12345678901112131415161718192
    
    // 将字符串进行签名
    obj.sign = getSign(str);
    let clientConfig;
    try{
        // 调用微信统一下单接口拿到 prepay_id
        let res = await wechatPay(obj);
        let {prepay_id,sign} = res;
        if(prepay_id){
            clientConfig = getClientPayConfig(prepay_id)
        }
        return {clientConfig, sign};
        // console.log(res);
    }catch(e){
        console.log(e)
        throw new Error(e);
    }
    
}

/**
 * 生成指定长度的随机数
 * @param {*int} len 
 */
const get_nonce_str = (len)=>{
    let str = '';
    while(str.length < len){
        str +=  Math.random().toString(36).slice(2);
    }
    return str.slice(-len);
}