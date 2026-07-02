import * as productRepository from "../repositories/product.repository.js";
import {ApiError} from "../utils/ApiError.js"

const findExistingProduct = async (id) => {
  const product = await productRepository.getProductById(id);

  if (!product || !product.isActive) {
    throw new ApiError(404, "Product not found.");
  }

  return product;
};

export const getProducts = async ({
    page,
    limit,
    search,
    category,
    brand,
}) => {

    const pageNumber = page === undefined ? 1 : Number(page);
    const limitNumber = limit === undefined ? 20 : Number(limit);

    if (!Number.isInteger(pageNumber) || pageNumber < 1) {
        throw new ApiError(400, "Page must be a positive integer.");
    }

    if (!Number.isInteger(limitNumber) || limitNumber < 1) {
        throw new ApiError(400, "Limit must be a positive integer.");
    }

    const skip = (pageNumber - 1) * limitNumber;

    const {
    products,
    totalProducts,
  } = await productRepository.getProducts({
    skip,
    take: limitNumber,
    search,
    category,
    brand,
  });

  const totalPages = Math.ceil(
      totalProducts / limitNumber
  );

  return {
      products,
      pagination: {
          page: pageNumber,
          limit: limitNumber,
          totalProducts,
          totalPages,
      },
  };
};

export const getProductById = async (id) => {
  return findExistingProduct(id);
};

export const updateProduct = async (
  id,
  updateData
) => {

  await findExistingProduct(id);

  return productRepository.updateProduct(
    id,
    updateData
  );
};


export const createProduct = async (productData) => {
  return productRepository.createProduct(productData);
};

export const deleteProduct = async (id) => {

  await findExistingProduct(id);

  return productRepository.deleteProduct(id);
};