import { ApiError } from "../utils/ApiError.js";
import * as deliveryRepository from "../repositories/delivery.repository.js";
import { mapOrderResponse } from "../mappers/order.mapper.js";
import { OrderStatus } from "@prisma/client";

export const getAssignedOrders = async (
    deliveryPartnerId
) => {

    const orders =
        await deliveryRepository.getAssignedOrders(
            deliveryPartnerId
        );

    return orders.map(mapOrderResponse);

};

export const getAssignedOrderById = async (
    deliveryPartnerId,
    orderId
) => {

    const order =
        await deliveryRepository.getAssignedOrderById(
            orderId
        );

    if (!order) {
        throw new ApiError(
            404,
            "Order not found."
        );
    }

    if (
        order.deliveryPartnerId !==
        deliveryPartnerId
    ) {
        throw new ApiError(
            403,
            "Unauthorized."
        );
    }

    return mapOrderResponse(order);

};

export const updateDeliveryStatus = async (
    deliveryPartnerId,
    orderId,
    orderStatus
) => {

    const order =
        await deliveryRepository.getAssignedOrderById(
            orderId
        );

    if (!order) {
        throw new ApiError(
            404,
            "Order not found."
        );
    }

    if (
        order.deliveryPartnerId !==
        deliveryPartnerId
    ) {
        throw new ApiError(
            403,
            "Unauthorized."
        );
    }

    const validTransitions = {

        [OrderStatus.PACKED]: [
            OrderStatus.OUT_FOR_DELIVERY
        ],

        [OrderStatus.OUT_FOR_DELIVERY]: [
            OrderStatus.DELIVERED
        ]

    };

    if (
        !validTransitions[
            order.orderStatus
        ]?.includes(orderStatus)
    ) {
        throw new ApiError(
            400,
            "Invalid order status transition."
        );
    }

    const updatedOrder =
        await deliveryRepository.updateOrderStatus(
            orderId,
            orderStatus
        );

    return mapOrderResponse(
        updatedOrder
    );

};