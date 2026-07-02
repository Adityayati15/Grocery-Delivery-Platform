import { ApiError } from "../utils/ApiError.js";

export const validateVerifyPayment = (
    req,
    res,
    next
) => {

    const {

        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,

    } = req.body;

    const errors = [];

    if (!razorpay_order_id?.trim()) {
        errors.push(
            "Razorpay Order ID is required."
        );
    }

    if (!razorpay_payment_id?.trim()) {
        errors.push(
            "Razorpay Payment ID is required."
        );
    }

    if (!razorpay_signature?.trim()) {
        errors.push(
            "Razorpay Signature is required."
        );
    }

    if (errors.length > 0) {

        throw new ApiError(
            400,
            errors.join(" ")
        );

    }

    next();

};