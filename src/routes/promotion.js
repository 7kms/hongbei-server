import Router from 'koa-router';
import { itemInsert,itemUpdate,itemDetail } from '../controllers/promotion';
import { verify } from '../controllers/token';
let router = new Router();
router.get('/', itemDetail)
router.post('/',verify, itemInsert)
router.put('/:id',verify, itemUpdate)
export default router;
