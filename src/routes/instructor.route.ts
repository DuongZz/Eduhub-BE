import { Router } from "express";
import { checkJwt } from "../middlewares/authMiddleware";
import { checkRoleInstructor } from "../middlewares/checkRole";
import { createCourseController } from "../controllers/instructor.controller/createCourseController";
import { updateCourseController } from "../controllers/instructor.controller/updateCourseInfoController";
import { getMyCourseController } from "../controllers/instructor.controller/getMyCourseController";
import { posterUploadMiddleware } from "../middlewares/uploadPosterCourse";
import { getACourseByIdController } from "../controllers/instructor.controller/getACourseByIdController";

const router = Router();
router.use(checkJwt);
router.use(checkRoleInstructor);

router.get('/my-course', getMyCourseController);
router.get('/course/:id', getACourseByIdController)

router.post('/course/create', createCourseController);
router.patch('/course/update/:id', posterUploadMiddleware, updateCourseController);

export default router
