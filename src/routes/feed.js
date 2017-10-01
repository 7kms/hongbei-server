import Router from 'koa-router';
import { getList } from '../controllers/feed'
let router = new Router();
router.get('/',getList)
export default router;
