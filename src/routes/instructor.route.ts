import { Router } from "express";
import { checkJwt } from "../middlewares/authMiddleware";
import { checkRoleInstructor } from "../middlewares/checkRole";
import { createCourseController } from "../controllers/instructor.controller/createCourseController";
import { updateCourseController } from "../controllers/instructor.controller/updateCourseInfoController";
import { getMyCourseController } from "../controllers/instructor.controller/getMyCourseController";
import { posterUploadMiddleware } from "../middlewares/uploadPosterCourse";
import { getACourseByIdController } from "../controllers/instructor.controller/getACourseByIdController";
import { createQuizController } from "../controllers/instructor.controller/createQuizController";
import { getCourseLessonController } from "../controllers/instructor.controller/getCourseLessonController";
import { getCourseQuizController } from "../controllers/instructor.controller/getCourseQuizController";
import { deleteQuizController } from "../controllers/instructor.controller/deleteQuizController";
import { deleteCourseController } from "../controllers/instructor.controller/deleteCourseController";

const router = Router();
router.use(checkJwt);
router.use(checkRoleInstructor);

router.get('/my-course', getMyCourseController);
router.get('/course/:id', getACourseByIdController)
router.get('/lesson/:courseId', getCourseLessonController)
router.get('/quiz/:courseId', getCourseQuizController)

router.post('/create-quiz', createQuizController)
router.post('/course/create', createCourseController);

router.delete('/quiz/:quizId', deleteQuizController);
router.delete('/course/:courseId', deleteCourseController);

router.patch('/course/update/:id', posterUploadMiddleware, updateCourseController);

export default router
