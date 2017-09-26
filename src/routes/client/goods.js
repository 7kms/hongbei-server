import Router from 'koa-router';
import { cakeDetail,cakeList } from '../../controllers/cakes'
let router = new Router();
router.get('/',cakeList)
router.get('/:id',cakeDetail)
export default router;
