import { Router } from "express";
import { uploadLessonController } from '../../controllers/lesson.controller/uploadLessonController';
import { checkRoleInstructor } from "../../middlewares/checkRole";
import { checkJwt } from "../../middlewares/authMiddleware";
import { uploadMiddleware } from "../../middlewares/uploadMiddleware";
import { getALessonBySlugController } from "../../controllers/lesson.controller/getALessonBySlugController";
const router = Router();
router.get('/:courseSlug/:lessonSlug', getALessonBySlugController)
router.post('/upload', checkJwt, checkRoleInstructor, uploadMiddleware, uploadLessonController)

export default router
