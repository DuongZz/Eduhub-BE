import { Router } from "express";
import { uploadLessonController } from '../../controllers/lesson.controller/uploadLessonController';
import { checkRoleInstructor } from "../../middlewares/checkRole";
import { checkJwt } from "../../middlewares/authMiddleware";
import { getALessonBySlugController } from "../../controllers/lesson.controller/getALessonBySlugController";
import { videoUploadMiddleware } from "../../middlewares/uploadVideoMiddleware";
const router = Router();
router.get('/:courseSlug/:lessonSlug', getALessonBySlugController)
router.post('/upload', checkJwt, checkRoleInstructor, videoUploadMiddleware, uploadLessonController)

export default router
