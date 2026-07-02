export const validateIdParam = (req, res, next) => {
  const { id } = req.params;

  const parsedId = Number(id);

  if (!Number.isInteger(parsedId) || parsedId < 1) {
    return res.status(400).json({
      success: false,
      message: "Invalid ID. ID must be a positive integer.",
    });
  }

  req.params.id = parsedId;

  next();
};