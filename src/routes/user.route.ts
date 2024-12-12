
import { Router } from "express";

import { getUserInfo } from "../controllers/user.controller";
import { applyInstructorController } from "../controllers/user.controller/applyInstructorController";

import { checkJwt } from "../middlewares/authMiddleware";
import { upload } from "../middlewares/uploadCVMulter";

const router = Router();

router.get("/", checkJwt, getUserInfo)

router.post('/apply', checkJwt, upload.single('cv'), applyInstructorController)

// router.post('/change-password', changePassword)
export default router;
