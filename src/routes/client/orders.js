import Router from 'koa-router';
import { getList, insert, remove, getDetail,repay } from '../../controllers/client/order'
let router = new Router();
router.get('/',getList)
router.get('/:id',getDetail)
router.post('/',insert)
router.post('/payagain/:_id',repay)
router.post('/remove',remove)
export default router;
