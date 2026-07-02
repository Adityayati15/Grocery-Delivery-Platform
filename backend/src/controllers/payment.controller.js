import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

import * as paymentService from "../services/payment.service.js";

export const createRazorpayOrder = asyncHandler(
    async (req, res) => {

        const paymentOrder =
            await paymentService.createRazorpayOrder(
                req.user.id,
                req.body
            );

        return res.status(200).json(
            new ApiResponse(
                200,
                paymentOrder,
                "Razorpay order created successfully."
            )
        );

    }
);

export const verifyPayment = asyncHandler(
    async (req, res) => {

        const order =
            await paymentService.verifyPayment(
                req.body
            );

        return res.status(201).json(
            new ApiResponse(
                201,
                order,
                "Payment verified and order placed successfully."
            )
        );

    }
);