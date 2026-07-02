import { ApiError } from "../utils/ApiError.js";
import { OrderStatus } from "@prisma/client";

export const validateOrderStatus = (req, res, next) => {
    const { orderStatus } = req.body;

    if (!orderStatus) {
        throw new ApiError(
            400,
            "Order status is required."
        );
    }

    const validStatuses = Object.values(OrderStatus);

    if (!validStatuses.includes(orderStatus)) {
        throw new ApiError(
            400,
            "Invalid order status."
        );
    }

    next();
};