import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Features/Auth/State/auth.slice.js";
import productReducer from "../Features/Dashboard/State/products.slice.js";
import cartReducer from "../Features/cart/State/cart.slice.js";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    cart: cartReducer,
  },
});
