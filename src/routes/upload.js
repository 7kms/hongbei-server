import Router from 'koa-router';
import { upload } from '../controllers/upload';
let router = new Router();
router.post('/', upload)
export default router;