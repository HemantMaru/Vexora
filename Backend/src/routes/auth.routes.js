import {
  authLogin,
  authRegister,
  getme,
} from "../controllers/auth.controller.js";
import { Router } from "express";
import {
  validateLoginUser,
  validateRegisterUser,
} from "../validation/auth.validator.js";
import { authenticateUser } from "../middleware/auth.middlware.js";
import { searchHistory } from "../controllers/product.controller.js";
const authRoutes = Router();

authRoutes.post("/register", validateRegisterUser, authRegister);
authRoutes.post("/login", validateLoginUser, authLogin);
authRoutes.get("/", authenticateUser, getme);

export default authRoutes;
