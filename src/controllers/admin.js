import Admin from '../models/admin'
import {print} from '../utils'
export let login = async (ctx, next)=>{
    let { username, password } = ctx.request.body;
    print(username,password)
    let schema = await Admin.findOne({username});
    if(!schema){
        await new Admin({username, password}).save();
        await next();
    }
    if(schema.authenticate(password)){
        await next();
        ctx.status = 200;
        ctx.body.msg = 'login success'
    }else{
        ctx.status = 401;
        ctx.body = {
            data: 'login failed'
        }
    }
}
export let profile = async (ctx)=>{
    let userId = ctx.token.uid;
    let user = await Admin.getProfile({_id: userId})
    ctx.status = 200;
    ctx.body = {
        data: user
    }
}