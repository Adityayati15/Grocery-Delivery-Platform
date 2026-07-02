import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import * as deliveryService from "../services/delivery.service.js";

export const getAssignedOrders = asyncHandler(async (req, res) => {
    const orders = await deliveryService.getAssignedOrders(req.user.id);

    return res.status(200).json(
        new ApiResponse(200, orders, "Assigned orders fetched successfully.")
    );
});

export const getAssignedOrderById = asyncHandler(async (req, res) => {
    const order = await deliveryService.getAssignedOrderById(
        req.user.id,
        Number(req.params.id)
    );

    return res.status(200).json(
        new ApiResponse(200, order, "Order fetched successfully.")
    );
});

export const updateDeliveryStatus = asyncHandler(async (req, res) => {
    const order = await deliveryService.updateDeliveryStatus(
        req.user.id,
        Number(req.params.id),
        req.body.orderStatus
    );

    return res.status(200).json(
        new ApiResponse(200, order, "Order updated successfully.")
    );
});