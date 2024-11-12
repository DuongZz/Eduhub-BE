import { Router } from "express";
import { checkJwt } from "../../middlewares/authMiddleware";
import { checkRoleInstructor } from "../../middlewares/checkRole";
import { createCourseController } from "../../controllers/course.controller/createCourseController";
const router = Router();

router.post('/create', checkJwt, checkRoleInstructor, createCourseController)
export default router;
