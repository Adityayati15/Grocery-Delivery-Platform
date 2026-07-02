import { ApiError } from "../utils/ApiError.js";

export const validateCreateAddress = (req, res, next) => {
    const {
        name,
        phone,
        addressLine1,
        city,
        state,
        postalCode
    } = req.body;

    const errors = [];

    if (!name?.trim()) errors.push("Name is required.");
    if (!phone?.trim()) errors.push("Phone is required.");
    if (!addressLine1?.trim()) errors.push("Address Line 1 is required.");
    if (!city?.trim()) errors.push("City is required.");
    if (!state?.trim()) errors.push("State is required.");
    if (!postalCode?.trim()) errors.push("Postal Code is required.");

    if (errors.length) {
        throw new ApiError(400, errors.join(" "));
    }

    next();
};