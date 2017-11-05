import Router from 'koa-router';
import { cakeDetail,cakeListClient } from '../../controllers/cakes'
let router = new Router();
router.get('/',cakeListClient)
router.get('/:id',cakeDetail)
export default router;
