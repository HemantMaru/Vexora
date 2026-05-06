import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export const getCart = async () => {
  const res = await api.get("/api/cart/");
  return res.data;
};

export const addToCartApi = async (data) => {
  const res = await api.post("/api/cart/add", data);
  return res.data;
};

export const removeCartApi = async (productId, variantId) => {
  const res = await api.delete(`/api/cart/remove/${productId}/${variantId}`);
  return res.data;
};

export const updateCartApi = async (data) => {
  const res = await api.put("/api/cart/update", data);
  return res.data;
};

export const createOrder = async () => {
  const res = await api.post("/api/cart/payment/create-order");
  return res.data;
};
export const verifyPaymentApi = async (data) => {
  const res = await api.post("/api/cart/verify", data);
  return res.data;
};

export const getMyOrdersApi = async () => {
  const res = await api.get("/api/cart/my-orders");
  return res.data;
};
