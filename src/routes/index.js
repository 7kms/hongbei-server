import Router from 'koa-router';
import admin from './admin';
import cake from './cakes';
import token from './token';
import category from './category';
import client from './client';
import { checkToken } from '../controllers/client/token'

// import upload from './upload';

let router = new Router();
export default () => {
    // router.use('/upload', upload.routes())
    router.use('/token', token.routes())
    router.use('/admin', admin.routes())
    router.use('/cakes', cake.routes())
    router.use('/category', category.routes())
    router.use('/client', checkToken, client.routes())
    router.use(router.allowedMethods())
    return router.routes()
}