import koaBody from 'koa-body'
import compose from 'koa-compose'
import serve from 'koa-static'
import { resolve } from 'path';
import parseQurery from './httpJsonQuery.js';


// import convert from 'koa-convert'

export default () => {
    return compose([
        serve(resolve(__dirname,'../../uploads'),{maxage:30*86400*1000}),
        koaBody({ multipart: true }),
        parseQurery()
    ])
}