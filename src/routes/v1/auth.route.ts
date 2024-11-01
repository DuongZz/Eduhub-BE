import { Router } from "express";
import { register } from "../../controllers/auth.controller.ts";
import { checkJwt } from "../../middlewares/authMiddleware";

const router = Router();
router.post('/register', register)
export default router
