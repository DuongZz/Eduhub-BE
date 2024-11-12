import { Router } from "express";
import { register, login, forgotPass, logOut } from "../../controllers/auth.controller/index";
import { checkJwt } from "../../middlewares/authMiddleware";

const router = Router();
router.post('/register', register)
router.post('/login', login)
router.post('/log-out', checkJwt, logOut)
router.post('/forgot-password', forgotPass)
export default router
