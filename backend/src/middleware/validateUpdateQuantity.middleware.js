import { ApiError } from "../utils/ApiError.js";

export const validateUpdateQuantity = (req, res, next) => {

    const { quantity } = req.body;

    const errors = [];

    if (quantity === undefined) {
        errors.push("Quantity is required.");
    }

    if (!Number.isInteger(quantity)) {
        errors.push("Quantity must be an integer.");
    }

    if (quantity <= 0) {
        errors.push("Quantity must be greater than 0.");
    }

    if (errors.length > 0) {
        throw new ApiError(
            400,
            "Validation failed.",
            errors
        );
    }

    next();

};