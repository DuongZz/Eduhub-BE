
import { Router } from "express";
import { checkJwt } from "../../middlewares/authMiddleware";
import { applyInstructorController } from "../../controllers/user.controller/applyInstructorController";
import { cvUploadMiddleware } from "../../middlewares/uploadCVMiddleware";
const router = Router();

router.post('/apply', checkJwt, cvUploadMiddleware, applyInstructorController)
export default router;
