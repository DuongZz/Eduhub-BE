import { Router } from "express";

import { register, login, resetPasswordController, logOut } from "../controllers/auth.controller/index";

import { checkJwt } from "../middlewares/authMiddleware";
import { sendOTPController, verifyOTPController } from "../utils/sendOTPController";

const router = Router();

router.post('/register', register)
router.post('/login', login)
router.post('/log-out', checkJwt, logOut)

// Forgot password
router.post('/send-otp', sendOTPController)
router.post('/verify-otp', verifyOTPController)
router.post('/reset-password', resetPasswordController)

export default router
