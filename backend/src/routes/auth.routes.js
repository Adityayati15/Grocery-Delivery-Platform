import express from "express";
import * as authController from "../controllers/auth.controller.js";
import { validateRegisterUser } from "../middleware/validateRegisterUser.middleware.js";
import { validateLoginUser } from "../middleware/validateLoginUser.middleware.js";
import { verifyJWT } from "../middleware/verifyJWT.middleware.js";

const router = express.Router();

router.post(
  "/register",
  validateRegisterUser,
  authController.registerUser
);

router.get(
    "/me",
    verifyJWT,
    authController.getCurrentUser
);

router.post(
  "/login",
  validateLoginUser,
  authController.loginUser
);

router.post(
  "/logout",
  verifyJWT,
  authController.logoutUser
);

router.post(
    "/refresh-token",
    authController.refreshAccessToken
);

export default router;