import { Router } from "express";
import { checkJwt } from "../../middlewares/authMiddleware";
import { checkRoleInstructor } from "../../middlewares/checkRole";
import { createCourseController } from "../../controllers/course.controller/createCourseController";
import { getAllCourseController } from "../../controllers/course.controller/getAllCourseController";
import { getACourseController } from "../../controllers/course.controller/getACourseController";
import { getACourseBySlugController } from "../../controllers/course.controller/getACourseBySlugController";
const router = Router();

router.get('/:slug', getACourseBySlugController)
router.get('/:id', getACourseController)
router.get('/', getAllCourseController);

router.post('/create', checkJwt, checkRoleInstructor, createCourseController)

export default router;
