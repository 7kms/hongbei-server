import Router from 'koa-router';
import { itemList } from '../../controllers/client/activity'
import { cakeList } from '../../controllers/cakes'
let router = new Router();
router.get('/',itemList,cakeList)
export default router;
