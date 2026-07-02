import express from "express";

import * as cartController from "../controllers/cart.controller.js";

import { verifyJWT } from "../middleware/verifyJWT.middleware.js";

import { validateAddToCart } from "../middleware/validateAddToCart.middleware.js";
import { validateUpdateQuantity } from "../middleware/validateUpdateQuantity.middleware.js";

const router = express.Router();

router.post(
    "/",
    verifyJWT,
    validateAddToCart,
    cartController.addToCart
);

router.get(
    "/",
    verifyJWT,
    cartController.getCart
);

router.patch(
    "/items/:cartItemId",
    verifyJWT,
    validateUpdateQuantity,
    cartController.updateCartItemQuantity
);

router.delete(
    "/items/:cartItemId",
    verifyJWT,
    cartController.removeCartItem
);

router.delete(
    "/",
    verifyJWT,
    cartController.clearCart
);

export default router;