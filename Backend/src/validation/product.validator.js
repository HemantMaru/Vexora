import { body, validationResult } from "express-validator";

function validateRequest(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ message: "Validation error", errors: errors.array() });
  }

  next();
}
export const createProductValidator = [
  body("title").notEmpty().withMessage("Title is required"),

  body("description").notEmpty().withMessage("Description is required"),

  body("category")
    .isIn(["shirts", "tshirts", "jeans", "hoodies"])
    .withMessage("Invalid category"),

  // 🔥 VARIANTS VALIDATION
  body("variants").custom((value) => {
    try {
      const parsed = typeof value === "string" ? JSON.parse(value) : value;
      if (!Array.isArray(parsed) || parsed.length === 0) {
        throw new Error();
      }
      return true;
    } catch {
      throw new Error("Invalid variants format");
    }
  }),
  body("variants.*.size")
    .isIn(["S", "M", "L", "XL", "XXL"])
    .withMessage("Invalid size"),

  body("variants.*.color").notEmpty().withMessage("Color is required"),

  body("variants.*.stock")
    .isInt({ min: 0 })
    .withMessage("Stock must be a positive number"),

  body("variants.*.price.amount")
    .isNumeric()
    .withMessage("Price amount must be a number"),

  body("variants.*.price.currency")
    .notEmpty()
    .withMessage("Currency is required"),

  body("variants.*.price.discount")
    .isNumeric()
    .withMessage("Discount must be a number"),

  body("variants.*.price.mrp").isNumeric().withMessage("MRP must be a number"),

  validateRequest,
];
