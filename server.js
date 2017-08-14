import 'babel-polyfill';
import app from './src';
import { connectDatabase } from './src/db';
import { development, production } from './src/db/config';

const port = process.env.PORT || 4000;
const databaseConfig = (process.env.NODE_ENV == 'production' ) ? production : development;

(async() => {
  try {
    const info = await connectDatabase(databaseConfig);
    console.log(`Connected to ${info.host}:${info.port}/${info.name}`);
    await app().listen(port);
    console.log(`Server started on port ${port}`);
  } catch (error) {
    console.error('Unable to connect to database');
  }
})();