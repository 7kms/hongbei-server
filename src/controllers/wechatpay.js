import Order from '../models/client/order';
import {verifySign} from '../utils';
import {changeSales} from './cakes';
import {sendSMS} from '../service';
export const notify = async (ctx)=>{
    console.log('============notify===============')
    let {xml} = ctx.req.body;
    ctx.response.type = 'xml';
    const {out_trade_no,total_fee} = xml;

    let order = await Order.findById(out_trade_no);
    console.log(order)
    if(order.paid){
        ctx.body=`<xml><return_code><![CDATA[SUCCESS]]></return_code><return_msg><![CDATA[OK]]></return_msg></xml>`
    }else{
        if(verifySign(xml) && order.totalPrice * 100 == total_fee){
            console.log('success')
            await Order.update({ _id: out_trade_no}, { $set: {paid: true}});
            changeSales(order.goods);
            ctx.body=`<xml><return_code><![CDATA[SUCCESS]]></return_code><return_msg><![CDATA[OK]]></return_msg></xml>`
            sendSMS(` ￥${order.totalPrice}元 `);
        }else{
            console.log('签名失败')
            ctx.body=`<xml><return_code><![CDATA[FAIL]]></return_code><return_msg><![CDATA[签名失败]]></return_msg></xml>`
        }
    }
    console.log(ctx.body)
    console.log('============ notify end===============')
}