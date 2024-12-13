
import { Router } from "express";
import { checkJwt } from "../../middlewares/authMiddleware";
import { applyInstructorController } from "../../controllers/user.controller/applyInstructorController";
import { upload } from "../../middlewares/uploadCVMulter";
import { addCourseToCartController } from "../../controllers/user.controller/addCourseToCartController";
import { getMyCartController } from "../../controllers/user.controller/getMyCartController";
const router = Router();

router.use(checkJwt)
router.post('/apply', upload.single('cv'), applyInstructorController);
router.post('/add-to-cart', addCourseToCartController);

router.get('/my-cart', getMyCartController);
export default router;
