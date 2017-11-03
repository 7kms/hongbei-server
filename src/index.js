'use strict';

import Koa from 'koa';

import middleware from './middleware';
import routes from './routes';
import onerror from 'koa-onerror';
import {logger,print} from './utils/index'
import session from 'koa-session';
import MongooseStore from './lib/session-mongoose';

export default ()=>{
    const app = new Koa();
    app.keys = ['app-secret-key'];
    app.proxy = true;
    /**
     * error信息优化
     * */
    onerror(app);
    app.on('error',function(err,ctx){
        if((ctx.status === 404 && err.status === undefined) || err.status === 500){
            logger.error('server error', err);
            logger.error(ctx);
        }
        print(err);
    })
    app.use(async(ctx,next)=>{
        let requestDate = Date.now();
        print(ctx.request.url)
        await next();
        print(ctx.request.url, Date.now() - requestDate)
    })
    app.use(session({
        key:'hbadmin',
        store: new MongooseStore()
    },app));
    app.use(middleware());
    app.use(routes());
    app.use(ctx => ctx.status = 404);
    return app;
}