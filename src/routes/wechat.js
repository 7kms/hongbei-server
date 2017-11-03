import Router from 'koa-router';

import {prepay} from '../controllers/client/pay'
let router = new Router();

router.post('/pay_notify',async (ctx)=>{
    ctx.body={
        success:1
    }
})

export default router;
