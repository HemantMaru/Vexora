import { body, validationResult } from "express-validator";

function validateRequest(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

export const validateRegisterUser = [
  body().custom((value, { req }) => {
    if (!req.body.email && !req.body.contact) {
      throw new Error("Email or contact is required");
    }
    return true;
  }),

  body("email").optional().isEmail().withMessage("Invalid email format"),

  body("contact")
    .optional()
    .matches(/^\d{10}$/)
    .withMessage("Contact must be a 10-digit number"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),

  body("fullname")
    .notEmpty()
    .withMessage("Full name is required")
    .isLength({ min: 3 })
    .withMessage("Full name must be at least 3 characters long"),

  body("isSeller").isBoolean().withMessage("isSeller must be a boolean value"),

  validateRequest,
];

export const validateLoginUser = [
  body("identifier").notEmpty().withMessage("Email or phone required"),

  body("password").notEmpty().withMessage("Password is required"),

  validateRequest,
];
