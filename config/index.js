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
        appid:'wx07717b0f6f3ccb61',//AppID wx868cb0ffc40ace47
        secret: '9063668629641d4b8083be997d7c5715',//AppSecret
    }
}
let envObj = process.env.NODE_ENV == 'production' ? PRO_CON : process.env.NODE_ENV == 'test' ? TEST_CON : DEV_CON;  
const config = Object.assign({},obj,envObj)
// console.log(config)
export default config;