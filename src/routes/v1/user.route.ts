
import { Router } from "express";
import { checkJwt } from "../../middlewares/authMiddleware";
import { applyInstructorController } from "../../controllers/user.controller/applyInstructorController";
import { upload } from "../../middlewares/uploadCVMulter";
const router = Router();

router.post('/apply', checkJwt, upload.single('cv'), applyInstructorController)
export default router;
