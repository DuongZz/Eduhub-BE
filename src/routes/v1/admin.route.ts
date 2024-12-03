import { Router } from "express";
import { checkJwt } from "../../middlewares/authMiddleware";
import { checkRoleAdmin } from "../../middlewares/checkRole";

const router = Router();
router.use(checkJwt);
router.use(checkRoleAdmin)

export default router;
