import prisma from "../config/prisma.js";

export const findCartByUserId = async(userId)=>{
    return await prisma.cart.findUnique({
        where: {
            userId,
        }
    })
}

export const createCart = async (data) => {
    return await prisma.cart.create({
        data,
    });
};

export const findCartItem = async (cartId, productId) => {
    return await prisma.cartItem.findUnique({
        where: {
            cartId_productId: {
                cartId,
                productId,
            },
        },
    });
};

export const createCartItem = async (data) => {
    return await prisma.cartItem.create({
        data,
    });
};

export const updateCartItemQuantity = async (
    cartItemId,
    quantity
) => {
    return await prisma.cartItem.update({
        where: {
            id: cartItemId,
        },
        data: {
            quantity,
        },
    });
};

export const getCartWithItems = async (
    cartId,
    db = prisma
) => {
    return await db.cart.findUnique({
        where: {
            id: cartId,
        },
        include: {
            cartItems: {
                include: {
                    product: true,
                },
            },
        },
    });
};

export const deleteCartItem = async (cartItemId) => {
    return await prisma.cartItem.delete({
        where: {
            id: cartItemId,
        },
    });
};

export const clearCart = async (
    cartId,
    db = prisma
) => {
    return await db.cartItem.deleteMany({
        where: {
            cartId,
        },
    });
};

export const findCartItemById = async (cartItemId) => {
    return await prisma.cartItem.findUnique({
        where: {
            id: cartItemId,
        },
    });
};