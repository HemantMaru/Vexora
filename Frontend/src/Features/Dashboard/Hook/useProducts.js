import { useDispatch } from "react-redux";
import {
  createProducts,
  getAllProducts,
  getProductsByCategory,
  getProductsDetails,
  getSellerProducts,
  getProductsSearch,
  createProductSearch,
  getSearchHistory,
  savedProduct,
  getsavedProduct,
  deleteProducts,
  updateProducts,
} from "../services/products.api";
import {
  setProducts,
  setProductsDetails,
  setSellerProducts,
  setSearchProducts,
  setSearchHistory,
  setLoading,
  setSavedProduct,
} from "../State/products.slice";
import toast from "react-hot-toast";
import { useEffect } from "react";

export const useProducts = () => {
  const dispatch = useDispatch();

  const handleCreateProducts = async (formData) => {
    dispatch(setLoading(true));
    try {
      const response = await createProducts(formData);
      toast.success(response.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Register failed");

      // alert(error.response?.data?.message || "Failed to create product");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleGetSellerProducts = async () => {
    dispatch(setLoading(true));
    const response = await getSellerProducts();
    dispatch(setSellerProducts(response.products));

    dispatch(setLoading(false));
  };

  const handleDeleteProduct = async (id) => {
    try {
      dispatch(setLoading(true));
      const response = await deleteProducts(id);

      dispatch(setLoading(false));
      toast.success(response.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Action failed");
    }
  };
  const handleUpdateProduct = async (id, formData) => {
    const response = await updateProducts(id, formData);

    toast.success(response.message);
  };

  const handleGetAllProducts = async () => {
    dispatch(setLoading(true));
    const response = await getAllProducts();
    dispatch(setProducts(response.products));

    dispatch(setLoading(false));
  };

  const handleGetProductDetails = async (id) => {
    dispatch(setLoading(true));
    const response = await getProductsDetails(id);
    dispatch(setProductsDetails(response.products));

    dispatch(setLoading(false));
  };

  const handleGetProductByCategory = async (category, sort) => {
    dispatch(setLoading(true));
    const response = await getProductsByCategory(category, sort);
    dispatch(setProducts(response.products));

    dispatch(setLoading(false));
  };

  const handleGetProductsSearch = async (searchQuery) => {
    if (!searchQuery) return;

    dispatch(setLoading(true));
    const response = await getProductsSearch(searchQuery);
    dispatch(setSearchProducts(response.products));

    dispatch(setLoading(false));
  };
  const handleCreateSearchHistory = async (searchQuery) => {
    dispatch(setLoading(true));
    const response = await createProductSearch({ searchQuery });
    await handlegetSearchHistory();
    toast.success(response.message);
    dispatch(setLoading(false));
  };

  const handlegetSearchHistory = async () => {
    dispatch(setLoading(true));
    const response = await getSearchHistory();
    dispatch(setSearchHistory(response.history));
    dispatch(setLoading(false));
  };

  const handleSavedProduct = async (id) => {
    // dispatch(setLoading(true));
    const response = await savedProduct(id);
    dispatch(setSavedProduct(response.wishList));
    dispatch(setLoading(false));

    toast.success(response.message);
  };

  const handleGetSavedProduct = async () => {
    dispatch(setLoading(true));
    const response = await getsavedProduct();
    dispatch(setSavedProduct(response.wishList));

    dispatch(setLoading(false));
  };

  return {
    handleCreateProducts,
    handleGetSellerProducts,
    handleGetAllProducts,
    handleGetProductDetails,
    handleGetProductByCategory,
    handleGetProductsSearch,
    handleCreateSearchHistory,
    handlegetSearchHistory,
    handleSavedProduct,
    handleGetSavedProduct,
    handleDeleteProduct,
    handleUpdateProduct,
  };
};
