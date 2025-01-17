import { Router } from "express";
import { checkJwt } from "../middlewares/authMiddleware";
import { createOrderController } from "../controllers/order.controller/createOrderController";
import { getMyOrderController } from "../controllers/order.controller/getMyOrderController";
import { removeOrderController } from "../controllers/order.controller/removeOrderController";
import { getOrderById } from "../controllers/order.controller/getOrderById";

const router = Router();

router.use(checkJwt);

router.post('/create', createOrderController);
router.post('/remove/:id', removeOrderController)

router.get('/my-order', getMyOrderController)
router.get('/:id', getOrderById)

export default router;
