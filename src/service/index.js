import xml2js from 'xml2js';
import crypto from 'crypto';
import request from 'request';

import config from '../../config'

const {sms} = config;

const CanonicalizedResource = `/topics/${sms.TopicName}/messages`;
// http(s)://31583261.mns.cn-hangzhou.aliyuncs.com/
const url = 'http://' + sms.AccountId + '.mns.cn-hangzhou.aliyuncs.com' + CanonicalizedResource;

const DirectSMS = {
    FreeSignName: '河地大校友云',
    TemplateCode: sms.TemplateCode,
    Type: 'singleContent',
    Receiver: sms.Receiver,
    SmsParams: ''
}

const json2xml = (obj)=>{
    let builder = new xml2js.Builder({
        // headless:true,
        allowSurrogateChars: true,
        rootName:'Message',
        xmldec:{
            version: '1.0', 
            encoding: 'utf-8',
            standalone: false
        }
        // cdata:true
    });
    var xml = builder.buildObject(obj);
    // xml = xml.replace(/\sstandalone="no"/ig,'').replace(/<Message>/,'<Message xmlns="http://mns.aliyuncs.com/doc/v1/">')
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
const getSignature = (DATE)=>{
    const HTTP_METHOD = 'POST';
    const CONTENT_MD5 = '';
    const CONTENT_TYPE = 'text/xml';
    // const DATE = 'Sun, 12 Nov 2017 17:15:13 GMT';
    const CanonicalizedMNSHeaders = 'x-mns-version:2015-06-06\n';
    const str = HTTP_METHOD + "\n" 
    + CONTENT_MD5 + "\n"     
    + CONTENT_TYPE + "\n" 
    + DATE + "\n" 
    + CanonicalizedMNSHeaders
    + CanonicalizedResource;

    const signature = crypto.createHmac('sha1', sms.AccessKeySecret)
    .update(str)
    .digest('base64');
    // console.log(signature)
    return signature;
}
const generateHeader = ()=>{
    const DATE = new Date().toUTCString();
    // const DATE = 'Sun, 12 Nov 2017 17:44:21 GMT';
    const Authorization = `MNS ${sms.AccessKeyId}:${getSignature(DATE)}`
    // console.log(Authorization)
    return {
        Authorization,
        // 'Content-Length': xml.length,
        'Content-Type': 'text/xml',
        Date: DATE,
        Host: sms.AccountId + '.mns.cn-hangzhou.aliyuncs.com',
        'x-mns-version': '2015-06-06'
    }
}
export const sendSMS = (str)=>{
    DirectSMS.SmsParams = JSON.stringify({code:str});
    let obj = {
        MessageBody: 'content',
        MessageAttributes:{
            DirectSMS:JSON.stringify(DirectSMS)
        }
    }
    let xml = json2xml(obj);
    return new Promise((resolve,reject)=>{
        request({
            method:'POST',
            headers: generateHeader(xml),
            url, 
            body: xml
        },(err,res, body)=>{
            if(err){
                reject(err);
            }else{
                console.log(body);
                let obj = parseXml(body);
                resolve(obj);
            }
        });
    });
}