import Router from 'koa-router';

// import {prepay} from '../../controllers/client/pay'
// import {json2xml} from '../../utils';
let router = new Router();

router.post('/',async (ctx)=>{
//    let {_id} = ctx.request.body;
//    console.log(ctx.request.ip,ctx.request.ips,ctx.request.headers)
//    let res = await prepay({
//         openid:'oFm4h0WvnQWB4ocFmdPzsWywlE8c',
//         orderId:'20150806125346',
//         desc:'德胜村',
//         totalPrice:566,
//         spbill_create_ip:ctx.request.ip
//    });
    ctx.response.type = 'xml';
//    ctx.body = json2xml({
//         return_code: 'SUCCESS',
//         return_msg: 'OK'
//    })
   ctx.body=`<xml><return_code><![CDATA[SUCCESS]]></return_code><return_msg><![CDATA[OK]]></return_msg></xml>`
})

export default router;
