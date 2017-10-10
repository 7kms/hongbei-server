import Router from 'koa-router';
import { cakeInsert,cakeUpdate,cakeDelete,cakeDetail,cakeList } from '../controllers/cakes'
import { verify } from '../controllers/token'
let router = new Router();
router.get('/',cakeList)
router.post('/insert',verify,cakeInsert)
router.get('/:id',cakeDetail)
router.put('/:id',verify,cakeUpdate)
router.delete('/:id',verify,cakeDelete)
export default router;
