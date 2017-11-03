import 'babel-polyfill';
import app from './src';
import { connectDatabase } from './src/db';

import config from './config';
let {mongo} = config;
const dburl = `mongodb://${mongo.server}:${mongo.port}/${mongo.db}`;
const port = process.env.PORT || 4000;

(async() => {
  try {
    console.log(dburl)
    const info = await connectDatabase(dburl);
    console.log(`Connected to ${info.host}:${info.port}/${info.name}`);
    await app().listen(port,'0.0.0.0');
    console.log(`Server started on port ${port}`);
  } catch (error) {
    console.log('Unable to connect to database');
    process.exit()
  }
})();