import Order from '../models/client/order';
import {json2xml,verifySign} from '../utils';
import {changeSales} from './cakes';
import {sendSMS} from '../service';
export const notify = async (ctx)=>{
    console.log('============notify===============')
    let {xml} = ctx.req.body;
    console.log(xml);
    ctx.res.type = 'text/xml';
    const {out_trade_no,total_fee} = xml;

    let order = await Order.findById(out_trade_no);
    console.log(order)
    if(verifySign(xml) && order.totalPrice * 100 == total_fee){
        console.log('success')
        await Order.update({ _id: out_trade_no}, { $set: {paid: true}});
        changeSales(order.goods);
        sendSMS(` ￥${order.totalPrice}元 `);
        ctx.body = json2xml({
            return_code: 'SUCCESS',
            return_msg: 'OK'
        })
    }else{
        console.log('签名失败')
        ctx.body = json2xml({
            return_code: 'FAIL',
            return_msg: '签名失败'
        })
    }
    console.log('============ notify end===============')
}