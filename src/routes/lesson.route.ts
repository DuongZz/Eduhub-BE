import { Router } from "express";
import { uploadLessonController } from '../controllers/lesson.controller/uploadLessonController';
import { checkRoleInstructor } from "../middlewares/checkRole";
import { checkJwt } from "../middlewares/authMiddleware";
import { getALessonBySlugController } from "../controllers/lesson.controller/getALessonBySlugController";
import { videoUploadMiddleware } from "../middlewares/uploadVideoMiddleware";
import { uploadLinkYoutubeController } from "../controllers/lesson.controller/uploadLinkYoutubeController";
const router = Router();
router.get('/:courseSlug/:lessonId', getALessonBySlugController)
router.post('/upload/:courseId', checkJwt, checkRoleInstructor, videoUploadMiddleware, uploadLessonController)
router.post('/uplink/:courseId', checkJwt, checkRoleInstructor, uploadLinkYoutubeController)
export default router
