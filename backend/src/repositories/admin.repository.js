import prisma from "../config/prisma.js";

export const getDashboardStats = async () => {

    const [
        totalUsers,
        totalOrders,
        revenue,
        pendingOrders,
        packedOrders,
        outForDeliveryOrders,
        deliveredOrders,
        cancelledOrders
    ] = await Promise.all([
        prisma.user.count(),
        prisma.order.count(),
        prisma.order.aggregate({
            _sum: {
                totalAmountInPaise: true
            },
            where: {
                paymentStatus: "PAID"
            }
        }),
        prisma.order.count({
            where: {
                orderStatus: "PLACED"
            }
        }),
        prisma.order.count({
            where: {
                orderStatus: "PACKED"
            }
        }),
        prisma.order.count({
            where: {
                orderStatus: "OUT_FOR_DELIVERY"
            }
        }),
        prisma.order.count({
            where: {
                orderStatus: "DELIVERED"
            }
        }),
        prisma.order.count({
            where: {
                orderStatus: "CANCELLED"
            }
        })
    ]);

    return {
        totalUsers,
        totalOrders,
        totalRevenue: revenue._sum.totalAmountInPaise ?? 0,
        pendingOrders,
        packedOrders,
        outForDeliveryOrders,
        deliveredOrders,
        cancelledOrders
    };

};

export const getAllOrders = () => {

    return prisma.order.findMany({
        include: {
            orderItems: true
        },
        orderBy: {
            createdAt: "desc"
        }
    });

};

export const getOrderById = (orderId) => {

    return prisma.order.findUnique({
        where: {
            id: orderId
        },
        include: {
            orderItems: true
        }
    });

};

export const updateOrderStatus = (
    orderId,
    orderStatus
) => {

    return prisma.order.update({
        where: {
            id: orderId
        },
        data: {
            orderStatus
        },
        include: {
            orderItems: true
        }
    });

};

export const assignDeliveryPartner = (
    orderId,
    deliveryPartnerId
) => {
    return prisma.order.update({
        where: {
            id: orderId
        },
        data: {
            deliveryPartnerId,
            assignedAt: new Date()
        },
        include: {
            orderItems: true
        }
    });
};