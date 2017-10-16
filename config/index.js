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
        appid:'wx07717b0f6f3ccb61',//AppID wx868cb0ffc40ace47
        secret: '9063668629641d4b8083be997d7c5715',//AppSecret
    }
}
export default config;