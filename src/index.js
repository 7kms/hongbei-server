'use strict';

import Koa from 'koa';

import middleware from './middleware';
import routes from './routes';
import onerror from 'koa-onerror';
import {logger,print} from './utils/index'

const app = new Koa();
app.keys = ['app-secret-key'];


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


app.use(middleware());
app.use(routes());
app.use(ctx => ctx.status = 404);

export default app;
