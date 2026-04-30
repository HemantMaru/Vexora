import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    sellerProducts: [],
    products: [],
    productsDetails: [],
    loading: false,
    sort: "",
    searchProducts: [],
    SearchHistory: [],
    savedProduct: [],
  },
  reducers: {
    setSellerProducts: (state, action) => {
      state.sellerProducts = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setProductsDetails: (state, action) => {
      state.productsDetails = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    setSearchProducts: (state, action) => {
      state.searchProducts = action.payload;
    },
    setSearchHistory: (state, action) => {
      state.SearchHistory = action.payload;
    },
    setSavedProduct: (state, action) => {
      state.savedProduct = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setSellerProducts,
  setProducts,
  setProductsDetails,
  setSort,
  setSearchProducts,
  setSearchHistory,
  setLoading,
  setSavedProduct,
} = productSlice.actions;
export default productSlice.reducer;
