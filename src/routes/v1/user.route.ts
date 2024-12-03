
import { Router } from "express";
import { checkJwt } from "../../middlewares/authMiddleware";
import { applyInstructorController } from "../../controllers/user.controller/applyInstructorController";
const router = Router();

router.post('/apply', checkJwt, applyInstructorController)
export default router;
