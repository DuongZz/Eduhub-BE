import { Router } from "express";

import { checkJwt } from "../middlewares/authMiddleware";
import { checkRoleInstructor } from "../middlewares/checkRole";
import { createCourseController } from "../controllers/instructor.controller/createCourseController";
import { getAllCourseController } from "../controllers/course.controller/getAllCourseController";
import { getACourseController } from "../controllers/course.controller/getACourseController";
import { getACourseBySlugController } from "../controllers/course.controller/getACourseBySlugController";
import { getCourseByOptionsController } from "../controllers/course.controller/getCourseByOptionsController";
import { getACourseByCategoryController } from "../controllers/course.controller/getCourseByCategoryController";
import { getCoursesBySubCategoryController } from "../controllers/course.controller/getACourseBySubCateController";
import { searchCourseByNameController } from "../controllers/course.controller/searchCourseByNameController";
import { searchCourseController } from "../controllers/course.controller/searchCourseController";

const router = Router();
router.get('/searching', searchCourseController)
router.get('/search', searchCourseByNameController)
router.get('/by-option', getCourseByOptionsController)
router.get('/subCategories/:slug', getCoursesBySubCategoryController)
router.get('/categories/:slug', getACourseByCategoryController)
router.get('/:slug', getACourseBySlugController)
router.get('/:id', getACourseController)
router.get('/', getAllCourseController)

router.post('/create', checkJwt, checkRoleInstructor, createCourseController)

export default router;
