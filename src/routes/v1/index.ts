import { Router } from 'express';
import auth from './auth.route'
import user from './user.route'
import lesson from './lesson.route';
const router = Router();
router.use('/auth', auth)
router.use('/user', user)
router.use('/lesson', lesson)
export default router;
