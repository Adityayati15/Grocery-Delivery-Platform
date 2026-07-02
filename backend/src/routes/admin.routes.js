import express from "express";

import * as adminController from "../controllers/admin.controller.js";

import { verifyJWT } from "../middleware/verifyJWT.middleware.js";
import { authorizeRoles } from "../middleware/authorizeRoles.middleware.js";
import { validateOrderStatus } from "../middleware/validateOrderStatus.middleware.js";

import { UserRole } from "@prisma/client";

const router = express.Router();

router.use(verifyJWT);

router.use(
    authorizeRoles(UserRole.ADMIN)
);

router.get(
    "/dashboard",
    adminController.getDashboardStats
);

router.get(
    "/orders",
    adminController.getAllOrders
);

router.get(
    "/orders/:id",
    adminController.getOrderById
);

router.patch(
    "/orders/:id/status",
    validateOrderStatus,
    adminController.updateOrderStatus
);

export default router;