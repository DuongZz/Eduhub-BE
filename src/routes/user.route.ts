
import { Router } from "express";
import { checkJwt } from "../middlewares/authMiddleware";
import { applyInstructorController } from "../controllers/user.controller/applyInstructorController";
import { upload } from "../middlewares/uploadCVMulter";
import { getMyCartController } from "../controllers/user.controller/getMyCartController";
import { getUserInfo } from "../controllers/user.controller";
import { editProfileController } from "../controllers/user.controller/editProfileController";
import { validateInstructorApplication } from "../middlewares/validateInstructorApplication";
import { getMyWishListController } from "../controllers/user.controller/getMyWishListController";
import { toggleCourseInWishListController } from "../controllers/user.controller/addCourseToWishListController";
import { toggleCourseInCartController } from "../controllers/user.controller/addCourseToCartController";
import { getAllInstructorController } from "../controllers/instructor.controller/getAllInstructorController";
import { searchInstructorByNameController } from "../controllers/instructor.controller/searchInstructorByNameController";
import { getCoursePurchasedController } from "../controllers/user.controller/getCoursePurchasedController";
import { getAInstructorInfoController } from "../controllers/user.controller/getInstructorInfoController";
import { getAllQuizzesByCourseController } from "../controllers/quiz.controller/getAllQuizController";
import { getQuizByIdController } from "../controllers/quiz.controller/getQuizByIdController";
import { submitQuizController } from "../controllers/quiz.controller/submitQuizController";

const router = Router();

router.get('/instructor/:id', getAInstructorInfoController)
router.get('/instructor', getAllInstructorController);
router.get('/search/instructor', searchInstructorByNameController)

router.use(checkJwt)
router.post('/apply', validateInstructorApplication, upload.single('cv'), applyInstructorController);
router.post('/cart/:id', toggleCourseInCartController);
router.post('/wishlist/:id', toggleCourseInWishListController);

router.get('/my-cart', getMyCartController);
router.get('/my-wishlist', getMyWishListController);
router.get('/profile', getUserInfo);
router.get('/course-purchased', getCoursePurchasedController);
router.get('/quiz/:courseId', getAllQuizzesByCourseController);
router.get('/:courseId/:quizId', getQuizByIdController)
router.post('/quiz/submit', submitQuizController)

router.patch('/edit-profile', editProfileController);

export default router;
