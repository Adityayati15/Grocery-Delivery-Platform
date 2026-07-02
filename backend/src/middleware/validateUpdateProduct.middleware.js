export const validateUpdateProduct = (req, res, next) => {
  const {
    name,
    description,
    priceInPaise,
    stock,
    brand,
    category,
    unit,
    imageUrl,
    isActive,
  } = req.body;

  // At least one field should be present
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({
      success: false,
      message: "At least one field must be provided for update.",
    });
  }

  const allowedFields = [
    "name",
    "description",
    "priceInPaise",
    "stock",
    "brand",
    "category",
    "unit",
    "imageUrl",
    "isActive",
  ];

  const receivedFields = Object.keys(req.body);

  const invalidFields = receivedFields.filter(
    (field) => !allowedFields.includes(field)
  );

  if (invalidFields.length > 0) {
    return res.status(400).json({
      success: false,
      message: `Invalid field(s): ${invalidFields.join(", ")}`,
    });
  }

  const errors = [];

  if (name !== undefined && name.trim() === "") {
    errors.push("name cannot be empty");
  }

  if (
    priceInPaise !== undefined &&
    (!Number.isInteger(priceInPaise) || priceInPaise <= 0)
  ) {
    errors.push("priceInPaise must be a positive integer");
  }

  if (
    stock !== undefined &&
    (!Number.isInteger(stock) || stock < 0)
  ) {
    errors.push("stock cannot be negative");
  }

  if (category !== undefined && category.trim() === "") {
    errors.push("category cannot be empty");
  }

  if (unit !== undefined && unit.trim() === "") {
    errors.push("unit cannot be empty");
  }

  if (brand !== undefined && brand.trim() === "") {
    errors.push("brand cannot be empty");
  }

  if (
    imageUrl !== undefined &&
    typeof imageUrl !== "string"
  ) {
    errors.push("imageUrl must be a string");
  }

  if (
    isActive !== undefined &&
    typeof isActive !== "boolean"
  ) {
    errors.push("isActive must be a boolean");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      errors,
    });
  }

  next();
};