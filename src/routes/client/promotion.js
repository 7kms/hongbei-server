import Router from 'koa-router';
import { itemDetail } from '../../controllers/promotion'
let router = new Router();
router.get('/',itemDetail)
export default router;
