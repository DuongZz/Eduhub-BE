import { Router } from "express";
import { checkJwt } from "../middlewares/authMiddleware";
import { createOrderController } from "../controllers/order.controller/createOrderController";
import { getMyOrderController } from "../controllers/order.controller/getMyOrderController";
import { removeOrderController } from "../controllers/order.controller/removeOrderController";
const router = Router();

router.use(checkJwt);

router.post('/create', createOrderController);
router.post('/remove/:id', removeOrderController)

router.get('/my-order', getMyOrderController)
export default router;
