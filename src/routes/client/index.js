import Router from 'koa-router';
import user from './user'

let router = new Router()

router.use('/user', user.routes())
// router.use('/recommend', user.routes())
// router.use('/goodsList', user.routes())
// router.use('/goods', user.routes())

export default router;