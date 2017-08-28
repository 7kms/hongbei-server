import koaBody from 'koa-body'
import compose from 'koa-compose'
import serve from 'koa-static'
import { resolve } from 'path';
import parseQurery from './httpJsonQuery.js';


// import convert from 'koa-convert'

export default () => {
    return compose([
        serve(resolve(__dirname,'../../uploads')),
        koaBody({ multipart: true }),
        parseQurery()
    ])
}