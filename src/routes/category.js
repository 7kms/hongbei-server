import Router from 'koa-router';
import { itemInsert,itemUpdate,itemDelete,itemList } from '../controllers/category';
import { verify } from '../controllers/token';
let router = new Router();
router.get('/', itemList)
router.post('/insert',verify, itemInsert)
router.put('/:id',verify, itemUpdate)
router.delete('/:id',verify, itemDelete)
export default router;
