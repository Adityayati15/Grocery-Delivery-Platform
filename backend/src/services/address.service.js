import prisma from "../config/prisma.js";
import { ApiError } from "../utils/ApiError.js";
import * as addressRepository from "../repositories/address.repository.js";
import { mapAddressResponse } from "../mappers/address.mapper.js";

export const createAddress = async (userId, addressData) => {
    const addressCount = await addressRepository.countAddresses(userId);

    if (addressCount === 0) {
        addressData.isDefault = true;
    }

    const address = await addressRepository.createAddress({
        ...addressData,
        userId
    });

    return mapAddressResponse(address);
};

export const getMyAddresses = async (userId) => {
    const addresses = await addressRepository.findAddressesByUserId(userId);
    return addresses.map(mapAddressResponse);
};

export const getAddressById = async (userId, addressId) => {
    const address = await addressRepository.findAddressById(addressId);

    if (!address) {
        throw new ApiError(404, "Address not found.");
    }

    if (address.userId !== userId) {
        throw new ApiError(403, "Unauthorized.");
    }

    return mapAddressResponse(address);
};

export const updateAddress = async (
    userId,
    addressId,
    updateData
) => {

    const address = await addressRepository.findAddressById(addressId);

    if (!address) {
        throw new ApiError(404, "Address not found.");
    }

    if (address.userId !== userId) {
        throw new ApiError(403, "Unauthorized.");
    }

    const updatedAddress =
        await addressRepository.updateAddress(
            addressId,
            updateData
        );

    return mapAddressResponse(updatedAddress);
};

export const setDefaultAddress = async (
    userId,
    addressId
) => {

    const address =
        await addressRepository.findAddressById(addressId);

    if (!address) {
        throw new ApiError(404, "Address not found.");
    }

    if (address.userId !== userId) {
        throw new ApiError(403, "Unauthorized.");
    }

    await prisma.$transaction(async (tx) => {

        await addressRepository.clearDefaultAddresses(
            userId,
            tx
        );

        await addressRepository.setDefaultAddress(
            addressId,
            tx
        );

    });

    const updatedAddress =
        await addressRepository.findAddressById(addressId);

    return mapAddressResponse(updatedAddress);
};

export const deleteAddress = async (
    userId,
    addressId
) => {

    const address =
        await addressRepository.findAddressById(addressId);

    if (!address) {
        throw new ApiError(404, "Address not found.");
    }

    if (address.userId !== userId) {
        throw new ApiError(403, "Unauthorized.");
    }

    await prisma.$transaction(async (tx) => {

        await addressRepository.deleteAddress(
            addressId,
            tx
        );

        if (address.isDefault) {

            const addresses =
                await addressRepository.findAddressesByUserId(
                    userId,
                    tx
                );

            if (addresses.length > 0) {

                await addressRepository.setDefaultAddress(
                    addresses[0].id,
                    tx
                );

            }

        }

    });

};