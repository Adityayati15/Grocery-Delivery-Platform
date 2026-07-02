import express from "express";

import * as paymentController from "../controllers/payment.controller.js";

import { verifyJWT } from "../middleware/verifyJWT.middleware.js";

import { validateCreatePayment } from "../middleware/validateCreatePayment.middleware.js";
import { validateVerifyPayment } from "../middleware/validateVerifyPayment.middleware.js";

const router = express.Router();

router.post(
    "/create-order",
    verifyJWT,
    validateCreatePayment,
    paymentController.createRazorpayOrder
);

router.post(
    "/verify",
    verifyJWT,
    validateVerifyPayment,
    paymentController.verifyPayment
);

export default router;