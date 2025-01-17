import { Router } from "express";
import { uploadLessonController } from '../controllers/lesson.controller/uploadLessonController';
import { checkRoleInstructor } from "../middlewares/checkRole";
import { checkJwt } from "../middlewares/authMiddleware";
import { getALessonBySlugController } from "../controllers/lesson.controller/getALessonBySlugController";
import { videoUploadMiddleware } from "../middlewares/uploadVideoMiddleware";
import { uploadLinkYoutubeController } from "../controllers/lesson.controller/uploadLinkYoutubeController";
import { deleteLessonController } from "../controllers/lesson.controller/deleteLessonController";
import { updateLessonController } from "../controllers/lesson.controller/updateLessonController";
const router = Router();
router.get('/:courseSlug/:lessonId', getALessonBySlugController)
router.post('/upload/:courseId', checkJwt, checkRoleInstructor, videoUploadMiddleware, uploadLessonController)
router.post('/uplink/:courseId', checkJwt, checkRoleInstructor, uploadLinkYoutubeController)
router.delete('/delete/:courseId/:lessonId', deleteLessonController)
router.patch('/update/:courseId/:lessonId', updateLessonController)
export default router
