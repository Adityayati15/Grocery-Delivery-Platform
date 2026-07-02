import prisma from "../config/prisma.js";

/*
|--------------------------------------------------------------------------
| Create Order
|--------------------------------------------------------------------------
*/

export const createOrder = async (
    data,
    db = prisma
) => {
    return await db.order.create({
        data,
    });
};

/*
|--------------------------------------------------------------------------
| Create Multiple Order Items
|--------------------------------------------------------------------------
*/

export const createOrderItems = async (
    data,
    db = prisma
) => {
    return await db.orderItem.createMany({
        data,
    });
};

/*
|--------------------------------------------------------------------------
| Get Complete Order
|--------------------------------------------------------------------------
*/

export const getOrderWithItems = async (
    orderId,
    db = prisma
) => {
    return await db.order.findUnique({
        where: {
            id: orderId,
        },

        include: {
            orderItems: true,
        },
    });
};

/*
|--------------------------------------------------------------------------
| Get User Orders
|--------------------------------------------------------------------------
*/

export const getOrdersByUserId = async (
    userId,
    db = prisma
) => {
    return await db.order.findMany({
        where: {
            userId,
        },

        include: {
            orderItems: true,
        },

        orderBy: {
            createdAt: "desc",
        },
    });
};

/*
|--------------------------------------------------------------------------
| Update Order Status
|--------------------------------------------------------------------------
*/

export const updateOrderStatus = async (
    orderId,
    orderStatus,
    db = prisma
) => {
    return await db.order.update({
        where: {
            id: orderId,
        },

        data: {
            orderStatus,
        },
    });
};