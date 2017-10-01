import Router from 'koa-router';
import { getList, insert } from '../../controllers/feed'
let router = new Router();
router.get('/',getList)
router.post('/',insert)
export default router;
