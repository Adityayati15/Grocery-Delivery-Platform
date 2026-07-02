export const validateLoginUser = (req, res, next) => {
  const { loginId, password } = req.body;

  const errors = [];

  if (!loginId || !loginId.trim()) {
    errors.push("Email or phone is required.");
  }

  if (!password) {
    errors.push("Password is required.");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      errors,
    });
  }

  next();
};