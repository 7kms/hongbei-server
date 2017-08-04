import Router from 'koa-router';
import { verify, generate } from '../controllers/token'
let router = new Router()
router.post('/',verify, generate)
router.get('/check',verify, async(ctx)=>{
    ctx.status = 200
    ctx.body = {
        success: true
    }
})
export default router;