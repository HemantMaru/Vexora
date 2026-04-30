import React from "react";
import ProductPage from "../Components/ProductDetails/ProductPage";
import { useProducts } from "../Hook/useProducts";
import { useEffect } from "react";

const ProductDetails = () => {
  const { handleGetSavedProduct } = useProducts();
  useEffect(() => {
    handleGetSavedProduct();
  }, []);

  return (
    <>
      <ProductPage />
    </>
  );
};

export default ProductDetails;
