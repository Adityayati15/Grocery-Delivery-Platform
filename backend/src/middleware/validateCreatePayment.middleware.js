import { ApiError } from "../utils/ApiError.js";

export const validateCreatePayment = (
    req,
    res,
    next
    ) => {

        const {

        addressId

        }=req.body;

        if(
            !Number.isInteger(addressId)
        ){

            throw new ApiError(
                400,
                "Valid addressId is required."
            );

        }

    next();

};