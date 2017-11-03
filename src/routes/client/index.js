import Router from 'koa-router'
import user from './user'
import goods from './goods'
import carts from './carts'
import orders from './orders'
import course from './course'
import feed from './feed'
import category from './category'
import activity from './activity'
import pay from './pay'
import { needLogin } from '../../controllers/client/token'
let router = new Router()

router.use('/user', user.routes())
router.use('/goods', goods.routes())
router.use('/course', course.routes())
router.use('/feed', needLogin, feed.routes())
router.use('/category', category.routes())
router.use('/activity', activity.routes())
router.use('/pay', pay.routes())
router.use('/cart', needLogin, carts.routes())
router.use('/order', needLogin, orders.routes())

export default router;