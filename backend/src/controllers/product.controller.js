import * as productService from "../services/product.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const getProducts = asyncHandler(
  async (req, res) => {

    const {
      page,
      limit,
      search,
      category,
      brand,
    } = req.query;

    const result =
      await productService.getProducts({
        page,
        limit,
        search,
        category,
        brand,
      });

    return res.status(200).json(
      new ApiResponse(
        200,
        result,
        "Products fetched successfully"
      )
    );
  }
);

export const getProductById = asyncHandler(
  async (req, res) => {

    const { id } = req.params;

    const product = await productService.getProductById(id);

    return res.status(200).json(
      new ApiResponse(
        200,
        product,
        "Product fetched successfully."
      )
    );
  }
);

export const updateProduct = asyncHandler(
  async (req, res) => {

    const { id } = req.params;

    const updatedProduct =
      await productService.updateProduct(
        id,
        req.body
      );

    return res.status(200).json(
      new ApiResponse(
        200,
        updatedProduct,
        "Product updated successfully."
      )
    );
  }
);

export const createProduct = asyncHandler(
  async (req, res) => {
    const productData = req.body;

    const newProduct =
      await productService.createProduct(productData);

    return res.status(201).json(
      new ApiResponse(
        201,
        newProduct,
        "product created successfully"
      )
    );
  }
);

export const deleteProduct = asyncHandler(
  async (req, res) => {

    const { id } = req.params;

    const deletedProduct =
      await productService.deleteProduct(id);

    return res.status(200).json(
      new ApiResponse(
        200,
        deletedProduct,
        "Product deleted successfully."
      )
    );
  }
);