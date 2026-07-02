import prisma from "../config/prisma.js";

export const findUserByEmail = async (email) => {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
};

export const findUserByPhone = async (phone) => {
  return prisma.user.findUnique({
    where: {
      phone,
    },
  });
};

export const findUserById = async (id) => {
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
};

export const createUser = async (userData) => {
  return prisma.user.create({
    data: userData,
  });
};

export const updateRefreshToken = async (userId, refreshToken) => {
  return prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      refreshToken,
    },
  });
};