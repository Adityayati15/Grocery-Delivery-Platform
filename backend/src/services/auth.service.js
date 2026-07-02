import * as authRepository from "../repositories/auth.repository.js";
import {ApiError} from "../utils/ApiError.js";
import bcrypt from "bcrypt"
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  verifyAccessToken
} from "../utils/jwt.js";

export const registerUser = async ({
  name,
  email,
  phone,
  password,
}) => {

  // Password Strength
  if (password.length < 8) {
    throw new ApiError(
      400,
      "Password must be at least 8 characters long."
    );
  }

  // Parallel Queries
  const [existingEmail, existingPhone] =
    await Promise.all([
      authRepository.findUserByEmail(email),
      authRepository.findUserByPhone(phone),
    ]);

  if (existingEmail) {
    throw new ApiError(
      409,
      "Email already exists."
    );
  }

  if (existingPhone) {
    throw new ApiError(
      409,
      "Phone number already exists."
    );
  }

  const hashedPassword = await bcrypt.hash(password,10);

  const user = await authRepository.createUser({
    name,
    email,
    phone,
    password : hashedPassword,
  });

  const {
    password: _,
    refreshToken,
    ...safeUser
    } = user;

    return safeUser;
};

const isEmail = (value) => value.includes("@");

export const loginUser = async ({
  loginId,
  password,
}) => {

  const user = isEmail(loginId)
    ? await authRepository.findUserByEmail(loginId)
    : await authRepository.findUserByPhone(loginId);

  if (!user) {
    throw new ApiError(
      401,
      "Invalid email/phone or password."
    );
  }

  if (!user.isActive) {
    throw new ApiError(
      403,
      "Your account has been deactivated."
    );
  }

  const isPasswordCorrect =
    await bcrypt.compare(
      password,
      user.password
    );

  if (!isPasswordCorrect) {
    throw new ApiError(
      401,
      "Invalid email/phone or password."
    );
  }

  const accessToken =
    generateAccessToken(user);

  const refreshToken =
    generateRefreshToken(user);

  await authRepository.updateRefreshToken(
    user.id,
    refreshToken
  );

  const {
    password: _,
    refreshToken: __,
    ...safeUser
  } = user;

  return {
    safeUser,
    accessToken,
    refreshToken,
  };
};

export const logoutUser = async (userId) => {

  await authRepository.updateRefreshToken(
    userId,
    null
  );
};

export const refreshAccessToken = async (refreshToken) => {

    const decoded =
        verifyRefreshToken(refreshToken);

    const user =
        await authRepository.findUserById(decoded.id);

    if (!user) {
        throw new ApiError(
            401,
            "Invalid refresh token."
        );
    }

    if (user.refreshToken !== refreshToken) {
        throw new ApiError(
            401,
            "Refresh token mismatch."
        );
    }

    const newAccessToken =
        generateAccessToken(user);

    const newRefreshToken =
        generateRefreshToken(user);

    await authRepository.updateRefreshToken(
        user.id,
        newRefreshToken
    );

    const {
        password,
        refreshToken: removed,
        ...safeUser
    } = user;

    return {
        safeUser,
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
    };

};