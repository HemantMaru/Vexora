import { Router } from "express";
import { authenticateUser } from "../middleware/auth.middlware.js";
import {
  addToCart,
  getCart,
  removeCartItems,
  updateCartItems,
} from "../controllers/cart.controller.js";
const cartRouter = Router();
cartRouter.post("/add", authenticateUser, addToCart);
cartRouter.delete(
  "/remove/:productId/:variantId",
  authenticateUser,
  removeCartItems,
);
cartRouter.put("/update", authenticateUser, updateCartItems);
cartRouter.get("/", authenticateUser, getCart);

export default cartRouter;
