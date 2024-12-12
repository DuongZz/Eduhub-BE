import { Router } from 'express';

import auth from './auth.route'
import user from './user.route'
import lesson from './/lesson.route';
import course from './course.route'
import zalopay from './zalopay.route'

const router = Router();

router.use('/auth', auth)
router.use('/user', user)
router.use('/lesson', lesson)
router.use('/course', course)
router.use('/payment/zalopay', zalopay)

export default router;
