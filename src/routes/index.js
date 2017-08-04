import Router from 'koa-router';
import admin from './admin';
import cake from './cakes';
import token from './token';

let router = new Router();
export default () => {
    router.use('/token', token.routes())
    router.use('/admin', admin.routes())
    router.use('/cakes', cake.routes())
    return router.routes();
}