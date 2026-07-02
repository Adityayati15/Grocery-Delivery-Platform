import prisma from "../config/prisma.js";

export const createAddress = (
    addressData,
    tx = prisma
) => {

    return tx.address.create({

        data: addressData,

    });

};

export const countAddresses = (
    userId,
    tx = prisma
) => {

    return tx.address.count({

        where: {

            userId,

        },

    });

};

export const findAddressesByUserId = (
    userId,
    tx = prisma
) => {

    return tx.address.findMany({

        where: {

            userId,

        },

        orderBy: [

            {

                isDefault: "desc",

            },

            {

                createdAt: "desc",

            },

        ],

    });

};

export const findAddressById = (
    addressId,
    tx = prisma
) => {

    return tx.address.findUnique({

        where: {

            id: addressId,

        },

    });

};

export const updateAddress = (
    addressId,
    updateData,
    tx = prisma
) => {

    return tx.address.update({

        where: {

            id: addressId,

        },

        data: updateData,

    });

};

export const deleteAddress = (
    addressId,
    tx = prisma
) => {

    return tx.address.delete({

        where: {

            id: addressId,

        },

    });

};

export const clearDefaultAddresses = (
    userId,
    tx = prisma
) => {

    return tx.address.updateMany({

        where: {

            userId,

            isDefault: true,

        },

        data: {

            isDefault: false,

        },

    });

};

export const setDefaultAddress = (
    addressId,
    tx = prisma
) => {

    return tx.address.update({

        where: {

            id: addressId,

        },

        data: {

            isDefault: true,

        },

    });

};