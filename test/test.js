const crypto = require('crypto');

let getSha1 = function(str) {
    var sha1 = crypto.createHash("sha1");//定义加密方式:md5不可逆,此处的md5可以换成任意hash加密的方法名称；
    sha1.update(str);
    var res = sha1.digest("hex");  //加密后的值d
    return res;
}

let getEncAse192 = function(str, secret) {
    var cipher = crypto.createCipher("sha1", secret); //设置加密类型 和 要使用的加密密钥
    var enc = cipher.update(str, "utf8", "hex");    //编码方式从utf-8转为hex;
    enc += cipher.final("hex"); //编码方式从转为hex;
    return enc; //返回加密后的字符串
}
let appkey = '53aa5560b9d01'
let config = {
    // appkey: '53aa5560b9d01',
    access_token: 'awR38XxLCucDvmtDNSaFp5NYH0S5PvTW',
    auth_timestamp: '1501989686',
    auth_nonce: '182169'
}

let arr = Object.keys(config).map(function(val){
    return `${val}=${config[val]}`
}).sort();
// arr.sort()
console.log(arr)
let originStr = arr.join('').toUpperCase()
console.log(originStr)
// let str = getEncAse192(originStr,appkey)
let str = getSha1(originStr)
console.log(str)
console.log('9fc7dd23cebc37bc66676996aa8d8ef2b2420979')