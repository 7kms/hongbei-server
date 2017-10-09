import fs from 'fs';
import path from 'path';
// import os from 'os';
// import {print} from '../utils';
import uuidv1 from 'uuid/v1';
let storePath = path.resolve(__dirname,'../../uploads/images')
export let upload = async (ctx, next)=>{
  const file = ctx.request.body.files.file;
  let ext = file.type.split('/')[1] || file.name.replace(/^.*\./g,'') || '';
  let pathuuid = uuidv1();
  if(!fs.existsSync(storePath)){
    fs.mkdirSync(storePath)
  }
  const str = `${storePath}/${pathuuid}.${ext}`
  const reader = fs.createReadStream(file.path);
  const stream = fs.createWriteStream(str);
  console.log(str)
  reader.pipe(stream);
  ctx.status = 200;
  ctx.body = {
    path: `/images/${pathuuid}.${ext}`
  }
}
