import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { TGadget } from "../../../types/types";

// export type TUser = {

// };

type TProductState = {
  cart: TGadget[];
};

const initialState: TProductState = {
  cart: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cart.push(action.payload);
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item._id !== action.payload._id);
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const { setCart , removeFromCart, clearCart} = productSlice.actions;

export default productSlice.reducer;

export const selectCart = (state: RootState) => state.product.cart;
