
import {parseXml} from '../utils'
const parse = ()=>{
    return async (ctx, next) => {
        if (ctx.method == 'POST' && (ctx.is('xml') || ctx.is('text/xml'))) {
            let promise = new Promise(function (resolve, reject) {
                let buf = ''
                ctx.req.setEncoding('utf8')
                ctx.req.on('data', (chunk) => {
                    buf += chunk
                })
                ctx.req.on('end', () => {
                    let json = parseXml(buf);
                    resolve(json)
                })
            })
            await promise.then((result) => {
                    ctx.req.body = result
                })
                .catch((e) => {
                    e.status = 400
                })
            next()
        } else {
            await next()
        }
    }
}


export default parse;