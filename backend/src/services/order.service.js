import prisma from "../config/prisma.js";

import { ApiError } from "../utils/ApiError.js";

import * as cartRepository from "../repositories/cart.repository.js";
import * as orderRepository from "../repositories/order.repository.js";
import * as productRepository from "../repositories/product.repository.js";
import * as addressRepository from "../repositories/address.repository.js";

import { mapOrderResponse } from "../mappers/order.mapper.js";

import {
    PaymentMethod,
    PaymentStatus,
} from "@prisma/client";

export const validateCart = async (userId) => {

    const userCart =
        await cartRepository.findCartByUserId(
            userId
        );

    if (!userCart) {
        throw new ApiError(
            404,
            "Cart not found."
        );
    }

    const cart =
        await cartRepository.getCartWithItems(
            userCart.id
        );

    if (cart.cartItems.length === 0) {
        throw new ApiError(
            400,
            "Cart is empty."
        );
    }

    let totalAmountInPaise = 0;

    for (const cartItem of cart.cartItems) {

        const product = cartItem.product;

        if (!product.isActive) {
            throw new ApiError(
                400,
                `${product.name} is unavailable.`
            );
        }

        if (cartItem.quantity > product.stock) {
            throw new ApiError(
                400,
                `Insufficient stock for ${product.name}.`
            );
        }

        totalAmountInPaise +=
            product.priceInPaise *
            cartItem.quantity;
    }

    return {
        cart,
        totalAmountInPaise,
    };

};

export const createOrderFromCart = async (

    userId,

    cart,

    totalAmountInPaise,

    orderData

) => {

    const order =
        await prisma.$transaction(
            async (tx) => {

                const order =
                    await orderRepository.createOrder(
                        {
                            userId,

                            paymentMethod:
                                orderData.paymentMethod,

                            paymentStatus:
                                orderData.paymentStatus,

                            totalAmountInPaise,

                            deliveryName:
                                orderData.deliveryName,

                            deliveryPhone:
                                orderData.deliveryPhone,

                            addressLine1:
                                orderData.addressLine1,

                            addressLine2:
                                orderData.addressLine2,

                            city:
                                orderData.city,

                            state:
                                orderData.state,

                            postalCode:
                                orderData.postalCode,
                        },
                        tx
                    );

                const orderItems =
                    cart.cartItems.map(
                        (cartItem) => ({

                            orderId:
                                order.id,

                            productId:
                                cartItem.product.id,

                            productName:
                                cartItem.product.name,

                            productBrand:
                                cartItem.product.brand,

                            priceAtPurchase:
                                cartItem.product.priceInPaise,

                            quantity:
                                cartItem.quantity,

                            subtotalAtPurchase:
                                cartItem.product.priceInPaise *
                                cartItem.quantity,

                        })
                    );

                await orderRepository.createOrderItems(
                    orderItems,
                    tx
                );

                for (const cartItem of cart.cartItems) {

                    await productRepository.decrementProductStock(

                        cartItem.product.id,

                        cartItem.quantity,

                        tx

                    );

                }

                await cartRepository.clearCart(
                    cart.id,
                    tx
                );

                return order;

            }
        );

    const completeOrder =
        await orderRepository.getOrderWithItems(
            order.id
        );

    if (!completeOrder) {
        throw new ApiError(
            500,
            "Failed to fetch created order."
        );
    }

    return mapOrderResponse(
        completeOrder
    );

};

export const checkout = async (
    userId,
    checkoutData
) => {

    const address =
        await addressRepository.findAddressById(
            checkoutData.addressId
        );

    if (!address) {
        throw new ApiError(
            404,
            "Address not found."
        );
    }

    if (address.userId !== userId) {
        throw new ApiError(
            403,
            "Unauthorized."
        );
    }

    const {

        cart,

        totalAmountInPaise,

    } = await validateCart(
        userId
    );

    const orderData = {

        paymentMethod:
            PaymentMethod.COD,

        paymentStatus:
            PaymentStatus.PENDING,

        deliveryName:
            address.name,

        deliveryPhone:
            address.phone,

        addressLine1:
            address.addressLine1,

        addressLine2:
            address.addressLine2,

        city:
            address.city,

        state:
            address.state,

        postalCode:
            address.postalCode,

    };

    return await createOrderFromCart(

        userId,

        cart,

        totalAmountInPaise,

        orderData

    );

};


export const getMyOrders = async (userId) => {

    const orders =
        await orderRepository.getOrdersByUserId(
            userId
        );

    return orders.map(
        mapOrderResponse
    );

};

export const getOrderById = async (
    userId,
    orderId
) => {

    const order =
        await orderRepository.getOrderWithItems(
            orderId
        );

    if (!order) {
        throw new ApiError(
            404,
            "Order not found."
        );
    }

    if (order.userId !== userId) {
        throw new ApiError(
            403,
            "Unauthorized."
        );
    }

    return mapOrderResponse(
        order
    );

};