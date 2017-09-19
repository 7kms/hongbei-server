import Router from 'koa-router';
import { onLogin } from '../../controllers/client/user'
let router = new Router()
router.get('/', async (ctx) => {
    let { user } = ctx.session
    if(!user){
        ctx.status = 401
        ctx.body = {
            code: 401,
            msg: 'not login'
        }
    }else{
        ctx.body = {
            data:user
        }
    }
})

router.post('/onlogin', onLogin)
export default router;