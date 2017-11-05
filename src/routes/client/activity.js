import Router from 'koa-router';
import { itemList } from '../../controllers/client/activity'
import { cakeListClient } from '../../controllers/cakes'
let router = new Router();
router.get('/',itemList,cakeListClient)
export default router;
