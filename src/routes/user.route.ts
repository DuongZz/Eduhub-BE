
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

const router = Router();

router.use(checkJwt)
router.post('/apply', validateInstructorApplication, upload.single('cv'), applyInstructorController);
router.post('/cart/:id', toggleCourseInCartController);
router.post('/wishlist/:id', toggleCourseInWishListController);

router.get('/my-cart', getMyCartController);
router.get('/my-wishlist', getMyWishListController)
router.get("/", getUserInfo)
router.patch('/edit-profile', editProfileController);

export default router;
