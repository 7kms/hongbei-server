import Order from '../models/client/order';
import {json2xml} from '../utils';
export const notify = async (ctx)=>{
    console.log('============notify===============')
    let {xml} = ctx.req.body;
    console.log(xml);
    ctx.res.type = 'text/xml';
    const {out_trade_no,sign,total_fee} = xml;

    let order = await Order.findById(out_trade_no);
    console.log(order)
    if(order.sign == sign){
        await Order.update({ _id: out_trade_no}, { $set: {paid: true}});
        ctx.body = json2xml({
            return_code: 'SUCCESS',
            return_msg: 'OK'
        })
    }else{
        ctx.body = json2xml({
            return_code: 'FAIL',
            return_msg: '签名失败'
        })
    }
}