import * as cartService from "../services/cart.service.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const addToCart = asyncHandler(async (req, res) => {

    const cart = await cartService.addToCart(
        req.user.id,
        req.body.productId
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            cart,
            "Product added to cart successfully."
        )
    );

});

export const getCart = asyncHandler(async (req, res) => {

    const cart = await cartService.getCart(
        req.user.id
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            cart,
            "Cart fetched successfully."
        )
    );

});

export const updateCartItemQuantity = asyncHandler(async (req, res) => {

    const cart = await cartService.updateCartItemQuantity(
        req.user.id,
        Number(req.params.cartItemId),
        req.body.quantity
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            cart,
            "Cart updated successfully."
        )
    );

});

export const removeCartItem = asyncHandler(async (req, res) => {

    const cart = await cartService.removeCartItem(
        req.user.id,
        Number(req.params.cartItemId)
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            cart,
            "Item removed from cart successfully."
        )
    );

});

export const clearCart = asyncHandler(async (req, res) => {

    const cart = await cartService.clearCart(
        req.user.id
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            cart,
            "Cart cleared successfully."
        )
    );

});