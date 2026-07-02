import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

import * as orderService from "../services/order.service.js";

export const checkout = asyncHandler(async (req, res) => {

    const order = await orderService.checkout(
        req.user.id,
        req.body
    );

    return res.status(201).json(
        new ApiResponse(
            201,
            order,
            "Order placed successfully."
        )
    );

});

export const getMyOrders = asyncHandler(async (req, res) => {

    const orders = await orderService.getMyOrders(
        req.user.id
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            orders,
            "Orders fetched successfully."
        )
    );

});

export const getOrderById = asyncHandler(async (req, res) => {

    const order = await orderService.getOrderById(
        req.user.id,
        Number(req.params.orderId)
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            order,
            "Order fetched successfully."
        )
    );

});