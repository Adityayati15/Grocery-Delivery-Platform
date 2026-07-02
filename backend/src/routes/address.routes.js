import express from "express";

import * as addressController from "../controllers/address.controller.js";

import { verifyJWT } from "../middleware/verifyJWT.middleware.js";
import { validateCreateAddress } from "../middleware/validateCreateAddress.middleware.js";
import { validateUpdateAddress } from "../middleware/validateUpdateAddress.middleware.js";

const router = express.Router();

router.use(verifyJWT);

router.post(
    "/",
    validateCreateAddress,
    addressController.createAddress
);

router.get(
    "/",
    addressController.getMyAddresses
);

router.get(
    "/:id",
    addressController.getAddressById
);

router.patch(
    "/:id",
    validateUpdateAddress,
    addressController.updateAddress
);

router.patch(
    "/:id/default",
    addressController.setDefaultAddress
);

router.delete(
    "/:id",
    addressController.deleteAddress
);

export default router;