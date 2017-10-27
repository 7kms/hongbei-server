import Router from 'koa-router';
import { itemDetail,itemListClient } from '../../controllers/course'
let router = new Router();
router.get('/',itemListClient)
router.get('/:id',itemDetail)
export default router;
