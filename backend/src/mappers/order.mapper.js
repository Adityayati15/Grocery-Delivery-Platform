export const mapOrderResponse = (order) => {

    return {

        id: order.id,

        orderStatus: order.orderStatus,

        paymentStatus: order.paymentStatus,

        paymentMethod: order.paymentMethod,

        totalAmountInPaise: order.totalAmountInPaise,

        createdAt: order.createdAt,

        deliveryAddress: {

            name: order.deliveryName,

            phone: order.deliveryPhone,

            addressLine1: order.addressLine1,

            addressLine2: order.addressLine2,

            city: order.city,

            state: order.state,

            postalCode: order.postalCode,

        },

        items: order.orderItems.map((item) => ({

            id: item.id,

            productId: item.productId,

            productName: item.productName,

            productBrand: item.productBrand,

            quantity: item.quantity,

            priceAtPurchase: item.priceAtPurchase,

            subtotalAtPurchase: item.subtotalAtPurchase,

        })),

    };

};