import { Router } from "express";
import { checkJwt } from "../middlewares/authMiddleware";
import { checkRoleAdmin } from "../middlewares/checkRole";
import { getAllApplicationController } from "../controllers/admin.controller/getAllApplicationController";
import { getAApplicationController } from "../controllers/admin.controller/getAApplicationController";
import { changeRoleController } from "../controllers/admin.controller/changeRoleController";
import { getUnapprovedCourseController } from "../controllers/admin.controller/getUnapprovedCourseController";
import { approvedCourseController } from "../controllers/admin.controller/approvedCourseController";
import { getAllInstructorController } from "../controllers/instructor.controller/getAllInstructorController";
import { searchInstructorByNameController } from "../controllers/instructor.controller/searchInstructorByNameController";
import { adminLogin } from "../controllers/admin.controller/loginAdmin";
import { getUserOrderController } from "../controllers/admin.controller/getUserOrderController";

const router = Router();

router.post('/login', adminLogin)
router.use(checkJwt);
router.use(checkRoleAdmin);

router.get('/instructor', getAllInstructorController);
router.get('/search/instructor', searchInstructorByNameController)

router.get('/application/:id', getAApplicationController)
router.get('/application', getAllApplicationController)
router.get('/unapproved-course', getUnapprovedCourseController)
router.get('/user/order', getUserOrderController)

router.post('/change-role/:id', changeRoleController);
router.post('/approve/course/:id', approvedCourseController)

export default router;

