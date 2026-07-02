import { ApiError } from "../utils/ApiError.js";

export const validateUpdateAddress = (req, res, next) => {
    const {
        name,
        phone,
        addressLine1,
        city,
        state,
        postalCode
    } = req.body;

    if (
        name === undefined &&
        phone === undefined &&
        addressLine1 === undefined &&
        city === undefined &&
        state === undefined &&
        postalCode === undefined &&
        req.body.addressLine2 === undefined
    ) {
        throw new ApiError(
            400,
            "At least one field must be provided."
        );
    }

    next();
};