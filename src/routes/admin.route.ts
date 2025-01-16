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
import { getAllUserOrderController } from "../controllers/admin.controller/getAllUserOrderController";
import { cancelOrderController } from "../controllers/admin.controller/cancelOrderController";
import { getAllUserController } from "../controllers/admin.controller/getAllUserController";
import { getUserByRoleController } from "../controllers/admin.controller/getUserByRoleController";
import { getAllCommentAdminController } from "../controllers/admin.controller/getAllCommentController";
import { deleteCommentAdminController } from "../controllers/admin.controller/deleteCommentAdminController";
import { getAllCourseAdminController } from "../controllers/admin.controller/getAllCourseAdminController";
import { getACourseByIdController } from "../controllers/admin.controller/getACourseByIdAdminController";

const router = Router();

router.post('/login', adminLogin)
router.use(checkJwt);
router.use(checkRoleAdmin);

router.get('/instructor', getAllInstructorController);
router.get('/search/instructor', searchInstructorByNameController)

router.get('/application/:id', getAApplicationController)
router.get('/application', getAllApplicationController)
router.get('/unapproved-course', getUnapprovedCourseController)
router.get('/user/order', getUserOrderController);
router.get('/user/all-order', getAllUserOrderController)
router.get('/user/all-account', getAllUserController)
router.get('/user/account', getUserByRoleController)
router.get('/comment/all', getAllCommentAdminController)
router.get('/course/all', getAllCourseAdminController)
router.get('/course/info/:id', getACourseByIdController)

router.post('/change-role/:id', changeRoleController);
router.post('/approve/course/:id', approvedCourseController);
router.post('/order/cancel/:orderId', cancelOrderController)

router.delete('/comment/delete/:commentId', deleteCommentAdminController)

export default router;

