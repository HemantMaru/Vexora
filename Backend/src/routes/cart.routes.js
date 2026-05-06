import { Router } from "express";
import { authenticateUser } from "../middleware/auth.middlware.js";
import {
  addToCart,
  createOrder,
  getCart,
  removeCartItems,
  updateCartItems,
} from "../controllers/cart.controller.js";
import {
  getMyOrders,
  verifyPayment,
} from "../controllers/paymentVerfiy.controller.js";
const cartRouter = Router();
cartRouter.post("/add", authenticateUser, addToCart);
cartRouter.delete(
  "/remove/:productId/:variantId",
  authenticateUser,
  removeCartItems,
);
cartRouter.put("/update", authenticateUser, updateCartItems);
cartRouter.get("/", authenticateUser, getCart);
cartRouter.post("/payment/create-order", authenticateUser, createOrder);
cartRouter.post("/verify", authenticateUser, verifyPayment);

cartRouter.get("/my-orders", authenticateUser, getMyOrders);
export default cartRouter;
