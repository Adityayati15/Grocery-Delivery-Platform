import prisma from "../config/prisma.js";

export const getProducts = async ({
  skip,
  take,
  search,
  category,
  brand

}) => {

  const where = {
    isActive : true,
  };

  
  if(category){
    where.category = category
  }
  if(brand){
    where.brand = brand
  }

  if (search) {
  where.OR = [
    {
      name: {
        contains: search,
        mode: "insensitive",
      },
    },
    {
      brand: {
        contains: search,
        mode: "insensitive",
      },
    },
    {
      category: {
        contains: search,
        mode: "insensitive",
      },
    },
  ];
  }

  const products = await prisma.product.findMany({
    where,
    skip,
    take,
  });

  const totalProducts = await prisma.product.count({
      where,
  });

  return {
      products,
      totalProducts,
  };
};


export const getProductById = async (
    productId,
    db = prisma
) => {
    return await db.product.findUnique({
        where: {
            id: productId,
        },
    });
};

export const updateProduct = async (
  id,
  updateData
) => {

  return prisma.product.update({
    where: {
      id,
    },
    data: updateData,
  });
};



export const createProduct = async (productData) => {
  return prisma.product.create({
    data: productData,
  });
};

export const deleteProduct = async (id) => {

  return prisma.product.update({
    where: {
      id,
    },
    data: {
      isActive: false,
    },
  });
};

export const updateProductStock = async (
    productId,
    stock,
    db = prisma
) => {
    return await db.product.update({
        where: {
            id: productId,
        },
        data: {
            stock,
        },
    });
};


export const decrementProductStock = async (
    productId,
    quantity,
    db = prisma
) => {

    return await db.product.update({

        where: {
            id: productId,
        },

        data: {
            stock: {
                decrement: quantity,
            },
        },

    });

};