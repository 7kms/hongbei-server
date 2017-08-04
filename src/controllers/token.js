import jwt from 'jsonwebtoken';
import Admin from '../models/admin'
import config from '../../config';
import {print} from '../utils';
export let verify =  async(ctx,next)=>{
    const token = ctx.get('Authorization');
    print(token)
    console.log(token)
    let tokenContent;
    try{
         tokenContent = jwt.verify(token, config.jwt.cert);
         ctx.token = tokenContent
    }catch(err){
        if('TokenExpiredError' === err.name){
            ctx.throw(401,'token expired');
        }
        ctx.throw(401,'invalid token')
    }
    print('token check success')
    await next()
}

export let generate = async(ctx, next)=>{
  let { username,password } = ctx.request.body;
  let user = await Admin.findOne({
    username
  })
  if(user !== null){
    console.log(user)
    // console.log(user.password)
    if(user.authenticate(password)){
      const token = jwt.sign({
        uid: user._id,
        name: user.name,
        exp: Math.floor(Date.now()/1000) + 24 * 60 * 60//1 hours
      }, config.jwt.cert);
      ctx.status = 200;
      ctx.body = {
        success: true,
        data:{
          uid: user._id,
          name: user.name,
          token
        }
      }
    }else{
      ctx.throw(401,'密码错误')
    }
  }else{
    ctx.throw(401,'用户名错误');
  }
  await next()
}