import { Router } from "express";
import { initiatePaymentMomo, handleMomoIPN } from "../controllers/payment.controller/momoController";
const router = Router();

router.post('/momo', initiatePaymentMomo);
router.post('/momo-check', handleMomoIPN);
export default router;
