import Router from 'koa-router';
import { login ,loginout, profile } from '../controllers/admin';
import { verify, generate } from '../controllers/token'
import { upload } from '../controllers/upload';
let router = new Router();
router.post('/login',login, generate)
router.post('/loginout',verify, loginout)
router.get('/profile',verify, profile)
router.post('/upload',verify, upload)
export default router;