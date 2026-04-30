import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
  },

  reducers: {
    setCart: (state, action) => {
      state.cartItems = action.payload;
    },

    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const { setCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
