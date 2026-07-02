export const mapRazorpayOrderResponse = (
    razorpayOrder
) => {

    return {

        orderId: razorpayOrder.id,

        amount: razorpayOrder.amount,

        currency: razorpayOrder.currency,

        receipt: razorpayOrder.receipt,

        status: razorpayOrder.status,

    };

};