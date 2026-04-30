import { Router } from "express";
import {
  createProduct,
  deleteSellerProducts,
  getAllProducts,
  getProductsDetails,
  getSavedProducts,
  getSearchHistory,
  getSellerProducts,
  ProductCategory,
  searchHistory,
  searchProducts,
  updateProduct,
  wishList,
} from "../controllers/product.controller.js";
import { createProductValidator } from "../validation/product.validator.js";
import {
  authenticateSeller,
  authenticateUser,
} from "../middleware/auth.middlware.js";
import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ storage });

export const productUpload = upload.fields([
  { name: "variant_0", maxCount: 10 },
  { name: "variant_1", maxCount: 10 },
  { name: "variant_2", maxCount: 10 },
  { name: "variant_3", maxCount: 10 },
]);
const productRouter = Router();
productRouter.post(
  "/create",
  authenticateSeller,
  productUpload,
  createProductValidator,
  createProduct,
);
productRouter.get("/seller", authenticateSeller, getSellerProducts);
productRouter.get("/", getAllProducts);
productRouter.get("/productDetails/:id", getProductsDetails);
productRouter.get("/category", ProductCategory);
productRouter.get("/search", searchProducts);
productRouter.post("/search-history", authenticateUser, searchHistory);
productRouter.get("/getHistory", authenticateUser, getSearchHistory);
productRouter.post("/saveProduct/:id", authenticateUser, wishList);
productRouter.get("/getSavedProduct", authenticateUser, getSavedProducts);
productRouter.delete(
  "/deleteProduct/:id",
  authenticateSeller,
  deleteSellerProducts,
);
productRouter.put(
  "/updateProduct/:id",
  authenticateSeller,
  productUpload,
  updateProduct,
);
export default productRouter;
