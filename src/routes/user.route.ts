
import { Router } from "express";
import { checkJwt } from "../middlewares/authMiddleware";
import { applyInstructorController } from "../controllers/user.controller/applyInstructorController";
import { upload } from "../middlewares/uploadCVMulter";
import { addCourseToCartController } from "../controllers/user.controller/addCourseToCartController";
import { getMyCartController } from "../controllers/user.controller/getMyCartController";
import { getUserInfo } from "../controllers/user.controller";
import { editProfileController } from "../controllers/user.controller/editProfileController";
import { validateInstructorApplication } from "../middlewares/validateInstructorApplication";

const router = Router();

router.use(checkJwt)
router.post('/apply', validateInstructorApplication, upload.single('cv'), applyInstructorController);
router.post('/add-to-cart', addCourseToCartController);

router.get('/my-cart', getMyCartController);
router.get("/", getUserInfo)
router.patch('/edit-profile', editProfileController);


export default router;
