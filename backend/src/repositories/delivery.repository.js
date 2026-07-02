import prisma from "../config/prisma.js";

export const getAssignedOrders = (
    deliveryPartnerId,
    tx = prisma
) => {
    return tx.order.findMany({
        where: {
            deliveryPartnerId
        },
        include: {
            orderItems: true,
            user: true
        },
        orderBy: {
            createdAt: "desc"
        }
    });
};

export const getAssignedOrderById = (
    orderId,
    tx = prisma
) => {
    return tx.order.findUnique({
        where: {
            id: orderId
        },
        include: {
            orderItems: true,
            user: true
        }
    });
};

export const updateOrderStatus = (
    orderId,
    orderStatus,
    tx = prisma
) => {
    return tx.order.update({
        where: {
            id: orderId
        },
        data: {
            orderStatus
        },
        include: {
            orderItems: true,
            user: true
        }
    });
};