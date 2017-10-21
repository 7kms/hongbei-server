// let _ = require('lodash')
import DEV_CON from './dev'
import PRO_CON from './product'
import TEST_CON from './test'
import path from 'path'
let obj  = {
    app:{
        port: 3100
    },
    jwt:{
        cert: 'kodkaokanndjand'
    },
    dir:{
        logdir:path.resolve(__dirname,'../logs')
    },
    wechat:{
        appid:'wxf8600b48303b5dfb',//AppID wx868cb0ffc40ace47
        secret: 'ec6edce372d8e333716b6e8981156a2e',//AppSecret
    }
}
let envObj = process.env.NODE_ENV == 'production' ? PRO_CON : process.env.NODE_ENV == 'test' ? TEST_CON : DEV_CON;  
const config = Object.assign({},obj,envObj)
// console.log(config)
export default config;