import Router from 'koa-router';
import admin from './admin';
import cake from './cakes';
import token from './token';
import category from './category';
import course from './course';
import client from './client';
import feed from './feed';
import { checkToken } from '../controllers/client/token'

// import upload from './upload';

let router = new Router();
export default () => {
    // router.use('/upload', upload.routes())
    router.use('/token', token.routes())
    router.use('/admin', admin.routes())
    router.use('/cakes', cake.routes())
    router.use('/category', category.routes())
    router.use('/course', course.routes())
    router.use('/feed', feed.routes())
    router.use('/client', checkToken, client.routes())
    router.use(router.allowedMethods())
    return router.routes()
}