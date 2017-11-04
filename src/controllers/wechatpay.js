
import {parseXml} from '../utils';
// import Order from '../models/client/order';

export const notify = async (ctx)=>{
    console.log(ctx.request.body)
    let obj = parseXml(ctx.request.body)
    console.log(obj);
    // let {appid,mch_id,sign} = obj;
    ctx.body={
        data:obj
    }
}