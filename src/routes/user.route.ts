
import { Router } from "express";
import { checkJwt } from "../middlewares/authMiddleware";
import { applyInstructorController } from "../controllers/user.controller/applyInstructorController";
import { upload } from "../middlewares/uploadCVMulter";
import { addCourseToCartController } from "../controllers/user.controller/addCourseToCartController";
import { getMyCartController } from "../controllers/user.controller/getMyCartController";
import { getUserInfo } from "../controllers/user.controller";

const router = Router();

router.use(checkJwt)
router.post('/apply', upload.single('cv'), applyInstructorController);
router.post('/add-to-cart', addCourseToCartController);

router.get('/my-cart', getMyCartController);
router.get("/", getUserInfo)

export default router;
