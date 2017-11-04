import Router from 'koa-router';

import { notify } from '../controllers/wechatpay';

let router = new Router();

router.post('/pay_notify', notify);

export default router;
