import Router from 'koa-router';
import { getList, insert, remove } from '../../controllers/client/cart'
let router = new Router();
router.get('/',getList)
router.post('/',insert)
router.delete('/',remove)
export default router;
