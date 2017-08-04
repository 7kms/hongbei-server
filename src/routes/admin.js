import Router from 'koa-router';
import { login , profile } from '../controllers/admin';
import { verify, generate } from '../controllers/token'
let router = new Router();
router.post('/login',login, generate)
router.get('/profile',verify, profile)
export default router;