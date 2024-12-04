
import { Router } from "express";

import { getUserInfo } from "../controllers/user.controller";

import { checkJwt } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", checkJwt, getUserInfo)

// router.post('/change-password', changePassword)
export default router;
