export const validateCreateProduct = (req, res, next) => {
  const {
    name,
    priceInPaise,
    stock,
    category,
    unit,
  } = req.body;

  const errors = [];

  if (!name) {
    errors.push("name is required");
  }

  if (priceInPaise === undefined) {
    errors.push("priceInPaise is required");
  } else if (priceInPaise <= 0) {
    errors.push("priceInPaise must be greater than 0");
  }

  if (stock === undefined) {
    errors.push("stock is required");
  } else if (stock < 0) {
    errors.push("stock cannot be negative");
  }

  if (!category) {
    errors.push("category is required");
  }

  if (!unit) {
    errors.push("unit is required");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      errors,
    });
  }

  next();
};