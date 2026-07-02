import express from "express";
import * as productController from "../controllers/product.controller.js";
import { validateCreateProduct } from "../middleware/validateCreateProduct.middleware.js";
import { validateIdParam } from "../middleware/validareIdParam.js";
import { validateUpdateProduct } from "../middleware/validateUpdateProduct.middleware.js";
import { verifyJWT } from "../middleware/verifyJWT.middleware.js";
import { authorizeRoles } from "../middleware/authorizeRoles.middleware.js";

const router = express.Router();

router.get(
  "/products",
  productController.getProducts
);

router.get(
    "/products/:id",
    validateIdParam,
    productController.getProductById
);

router.patch(
  "/products/:id",
  verifyJWT,
  authorizeRoles("ADMIN"),
  validateIdParam,
  validateUpdateProduct,
  productController.updateProduct
);

router.delete(
  "/products/:id",
  validateIdParam,
  productController.deleteProduct
);

router.post(
    "/products",
    verifyJWT,
    authorizeRoles("ADMIN"),
    validateCreateProduct,
    productController.createProduct
);

export default router;