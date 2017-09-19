import Router from 'koa-router';
import { onLogin } from '../../controllers/client/user'
let router = new Router()
router.get('/', async (ctx,next) => {
    ctx.body = {
        msg: 'hello'
    }
})

router.post('/onlogin', onLogin)
export default router;