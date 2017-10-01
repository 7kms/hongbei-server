import Router from 'koa-router';
import { itemDetail,itemList } from '../../controllers/course'
let router = new Router();
router.get('/',itemList)
router.get('/:id',itemDetail)
export default router;
