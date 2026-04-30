import axios from "axios";
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export const createProducts = async (formData) => {
  const response = await api.post("/api/product/create", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const getSellerProducts = async () => {
  const response = await api.get("/api/product/seller");
  console.log(response.data);
  return response.data;
};

export const deleteProducts = async (id) => {
  const response = await api.delete("/api/product/deleteProduct/" + id);
  console.log(response.data);
  return response.data;
};
export const updateProducts = async (id, formData) => {
  const response = await api.put("/api/product/updateProduct/" + id, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const getAllProducts = async () => {
  const response = await api.get("/api/product/");
  return response.data;
};

export const getProductsDetails = async (id) => {
  const response = await api.get("/api/product/productDetails/" + id);
  return response.data;
};

export const getProductsByCategory = async (category, sort) => {
  let url = "/api/product/category?";

  if (category) {
    url += "category=" + category + "&";
  }

  if (sort) {
    url += "sort=" + sort;
  }

  const response = await api.get(url);
  return response.data;
};

export const getProductsSearch = async (searchQuery) => {
  const response = await api.get("/api/product/search?query=" + searchQuery);
  return response.data;
};

export const createProductSearch = async ({ searchQuery }) => {
  const response = await api.post("/api/product/search-history", {
    searchQuery,
  });
  return response.data;
};

export const getSearchHistory = async () => {
  const response = await api.get("/api/product/getHistory");
  return response.data;
};

export const savedProduct = async (id) => {
  const response = await api.post("/api/product/saveProduct/" + id);
  return response.data;
};

export const getsavedProduct = async () => {
  const response = await api.get("/api/product/getSavedProduct/");
  return response.data;
};
