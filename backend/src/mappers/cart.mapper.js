export const mapCartResponse = (cart) => {

    const cartItems = cart.cartItems.map((item) => ({

        id: item.id,

        quantity: item.quantity,

        subtotalInPaise:
            item.quantity * item.product.priceInPaise,

        product: {

            id: item.product.id,

            name: item.product.name,

            brand: item.product.brand,

            priceInPaise: item.product.priceInPaise,

            imageUrl: item.product.imageUrl,

            unit: item.product.unit,

            category: item.product.category,

        },

    }));

    const totalItems = cartItems.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    const totalPriceInPaise = cartItems.reduce(
        (sum, item) => sum + item.subtotalInPaise,
        0
    );

    return {

        id: cart.id,

        totalItems,

        totalPriceInPaise,

        cartItems,

    };

};