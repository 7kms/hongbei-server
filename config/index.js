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
    }
}
export default config;