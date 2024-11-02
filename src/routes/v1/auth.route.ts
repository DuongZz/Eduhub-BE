import { Router } from "express";
import { register, login, logOut } from "../../controllers/auth.controller.ts";
import { checkJwt } from "../../middlewares/authMiddleware";

const router = Router();
router.post('/register', register)
router.post('/login', login)
router.post('/log-out', logOut)
export default router
