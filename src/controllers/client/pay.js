import request from 'request';
import config from '../../../config';
import crypto from 'crypto';
import xml2js from 'xml2js';
const {
    appid,
    key,
    mch_id
} = config.wechat;
const notify_url = 'https://server.hddxyy.cn/wechat/pay_notify';
const prepay_url = 'https://api.mch.weixin.qq.com/pay/unifiedorder';

const getClientPayConfig = (prepay_id)=>{
    let obj = {
        appId: appid,
        timeStamp: Math.floor(Date.now()/1000),
        nonceStr: get_nonce_str(32),
        package: 'prepay_id=' + prepay_id,
        signType: 'MD5'
    }
    let arr = Object.keys(obj).sort().map(item => {
        return `${item}=${obj[item]}`;
    });
    let str = arr.join('&') + '&key=' + key;
    obj.paySign = getSign(str);
    return obj;
}

const wechatPay = (obj)=>{
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

export const prepay = async ({openid,orderId,desc,totalPrice,spbill_create_ip})=> {
    let obj = {
        appid,
        mch_id,
        nonce_str: get_nonce_str(32),
        body: desc,
        out_trade_no: orderId,
        // fee_type: 'CNY',
        total_fee: parseInt(totalPrice * 1000),
        // spbill_create_ip: '103.36.220.55',
        spbill_create_ip,
        notify_url,
        trade_type:'JSAPI',
        // sign_type:'MD5',
        openid
    }
    let arr = Object.keys(obj).sort().map(item => {
        return `${item}=${obj[item]}`;
    });
    let str = arr.join('&') + '&key=' + key;
    obj.sign = getSign(str);
    let res;
    try{
        res = await wechatPay(obj);
        let {prepay_id} = res;
        if(prepay_id){
            res = getClientPayConfig(prepay_id)
        }
        // console.log(res);
    }catch(e){
        res = e;
        console.log(e);
    }
    return res;
}
const getSign = (str)=>{
    console.log(str)
    let hash = crypto.createHash('md5').update(str,'utf8');
    return hash.digest('hex').toUpperCase();
}
const json2xml = (obj)=>{
    let builder = new xml2js.Builder({
        headless:true,
        allowSurrogateChars: true,
        rootName:'xml',
        cdata:true
    });
    var xml = builder.buildObject(obj);
    return xml;
}
const parseXml = (xml)=>{
    let {parseString} = xml2js;
    let res;
    parseString(xml,  {
		trim: true,
		explicitArray: false
	}, function (err, result) {
        res = result;
    });
    return res;
} 
const get_nonce_str = (len)=>{
    let str = '';
    while(str.length < len){
        str +=  Math.random().toString(36).slice(2);
    }
    return str.slice(-len);
}