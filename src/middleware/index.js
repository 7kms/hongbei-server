import koaBody from 'koa-body'
import compose from 'koa-compose'
import serve from 'koa-static'
import { resolve } from 'path';
import parseQurery from './httpJsonQuery.js';
import xmlParser from './httpXmlparse';

// import convert from 'koa-convert'

export default () => {
    return compose([
        serve(resolve(__dirname,'../../uploads'),{maxage:300*86400*1000}),
        xmlParser({
            encoding: 'utf8',
            xmlOptions: {
                explicitArray: false
            },
            onerror: (err, ctx) => {
                ctx.throw(err.status, err.message);
            }
        }),
        koaBody({ multipart: true }),
        parseQurery()
    ])
}