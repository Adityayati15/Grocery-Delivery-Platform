import crypto from "crypto";
import razorpay from "../config/razorpay.js";
import { ApiError } from "../utils/ApiError.js";

import * as addressRepository from "../repositories/address.repository.js";

import {
    validateCart,
    createOrderFromCart,
} from "./order.service.js";

import {
    mapRazorpayOrderResponse,
} from "../mappers/payment.mapper.js";

import {
    PaymentMethod,
    PaymentStatus,
} from "@prisma/client";


export const createRazorpayOrder = async (

    userId,

    paymentData

) => {

    const {

        cart,

        totalAmountInPaise,

    } = await validateCart(
        userId
    );

    const address =
        await addressRepository.findAddressById(
            paymentData.addressId
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

    const options = {

        amount:
            totalAmountInPaise,

        currency:
            "INR",

        receipt:
            `user_${userId}_${Date.now()}`,

        notes: {

            userId,

            addressId:
                address.id,

        },

    };

    let razorpayOrder;

    try {

        razorpayOrder =

            await razorpay.orders.create(
                options
            );

    }
    catch (error) {

        throw new ApiError(

            500,

            "Failed to create Razorpay order."

        );

    }

    return mapRazorpayOrderResponse(
        razorpayOrder
    );

};

export const verifyPayment = async (

    paymentData

) => {

    const {

        razorpay_order_id,

        razorpay_payment_id,

        razorpay_signature,

    } = paymentData;

    const generatedSignature =

        crypto

            .createHmac(

                "sha256",

                process.env.RAZORPAY_KEY_SECRET

            )

            .update(

                `${razorpay_order_id}|${razorpay_payment_id}`

            )

            .digest("hex");

    if (

        generatedSignature !==

        razorpay_signature

    ) {

        throw new ApiError(

            400,

            "Invalid payment signature."

        );

    }

    const payment =

        await razorpay.payments.fetch(

            razorpay_payment_id

        );

    if (

        payment.status !==

        "captured"

    ) {

        throw new ApiError(

            400,

            "Payment has not been captured."

        );

    }

    const razorpayOrder =

        await razorpay.orders.fetch(

            razorpay_order_id

        );

    const userId = Number(
        razorpayOrder.notes.userId
    );

    const addressId = Number(
        razorpayOrder.notes.addressId
    );

    const address =
        await addressRepository.findAddressById(
            addressId
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
            PaymentMethod.ONLINE,

        paymentStatus:
            PaymentStatus.PAID,

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

