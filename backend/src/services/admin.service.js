import { ApiError } from "../utils/ApiError.js";
import * as adminRepository from "../repositories/admin.repository.js";
import { mapOrderResponse } from "../mappers/order.mapper.js";
import { UserRole, OrderStatus } from "@prisma/client";
import * as userRepository from "../repositories/auth.repository.js";

export const getDashboardStats = async () => {
    return await adminRepository.getDashboardStats();
};

export const getOrderById = async (orderId) => {
    const order = await adminRepository.getOrderById(orderId);

    if (!order) {
        throw new ApiError(404, "Order not found.");
    }

    return mapOrderResponse(order);
};

export const updateOrderStatus = async (
    orderId,
    orderStatus
) => {

    const order = await adminRepository.getOrderById(orderId);

    if (!order) {
        throw new ApiError(404, "Order not found.");
    }

    if (
        order.orderStatus === OrderStatus.DELIVERED ||
        order.orderStatus === OrderStatus.CANCELLED
    ) {
        throw new ApiError(
            400,
            "Order status cannot be changed."
        );
    }

    const validTransitions = {
        [OrderStatus.PLACED]: [
            OrderStatus.PACKED,
            OrderStatus.CANCELLED
        ],
        [OrderStatus.PACKED]: [
            OrderStatus.OUT_FOR_DELIVERY,
            OrderStatus.CANCELLED
        ],
        [OrderStatus.OUT_FOR_DELIVERY]: [
            OrderStatus.DELIVERED,
            OrderStatus.CANCELLED
        ]
    };

    if (
        !validTransitions[
            order.orderStatus
        ].includes(orderStatus)
    ) {
        throw new ApiError(
            400,
            "Invalid order status transition."
        );
    }

    const updatedOrder =
        await adminRepository.updateOrderStatus(
            orderId,
            orderStatus
        );

    return mapOrderResponse(updatedOrder);
};

export const assignDeliveryPartner = async (
    orderId,
    deliveryPartnerId
) => {

    const order =
        await adminRepository.getOrderById(
            orderId
        );

    if (!order) {
        throw new ApiError(
            404,
            "Order not found."
        );
    }

    if (
        order.orderStatus !==
        OrderStatus.PACKED
    ) {
        throw new ApiError(
            400,
            "Only packed orders can be assigned."
        );
    }

    if (
        order.deliveryPartnerId
    ) {
        throw new ApiError(
            400,
            "Order is already assigned."
        );
    }

    const partner =
        await userRepository.getUserById(
            deliveryPartnerId
        );

    if (!partner) {
        throw new ApiError(
            404,
            "Delivery partner not found."
        );
    }

    if (
        partner.role !==
        UserRole.DELIVERY_PARTNER
    ) {
        throw new ApiError(
            400,
            "Invalid delivery partner."
        );
    }

    return mapOrderResponse(
        await adminRepository.assignDeliveryPartner(
            orderId,
            deliveryPartnerId
        )
    );

};