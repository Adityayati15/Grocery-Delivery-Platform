import { ApiError } from "../utils/ApiError.js";

export const validateCheckoutOrder = (
    req,
    res,
    next
) => {

    const {
        addressId,
        paymentMethod
    } = req.body;

    const errors = [];

    if (!Number.isInteger(addressId)) {
        errors.push(
            "Valid addressId is required."
        );
    }

    if (
        paymentMethod !== "COD"
    ) {
        errors.push(
            "Invalid payment method."
        );
    }

    if (errors.length) {
        throw new ApiError(
            400,
            errors.join(" ")
        );
    }

    next();

};