import Router from 'koa-router';
import { itemList } from '../../controllers/category'
let router = new Router();
router.get('/',itemList)
export default router;
