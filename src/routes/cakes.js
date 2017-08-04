import Router from 'koa-router';
import { cakeInsert,cakeUpdate,cakeDelete,cakeDetail,cakeList } from '../controllers/cakes'
let router = new Router();
router.get('/',cakeList)
router.post('/insert',cakeInsert)
router.get('/:id',cakeDetail)
router.put('/:id',cakeUpdate)
router.delete('/:id',cakeDelete)
export default router;
