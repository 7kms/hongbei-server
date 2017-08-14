import Admin from '../models/admin'
// import {print} from '../utils'
export let login = async (ctx)=>{
    let { username, password } = ctx.request.body;
    let user = await Admin.findOne({username});
    if(user && user.authenticate(password)){
        ctx.session.user = user
        ctx.status = 200;
        ctx.body = {
            msg: 'login success',
            data:{
                user
            }
        }
    }else{
        ctx.status = 401;
        ctx.body = {
            msg: 'username or password is not right'
        }
    }
}
export let loginout = async (ctx)=>{
    ctx.session = null
    ctx.status = 200;
    ctx.body = {
        msg: 'login out'
    }
}
export let profile = async (ctx)=>{
    // let userId = ctx.userId;
    let user = ctx.session.user
    ctx.status = 200;
    ctx.body = {
        data: user
    }
}