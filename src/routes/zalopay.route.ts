import { Router } from "express";
import { createPayment, handleCallback } from "../controllers/payment.controller/zalopayController";

const router = Router();

router.post("/create-payment", createPayment)
router.post('/callback', handleCallback);

export default router;
