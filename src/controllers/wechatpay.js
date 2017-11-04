export const notify = async (ctx)=>{
    console.log('============notify===============')
    let {xml} = ctx.req.body
    console.log(xml);
    console.log('============notify end===============')
    // let {appid,mch_id,sign} = obj;
    ctx.body={
        data:xml
    }
}