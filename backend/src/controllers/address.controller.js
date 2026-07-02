import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import * as addressService from "../services/address.service.js";

export const createAddress = asyncHandler(async (req, res) => {
    const address = await addressService.createAddress(
        req.user.id,
        req.body
    );

    return res.status(201).json(
        new ApiResponse(
            201,
            address,
            "Address created successfully."
        )
    );
});

export const getMyAddresses = asyncHandler(async (req, res) => {
    const addresses = await addressService.getMyAddresses(req.user.id);

    return res.status(200).json(
        new ApiResponse(
            200,
            addresses,
            "Addresses fetched successfully."
        )
    );
});

export const getAddressById = asyncHandler(async (req, res) => {
    const address = await addressService.getAddressById(
        req.user.id,
        Number(req.params.id)
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            address,
            "Address fetched successfully."
        )
    );
});

export const updateAddress = asyncHandler(async (req, res) => {
    const address = await addressService.updateAddress(
        req.user.id,
        Number(req.params.id),
        req.body
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            address,
            "Address updated successfully."
        )
    );
});

export const deleteAddress = asyncHandler(async (req, res) => {
    await addressService.deleteAddress(
        req.user.id,
        Number(req.params.id)
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            null,
            "Address deleted successfully."
        )
    );
});

export const setDefaultAddress = asyncHandler(async (req, res) => {
    const address = await addressService.setDefaultAddress(
        req.user.id,
        Number(req.params.id)
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            address,
            "Default address updated successfully."
        )
    );
});