import Router from 'koa-router';
import user from './user'
import goods from './goods'

let router = new Router()

router.use('/user', user.routes())
// router.use('/recommend', user.routes())
// router.use('/goodsList', user.routes())
router.use('/goods', goods.routes())

export default router;