import express from "express";

import * as orderController from "../controllers/order.controller.js";

import { verifyJWT } from "../middleware/verifyJWT.middleware.js";

import { validateCheckoutOrder } from "../middleware/validateCheckoutOrder.middleware.js";

const router = express.Router();

router.post(
    "/checkout",
    verifyJWT,
    validateCheckoutOrder,
    orderController.checkout
);

router.get(
    "/",
    verifyJWT,
    orderController.getMyOrders
);

router.get(
    "/:orderId",
    verifyJWT,
    orderController.getOrderById
);

export default router;