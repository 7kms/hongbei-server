import jwt from 'jsonwebtoken';
import config from '../../../config';
// import {print} from '../../utils/index'
// import {print} from '../utils';

export let checkToken =  async(ctx,next)=>{
  let { token } = ctx.header;
  if(token){
    try{
      let {_id} = jwt.verify(token, config.jwt.cert);
      ctx._id = _id
    }catch(e){
      console.log(e)
    }
  }
  await next();
}

export let generateToken =  async(ctx)=>{
  let {_id} = ctx;
  const token = jwt.sign({
      _id,
      exp: Math.floor(Date.now()/1000) + 24* 60* 60
  }, config.jwt.cert);
  ctx.set('token',token)
}


export let needLogin =  async(ctx,next)=>{
  let {_id} = ctx;
  if(!_id){
    ctx.status = 401
    ctx.body = {
      code: 401,
      msg: 'Authorization failed'
    }
  }else{
    await next()
  }
}

