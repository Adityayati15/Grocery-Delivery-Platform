import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import * as adminService from "../services/admin.service.js";

export const getDashboardStats = asyncHandler(async (req, res) => {
    const stats = await adminService.getDashboardStats();

    return res.status(200).json(
        new ApiResponse(
            200,
            stats,
            "Dashboard statistics fetched successfully."
        )
    );
});

export const getAllOrders = asyncHandler(async (req, res) => {
    const orders = await adminService.getAllOrders();

    return res.status(200).json(
        new ApiResponse(
            200,
            orders,
            "Orders fetched successfully."
        )
    );
});

export const getOrderById = asyncHandler(async (req, res) => {
    const order = await adminService.getOrderById(
        Number(req.params.id)
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            order,
            "Order fetched successfully."
        )
    );
});

export const updateOrderStatus = asyncHandler(async (req, res) => {
    const order = await adminService.updateOrderStatus(
        Number(req.params.id),
        req.body.orderStatus
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            order,
            "Order status updated successfully."
        )
    );
});