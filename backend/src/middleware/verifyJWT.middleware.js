import * as authRepository from "../repositories/auth.repository.js";
import { verifyAccessToken } from "../utils/jwt.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {

  const accessToken =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!accessToken) {
    throw new ApiError(
      401,
      "Unauthorized request."
    );
  }

  const decoded = verifyAccessToken(accessToken);

  const user =
    await authRepository.findUserById(decoded.id);

  if (!user) {
    throw new ApiError(
      401,
      "User not found."
    );
  }

  if (!user.isActive) {
    throw new ApiError(
      403,
      "Your account has been deactivated."
    );
  }

  const {
    password,
    refreshToken,
    ...safeUser
  } = user;

  req.user = safeUser;

  next();
});
