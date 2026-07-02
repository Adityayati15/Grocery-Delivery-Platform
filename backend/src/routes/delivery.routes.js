import express from "express";
import * as deliveryController from "../controllers/delivery.controller.js";
import { verifyJWT } from "../middleware/verifyJWT.middleware.js";
import { authorizeRoles } from "../middleware/authorizeRoles.middleware.js";
import { validateOrderStatus } from "../middleware/validateOrderStatus.middleware.js";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.use(verifyJWT);
router.use(authorizeRoles(UserRole.DELIVERY_PARTNER));

router.get("/", deliveryController.getAssignedOrders);

router.get("/:id", deliveryController.getAssignedOrderById);

router.patch(
    "/:id/status",
    validateOrderStatus,
    deliveryController.updateDeliveryStatus
);

export default router;