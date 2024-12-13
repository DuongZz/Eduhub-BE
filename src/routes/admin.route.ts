import { Router } from "express";
import { checkJwt } from "../middlewares/authMiddleware";
import { checkRoleAdmin } from "../middlewares/checkRole";
import { getAllApplicationController } from "../controllers/admin.controller/getAllApplicationController";
import { getAApplicationController } from "../controllers/admin.controller/getAApplicationController";
import { changeRoleController } from "../controllers/admin.controller/changeRoleController";

const router = Router();
router.use(checkJwt);
router.use(checkRoleAdmin);

router.get('/application/:id', getAApplicationController)
router.get('/application', getAllApplicationController)

router.post('/change-role/:id', changeRoleController)

export default router;
