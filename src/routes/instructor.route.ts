import { Router } from "express";
import { checkJwt } from "../middlewares/authMiddleware";
import { checkRoleInstructor } from "../middlewares/checkRole";
import { createCourseController } from "../controllers/instructor.controller/createCourseController";
import { updateCourseController } from "../controllers/instructor.controller/updateCourseInfoController";

const router = Router();
router.use(checkJwt);
router.use(checkRoleInstructor);

router.post('/course/create', createCourseController);
router.patch('/course/update/:id', updateCourseController)

export default router
