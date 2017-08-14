import jwt from 'jsonwebtoken';
import Admin from '../models/admin'
import config from '../../config';
// import {print} from '../utils';

export let verify =  async(ctx,next)=>{
  const user = ctx.session.user;
  if(user){
    await next()
  }else{
    ctx.status = 401;
    ctx.body={
      msg:'not nogin'
    }
  }
}


// export let verify =  async(ctx,next)=>{
//     const token = ctx.get('Authorization');
//     let tokenContent;
//     try{
//         tokenContent = jwt.verify(token, config.jwt.cert);
//         ctx.token = tokenContent
//     }catch(err){
//         ctx.status = 401;
//         ctx.body={
//           msg:'invalid token'
//         }
//         if('TokenExpiredError' === err.name){
//           ctx.body.msg = 'token expired'
//         }
//     }
//     await next()
// }

export let generate = async(ctx, next)=>{
  let { username,password } = ctx.request.body;
  let user = await Admin.findOne({
    username
  })
  if(user !== null){
    if(user.authenticate(password)){
      const token = jwt.sign({
        uid: user._id,
        name: user.username,
        exp: Math.floor(Date.now()/1000) + 24 * 60 * 60
      }, config.jwt.cert);
      ctx.status = 200;
      ctx.body = {
        success: true,
        data:{
          user,
          token
        }
      }
      ctx.session.user = user._id;
    }else{
      ctx.throw(401,'密码错误')
    }
  }else{
    ctx.throw(401,'用户名错误');
  }
  await next()
}