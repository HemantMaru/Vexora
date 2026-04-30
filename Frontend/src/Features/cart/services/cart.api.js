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
