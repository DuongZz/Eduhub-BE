import { Router } from "express";
import { checkJwt } from "../middlewares/authMiddleware";
import { checkRoleInstructor } from "../middlewares/checkRole";
import { createCourseController } from "../controllers/instructor.controller/createCourseController";
import { updateCourseController } from "../controllers/instructor.controller/updateCourseInfoController";
import { getMyCourseController } from "../controllers/instructor.controller/getMyCourseController";
import { posterUploadMiddleware } from "../middlewares/uploadPosterCourse";
import { getACourseByIdController } from "../controllers/instructor.controller/getACourseByIdController";
import { createQuizController } from "../controllers/instructor.controller/createQuizController";
import { getLessonAndQuizController } from "../controllers/instructor.controller/getLessonAndQuizController";

const router = Router();
router.use(checkJwt);
router.use(checkRoleInstructor);

router.get('/my-course', getMyCourseController);
router.get('/course/:id', getACourseByIdController)
router.get('/lesson-and-quiz/:courseId', getLessonAndQuizController)

router.post('/create-quiz', createQuizController)
router.post('/course/create', createCourseController);
router.patch('/course/update/:id', posterUploadMiddleware, updateCourseController);

export default router
