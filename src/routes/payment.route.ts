import { Router } from "express";
import { initiatePaymentMomo, handleMomoIPN } from "../controllers/payment.controller/momoController";
import { createPaymentWithZalo, zaloCallback } from "../controllers/payment.controller/zaloController";
const router = Router();

router.post('/momo', initiatePaymentMomo);
router.post('/momo-check', handleMomoIPN);

router.post('/zalo', createPaymentWithZalo);
router.post('/zalo-callback', zaloCallback)
export default router;
