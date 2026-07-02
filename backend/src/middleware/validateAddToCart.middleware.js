import { ApiError } from "../utils/ApiError.js";

export const validateAddToCart = (req, res, next) => {
    const { productId } = req.body;

    const errors = [];

    if (productId === undefined) {
        errors.push("Product ID is required.");
    } else {
        if (!Number.isInteger(productId))
            errors.push("Product ID must be an integer.");

        if (productId <= 0)
            errors.push("Product ID must be greater than 0.");
    }

    // if (quantity === undefined) {
    //     errors.push("Quantity is required.");
    // } else {
    //     if (!Number.isInteger(quantity))
    //         errors.push("Quantity must be an integer.");

    //     if (quantity <= 0)
    //         errors.push("Quantity must be greater than 0.");
    // }

    if (errors.length > 0) {
        throw new ApiError(
            400,
            "Validation failed.",
            errors
        );
    }

    next();
};