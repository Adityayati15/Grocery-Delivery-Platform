export const validateRegisterUser = (req, res, next) => {
  const {
    name,
    email,
    phone,
    password,
  } = req.body;

  const errors = [];

  if (!name || !name.trim()) {
    errors.push("Name is required.");
  }

  if (!email || !email.trim()) {
    errors.push("Email is required.");
  }

  if (!phone || !phone.trim()) {
    errors.push("Phone is required.");
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