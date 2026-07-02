import * as authService from "../services/auth.service.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import { cookieOptions } from "../constants/cookieOptions.js";

export const registerUser = asyncHandler(
  async (req, res) => {

    const user =
      await authService.registerUser(req.body);

    return res.status(201).json(
      new ApiResponse(
        201,
        user,
        "User registered successfully."
      )
    );
  }
);

export const getCurrentUser = asyncHandler(async (req, res) => {

  return res.status(200).json(
    new ApiResponse(
      200,
      req.user,
      "Current user fetched successfully."
    )
  );

});

export const loginUser = asyncHandler(async (req, res) => {

  const {
    safeUser,
    accessToken,
    refreshToken,
  } = await authService.loginUser(req.body);

  res.cookie("accessToken", accessToken, {
    ...cookieOptions,
    maxAge: 15 * 60 * 1000,
  });

  res.cookie("refreshToken", refreshToken, {
    ...cookieOptions,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res.status(200).json(
    new ApiResponse(
      200,
      safeUser,
      "Login successful."
    )
  );
});

export const logoutUser = asyncHandler(async (req, res) => {

  await authService.logoutUser(req.user.id);

  res.clearCookie("accessToken", cookieOptions);
  res.clearCookie("refreshToken", cookieOptions);

  return res.status(200).json(
    new ApiResponse(
      200,
      null,
      "Logged out successfully."
    )
  );
});

export const refreshAccessToken = asyncHandler(async (req, res) => {

    const refreshToken =
        req.cookies?.refreshToken;

    if (!refreshToken) {
        throw new ApiError(
            401,
            "Refresh token missing."
        );
    }

    const {
        safeUser,
        accessToken,
        refreshToken: newRefreshToken,
    } = await authService.refreshAccessToken(refreshToken);

    res.cookie(
        "accessToken",
        accessToken,
        {
            ...cookieOptions,
            maxAge: 15 * 60 * 1000,
        }
    );

    res.cookie(
        "refreshToken",
        newRefreshToken,
        {
            ...cookieOptions,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        }
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            safeUser,
            "Access token refreshed successfully."
        )
    );

});