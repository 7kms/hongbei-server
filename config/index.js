// let _ = require('lodash')
import path from 'path'
let config  = {
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
        appid:'wx868cb0ffc40ace47',//AppID wx868cb0ffc40ace47
        secret: 'd8fb06ed92dbb9d8c88dfc5b8a892fe3',//AppSecret
    }
}
export default config;