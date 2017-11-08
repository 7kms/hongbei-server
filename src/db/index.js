'use strict';

import mongoose from 'mongoose';

export function connectDatabase(uri) {
  return new Promise((resolve, reject) => {
    mongoose.Promise = Promise;
    mongoose.connect(uri,{
      useMongoClient: true,
      promiseLibrary: Promise
    }).then((db)=>{
      resolve(db)
    },error=>{
        console.log(error)
        reject(error)
    });
  })
}