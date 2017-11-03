import Router from 'koa-router';

import {prepay} from '../../controllers/client/pay'
let router = new Router();

router.post('/',async (ctx)=>{
   let {_id} = ctx.request.body;
   console.log(ctx.request.ip,ctx.request.ips,ctx.request.headers)
   let res = await prepay({
        openid:'oMoXq0DySBQ947KH-YRKdVmK53-o',
        orderId:'20150806125346',
        desc:'德胜村',
        totalPrice:566,
        spbill_create_ip:ctx.request.ip
   });
   ctx.body = {
       _id,
       res
   }
})

export default router;
