import { Router } from 'express';
import auth from './auth.route'
import user from './user.route'
import lesson from './lesson.route';
import course from './course.route'
import admin from './admin.route'
import instructor from './instructor.route';
import order from './order.route'
import payment from './payment.route'
const router = Router();
router.use('/auth', auth)
router.use('/user', user)
router.use('/lesson', lesson)
router.use('/course', course)
router.use('/admin', admin)
router.use('/instructor', instructor)
router.use('/order', order)
router.use('/payment', payment)
export default router;
