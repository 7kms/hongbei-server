import Router from 'koa-router';
import { orderUpdate, orderDetail, orderList } from '../controllers/orders'
import { verify } from '../controllers/token'
let router = new Router();
router.get('/',orderList)
router.get('/:id',orderDetail)
router.put('/:id',verify,orderUpdate)
export default router;
