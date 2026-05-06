import { useDispatch } from "react-redux";
import { setCart } from "../State/cart.slice.js";
import toast from "react-hot-toast"; // 👈 Toast import kar liya
import {
  getCart,
  addToCartApi,
  removeCartApi,
  updateCartApi,
  createOrder,
  verifyPaymentApi,
  getMyOrdersApi,
} from "../services/cart.api.js";
import { useState } from "react";

export const useCart = () => {
  const dispatch = useDispatch();

  const fetchCart = async () => {
    const res = await getCart();

    dispatch(setCart(res.cart.items));
  };

  const handleAddToCart = async (data) => {
    try {
      const res = await addToCartApi(data);
      dispatch(setCart(res.cart.items));
      toast.success("Item added to cart! 🛒");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Item not added!");
    }
  };

  const handleRemove = async (productId, variantId) => {
    try {
      const res = await removeCartApi(productId, variantId);
      dispatch(setCart(res.cart.items));
      toast.success("Item removed! 🗑️"); // 👈 Success toast
    } catch (error) {
      toast.error("Item remove failed!"); // 👈 Error toast
    }
  };

  const handleUpdate = async (data) => {
    try {
      const res = await updateCartApi(data);
      dispatch(setCart(res.cart.items));
      toast.success("Cart updated! ✅"); //  Success toast
    } catch (error) {
      toast.error("Cart not update!"); //  Error toast
    }
  };

  const handleCreateOrder = async () => {
    try {
      const res = await createOrder();

      toast.success("order Created! ✅"); //  Success toast
      return res;
    } catch (error) {
      toast.error("order not successfully!"); //  Error toast
    }
  };

  const handleVerifyPayment = async (data) => {
    try {
      const res = await verifyPaymentApi(data);
      toast.success("Payment Verified ✅");
      return res;
    } catch (err) {
      toast.error("Verification failed ❌");
    }
  };

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFetchOrders = async () => {
    try {
      setLoading(true);
      const data = await getMyOrdersApi();
      setOrders(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    fetchCart,
    handleAddToCart,
    handleRemove,
    handleUpdate,
    handleCreateOrder,
    handleVerifyPayment,
    orders,
    loading,
    handleFetchOrders,
  };
};
