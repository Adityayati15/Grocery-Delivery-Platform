import { ApiError } from "../utils/ApiError.js";
import * as cartRepository from "../repositories/cart.repository.js";
import { getProductById } from "../repositories/product.repository.js";
import { mapCartResponse } from "../mappers/cart.mapper.js";

export const addToCart = async (userId, productId) => {

    const product = await getProductById(productId);

    if (!product) {
        throw new ApiError(404, "Product not found.");
    }

    if (!product.isActive) {
        throw new ApiError(400, "Product is unavailable.");
    }

    if (product.stock < 1) {
        throw new ApiError(400, "Product is out of stock.");
    }

    let cart = await cartRepository.findCartByUserId(userId);

    if (!cart) {

        try {

            cart = await cartRepository.createCart({
                userId,
            });

        } catch (error) {

            if (
                error.code === "P2002" &&
                error.meta?.target?.includes("userId")
            ) {

                cart = await cartRepository.findCartByUserId(userId);

            } else {

                throw error;

            }

        }

    }

    const cartItem = await cartRepository.findCartItem(
        cart.id,
        productId
    );

    if (cartItem) {

        const newQuantity =
            cartItem.quantity + 1;

        if (newQuantity > product.stock) {

            throw new ApiError(
                400,
                "Insufficient stock."
            );

        }

        await cartRepository.updateCartItemQuantity(
            cartItem.id,
            newQuantity
        );

    } else {

        try {

            await cartRepository.createCartItem({

                cartId: cart.id,
                productId,
                quantity: 1,

            });

        } catch (error) {

            if (error.code === "P2002") {

                const existingItem =
                    await cartRepository.findCartItem(
                        cart.id,
                        productId
                    );

                const newQuantity =
                    existingItem.quantity + 1;

                if (newQuantity > product.stock) {

                    throw new ApiError(
                        400,
                        "Insufficient stock."
                    );

                }

                await cartRepository.updateCartItemQuantity(
                    existingItem.id,
                    newQuantity
                );

            } else {

                throw error;

            }

        }

    }

    const updatedCart =
        await cartRepository.getCartWithItems(cart.id);

    return mapCartResponse(updatedCart);

};

export const getCart = async (userId) => {

    const cart =
        await cartRepository.findCartByUserId(userId);

    if (!cart) {

        return {

            cartItems: [],
            totalItems: 0,
            totalPriceInPaise: 0,

        };

    }

    const cartWithItems =
        await cartRepository.getCartWithItems(cart.id);

    return mapCartResponse(cartWithItems);

};

export const updateCartItemQuantity = async (
    userId,
    cartItemId,
    quantity
) => {

    const cartItem =
        await cartRepository.findCartItemById(cartItemId);

    if (!cartItem) {

        throw new ApiError(
            404,
            "Cart item not found."
        );

    }

    const cart =
        await cartRepository.findCartByUserId(userId);

    if (!cart || cart.id !== cartItem.cartId) {

        throw new ApiError(
            403,
            "Unauthorized."
        );

    }

    const product =
        await getProductById(cartItem.productId);

    if (quantity > product.stock) {

        throw new ApiError(
            400,
            "Insufficient stock."
        );

    }

    await cartRepository.updateCartItemQuantity(
        cartItem.id,
        quantity
    );

    const updatedCart =
        await cartRepository.getCartWithItems(cart.id);

    return mapCartResponse(updatedCart);

};

export const removeCartItem = async (
    userId,
    cartItemId
) => {

    const cartItem =
        await cartRepository.findCartItemById(cartItemId);

    if (!cartItem) {

        throw new ApiError(
            404,
            "Cart item not found."
        );

    }

    const cart =
        await cartRepository.findCartByUserId(userId);

    if (!cart || cart.id !== cartItem.cartId) {

        throw new ApiError(
            403,
            "Unauthorized."
        );

    }

    await cartRepository.deleteCartItem(
        cartItem.id
    );

    const updatedCart =
        await cartRepository.getCartWithItems(cart.id);

    return mapCartResponse(updatedCart);

};

export const clearCart = async (userId) => {

    const cart =
        await cartRepository.findCartByUserId(userId);

    if (!cart) {

        return {

            cartItems: [],
            totalItems: 0,
            totalPriceInPaise: 0,

        };

    }

    await cartRepository.clearCart(cart.id);

    return {

        cartItems: [],
        totalItems: 0,
        totalPriceInPaise: 0,

    };

};